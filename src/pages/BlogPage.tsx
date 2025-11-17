import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogPage: React.FC = () => {
  // Blog posts matching the original
  const blogPosts = [
    {
      title: 'The Future of AI in Digital Marketing',
      date: 'May 5, 2025',
      category: 'Insights',
      link: '/blog/the-future-of-ai-in-digital-marketing',
      featured: true,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop'
    },
    {
      title: 'The Role of Artificial Intelligence in Modern Digital Marketing',
      date: 'May 5, 2025',
      category: 'Insights',
      link: '/blog/the-role-of-artificial-intelligence-in-modern-digital-marketing',
      featured: false,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop'
    },
    {
      title: 'Top Digital Marketing Trends for 2025',
      date: 'May 3, 2025',
      category: 'Marketing',
      link: '/blog/top-digital-marketing-trends-for-2025',
      featured: false,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'
    },
    {
      title: 'The Importance of User-Centered Design',
      date: 'May 2, 2025',
      category: 'Design',
      link: '/blog/the-importance-of-user-centered-design',
      featured: false,
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop'
    },
    {
      title: 'The Impact of Artificial Intelligence on Digital Marketing Strategies',
      date: 'Apr 28, 2025',
      category: 'Insights',
      link: '/blog/the-impact-of-artificial-intelligence-on-digital-marketing-strategies',
      featured: false,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'
    },
    {
      title: 'Building a Resilient Business Model in Uncertain Times',
      date: 'Apr 27, 2025',
      category: 'Business',
      link: '/blog/building-a-resilient-business-model-in-uncertain-times',
      featured: false,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop'
    },
    {
      title: 'Building a Resilient Startup: Key Strategies for Success',
      date: 'Apr 27, 2025',
      category: 'Startups',
      link: '/blog/building-a-resilient-startup-key-strategies-for-success',
      featured: false,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop'
    }
  ];

  const [visiblePosts, setVisiblePosts] = useState(7);
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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
            Ideas that move, insights that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-black uppercase leading-none tracking-tighter text-[rgb(245,87,51)]">
              blogs
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <Link
              to="#blog"
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

      {/* Blog Listing Section */}
      <section id="blog" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[rgb(117,117,117)] mb-4">
              <span className="text-[rgb(66,66,66)]">{'{'}</span> Our Insights <span className="text-[rgb(66,66,66)]">{'}'}</span>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(66,66,66)] mb-8">
              Stay Ahead with the Latest in Digital Marketing
            </h2>

            {/* Highlights Badge */}
            <div className="inline-block">
              <span className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgb(245,87,51)] text-white">
                Highlights
              </span>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <Link to={featuredPost.link} className="block group">
                <div className="relative overflow-hidden rounded-3xl aspect-[21/9] md:aspect-[21/8] bg-white shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Featured Image */}
                  <div className="absolute inset-0">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    {/* Highlights Badge */}
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgb(245,87,51)] text-white">
                        Highlights
                      </span>
                    </div>

                    {/* Date and Category */}
                    <div className="flex items-center gap-2 text-white/90 mb-4">
                      <span className="text-sm font-medium">{featuredPost.date}</span>
                      <span className="text-white/70">/</span>
                      <span className="text-sm font-medium">{featuredPost.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl">
                      {featuredPost.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {regularPosts.slice(0, visiblePosts - 1).map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Link to={post.link} className="block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                    {/* Post Image */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      {/* Date and Category */}
                      <div className="flex items-center gap-2 text-[rgb(117,117,117)] mb-4">
                        <span className="text-sm font-medium">{post.date}</span>
                        <span className="text-[rgb(207,207,207)]">/</span>
                        <span className="text-sm font-medium">{post.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-[rgb(66,66,66)] group-hover:text-[rgb(245,87,51)] transition-colors duration-300">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {visiblePosts < blogPosts.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <motion.button
                onClick={() => setVisiblePosts(prev => prev + 6)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-full bg-[rgb(66,66,66)] text-white font-semibold hover:bg-[rgb(50,50,50)] transition-colors duration-300"
              >
                Load More
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
