import { createBrowserRouter } from "react-router"
import App from "./App"
import Popup from "./windows/popup"
import ItemList from "./windows/item/item-list"

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: ItemList,
            },
            {
                path: "/popup",
                Component: Popup,
            },
            {
                path: "/settings",
                Component: Popup,
            },
            {
                path: "/filter",
                Component: Popup,
            },
        ],
    },
])
