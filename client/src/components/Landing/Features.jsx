import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BookOpen, Users, Calendar, Shield, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

const features = [
  {
    title: "Empowering Job Board",
    description: "Connect with skilled professionals and find opportunities to grow your business or advance your career.",
    icon: Briefcase,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Insightful Articles",
    description: "Sharpen your skills with curated articles on trends, success stories, and proven business strategies.",
    icon: BookOpen,
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Dynamic Community",
    description: "A vibrant space to exchange ideas, spark collaboration, and build a lasting sense of belonging.",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Engaging Events",
    description: "From virtual meetups to local conferences, build networks that last well beyond the room.",
    icon: Calendar,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Tailored Resources",
    description: "Mentorship and tools designed specifically to meet the unique needs of women in business.",
    icon: Zap,
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Safe & Inclusive Space",
    description: "A respectful environment focused on collaboration over competition for professional growth.",
    icon: Shield,
    color: "from-emerald-400 to-teal-500",
  },
];

const Features = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden pointer-events-auto">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Why Choose WEN?</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">thrive</span>
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              We provide a comprehensive ecosystem designed to empower women entrepreneurs at every stage of their journey. Connect, learn, and scale your vision.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 z-10"
            >
              {/* Hover glowing background effect inside the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10"></div>
              
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                "bg-gradient-to-br", feature.color
              )}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
