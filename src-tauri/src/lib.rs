use base64::engine::general_purpose::STANDARD;
use base64::Engine;
// use image::codecs::png::PngEncoder; // O si se usa otra codificación
use image::{ImageBuffer, ImageFormat, RgbaImage};

use mime_guess::MimeGuess;
use std::io::Cursor;
use std::path::Path;
use winapi::um::shellapi::{SHGetFileInfoW, SHFILEINFOW, SHGFI_ICON, SHGFI_SMALLICON};
use winapi::um::wingdi::{
    DeleteObject, GetDIBits, GetObjectW, BITMAP, BITMAPINFO, BITMAPINFOHEADER, BI_RGB,
    DIB_RGB_COLORS,
};
use winapi::um::winuser::{DestroyIcon, GetDC, GetIconInfo, ReleaseDC, ICONINFO};

fn get_windows_icon(file_path: &str) -> Option<String> {
    unsafe {
        let mut file_info: SHFILEINFOW = std::mem::zeroed();
        let wide_path: Vec<u16> = file_path.encode_utf16().chain(std::iter::once(0)).collect();

        let result = SHGetFileInfoW(
            wide_path.as_ptr(),
            0,
            &mut file_info,
            std::mem::size_of::<SHFILEINFOW>() as u32,
            SHGFI_ICON | SHGFI_SMALLICON,
        );

        if result == 0 {
            return None;
        }

        let hicon = file_info.hIcon;
        let mut icon_info: ICONINFO = std::mem::zeroed();

        if GetIconInfo(hicon, &mut icon_info) == 0 {
            DestroyIcon(hicon);
            return None;
        }

        let hbmp = icon_info.hbmColor;
        let mut bmp: BITMAP = std::mem::zeroed();

        if GetObjectW(
            hbmp as *mut _,
            std::mem::size_of::<BITMAP>() as i32,
            &mut bmp as *mut _ as *mut _,
        ) == 0
        {
            DeleteObject(hbmp as *mut _);
            DestroyIcon(hicon);
            return None;
        }

        let mut info_header: BITMAPINFOHEADER = std::mem::zeroed();
        info_header.biSize = std::mem::size_of::<BITMAPINFOHEADER>() as u32;
        info_header.biWidth = bmp.bmWidth;
        info_header.biHeight = -bmp.bmHeight;
        info_header.biPlanes = 1;
        info_header.biBitCount = 32;
        info_header.biCompression = BI_RGB;

        let mut bitmap_info: BITMAPINFO = std::mem::zeroed();
        bitmap_info.bmiHeader = info_header;

        let buffer_size = (bmp.bmWidth * bmp.bmHeight * 4) as usize;
        let mut buffer = vec![0u8; buffer_size];

        let hdc = GetDC(std::ptr::null_mut());
        let success = GetDIBits(
            hdc,
            hbmp,
            0,
            bmp.bmHeight as u32,
            buffer.as_mut_ptr() as *mut _,
            &mut bitmap_info as *mut _,
            DIB_RGB_COLORS,
        );

        ReleaseDC(std::ptr::null_mut(), hdc);
        DeleteObject(hbmp as *mut _);
        DestroyIcon(hicon);

        if success == 0 {
            return None;
        }

        let img: Option<RgbaImage> =
            ImageBuffer::from_raw(bmp.bmWidth as u32, bmp.bmHeight as u32, buffer);

        match img {
            Some(image) => {
                let mut cursor = Cursor::new(Vec::new());
                if image.write_to(&mut cursor, ImageFormat::Png).is_err() {
                    return None;
                }
                Some(STANDARD.encode(cursor.into_inner()))
            }
            None => None,
        }
    }
}

#[derive(serde::Serialize)]
struct FileMetadata {
    name: String,
    path: String,
    size: u64,
    mime_type: String,
    icon: Option<String>, // Base64 del ícono
}

#[tauri::command]
async fn get_file_metadata(file_path: String) -> Result<FileMetadata, String> {
    // Obtener metadatos básicos
    let path = Path::new(&file_path);
    let metadata = std::fs::metadata(&path).map_err(|e| e.to_string())?;
    let name = path.file_name().unwrap().to_string_lossy().to_string();
    let mime_type = MimeGuess::from_path(&file_path)
        .first_or_octet_stream()
        .to_string();

    // Obtener ícono (solo Windows)
    let icon_base64 = get_windows_icon(&file_path);

    Ok(FileMetadata {
        name,
        path: file_path,
        size: metadata.len(),
        mime_type,
        icon: icon_base64,
    })
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// * Original Concept
// #[tauri::command]
// fn resize_window(window: tauri::Window, height: f64) {
//     if let Ok(current_size) = window.outer_size() {
//         let width = current_size.width;
//         let _ = window.set_size(tauri::PhysicalSize::new(width, height as u32));
//     }
// }

#[tauri::command]
fn resize_window(window: tauri::Window, height: f64) {
    let min_height = 320.0;
    let max_height = 760.0;
    let clamped_height = height.clamp(min_height, max_height);

    if let Ok(current_size) = window.outer_size() {
        let width = current_size.width;
        let _ = window.set_size(tauri::PhysicalSize::new(width, clamped_height as u32));
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            resize_window,
            get_file_metadata
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
