import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectsPage: React.FC = () => {
  // Featured Projects matching the original
  const featuredProjects = [
    {
      category: 'Marketing',
      title: 'VeloCity',
      link: '/projects/velocity',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop'
    },
    {
      category: 'Web design',
      title: 'The Perfect Frame',
      link: '/projects/the-perfect-frame',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop'
    },
    {
      category: 'Marketing',
      title: 'Spreading the Word',
      link: '/projects/spreading-the-word',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'
    },
    {
      category: 'Branding',
      title: 'Fresh Beginnings',
      link: '/projects/fresh-beginnings',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop'
    }
  ];

  // More Projects matching the original
  const moreProjects = [
    {
      year: '2025',
      category: 'Web design',
      title: 'VistaHaven',
      link: '/projects/vistahaven',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop'
    },
    {
      year: '2025',
      category: 'Development',
      title: 'Kindred Space',
      link: '/projects/kindred-space',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop'
    },
    {
      year: '2025',
      category: 'Branding',
      title: 'Glow Theory',
      link: '/projects/glow-theory',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop'
    },
    {
      year: '2025',
      category: 'Development',
      title: 'Built to Last',
      link: '/projects/built-to-last',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="bg-[rgb(252,252,252)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm md:text-base text-[rgb(117,117,117)] mb-8"
          >
            Innovation begins with curiosity — and we never stop asking better questions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-black uppercase leading-none tracking-tighter text-[rgb(245,87,51)]">
              projects
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <Link
              to="#project"
              className="inline-flex items-center gap-3 text-[rgb(117,117,117)] hover:text-[rgb(245,87,51)] transition-colors"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <div className="overflow-hidden h-8 relative w-[600px]">
              <motion.div
                animate={{ x: [0, -100] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex whitespace-nowrap text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)]"
              >
                <span className="mr-8">CREATE •</span>
                <span className="mr-8">IDEA •</span>
                <span className="mr-8">INSIGHT •</span>
                <span className="mr-8">SOLUTION •</span>
                <span className="mr-8">CREATE •</span>
                <span className="mr-8">IDEA •</span>
                <span className="mr-8">INSIGHT •</span>
                <span className="mr-8">SOLUTION •</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="project" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> Featured Projects <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)]">
              Showcasing Our Most Impactful Work
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Link to={project.link} className="block">
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Project Image */}
                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                      {/* Category Badge */}
                      <motion.div
                        className="mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgb(245,87,51)] text-white">
                          {project.category}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 transform group-hover:translate-y-[-8px] transition-transform duration-500">
                        {project.title}
                      </h3>

                      {/* Arrow Icon */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          className="transform group-hover:translate-x-2 transition-transform duration-500"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Projects Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[rgb(66,66,66)]">
              More Projects
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Link to={project.link} className="block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[rgb(242,242,242)] hover:shadow-xl transition-all duration-500">
                    {/* Project Image */}
                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* Year and Category */}
                      <div className="flex items-center gap-2 text-white/90">
                        <div className="flex items-center gap-2">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span className="text-sm font-semibold">{project.year}</span>
                        </div>
                        <span className="text-white/70">/</span>
                        <span className="text-sm font-medium text-white/90">{project.category}</span>
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white transform group-hover:translate-y-[-4px] transition-transform duration-500">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
