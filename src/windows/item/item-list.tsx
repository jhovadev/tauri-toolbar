// React
import { useEffect, useState } from "react"

// Utils
import { nanoid } from "nanoid"
import { resizeToContent } from "@/lib/resize"
import { open } from "@tauri-apps/plugin-dialog"
import { invoke } from "@tauri-apps/api/core"
// import { openPath } from "@tauri-apps/plugin-opener"
import { open as openCmd } from "@tauri-apps/plugin-shell"
import { motion, useAnimation } from "motion/react"

// Icons
import { SquarePlus /* SquareDashed */ } from "lucide-react"

interface Item {
    id: string
    name: string
    description?: string
    path: string
    icon?: string
}

export default function ItemList() {
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

    // async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    //     setGreetMsg(await invoke("greet", { name }))
    // }

    async function addItem() {
        const filePath = await open({
            multiple: false,
            directory: false,
            // filters: [
            //     {
            //         name: "Images",
            //         extensions: ["jpg", "png", "jpeg", "gif"],
            //     },
            // ],
        })

        const metadata: Item = await invoke("get_file_metadata", { filePath })
        setItems([...items, { ...metadata, id: nanoid() }])
    }

    const [items, setItems] = useState<Item[]>([])

    const controls = useAnimation()

    const handleClick = async () => {
        addItem()
        await controls.start({
            scale: 1.2,
            rotate: 160,
            transition: { duration: 0.2 },
        })
        await controls.start({ scale: 0.95, rotate: 0 })
    }

    return (
        <div className="grid p-1 grid-cols-6 gap-1 justify-center items-start ">
            {items.map((item) => (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log("hover started!")}
                    key={item.id}
                    type="button"
                    onClick={() => openCmd(item.path)}>
                    <img
                        // src={`data:image/png;base64,${item.icon}`}
                        src={item.icon}
                        alt={item.name}
                        className="size-8 text-shadow-light hover:text-accent cursor-pointer transition-all duration-300 ease-out focus:animate-spin hover:animate-pulse select-none "
                    />
                </motion.button>
                // <SquareDashed
                //     key={item.id}
                //     className="size-8 text-shadow-light hover:text-accent cursor-pointer transition-all duration-300 ease-out focus:animate-spin"
                //     onMouseDown={(e) => {
                //         e.preventDefault()
                //         if (e.button === 2) {
                //             setItems([
                //                 ...items.slice(0, index),
                //                 ...items.slice(index + 1),
                //             ])
                //         }
                //     }}
                // />
            ))}

            <motion.button
                animate={controls}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95, rotate: 60 }}
                // onHoverStart={() => console.log("hover started!")}
                onClick={handleClick}
            >
                <SquarePlus className="size-8 text-shadow-light hover:text-accent cursor-pointer" />
            </motion.button>
        </div>
    )
}
