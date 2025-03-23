import { getAllWindows } from "@tauri-apps/api/window"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSettingsSchema = z.object({
    items: z.array(z.string()),
})

const items = [
    {
        id: "AlwaysOnTop",
        label: "Always on top",
    },
    {
        id: "theme",
        label: "Theme",
    },
] as const

export default function Popup() {
    const form = useForm<z.infer<typeof formSettingsSchema>>({
        resolver: zodResolver(formSettingsSchema),
        defaultValues: {
            items: ["AlwaysOnTop"],
        },
    })

    async function onSubmit(data: z.infer<typeof formSettingsSchema>) {
        const window = await getAllWindows()
        console.log(data)
        for (const win of await window) {
            await win.setAlwaysOnTop(data.items.includes("AlwaysOnTop"))
            console.log(await win.isAlwaysOnTop())
        }

        console.log("Guardado")
    }

    return (
        <div className="flex flex-col gap-1 items-center justify-center  rounded-sm h-screen p-2">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <FormField
                        control={form.control}
                        name="items"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base text-alpha">
                                        Sidebar
                                    </FormLabel>
                                    <FormDescription>
                                        Selecciona tú configuración
                                    </FormDescription>
                                </div>
                                {items.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="items"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(
                                                                item.id,
                                                            )}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                return checked
                                                                    ? field.onChange(
                                                                          [
                                                                              ...field.value,
                                                                              item.id,
                                                                          ],
                                                                      )
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (
                                                                                  value,
                                                                              ) =>
                                                                                  value !==
                                                                                  item.id,
                                                                          ),
                                                                      )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal text-alpha">
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full cursor-pointer" type="submit">
                        Guardar
                    </Button>
                </form>
            </Form>
        </div>
    )
}
