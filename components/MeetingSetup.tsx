// 13. MeetingSetup.tsx - Setup Screen Before Meeting
// ============================================
'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { CheckCircle2 } from 'lucide-react'

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
    return (
      <div className='flex h-screen w-full items-center justify-center bg-dark-1 text-white'>
        <div className='animate-pulse text-xl font-semibold'>Loading...</div>
      </div>
    )
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-6 bg-dark-1 text-white animate-fade-in'>
      <div className='text-center mb-4'>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-1 to-purple-1 bg-clip-text text-transparent'>
          Setup Your Meeting
        </h1>
        <p className='text-gray-400 mt-2'>Prepare your camera and microphone</p>
      </div>
      
      <div className='rounded-2xl border-2 border-dark-3 overflow-hidden shadow-dark-lg hover:border-blue-1 transition-all duration-250'>
        <VideoPreview />
      </div>

      <div className='flex flex-col gap-4 items-center'>
        <div className='flex items-center gap-3 bg-dark-2 px-6 py-4 rounded-lg border-2 border-dark-3 hover:border-blue-1 transition-all duration-250 cursor-pointer group'>
          <input
            type="checkbox"
            id='mic-cam-toggle'
            checked={isMicCamToggledOn}
            onChange={(e) => {
              setIsMicCamToggledOn(e.target.checked)
            }}
            className='w-5 h-5 rounded cursor-pointer accent-blue-1'
          />
          <label htmlFor='mic-cam-toggle' className='font-medium cursor-pointer group-hover:text-blue-1 transition-colors duration-250'>
            Join with mic and camera off
          </label>
        </div>
        
        <DeviceSettings />
      </div>

      <Button 
        className='rounded-lg bg-gradient-blue hover:shadow-neon-blue text-white font-semibold px-8 py-3 mt-4 transition-all duration-250 transform hover:scale-105 active:scale-95 flex items-center gap-2'
        onClick={() => {
          call.join()
          setIsSetupComplete(true)
        }}>
        <CheckCircle2 size={20} />
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
