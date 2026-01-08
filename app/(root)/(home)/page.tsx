import MeetingTypeList from "@/components/MeetingTypeList";
import { Clock, Calendar } from "lucide-react";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-IN', { dateStyle: 'full' })).format(now);
  
  return (
    <section className='flex flex-col gap-10 size-full text-white animate-fade-in'>
      <div className='h-[300px] w-full rounded-[20px] bg-gradient-dark bg-cover relative overflow-hidden group'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-1/10 via-transparent to-purple-1/10 group-hover:from-blue-1/20 transition-all duration-500'></div>
        <div className='relative flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 z-10'>
          <div className='glassmorphism max-w-[320px] rounded-lg py-3 px-4 text-center text-base font-semibold border border-blue-1/20 backdrop-blur-lg animate-slide-in-left'>
            <p className='text-sky-2 flex items-center gap-2 justify-center'>
              <Clock size={16} />
              Upcoming Meeting at: 12:30 PM
            </p>
          </div>
          <div className='flex flex-col gap-3 animate-slide-in-left'>
            <h1 className='text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-sky-1 to-blue-1 bg-clip-text text-transparent drop-shadow-lg'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-xl flex items-center gap-2'>
              <Calendar size={20} />
              {date}
            </p>
          </div>
        </div>
      </div>
      <div className='animate-fade-in'>
        <MeetingTypeList />
      </div>
    </section>
  )
}

export default Home