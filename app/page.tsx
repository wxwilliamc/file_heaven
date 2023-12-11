import { UserButton } from '@clerk/nextjs'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='pt-20 container'>
      <div className='p-10 flex flex-col bg-blue-500 dark:bg-slate-900 text-white rounded-xl'>
        <h1 className='text-5xl font-bold'>
          Welcome to File Heaven <br />
        </h1>

        <h1 className='italic underline text-2xl pt-4 pb-12'>
          Store everything for you own needs all in one place.
        </h1>

        <Link href='/dashboard' className='flex items-center bg-blue-950 rounded-xl max-w-[200px] p-4 hover:opacity-90 transition'>
          Try it for free
          <ArrowRightIcon className='w-5 h-5 ml-8'/>
        </Link>
      </div>
    </main>
  )
}
