import { invoke } from "@tauri-apps/api/core"

// En tu archivo resize.js (o donde tengas la función)
export async function resizeToContent() {
    // Obtener elementos
    const header = document.querySelector("header")
    const section = document.querySelector("section")
    const dragArea = document.querySelector("footer")

    if (!header || !dragArea || !section) return

    // Calcular alturas fijas
    const headerHeight = header.offsetHeight
    const dragAreaHeight = dragArea.offsetHeight

    // Altura del contenido real de la sección (incluyendo lo no visible)
    const sectionScrollHeight = section.scrollHeight

    // Calcular nueva altura total
    // const newTotalHeight = sectionScrollHeight + headerHeight + dragAreaHeight
    const newTotalHeight = 360

    // Aplicar límite máximo de 760px
    await invoke("resize_window", {
        height: Math.min(newTotalHeight, 760),
    })
}

//  * Original concept
// export async function resizeToContent() {
//   // const main = document.querySelector("main");
//   // if (!main) return;

//   // const rect = main.getBoundingClientRect();
//   const rect = document.body.children[0].getBoundingClientRect();

//   const height = Math.ceil(rect.height) +20; // redondea

//   // Llamar al backend para ajustar la altura
//   await invoke("resize_window", { height });
// }
