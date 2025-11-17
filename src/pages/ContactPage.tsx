import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Branding',
    message: ''
  });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const faqs = [
    {
      question: 'What is included in your branding services?',
      answer: 'Our branding services include brand strategy, logo design, visual identity systems, brand guidelines, and marketing collateral. We work closely with you to create a cohesive brand that resonates with your target audience.'
    },
    {
      question: 'How long does it take to complete a branding project?',
      answer: 'A typical branding project takes 4-8 weeks, depending on the scope and complexity. We ensure thorough research and collaboration throughout the process to deliver exceptional results.'
    },
    {
      question: 'Do you offer mobile-friendly designs?',
      answer: 'Yes, all our website designs are fully responsive and optimized for mobile devices. We prioritize user experience across all screen sizes to ensure your site looks great everywhere.'
    },
    {
      question: 'Can you redesign an existing website?',
      answer: 'Absolutely! We specialize in website redesigns that modernize your online presence while maintaining your brand identity. We analyze your current site and create an improved version that drives better results.'
    },
    {
      question: 'Do you provide custom development solutions?',
      answer: 'Yes, we offer custom development services tailored to your specific needs. Whether you need a custom CMS, e-commerce platform, or web application, our development team can bring your vision to life.'
    },
    {
      question: 'Will I be able to update the website on my own?',
      answer: 'Yes, we build websites on user-friendly platforms that allow you to make updates easily. We also provide training and documentation to ensure you feel confident managing your content.'
    },
    {
      question: 'How do you approach digital marketing campaigns?',
      answer: 'We start with a comprehensive strategy that includes audience research, competitive analysis, and goal setting. Then we execute multi-channel campaigns using SEO, content marketing, social media, and paid advertising.'
    },
    {
      question: 'Can you track the performance of marketing campaigns?',
      answer: 'Yes, we provide detailed analytics and reporting for all marketing campaigns. You\'ll receive regular updates on key metrics like traffic, engagement, conversions, and ROI.'
    },
    {
      question: 'Do you offer packages or customized services?',
      answer: 'We offer both pre-designed packages and fully customized solutions. Our packages provide great value, while custom services allow us to tailor everything to your unique requirements.'
    },
    {
      question: 'What are the payment methods and plans for projects?',
      answer: 'We accept various payment methods including credit cards, bank transfers, and PayPal. Projects can be paid in full or split into milestone-based payments to make budgeting easier.'
    },
    {
      question: 'Do you offer discounts for long-term collaborations?',
      answer: 'Yes, we offer special pricing for ongoing retainer relationships and long-term partnerships. Contact us to discuss how we can create a custom plan that fits your budget.'
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
            Whether you have a vision or just a spark — we'd love to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-black uppercase leading-none tracking-tighter text-[rgb(245,87,51)]">
              contact
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <Link
              to="#contact"
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

      {/* Contact Form Section */}
      <section id="contact" className="py-20 md:py-32 bg-[rgb(66,66,66)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(207,207,207)] mb-4">
              <span className="text-white">{'{'}</span> Get in touch <span className="text-white">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Let's Start Your Project Today
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* CEO Message */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Michael Bridges</h3>
                <p className="text-[rgb(207,207,207)]">CEO, Aven Studio</p>
              </div>
              <p className="text-[rgb(207,207,207)] leading-relaxed">
                At Aven Studio, we believe in building meaningful digital experiences. If you ever have questions or need guidance, I'm always here to support you. Your success is our mission — let's create something incredible together.
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 bg-[rgb(82,82,82)] text-white placeholder-[rgb(157,157,157)] rounded-lg border border-[rgb(102,102,102)] focus:outline-none focus:border-[rgb(245,87,51)] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="johnsmith@gmail.com"
                    className="w-full px-4 py-3 bg-[rgb(82,82,82)] text-white placeholder-[rgb(157,157,157)] rounded-lg border border-[rgb(102,102,102)] focus:outline-none focus:border-[rgb(245,87,51)] transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-white mb-2">
                  Service Needed ?
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgb(82,82,82)] text-white rounded-lg border border-[rgb(102,102,102)] focus:outline-none focus:border-[rgb(245,87,51)] transition-colors"
                >
                  <option value="Branding">Branding</option>
                  <option value="Web design">Web design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Development">Development</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  What Can I Help You...
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello, I'd like to enquire about..."
                  rows={6}
                  className="w-full px-4 py-3 bg-[rgb(82,82,82)] text-white placeholder-[rgb(157,157,157)] rounded-lg border border-[rgb(102,102,102)] focus:outline-none focus:border-[rgb(245,87,51)] transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[rgb(245,87,51)] text-white rounded-lg py-4 font-semibold hover:bg-[rgb(220,70,40)] transition-colors duration-300"
              >
                Submit
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
                <span className="text-[rgb(66,66,66)]">{'{'}</span> FAQ <span className="text-[rgb(66,66,66)]">{'}'}</span>
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)]">
                Clear Solutions to Your Concerns
              </h2>

              {/* Decorative Icons */}
              <div className="flex gap-6 mt-12">
                <div className="w-16 h-16 rounded-full border-2 border-[rgb(245,87,51)] flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(245,87,51)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-[rgb(245,87,51)] flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(245,87,51)" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-[rgb(242,242,242)] pb-4">
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left py-3 group"
                >
                  <span className="text-lg font-semibold text-[rgb(66,66,66)] group-hover:text-[rgb(245,87,51)] transition-colors">
                    {faq.question}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(117,117,117)"
                    strokeWidth="2"
                    className={`transition-transform duration-300 ${openFAQ === idx ? 'rotate-180' : ''}`}
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openFAQ === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[rgb(117,117,117)] leading-relaxed pt-2 pb-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
