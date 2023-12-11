import { SignInButton, SignedOut, UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './theme-toggle'

const Header = () => {

  return (
    <header className='flex items-center justify-between p-4 container px-20 border-b'>
        <Link href='/'>
            <h1 className='font-bold text-xl'>
                FILE HEAVEN
            </h1>
        </Link>
        
        <div className='flex items-center space-x-4'>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Button */}
            <UserButton afterSignOutUrl='/'/>

            <SignedOut>
                <SignInButton afterSignInUrl='/dashboard' mode='modal'/>
            </SignedOut>
        </div>
    </header>
  )
}

export default Header