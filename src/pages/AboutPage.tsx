import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [stats, setStats] = useState({ years: 0, projects: 0, clients: 0, satisfaction: 0 });

  // Animated counter for statistics
  useEffect(() => {
    if (statsVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const targets = { years: 6, projects: 317, clients: 89, satisfaction: 62 };
      let current = { years: 0, projects: 0, clients: 0, satisfaction: 0 };

      const timer = setInterval(() => {
        current = {
          years: Math.min(current.years + targets.years / steps, targets.years),
          projects: Math.min(current.projects + targets.projects / steps, targets.projects),
          clients: Math.min(current.clients + targets.clients / steps, targets.clients),
          satisfaction: Math.min(current.satisfaction + targets.satisfaction / steps, targets.satisfaction),
        };

        setStats({
          years: Math.floor(current.years),
          projects: Math.floor(current.projects),
          clients: Math.floor(current.clients),
          satisfaction: Math.floor(current.satisfaction),
        });

        if (
          current.years >= targets.years &&
          current.projects >= targets.projects &&
          current.clients >= targets.clients &&
          current.satisfaction >= targets.satisfaction
        ) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [statsVisible]);

  const timeline = [
    {
      date: 'January 2019',
      title: 'Inception of Aven Studio',
      description: 'Founded with a vision to revolutionize digital marketing through innovative strategies and cutting-edge technology.'
    },
    {
      date: 'July 2020',
      title: 'Launch of Comprehensive Branding Services',
      description: 'Expanded our offerings to include holistic branding solutions, helping clients establish strong and memorable brand identities.'
    },
    {
      date: 'May 2021',
      title: 'Introduction of Advanced Web Development',
      description: 'Enhanced our service portfolio with state-of-the-art web development capabilities, delivering dynamic and responsive websites.'
    },
    {
      date: 'February 2023',
      title: 'Expansion into Digital Marketing',
      description: 'Broadened our expertise to encompass comprehensive digital marketing services, driving online growth and engagement for our clients.'
    },
    {
      date: 'November 2024',
      title: 'Achievement of 500+ Successful Projects',
      description: 'Celebrated the completion of over 500 projects, reflecting our commitment to excellence and client satisfaction.'
    }
  ];

  const teamMembers = [
    { name: 'Michael Rivera', role: 'Brand Strategist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop' },
    { name: 'Emily Carter', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop' },
    { name: 'Sarah Johnson', role: 'Web Designer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop' },
    { name: 'Jason Lee', role: 'Front-End Developer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop' },
    { name: 'Anna Martinez', role: 'Digital Marketing Specialist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop' },
    { name: 'David Brown', role: 'Project Manager', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop' }
  ];

  const awards = [
    { name: 'Awwwards', subtitle: 'Site of the Month', year: '2025' },
    { name: 'CSS Design Awards', subtitle: 'Innovation Award', year: '2024' },
    { name: 'Webby Awards', subtitle: 'Best User Experience', year: '2024' },
    { name: 'Web Excellence Awards', subtitle: 'Digital Marketing', year: '2023' }
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
            At the heart of every idea is a team that dares to ask, explore, and build together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-black uppercase leading-none tracking-tighter text-[rgb(245,87,51)]">
              about
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <Link
              to="#about"
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

      {/* Who We Are Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> Who We Are <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)]">
              We are leading digital marketing agency
            </h2>
          </div>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Large Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-auto"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop"
                alt="Office"
                className="w-full h-full object-cover"
              />
              {/* Animated scrolling text overlay */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{ x: [0, -100] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="flex whitespace-nowrap text-sm uppercase tracking-[0.3em] text-white/80"
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

            {/* Our Story */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 flex flex-col justify-center"
            >
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-[rgb(66,66,66)]">Our story</h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(245,87,51)" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-[rgb(245,87,51)] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[rgb(117,117,117)] leading-relaxed">
                At Aven Studio, we specialize in crafting custom web solutions, including branding, web design, development, and marketing, tailored to meet your business needs.
              </p>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 flex flex-col justify-center"
            >
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-[rgb(66,66,66)]">Our Mission</h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(245,87,51)" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-[rgb(245,87,51)] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[rgb(117,117,117)] leading-relaxed">
                Our mission is to lead in digital marketing by delivering innovative solutions in branding, web design, development, and marketing. We aim to create impactful designs that resonate with audiences and drive success for our clients.
              </p>
            </motion.div>

            {/* Our Values */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 flex flex-col justify-center"
            >
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-[rgb(66,66,66)]">Our Values</h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(245,87,51)" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-[rgb(245,87,51)] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[rgb(117,117,117)] leading-relaxed">
                We value creativity, innovation, and client satisfaction. Our approach is centered on understanding client visions, strategic planning, and delivering high-quality, impactful results.
              </p>
            </motion.div>
          </div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => setStatsVisible(true)}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-[rgb(66,66,66)]">
                {stats.years}+
              </div>
              <div className="text-sm uppercase tracking-wide text-[rgb(117,117,117)]">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-[rgb(66,66,66)]">
                {stats.projects}
              </div>
              <div className="text-sm uppercase tracking-wide text-[rgb(117,117,117)]">
                Projects Done
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-[rgb(66,66,66)]">
                {stats.clients}
              </div>
              <div className="text-sm uppercase tracking-wide text-[rgb(117,117,117)]">
                Happy Clients
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-[rgb(66,66,66)]">
                {stats.satisfaction}%
              </div>
              <div className="text-sm uppercase tracking-wide text-[rgb(117,117,117)]">
                Satisfied Clients
              </div>
            </div>
          </motion.div>

          {/* Company Logos */}
          <div className="text-center mb-8">
            <p className="text-sm text-[rgb(117,117,117)] mb-8">We work with the world's top companies</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40">
            {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5', 'Company 6'].map((logo, idx) => (
              <div key={idx} className="text-sm font-semibold text-[rgb(117,117,117)]">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> Our Journey <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)]">
              Milestones in Our Growth
            </h2>
          </div>

          <div className="relative">
            {/* Timeline dates on left */}
            <div className="flex flex-col gap-32">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="grid md:grid-cols-2 gap-8 items-start"
                >
                  <div className="text-left">
                    <p className="text-lg font-semibold text-[rgb(66,66,66)] mb-2">{item.date}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[rgb(66,66,66)] mb-4">{item.title}</h3>
                    <p className="text-sm text-[rgb(117,117,117)] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-[rgb(252,252,252)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> Meet Our Team <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)]">
              Creative Professionals at Your Service
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                    <h3 className="font-bold text-[rgb(66,66,66)] mb-1">{member.name}</h3>
                    <p className="text-sm text-[rgb(117,117,117)]">{member.role}</p>
                  </div>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgb(245,87,51)"
                  strokeWidth="2"
                  className="mx-auto opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> Our Recognitions <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)]">
              Honors and Awards
            </h2>
          </div>

          <div className="space-y-6">
            {awards.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between py-6 border-b border-[rgb(242,242,242)]"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[rgb(66,66,66)] mb-1">
                    {award.name.toUpperCase()}
                  </h3>
                  <p className="text-sm text-[rgb(117,117,117)]">{award.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[rgb(66,66,66)] mb-1">{award.year}</p>
                  <p className="text-xs uppercase text-[rgb(117,117,117)]">Award Years</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
