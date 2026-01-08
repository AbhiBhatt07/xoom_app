// ============================================
// 4. HomeCard.tsx - Card Component
// ============================================
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HomeCardProps {
  className?: string
  img: string
  title: string
  description: string
  handleClick: () => void
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <div 
      className={cn(
        'px-6 py-8 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-dark-lg active:scale-95 group animate-scale-in',
        className
      )}
      onClick={handleClick}>
      <div className="flex items-center justify-center size-14 rounded-xl bg-white bg-opacity-20 backdrop-blur-md group-hover:bg-opacity-30 transition-all duration-250">
        <Image
          src={img} 
          alt='meeting' 
          width={28} 
          height={28}
          className="group-hover:scale-110 transition-transform duration-250"
        />
      </div>
      <div className='flex flex-col gap-3'>
        <h1 className='text-2xl font-bold group-hover:text-gray-200 transition-colors duration-250'>
          {title}
        </h1>
        <p className='text-base font-normal text-gray-300 group-hover:text-white transition-colors duration-250'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default HomeCard