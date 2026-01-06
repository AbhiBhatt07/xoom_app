import CallList from '@/components/CallList'
import React from 'react'

const page = () => {
  return (
   <section className='flex flex-col gap-10 size-full text-white'
    >
      <h1 className='text-3xl font-bold'>
        Pervious
      </h1>
      <CallList type='ended' />
    </section>
  )
}

export default page