import { create } from "zustand"

type WindowState = {
    isDraggable: boolean
    setIsDraggable: (isDraggable: boolean) => void
}

const useWindowStore = create<WindowState>()((set) => ({
    isDraggable: true,
    setIsDraggable: (isDraggable: boolean) => set({ isDraggable }),
}))

export default useWindowStore
