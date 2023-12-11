'use client'

import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

const DropzoneComponent = () => {

    const [loading, setLoading] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser();

    const maxSize = 20971520;

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted")
            reader.onerror = () => console.log("file reading has failed")
            reader.onload = async () => {
                await uploadPost(file)
            }
            reader.readAsArrayBuffer(file);
        })
    }

    const uploadPost = async (selectedFile: File) => {
        if (loading) return;
        if(!user) return;

        setLoading(true);

        // Upload to backend
        const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
            userId: user.id,
            filename: selectedFile.name,
            fullName: user.fullName,
            profileImg: user.imageUrl,
            timeStamp: serverTimestamp(),
            type: selectedFile.type,
            size: selectedFile.size,
        })

        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)
        uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
                downloadURL: downloadURL
            })
        })

        // When done upload
        setLoading(false);
    }

    return (
        <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {

                const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

                return (
                    <section className='p-8'>
                        <div {...getRootProps()} className={cn(`w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center hover:bg-slate-50 transition dark:hover:text-black`, isDragActive ? "bg-blue-500 text-white animate-pulse" : "opacity-75")}>
                            <input {...getInputProps()} />
                            {!isDragActive && 'Click here or drop a file to upload'}
                            {isDragActive && !isDragReject && "Drop to upload this file"}
                            {isDragReject && "File type not accepted, Try again."}
                            {isFileTooLarge && (
                                <span className='text-danger mt-2'>
                                    File is too large. (Max 200GB)
                                </span>
                            )}
                        </div>
                    </section>
                )
            }}
        </Dropzone>
    )
}

export default DropzoneComponent