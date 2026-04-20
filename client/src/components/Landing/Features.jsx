import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, BookOpen, Users, Calendar, Shield, Zap, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const features = [
  {
    id: 0,
    title: "Empowering Job Board",
    description: "Connect with skilled professionals and find opportunities to grow your business or advance your career. Get access to exclusive listings tailored for women in leadership.",
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: 1,
    title: "Insightful Articles",
    description: "Sharpen your skills with curated articles on trends, success stories, and proven business strategies from industry leaders who have walked the path.",
    icon: BookOpen,
    color: "text-indigo-500",
    bg: "bg-indigo-500",
    gradient: "from-indigo-500 to-purple-400"
  },
  {
    id: 2,
    title: "Dynamic Community",
    description: "A vibrant space to exchange ideas, spark collaboration, and build a lasting sense of belonging among thousands of ambitious women.",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500",
    gradient: "from-purple-500 to-pink-400"
  },
  {
    id: 3,
    title: "Engaging Events",
    description: "From virtual meetups to local conferences, build networks that last well beyond the room. Never miss an opportunity to connect in real life.",
    icon: Calendar,
    color: "text-rose-500",
    bg: "bg-rose-500",
    gradient: "from-rose-500 to-orange-400"
  }
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-2xl"
          >
            A powerful ecosystem <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              built for your growth.
            </span>
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Interactive Feature List */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4">
            {features.map((feature, index) => {
              const isActive = activeFeature === feature.id;
              
              return (
                <div 
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={cn(
                    "group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2",
                    isActive 
                      ? "bg-white border-transparent shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]" 
                      : "bg-transparent border-transparent hover:bg-white/60"
                  )}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeFeatureIndicator"
                      className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full ${feature.bg}`}
                    />
                  )}

                  <div className="flex items-start gap-5">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                      isActive ? feature.bg + " text-white shadow-lg" : "bg-slate-200/50 text-slate-500"
                    )}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <h3 className={cn(
                        "text-xl font-bold mb-2 transition-colors duration-300",
                        isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                      )}>
                        {feature.title}
                      </h3>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-slate-600 leading-relaxed overflow-hidden text-sm md:text-base"
                          >
                            {feature.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Visual Display */}
          <div className="w-full lg:w-7/12">
            <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] bg-slate-900 overflow-hidden shadow-2xl flex items-center justify-center p-8">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Abstract Background for Visuals */}
                  <div className={`absolute inset-0 opacity-20 bg-gradient-to-tr ${features[activeFeature].gradient}`}></div>
                  
                  {/* Glowing Orb */}
                  <div className={`absolute w-64 h-64 rounded-full blur-[80px] opacity-40 bg-gradient-to-tr ${features[activeFeature].gradient}`}></div>
                  
                  {/* The Abstract Display Component */}
                  <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${features[activeFeature].gradient} flex items-center justify-center text-white mb-6 shadow-2xl`}>
                      {React.createElement(features[activeFeature].icon, { className: "w-10 h-10" })}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {features[activeFeature].title}
                    </h3>
                    <div className="w-12 h-1 bg-white/20 rounded-full mb-6"></div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Experience the power of {features[activeFeature].title.toLowerCase()} inside our exclusive platform. Join thousands of women already making an impact.
                    </p>
                    
                    <button className="mt-8 flex items-center gap-2 text-white text-sm font-semibold hover:opacity-80 transition-opacity">
                      Explore Feature <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative grid pattern inside the dark container */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
