import React, { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "XOOM - Video Conferencing",
    description: "Professional video conferencing app",
    icons: '/icons/logo.svg'
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='relative bg-dark-1 min-h-screen'>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <section className='flex min-h-screen flex-1 px-6 pb-6 pt-28 mx-md:pb-14 sm:px-14 bg-dark-1'>
                    <div className='w-full animate-fade-in'>
                        {children}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default HomeLayout