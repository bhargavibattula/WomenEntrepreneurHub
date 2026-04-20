import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const differences = [
  {
    num: "01",
    title: "Tailored Resources",
    description: "Mentorship and resources specifically designed for the unique challenges women entrepreneurs face."
  },
  {
    num: "02",
    title: "Collaboration First",
    description: "A strict focus on collaboration over competition, fostering genuine community growth."
  },
  {
    num: "03",
    title: "Safe & Inclusive",
    description: "A highly respectful environment engineered for both personal and professional growth."
  },
  {
    num: "04",
    title: "Meaningful Connections",
    description: "Advanced tools for showcasing businesses and building lasting, high-value relationships."
  },
  {
    num: "05",
    title: "Exclusive Content",
    description: "Direct access to content addressing the nuances of building a business as a woman."
  },
  {
    num: "06",
    title: "Global Reach",
    description: "Local roots with global networking opportunities to expand your horizons infinitely."
  },
  {
    num: "07",
    title: "Community Driven",
    description: "An unwavering emphasis on community-driven support, guidance, and peer mentorship."
  },
  {
    num: "08",
    title: "True Empowerment",
    description: "Empowering women to not just survive, but to thrive and succeed together at scale."
  }
];

const HowWeAreDifferent = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden pointer-events-auto">
      {/* Decorative ambient background matching the theme */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-full blur-[120px] opacity-80 -z-10 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Sticky Left Column */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 self-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">
                  The Women Connect Difference
                </span>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Designed <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  differently.
                </span>
              </h2>
              
              <p className="text-xl text-slate-600 leading-relaxed mb-10">
                We go beyond just offering a platform. We’re creating a space that’s truly empowering and inclusive, engineered from the ground up for women in business.
              </p>

              {/* Minimal CTA matching theme */}
              <Link 
                to="/auth/register"
                className="group inline-flex items-center gap-3 text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Experience it yourself 
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <ArrowRight className="w-5 h-5 text-blue-600 transition-colors" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Scrolling Right Column (List) */}
          <div className="w-full lg:w-7/12 flex flex-col gap-12 lg:gap-16">
            {differences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex gap-6 lg:gap-8"
              >
                {/* Huge Background Number mapped to theme */}
                <div className="absolute -left-4 -top-8 text-[120px] font-black text-blue-50/50 group-hover:text-blue-100/50 transition-colors duration-500 pointer-events-none select-none z-0">
                  {item.num}
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-4 flex-1 border-t-2 border-slate-100 group-hover:border-blue-200 transition-colors duration-500">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Extraordinary Professional CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 relative rounded-[2rem] bg-white border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          {/* Subtle gradient highlights */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500"></div>
          <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-blue-50 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute -left-40 -top-40 w-96 h-96 bg-indigo-50 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative p-12 md:p-20 flex flex-col items-center text-center z-10">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            
            <h4 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-3xl">
              Ready to scale your vision alongside industry leaders?
            </h4>
            
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
              Join a vetted network of ambitious women founders. Gain access to exclusive resources, high-value connections, and the support you need to accelerate your growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
              <Link 
                to="/auth/register" 
                className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Apply to Join Network
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/business/all-business" 
                className="flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all w-full sm:w-auto"
              >
                Explore Directory
              </Link>
            </div>

            <p className="mt-8 text-sm text-slate-400 font-medium">
              Trusted by 10,000+ women entrepreneurs globally.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowWeAreDifferent;
