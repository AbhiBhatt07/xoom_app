// ============================================
// 3. Sidebar.tsx - Side Navigation
// ============================================
'use client'

import React from 'react'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();
  
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between p-6 pt-28 text-white max-sm:hidden lg:w-[264px] bg-dark-1 border-r border-dark-3 transition-all duration-300 animate-slide-in-left">
      <div className="flex flex-1 flex-col gap-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                'flex gap-4 items-center px-4 py-3 rounded-lg justify-start transition-all duration-250 transform hover:translate-x-1 group',
                {
                  'bg-gradient-blue shadow-neon-blue text-white font-semibold': isActive,
                  'text-gray-300 hover:bg-dark-3 hover:text-white': !isActive,
                }
              )}>
              <div className={cn('transition-all duration-250', isActive && 'drop-shadow-lg')}>
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={24}
                  height={24}
                  className="group-hover:scale-110 transition-transform duration-250"
                />
              </div>
              <p className='text-lg font-semibold max-lg:hidden'>
                {link.label}
              </p>
            </Link>
          )
        })}
      </div>

      <div className='pt-6 border-t border-dark-3'>
        <p className='text-xs text-gray-400 text-center'>XOOM v1.0</p>
      </div>
    </section>
  )
}

export default Sidebar