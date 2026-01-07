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
  // !! mark checks if the value is truthy first and then converts it to a boolean 
  // 'personal' => !'personal' => false => !false => truthy same as with if 1st is false
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
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center '>
          <CallLayout />
        </div>
        <div className={cn('h-[clac(100vh-86px)] hidden ml-2', { 'show-block': showParticipants })}>
          <CallParticipantsList onClose={() => {
            setShowParticipants(false)
          }} />
        </div>
        <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
          <CallControls onLeave={() => router.push('/') }/>
          <DropdownMenu>
            <div className='flex items-center'>
              <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                <LayoutList size={20} className='text-white' />
              </DropdownMenuTrigger>

            </div>
            <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
              {['Grid', 'Speaker Left', 'Speaker Right'].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem onClick={() => setLayout(item.toLowerCase() as CallLayoutType)} className='cursor-pointer'>
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='border-dark-1' />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <User size={20} className='text-white' />
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  )
}

export default MeetingRoom