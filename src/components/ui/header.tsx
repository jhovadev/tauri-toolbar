import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Lock, LockOpen, Settings2, Minus, X } from "lucide-react"

// Tauri
import { getCurrentWindow } from "@tauri-apps/api/window"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

// Utils
import { useLocation } from "react-router"
import useWindowStore from "@/stores/windowState"

interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
    children?: React.ReactNode
    className?: string
}

const appWindow = getCurrentWindow()

const Header = forwardRef<HTMLHeadingElement, HeaderProps>(
    (className, ref, ...props) => {
        const { isDraggable, setIsDraggable } = useWindowStore()
        const location = useLocation()

        const openPopup = async () => {
            const popupWindow = new WebviewWindow("popupWindow", {
                url: "http://localhost:1420/popup", // URL de tu página del modal o popup
                resizable: false, // Puedes ponerlo en falso si no quieres que el popup se redimensione
                title: "Popup Modal",
                decorations: false,
                alwaysOnTop: true,
                transparent: true,
                closable: true,
                width: 220,
                maxWidth: 220,
                minHeight: 320,
                height: 320,
                maxHeight: 760,
                shadow: false,

                // Otras opciones aquí (x, y, etc.)
            })

            popupWindow.once("tauri://created", () => {
                console.log("Popup creado exitosamente")
            })

            popupWindow.once("tauri://error", (e) => {
                console.error("Error al crear el popup:", e)
            })
        }

        const lockPosition = () => {
            setIsDraggable(!isDraggable)
        }

        // Limpiar intervalo al desmontar

        return (
            <header
                ref={ref}
                {...props}
                onMouseDown={(e) => {
                    if (e.buttons === 1) {
                        // Primary (left) button
                        e.detail === 2
                            ? appWindow.toggleMaximize() // Maximize on double click
                            : isDraggable
                              ? appWindow.startDragging()
                              : "" // Else start dragging
                    }
                }}
                className={cn(
                    "border border-shadow-light/25",
                    "flex rounded-sm cursor-grab  items-center  bg-shadow",
                    className,
                )}>
                <nav className="p-2 w-full">
                    <ul className=" w-full flex gap-4 justify-between items-center">
                        <div className="flex items-center justify-around gap-2">
                            <button
                                type="button"
                                onClick={() => openPopup()}
                                onMouseDown={(e) => e.stopPropagation()} // Detener la propagación aquí
                                aria-label="Minimizar ventana"
                                className={cn(
                                    "flex items-center gap-2 cursor-pointer rounded",
                                    location.pathname === "/popup" &&
                                        "cursor-not-allowed",
                                )}
                                disabled={location.pathname === "/popup"}>
                                <Settings2
                                    className={cn(
                                        "size-6   text-shadow-light hover:text-accent cursor-pointer transition-colors duration-200 ease-in-out",
                                        location.pathname === "/popup" &&
                                            "text-accent",
                                    )}
                                />
                            </button>
                            <button
                                type="button"
                                onClick={() => lockPosition()}
                                onMouseDown={(e) => e.stopPropagation()} // Detener la propagación aquí
                                aria-label="Lock in position"
                                className={cn(
                                    "flex items-center gap-2 cursor-pointer rounded",
                                )}>
                                {isDraggable ? (
                                    <Lock
                                        className={cn(
                                            "size-6   text-shadow-light hover:text-accent cursor-pointer transition-colors duration-200 ease-in-out",
                                        )}
                                    />
                                ) : (
                                    <LockOpen
                                        className={cn(
                                            "size-6   text-shadow-light hover:text-accent cursor-pointer transition-colors duration-200 ease-in-out",
                                            isDraggable && "text-accent",
                                        )}
                                    />
                                )}
                            </button>
                        </div>
                        <div className="flex items-center justify-around gap-2">
                            <button
                                type="button"
                                onClick={() => appWindow.minimize()}
                                onMouseDown={(e) => e.stopPropagation()} // Detener la propagación aquí
                                aria-label="Minimizar ventana"
                                className="flex items-center gap-2 cursor-pointer rounded bg-shadow-light text-shadow hover:bg-blue-500 transition-colors duration-200 ease-in-out">
                                <Minus className="size-6" />
                            </button>
                            <button
                                type="button"
                                onClick={() => appWindow.close()}
                                onMouseDown={(e) => e.stopPropagation()} // Detener la propagación aquí
                                aria-label="Cerrar ventana"
                                className="flex items-center gap-2 cursor-pointer rounded bg-shadow-light text-shadow hover:bg-red-500 transition-colors duration-200 ease-in-out">
                                <X className="size-6" />
                            </button>
                        </div>
                    </ul>
                </nav>
            </header>
        )
    },
)

Header.displayName = "Header"

export default Header
