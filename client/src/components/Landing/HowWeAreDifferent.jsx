import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Lock, Target, Globe, HeartHandshake, Sparkles, Network } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Target className="w-6 h-6 text-blue-600" />,
    title: "Tailored Resources",
    description: "Mentorship and resources specifically designed for women entrepreneurs."
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Collaboration First",
    description: "Focus on collaboration over competition, fostering community growth."
  },
  {
    icon: <Lock className="w-6 h-6 text-blue-600" />,
    title: "Safe & Inclusive Space",
    description: "A respectful environment for personal and professional growth."
  },
  {
    icon: <Network className="w-6 h-6 text-blue-600" />,
    title: "Meaningful Connections",
    description: "Tools for showcasing businesses and building lasting relationships."
  },
  {
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    title: "Exclusive Content",
    description: "Addressing unique challenges women face in business."
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    title: "Global Reach",
    description: "Local and global networking opportunities to expand your horizons."
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-blue-600" />,
    title: "Community Driven",
    description: "Emphasis on community-driven support and guidance."
  },
  {
    icon: <Sparkles className="w-6 h-6 text-blue-600" />,
    title: "Empowerment",
    description: "Empowering women to thrive and succeed together."
  }
];

const HowWeAreDifferent = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-indigo-100 blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
              The FEMPOWER Difference
            </h2>
            <h3 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-6">
              Designed for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">success</span>
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              We go beyond offering a platform. We’re creating a space that’s truly empowering and inclusive, built specifically to meet the unique needs of women in business.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative bg-white p-8 rounded-2xl border border-slate-100",
                "shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]",
                "transition-all duration-300 ease-in-out hover:-translate-y-1"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section embedded in the difference section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 relative rounded-3xl overflow-hidden bg-slate-900"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 mix-blend-overlay"></div>
          
          <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center justify-between z-10">
            <div className="max-w-2xl text-center md:text-left mb-8 md:mb-0">
              <h4 className="text-3xl font-bold text-white mb-4">Get the happiness you deserve</h4>
              <p className="text-slate-300 text-lg">
                No matter the challenge, you don't have to face it alone - but it’s up to you to take the first step.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link 
                to="/auth/register" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-700 bg-white rounded-full shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white"
              >
                Join Us Today
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeAreDifferent;
