import React from 'react';
import { motion } from 'framer-motion';

const RadarPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-geist text-5xl md:text-6xl font-bold mb-8"
          >
            R.A.D.A.R.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Welcome to r.a.d.a.r.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RadarPage;

