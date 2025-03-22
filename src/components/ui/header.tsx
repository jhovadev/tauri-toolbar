import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Settings2, Minus, X } from "lucide-react"
import { getCurrentWindow } from "@tauri-apps/api/window"

interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
    children?: React.ReactNode
    className?: string
}

const appWindow = getCurrentWindow()

const Header = forwardRef<HTMLHeadingElement, HeaderProps>(
    (className, ref, ...props) => {
        return (
            <header
                ref={ref}
                {...props}
                onMouseDown={(e) => {
                    if (e.buttons === 1) {
                        // Primary (left) button
                        e.detail === 2
                            ? appWindow.toggleMaximize() // Maximize on double click
                            : appWindow.startDragging() // Else start dragging
                    }
                }}
                className={cn(
                    "border border-shadow-light/25",
                    "flex rounded-sm cursor-grab  items-center  bg-shadow",
                    className,
                )}>
                <nav className="p-2 w-full">
                    <ul className=" w-full flex gap-4 justify-between items-center">
                        <li>
                            <Settings2 className="size-6   text-shadow-light hover:text-accent cursor-pointer" />
                        </li>
                        <div className="flex items-center justify-around gap-2">
                            <li className="flex items-center gap-2 cursor-pointer rounded bg-shadow-light text-shadow hover:bg-accent">
                                <Minus
                                    className="size-6"
                                    onClick={() => appWindow.minimize()}
                                />
                            </li>
                            <li className="flex items-center gap-2 cursor-pointer rounded bg-shadow-light text-shadow hover:bg-accent ">
                                <X
                                    className="size-6 "
                                    onClick={() => appWindow.close()}
                                />
                            </li>
                        </div>
                    </ul>
                </nav>
            </header>
        )
    },
)

Header.displayName = "Header"

export default Header
