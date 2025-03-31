import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"

// En tu archivo resize.js (o donde tengas la función)
export async function resizeToContent() {
    // Obtener elementos
    const header = document.querySelector("header")
    const section = document.querySelector("section")
    const footer = document.querySelector("footer")

    if (!header || !footer) return

    // Calcular alturas fijas
    const headerHeight = header.offsetHeight
    const footerHeight = footer.offsetHeight
    const sectionHeight = section?.offsetHeight || 0

    // Calcular nueva altura total
    const newTotalHeight = sectionHeight + headerHeight + footerHeight
    // const newTotalHeight = 360;

    // Aplicar límite máximo de 760px
    await getCurrentWindow().setSize(
        new LogicalSize(220, Math.min(newTotalHeight, 760)),
    )
}
