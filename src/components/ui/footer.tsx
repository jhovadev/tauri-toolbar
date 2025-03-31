import useWindowStore from "@/stores/window-store"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"

const footerVariants = cva(
    "z-10 bg-shadow rounded-bl-sm rounded-br-sm flex min-w-[220px] justify-center items-center border border-shadow-light/25", // Estilos base
    {
        variants: {
            variant: {
                default: " border-shadow-light/25 cursor-pointer", // Variante normal
                floating: "bg-background border-border shadow-lg cursor-move", // Variante flotante
            },
            size: {
                sm: "h-8 gap-1.5 px-2",
                md: "h-12 max-h-10 gap-3 px-4",
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
        const { isExpanded, setIsExpanded } = useWindowStore()

        return (
            <footer
                ref={ref}
                {...props}
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    footerVariants({ variant, size, className }), // Aplicamos las variantes
                )}>
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.5 }}
                    className="focus:border-0 focus:outline-none">
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
