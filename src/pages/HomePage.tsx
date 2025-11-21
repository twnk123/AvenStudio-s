import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView } from 'framer-motion';

const CountUp = ({ value, label }: { value: string, label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Extract number from string (e.g., "500+" -> 500)
      const number = parseInt(value.replace(/[^0-9]/g, ''));
      motionValue.set(number);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  // Get suffix (e.g., "+" or "%")
  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div ref={ref} className="text-center text-white">
      <div className="font-archivo text-5xl md:text-6xl font-bold mb-2">
        {displayValue}{suffix}
      </div>
      <div className="text-lg opacity-90">
        {label}
      </div>
    </div>
  );
};

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
      videoRef.current.play().catch(() => { });
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.play().catch(() => { });
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
                Stop worrying about tech
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-archivo text-7xl md:text-9xl lg:text-[220px] font-extrabold uppercase leading-[0.8em] mb-6 -ml-2 md:-ml-3 lg:-ml-4"
                style={{ color: 'rgb(51, 51, 51)' }}
              >
                <span style={{ color: 'rgb(245, 87, 51)' }}>EVOLVE</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl mb-8 max-w-2xl"
                style={{ color: 'rgb(84, 84, 84)' }}
              >
                Get the online persona your business deserves and let us handle everything else. We'll manage and automatically evolve your digital presence alongside your growth.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Meet Our Team Button - Centered horizontally and positioned lower */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute z-10"
          style={{
            left: '30%',
            bottom: '15vh',
            translateX: '-50%'
          }}
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
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Sara's Story Section */}
      <section className="relative z-10 pt-12 md:pt-16 pb-24 md:pb-32" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 md:mb-40 text-center"
          >
            <h2 className="font-archivo text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase leading-tight mb-6" style={{ color: 'rgb(245, 87, 51)' }}>
              SARA'S STORY
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section id="purpose" className="relative z-10 pt-32 md:pt-40 lg:pt-48 pb-32 md:pb-40 lg:pb-48" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-archivo text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase leading-tight mb-8" style={{ color: 'rgb(66, 66, 66)' }}>
              The Modern Web <span style={{ color: 'rgb(245, 87, 51)' }}>Problem</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'rgb(84, 84, 84)' }}>
              Most businesses never choose the right website solution... because the right solution didn't exist before. <span style={{ color: 'rgb(245, 87, 51)' }}>Aven Studio created it.</span>
            </p>
          </motion.div>

          {/* Bento Grid Layout - 2 Large Top, 3 Smaller Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Row: Card 1 - Left Large */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: 0.1,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                scale: { duration: 0.5 }
              }}
              whileHover={{
                scale: 1.03,
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-black rounded-[40px] relative overflow-hidden cursor-pointer"
              style={{ minHeight: '600px' }}
            >
              {/* Video Background */}
              <div className="absolute inset-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{
                    pointerEvents: 'none',
                  }}
                >
                  <source src="/bento-video.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Backdrop for text - bottom portion with blur */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md" style={{ height: '35%' }} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-10">
                <p className="text-xs text-white/80 mb-2 uppercase tracking-wider font-medium">THE NEW STANDARD</p>
                <h3 className="text-white font-bold text-3xl md:text-4xl mb-4">Get a Living Website</h3>
                <p className="text-white/90 text-base leading-relaxed">
                  Most websites die the day they launch. Yours evolves. Our system patches, updates, and improves your site automatically—forever.
                </p>
              </div>
            </motion.div>

            {/* Top Row: Card 2 - Right Large */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                scale: { duration: 0.5 }
              }}
              whileHover={{
                scale: 1.03,
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-black rounded-[40px] relative overflow-hidden cursor-pointer"
              style={{ minHeight: '600px' }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src="/surpass.png"
                  alt="Surpass your competitors"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Backdrop for text - bottom portion with blur */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md" style={{ height: '35%' }} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-10">
                <p className="text-xs text-white/80 mb-2 uppercase tracking-wider font-medium">COMPETITIVE EDGE</p>
                <h3 className="text-white font-bold text-3xl md:text-4xl mb-4">Surpass Your Competitors</h3>
                <p className="text-white/90 text-base leading-relaxed">
                  While they fight with broken plugins and slow templates, your site is built on expert-vetted architecture designed for speed, SEO, and instant adaptability.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: 3 Equal Smaller Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Card 3 - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: 0.3,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{
                scale: 1.05,
                y: -12,
                rotateY: 5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-black rounded-[40px] relative overflow-hidden cursor-pointer"
              style={{ minHeight: '450px', transformStyle: 'preserve-3d' }}
            >
              {/* Server background image */}
              <div className="absolute inset-0">
                <img
                  src="/server.png"
                  alt="Server infrastructure"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge */}
              <div className="absolute top-8 left-8 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <span className="text-white text-sm font-medium">Headquarter</span>
              </div>

              {/* Backdrop for text - bottom portion with blur */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md" style={{ height: '40%' }} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <p className="text-xs text-white/80 mb-2 uppercase tracking-wider font-medium">FUTURE-PROOF</p>
                <h3 className="text-white font-bold text-2xl mb-3">Built for the Future</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Theme-able architecture means you can rebrand instantly without rebuilding.
                </p>
              </div>
            </motion.div>

            {/* Card 4 - Bottom Middle */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: 0.4,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{
                scale: 1.05,
                y: -12,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-black rounded-[40px] relative overflow-hidden cursor-pointer"
              style={{ minHeight: '450px' }}
            >
              {/* World background image */}
              <div className="absolute inset-0">
                <img
                  src="/world.png"
                  alt="Global reach"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Backdrop for text - bottom portion with blur */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md" style={{ height: '40%' }} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <p className="text-xs text-white/80 mb-2 uppercase tracking-wider font-medium">PERFORMANCE</p>
                <h3 className="text-white font-bold text-2xl mb-3">Get the Furthest Reach</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Perfect mobile optimization and accessibility are baked into every component, not added on later.
                </p>
              </div>
            </motion.div>

            {/* Card 5 - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: 0.5,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{
                scale: 1.05,
                y: -12,
                rotateY: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-black rounded-[40px] relative overflow-hidden cursor-pointer"
              style={{ minHeight: '450px', transformStyle: 'preserve-3d' }}
            >
              {/* Card background image */}
              <div className="absolute inset-0">
                <img
                  src="/card.png"
                  alt="Sell globally"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Backdrop for text - bottom portion with blur */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md" style={{ height: '40%' }} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <p className="text-xs text-white/80 mb-2 uppercase tracking-wider font-medium">SCALE</p>
                <h3 className="text-white font-bold text-2xl mb-3">Sell Globally</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  From local bakery to global brand, our scalable infrastructure grows with you without crashing.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section id="services" className="relative z-10 pt-12 md:pt-16 pb-24 md:pb-32" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 md:mb-40 text-center"
          >
            <h2 className="font-archivo text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase leading-tight mb-6" style={{ color: 'rgb(66, 66, 66)' }}>
              THE <span style={{ color: 'rgb(245, 87, 51)' }}>RELIEF</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'rgb(84, 84, 84)' }}>
              The Zero-Stress Path to Growth
            </p>
          </motion.div>

          <div className="space-y-0">
            {[
              {
                number: '01',
                title: 'RESEARCH',
                subtitle: 'You Talk, We Listen',
                description: 'No blank page anxiety. You just answer simple questions about your business. We do the heavy lifting to understand your market.',
                features: [
                  'Deep market analysis',
                  'Competitor research',
                  'User persona development',
                  'Strategy roadmap creation'
                ]
              },
              {
                number: '02',
                title: 'ARCHITECTURE',
                subtitle: 'We Blueprint Your Success',
                description: 'Stop guessing what works. We design a strategy that turns visitors into customers before a single pixel is placed.',
                features: [
                  'Information architecture',
                  'User flow mapping',
                  'Technical specifications',
                  'Database schema design'
                ]
              },
              {
                number: '03',
                title: 'DEVELOPMENT',
                subtitle: 'We Assemble Perfection',
                description: 'No "spaghetti code" or broken layouts. We assemble your site from human-vetted components that are guaranteed to work.',
                features: [
                  'Clean, scalable code',
                  'Mobile-first responsive design',
                  'Performance optimization',
                  'Cross-browser compatibility'
                ]
              },
              {
                number: '04',
                title: 'ASSURANCE',
                subtitle: 'We Polish Every Detail',
                description: 'Sleep easy knowing a human expert checked everything. No typos, no glitches, no "AI hallucinations." Just quality.',
                features: [
                  'Comprehensive testing',
                  'Quality assurance review',
                  'Security audit',
                  'Accessibility compliance'
                ]
              },
              {
                number: '05',
                title: 'RELEASE',
                subtitle: 'You Launch & Relax',
                description: 'The moment you go live, your work is done. We handle the hosting, security, and updates forever. You just focus on growing.',
                features: [
                  'Seamless deployment',
                  'SSL certificate setup',
                  'Performance monitoring',
                  'Ongoing maintenance & support'
                ]
              },
            ].map((service, index) => {
              const [isExpanded, setIsExpanded] = React.useState(false);

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div
                    className="relative cursor-pointer overflow-hidden"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {/* Hover background effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(90deg, rgba(245, 87, 51, 0.02) 0%, rgba(245, 87, 51, 0.05) 100%)' }}
                    />

                    <div className="relative py-10 md:py-14 lg:py-16 px-4 md:px-8 border-t transition-all duration-300" style={{ borderColor: isExpanded ? 'rgb(245, 87, 51)' : 'rgb(220, 220, 220)' }}>
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-6 md:gap-10 lg:gap-14 flex-1">
                          {/* Number */}
                          <motion.div
                            className="flex items-center justify-center min-w-[60px] md:min-w-[80px] h-[60px] md:h-[80px] rounded-2xl text-2xl md:text-3xl font-bold transition-all duration-300"
                            style={{
                              backgroundColor: isExpanded ? 'rgb(245, 87, 51)' : 'rgba(245, 87, 51, 0.1)',
                              color: isExpanded ? 'white' : 'rgb(245, 87, 51)'
                            }}
                            whileHover={{ scale: 1.05, rotate: 5 }}
                          >
                            {service.number}
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col lg:flex-row lg:items-baseline lg:gap-8 mb-4">
                              <h3 className="font-archivo text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight" style={{ color: 'rgb(66, 66, 66)' }}>
                                <motion.span
                                  style={{ color: 'rgb(245, 87, 51)' }}
                                  whileHover={{ display: 'inline-block', scale: 1.2 }}
                                  transition={{ type: 'spring', stiffness: 300 }}
                                >
                                  {service.title.charAt(0)}
                                </motion.span>
                                {service.title.slice(1)}
                              </h3>
                              <span className="text-base md:text-lg lg:text-xl xl:text-2xl mt-2 lg:mt-0 font-medium" style={{ color: 'rgb(117, 117, 117)' }}>
                                {service.subtitle}
                              </span>
                            </div>
                            <p className="text-sm md:text-base lg:text-lg leading-relaxed max-w-4xl" style={{ color: 'rgb(100, 100, 100)' }}>
                              {service.description}
                            </p>
                          </div>
                        </div>

                        {/* Expand button */}
                        <motion.button
                          className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-2"
                          style={{
                            borderColor: 'rgb(245, 87, 51)',
                            backgroundColor: isExpanded ? 'rgb(245, 87, 51)' : 'transparent'
                          }}
                          animate={{ rotate: isExpanded ? 45 : 0 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isExpanded ? 'white' : 'rgb(245, 87, 51)'}
                            strokeWidth="3"
                            strokeLinecap="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence mode="wait">
                      {isExpanded && (
                        <motion.div
                          key={`expanded-${service.number}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="overflow-hidden"
                          style={{ backgroundColor: 'rgba(245, 87, 51, 0.02)' }}
                        >
                          <div className="px-4 md:px-8 pb-12 pt-6">
                            <div className="ml-[76px] md:ml-[104px] lg:ml-[136px] max-w-5xl">
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                                className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2"
                                style={{ borderColor: 'rgba(245, 87, 51, 0.15)' }}
                              >
                                <h4 className="font-archivo text-xl md:text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'rgb(66, 66, 66)' }}>
                                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(245, 87, 51)' }} />
                                  What's Included
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                  {service.features.map((feature, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.15 + idx * 0.05, duration: 0.4 }}
                                      className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:bg-gray-50"
                                    >
                                      <svg
                                        className="flex-shrink-0 mt-0.5"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <circle cx="12" cy="12" r="10" fill="rgba(245, 87, 51, 0.1)" />
                                        <path
                                          d="M8 12L11 15L16 9"
                                          stroke="rgb(245, 87, 51)"
                                          strokeWidth="2.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <span className="text-sm md:text-base font-medium" style={{ color: 'rgb(66, 66, 66)' }}>
                                        {feature}
                                      </span>
                                    </motion.div>
                                  ))}
                                </div>

                                {/* Progress indicator */}
                                <motion.div
                                  initial={{ opacity: 0, scaleX: 0 }}
                                  animate={{ opacity: 1, scaleX: 1 }}
                                  transition={{ delay: 0.4, duration: 0.6 }}
                                  className="mt-8 pt-6 border-t"
                                  style={{ borderColor: 'rgb(230, 230, 230)' }}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs md:text-sm font-semibold" style={{ color: 'rgb(100, 100, 100)' }}>
                                      Step {service.number} of 05
                                    </span>
                                    <span className="text-xs md:text-sm font-bold" style={{ color: 'rgb(245, 87, 51)' }}>
                                      {parseInt(service.number) * 20}% Complete
                                    </span>
                                  </div>
                                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: '0%' }}
                                      animate={{ width: `${parseInt(service.number) * 20}%` }}
                                      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                                      className="h-full rounded-full"
                                      style={{ backgroundColor: 'rgb(245, 87, 51)' }}
                                    />
                                  </div>
                                </motion.div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
            {/* Bottom border */}
            <div className="border-t transition-colors duration-300" style={{ borderColor: 'rgb(220, 220, 220)' }}></div>
          </div>
        </div>
      </section >

      {/* About Section */}
      < section id="about" className="relative z-10 py-24 md:py-32 overflow-hidden" >
        {/* Teardrop Background */}
        < div className="absolute inset-0 z-0" >
          <div
            className="absolute bg-white/80 backdrop-blur-sm"
            style={{
              top: '10%',
              left: '-10%',
              width: '90%',
              height: '80%',
              borderRadius: '0 200px 200px 0',
              zIndex: 0,
            }}
          />
        </div >

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="-ml-12 md:-ml-24 lg:-ml-40 xl:-ml-56"
            >
              <h2 className="font-archivo text-5xl md:text-7xl lg:text-8xl font-bold mb-6 whitespace-nowrap" style={{ color: 'rgb(245, 87, 51)' }}>
                AVEN STUDIOS
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
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative -ml-8 md:-ml-12 lg:-ml-16"
            >
              <div className="relative aspect-square rounded-[40px] overflow-hidden group">
                <motion.img
                  src="/about-visual.png"
                  alt="Aven Studio Abstract"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section >

      {/* Statistics Section */}
      < section id="stats" className="relative z-10 py-24 md:py-32" style={{ backgroundColor: 'rgb(245, 87, 51)' }}>
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
              >
                <CountUp value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* Partners/Logos Section */}
      < section id="partners" className="relative z-10 py-24 md:py-32 overflow-hidden" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 px-6 md:px-10"
          >
            <h2 className="font-archivo text-3xl md:text-4xl font-bold" style={{ color: 'rgb(66, 66, 66)' }}>
              We work with the world's top companies
            </h2>
          </motion.div>

          {/* Marquee Container - First Row */}
          <div className="relative mb-12">
            <div className="flex overflow-hidden">
              <div className="animate-marquee-slow flex items-center gap-8 py-4">
                {[
                  // AI Companies
                  { name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
                  { name: 'Anthropic', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg' },
                  { name: 'Google DeepMind', logo: 'https://logo.clearbit.com/deepmind.com' },
                  { name: 'Hugging Face', logo: 'https://huggingface.co/front/assets/huggingface_logo.svg' },
                  { name: 'Cohere', logo: 'https://logo.clearbit.com/cohere.ai' },
                  { name: 'Stability AI', logo: 'https://avatars.githubusercontent.com/u/100950301?s=200&v=4' },
                  { name: 'Midjourney', logo: 'https://upload.wikimedia.org/wikipedia/en/0/06/Midjourney_logo.svg' },
                  { name: 'Perplexity', logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.png' },
                  { name: 'Google Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
                ].concat([
                  // Duplicate for infinite scroll
                  { name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
                  { name: 'Anthropic', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg' },
                  { name: 'Google DeepMind', logo: 'https://logo.clearbit.com/deepmind.com' },
                  { name: 'Hugging Face', logo: 'https://huggingface.co/front/assets/huggingface_logo.svg' },
                  { name: 'Cohere', logo: 'https://logo.clearbit.com/cohere.ai' },
                  { name: 'Stability AI', logo: 'https://avatars.githubusercontent.com/u/100950301?s=200&v=4' },
                  { name: 'Midjourney', logo: 'https://upload.wikimedia.org/wikipedia/en/0/06/Midjourney_logo.svg' },
                  { name: 'Perplexity', logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.png' },
                  { name: 'Google Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
                ]).map((company, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: '180px', height: '100px' }}
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      style={{ maxWidth: '160px', maxHeight: '80px' }}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Marquee Container - Second Row (Reverse) */}
          <div className="relative">
            <div className="flex overflow-hidden">
              <div className="animate-marquee-slow-reverse flex items-center gap-8 py-4">
                {[
                  // Tech Companies
                  { name: 'Microsoft Azure', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
                  { name: 'Amazon AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
                  { name: 'GitHub', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' },
                  { name: 'Vercel', logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png' },
                  { name: 'MongoDB', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg' },
                  { name: 'Cloudflare', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg' },
                  { name: 'Docker', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg' },
                  { name: 'Kubernetes', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg' },
                  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
                ].concat([
                  // Duplicate for infinite scroll
                  { name: 'Microsoft Azure', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
                  { name: 'Amazon AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
                  { name: 'GitHub', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' },
                  { name: 'Vercel', logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png' },
                  { name: 'MongoDB', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg' },
                  { name: 'Cloudflare', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg' },
                  { name: 'Docker', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg' },
                  { name: 'Kubernetes', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg' },
                  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
                ]).map((company, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: '180px', height: '100px' }}
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      style={{ maxWidth: '160px', maxHeight: '80px' }}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Project Section */}
      < section id="project" className="relative z-10 py-24 md:py-32 overflow-hidden" >
        {/* Teardrop Background */}
        < div className="absolute inset-0 z-0" >
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
        </div >

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
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section >

      {/* Approach Section */}
      < section id="approach" className="relative z-10 py-24 md:py-32" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
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
      </section >

      {/* Team Section */}
      < section id="team" className="relative z-10 py-24 md:py-32" >
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
      </section >

      {/* Pricing Section */}
      < section id="pricing" className="relative z-10 py-24 md:py-32" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
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
                        <circle cx="10" cy="10" r="10" fill="rgb(245, 87, 51)" fillOpacity="0.1" />
                        <path d="M6 10L9 13L14 7" stroke="rgb(245, 87, 51)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section >

      {/* Testimonials Section */}
      < section id="testimonials" className="relative z-10 py-24 md:py-32 overflow-hidden" >
        {/* Teardrop Background */}
        < div className="absolute inset-0 z-0" >
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
        </div >

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
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
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
      </section >

      {/* FAQ Preview Section */}
      < section id="faq" className="relative z-10 py-24 md:py-32" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
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
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
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
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section >

      {/* Blog Section */}
      < section id="blog" className="relative z-10 py-24 md:py-32 overflow-hidden" >
        {/* Teardrop Background */}
        < div className="absolute inset-0 z-0" >
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
        </div >

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
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section >

      {/* Contact Section */}
      < section id="contact" className="relative z-10 py-24 md:py-32 overflow-hidden" >
        {/* Teardrop Background */}
        < div className="absolute inset-0 z-0" >
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
        </div >

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
      </section >
    </div >
  );
};

export default HomePage;
