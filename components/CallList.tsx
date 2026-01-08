// ============================================
// 8. CallList.tsx - Call/Meeting List
// ============================================
// @ts-nocheck

'use client'
import React, { use } from 'react'
import { useGetCalls } from '../hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import { CallRecording } from '@stream-io/node-sdk';
import { useState, useEffect } from 'react';
import { Call } from '@stream-io/video-react-sdk';
import MeetingCard from "./MeetingCard"
import Loader from './Loader';
import { useToast } from '@/hooks/use-toast';


const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const router = useRouter();

  const [recordings, setRecordings] = useState<CallRecording[]>([])

  const { toast } = useToast();
  const getCallType = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return callRecordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  }

  const getNoCallMessage = () => {
    switch (type) {
      case 'ended':
        return 'No ended calls';
      case 'recordings':
        return 'No recordings';
      case 'upcoming':
        return 'No upcoming calls';
      default:
        return '';
    }
  }

  useEffect(() => {
    const fetchRecording = async () => {

      try {
        if (!Array.isArray(callRecordings)) return;
        
        const callData = await Promise.all(callRecordings
          .map((meeting) => meeting.queryRecordings()))

        const recordings = callData
          .filter(call => call.recordings.length > 0)
          .flatMap(call => call.recordings)
        setRecordings(recordings)

      } catch (error) {
        toast({ title: 'Too many requests try again later' })
        console.log(error);
      }

    }
    if (type === 'recordings') fetchRecording();
  }, [type, callRecordings])

  const calls = type === 'recordings' ? recordings : getCallType();
  const noCallMessage = getNoCallMessage();

  if (isLoading) return <Loader />

  return (
    <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
        <div key={(meeting as Call).id} className='animate-fade-in'>
          <MeetingCard
            icon={
              type === 'ended' ? '/icons/previous.svg' : type === 'upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'
            }
            title={(meeting as Call).state?.custom?.description?.substring(0, 25) || meeting?.filename?.substring(0, 20) || 'Personal Meeting'}
            date={meeting.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
            isPreviousMeeting={type === 'ended'}
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            handleClick={type === 'recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
            link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
            buttonText={type === 'recordings' ? 'Play' : 'Join'}
          />
        </div>
      )) : (
        <div className='col-span-full flex items-center justify-center py-12 animate-pulse-soft'>
          <h1 className='text-xl font-semibold text-gray-400'>{noCallMessage}</h1>
        </div>
      )}
    </div>
  )
}

export default CallList