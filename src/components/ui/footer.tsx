import useWindowStore from "@/stores/windowState"
import { GripHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

const footerVariants = cva(
    "z-10 bg-shadow rounded-sm flex justify-center items-center cursor-grab border border-shadow-light/25", // Estilos base
    {
        variants: {
            variant: {
                default: "bg-shadow border-shadow-light/25 cursor-grab", // Variante normal
                subtle: "bg-transparent border-transparent cursor-default", // Variante sin fondo
                floating: "bg-background border-border shadow-lg cursor-move", // Variante flotante
            },
            size: {
                sm: "h-8 gap-1.5 px-2",
                md: "h-12 gap-3 px-4",
                lg: "h-16 gap-4 px-6",
            },
        },
        defaultVariants: {
            // Variantes por defecto
            variant: "default",
            size: "md",
        },
    },
)

interface FooterProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof footerVariants> {
    asChild?: boolean
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(
    ({ className, variant, size, ...props }, ref) => {
        const { isDraggable } = useWindowStore()

        return (
            <footer
                ref={ref}
                {...props}
                {...(isDraggable ? { "data-tauri-drag-region": "" } : {})}
                className={cn(
                    footerVariants({ variant, size, className }), // Aplicamos las variantes
                )}>
                <GripHorizontal
                    className="size-6  text-shadow-light hover:text-accent cursor-grab transition-colors duration-200 ease-in-out"
                    {...(isDraggable ? { "data-tauri-drag-region": "" } : {})}
                />
            </footer>
        )
    },
)
// className={cn(
//     "z-10 bg-shadow rounded-sm   flex justify-center items-center cursor-grab border border-shadow-light/25",
//     className,
// )}>
Footer.displayName = "Footer"

export default Footer
