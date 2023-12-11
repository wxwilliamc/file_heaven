'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import { FileType } from '@/type'
import DeleteModal from '../modals/deleteModal'
import { useModalStates } from '@/store/store'
import { useUser } from '@clerk/nextjs'
import { db, storage } from '@/firebase'
import { deleteObject, ref } from 'firebase/storage'
import { deleteDoc, doc } from 'firebase/firestore'
import { error } from 'console'

interface CellActionProps {
    data: FileType
}

const CellAction = ({ data }: CellActionProps) => {

    const { user } = useUser();

    const [isOpen, setIsOpen] = useState(false);

    const deleteFile = () => {
        if(!user || !data) return;

        const fileRef = ref(storage, `users/${user.id}/files/${data.id}`)

        try {
            deleteObject(fileRef).then(async () => {
                console.log('File Deleted.')
    
                deleteDoc(doc(db, 'users', user.id, 'files', data.id)).then(() => {
                    console.log("Deleted")
                })
            })
        } catch (error) {
            console.log(error)
        }

        setIsOpen(false)
    }

    return (
        <>
            <DeleteModal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={() => deleteFile()}
            />
        
            <div>
                <Button variant={"outline"} onClick={() => setIsOpen(true)}>
                    <TrashIcon className="w-5 h-5 text-rose-400" />
                </Button>
            </div>
        </>
    )
}

export default CellAction