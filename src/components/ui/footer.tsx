import { GripHorizontal } from "lucide-react"

export default function Footer() {
    return (
        <footer
            data-tauri-drag-region
            className="z-10 bg-shadow rounded-sm   flex justify-center items-center cursor-grab border border-shadow-light/25">
            <GripHorizontal
                className="size-6  text-shadow-light hover:text-accent cursor-grab transition-colors duration-200 ease-in-out"
                data-tauri-drag-region
            />
        </footer>
    )
}
