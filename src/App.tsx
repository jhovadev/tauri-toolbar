// Components
import Header from "./components/ui/header"
import Footer from "./components/ui/footer"
import { motion, AnimatePresence } from "motion/react"
import { Outlet } from "react-router"
import useWindowStore from "./stores/window-store"
import { useEffect } from "react"
import { resizeToContent } from "./lib/resize"
import { cn } from "./lib/utils"

// Tauri API
// import { invoke } from "@tauri-apps/api/core"

function App() {
    // const [greetMsg, setGreetMsg] = useState("")
    // const [name, setName] = useState("")

    const { isExpanded } = useWindowStore()

    // concept

    useEffect(() => {
        const observer = new MutationObserver(() => resizeToContent())
        const main = document.querySelector("main")

        if (main) {
            observer.observe(main, {
                childList: true,
                subtree: true,
                attributes: true,
            })
        }

        // Ejecutar inicialmente
        resizeToContent()
        console.log("Resized")
        return () => observer.disconnect()
    }, [])

    return (
        <main className="flex flex-col rounded-sm  max-h-[760px]">
            <Header />
            <AnimatePresence>
                {isExpanded && (
                    <motion.section
                        key="expanded-section"
                        initial={{ height: 1, y: 20 }}
                        animate={{
                            height: "100%",
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            height: 1,
                            y: -100,
                        }}
                        transition={{
                            ease: "anticipate",
                            duration: 0.6,
                        }}
                        className={cn(
                            "z-0 scroll-smooth scrollbar-hide overflow-y-scroll  bg-shadow  flex flex-col justify-between items-center",
                            "max-h-[516px] ",
                        )}>
                        <Outlet />
                    </motion.section>
                )}
            </AnimatePresence>
            <Footer variant={"default"} size={"md"} />
        </main>
    )
}

export default App
