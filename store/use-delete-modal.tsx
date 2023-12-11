import { create } from "zustand";

interface DeleteModal {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useDeleteModal = create<DeleteModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))