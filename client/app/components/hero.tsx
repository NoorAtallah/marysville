'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Server, Shield, Zap, Globe, MapPin } from 'lucide-react';

export default function MarysvilleVPS() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const touchStartY = useRef(0);

  const colors = {
    purple: '#7B2D8E',
    violet: '#8B5CF6',
    lightBlue: '#5BC0EB',
    navy: '#1E3A5F',
  };

  const totalSections = 5;

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
      e.preventDefault();
      if (Math.abs(e.deltaY) > 30) navigate(e.deltaY > 0 ? 'down' : 'up');
    };
    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowDown', ' '].includes(e.key)) { e.preventDefault(); navigate('down'); }
      if (e.key === 'ArrowUp') { e.preventDefault(); navigate('up'); }
    };
    const handleTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) navigate(delta > 0 ? 'down' : 'up');
    };
    const handleMouse = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
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
  }, [currentSection, isAnimating]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white">
      {/* Subtle Gradient Blob - Follows cursor */}
      <motion.div 
        className="pointer-events-none fixed z-0 h-[600px] w-[600px] rounded-full opacity-[0.07] blur-[100px]"
        animate={{
          x: cursorPos.x - 300,
          y: cursorPos.y - 300,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{ background: `linear-gradient(135deg, ${colors.lightBlue}, ${colors.purple})` }}
      />

      {/* Grid Pattern - Very subtle */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(${colors.navy} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Progress Bar - Top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gray-100">
        <motion.div 
          className="h-full"
          initial={{ width: '20%' }}
          animate={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
          transition={{ duration: 0.5 }}
          style={{ background: `linear-gradient(90deg, ${colors.purple}, ${colors.lightBlue})` }}
        />
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 z-50 -translate-y-1/2 flex flex-col gap-3">
        {[...Array(totalSections)].map((_, i) => (
          <button
            key={i}
            onClick={() => { if (!isAnimating) { setIsAnimating(true); setCurrentSection(i); setTimeout(() => setIsAnimating(false), 1000); }}}
            className="group relative flex items-center"
          >
            <motion.div 
              className="h-2 w-2 rounded-full"
              animate={{ 
                scale: currentSection === i ? 1.5 : 1,
                backgroundColor: currentSection === i ? colors.purple : '#d1d5db',
              }}
              transition={{ duration: 0.3 }}
            />
            {currentSection === i && (
              <motion.div
                className="absolute -inset-2 rounded-full border"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ borderColor: `${colors.purple}30` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ========== SECTION 1: HERO ========== */}
      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <motion.section 
            key="hero"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-5xl mx-auto px-8 text-center">
              {/* Animated Logo */}
              <motion.div 
                className="mx-auto mb-8 relative w-20 h-20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.circle 
                    cx="50" cy="20" r="8" 
                    fill={colors.lightBlue}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                  <motion.circle 
                    cx="80" cy="40" r="9" 
                    fill={colors.lightBlue}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  />
                  <motion.circle 
                    cx="75" cy="70" r="7" 
                    fill={colors.navy}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                  <motion.circle 
                    cx="50" cy="85" r="8" 
                    fill={colors.navy}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                  <motion.circle 
                    cx="25" cy="70" r="7" 
                    fill={colors.violet}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                  />
                  <motion.circle 
                    cx="20" cy="40" r="9" 
                    fill={colors.purple}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                  />
                  <motion.path 
                    d="M50,20 L80,40 L75,70 L50,85 L25,70 L20,40 Z" 
                    fill="none" 
                    stroke={colors.purple}
                    strokeWidth="1.5"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </svg>
              </motion.div>

              {/* Headline */}
              <div className="overflow-hidden">
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight"
                  style={{ color: colors.navy }}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Cloud infrastructure
                </motion.h1>
              </div>
              <div className="overflow-hidden mt-2">
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-blue-400 bg-clip-text text-transparent">
                    redefined.
                  </span>
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p 
                className="mt-8 text-xl text-gray-500 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Deploy globally in seconds. Scale effortlessly. 
                Built in Barcelona for developers worldwide.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                className="mt-10 flex items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button 
                  className="group flex items-center gap-2 rounded-full px-8 py-4 text-white font-medium"
                  style={{ backgroundColor: colors.navy }}
                  whileHover={{ scale: 1.02, boxShadow: `0 20px 40px ${colors.navy}25` }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start deploying
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button 
                  className="flex items-center gap-2 rounded-full px-8 py-4 font-medium text-gray-600 hover:text-gray-900"
                  whileHover={{ x: 5 }}
                >
                  View pricing
                  <ArrowUpRight className="h-4 w-4" />
                </motion.button>
              </motion.div>

              {/* Stats Row */}
              <motion.div 
                className="mt-16 flex items-center justify-center gap-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[
                  { value: '99.99%', label: 'Uptime' },
                  { value: '15+', label: 'Regions' },
                  { value: '60s', label: 'Deploy' },
                ].map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <motion.p 
                      className="text-3xl font-semibold"
                      style={{ color: colors.navy }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1, type: "spring" }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Scroll hint */}
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{ delay: 1.2, y: { repeat: Infinity, duration: 2 } }}
            >
              <span className="text-xs text-gray-400 mb-2">Scroll to explore</span>
              <div className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center p-1">
                <motion.div 
                  className="w-1 h-2 rounded-full bg-gray-400"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ========== SECTION 2: FEATURES ========== */}
      <AnimatePresence mode="wait">
        {currentSection === 1 && (
          <motion.section 
            key="features"
            className="absolute inset-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full px-8 md:px-16 lg:px-24">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left - Text */}
                <div>
                  <motion.p 
                    className="text-sm font-medium tracking-wider uppercase"
                    style={{ color: colors.purple }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Why Marysville
                  </motion.p>
                  <motion.h2 
                    className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight"
                    style={{ color: colors.navy }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Everything you need.
                    <br />
                    <span className="text-gray-400">Nothing you don't.</span>
                  </motion.h2>

                  <motion.div 
                    className="mt-10 space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {[
                      { icon: Zap, title: 'Lightning fast', desc: '10GB/s network, NVMe storage' },
                      { icon: Globe, title: 'Global scale', desc: '15+ regions, 5 continents' },
                      { icon: Shield, title: 'Enterprise security', desc: 'DDoS protection, 24/7 monitoring' },
                      { icon: Server, title: 'Instant deploy', desc: 'Live in 60 seconds' },
                    ].map((item, i) => (
                      <motion.div 
                        key={item.title}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <div 
                          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${colors.purple}10` }}
                        >
                          <item.icon className="w-5 h-5" style={{ color: colors.purple }} />
                        </div>
                        <div>
                          <h4 className="font-medium" style={{ color: colors.navy }}>{item.title}</h4>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Right - Image Grid */}
                <div className="relative h-[500px] hidden lg:block">
                  <motion.div 
                    className="absolute top-0 right-0 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, y: 50, rotate: 3 }}
                    animate={{ opacity: 1, y: 0, rotate: 3 }}
                    transition={{ delay: 0.3 }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" 
                      alt="Data Center" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-0 left-0 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, y: 50, rotate: -3 }}
                    animate={{ opacity: 1, y: 0, rotate: -3 }}
                    transition={{ delay: 0.5 }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&q=80" 
                      alt="Servers" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  {/* Floating stat card */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  >
                    <p className="text-4xl font-bold" style={{ color: colors.purple }}>99.99%</p>
                    <p className="text-sm text-gray-500">Uptime SLA</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ========== SECTION 3: STATS ========== */}
      <AnimatePresence mode="wait">
        {currentSection === 2 && (
          <motion.section 
            key="stats"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full max-w-6xl mx-auto px-8">
              <motion.p 
                className="text-center text-sm font-medium tracking-wider uppercase"
                style={{ color: colors.purple }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                By the numbers
              </motion.p>
              <motion.h2 
                className="mt-4 text-center text-4xl md:text-5xl font-semibold tracking-tight"
                style={{ color: colors.navy }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Built for performance
              </motion.h2>

              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '10', unit: 'GB/s', label: 'Network Speed', color: colors.lightBlue },
                  { value: '32', unit: 'vCPU', label: 'Max Cores', color: colors.purple },
                  { value: '4', unit: 'TB', label: 'NVMe Storage', color: colors.violet },
                  { value: '<50', unit: 'ms', label: 'Latency', color: colors.navy },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    className="relative bg-gray-50 rounded-3xl p-8 overflow-hidden group hover:bg-gray-100 transition-colors"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20"
                      style={{ backgroundColor: stat.color }}
                    />
                    <div className="relative">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl md:text-6xl font-bold" style={{ color: colors.navy }}>
                          {stat.value}
                        </span>
                        <span className="text-xl font-medium" style={{ color: stat.color }}>
                          {stat.unit}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-500">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Image row */}
              <motion.div 
                className="mt-12 flex gap-4 h-48 md:h-64"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
                  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
                  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
                ].map((src, i) => (
                  <motion.div 
                    key={i}
                    className="flex-1 rounded-2xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ========== SECTION 4: GLOBAL ========== */}
      <AnimatePresence mode="wait">
        {currentSection === 3 && (
          <motion.section 
            key="global"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80" 
                alt="Earth" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
            </div>

            <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
              <div className="max-w-xl">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="text-lg">🇪🇸</span>
                  <span className="text-sm font-medium" style={{ color: colors.navy }}>Headquartered in Barcelona</span>
                </motion.div>

                <motion.h2 
                  className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight"
                  style={{ color: colors.navy }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Global reach.
                  <br />
                  <span style={{ color: colors.purple }}>Local speed.</span>
                </motion.h2>

                <motion.p 
                  className="mt-6 text-lg text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Deploy your infrastructure closer to your users with our 
                  strategically positioned data centers across 5 continents.
                </motion.p>

                <motion.div 
                  className="mt-8 flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {['Madrid', 'Frankfurt', 'London', 'New York', 'Singapore', 'Tokyo', 'Sydney'].map((city, i) => (
                    <motion.span 
                      key={city}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        i === 0 ? 'text-white' : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600'
                      }`}
                      style={{ backgroundColor: i === 0 ? colors.purple : undefined }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {i === 0 && '🇪🇸 '}{city}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div 
                  className="mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span 
                    className="text-8xl md:text-9xl font-bold"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.lightBlue}50, ${colors.purple}30)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    15+
                  </span>
                  <p className="text-gray-500 -mt-2">Global regions & growing</p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ========== SECTION 5: CTA ========== */}
      <AnimatePresence mode="wait">
        {currentSection === 4 && (
          <motion.section 
            key="cta"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Video Background */}
            <div className="absolute inset-0">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/1.mp4" type="video/mp4" />
              </video>
              <div 
                className="absolute inset-0"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.navy}f0 0%, ${colors.purple}e0 100%)`,
                }}
              />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-lg">🇪🇸</span>
                <span className="text-sm font-medium text-white/80">Made in Spain for the world</span>
              </motion.div>

              <motion.h2 
                className="mt-8 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Ready to build
                <br />
                <span style={{ color: colors.lightBlue }}>something amazing?</span>
              </motion.h2>

              <motion.p 
                className="mt-6 text-lg text-white/60 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Deploy your first server in 60 seconds. 
                No credit card required to get started.
              </motion.p>

              <motion.div 
                className="mt-10 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button 
                  className="group flex items-center justify-center gap-2 rounded-full bg-white px-10 py-5 font-medium"
                  style={{ color: colors.navy }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start free trial
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button 
                  className="rounded-full px-10 py-5 font-medium text-white border-2 border-white/20 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact sales
                </motion.button>
              </motion.div>

              {/* Trust badges */}
              <motion.div 
                className="mt-16 flex items-center gap-8 text-white/40 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {['GDPR Compliant', 'SOC 2 Type II', 'ISO 27001'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>{badge}</span>
                  </div>
                ))}
              </motion.div>

              {/* Footer */}
              <motion.div 
                className="absolute bottom-8 flex items-center gap-4 text-white/30 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>© 2025 Marysville Investments SL</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Barcelona, Spain
                </span>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}