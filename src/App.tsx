import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import Header from "./components/ui/header"
import { resizeToContent } from "./lib/resize"
import { GripHorizontal } from "lucide-react"

function App() {
    const [greetMsg, setGreetMsg] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        const observer = new MutationObserver(() => resizeToContent())
        const section = document.querySelector("section")

        if (section) {
            observer.observe(section, {
                childList: true,
                subtree: true,
                attributes: true,
            })
        }

        // Ejecutar inicialmente
        resizeToContent()

        return () => observer.disconnect()
    }, [])

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        setGreetMsg(await invoke("greet", { name }))
    }

    return (
        <main className="flex flex-col gap-1 rounded-sm h-screen">
            <Header />

            <section className="scroll-smooth scrollbar-hide overflow-y-scroll rounded-sm bg-shadow h-full flex flex-col justify-between items-center border border-shadow-light/25 ">
                <div
                    className="grid p-2 gap-4 justify-center items-start "
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(6rem, 1fr))",
                    }}>
                    <div className="transition-all duration-300 ease-in-out  w-full max-h-56 h-24 rounded-2xl bg-shadow-light" />
                </div>
            </section>
            <footer
                data-tauri-drag-region
                className="z-10 bg-shadow rounded-sm   flex justify-center items-center cursor-grab border border-shadow-light/25">
                <GripHorizontal
                    className="size-6  text-shadow-light hover:text-accent cursor-grab"
                    data-tauri-drag-region
                />
            </footer>
        </main>
    )
}

export default App

//  <div>
//                     <h1 className="text-2xl">
//                         Welcome to Farm + Tauri + React
//                     </h1>
//                     <form
//                         className="row"
//                         onSubmit={(e) => {
//                             e.preventDefault()
//                             greet()
//                         }}>
//                         <input
//                             id="greet-input"
//                             onChange={(e) => setName(e.currentTarget.value)}
//                             placeholder="Enter a name..."
//                         />
//                         <button type="submit">Greet</button>
//                     </form>
//                     <p>{greetMsg}</p>
//                 </div>
