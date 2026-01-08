// ============================================
// 5. MobileNav.tsx - Mobile Navigation
// ============================================
'use client'

import {
  Sheet, SheetClose, SheetContent, SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'

const MobileNav = () => {
  const pathname = usePathname();
  
  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger asChild>
          <button className='cursor-pointer sm:hidden p-2 rounded-lg hover:bg-dark-3 transition-all duration-250 transform hover:scale-110'>
            <Menu size={28} className='text-white' />
          </button>
        </SheetTrigger>
        <SheetContent className='border-l-2 border-dark-3 bg-dark-1 text-white animate-slide-in-right'>
          <Link
            href='/'
            className='flex items-center gap-2 mt-8 group hover:opacity-80 transition-opacity duration-250'>
            <div className='rounded-lg bg-gradient-blue p-2'>
              <Image
                src="/icons/logo.svg"
                width={28}
                height={28}
                alt='Xoom Logo'
              />
            </div>
            <p className='text-2xl font-extrabold'>
              Xoom
            </p>
          </Link>
          <div className='flex h-[calc(100vh-120px)] flex-col justify-start overflow-auto'>
            <div className='flex flex-col gap-4 pt-12'>
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.route;

                return (
                  <SheetClose asChild key={item.route}>
                    <Link
                      href={item.route}
                      className={cn(
                        'flex gap-4 items-center px-4 py-3 rounded-lg w-full transition-all duration-250 transform hover:translate-x-1',
                        {
                          'bg-gradient-blue shadow-neon-blue text-white font-semibold': isActive,
                          'text-gray-300 hover:bg-dark-3 hover:text-white': !isActive,
                        }
                      )}
                    >
                      <Image
                        src={item.imgUrl}
                        alt={item.label}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold text-base">{item.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
          </div>

          <div className='absolute bottom-6 left-6 right-6 pt-6 border-t border-dark-3'>
            <p className='text-xs text-gray-500 text-center'>XOOM v1.0</p>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav