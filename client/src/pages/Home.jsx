import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import image from '../assets/woemnemp.jpeg'
import home1 from "../assets/HEROIMAGE.png"
import home2 from "../assets/HEROIMAGE2.png"
import home3 from "../assets/HEROIMAGE3.png"
import { Link } from 'react-router-dom';
import homeDesign from '../assets/HomeDesign.png'
import VideoCourousal from '../components/VideoCourousal';
import Features from '../components/Landing/Features';
import HowWeAreDifferent from '../components/Landing/HowWeAreDifferent';

function Home({ userInfo }) { 
  return (
      
      <div className="flex flex-col min-h-screen z-0 pointer-events-none">

        <div className="w-full h-screen mt-20
         flex flex-wrap gap-3 relative">
          <div  className='flex-1 flex items-center justify-center'>
            <motion.div initial={{opacity : 0 , x : -10 , y : -10}} animate={{opacity : 1 , x : 0 , y  : 0 }} transition={{duration : 0.2 , ease : "easeInOut"}} className='flex flex-col'>
              <span className='text-7xl uppercase font-bold tracking-wider'>WOMEN</span>
              <span className='text-7xl uppercase text-blue-400 font-bold tracking-wider'>entrepreneur</span>
              <span className='text-7xl uppercase  font-bold tracking-wider'>network</span>
              <div className='flex flex-col my-10 gap-5  px-3 py-2'>
                <motion.div initial={{opacity : 0  , y : 20}} animate={{opacity : 1 ,  y  : 0 }} transition={{duration : 0.5 , ease : "easeInOut"}}>
                  <div className='text-black font-bold text-3xl'>Find your role here </div>
                </motion.div>
                <motion.div  className='flex gap-5' initial={{opacity : 0  , y : 20}} animate={{opacity : 1 ,  y  : 0 }} transition={{duration : 1 , ease : "easeInOut"}}>
                  <button className='rounded-xl shadow-md font-bold capitalize tracking-wider px-3 py-2  bg-blue-500 text-white hover:bg-blue-400 '>i'm entrepreneur</button>
                  <button className='rounded-xl shadow-md font-bold capitalize tracking-wider px-3 py-2 text-blue-500 bg-white hover:bg-gray-100  '>i'm visitor</button>
                </motion.div>
              </div> 
            </motion.div>
          </div>
          <div className='flex-1 place-self-center 
          '>
              <img src={home1} alt="" />
          </div>
          <div className="absolute bottom-[54px] left-0">
              <img src={home2} alt="" />
          </div>
          <div className="absolute top-[230px] left-0">
              <img src={homeDesign} alt="" />
          </div>
          <div className="absolute top-[100px] ml-[800px] left-0">
              <img src={homeDesign} alt="" />
          </div>
        </div>

        <div className='w-full h-screen flex flex-wrap gap-3  relative'>
          <div className="flex items-center justify-center  flex-1">
            <div className='flex flex-col flex-wrap gap-5 '>
              <div className='text-3xl uppercase text-blue-500 tracking-wider'>WHAT IS WEN ?</div>
              <p className='text-xs w-[300px]'>Women Entrepreneur Networking connects women business owners, fostering collaboration, mentorship, and mutual support. It helps women overcome challenges, share resources, and access growth opportunities. Through networking, entrepreneurs build partnerships, exchange valuable business insights, and gain access to mentorship from experienced leaders. Networking events, workshops, and online communities provide platforms for learning and inspiration. It empowers women to thrive in male-dominated industries by offering emotional and professional support. This collaborative environment helps women scale their businesses, navigate challenges, and succeed together. Ultimately, it creates a supportive space for women entrepreneurs to grow and excel.</p>
            </div>
          </div>
          <div className='flex-1 place-self-center h-80 w-72'>
              <img src={home3} alt="" />
          </div>
          <div className="absolute bottom-[54px] left-0">
              <img src={home2} alt="" />
          </div>
        </div>

        <section id="highlights" className='w-screen pointer-events-auto h-full bg-zinc overflow-hidden common-padding '>
          <div className='screen-max-width '>
            <div className='mb-12 md:flex items-ends justify-between w-full'>
              <h1 id="title" className='text-black uppercase text-3xl '></h1>
            </div>
            <VideoCourousal/>
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