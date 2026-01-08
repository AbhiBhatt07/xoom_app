// ============================================
// 6. Loader.tsx - Loading Component
// ============================================
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-dark-1">
      <div className='relative flex flex-col items-center gap-4'>
        <div className='relative w-16 h-16'>
          <Image
            src="/icons/loading-circle.svg"
            alt="Loading..."
            width={64}
            height={64}
            className='animate-spin'
          />
        </div>
        <p className='text-sm font-medium text-gray-400 animate-pulse'>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
