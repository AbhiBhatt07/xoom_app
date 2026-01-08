// 12. MeetingRoom.tsx - Meeting Video Room
// ============================================
'use client'
import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import { LayoutList, Speaker, User } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'
import { useRouter } from 'next/navigation'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false)
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();

  if (callingState !== CallingState.JOINED) return <Loader/>

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition='left' />;
      default:
        return <SpeakerLayout participantsBarPosition='right' />;
    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white bg-dark-1'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2 rounded-lg bg-dark-2 border border-dark-3 overflow-hidden transition-all duration-300', { 'block animate-slide-in-right': showParticipants })}>
          <CallParticipantsList onClose={() => {
            setShowParticipants(false)
          }} />
        </div>
        <div className='fixed bottom-0 left-0 right-0 flex w-full items-center justify-center gap-5 flex-wrap bg-gradient-to-t from-dark-1 to-transparent p-6 backdrop-blur-sm'>
          <CallControls onLeave={() => router.push('/')} />
          
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer rounded-full bg-dark-3 hover:bg-dark-4 p-3 transition-all duration-250 transform hover:scale-110 active:scale-95 border border-dark-3 hover:border-blue-1'>
              <LayoutList size={20} className='text-white' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-2 border-dark-3 bg-dark-1 text-white rounded-lg shadow-dark-lg animate-scale-in'>
              {['Grid', 'Speaker Left', 'Speaker Right'].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem 
                    onClick={() => setLayout(item.toLowerCase() as CallLayoutType)} 
                    className='cursor-pointer hover:bg-dark-3 rounded transition-colors duration-250'
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='border-dark-3' />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <button 
            onClick={() => setShowParticipants((prev) => !prev)}
            className='cursor-pointer rounded-full bg-dark-3 hover:bg-dark-4 p-3 transition-all duration-250 transform hover:scale-110 active:scale-95 border border-dark-3 hover:border-blue-1'
          >
            <User size={20} className='text-white' />
          </button>

          <CallStatsButton />
          
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  )
}

export default MeetingRoom
