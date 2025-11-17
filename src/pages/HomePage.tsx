import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Motion values for smooth animations
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { 
    stiffness: 100, 
    damping: 30,
    mass: 0.3
  });

  useEffect(() => {
    // Auto-play videos when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.play().catch(() => {});
    }
  }, []);

  const accumulatedScrollRef = useRef(0);
  const scrollThresholdRef = useRef(200); // Total scroll needed to complete animation (much faster)

  useEffect(() => {
    const scrollThreshold = scrollThresholdRef.current;

    const handleWheel = (e: WheelEvent) => {
      const scrollDelta = e.deltaY;
      const currentScroll = window.scrollY;

      // If scrolling up and at the top, reverse animation to bring teardrops back
      if (scrollDelta < 0 && currentScroll === 0) {
        // If teardrops are fully gone, reset accumulated scroll to allow reverse
        if (animationProgress >= 1) {
          accumulatedScrollRef.current = scrollThreshold;
        }
        
        accumulatedScrollRef.current = Math.max(0, accumulatedScrollRef.current + scrollDelta);
        const newProgress = Math.max(0, Math.min(accumulatedScrollRef.current / scrollThreshold, 1));
        
        setAnimationProgress(newProgress);
        progress.set(newProgress);
        setIsAnimating(newProgress > 0 && newProgress < 1);
        setScrollLocked(true);

        // Prevent actual scrolling
        e.preventDefault();
        e.stopPropagation();

        // Dispatch custom event to sync with Header
        window.dispatchEvent(new CustomEvent('teardropAnimationProgress', { detail: newProgress }));

        return;
      }

      // If scrolling down and scroll is locked (animation in progress)
      if (scrollDelta > 0 && scrollLocked && animationProgress < 1) {
        accumulatedScrollRef.current += scrollDelta;
        const newProgress = Math.min(accumulatedScrollRef.current / scrollThreshold, 1);
        
        setAnimationProgress(newProgress);
        progress.set(newProgress);
        setIsAnimating(newProgress < 1);

        // Prevent actual scrolling
        e.preventDefault();
        e.stopPropagation();

        // Dispatch custom event to sync with Header
        window.dispatchEvent(new CustomEvent('teardropAnimationProgress', { detail: newProgress }));

        // Don't unlock here - wait for spring animation to complete
        return;
      }

      // If scrolling down at top and teardrops are still visible, prevent scroll
      if (scrollDelta > 0 && currentScroll === 0 && animationProgress < 1) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // If animation is complete and we're at top, allow normal scroll down
      if (scrollDelta > 0 && currentScroll === 0 && animationProgress >= 1 && !scrollLocked) {
        // Allow normal scroll down - don't prevent
        return;
      }

      // If scrolling up and we're scrolled down, allow normal scroll
      if (scrollDelta < 0 && currentScroll > 0 && !scrollLocked) {
        // Normal scroll behavior - let it scroll
        return;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const shouldLock = scrollLocked || (window.scrollY === 0 && animationProgress < 1);
      if (shouldLock) {
        e.preventDefault();
      }
    };

    const handleScroll = () => {
      // If user scrolls back to top
      if (window.scrollY === 0) {
        // If teardrops are fully gone, reset accumulated scroll to allow reverse
        if (animationProgress >= 1) {
          accumulatedScrollRef.current = scrollThresholdRef.current;
          progress.set(1);
          setScrollLocked(true);
        } else if (animationProgress < 1) {
          // If teardrops are partially visible, re-lock
          setScrollLocked(true);
        }
        // Reset body styles to lock scroll
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      }
    };

    // Lock body scroll while animating or when at top with teardrops visible
    // Lock when: scroll is locked OR at top with teardrops not fully gone
    // But always add wheel listener at top to handle scroll up to bring teardrops back
    const shouldLock = scrollLocked || (window.scrollY === 0 && animationProgress < 1);
    const shouldListenAtTop = window.scrollY === 0; // Always listen at top to allow scroll up
    
    if (shouldLock) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    // Always add wheel listener at top to handle scroll up, or when locked
    if (shouldListenAtTop || shouldLock) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollLocked, progress, animationProgress]);

  // Reset accumulated scroll when component mounts
  useEffect(() => {
    accumulatedScrollRef.current = 0;
    setAnimationProgress(0);
    setScrollLocked(true);
  }, []);

  // Monitor smoothProgress to unlock scroll only when animation fully completes
  useEffect(() => {
    if (!scrollLocked) return;

    let timeoutId: NodeJS.Timeout;
    let fallbackTimeoutId: NodeJS.Timeout;
    let lastValue = smoothProgress.get();
    let stableCount = 0;
    let checkCount = 0;

    const unlockScroll = () => {
      clearTimeout(timeoutId);
      clearTimeout(fallbackTimeoutId);
      setScrollLocked(false);
      setIsAnimating(false);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      window.dispatchEvent(new CustomEvent('teardropAnimationComplete'));
    };

    const checkProgress = () => {
      if (!scrollLocked) {
        clearTimeout(timeoutId);
        clearTimeout(fallbackTimeoutId);
        return;
      }

      checkCount++;
      const currentValue = smoothProgress.get();
      
      // Check if value is stable (not changing much)
      if (Math.abs(currentValue - lastValue) < 0.001) {
        stableCount++;
      } else {
        stableCount = 0;
      }
      
      lastValue = currentValue;

      // Only unlock when smoothProgress is at 1 and has been stable, AND animationProgress is at 1
      if (currentValue >= 0.99 && stableCount >= 2 && animationProgress >= 1) {
        unlockScroll();
      } else if (animationProgress >= 1 && currentValue >= 0.95 && checkCount > 30) {
        // Fallback: if animationProgress is 1 and we've been checking for a while, unlock
        unlockScroll();
      } else {
        // Keep checking
        timeoutId = setTimeout(checkProgress, 16); // ~60fps
      }
    };

    // Fallback: unlock after 2 seconds if animationProgress is 1
    if (animationProgress >= 1) {
      fallbackTimeoutId = setTimeout(() => {
        if (scrollLocked && animationProgress >= 1) {
          unlockScroll();
        }
      }, 2000);
    }

    // Start checking immediately
    timeoutId = setTimeout(checkProgress, 16);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(fallbackTimeoutId);
    };
  }, [scrollLocked, smoothProgress, animationProgress]);

  // Transform animation progress to opacity and translate values using smooth progress
  const leftBackdropOpacity = useTransform(smoothProgress, [0, 1], [1, 0]);
  const leftBackdropX = useTransform(smoothProgress, [0, 1], [0, -100]);
  const rightBackdropOpacity = useTransform(smoothProgress, [0, 1], [1, 0]);
  const rightBackdropX = useTransform(smoothProgress, [0, 1], [0, 100]);
  return (
    <div className="relative min-h-screen">
      {/* Video Background - Desktop/Tablet */}
      <div className="hidden md:block fixed inset-0 z-0">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          loop
          muted
          playsInline
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      {/* Video Background - Mobile */}
      <div className="md:hidden fixed inset-0 z-0">
        <video
          ref={mobileVideoRef}
          src="/hero-video.mp4"
          loop
          muted
          playsInline
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative z-10 min-h-screen flex items-center">
        {/* Teardrop Background for Hero Text - Extends to end of creators title */}
        <motion.div 
          className="absolute bg-white/80 backdrop-blur-md"
          style={{
            top: '0',
            height: '100vh',
            left: '0',
            width: isMobile ? '100vw' : 'calc(100vw * 0.4 + 600px)',
            maxWidth: isMobile ? '100vw' : '60vw',
            borderRadius: isMobile ? '0' : '0 40px 40px 0',
            zIndex: 9,
            opacity: leftBackdropOpacity,
            x: leftBackdropX
          }}
        />
        <div className="w-full px-6 md:px-10 relative z-10">
          <div className="max-w-2xl relative">
            {/* Left Side - Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left relative z-10"
              style={{ padding: '40px' }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl mb-4"
                style={{ color: 'rgb(51, 51, 51)' }}
              >
                We are digital design
              </motion.p>
                     <motion.h1
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3, duration: 0.6 }}
                       className="font-archivo text-6xl md:text-8xl lg:text-[180px] font-extrabold uppercase leading-[0.8em] mb-6"
                       style={{ color: 'rgb(51, 51, 51)' }}
                     >
                       <span style={{ color: 'rgb(245, 87, 51)' }}>creators</span>
                     </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl mb-8 max-w-lg"
                style={{ color: 'rgb(84, 84, 84)' }}
              >
                From Concept to Creation — Beautiful design has the power to captivate audiences
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/#team"
                  className="inline-flex items-center gap-4 border-2 rounded-full px-6 py-3 hover:bg-gray-100 transition-colors group"
                  style={{ borderColor: 'rgb(117, 117, 117)', color: 'rgb(117, 117, 117)' }}
                >
                  <div className="flex -space-x-2">
                    {[
                      'https://framerusercontent.com/images/GIMRdH8dZSD3uPWu3xwSWnyRJY.jpg',
                      'https://framerusercontent.com/images/PQ0CdHcvW9qzllrrn2lyBWphgQ.jpg',
                      'https://framerusercontent.com/images/TpZ2CrtmA37AVPZojolRnAczbQ8.jpg',
                      'https://framerusercontent.com/images/MlufJeWumaLTDOPjyglgkEbHdQ.jpg',
                    ].map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Team member ${i + 1}`}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <span className="font-medium">Meet Our Team</span>
                  <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center group-hover:bg-gray-200 transition-colors" style={{ borderColor: 'rgb(117, 117, 117)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        </section>

      {/* Services Preview Section */}
      <section id="services" className="relative z-10 py-24 md:py-32" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-6" style={{ color: 'rgb(245, 87, 51)' }}>
              <span className="text-xl">{'{'}</span>
              <span className="text-base font-medium">Our Services</span>
              <span className="text-xl">{'}'}</span>
            </div>
            <h2 className="font-archivo text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight" style={{ color: 'rgb(66, 66, 66)' }}>
              EXPLORE WHAT WE<br />CAN DO FOR YOU
            </h2>
          </motion.div>

          <div className="space-y-0">
            {[
              { number: '01', title: 'BRANDING', subtitle: 'Brain Storm', description: 'Create memorable brand identities that resonate with your audience' },
              { number: '02', title: 'WEB DESIGN', subtitle: 'UI / UX', description: 'Beautiful, intuitive designs that enhance user experience' },
              { number: '03', title: 'DEVELOPMENT', subtitle: 'Coding', description: 'Custom web solutions built with cutting-edge technology' },
              { number: '04', title: 'MARKETING', subtitle: 'Integrations', description: 'Strategic marketing to grow your digital presence' },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-t group cursor-pointer"
                style={{ borderColor: 'rgb(220, 220, 220)' }}
              >
                <div className="flex items-center justify-between py-8 md:py-12 hover:bg-white/50 transition-colors px-4 md:px-6">
                  <div className="flex items-center gap-6 md:gap-8 flex-1">
                    <span className="text-xl md:text-2xl font-light" style={{ color: 'rgb(245, 87, 51)' }}>
                      {service.number}
                    </span>
                    <div className="flex flex-col md:flex-row md:items-baseline md:gap-4 flex-1">
                      <h3 className="font-archivo text-3xl md:text-5xl lg:text-6xl font-bold" style={{ color: 'rgb(66, 66, 66)' }}>
                        {service.title}
                      </h3>
                      <span className="text-base md:text-lg mt-1 md:mt-0" style={{ color: 'rgb(117, 117, 117)' }}>
                        {service.subtitle}
                      </span>
                    </div>
                  </div>
                  <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center group-hover:bg-gray-100 transition-colors flex-shrink-0" style={{ borderColor: 'rgb(117, 117, 117)', color: 'rgb(117, 117, 117)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
            {/* Bottom border */}
            <div className="border-t" style={{ borderColor: 'rgb(220, 220, 220)' }}></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 md:py-32 overflow-hidden">
        {/* Teardrop Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute bg-white/80 backdrop-blur-sm"
            style={{
              top: '10%',
              left: '-10%',
              width: '70%',
              height: '80%',
              borderRadius: '0 200px 200px 0',
              zIndex: 0,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-6" style={{ color: 'rgb(66, 66, 66)' }}>
                About Aven Studio
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgb(117, 117, 117)' }}>
                At Aven Studio, we specialize in crafting custom web solutions, including branding, web design, development, and marketing, tailored to meet your business needs.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border-2 rounded-full px-6 py-3 font-medium hover:bg-white transition-colors"
                style={{ borderColor: 'rgb(245, 87, 51)', color: 'rgb(245, 87, 51)' }}
              >
                Learn More
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[40px] overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(245, 87, 51) 0%, rgb(255, 140, 100) 100%)' }}>
                {/* Image placeholder with gradient */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="relative z-10 py-24 md:py-32" style={{ backgroundColor: 'rgb(245, 87, 51)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '6+', label: 'Years Experience' },
              { value: '500+', label: 'Projects Done' },
              { value: '450+', label: 'Happy Clients' },
              { value: '98%', label: 'Satisfied Clients' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="font-archivo text-5xl md:text-6xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-lg opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners/Logos Section */}
      <section id="partners" className="relative z-10 py-24 md:py-32" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-archivo text-3xl md:text-4xl font-bold" style={{ color: 'rgb(66, 66, 66)' }}>
              We work with the world's top companies
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="aspect-video rounded-2xl flex items-center justify-center border"
                style={{ backgroundColor: 'rgb(242, 242, 242)', borderColor: 'rgb(207, 207, 207)' }}
              >
                <div className="text-4xl font-bold" style={{ color: 'rgb(207, 207, 207)' }}>
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="project" className="relative z-10 py-24 md:py-32 overflow-hidden">
        {/* Teardrop Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute bg-white/80 backdrop-blur-sm"
            style={{
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '95%',
              maxWidth: '1400px',
              height: '90%',
              borderRadius: '200px',
              border: '1px solid rgba(245, 87, 51, 0.5)',
              zIndex: 0,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
              Featured Projects
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgb(117, 117, 117)' }}>
              Explore our portfolio of impactful digital experiences
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'VeloCity', category: 'Web Design', slug: 'velocity', gradient: 'linear-gradient(135deg, rgb(100, 150, 255) 0%, rgb(60, 100, 200) 100%)' },
              { title: 'The Perfect Frame', category: 'Marketing', slug: 'the-perfect-frame', gradient: 'linear-gradient(135deg, rgb(255, 120, 150) 0%, rgb(200, 70, 100) 100%)' },
              { title: 'Spreading the Word', category: 'Branding', slug: 'spreading-the-word', gradient: 'linear-gradient(135deg, rgb(150, 200, 100) 0%, rgb(100, 150, 60) 100%)' },
              { title: 'Fresh Beginnings', category: 'Development', slug: 'fresh-beginnings', gradient: 'linear-gradient(135deg, rgb(255, 180, 100) 0%, rgb(200, 130, 50) 100%)' },
            ].map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block"
                >
                  <div className="relative rounded-[40px] overflow-hidden aspect-[4/3] mb-6" style={{ background: project.gradient }}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-archivo text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors" style={{ color: 'rgb(66, 66, 66)' }}>
                        {project.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>
                        {project.category}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgb(245, 87, 51)' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border-2 rounded-full px-8 py-4 font-medium hover:bg-gray-100 transition-colors"
              style={{ borderColor: 'rgb(245, 87, 51)', color: 'rgb(245, 87, 51)' }}
            >
              View All Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="relative z-10 py-24 md:py-32" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:sticky md:top-32"
            >
              <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'rgb(245, 87, 51)' }}>
                <span className="text-2xl">{'{'}</span>
                <span className="text-lg font-medium">How We Work</span>
                <span className="text-2xl">{'}'}</span>
              </div>
              <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-6" style={{ color: 'rgb(66, 66, 66)' }}>
                Strategic Steps to Impactful Results
              </h2>
              <p className="text-lg" style={{ color: 'rgb(117, 117, 117)' }}>
                Our proven process ensures every project is delivered with excellence and precision.
              </p>
            </motion.div>
            <div className="space-y-8">
              {[
                { step: '1', title: 'Listening to Your Vision', description: 'We begin by discussing your goals, audience, and expectations to ensure our approach aligns perfectly with your vision.' },
                { step: '2', title: 'Planning with Purpose', description: 'We analyze trends, competitors, and opportunities to craft a strategic roadmap tailored to your needs.' },
                { step: '3', title: 'Visualizing Your Ideas', description: 'We create detailed mockups and prototypes that bring your concepts to life before development begins.' },
                { step: '4', title: 'Bringing It to Life', description: 'Our expert developers build your project using the latest technologies and best practices for optimal performance.' },
                { step: '5', title: 'Delivering Success', description: 'We launch your project with comprehensive testing and provide ongoing support to ensure continued success.' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 bg-white rounded-[30px] p-6 border hover:shadow-lg transition-shadow"
                  style={{ borderColor: 'rgb(220, 220, 220)' }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: 'rgb(245, 87, 51)', color: 'white' }}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-archivo text-xl font-bold mb-2" style={{ color: 'rgb(51, 51, 51)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgb(117, 117, 117)' }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative z-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
              Meet Our Team
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgb(117, 117, 117)' }}>
              The creative minds behind every project
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Michael Rivera', role: 'Brand Strategist', image: 'https://framerusercontent.com/images/fwsSWdjTdPsaaHh7MaSMPNfJOmQ.jpeg' },
              { name: 'Emily Carter', role: 'Creative Director', image: 'https://framerusercontent.com/images/u3Dau8sEcOFuqJd7YNy6wZdo.jpeg' },
              { name: 'Sarah Johnson', role: 'Web Designer', image: 'https://framerusercontent.com/images/EKuM1vPly5ELH1gDYADFxcz3M.jpg' },
              { name: 'Jason Lee', role: 'Front-End Developer', image: 'https://framerusercontent.com/images/OxSjic77TofuY3jD2737IBsK04.jpeg' },
              { name: 'Anna Martinez', role: 'Digital Marketing Specialist', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna' },
              { name: 'David Brown', role: 'Project Manager', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-[40px] overflow-hidden aspect-[3/4] group"
              >
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm group-hover:bg-white transition-colors">
                  <h3 className="font-archivo text-lg font-bold mb-1" style={{ color: 'rgb(66, 66, 66)' }}>
                    {member.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 md:py-32" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'rgb(245, 87, 51)' }}>
              <span className="text-2xl">{'{'}</span>
              <span className="text-lg font-medium">Pricing</span>
              <span className="text-2xl">{'}'}</span>
            </div>
            <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
              Choose Your Plan
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgb(117, 117, 117)' }}>
              Flexible pricing options to suit your needs
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Basic',
                price: '$499',
                period: '/month',
                features: [
                  'Custom Brand Identity',
                  'Responsive Web Design',
                  'Basic SEO Optimization',
                  'Social Media Setup',
                  'Monthly Analytics Report'
                ],
                popular: false
              },
              {
                name: 'Growth',
                price: '$999',
                period: '/month',
                features: [
                  'Everything in Basic',
                  'Advanced SEO Strategy',
                  'Content Marketing',
                  'Email Marketing Campaigns',
                  'Conversion Optimization',
                  'Priority Support'
                ],
                popular: true
              },
              {
                name: 'Professional',
                price: '$1599',
                period: '/month',
                features: [
                  'Everything in Growth',
                  'Custom Development',
                  'Marketing Automation',
                  'Dedicated Account Manager',
                  '24/7 Premium Support',
                  'Monthly Strategy Sessions'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white rounded-[40px] p-8 border hover:shadow-xl transition-shadow"
                style={{ borderColor: plan.popular ? 'rgb(245, 87, 51)' : 'rgb(220, 220, 220)' }}
              >
                {plan.popular && (
                  <div className="absolute top-6 right-6 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'rgb(245, 87, 51)' }}>
                    Popular
                  </div>
                )}
                <h3 className="font-archivo text-2xl font-bold mb-2" style={{ color: 'rgb(66, 66, 66)' }}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="font-archivo text-5xl font-bold" style={{ color: 'rgb(66, 66, 66)' }}>
                    {plan.price}
                  </span>
                  <span className="text-lg ml-2" style={{ color: 'rgb(117, 117, 117)' }}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="10" fill="rgb(245, 87, 51)" fillOpacity="0.1"/>
                        <path d="M6 10L9 13L14 7" stroke="rgb(245, 87, 51)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className="block w-full text-center rounded-xl py-3 font-medium transition-colors"
                  style={{
                    backgroundColor: plan.popular ? 'rgb(245, 87, 51)' : 'transparent',
                    border: plan.popular ? 'none' : '2px solid rgb(245, 87, 51)',
                    color: plan.popular ? 'white' : 'rgb(245, 87, 51)'
                  }}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'rgb(245, 87, 51)' }}
            >
              View All Plans & Features
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-24 md:py-32 overflow-hidden">
        {/* Teardrop Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute bg-white/80 backdrop-blur-sm"
            style={{
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '95%',
              maxWidth: '1400px',
              height: '90%',
              borderRadius: '200px',
              border: '1px solid rgba(245, 87, 51, 0.5)',
              zIndex: 0,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
              What Our Clients Say
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgb(117, 117, 117)' }}>
              Testimonials from satisfied clients
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Lin',
                role: 'Customer',
                quote: 'Aven Studio transformed our brand identity completely. Their attention to detail and creative approach exceeded all our expectations.',
                rating: 5
              },
              {
                name: 'Jason Turner',
                role: 'Startup Founder',
                quote: 'Working with Aven Studio was seamless. They delivered a stunning website that perfectly captures our vision and drives results.',
                rating: 5
              },
              {
                name: 'Mia Reynolds',
                role: 'Creative Director',
                quote: 'The team at Aven Studio is incredibly talented. They brought fresh ideas and executed them flawlessly.',
                rating: 5
              },
              {
                name: 'Daniel Cho',
                role: 'Nonprofit Executive',
                quote: 'Aven Studio helped us reach a wider audience with their strategic marketing approach. Our engagement has never been higher.',
                rating: 5
              },
              {
                name: 'Clara Morales',
                role: 'SaaS Product Manager',
                quote: 'Their development team is top-notch. The custom solution they built for us is fast, reliable, and exactly what we needed.',
                rating: 5
              },
              {
                name: 'Leo Klein',
                role: 'Founder',
                quote: 'Aven Studio is more than just a service provider - they are true partners in our success. Highly recommended!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[30px] p-8 border hover:shadow-lg transition-shadow"
                style={{ borderColor: 'rgb(220, 220, 220)' }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="rgb(245, 87, 51)">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgb(117, 117, 117)' }}>
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: 'rgb(245, 87, 51)' }}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-archivo font-bold text-sm" style={{ color: 'rgb(66, 66, 66)' }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-xs" style={{ color: 'rgb(117, 117, 117)' }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section id="faq" className="relative z-10 py-24 md:py-32" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgb(117, 117, 117)' }}>
              Quick answers to common questions
            </p>
          </motion.div>
          <div className="space-y-4">
            {[
              {
                question: 'What is included in your branding services?',
                answer: 'Our branding services include logo design, color palette development, typography selection, brand guidelines, and marketing collateral design.'
              },
              {
                question: 'How long does it take to complete a branding project?',
                answer: 'A typical branding project takes 4-6 weeks from initial consultation to final delivery, depending on the scope and complexity.'
              },
              {
                question: 'Do you offer mobile-friendly designs?',
                answer: 'Yes! All our web designs are fully responsive and optimized for mobile, tablet, and desktop devices.'
              },
              {
                question: 'Can you redesign an existing website?',
                answer: 'Absolutely! We specialize in website redesigns that modernize your online presence while maintaining your brand identity.'
              },
              {
                question: 'Do you provide custom development solutions?',
                answer: 'Yes, we offer custom web development using the latest technologies to build scalable, secure, and high-performance solutions.'
              }
            ].map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[20px] p-6 border group hover:shadow-md transition-shadow"
                style={{ borderColor: 'rgb(220, 220, 220)' }}
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="font-archivo text-lg font-bold pr-4" style={{ color: 'rgb(66, 66, 66)' }}>
                    {faq.question}
                  </h3>
                  <svg className="w-6 h-6 flex-shrink-0 transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="rgb(245, 87, 51)" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </summary>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgb(117, 117, 117)' }}>
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 border-2 rounded-full px-8 py-4 font-medium hover:bg-white transition-colors"
              style={{ borderColor: 'rgb(245, 87, 51)', color: 'rgb(245, 87, 51)' }}
            >
              View All FAQs
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="relative z-10 py-24 md:py-32 overflow-hidden">
        {/* Teardrop Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute bg-white/80 backdrop-blur-sm"
            style={{
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '95%',
              maxWidth: '1400px',
              height: '90%',
              borderRadius: '200px',
              border: '1px solid rgba(245, 87, 51, 0.5)',
              zIndex: 0,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
              Our Insights
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgb(117, 117, 117)' }}>
              Stay Ahead with the Latest in Digital Marketing
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'The Future of AI in Digital Marketing',
                date: 'May 5, 2025',
                category: 'Insights',
                slug: 'future-of-ai-in-digital-marketing',
                gradient: 'linear-gradient(135deg, rgb(120, 100, 255) 0%, rgb(80, 60, 200) 100%)'
              },
              {
                title: 'Top Digital Marketing Trends for 2025',
                date: 'May 3, 2025',
                category: 'Marketing',
                slug: 'top-digital-marketing-trends-2025',
                gradient: 'linear-gradient(135deg, rgb(255, 100, 150) 0%, rgb(200, 60, 100) 100%)'
              },
              {
                title: 'The Importance of User-Centered Design',
                date: 'May 2, 2025',
                category: 'Design',
                slug: 'importance-of-user-centered-design',
                gradient: 'linear-gradient(135deg, rgb(100, 200, 180) 0%, rgb(60, 150, 130) 100%)'
              }
            ].map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="rounded-[30px] overflow-hidden aspect-[4/3] mb-6" style={{ background: post.gradient }}>
                    <div className="w-full h-full bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>
                  <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: 'rgb(117, 117, 117)' }}>
                    <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgb(245, 87, 51)', color: 'white' }}>
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-archivo text-xl font-bold group-hover:text-orange-500 transition-colors" style={{ color: 'rgb(66, 66, 66)' }}>
                    {post.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 border-2 rounded-full px-8 py-4 font-medium hover:bg-gray-100 transition-colors"
              style={{ borderColor: 'rgb(245, 87, 51)', color: 'rgb(245, 87, 51)' }}
            >
              View All Articles
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 md:py-32 overflow-hidden">
        {/* Teardrop Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute bg-white/80 backdrop-blur-sm"
            style={{
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '75%',
              maxWidth: '900px',
              height: '90%',
              borderRadius: '200px',
              border: '1px solid rgba(245, 87, 51, 0.5)',
              zIndex: 0,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'rgb(245, 87, 51)' }}>
              <span className="text-2xl">{'{'}</span>
              <span className="text-lg font-medium">Get in touch</span>
              <span className="text-2xl">{'}'}</span>
            </div>
            <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-6" style={{ color: 'rgb(66, 66, 66)' }}>
              Let's Start Your Project Today
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white border rounded-2xl p-8 md:p-12" style={{ borderColor: 'rgb(220, 220, 220)' }}>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://framerusercontent.com/images/sO8Qc7EI5ijTzk0bY8jBsX1qYew.jpg"
                  alt="Michael Bridges"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold" style={{ color: 'rgb(66, 66, 66)' }}>Michael Bridges</p>
                  <p className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>CEO, Aven Studio</p>
                </div>
              </div>
              <p className="mb-8" style={{ color: 'rgb(117, 117, 117)' }}>
                At Aven Studio, we believe in building meaningful digital experiences. If you ever have questions or need guidance, I'm always here to support you. Your success is our mission — let's create something incredible together.
              </p>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'rgb(117, 117, 117)' }}>Name</label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'rgb(51, 51, 51)', 
                        borderColor: 'rgb(51, 51, 51)',
                        color: 'white',
                        focusRingColor: 'rgb(245, 87, 51)'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'rgb(117, 117, 117)' }}>Email</label>
                    <input
                      type="email"
                      placeholder="johnsmith@gmail.com"
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'rgb(51, 51, 51)', 
                        borderColor: 'rgb(51, 51, 51)',
                        color: 'white'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'rgb(117, 117, 117)' }}>Service Needed ?</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: 'rgb(51, 51, 51)', 
                      borderColor: 'rgb(51, 51, 51)',
                      color: 'white'
                    }}
                  >
                    <option>Branding</option>
                    <option>Web design</option>
                    <option>Marketing</option>
                    <option>Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'rgb(117, 117, 117)' }}>What Can I Help You...</label>
                  <textarea
                    rows={4}
                    placeholder="Hello, I'd like to enquire about..."
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: 'rgb(51, 51, 51)', 
                      borderColor: 'rgb(51, 51, 51)',
                      color: 'white'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl py-4 font-medium text-white transition-colors"
                  style={{ backgroundColor: 'rgb(245, 87, 51)' }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
