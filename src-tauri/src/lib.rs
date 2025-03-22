// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// use tauri::{AppHandle, Manager, PhysicalSize, Window};

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
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![resize_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
