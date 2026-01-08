import CallList from '@/components/CallList'
import React from 'react'
import { Video } from 'lucide-react'

const Recordings = () => {
  return (
    <section className='flex flex-col gap-10 size-full text-white animate-fade-in'>
      <div>
        <h1 className='text-4xl font-bold flex items-center gap-3 mb-2'>
          <div className='p-3 bg-dark-3 rounded-lg'>
            <Video size={28} />
          </div>
          Recordings
        </h1>
        <p className='text-gray-400'>Watch your recorded meetings</p>
      </div>
      <CallList type="recordings" />
    </section>
  )
}

export default Recordings