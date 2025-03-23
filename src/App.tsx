// Components
import Header from "./components/ui/header"
import Footer from "./components/ui/footer"

import { Outlet } from "react-router"

// Tauri API
// import { invoke } from "@tauri-apps/api/core"

function App() {
    // const [greetMsg, setGreetMsg] = useState("")
    // const [name, setName] = useState("")

    return (
        <main className="flex flex-col gap-1 rounded-sm h-screen">
            <Header />
            <section className="scroll-smooth scrollbar-hide overflow-y-scroll rounded-sm bg-shadow h-full flex flex-col justify-between items-center border border-shadow-light/25 ">
                <Outlet />
            </section>
            <Footer variant={"default"} />
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
