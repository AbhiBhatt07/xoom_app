'use client'

import React, { use, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';


const Meeting = ({ params }: { params: Promise<{ id: string }> }) => {
    // Unwrap the params Promise using React.use()
    const { id } = use(params);
    
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    const { isLoaded } = useUser();
    const { call, isCallLoading } = useGetCallById(id)

    if (!isLoaded || isCallLoading) return <Loader />

    return (
        <main>
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ?
                        (<MeetingSetup setIsSetupComplete={setIsSetupComplete} />)
                        : (<MeetingRoom />)}
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default Meeting