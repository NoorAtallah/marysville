'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import NeonCrystalCity from './hero2';

const VPSNeonCity: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Horizontal movement - 4 screens
  const x = useTransform(smoothProgress, [0, 1], ['0vw', '-300vw']);

  // Track active section
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const section = Math.min(Math.floor(latest * 4), 3);
      setActiveSection(section);
    });
  }, [scrollYProgress]);

  // Camera rotation based on scroll
  const cameraRotation = useTransform(smoothProgress, [0, 1], [0, 360]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-black" 
      style={{ height: '400vh' }}
    >
      {/* Animated Background */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-screen z-0"
        style={{
          filter: useTransform(smoothProgress, 
            [0, 0.25, 0.5, 0.75, 1], 
            ['brightness(1) hue-rotate(0deg)', 'brightness(1.1) hue-rotate(30deg)', 'brightness(1.2) hue-rotate(60deg)', 'brightness(1.3) hue-rotate(90deg)', 'brightness(1.4) hue-rotate(120deg)']
          ),
        }}
      >
        <NeonCrystalCity
          cameraSpeed={10}
          tileSize={2.5}
          unionK={0.6}
          maxSteps={150}
          maxDist={130}
          surfDist={0.0007}
          className="w-full h-full"
        />
      </motion.div>

      {/* Vignette */}
      <div className="fixed inset-0 z-[5] pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      {/* Horizontal Scrolling Container */}
      <div className="fixed top-0 left-0 w-full h-screen z-10 overflow-hidden">
        <motion.div 
          style={{ x }}
          className="flex h-full w-[400vw]"
        >
          {/* SECTION 1: HERO */}
          <div className="w-screen h-full flex flex-col items-center justify-center px-8 relative">
            {/* Cyber Grid Lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <motion.div
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(0deg, rgba(0,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative z-10"
            >
              <motion.h1
                animate={{
                  textShadow: [
                    '0 0 40px rgba(0,255,255,1), 0 0 80px rgba(255,0,255,0.5), 0 0 120px rgba(0,255,255,0.3)',
                    '0 0 60px rgba(255,0,255,1), 0 0 100px rgba(0,255,255,0.5), 0 0 140px rgba(255,0,255,0.3)',
                    '0 0 40px rgba(0,255,255,1), 0 0 80px rgba(255,0,255,0.5), 0 0 120px rgba(0,255,255,0.3)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[clamp(6rem,20vw,18rem)] font-black leading-none tracking-tighter text-center"
                style={{
                  background: 'linear-gradient(135deg, #00ffff 0%, #0099ff 25%, #ff00ff 50%, #ff0099 75%, #00ffff 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'monospace',
                }}
              >
                INFRACORE
              </motion.h1>

              {/* Scanline effect */}
              <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-20 pointer-events-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-12 flex flex-col items-center gap-6"
            >
              <p className="text-cyan-300 text-2xl md:text-4xl font-light tracking-[0.5em] uppercase">
                Future Cloud
              </p>
              
              <div className="flex items-center gap-4 text-white/60 text-sm font-mono">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                />
                <span>SYSTEM ONLINE</span>
              </div>
            </motion.div>

            {/* Floating elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{
                    x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                    y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                    scale: [0, 1, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                  style={{
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                  }}
                >
                  <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                </motion.div>
              ))}
            </div>

            {/* Scroll hint */}
            <motion.div
              animate={{ x: [0, 20, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute bottom-20 right-20 flex items-center gap-4"
            >
              <span className="text-cyan-400/70 text-sm uppercase tracking-[0.4em] font-mono">
                Scroll
              </span>
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-cyan-400/70">
                <path d="M2 12h32m0 0l-10-10m10 10l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>

          {/* SECTION 2: DEPLOY */}
          <div className="w-screen h-full flex items-center justify-center px-8 md:px-20 relative">
            <div className="max-w-6xl w-full">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-12">
                  <motion.h2
                    className="text-[clamp(5rem,15vw,14rem)] font-black leading-none font-mono"
                    style={{
                      background: 'linear-gradient(90deg, #00ffff, #00ddff, #00aaff)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 60px rgba(0,255,255,0.6))',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    DEPLOY
                  </motion.h2>
                  
                  {/* Glitch bars */}
                  <motion.div
                    animate={{ 
                      scaleX: [0, 1, 1, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="absolute bottom-0 left-0 h-2 bg-cyan-400"
                  />
                </div>

                <div className="space-y-8">
                  <p className="text-white text-3xl md:text-6xl font-light leading-tight">
                    Launch in{' '}
                    <motion.span 
                      className="font-black"
                      style={{
                        background: 'linear-gradient(90deg, #00ffff, #00aaff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      animate={{ 
                        textShadow: [
                          '0 0 20px rgba(0,255,255,0.5)',
                          '0 0 40px rgba(0,255,255,0.8)',
                          '0 0 20px rgba(0,255,255,0.5)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      milliseconds
                    </motion.span>
                  </p>

                  <p className="text-white/60 text-xl md:text-3xl font-light max-w-3xl">
                    Instant provisioning • Zero configuration • Maximum performance
                  </p>

                  {/* Tech stack indicators */}
                  <div className="flex flex-wrap gap-6 mt-12">
                    {['Docker', 'Kubernetes', 'Serverless', 'Edge Computing'].map((tech, i) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-cyan-400/20 blur-xl group-hover:bg-cyan-400/40 transition-all" />
                        <div className="relative px-8 py-4 border-2 border-cyan-400/40 text-cyan-300 font-mono text-lg backdrop-blur-sm">
                          {tech}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Animated lines background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  style={{
                    top: `${(i + 1) * 12}%`,
                    width: '100%',
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* SECTION 3: SCALE */}
          <div className="w-screen h-full flex items-center justify-center px-8 md:px-20 relative">
            <div className="max-w-6xl w-full">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-12">
                  <motion.h2
                    className="text-[clamp(5rem,15vw,14rem)] font-black leading-none font-mono"
                    style={{
                      background: 'linear-gradient(90deg, #ff00ff, #ff0099, #cc00ff)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 60px rgba(255,0,255,0.6))',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    SCALE
                  </motion.h2>

                  <motion.div
                    animate={{ 
                      scaleX: [0, 1, 1, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="absolute bottom-0 left-0 h-2 bg-magenta-400"
                  />
                </div>

                <div className="space-y-8">
                  <p className="text-white text-3xl md:text-6xl font-light leading-tight">
                    From{' '}
                    <span className="font-black text-magenta-400">zero</span>
                    {' '}to{' '}
                    <motion.span 
                      className="font-black"
                      style={{
                        background: 'linear-gradient(90deg, #ff00ff, #ff0099)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        textShadow: [
                          '0 0 20px rgba(255,0,255,0.5)',
                          '0 0 40px rgba(255,0,255,0.8)',
                          '0 0 20px rgba(255,0,255,0.5)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      infinity
                    </motion.span>
                  </p>

                  <p className="text-white/60 text-xl md:text-3xl font-light max-w-3xl">
                    Auto-scaling • Load balancing • Global distribution
                  </p>

                  {/* Animated visualization */}
                  <div className="mt-16 flex items-end gap-3 h-40">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-lg"
                        style={{
                          background: 'linear-gradient(to top, #ff00ff, #ff0099)',
                        }}
                        animate={{
                          height: [`${20 + Math.random() * 20}%`, `${40 + Math.random() * 60}%`, `${20 + Math.random() * 20}%`],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Animated circles background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border-2 border-magenta-400 rounded-full"
                  style={{
                    width: `${(i + 1) * 200}px`,
                    height: `${(i + 1) * 200}px`,
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </div>

          {/* SECTION 4: STATS & CTA */}
          <div className="w-screen h-full flex flex-col items-center justify-center px-8 relative">
            {/* Stats */}
            <div className="w-full max-w-6xl mb-12">
              <div className="grid grid-cols-3 gap-16">
                {[
                  { value: '1.2ms', label: 'Latency', color: 'cyan' },
                  { value: '99.99%', label: 'Uptime', color: 'magenta' },
                  { value: '50Gbps', label: 'Bandwidth', color: 'cyan' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="text-center flex flex-col items-center"
                  >
                    <div 
                      className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none mb-3 font-mono whitespace-nowrap"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color === 'cyan' ? '#00ffff, #00aaff' : '#ff00ff, #ff0099'})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: `drop-shadow(0 0 25px ${stat.color === 'cyan' ? 'rgba(0,255,255,0.5)' : 'rgba(255,0,255,0.5)'})`,
                      }}
                    >
                      {stat.value}
                    </div>

                    <div className="text-white/70 text-sm md:text-base uppercase tracking-[0.2em] font-mono">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-16 py-5 overflow-hidden pointer-events-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-magenta-500" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-magenta-500 via-purple-500 to-cyan-500"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span className="relative z-10 text-white text-xl md:text-2xl font-black uppercase tracking-wider font-mono">
                  Launch Now
                </span>
              </motion.button>

              <p className="text-white/40 text-xs font-mono">
                No credit card • Free 30-day trial
              </p>
            </motion.div>

            {/* Particle system */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fixed UI Elements */}
      <div className="fixed top-8 left-8 z-20 pointer-events-none">
        <div className="flex items-center gap-3 text-cyan-400/50 text-xs font-mono">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-cyan-400 rounded-full"
          />
          WEBGL2 • RAYMARCHED
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-20 pointer-events-none">
        <motion.p
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-cyan-300/40 text-xs font-mono uppercase tracking-widest"
        >
          InfraCore Systems
        </motion.p>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: activeSection === i ? '56px' : '8px',
                height: '8px',
                backgroundColor: activeSection === i 
                  ? i % 2 === 0 ? '#00ffff' : '#ff00ff'
                  : 'rgba(255,255,255,0.2)',
                boxShadow: activeSection === i 
                  ? `0 0 20px ${i % 2 === 0 ? 'rgba(0,255,255,1)' : 'rgba(255,0,255,1)'}`
                  : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VPSNeonCity;