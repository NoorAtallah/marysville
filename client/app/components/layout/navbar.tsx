'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Matching colors from the VPS landing page
  const colors = {
    purple: '#7B2D8E',
    violet: '#8B5CF6',
    lightBlue: '#5BC0EB',
    navy: '#1E3A5F',
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/',  },
    { name: 'Services', href: '/services',  },
    { name: 'Pricing Plans', href: '/pricing',  },
    { name: 'About Us', href: '/about',  },
    { name: 'FAQ', href: '/faq',  },
  ];

  const partner = {
    name: 'Flow Spanish',
    logo: '/2.jpg', // Update with actual logo path
    url: 'https://flowspanish.com', // Update with actual URL
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              {/* Replace src with your image path */}
              <Image
                src="/1.png"
                alt="Marysville Logo"
                width={36}
                height={36}
                className="rounded-lg md:w-10 md:h-10"
              />
              <span 
                className="text-lg md:text-xl font-bold"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.purple}, ${colors.lightBlue})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                MARYSVILLE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2 transition-colors duration-200 text-sm font-medium hover:opacity-80"
                  style={{ color: colors.navy }}
                >
                 
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/pricing"
                className="px-5 py-2 md:px-6 md:py-2.5 text-white rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.purple}, ${colors.violet})`,
                  boxShadow: `0 4px 20px ${colors.purple}40`
                }}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 rounded-full origin-center transition-all"
                  style={{ backgroundColor: colors.navy }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 rounded-full transition-all"
                  style={{ backgroundColor: colors.navy }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 rounded-full origin-center transition-all"
                  style={{ backgroundColor: colors.navy }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 transition-colors duration-200 text-base font-medium py-2"
                      style={{ color: colors.navy }}
                    >
                      
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Partner - Flow Spanish */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-4 border-t border-gray-100"
                >
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Our Partner</p>
                  <a 
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={40}
                      height={40}
                      className="object-contain rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-sm" style={{ color: colors.navy }}>{partner.name}</p>
                      <p className="text-xs text-gray-400">Learn Arabic with experts</p>
                    </div>
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05 }}
                  className="pt-4"
                >
                  <Link
                    href="#get-started"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center px-6 py-3 text-white rounded-full font-semibold text-sm transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.purple}, ${colors.violet})`,
                    }}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Partner Bar - Flow Spanish - Shows below navbar when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-gray-50/90 backdrop-blur-sm border-b border-gray-100 py-2 hidden lg:block"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="flex items-center justify-center gap-6">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Our Partner</span>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-1.5 rounded-full hover:bg-white transition-colors"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={28}
                    height={28}
                    className="object-contain rounded-md"
                  />
                  <span 
                    className="text-sm font-medium group-hover:underline"
                    style={{ color: colors.navy }}
                  >
                    {partner.name}
                  </span>
                  <svg 
                    className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    style={{ color: colors.purple }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}