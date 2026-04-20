import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-medium mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          Connecting 10,000+ Women Entrepreneurs
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6"
        >
          Empowering the Next Generation <br className="hidden lg:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
            of Women Leaders.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join a thriving community of women business owners. Access tailored resources, 
          networking opportunities, and mentorship to scale your vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/auth/register"
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 text-white rounded-xl font-semibold shadow-lg shadow-brand-500/25 hover:bg-brand-700 transition-all flex items-center justify-center gap-2 group"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-current" />
            Watch Demo
          </button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 lg:mt-24 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm p-2 shadow-2xl overflow-hidden">
            <div className="bg-slate-50 rounded-lg aspect-[16/9] overflow-hidden border border-slate-100">
                {/* Mockup content */}
                <div className="w-full h-full bg-gradient-to-br from-brand-50 to-indigo-50 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1573164067507-40e1d48c08ff?auto=format&fit=crop&q=80&w=1200" 
                      alt="Product Mockup" 
                      className="w-full h-full object-cover opacity-80"
                    />
                </div>
            </div>
          </div>
          {/* Floating elements */}
          <div className="absolute -top-6 -right-6 h-24 w-24 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center p-4 animate-bounce duration-[3000ms]">
            <div className="h-full w-full rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                <span className="font-bold text-xl">+42%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
