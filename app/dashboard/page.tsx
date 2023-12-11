import DropzoneComponent from '@/components/dropzone';
import TableWrapper from '@/components/table/tableWrapper';
import { db } from '@/firebase';
import { FileType } from '@/type';
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'

const DashboardPage = async () => {

  const { userId } = auth();

  const docResults = await getDocs(collection(db, 'users', userId!, 'files'))

  const allfiles: FileType[] = docResults.docs.map(doc => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timeStamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  })) 

  console.log(allfiles)
  
  return (
    <div className='border-t'>
     <DropzoneComponent />

     <section className='container space-y-5'>
        <h2 className='font-bold'>All Files</h2>

        <div>
          {/* Table Wrapper */}
          <TableWrapper 
            allFiles={allfiles}
          />
        </div>
     </section>
    </div>
  )
}

export default DashboardPage