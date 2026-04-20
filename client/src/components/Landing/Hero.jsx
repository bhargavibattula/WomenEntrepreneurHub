import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react';
import home1 from "../../assets/HEROIMAGE.png";
import homeDesign from "../../assets/HomeDesign.png";

const Hero = () => {
  return (
    <div className="relative min-h-screen pt-0 pb-16 overflow-hidden bg-slate-50 flex items-center pointer-events-auto">
      {/* Background Gradients & Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 translate-x-1/3 w-[800px] h-[800px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Decorative patterns */}
      <img src={homeDesign} alt="Design Element" className="absolute top-40 -left-20 opacity-30 w-64 pointer-events-none mix-blend-multiply" />
      <img src={homeDesign} alt="Design Element" className="absolute top-20 right-20 opacity-20 w-48 pointer-events-none mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-8">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  Empowering Women Globally
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Women <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Entrepreneur
                </span> <br />
                Network
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                Join the most exclusive and collaborative community built specifically to help women founders scale, grow, and succeed together. Find your role today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/auth/register">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
                  >
                    I'm an Entrepreneur
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link to="/">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-700 border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto justify-center"
                  >
                    <PlayCircle className="w-5 h-5 text-indigo-500" />
                    I'm a Visitor
                  </motion.button>
                </Link>
              </div>

              {/* Social Proof / Stats */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-200 pt-8"
              >
                <div>
                  <p className="text-3xl font-extrabold text-slate-900">10k+</p>
                  <p className="text-sm font-medium text-slate-500">Active Members</p>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div>
                  <p className="text-3xl font-extrabold text-slate-900">$50M</p>
                  <p className="text-sm font-medium text-slate-500">Funded</p>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div>
                  <p className="text-3xl font-extrabold text-slate-900">50+</p>
                  <p className="text-sm font-medium text-slate-500">Countries</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Visuals */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              {/* Glass container around the image to make it ultra-premium */}
              <div className="relative rounded-[2.5rem] bg-white/40 p-4 backdrop-blur-xl border border-white/60 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-[2.5rem]"></div>
                <img 
                  src={home1} 
                  alt="Women Entrepreneur Network Hero" 
                  className="w-full h-auto object-cover rounded-[2rem] shadow-sm relative z-10"
                />
              </div>

              {/* Decorative floating blurred orbs behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 rounded-full blur-[80px] -z-10"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
