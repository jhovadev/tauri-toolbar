import useWindowStore from "@/stores/window-store"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"

const footerVariants = cva(
    "z-10 bg-shadow rounded-sm flex min-w-[13.75rem] justify-center items-center cursor-grab border border-shadow-light/25", // Estilos base
    {
        variants: {
            variant: {
                default: " border-shadow-light/25 cursor-move", // Variante normal
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
        const { isDraggable, isExpanded, setIsExpanded } = useWindowStore()

        return (
            <footer
                ref={ref}
                {...props}
                {...(isDraggable ? { "data-tauri-drag-region": "" } : {})}
                className={cn(
                    footerVariants({ variant, size, className }), // Aplicamos las variantes
                )}>
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.5 }}
                    className="focus:border-0 focus:outline-none"
                    onClick={() => setIsExpanded(!isExpanded)}>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }} // Rota 180° si está expandido
                        transition={{ duration: 0.2, ease: "easeInOut" }}>
                        <ChevronDown className="size-6  text-shadow-light cursor-pointer transition-colors duration-200 ease-in-out" />
                    </motion.div>
                </motion.button>
            </footer>
        )
    },
)

Footer.displayName = "Footer"

export default Footer
