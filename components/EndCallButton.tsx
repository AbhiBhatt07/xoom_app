// 11. EndCallButton.tsx - End Call Button
// ============================================
'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button';
import { X } from 'lucide-react';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const {useLocalParticipant} = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  // Check if the user is the owner of the call using the call state
  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.id === call?.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button 
      onClick={async () => {
        await call.endCall();
        router.push('/')
      }} 
      className='bg-red-1 hover:bg-red-600 text-white font-semibold rounded-full px-6 py-3 transition-all duration-250 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-dark-md'
    >
      <X size={20} />
      End Call
    </Button>
  )
}

export default EndCallButton