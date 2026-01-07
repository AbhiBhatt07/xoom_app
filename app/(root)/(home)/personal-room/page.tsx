'use client'
import React from 'react'
import { useUser } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';

const Table = ({ title, description }:
  { title: string; description: string }) => (
  <div>
    <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>{title}</h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[32-px] lg:text-xl'>{description}</h1>
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
    <section className='flex flex-col gap-10 size-full text-white'
    >
      <h1 className='text-3xl font-bold'>
        Personal Room
      </h1>

      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title='Topic' description={`${user?.firstName}'s Meeting Room`} />
        <Table title='Meeting ID' description={meetingId!} />
        <Table title='Topic' description={meetingLink} />
      </div>
      <div className='flex gap-5'>
        <Button className='bg-blue-1' onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
          className="bg-dark-4 px-6"
        >
          <Image
            src="/icons/copy.svg"
            alt="feature"
            width={20}
            height={20}
          />
          &nbsp; Copy Invitation
        </Button>
      </div>
    </section>
  )

}
export default PersonalRoom