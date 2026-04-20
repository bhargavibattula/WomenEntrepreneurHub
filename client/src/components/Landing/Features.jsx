import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BookOpen, Users, Calendar, Shield, Zap } from 'lucide-react';

const features = [
  {
    title: "Empowering Job Board",
    description: "Connect with skilled professionals and find opportunities to grow your business or advance your career.",
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    title: "Insightful Articles",
    description: "Sharpen your skills with curated articles on trends, success stories, and proven business strategies.",
    icon: BookOpen,
    color: "bg-indigo-500",
  },
  {
    title: "Dynamic Community",
    description: "A vibrant space to exchange ideas, spark collaboration, and build a lasting sense of belonging.",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Engaging Events",
    description: "From virtual meetups to local conferences, build networks that last well beyond the room.",
    icon: Calendar,
    color: "bg-pink-500",
  },
  {
    title: "Tailored Resources",
    description: "Mentorship and tools designed specifically to meet the unique needs of women in business.",
    icon: Zap,
    color: "bg-amber-500",
  },
  {
    title: "Safe & Inclusive Space",
    description: "A respectful environment focused on collaboration over competition for professional growth.",
    icon: Shield,
    color: "bg-emerald-500",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-3">Why Choose WEN?</h2>
          <p className="text-4xl font-bold text-slate-900 mb-4">Everything you need to thrive as an entrepreneur.</p>
          <p className="text-lg text-slate-600">
            We provide a comprehensive ecosystem designed to empower women entrepreneurs at every stage of their journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
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
