// React
import { useEffect, useState } from "react"

// Utils
import { resizeToContent } from "@/lib/resize"
import { open } from "@tauri-apps/plugin-dialog"
import { invoke } from "@tauri-apps/api/core"

// Icons
import { SquarePlus, SquareDashed } from "lucide-react"

interface Item {
    id: number
    name: string
    description?: string
    path?: string
    icon?: string
}

export default function ItemList() {
    useEffect(() => {
        const observer = new MutationObserver(() => resizeToContent())
        const section = document.querySelector("section")

        if (section) {
            observer.observe(section, {
                childList: true,
                subtree: true,
                attributes: true,
            })
        }

        // Ejecutar inicialmente
        resizeToContent()

        return () => observer.disconnect()
    }, [])

    // async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    //     setGreetMsg(await invoke("greet", { name }))
    // }

    async function addItem() {
        const filePath = await open({
            multiple: false,
            directory: false,
            // filters: [
            //     {
            //         name: "Images",
            //         extensions: ["jpg", "png", "jpeg", "gif"],
            //     },
            // ],
        })

        const metadata: Item = await invoke("get_file_metadata", { filePath })
        console.log(metadata)
        setItems([...items, metadata])
    }

    const [items, setItems] = useState<Item[]>([
        {
            id: 1,
            name: "Item 1",
            description: "Description 1",
            path: "path/to/item1",
            icon: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAED0lEQVR4Ae3AA6AkWZbG8f937o3IzKdyS2Oubdu2bdu2bdu2bWmMnpZKr54yMyLu+Xa3anqmhztr1a/wXD7rsz4rfu+Prvu4na3FPev1XZcAAzB/t9co3Wu/lKdLd8P5geePwnN4rfrHf3HX+9f+zb5iefh7553n/hpYw8s9unZv+5sqD3k3M52hPf0PYL3ieVFtS3pED8ONNz/8xT/04z/qjd6/lJ3ucz//nT/83H2PH3P6tW/S7PU/T+WaY2CCh75VY/mzwK8CE8+JWubv8H5144O/anszupd5yVP9ox5xTPfccycv/dI3XfcPTygfc+czfuZJ0nWPMQ2YnH7C02HYAcTzoi7qk372aL3xZtc+7BXf+u3fuufrvv6HUFzDLbe8OovZ6vjdt7ZHIXU4ce4vPf363wJ/C0w8L8o43nvUlev+bu/gzLu9xEu89PxweZLZ/BbuuecSf/k3GQcH+8soL/Piopvl+uf/Hv/pT15//fV/cHBwMPK8CMDjeOnuW27Zetr5i2se9tCb+Mu/fCq//pv3cvbsZpT+Pd8cbe6YxHrSk4C/v/vuu5c8fxQAuGM4eaq/D3ZP/O3fHZx+/JOunTs3uUICA4ny+KbzCb/9Du/wZk973OMeZ54Xgjd7hLqHfhVcvEPc9pfZ/uFY9J/2JdJpcZnBAAYS5x0X7HOPJ+tJnM088fOJm96JvOPnrj3zlz8q9Z/4TVEe+0EQwnuD23ReZft6KIABA2CbK8wVBhLy0hrtzPD5vWw/8uFVxMuDhBPY6lV8PRhIwNgABswVBgMYMGh7BgYW29hvVOTNEd3wWiLDXq7xfSvnfSu02YMECU7AQAIJGJzg+w6z/d7fimvO2HffQ/76H9SXeZlzP/oXf/2Nh2R5eXzPCvbvhbLn+s7vE/EqrwsBGGyuMGDMCrcf/lX8xF9MX3gIftwGHP6aAF7u5V6u+4u/+IstQMD6Az/wA4fv/u7fevjY3uqnFQ95JJcZYwCwsZ+WtK/+1O3t7W+fz+frs2fPHnut13qt8wXg7rvvTmAFLIHxL/7iL/Jt3/b1Lj7uiZeuhxteDSNIwOCza3No2Cj4z35pGK65/Wj5Mp8Dq3te8RUf9TTxwsTrv7/izb4FFGDw+ZXzO38SL/8OvdN7oWOnYZnipmvMuQvkj75v8IIJtq/Ho3ADJ86/ehq+6zePHctvruUn34e89ywcX9gXD/Df3QF3PLzyAr3yCXjQ22MJEmNgOgBuvXTp0qXP+qzP+tMv//Ivf8fDQ78itA1YXwT+svAC3TFgj3DsZVDZhP0B/8mfwbnfBe74nd/5HY/jePaN3/j1HveUpzzxb4G/B+4VL8Qrv/IrL/74j5/8ynDdW8D5Y3Dfn25szH/m6OjoHp4//hF2te6xhkscUgAAAABJRU5ErkJggg==",
        },
    ])
    return (
        <div className="grid p-1 grid-cols-5 gap-3 justify-center items-start ">
            {items.map((item, index) => (
                <img
                    key={item.id}
                    src={`data:image/png;base64,${item.icon}`}
                    alt={item.name}
                    onMouseDown={(e) => {
                        e.preventDefault()
                        if (e.button === 2) {
                            setItems([
                                ...items.slice(0, index),
                                ...items.slice(index + 1),
                            ])
                        }
                    }}
                    className="size-8 text-shadow-light hover:text-accent cursor-pointer transition-all duration-300 ease-out focus:animate-spin"
                />
                // <SquareDashed
                //     key={item.id}
                //     className="size-8 text-shadow-light hover:text-accent cursor-pointer transition-all duration-300 ease-out focus:animate-spin"
                //     onMouseDown={(e) => {
                //         e.preventDefault()
                //         if (e.button === 2) {
                //             setItems([
                //                 ...items.slice(0, index),
                //                 ...items.slice(index + 1),
                //             ])
                //         }
                //     }}
                // />
            ))}

            <SquarePlus
                className="size-8 text-shadow-light hover:text-accent cursor-pointer"
                onClick={() => addItem()}
            />
        </div>
    )
}
