import React, { useState, useEffect } from 'react';
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
      title: 'Inception of BrightEdge Studio',
      description: 'Founded with a vision to revolutionize digital marketing through innovative strategies and cutting-edge technology.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop'
    },
    {
      date: 'July 2020',
      title: 'Launch of Comprehensive Branding Services',
      description: 'Expanded our offerings to include holistic branding solutions, helping clients establish strong and memorable brand identities.',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&auto=format&fit=crop'
    },
    {
      date: 'May 2021',
      title: 'Introduction of Advanced Web Development',
      description: 'Enhanced our service portfolio with state-of-the-art web development capabilities, delivering dynamic and responsive websites.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop'
    },
    {
      date: 'February 2023',
      title: 'Expansion into Digital Marketing',
      description: 'Broadened our expertise to encompass comprehensive digital marketing services, driving online growth and engagement for our clients.',
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&auto=format&fit=crop'
    },
    {
      date: 'November 2024',
      title: 'Achievement of 500+ Successful Projects',
      description: 'Celebrated the completion of over 500 projects, reflecting our commitment to excellence and client satisfaction.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&auto=format&fit=crop'
    },
  ];

  const teamMembers = [
    { name: 'Michael Rivera', role: 'Brand Strategist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop' },
    { name: 'Emily Carter', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop' },
    { name: 'Sarah Johnson', role: 'Web Designer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop' },
    { name: 'Jason Lee', role: 'Front-End Developer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop' },
    { name: 'Anna Martinez', role: 'Digital Marketing Specialist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop' },
    { name: 'David Brown', role: 'Project Manager', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop' },
  ];

  const awards = [
    { name: 'AWWWARDS', subtitle: 'Site of the Month' },
    { name: 'CSS DESIGN AWARDS', subtitle: 'Innovation Award' },
    { name: 'WEBBY AWARDS', subtitle: 'Best User Experience' },
    { name: 'WEB EXCELLENCE AWARDS', subtitle: 'Digital Marketing' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white flex items-center justify-center" style={{ height: '100vh' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-8xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-bold tracking-tight leading-none"
          style={{ color: 'rgb(245, 87, 51)' }}
        >
          ABOUT
        </motion.h1>
      </section>

      {/* Video Section with Text Overlay */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/about-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Teardrop/Blob Background */}
            <div
              className="absolute inset-0 -inset-x-12 -inset-y-8 blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(245, 87, 51, 0.8), transparent)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
              }}
            />

            <p className="relative text-white text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-5xl leading-tight font-bold px-8">
              We build thoughtful brands, products, and experiences that move people and businesses forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WE ARE LEADING Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 uppercase tracking-wide" style={{ color: 'rgb(33, 33, 33)' }}>
              WE ARE LEADING DIGITAL MARKETING AGENCY
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Our Story - Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format&fit=crop"
                alt="Office space"
                className="w-full h-64 object-cover"
              />
            </motion.div>

            {/* Our Story - Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col justify-center"
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(245, 87, 51)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(33, 33, 33)' }}>Our story</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgb(117, 117, 117)' }}>
                At BrightEdge Studio, we specialize in crafting custom web solutions, including branding, web design, development, and marketing, tailored to meet your business needs.
              </p>
            </motion.div>

            {/* Our Mission - Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(33, 33, 33)' }}>Our Mission</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgb(117, 117, 117)' }}>
                Our mission is to lead in digital marketing by delivering innovative solutions in branding, web design, development, and marketing. We aim to create impactful designs that resonate with audiences and drive success for our clients.
              </p>
            </motion.div>

            {/* Our Values - Red Geometric Shape */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'rgb(245, 87, 51)' }}
            >
              <div className="h-64 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full" />
                  <div className="absolute w-24 h-24 bg-white/30 rounded-full" />
                  <div className="absolute w-16 h-16 bg-white/40 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Our Values - Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col justify-center lg:col-span-2"
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(33, 33, 33)' }}>Our Values</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgb(117, 117, 117)' }}>
                We value creativity, innovation, and client satisfaction. Our approach is centered on understanding client visions, strategic planning, and delivering high-quality, impactful results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white border-t border-b" style={{ borderColor: 'rgb(230, 230, 230)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onViewportEnter={() => setStatsVisible(true)}
          className="max-w-7xl mx-auto px-6 md:px-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color: 'rgb(33, 33, 33)' }}>
                {stats.years}+
              </div>
              <div className="text-sm uppercase tracking-wide" style={{ color: 'rgb(117, 117, 117)' }}>
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color: 'rgb(33, 33, 33)' }}>
                {stats.projects}
              </div>
              <div className="text-sm uppercase tracking-wide" style={{ color: 'rgb(117, 117, 117)' }}>
                Projects Done
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color: 'rgb(33, 33, 33)' }}>
                {stats.clients}
              </div>
              <div className="text-sm uppercase tracking-wide" style={{ color: 'rgb(117, 117, 117)' }}>
                Happy Clients
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color: 'rgb(33, 33, 33)' }}>
                {stats.satisfaction}%
              </div>
              <div className="text-sm uppercase tracking-wide" style={{ color: 'rgb(117, 117, 117)' }}>
                Satisfied Clients
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-40">
            {['STRIPE', 'WEBFLOW', 'NOTION', 'LOOM', 'FIGMA', 'VERCEL', 'FRAMER', 'MIRO'].map((logo, idx) => (
              <div key={idx} className="flex items-center justify-center">
                <div className="text-lg font-bold tracking-wider" style={{ color: 'rgb(100, 100, 100)' }}>
                  {logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide" style={{ color: 'rgb(33, 33, 33)' }}>
              MILESTONES IN OUR GROWTH
            </h2>
          </motion.div>

          <div className="space-y-16">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-sm font-semibold mb-6 uppercase tracking-wider" style={{ color: 'rgb(245, 87, 51)' }}>
                  {item.date}
                </div>
                <div className="rounded-2xl overflow-hidden mb-6 w-full max-w-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(33, 33, 33)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'rgb(117, 117, 117)' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-white border-t" style={{ borderColor: 'rgb(230, 230, 230)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide" style={{ color: 'rgb(33, 33, 33)' }}>
              CREATIVE PROFESSIONALS AT YOUR SERVICE
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold mb-1" style={{ color: 'rgb(33, 33, 33)' }}>
                  {member.name}
                </h3>
                <p className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 md:py-32 bg-white border-t" style={{ borderColor: 'rgb(230, 230, 230)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide" style={{ color: 'rgb(33, 33, 33)' }}>
              HONORS AND AWARDS
            </h2>
          </motion.div>

          <div className="space-y-8">
            {awards.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between py-8 border-b"
                style={{ borderColor: 'rgb(230, 230, 230)' }}
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: 'rgb(33, 33, 33)' }}>
                    {award.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>
                    {award.subtitle}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold" style={{ color: 'rgb(245, 87, 51)' }}>
                    2024
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white border-t" style={{ borderColor: 'rgb(230, 230, 230)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide" style={{ color: 'rgb(33, 33, 33)' }}>
                BRIGHTEDGE
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'rgb(33, 33, 33)' }}>Address</h3>
                  <p className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>
                    1600 Amphitheatre Parkway<br />
                    Mountain View, CA 94043<br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'rgb(33, 33, 33)' }}>Contact</h3>
                  <p className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>
                    +1 (555) 987-6543<br />
                    hello@brightedge.studio
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'rgb(33, 33, 33)' }}>Hours</h3>
                  <p className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden h-96"
            >
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" style={{ color: 'rgb(117, 117, 117)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>Map View</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
