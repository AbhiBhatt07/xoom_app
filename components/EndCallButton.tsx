'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const {useLocalParticipant} = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  // Check if the user is the owner of the call using the call state
  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.id === call?.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button onClick={async () => {
      await call.endCall();
      router.push('/')
    }} className='bg-red-500'>
      End Call for Everyone
    </Button>
  )
}

export default EndCallButton