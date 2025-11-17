import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProjectData {
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
}

interface ProjectsDataMap {
  [key: string]: ProjectData;
}

const projectsData: ProjectsDataMap = {
  'velocity': {
    title: 'VeloCity',
    category: 'Web design',
    client: 'VeloCity Transit Solutions',
    year: '2024',
    description: 'A modern transportation platform connecting urban commuters with real-time transit information and route optimization.',
    challenge: 'Create an intuitive interface that simplifies complex transit data for users on the go.',
    solution: 'Designed a clean, mobile-first web experience with live tracking, route planning, and multimodal transport integration.',
    results: [
      '40% increase in daily active users',
      '25% reduction in customer support tickets',
      '4.8/5 user satisfaction rating'
    ],
    services: ['UX/UI Design', 'Web Development', 'Mobile Optimization', 'API Integration']
  },
  'the-perfect-frame': {
    title: 'The Perfect Frame',
    category: 'Marketing',
    client: 'Perfect Frame Photography Studio',
    year: '2024',
    description: 'A boutique photography studio specializing in wedding and portrait photography needed a digital presence that matched their artistic vision.',
    challenge: 'Showcase portfolio while maintaining fast load times and elegant presentation.',
    solution: 'Developed a marketing strategy with SEO-optimized website, social media campaigns, and email marketing automation.',
    results: [
      '60% increase in booking inquiries',
      '200% growth in social media engagement',
      'Top 3 Google ranking for local searches'
    ],
    services: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media Management']
  },
  'spreading-the-word': {
    title: 'Spreading the Word',
    category: 'Branding',
    client: 'WordSpread Publishing House',
    year: '2023',
    description: 'An independent publisher looking to establish a distinctive brand identity in a crowded market.',
    challenge: 'Create a memorable brand that resonates with both authors and readers across multiple genres.',
    solution: 'Developed comprehensive brand identity including logo, typography, color system, and brand guidelines.',
    results: [
      'Brand recognition increased by 75%',
      '30% increase in author submissions',
      'Successfully launched 12 new titles under new brand'
    ],
    services: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines']
  },
  'fresh-beginnings': {
    title: 'Fresh Beginnings',
    category: 'Development',
    client: 'Fresh Start Wellness App',
    year: '2024',
    description: 'A health and wellness startup needed a robust mobile-responsive web application for their habit-tracking platform.',
    challenge: 'Build a scalable, performant application that handles real-time data synchronization and user authentication.',
    solution: 'Developed full-stack web application using React, Node.js, and MongoDB with real-time updates and secure authentication.',
    results: [
      '10,000+ registered users in first 3 months',
      '99.9% uptime',
      'Average load time under 1.5 seconds'
    ],
    services: ['Full-Stack Development', 'Database Design', 'Cloud Deployment', 'Security Implementation']
  },
  'vistahaven': {
    title: 'VistaHaven',
    category: 'Web design',
    client: 'VistaHaven Real Estate',
    year: '2023',
    description: 'Luxury real estate agency requiring an elegant platform to showcase premium properties.',
    challenge: 'Create an immersive experience that highlights property features while maintaining sophistication.',
    solution: 'Designed high-end web experience with virtual tours, advanced search filters, and neighborhood insights.',
    results: [
      'Property inquiries up 85%',
      'Average time on site increased by 3 minutes',
      'Featured in Real Estate Weekly'
    ],
    services: ['UX/UI Design', 'Interactive Maps', 'Virtual Tour Integration', 'CMS Development']
  },
  'kindred-space': {
    title: 'Kindred Space',
    category: 'Branding',
    client: 'Kindred Coworking Spaces',
    year: '2024',
    description: 'A new coworking space network needed brand identity that conveys community, creativity, and collaboration.',
    challenge: 'Stand out in competitive coworking market while appealing to diverse professional demographics.',
    solution: 'Created vibrant brand identity with modular logo system, warm color palette, and community-focused messaging.',
    results: [
      '95% occupancy rate within 6 months',
      'Featured in 3 design publications',
      'Brand awareness at 68% in target markets'
    ],
    services: ['Brand Identity', 'Environmental Graphics', 'Marketing Collateral', 'Signage Design']
  },
  'glow-theory': {
    title: 'Glow Theory',
    category: 'Development',
    client: 'GlowTheory Skincare E-commerce',
    year: '2024',
    description: 'Skincare brand launching direct-to-consumer e-commerce platform with subscription model.',
    challenge: 'Build robust e-commerce solution with subscription management, inventory tracking, and customer portal.',
    solution: 'Developed custom Shopify integration with subscription engine, customer dashboard, and automated fulfillment.',
    results: [
      '$500K+ in first quarter sales',
      '1,200+ active subscribers',
      'Cart abandonment rate reduced to 35%'
    ],
    services: ['E-commerce Development', 'Payment Integration', 'Subscription Management', 'Analytics Dashboard']
  },
  'built-to-last': {
    title: 'Built to Last',
    category: 'Marketing',
    client: 'Built2Last Construction',
    year: '2023',
    description: 'Established construction company needed modernized marketing approach to reach younger homeowners.',
    challenge: 'Revitalize brand perception and generate qualified leads in competitive construction market.',
    solution: 'Implemented multi-channel marketing campaign including PPC, content marketing, and video testimonials.',
    results: [
      '150% increase in qualified leads',
      '45% reduction in cost per acquisition',
      '20+ video testimonials collected'
    ],
    services: ['PPC Campaigns', 'Content Marketing', 'Video Production', 'Lead Generation']
  }
};

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug] : null;

  if (!project) {
    return (
      <div className="pt-20 min-h-screen" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <Link
              to="/projects"
              className="mb-8 inline-block hover:underline"
              style={{ color: 'rgb(245, 87, 51)' }}
            >
              ← Back to Projects
            </Link>
            <div className="text-center py-20">
              <h1 className="font-geist text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
                Project Not Found
              </h1>
              <p className="text-lg mb-8" style={{ color: 'rgb(117, 117, 117)' }}>
                The project you're looking for doesn't exist.
              </p>
              <Link
                to="/projects"
                className="inline-block px-8 py-3 rounded-full font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: 'rgb(245, 87, 51)', color: 'white' }}
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
      <article className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Link
            to="/projects"
            className="mb-8 inline-block hover:underline"
            style={{ color: 'rgb(245, 87, 51)' }}
          >
            ← Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-geist text-4xl md:text-6xl font-bold mb-6" style={{ color: 'rgb(66, 66, 66)' }}>
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              <span
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: 'rgb(242, 242, 242)', color: 'rgb(66, 66, 66)' }}
              >
                {project.category}
              </span>
              <span
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: 'rgb(242, 242, 242)', color: 'rgb(66, 66, 66)' }}
              >
                Client: {project.client}
              </span>
              <span
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: 'rgb(242, 242, 242)', color: 'rgb(66, 66, 66)' }}
              >
                Year: {project.year}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div
              className="aspect-video rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgb(245, 87, 51) 0%, rgb(66, 66, 66) 100%)'
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-16"
          >
            {/* Description */}
            <section>
              <h2 className="font-geist text-2xl md:text-3xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
                Project Overview
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: 'rgb(117, 117, 117)' }}>
                {project.description}
              </p>
            </section>

            {/* Challenge & Solution */}
            <section className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h2 className="font-geist text-2xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
                  The Challenge
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: 'rgb(117, 117, 117)' }}>
                  {project.challenge}
                </p>
              </div>
              <div>
                <h2 className="font-geist text-2xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
                  The Solution
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: 'rgb(117, 117, 117)' }}>
                  {project.solution}
                </p>
              </div>
            </section>

            {/* Results */}
            <section className="p-8 md:p-12 rounded-2xl" style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
              <h2 className="font-geist text-2xl md:text-3xl font-bold mb-6" style={{ color: 'rgb(66, 66, 66)' }}>
                Results & Impact
              </h2>
              <ul className="space-y-4">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: 'rgb(245, 87, 51)' }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-lg" style={{ color: 'rgb(66, 66, 66)' }}>
                      {result}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Services */}
            <section>
              <h2 className="font-geist text-2xl md:text-3xl font-bold mb-6" style={{ color: 'rgb(66, 66, 66)' }}>
                Services Provided
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-5 py-3 rounded-full text-sm font-medium border-2 transition-all hover:shadow-lg"
                    style={{
                      borderColor: 'rgb(245, 87, 51)',
                      color: 'rgb(66, 66, 66)',
                      backgroundColor: 'white'
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="text-center pt-8 pb-4">
              <Link
                to="/projects"
                className="inline-block px-10 py-4 rounded-full font-medium text-lg transition-all hover:shadow-xl hover:opacity-90"
                style={{ backgroundColor: 'rgb(245, 87, 51)', color: 'white' }}
              >
                View Next Project
              </Link>
            </section>
          </motion.div>
        </div>
      </article>
    </div>
  );
};

export default ProjectDetailPage;
