import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/radar', label: 'R.A.D.A.R.' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blogs' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Logo - Top Left */}
      <div className="fixed top-0 left-0 z-50" style={{ minHeight: '80px' }}>
        {/* Teardrop Background for Logo */}
        <div 
          className="absolute bg-white/80 backdrop-blur-md"
          style={{
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            borderRadius: '0 40px 40px 0',
            minWidth: '150px',
            border: '1px solid rgba(245, 87, 51, 0.5)'
          }}
        />
        <Link to="/" className="relative z-10 font-geist text-2xl font-bold tracking-tight" style={{ padding: '20px 30px 20px 20px', display: 'block' }}>
          Aven Studio
        </Link>
      </div>

      {/* Desktop Side Menu - Right */}
      <div className="hidden lg:block fixed right-0 z-50" style={{ top: '50%', transform: 'translateY(-50%)', width: 'auto' }}>
        {/* Teardrop Background */}
        <div 
          className="absolute bg-white/80 backdrop-blur-md"
          style={{
            top: 'calc(-10vh)',
            bottom: 'calc(-10vh)',
            left: '0',
            right: '0',
            borderRadius: '40px 0 0 40px',
            width: '100px',
            border: '1px solid rgba(245, 87, 51, 0.5)'
          }}
        />
        <nav className="relative flex flex-col items-center space-y-4 py-4 pr-3 pl-3" style={{ width: '100px' }}>
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-base font-medium px-3 py-2 rounded-full transition-colors relative z-10 whitespace-nowrap ${
                  isActive
                    ? 'bg-[rgb(245,87,51)] text-white'
                    : 'text-gray-700 hover:bg-white/20 hover:text-gray-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="menu"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 right-0 bottom-0 w-64 bg-white/90 backdrop-blur-md z-40 pt-20 px-6 shadow-xl"
          >
            <nav className="flex flex-col space-y-6">
              {navLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-geist text-xl font-medium ${
                      isActive ? 'text-[rgb(245,87,51)]' : 'text-gray-700'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

