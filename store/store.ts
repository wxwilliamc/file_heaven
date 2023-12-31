import { create } from "zustand";

interface ModalStates {
    isDeleteModalOpen: boolean
    setIsDeleteModalOpen: (open: boolean) => void

    isRenameModalOpen: boolean
    setIsRenameModalOpen: (open: boolean) => void

    fileId: string | null
    setFileId: (fileId: string) => void

    filename: string | null
    setFilename: (filename: string) => void
}

export const useModalStates = create<ModalStates>()((set) => ({
    fileId: null,
    setFileId: (fileId: string) => set((state) => ({ fileId })),

    filename: '',
    setFilename: (filename: string) => set((state) => ({ filename })),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open })),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open) => set((state) => ({ isRenameModalOpen: open }))
}))