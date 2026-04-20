import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Active Members', value: '10K+' },
  { label: 'Events Hosted', value: '500+' },
  { label: 'Career Opportunities', value: '2K+' },
  { label: 'Countries Reached', value: '25+' },
];

const Stats = () => {
  return (
    <section className="py-20 border-y border-slate-100 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
