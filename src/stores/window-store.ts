import { create } from "zustand"

type WindowState = {
    isDraggable: boolean
    setIsDraggable: (isDraggable: boolean) => void
    isExpanded: boolean
    setIsExpanded: (isDraggable: boolean) => void
}

const useWindowStore = create<WindowState>()((set) => ({
    isDraggable: true,
    setIsDraggable: (isDraggable: boolean) => set({ isDraggable }),
    isExpanded: true,
    setIsExpanded: (isExpanded: boolean) => set({ isExpanded }),
}))

export default useWindowStore
