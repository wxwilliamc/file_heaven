"use client"

import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button'
import Modal from './modal'

interface AlertModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading?: boolean
}

const AlertModal = ({ isOpen, onClose, onConfirm, loading }: AlertModalProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null;

  return (
    <Modal
        title='Are you sure to delete this file?'
        description='This file will be gone and cannot be found. '
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
            <Button disabled={loading} onClick={onClose} variant='outline'>
                Cancel
            </Button>

            <Button disabled={loading} variant='destructive' onClick={onConfirm}>
                Confirm
            </Button>
        </div>
    </Modal>
  )
}

export default AlertModal