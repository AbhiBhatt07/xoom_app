// ============================================
// 7. MeetingCard.tsx - Meeting Card Component
// ============================================
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { avatarImages } from '@/constants'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon, title, date, isPreviousMeeting, buttonIcon1, handleClick, link, buttonText }: MeetingCardProps) => {
  const { toast } = useToast();
  return (
    <section className='flex min-h-[258px] w-full flex-col justify-between rounded-2xl bg-dark-1 border border-dark-3 px-6 py-8 xl:max-w-[560px] transition-all duration-300 hover:border-blue-1 hover:shadow-dark-lg transform hover:scale-102 animate-scale-in'>
      <article className='flex flex-col gap-5'>
        <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-dark-3 group-hover:bg-blue-1 transition-all duration-250'>
          <Image src={icon} alt="meeting type" width={28} height={28} />
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-2xl font-bold text-white group-hover:text-blue-1 transition-colors duration-250'>{title}</h2>
            <p className='text-sm font-normal text-gray-400'>{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-between items-center gap-2  ", {})}>
        <div className='relative flex w-full max-sm:hidden'>
          {avatarImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-3 w-full sm:w-auto p-3">
            <Button
              onClick={handleClick}
              className="flex-1 sm:flex-none rounded-lg bg-gradient-blue hover:shadow-neon-blue text-white font-semibold transition-all duration-250 transform hover:scale-105 active:scale-95"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="flex-1 sm:flex-none rounded-lg bg-dark-3 hover:bg-dark-4 text-white font-semibold transition-all duration-250 transform hover:scale-105 active:scale-95"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy
            </Button>
          </div>
        )}
      </article>
    </section>
  )
}

export default MeetingCard
