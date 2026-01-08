import CallList from '@/components/CallList'
import React from 'react'
import { Clock } from 'lucide-react'

const PreviousPage = () => {
  return (
    <section className='flex flex-col gap-10 size-full text-white animate-fade-in'>
      <div>
        <h1 className='text-4xl font-bold flex items-center gap-3 mb-2'>
          <div className='p-3 bg-dark-3 rounded-lg'>
            <Clock size={28} />
          </div>
          Previous Meetings
        </h1>
        <p className='text-gray-400'>Your meeting history</p>
      </div>
      <CallList type='ended' />
    </section>
  )
}

export default PreviousPage