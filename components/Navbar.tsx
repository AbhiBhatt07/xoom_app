import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full flex items-center justify-between bg-dark-1 px-6 py-4 lg:px-10 border-b border-dark-3 transition-all duration-300 animate-fade-in">
      <Link
        href='/'
        className='flex items-center gap-1 group hover:opacity-80 transition-opacity duration-250'>
        <div className='rounded-lg bg-gradient-blue p-2 group-hover:shadow-neon-blue transition-all duration-250'>
          <Image
            src="/icons/logo.svg"
            width={32}
            height={32}
            alt='Xoom Logo'
            className='max-sm:size-8'
          />
        </div>
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>
          Xoom
        </p>
      </Link>
      <div className='flex items-center gap-5'>
        <ThemeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar