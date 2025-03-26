// Components
import Header from "./components/ui/header"
import Footer from "./components/ui/footer"
import { motion, AnimatePresence } from "motion/react"
import { Outlet } from "react-router"
import useWindowStore from "./stores/window-store"

// Tauri API
// import { invoke } from "@tauri-apps/api/core"

function App() {
    // const [greetMsg, setGreetMsg] = useState("")
    // const [name, setName] = useState("")
    const { isExpanded } = useWindowStore()

    return (
        <main className="flex flex-col gap-1 rounded-sm h-screen">
            <Header />
            <AnimatePresence>
                {isExpanded && (
                    <motion.section
                        initial={{ height: 0 }} // Comienza arriba y colapsado
                        animate={{ height: "100%", opacity: 1, y: 0 }} // Se expande como un cajón
                        exit={{ height: 0 }} // Se cierra deslizándose hacia abajo
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="scroll-smooth scrollbar-hide overflow-y-scroll rounded-sm bg-shadow h-full flex flex-col justify-between items-center border border-shadow-light/25 ">
                        <Outlet />
                    </motion.section>
                )}
            </AnimatePresence>

            <Footer variant={"default"} size={"md"} />
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
