import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pricingPlans = [
    {
      name: 'Basic',
      target: 'Freelancers and small businesses',
      monthlyPrice: 499,
      annualPrice: 799,
      features: [
        'Brand design and development',
        'Premium website design and development',
        '20 hours of website maintenance per month',
        '8 blog posts per month',
        '4 email marketing campaigns per month',
        'Social media account management (20 posts per month)',
        'Search Engine Optimization (SEO) services',
        'Monthly marketing strategy consultation'
      ]
    },
    {
      name: 'Growth',
      target: 'Agencies and startups',
      monthlyPrice: 799,
      annualPrice: 999,
      features: [
        'Brand design and development',
        'Premium website design and development',
        '20 hours of website maintenance per month',
        '8 blog posts per month',
        '4 email marketing campaigns per month',
        'Social media account management (20 posts per month)',
        'Search Engine Optimization (SEO) services',
        'Monthly marketing strategy consultation'
      ],
      highlighted: true
    },
    {
      name: 'Professional',
      target: 'Established enterprises and corporations',
      monthlyPrice: 1599,
      annualPrice: 1999,
      features: [
        'Brand design and development',
        'Premium website design and development',
        '20 hours of website maintenance per month',
        '8 blog posts per month',
        '4 email marketing campaigns per month',
        'Social media account management (20 posts per month)',
        'Search Engine Optimization (SEO) services',
        'Monthly marketing strategy consultation'
      ]
    }
  ];

  const comparisonFeatures = [
    { name: 'Visual identity & brand direction', basic: true, growth: true, pro: true },
    { name: 'Custom-designed website UI & UX', basic: true, growth: true, pro: true },
    { name: 'Ongoing website support (20 hrs/month)', basic: true, growth: true, pro: true },
    { name: 'Monthly content creation (8 blog posts)', basic: true, growth: true, pro: true },
    { name: 'Email outreach campaigns (x4)', basic: false, growth: true, pro: true },
    { name: 'Social media posting (20 posts/month)', basic: false, growth: true, pro: true },
    { name: 'On-page SEO setup & support', basic: false, growth: false, pro: true },
    { name: '1-on-1 strategy session (monthly)', basic: false, growth: false, pro: true }
  ];

  const testimonials = [
    { name: 'Sarah Lin', role: 'Customer', text: 'Aven Studio Pro transformed our outdated website into a sleek, modern platform. We\'ve seen a huge uptick in engagement since launch.' },
    { name: 'Jason Turner', role: 'Startup Founder', text: 'They don\'t just design – they understand your business. The brand strategy workshop alone was worth the investment.' },
    { name: 'Mia Reynolds', role: 'Creative Director', text: 'Working with Aven Studio was smooth from day one. The designs were sharp, the communication was clear, and the delivery was on point.' },
    { name: 'Daniel Cho', role: 'Nonprofit Executive', text: 'Our brand finally feels aligned with our mission. Their process helped us define what we stand for visually and strategically.' },
    { name: 'Clara Morales', role: 'SaaS Product Manager', text: 'From moodboards to final launch, the attention to detail was flawless. It felt like having an in-house design team.' },
    { name: 'Leo Klein', role: 'Founder', text: 'I didn\'t realize how much our website was holding us back. After the redesign, conversion rates jumped by 38%.' },
    { name: 'Ava Nishi', role: 'First-Time Entrepreneur', text: 'Aven Studio helped us go from zero to launch with confidence. Their templates saved us weeks of work.' },
    { name: 'Martin Gomez', role: 'Brand Consultant', text: 'It\'s rare to find a design partner who\'s both strategic and insanely creative. These guys get both.' },
    { name: 'Rachel Foster', role: 'Operations Lead, Wellness Brand', text: 'Every step was thoughtful and intentional. They asked the right questions and delivered beyond expectations.' },
    { name: 'Kim Wu', role: 'Freelance Designer', text: 'We used their Framer template and booked two clients within the first week. Easy to use and beautifully structured.' },
    { name: 'Evan Dorsey', role: 'Tech Startup Co-Founder', text: 'Our rebranding project had a tight timeline, but they delivered without compromising on quality. We were blown away.' },
    { name: 'Tasha Young', role: 'Boutique Owner', text: 'This wasn\'t just a design upgrade—it was a mindset shift. We now feel proud to share our website.' }
  ];

  const allTestimonials = [...testimonials, ...testimonials];

  const faqs = [
    { question: 'What is included in your branding services?', answer: 'Our branding services include logo design, brand identity development, color palette selection, typography guidelines, and comprehensive brand style guides to ensure consistency across all platforms.' },
    { question: 'How long does it take to complete a branding project?', answer: 'Branding projects typically take 4-6 weeks, depending on the scope and complexity. We work closely with you throughout the process to ensure timely delivery.' },
    { question: 'Do you offer mobile-friendly designs?', answer: 'Yes, all our website designs are fully responsive and optimized for mobile devices, tablets, and desktop screens to ensure the best user experience across all platforms.' },
    { question: 'Can you redesign an existing website?', answer: 'Absolutely! We specialize in website redesigns, helping businesses modernize their online presence while maintaining their brand identity and improving user experience.' },
    { question: 'Do you provide custom development solutions?', answer: 'Yes, we offer custom web development tailored to your specific business needs, using the latest technologies to build scalable, secure, and high-performance solutions.' },
    { question: 'Will I be able to update the website on my own?', answer: 'Yes, we build websites with user-friendly content management systems (CMS) that allow you to easily update content without technical knowledge. We also provide training and documentation.' },
    { question: 'How do you approach digital marketing campaigns?', answer: 'We use a data-driven approach, conducting thorough market research and audience analysis to create targeted campaigns that maximize ROI through SEO, content marketing, and social media strategies.' },
    { question: 'Can you track the performance of marketing campaigns?', answer: 'Yes, we provide comprehensive analytics and regular reports to track campaign performance, engagement metrics, conversion rates, and ROI, allowing for continuous optimization.' },
    { question: 'Do you offer packages or customized services?', answer: 'We offer both standardized packages and customized solutions. Our packages provide excellent value, while custom services can be tailored to meet your unique business requirements.' },
    { question: 'What are the payment methods and plans for projects?', answer: 'We accept various payment methods including credit cards, bank transfers, and digital payments. Payment plans are typically structured with an initial deposit followed by milestone-based payments.' },
    { question: 'Do you offer discounts for long-term collaborations?', answer: 'Yes, we offer special rates and discounts for long-term partnerships and annual contracts. Contact us to discuss custom pricing for ongoing collaboration opportunities.' }
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
            Whether you're just starting or scaling fast — we've got a plan for that.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-black uppercase leading-none tracking-tighter text-[rgb(245,87,51)]">
              Pricing
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <Link
              to="#pricing"
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

      {/* Pricing Plans Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> Our Pricing Plans <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)] mb-8">
              Choose the Perfect Plan for Your Business
            </h2>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1 rounded-full bg-[rgb(242,242,242)]">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingCycle === 'monthly' ? 'bg-[rgb(245,87,51)] text-white' : 'text-[rgb(66,66,66)]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingCycle === 'annual' ? 'bg-[rgb(245,87,51)] text-white' : 'text-[rgb(66,66,66)]'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white rounded-3xl p-8 ${
                  plan.highlighted ? 'ring-2 ring-[rgb(245,87,51)] shadow-2xl' : 'shadow-lg'
                }`}
              >
                <h3 className="text-2xl font-bold text-[rgb(66,66,66)] mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-5xl font-bold text-[rgb(66,66,66)]">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    <span className="text-[rgb(117,117,117)]">/ month</span>
                  </div>
                  <p className="text-sm text-[rgb(117,117,117)]">{plan.target}</p>
                </div>

                <Link
                  to="/contact"
                  className="block w-full py-3 px-6 rounded-full text-center font-semibold mb-8 transition-all bg-[rgb(245,87,51)] text-white hover:bg-[rgb(230,70,35)]"
                >
                  Get Started
                </Link>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[rgb(245,87,51)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm text-[rgb(117,117,117)]">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Company Logos */}
          <div className="text-center py-12">
            <p className="text-sm text-[rgb(117,117,117)] mb-8">We work with the world's top companies</p>
            {/* Logo placeholders - you can replace with actual logos */}
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
              {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5', 'Company 6'].map((company, i) => (
                <div key={i} className="text-[rgb(117,117,117)] font-semibold text-sm">{company}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> Plan Comparison <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)]">
              See What's Included in Each Package
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[rgb(207,207,207)]">
                  <th className="text-left py-4 px-4 text-[rgb(66,66,66)] font-bold">Features</th>
                  <th className="text-center py-4 px-4 text-[rgb(66,66,66)] font-bold">Basic</th>
                  <th className="text-center py-4 px-4 text-[rgb(66,66,66)] font-bold">Growth</th>
                  <th className="text-center py-4 px-4 text-[rgb(66,66,66)] font-bold">Professional</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr key={i} className="border-b border-[rgb(242,242,242)]">
                    <td className="py-4 px-4 text-[rgb(117,117,117)]">{feature.name}</td>
                    <td className="py-4 px-4 text-center">
                      {feature.basic ? (
                        <svg className="w-6 h-6 text-[rgb(245,87,51)] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <span className="text-[rgb(207,207,207)]">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {feature.growth ? (
                        <svg className="w-6 h-6 text-[rgb(245,87,51)] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <span className="text-[rgb(207,207,207)]">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {feature.pro ? (
                        <svg className="w-6 h-6 text-[rgb(245,87,51)] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <span className="text-[rgb(207,207,207)]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-[rgb(252,252,252)] overflow-hidden">
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

        <div className="space-y-6">
          {/* Row 1 */}
          <div className="relative">
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-6"
            >
              {allTestimonials.slice(0, 12).map((testimonial, idx) => (
                <div key={idx} className="flex-shrink-0 w-[400px] bg-white rounded-2xl p-8">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-[rgb(66,66,66)] mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-[rgb(117,117,117)]">{testimonial.role}</p>
                  </div>
                  <p className="text-base text-[rgb(117,117,117)] mb-6 leading-relaxed">{testimonial.text}</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="rgb(245,87,51)">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="relative">
            <motion.div
              animate={{ x: [-1920, 0] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-6"
            >
              {allTestimonials.slice(12, 24).map((testimonial, idx) => (
                <div key={idx} className="flex-shrink-0 w-[400px] bg-white rounded-2xl p-8">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-[rgb(66,66,66)] mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-[rgb(117,117,117)]">{testimonial.role}</p>
                  </div>
                  <p className="text-base text-[rgb(117,117,117)] mb-6 leading-relaxed">{testimonial.text}</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
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

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
                <span className="text-[rgb(66,66,66)]">{'{'}</span> FAQ <span className="text-[rgb(66,66,66)]">{'}'}</span>
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[rgb(66,66,66)] mb-8">
                Clear Solutions to Your Concerns
              </h2>
              <div className="flex gap-4">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgb(245,87,51)" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgb(245,87,51)" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-[rgb(242,242,242)] pb-4">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left py-3"
                  >
                    <span className="text-lg font-semibold text-[rgb(66,66,66)]">{faq.question}</span>
                    <svg
                      className={`w-6 h-6 text-[rgb(117,117,117)] transition-transform ${openFAQ === idx ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  {openFAQ === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[rgb(117,117,117)] leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
