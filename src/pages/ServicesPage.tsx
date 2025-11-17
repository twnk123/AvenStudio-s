import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Branding',
    message: ''
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Services data matching the original
  const services = [
    { num: '01', title: 'branding', subtitle: 'Brain Storm' },
    { num: '02', title: 'web design', subtitle: 'UI / UX' },
    { num: '03', title: 'development', subtitle: 'Coding' },
    { num: '04', title: 'Marketing', subtitle: 'Integrations' }
  ];

  // Why choose us items
  const whyChooseUs = [
    {
      title: 'Innovative Design',
      description: 'At Aven Studio, we specialize in crafting visually stunning and user-centric websites that captivate audiences. Our designs are tailored to reflect your brand\'s unique identity, ensuring an engaging and memorable online presence.'
    },
    {
      title: 'Comprehensive Branding',
      description: 'We offer holistic branding services that encompass logo creation, visual identity development, and cohesive brand messaging. Our approach ensures that every element of your brand aligns seamlessly, creating a strong and consistent image across all platforms.'
    },
    {
      title: 'Expert Web Development',
      description: 'Our development team delivers robust and scalable web solutions tailored to your specific business needs. Utilizing the latest technologies, we ensure your website is responsive, fast, and secure.'
    },
    {
      title: 'Data-Driven Marketing',
      description: 'Leveraging data analytics, we craft strategic marketing campaigns that effectively reach and engage your target audience. Our services include search engine optimization (SEO), content marketing, and social media strategies designed to increase visibility and drive conversions.'
    }
  ];

  // Process steps
  const processSteps = [
    {
      num: '1',
      title: 'Listening to Your Vision',
      description: 'We begin by discussing your goals, audience, and expectations to ensure our approach aligns perfectly with your vision.'
    },
    {
      num: '2',
      title: 'Planning with Purpose',
      description: 'We analyze trends, competitors, and opportunities to craft a strategic roadmap tailored to your needs.'
    },
    {
      num: '3',
      title: 'Visualizing Your Ideas',
      description: 'Creative concepts come to life as we design user-friendly and visually appealing solutions.'
    },
    {
      num: '4',
      title: 'Bringing It to Life',
      description: 'Using cutting-edge technologies, we develop and implement your project with precision and care.'
    },
    {
      num: '5',
      title: 'Delivering Success',
      description: 'After a seamless launch, we provide ongoing support and optimization to ensure long-term success.'
    }
  ];

  // Testimonials matching the original
  const testimonials = [
    {
      name: 'Sarah Lin',
      role: 'Customer',
      text: 'Aven Studio Pro transformed our outdated website into a sleek, modern platform. We\'ve seen a huge uptick in engagement since launch.',
      rating: 5
    },
    {
      name: 'Jason Turner',
      role: 'Startup Founder',
      text: 'They don\'t just design – they understand your business. The brand strategy workshop alone was worth the investment.',
      rating: 5
    },
    {
      name: 'Mia Reynolds',
      role: 'Creative Director',
      text: 'Working with Aven Studio was smooth from day one. The designs were sharp, the communication was clear, and the delivery was on point.',
      rating: 5
    },
    {
      name: 'Daniel Cho',
      role: 'Nonprofit Executive',
      text: 'Our brand finally feels aligned with our mission. Their process helped us define what we stand for visually and strategically.',
      rating: 5
    },
    {
      name: 'Clara Morales',
      role: 'SaaS Product Manager',
      text: 'From moodboards to final launch, the attention to detail was flawless. It felt like having an in-house design team.',
      rating: 5
    },
    {
      name: 'Leo Klein',
      role: 'Founder',
      text: 'I didn\'t realize how much our website was holding us back. After the redesign, conversion rates jumped by 38%.',
      rating: 5
    },
    {
      name: 'Ava Nishi',
      role: 'First-Time Entrepreneur',
      text: 'Aven Studio helped us go from zero to launch with confidence. Their templates saved us weeks of work.',
      rating: 5
    },
    {
      name: 'Martin Gomez',
      role: 'Brand Consultant',
      text: 'It\'s rare to find a design partner who\'s both strategic and insanely creative. These guys get both.',
      rating: 5
    },
    {
      name: 'Rachel Foster',
      role: 'Operations Lead, Wellness Brand',
      text: 'Every step was thoughtful and intentional. They asked the right questions and delivered beyond expectations.',
      rating: 5
    },
    {
      name: 'Kim Wu',
      role: 'Freelance Designer',
      text: 'We used their Framer template and booked two clients within the first week. Easy to use and beautifully structured.',
      rating: 5
    },
    {
      name: 'Evan Dorsey',
      role: 'Tech Startup Co-Founder',
      text: 'Our rebranding project had a tight timeline, but they delivered without compromising on quality. We were blown away.',
      rating: 5
    },
    {
      name: 'Tasha Young',
      role: 'Boutique Owner',
      text: 'This wasn\'t just a design upgrade—it was a mindset shift. We now feel proud to share our website.',
      rating: 5
    }
  ];

  // Duplicate testimonials for infinite scroll effect
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <div ref={containerRef} className="bg-[rgb(252,252,252)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm md:text-base text-[rgb(117,117,117)] mb-8"
          >
            Great work doesn't start with deliverables — it starts with shared purpose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-black uppercase leading-none tracking-tighter text-[rgb(245,87,51)]">
              services
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <Link
              to="#service"
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

      {/* Services Grid Section */}
      <section id="service" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> Our Services <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)]">
              Explore what we can do for you
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-3xl p-8 md:p-12 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(245,87,51)] to-orange-400 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                <div className="relative z-10">
                  <p className="text-5xl md:text-6xl font-light text-[rgb(207,207,207)] mb-6">
                    {service.num}
                  </p>
                  <div className="mb-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-[rgb(66,66,66)] lowercase mb-2">
                      {service.title}
                    </h3>
                    <p className="text-lg text-[rgb(117,117,117)]">
                      {service.subtitle}
                    </p>
                  </div>
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgb(245,87,51)"
                      strokeWidth="2"
                      className="transform group-hover:translate-x-2 transition-transform duration-500"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> why choose us <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)]">
              Delivering Excellence in Digital Marketing
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-[rgb(66,66,66)]">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-[rgb(117,117,117)] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 md:py-32 bg-[rgb(252,252,252)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> How We Work <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)] mb-12">
              Strategic Steps to Impactful Results
            </h2>

            {/* Decorative icons */}
            <div className="flex items-center justify-center gap-8 mb-16">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgb(245,87,51)" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgb(245,87,51)" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
          </div>

          <div className="space-y-12">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-6 md:gap-8"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[rgb(245,87,51)] flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                    {step.num}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-[rgb(66,66,66)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-[rgb(117,117,117)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> What Our Clients Are Saying <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)]">
              Testimonials That Inspire Confidence
            </h2>
          </div>
        </div>

        {/* Two rows of scrolling testimonials */}
        <div className="space-y-6">
          {/* Row 1 - Scroll left */}
          <div className="relative">
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-6"
            >
              {allTestimonials.slice(0, 12).map((testimonial, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[400px] bg-[rgb(252,252,252)] rounded-2xl p-8"
                >
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-[rgb(66,66,66)] mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[rgb(117,117,117)]">
                      {testimonial.role}
                    </p>
                  </div>
                  <p className="text-base text-[rgb(117,117,117)] mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="rgb(245,87,51)">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Scroll right */}
          <div className="relative">
            <motion.div
              animate={{ x: [-1920, 0] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-6"
            >
              {allTestimonials.slice(12, 24).map((testimonial, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[400px] bg-[rgb(252,252,252)] rounded-2xl p-8"
                >
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-[rgb(66,66,66)] mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[rgb(117,117,117)]">
                      {testimonial.role}
                    </p>
                  </div>
                  <p className="text-base text-[rgb(117,117,117)] mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="rgb(245,87,51)">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-32 bg-[rgb(66,66,66)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4">
              <span className="text-white">{'{'}</span> Get in touch <span className="text-white">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Let's Start Your Project Today
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* CEO Message */}
            <div className="text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Michael Bridges</h3>
                <p className="text-white/60">CEO, Aven Studio</p>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                At Aven Studio, we believe in building meaningful digital experiences.
                If you ever have questions or need guidance, I'm always here to support you.
                Your success is our mission — let's create something incredible together.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[rgb(245,87,51)] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="johnsmith@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[rgb(245,87,51)] transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Service Needed ?
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[rgb(245,87,51)] transition-colors"
                  required
                >
                  <option value="Branding">Branding</option>
                  <option value="Web design">Web design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Development">Development</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  What Can I Help You...
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello, I'd like to enquire about..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[rgb(245,87,51)] transition-colors resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-[rgb(245,87,51)] text-white font-bold text-lg hover:bg-[rgb(230,70,35)] transition-colors"
              >
                Submit
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
