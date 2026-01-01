'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Check, Server, Shield, Zap, Globe, Clock, Headphones, MapPin, HardDrive, Cpu, Database, Menu, X } from 'lucide-react';

export default function MarysvilleVPS() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [galleryXValue, setGalleryXValue] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const galleryX = useMotionValue(0);
  const smoothGalleryX = useSpring(galleryX, { damping: 30, stiffness: 200 });
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  const colors = {
    purple: '#7B2D8E',
    violet: '#8B5CF6',
    lightBlue: '#5BC0EB',
    navy: '#1E3A5F',
  };

  const totalSections = 8;

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigate = (dir: 'up' | 'down') => {
    if (isAnimating) return;
    const next = dir === 'down' ? currentSection + 1 : currentSection - 1;
    if (next < 0 || next >= totalSections) return;
    setIsAnimating(true);
    setCurrentSection(next);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // For sections with scrollable content (services and pricing), allow normal scroll
      if (currentSection === 4 || currentSection === 5) {
        const scrollableEl = document.querySelector('[data-scrollable="true"]');
        if (scrollableEl) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableEl as HTMLElement;
          const isAtTop = scrollTop <= 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
          
          // Only navigate sections when at scroll boundaries
          if (isAtTop && e.deltaY < -30) {
            e.preventDefault();
            navigate('up');
            return;
          }
          if (isAtBottom && e.deltaY > 30) {
            e.preventDefault();
            navigate('down');
            return;
          }
          // Allow normal scrolling within the section
          return;
        }
      }
      
      e.preventDefault();
      
      // If on gallery section, scroll horizontally
      if (currentSection === 2) {
        const maxScroll = isMobile ? -1200 : -2000;
        const newX = Math.max(maxScroll, Math.min(0, galleryX.get() - e.deltaY * 2));
        galleryX.set(newX);
        setGalleryXValue(newX);
        
        // If scrolled to the end, go to next section
        if (newX <= maxScroll + 100 && e.deltaY > 30) {
          navigate('down');
          galleryX.set(0);
          setGalleryXValue(0);
        }
        // If scrolled back to start, go to previous section
        if (newX >= -50 && e.deltaY < -30) {
          navigate('up');
          galleryX.set(0);
          setGalleryXValue(0);
        }
        return;
      }
      
      if (Math.abs(e.deltaY) > 30) navigate(e.deltaY > 0 ? 'down' : 'up');
    };
    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowDown', ' '].includes(e.key)) { e.preventDefault(); navigate('down'); }
      if (e.key === 'ArrowUp') { e.preventDefault(); navigate('up'); }
    };
    const handleTouchStart = (e: TouchEvent) => { 
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      
      // For sections with scrollable content, check scroll position before navigating
      if (currentSection === 4 || currentSection === 5) {
        const scrollableEl = document.querySelector('[data-scrollable="true"]');
        if (scrollableEl) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableEl as HTMLElement;
          const isAtTop = scrollTop <= 5;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
          
          // Only navigate when at boundaries with significant swipe
          if (isAtTop && deltaY < -80) {
            navigate('up');
            return;
          }
          if (isAtBottom && deltaY > 80) {
            navigate('down');
            return;
          }
          // Otherwise let the section scroll naturally
          return;
        }
      }
      
      // For gallery section, handle horizontal swipe
      if (currentSection === 2) {
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          const maxScroll = isMobile ? -1200 : -2000;
          const newX = Math.max(maxScroll, Math.min(0, galleryX.get() - deltaX * 3));
          galleryX.set(newX);
          setGalleryXValue(newX);
          
          if (newX <= maxScroll + 100 && deltaX > 50) {
            navigate('down');
            galleryX.set(0);
            setGalleryXValue(0);
          }
          if (newX >= -50 && deltaX < -50) {
            navigate('up');
            galleryX.set(0);
            setGalleryXValue(0);
          }
          return;
        }
      }
      
      if (Math.abs(deltaY) > 50) navigate(deltaY > 0 ? 'down' : 'up');
    };
    const handleMouse = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set((e.clientX - rect.width / 2) / rect.width);
        mouseY.set((e.clientY - rect.height / 2) / rect.height);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKey);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [currentSection, isAnimating, isMobile]);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const x1 = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const y1 = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const x2 = useTransform(smoothX, [-0.5, 0.5], [20, -20]);

  const sectionNames = ['Home', 'Stats', 'Gallery', 'Global', 'Services', 'Pricing', 'Learn', 'Contact'];

  return (
    <div ref={containerRef} className="relative h-screen w-screen overflow-hidden bg-[#fafafa]">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full blur-[80px] md:blur-[120px] opacity-[0.12]"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ background: `linear-gradient(135deg, ${colors.lightBlue}, ${colors.purple})`, top: '-20%', right: '-10%' }}
        />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-200/50">
        <motion.div 
          className="h-full"
          animate={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
          transition={{ duration: 0.5 }}
          style={{ background: `linear-gradient(90deg, ${colors.purple}, ${colors.lightBlue})` }}
        />
      </div>

      {/* Section Navigation Dots */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sectionNames.map((name, i) => (
          <motion.button
            key={name}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSection(i);
                setTimeout(() => setIsAnimating(false), 1000);
              }
            }}
            className="group relative flex items-center justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            {/* Label - shows on hover */}
            <span 
              className="absolute right-6 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{ 
                backgroundColor: currentSection === i ? colors.purple : 'white',
                color: currentSection === i ? 'white' : colors.navy,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {name}
            </span>
            {/* Dot */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSection === i 
                    ? 'scale-100' 
                    : 'scale-75 bg-gray-300 hover:bg-gray-400'
                }`}
                style={{ 
                  backgroundColor: currentSection === i ? colors.purple : undefined,
                  boxShadow: currentSection === i ? `0 0 10px ${colors.purple}50` : undefined
                }}
              />
              {currentSection === i && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: colors.purple }}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Scroll Down Indicator - Shows on all sections except the last */}
      <AnimatePresence>
        {currentSection < totalSections - 1 && (
          <motion.div
            key={`scroll-indicator-${currentSection}`}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate('down')}
          >
            <span 
              className={`text-xs tracking-wider uppercase transition-colors duration-300 ${
                currentSection === 7 ? 'text-white/40' : 'text-gray-400'
              }`}
            >
              {currentSection === 2 ? 'Scroll to continue' : 'Scroll to explore'}
            </span>
            <motion.div
              className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5 transition-colors duration-300 ${
                currentSection === 7 ? 'border-white/30' : 'border-gray-300'
              }`}
              animate={{ 
                borderColor: currentSection === 7 
                  ? ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)']
                  : [colors.purple + '40', colors.lightBlue + '40', colors.purple + '40'] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: currentSection === 7 ? 'rgba(255,255,255,0.6)' : colors.purple }}
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== SECTION 0: HERO ==================== */}
      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <motion.section 
            key="hero"
            className="absolute inset-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full grid lg:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-6 md:px-12 lg:px-24">
              {/* Left */}
              <div className="flex flex-col justify-center pt-8 md:pt-0">
                <motion.div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border border-gray-200 shadow-sm w-fit text-xs md:text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-gray-600">System Online • 99.9% Uptime</span>
                </motion.div>

                <motion.h1 
                  className="mt-4 md:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
                  style={{ color: colors.navy }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Next-Gen
                  <br />
                  <span className="relative inline-block">
                    Infrastructure
                    <motion.svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3" viewBox="0 0 300 12">
                      <motion.path
                        d="M0 6 Q75 0 150 6 T300 6"
                        fill="none"
                        stroke={colors.lightBlue}
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                    </motion.svg>
                  </span>
                </motion.h1>

                <motion.p 
                  className="mt-4 md:mt-6 text-base md:text-lg text-gray-500 max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Enterprise-grade VPS hosting built for developers, businesses, and innovators.
                </motion.p>

                <motion.div 
                  className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button 
                    className="group flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full text-white font-medium text-sm md:text-base"
                    style={{ backgroundColor: colors.purple }}
                    whileHover={{ scale: 1.02, boxShadow: `0 20px 40px ${colors.purple}30` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started — $10/mo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                  <motion.button 
                    className="px-6 py-3 md:px-8 md:py-4 rounded-full font-medium border-2 border-gray-200 text-gray-600 hover:border-gray-300 text-sm md:text-base"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Plans
                  </motion.button>
                </motion.div>

                <motion.div 
                  className="mt-8 md:mt-12 flex gap-6 md:gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {[{ value: '99.9%', label: 'Uptime' }, { value: '<50ms', label: 'Latency' }, { value: '24/7', label: 'Support' }].map((stat, i) => (
                    <div key={stat.label}>
                      <motion.p 
                        className="text-xl md:text-2xl font-bold" style={{ color: colors.navy }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                      >{stat.value}</motion.p>
                      <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right - 3D Card - Hidden on mobile/tablet, visible on lg+ */}
              <div className="relative hidden lg:flex items-center justify-center" style={{ perspective: '1000px' }}>
                <motion.div className="relative w-full max-w-md" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
                  <motion.div 
                    className="relative bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ x: x1, y: y1 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs md:text-sm font-medium text-gray-400">SERVER STATUS</span>
                      <span className="flex items-center gap-2 text-xs md:text-sm text-green-500">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        All Systems Online
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { icon: Cpu, label: 'CPU Usage', value: '23%', pct: 23, color: colors.purple },
                        { icon: HardDrive, label: 'Storage', value: '45 GB / 100 GB', pct: 45, color: colors.lightBlue },
                        { icon: Database, label: 'Memory', value: '2.1 GB / 8 GB', pct: 26, color: colors.violet },
                      ].map((item, i) => (
                        <motion.div 
                          key={item.label}
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                            <item.icon className="w-5 h-5" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">{item.label}</span>
                              <span className="font-medium" style={{ color: colors.navy }}>{item.value}</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full rounded-full"
                                style={{ backgroundColor: item.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.pct}%` }}
                                transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div 
                      className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <div>
                        <p className="text-sm text-gray-400">Monthly Cost</p>
                        <p className="text-2xl font-bold" style={{ color: colors.navy }}>$20<span className="text-sm font-normal text-gray-400">/mo</span></p>
                      </div>
                      <span className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: colors.purple }}>VPS Pro</span>
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white rounded-2xl p-3 md:p-4 shadow-xl border border-gray-100"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    style={{ x: x2 }}
                  >
                    <p className="text-2xl md:text-3xl font-bold" style={{ color: colors.lightBlue }}>10<span className="text-base md:text-lg">Gbps</span></p>
                    <p className="text-xs text-gray-400">Network</p>
                  </motion.div>

                  <motion.div 
                    className="absolute -bottom-3 -left-4 md:-bottom-4 md:-left-6 bg-white rounded-2xl p-3 md:p-4 shadow-xl border border-gray-100"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, type: "spring" }}
                  >
                    <p className="text-2xl md:text-3xl font-bold" style={{ color: colors.purple }}>150+</p>
                    <p className="text-xs text-gray-400">Locations</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ==================== SECTION 1: STATS ==================== */}
      <AnimatePresence mode="wait">
        {currentSection === 1 && (
          <motion.section 
            key="stats"
            className="absolute inset-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full">
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <motion.span 
                  className="text-[20vw] md:text-[18vw] font-black text-gray-100 whitespace-nowrap select-none"
                  initial={{ x: '10%' }}
                  animate={{ x: '-10%' }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                >
                  PERFORMANCE • SPEED • POWER
                </motion.span>
              </div>

              <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-24">
                <motion.p className="text-xs md:text-sm font-medium tracking-wider uppercase" style={{ color: colors.purple }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  Raw Power
                </motion.p>
                <motion.h2 className="mt-2 md:mt-4 text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: colors.navy }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  Numbers that matter
                </motion.h2>

                <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                  {[
                    { value: '10', unit: 'GB/s', label: 'Network Speed' },
                    { value: '32', unit: 'vCPU', label: 'Max Cores' },
                    { value: '4', unit: 'TB', label: 'NVMe Storage' },
                    { value: '<50', unit: 'ms', label: 'Latency' },
                  ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: colors.navy }}>{stat.value}</span>
                        <span className="text-lg md:text-xl font-medium" style={{ color: colors.purple }}>{stat.unit}</span>
                      </div>
                      <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-500">{stat.label}</p>
                      <div className="mt-2 md:mt-3 h-1 w-8 md:w-12 rounded-full" style={{ backgroundColor: colors.lightBlue }} />
                    </motion.div>
                  ))}
                </div>

                <motion.div className="mt-10 md:mt-16 flex gap-2 md:gap-4 h-32 md:h-48 lg:h-64" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  {['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80'].map((src, i) => (
                    <motion.div key={i} className="flex-1 rounded-xl md:rounded-2xl overflow-hidden" whileHover={{ scale: 1.02 }}>
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ==================== SECTION 2: GALLERY - SCROLL CONTROLLED ==================== */}
      <AnimatePresence mode="wait">
        {currentSection === 2 && (
          <motion.section 
            key="gallery"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-4 left-4 z-10 md:top-8 md:left-16">
              <motion.p className="text-xs md:text-sm font-medium tracking-wider uppercase" style={{ color: colors.lightBlue }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Infrastructure</motion.p>
              <motion.h2 className="mt-1 md:mt-2 text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: colors.navy }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Our Data Centers</motion.h2>
            </div>

            {/* Horizontal Scrolling Gallery - Controlled by galleryX */}
            <div className="h-full flex items-center overflow-hidden">
              <motion.div 
                className="flex gap-3 md:gap-6 pl-4 md:pl-16"
                style={{ x: smoothGalleryX }}
              >
                {/* Card 1 - Image */}
                <motion.div 
                  className="flex-shrink-0 w-[250px] md:w-[350px] lg:w-[400px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" alt="" className="w-full h-full object-cover" />
                </motion.div>

                {/* Card 2 - Stat */}
                <motion.div 
                  className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl flex flex-col items-center justify-center"
                  style={{ backgroundColor: colors.purple }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-5xl md:text-6xl lg:text-7xl font-black text-white">99.9%</p>
                  <p className="text-base md:text-lg text-white/60 mt-2">Uptime SLA</p>
                </motion.div>

                {/* Card 3 - Image with overlay */}
                <motion.div 
                  className="flex-shrink-0 w-[250px] md:w-[350px] lg:w-[400px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 md:p-8">
                    <div>
                      <p className="text-4xl md:text-5xl font-bold text-white">150+</p>
                      <p className="text-base md:text-lg text-white/60">Global Locations</p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 4 - Image */}
                <motion.div 
                  className="flex-shrink-0 w-[220px] md:w-[300px] lg:w-[350px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80" alt="" className="w-full h-full object-cover" />
                </motion.div>

                {/* Card 5 - Stat */}
                <motion.div 
                  className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl flex flex-col items-center justify-center"
                  style={{ backgroundColor: colors.navy }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-5xl md:text-6xl lg:text-7xl font-black text-white">24/7</p>
                  <p className="text-base md:text-lg text-white/40 mt-2">Expert Support</p>
                </motion.div>

                {/* Card 6 - Image with overlay */}
                <motion.div 
                  className="flex-shrink-0 w-[250px] md:w-[350px] lg:w-[400px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80" alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 md:p-8">
                    <div>
                      <p className="text-4xl md:text-5xl font-bold text-white">10Gbps</p>
                      <p className="text-base md:text-lg text-white/60">Network Speed</p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 7 - Image */}
                <motion.div 
                  className="flex-shrink-0 w-[220px] md:w-[300px] lg:w-[350px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" alt="" className="w-full h-full object-cover" />
                </motion.div>

                {/* Card 8 - Stat */}
                <motion.div 
                  className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl flex flex-col items-center justify-center"
                  style={{ backgroundColor: colors.lightBlue }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-4xl md:text-5xl lg:text-6xl font-black text-white">&lt;50ms</p>
                  <p className="text-base md:text-lg text-white/60 mt-2">Latency</p>
                </motion.div>

                {/* Card 9 - Image */}
                <motion.div 
                  className="flex-shrink-0 w-[250px] md:w-[350px] lg:w-[400px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" alt="" className="w-full h-full object-cover" />
                </motion.div>
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-16 md:bottom-8 left-4 right-4 md:left-8 md:right-8">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${Math.min(100, Math.abs(galleryXValue / (isMobile ? 12 : 20)))}%`,
                    backgroundColor: colors.purple 
                  }}
                />
              </div>
              <p className="text-center text-xs md:text-sm text-gray-400 mt-2 md:mt-3">
                {isMobile ? 'Swipe to explore' : 'Scroll to explore'}
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ==================== SECTION 3: GLOBAL ==================== */}
      <AnimatePresence mode="wait">
        {currentSection === 3 && (
          <motion.section key="global" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80" alt="Earth" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 md:to-white/50" />
            </div>

            <div className="relative h-full flex items-center px-4 sm:px-6 md:px-12 lg:px-24">
              <div className="max-w-xl">
                <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-xs md:text-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="text-base md:text-lg">🇪🇸</span><span className="font-medium" style={{ color: colors.navy }}>Headquartered in Barcelona</span>
                </motion.div>

                <motion.h2 className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: colors.navy }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  Global reach.<br /><span style={{ color: colors.purple }}>Local speed.</span>
                </motion.h2>

                <motion.p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  Deploy closer to your users with 150+ strategically positioned data centers across 5 continents.
                </motion.p>

                <motion.div className="mt-4 md:mt-8 flex flex-wrap gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  {['Madrid 🇪🇸', 'Frankfurt', 'London', 'New York', 'Singapore', 'Tokyo', 'Sydney'].map((city, i) => (
                    <motion.span 
                      key={city}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium ${i === 0 ? 'text-white' : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600'}`}
                      style={{ backgroundColor: i === 0 ? colors.purple : undefined }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >{city}</motion.span>
                  ))}
                </motion.div>

                <motion.div className="mt-8 md:mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <span className="text-6xl md:text-8xl lg:text-9xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.lightBlue}50, ${colors.purple}30)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>150+</span>
                  <p className="text-sm md:text-base text-gray-500 -mt-1 md:-mt-2">Global locations & growing</p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ==================== SECTION 4: SERVICES ==================== */}
      <AnimatePresence mode="wait">
        {currentSection === 4 && (
          <motion.section key="services" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <div className="h-full w-full overflow-y-auto overflow-x-hidden" data-scrollable="true">
              <div className="min-h-full w-full px-4 sm:px-6 md:px-12 lg:px-24 py-20 md:py-16 lg:py-8 flex flex-col justify-center">
                <div className="text-center mb-6 md:mb-8 lg:mb-12">
                  <motion.p className="text-xs md:text-sm font-medium tracking-wider uppercase" style={{ color: colors.purple }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Our Services</motion.p>
                  <motion.h2 className="mt-2 md:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: colors.navy }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Everything You Need</motion.h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 max-w-6xl mx-auto w-full pb-16 md:pb-8">
                  {[
                    { icon: Server, title: 'VPS Hosting', desc: 'Lightning-fast virtual servers with full root access.', features: ['Full Root Access', 'NVMe SSD', '10Gbps'], color: colors.purple },
                    { icon: Shield, title: 'Server Management', desc: 'Our experts handle the technical details.', features: ['24/7 Support', 'Security Updates', '15min Response'], color: colors.lightBlue },
                    { icon: Database, title: 'Daily Backups', desc: 'Automated daily backups with one-click restore.', features: ['Encrypted', 'One-Click Restore', '30-Day Retention'], color: colors.violet },
                    { icon: Globe, title: 'Domain Registration', desc: 'Find your perfect domain with free DNS.', features: ['All Extensions', 'Free DNS', 'Privacy Protection'], color: colors.navy },
                  ].map((service, i) => (
                    <motion.div 
                      key={service.title}
                      className="group bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4" style={{ backgroundColor: `${service.color}15` }}>
                        <service.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: service.color }} />
                      </div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2" style={{ color: colors.navy }}>{service.title}</h3>
                      <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">{service.desc}</p>
                      <div className="space-y-1.5 md:space-y-2">
                        {service.features.map(f => (
                          <div key={f} className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                            <Check className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" style={{ color: service.color }} />{f}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Scroll indicator for mobile */}
                <div className="md:hidden text-center pb-4">
                  <p className="text-xs text-gray-400">Scroll down for more</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ==================== SECTION 5: PRICING ==================== */}
      <AnimatePresence mode="wait">
        {currentSection === 5 && (
          <motion.section key="pricing" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <div className="h-full w-full overflow-y-auto overflow-x-hidden" data-scrollable="true">
              <div className="min-h-full w-full px-4 sm:px-6 md:px-12 lg:px-24 py-20 md:py-16 lg:py-8 flex flex-col justify-center">
                <div className="text-center mb-6 md:mb-8 lg:mb-10">
                  <motion.p className="text-xs md:text-sm font-medium tracking-wider uppercase" style={{ color: colors.purple }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Pricing</motion.p>
                  <motion.h2 className="mt-2 md:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: colors.navy }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Simple, Transparent</motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 max-w-5xl mx-auto w-full pb-16 md:pb-8">
                  {[
                    { name: 'VPS Basic', price: '10', desc: 'Ideal for beginners', specs: ['2 GB RAM', '1 vCPU', '20 GB SSD'], features: ['Full Root Access', 'DDoS Protection', '24/7 Support', 'Free SSL'], popular: false },
                    { name: 'VPS Pro', price: '20', desc: 'Perfect for small businesses', specs: ['4 GB RAM', '2 vCPU', '50 GB SSD'], features: ['Full Root Access', 'DDoS Protection', 'Priority Support', 'Free SSL', 'Daily Backups'], popular: true },
                    { name: 'VPS Ultra', price: '35', desc: 'For high-performance needs', specs: ['8 GB RAM', '4 vCPU', '100 GB SSD'], features: ['Full Root Access', 'Advanced DDoS', 'VIP Support', 'Free SSL', 'Daily Backups'], popular: false },
                  ].map((plan, i) => (
                    <motion.div 
                      key={plan.name}
                      className={`relative bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 border-2 ${plan.popular ? 'border-purple-500 shadow-xl order-first md:order-none' : 'border-gray-100'}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 md:px-4 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap" style={{ backgroundColor: colors.purple }}>Most Popular</div>}
                      <h3 className="text-base md:text-lg font-semibold mt-2 md:mt-0" style={{ color: colors.navy }}>{plan.name}</h3>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">{plan.desc}</p>
                      <div className="mt-3 md:mt-4 mb-3 md:mb-4">
                        <span className="text-3xl md:text-4xl font-bold" style={{ color: colors.navy }}>${plan.price}</span>
                        <span className="text-sm text-gray-400">/month</span>
                      </div>
                      <div className="space-y-1 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-gray-100">
                        {plan.specs.map(spec => <p key={spec} className="text-xs md:text-sm font-medium" style={{ color: colors.navy }}>{spec}</p>)}
                      </div>
                      <div className="space-y-1.5 md:space-y-2 mb-4">
                        {plan.features.map(f => <div key={f} className="flex items-center gap-2 text-xs md:text-sm text-gray-600"><Check className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-green-500" />{f}</div>)}
                      </div>
                      <motion.button 
                        className={`w-full py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base ${plan.popular ? 'text-white' : 'border-2 border-gray-200 text-gray-600'}`}
                        style={{ backgroundColor: plan.popular ? colors.purple : undefined }}
                        whileHover={{ scale: 1.02 }}
                      >Get Started</motion.button>
                    </motion.div>
                  ))}
                </div>
                
                {/* Scroll indicator for mobile */}
                <div className="md:hidden text-center pb-4">
                  <p className="text-xs text-gray-400">Scroll down for more</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ==================== SECTION 6: COLLAB BANNER ==================== */}
      <AnimatePresence mode="wait">
        {currentSection === 6 && (
          <motion.section 
            key="collab"
            className="absolute inset-0 bg-[#fafafa]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Elegant moving text - very subtle, behind content */}
            <div className="absolute inset-0 flex items-center overflow-hidden opacity-[0.03]">
              <motion.div 
                className="whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-[30vw] md:text-[25vw] font-bold tracking-tight" style={{ color: colors.navy }}>
                  MARYSVEL × FLOW — MARYSVEL × FLOW — 
                </span>
              </motion.div>
            </div>

            {/* Main content - centered elegant layout */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 text-center">
              {/* Small top label */}
              <motion.p 
                className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-400 mb-4 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                A Collaboration
              </motion.p>

              {/* Main headline */}
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight"
                style={{ color: colors.navy }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Learn <span className="italic font-serif">Arabic</span>
              </motion.h2>

              {/* Arabic text - elegant serif */}
              <motion.p 
                className="mt-2 md:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light"
                style={{ color: colors.purple, fontFamily: 'serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                تعلّم العربية
              </motion.p>

              {/* Thin elegant line */}
              <motion.div 
                className="w-16 md:w-24 h-px bg-gray-300 my-6 md:my-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              {/* Subtitle */}
              <motion.p 
                className="text-gray-500 max-w-sm md:max-w-lg text-sm md:text-lg leading-relaxed px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                A program designed for Spanish speakers, taught by 
                <span className="text-gray-700 font-medium"> Cynthia Habib</span> — 
                Lebanese educator with 7+ years of experience.
              </motion.p>

              {/* Flags */}
              <motion.div 
                className="flex items-center gap-3 md:gap-4 mt-6 md:mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-xl md:text-2xl">🇪🇸</span>
                <div className="w-6 md:w-8 h-px bg-gray-300" />
                <span className="text-xl md:text-2xl">🇱🇧</span>
              </motion.div>

              {/* CTA */}
              <motion.button 
                className="mt-8 md:mt-10 group flex items-center gap-2 md:gap-3 text-xs md:text-sm tracking-wide"
                style={{ color: colors.navy }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ gap: '16px' }}
              >
                <span className="uppercase tracking-[0.15em] md:tracking-[0.2em]">Explore Program</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </motion.button>

              {/* Bottom levels - minimal */}
              <motion.div 
                className="absolute bottom-16 md:bottom-12 flex items-center gap-6 md:gap-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {['Beginner', 'Intermediate', 'Advanced'].map((level, i) => (
                  <div key={level} className="text-center">
                    <p className="text-[10px] md:text-xs text-gray-400 tracking-wider uppercase">{level}</p>
                    <p className="text-xs md:text-sm font-medium mt-0.5 md:mt-1" style={{ color: colors.navy }}>
                      {['A1–A2', 'B1–B1+', 'B2–C1'][i]}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ==================== SECTION 7: CTA ==================== */}
      <AnimatePresence mode="wait">
        {currentSection === 7 && (
          <motion.section key="cta" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <div className="absolute inset-0">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src="/1.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.navy}f5 0%, ${colors.purple}e5 100%)` }} />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
              <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white max-w-4xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                Ready to Launch<br /><span style={{ color: colors.lightBlue }}>Your Project?</span>
              </motion.h2>

              <motion.p className="mt-4 md:mt-6 text-base md:text-lg text-white/60 max-w-md px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                Deploy your first server in under 60 seconds. No setup fees, cancel anytime.
              </motion.p>

              <motion.div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <motion.button className="group flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 rounded-full bg-white font-medium text-sm md:text-base" style={{ color: colors.navy }} whileHover={{ scale: 1.02 }}>
                  Start Free Trial<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button className="px-8 py-4 md:px-10 md:py-5 rounded-full font-medium text-white border-2 border-white/20 hover:bg-white/10 text-sm md:text-base" whileHover={{ scale: 1.02 }}>Contact Sales</motion.button>
              </motion.div>

              <motion.div className="absolute bottom-16 md:bottom-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-white/30 text-xs md:text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <span>© 2025 Marysville Investments SL</span><span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />Barcelona, Spain</span>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}