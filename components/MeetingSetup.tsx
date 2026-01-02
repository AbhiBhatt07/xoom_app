'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import { useState, useEffect } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)

  const call = useCall();

  useEffect(() => {
    if (!call) return;

    if (isMicCamToggledOn) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggledOn, call])

  if (!call) {
    return <div className='flex h-screen w-full items-center justify-center text-white'>Loading...</div>
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup </h1>
      <VideoPreview />
      <div className='flec h-16 justify-center items-center gap-2 font-medium'>
        <label className='flex justify-center items-center gap-2 font-medium'>
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => {
              setIsMicCamToggledOn(e.target.checked)
            }}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className='rounded-md bg-green-500 px-4 py-2.5'
        onClick={() => {
          call.join()
          setIsSetupComplete(true)
        }}>
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup