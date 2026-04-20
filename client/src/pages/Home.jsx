import React from 'react';
import VideoCourousal from '../components/VideoCourousal';
import Features from '../components/Landing/Features';
import HowWeAreDifferent from '../components/Landing/HowWeAreDifferent';
import WhatIsWen from '../components/Landing/WhatIsWen';
import Hero from '../components/Landing/Hero';

function Home({ userInfo }) { 
  return (
      
      <div className="flex flex-col min-h-screen z-0 pointer-events-none">

        <Hero />

        <WhatIsWen />

        <section id="highlights" className='w-full pointer-events-auto py-24 bg-slate-900 overflow-hidden'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='mb-16 text-center'>
              <h2 className="text-brand-400 font-semibold tracking-wide uppercase text-sm mb-3">Highlights</h2>
              <h1 id="title" className='text-4xl md:text-5xl font-extrabold text-white tracking-tight'>
                See WEN in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Action</span>
              </h1>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-black p-2 md:p-4">
              <VideoCourousal/>
            </div>
          </div>
        </section>
       
       {/* Updated Features Component */}
       <div className="pointer-events-auto">
         <Features />
       </div>


        {/* "How We're Different" Section */}
        <HowWeAreDifferent />


      </div>

  );
}

export default Home;