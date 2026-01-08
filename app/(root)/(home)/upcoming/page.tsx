import CallList from '@/components/CallList';
import { CalendarDays } from 'lucide-react';

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
          <div className='p-3 bg-dark-3 rounded-lg'>
            <CalendarDays size={28} />
          </div>
          Upcoming Meetings
        </h1>
        <p className='text-gray-400'>Your scheduled meetings</p>
      </div>

      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage