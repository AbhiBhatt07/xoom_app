'use client'
import React from 'react'
import { useUser } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { Copy, Play } from 'lucide-react';

const Table = ({ title, description }:
  { title: string; description: string }) => (
  <div className='flex flex-col gap-2 pb-4 border-b border-dark-3 last:border-b-0 hover:bg-dark-2 px-4 py-3 rounded-lg transition-all duration-250'>
    <h1 className='text-sm font-semibold text-sky-2 uppercase tracking-wide'>{title}</h1>
    <h1 className='truncate text-base font-bold text-white group-hover:text-blue-1 transition-colors duration-250 break-all'>{description}</h1>
  </div>
)

const PersonalRoom = () => {

  const { user } = useUser();
  const meetingId = user?.id
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
  const { call } = useGetCallById(meetingId!)
  const { toast } = useToast()
  const client = useStreamVideoClient()
  const router = useRouter()

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call('default', meetingId!)
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }

    router.push(`/meeting/${meetingId}?personal=true`)
  }

  return (
    <section className='flex flex-col gap-10 size-full text-white animate-fade-in'>
      <div>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-sky-1 to-blue-1 bg-clip-text text-transparent mb-2'>
          Personal Room
        </h1>
        <p className='text-gray-400'>Your private meeting space</p>
      </div>

      <div className='flex w-full flex-col gap-4 xl:max-w-[900px] bg-dark-2 border-2 border-dark-3 rounded-2xl p-6 hover:border-blue-1 transition-all duration-250'>
        <Table 
          title='Room Owner' 
          description={`${user?.firstName} ${user?.lastName}`} 
        />
        <Table 
          title='Meeting ID' 
          description={meetingId!} 
        />
        <Table 
          title='Meeting Link' 
          description={meetingLink} 
        />
      </div>

      <div className='flex gap-4 flex-wrap'>
        <Button 
          className='bg-gradient-blue hover:shadow-neon-blue text-white font-semibold px-8 py-3 rounded-lg transition-all duration-250 transform hover:scale-105 active:scale-95 flex items-center gap-2'
          onClick={startRoom}
        >
          <Play size={20} />
          Start Meeting
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
          className="bg-dark-3 hover:bg-dark-4 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-250 transform hover:scale-105 active:scale-95 flex items-center gap-2 border border-dark-3 hover:border-blue-1"
        >
          <Copy size={20} />
          Copy Invitation
        </Button>
      </div>

      <div className='mt-4 p-6 bg-dark-2 border-l-4 border-blue-1 rounded-lg animate-pulse-soft'>
        <h3 className='text-sm font-semibold text-sky-2 mb-2'>💡 How to use</h3>
        <ul className='text-sm text-gray-400 space-y-1'>
          <li>• Share your personal link with participants</li>
          <li>• They can join anytime when you start a meeting</li>
          <li>• Your personal link never changes</li>
        </ul>
      </div>
    </section>
  )

}

export default PersonalRoom
