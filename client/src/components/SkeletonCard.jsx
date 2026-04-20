import React from 'react'

function SkeletonCard() {
  return (
    <div className='flex flex-wrap w-full gap-5  px-3 sm:px-9 md:px-32 lg:px-80  py-5'>
        {[...Array(6)].map((card,index) => (
            <div className='bg-white basis-[400px] shadow-md  p-6 transition-transform transform hover:scale-[101%]'>
                <div className="w-full h-3 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
                <div className="w-full h-3 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
                <div className="w-full h-3 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
                <div className="w-full h-3 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
                <div className="w-full h-3 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
                <div className="w-full h-20 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
                <div className="w-full h-20 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
                <div className="w-full h-3 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
            </div>
        ))}
    </div>
  )
}

export default SkeletonCard