import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, BookOpen, Users, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const features = [
  {
    id: 0,
    title: "Empowering Job Board",
    description: "Connect with skilled professionals and find opportunities to grow your business or advance your career. Get access to exclusive listings tailored for women in leadership.",
    icon: Briefcase,
    color: "text-blue-600",
    bg: "bg-blue-600",
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    id: 1,
    title: "Insightful Articles",
    description: "Sharpen your skills with curated articles on trends, success stories, and proven business strategies from industry leaders who have walked the path.",
    icon: BookOpen,
    color: "text-indigo-600",
    bg: "bg-indigo-600",
    gradient: "from-indigo-600 to-blue-500"
  },
  {
    id: 2,
    title: "Dynamic Community",
    description: "A vibrant space to exchange ideas, spark collaboration, and build a lasting sense of belonging among thousands of ambitious women.",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Engaging Events",
    description: "From virtual meetups to local conferences, build networks that last well beyond the room. Never miss an opportunity to connect in real life.",
    icon: Calendar,
    color: "text-indigo-500",
    bg: "bg-indigo-500",
    gradient: "from-indigo-500 to-blue-400"
  }
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden pointer-events-auto">
      {/* Subtle theme background orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-20 text-center lg:text-left">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Why Choose WEN?</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto lg:mx-0">
              A powerful ecosystem <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                built for your growth.
              </span>
            </h3>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Interactive Feature List */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4">
            {features.map((feature) => {
              const isActive = activeFeature === feature.id;
              
              return (
                <div 
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={cn(
                    "group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2",
                    isActive 
                      ? "bg-white border-blue-100 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.1)]" 
                      : "bg-transparent border-transparent hover:bg-white/60"
                  )}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeFeatureIndicator"
                      className="absolute left-[-2px] top-1/4 bottom-1/4 w-1.5 rounded-r-full bg-blue-600"
                    />
                  )}

                  <div className="flex items-start gap-5">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
                      isActive 
                        ? `bg-gradient-to-br ${feature.gradient} text-white shadow-lg shadow-blue-500/30 scale-110` 
                        : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                    )}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <h3 className={cn(
                        "text-xl font-bold mb-2 transition-colors duration-300",
                        isActive ? "text-slate-900" : "text-slate-600 group-hover:text-blue-600"
                      )}>
                        {feature.title}
                      </h3>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-slate-600 leading-relaxed overflow-hidden text-sm md:text-base mt-2"
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
            <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] bg-white border border-blue-50 overflow-hidden shadow-2xl flex items-center justify-center p-8 group">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Premium abstract background mapped to theme colors */}
                  <div className={`absolute inset-0 opacity-[0.03] bg-gradient-to-tr ${features[activeFeature].gradient}`}></div>
                  
                  {/* Glowing Orb */}
                  <div className={`absolute w-72 h-72 rounded-full blur-[100px] opacity-30 bg-gradient-to-tr ${features[activeFeature].gradient}`}></div>
                  
                  {/* The Abstract Display Component */}
                  <div className="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-xl border border-white rounded-3xl p-10 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] flex flex-col items-center text-center">
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${features[activeFeature].gradient} flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-500/20`}>
                      {React.createElement(features[activeFeature].icon, { className: "w-12 h-12" })}
                    </div>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                      {features[activeFeature].title}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6"></div>
                    <p className="text-slate-600 text-base leading-relaxed">
                      Experience the power of {features[activeFeature].title.toLowerCase()} inside our exclusive platform. Join thousands of women already making an impact.
                    </p>
                    
                    <button className="mt-8 flex items-center gap-2 text-blue-600 text-sm font-bold hover:text-blue-800 transition-colors bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100">
                      Explore Feature <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
