import type { Decorator } from "@storybook/react"
import useWindowStore from "@/stores/window-store"

export const withZustand: Decorator = (Story, context) => {
    useWindowStore.setState({ isDraggable: true })

    return <Story {...context.args} />
}

export default withZustand
