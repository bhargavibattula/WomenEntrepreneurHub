import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import sadface from '../assets/sadface.gif';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-32 pb-20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/20 rounded-[3rem] blur-2xl transform rotate-6"></div>
            <img 
              src={sadface} 
              alt="404 Sad Face" 
              className="relative w-64 md:w-80 h-auto mx-auto rounded-[2.5rem] shadow-2xl border-4 border-white"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-4">
            4<span className="text-blue-600">0</span>4
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all w-full sm:w-auto justify-center"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all w-full sm:w-auto justify-center shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </motion.div>

        {/* Floating background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] select-none">
          <span className="text-[20vw] font-black whitespace-nowrap">LOST SPACE</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
