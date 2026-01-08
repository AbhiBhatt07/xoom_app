'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button';
import { X } from 'lucide-react';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  // Check if user is the meeting owner/creator
  const isMeetingOwner = localParticipant?.userId === call?.state.createdBy?.id;

  // FIX: Add debug logging to see what's happening
  console.log('Local Participant ID:', localParticipant?.userId);
  console.log('Call Creator ID:', call?.state.createdBy?.id);
  console.log('Is Owner:', isMeetingOwner);

  if (!isMeetingOwner) {
    return null; // Hide button if not owner
  }

  return (
    <Button 
      onClick={async () => {
        if (call) {
          await call.endCall();
          router.push('/')
        }
      }} 
      className='bg-red-1 hover:bg-red-600 text-white font-semibold rounded-full px-6 py-3 transition-all duration-250 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-dark-md'
    >
      <X size={20} />
      End Call
    </Button>
  )
}

export default EndCallButton