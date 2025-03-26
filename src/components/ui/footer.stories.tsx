import type { Meta, StoryObj } from "@storybook/react"
import Footer from "./footer"
import { withZustand } from "./with-window-store"

const meta: Meta<typeof Footer> = {
    title: "Components/Footer",
    component: Footer,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            options: ["default", "floating"],
            control: { type: "radio" },
        },
        size: {
            options: ["sm", "md", "lg"],
            control: { type: "radio" },
        },
    },
    parameters: {
        layout: "centered",
    },
    decorators: [withZustand],
}

export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {
    args: {
        variant: "default",
        size: "sm",
    },
}

export const Floating: Story = {
    args: {
        variant: "floating",
        size: "sm",
    },
}
