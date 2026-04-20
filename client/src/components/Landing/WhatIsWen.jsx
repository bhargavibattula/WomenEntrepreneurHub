import React from 'react';
import { motion } from 'framer-motion';
import home3 from "../../assets/HEROIMAGE3.png";
import home2 from "../../assets/HEROIMAGE2.png";
import { Users, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

const WhatIsWen = () => {
  const highlights = [
    {
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      title: "Community & Collaboration",
      desc: "Connect with like-minded women to share resources and build lasting partnerships."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
      title: "Growth Opportunities",
      desc: "Access mentorship, valuable business insights, and opportunities to scale your venture."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
      title: "Supportive Environment",
      desc: "A safe space to overcome challenges and thrive in male-dominated industries."
    },
    {
      icon: <Zap className="w-5 h-5 text-indigo-500" />,
      title: "Empowerment",
      desc: "Gain emotional and professional support through events, workshops, and networking."
    }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-50 pointer-events-auto">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-100/50 blur-[100px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                About Our Network
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">WEN?</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                <strong className="text-slate-800 font-semibold">Women Entrepreneur Networking</strong> connects women business owners, fostering collaboration, mentorship, and mutual support. It helps women overcome challenges, share resources, and access growth opportunities.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Ultimately, it creates a supportive space for women entrepreneurs to grow, scale their businesses, navigate challenges, and excel together.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual/Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:ml-auto"
          >
            {/* Abstract Decorative Background behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100 p-8 flex items-center justify-center">
               <img 
                 src={home3} 
                 alt="Women Entrepreneur Network" 
                 className="w-full max-w-sm h-auto object-contain hover:scale-105 transition-transform duration-500" 
               />
               
               {/* Floating elements to make it look "SaaS-y" */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                 className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block"
               >
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                     <TrendingUp className="w-5 h-5 text-green-600" />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-medium">Network Growth</p>
                     <p className="text-sm font-bold text-slate-900">+124% this year</p>
                   </div>
                 </div>
               </motion.div>

               <motion.div 
                 animate={{ y: [0, 10, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                 className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block"
               >
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                     <Users className="w-5 h-5 text-blue-600" />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-medium">Active Members</p>
                     <p className="text-sm font-bold text-slate-900">Global Community</p>
                   </div>
                 </div>
               </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Retaining the absolute position image if needed, though adjusting its styling */}
      <img src={home2} alt="Decoration" className="absolute bottom-0 left-0 opacity-20 pointer-events-none w-64" />
    </section>
  );
};

export default WhatIsWen;
