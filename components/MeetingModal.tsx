// ============================================
// 9. MeetingModal.tsx - Modal Component
// ============================================
'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface MeetingModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  className?: string
  image?: string
  children?: React.ReactNode
  handleClick?: () => void
  buttonText?: string
  buttonIcon?: React.ReactNode
}

const MeetingModal = ({ 
  isOpen, 
  onClose, 
  title, 
  className, 
  image, 
  children, 
  handleClick, 
  buttonText, 
  buttonIcon 
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-2 border-dark-3 bg-dark-1 px-6 py-9 text-white rounded-2xl shadow-dark-lg animate-scale-in'>
        <div className='flex flex-col gap-6'>
          {image && (
            <div className='flex justify-center animate-bounce'>
              <Image src={image} alt="success" width={72} height={72} />
            </div>
          )}
          <h1 className={cn('text-3xl font-bold leading-[42px] text-center', className)}>
            {title}
          </h1>
          {children && (
            <div className='flex flex-col gap-4 animate-fade-in'>
              {children}
            </div>
          )}
          <Button
            className='w-full bg-gradient-blue hover:shadow-neon-blue text-white font-semibold py-3 rounded-lg transition-all duration-250 transform hover:scale-105 active:scale-95 focus-visible:ring-0 focus-visible:ring-offset-0' 
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image src={buttonIcon as string} alt="button icon" width={18} height={18} />
            )}
            &nbsp;
            {buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
