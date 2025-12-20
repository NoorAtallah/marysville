'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VerticalDropdownNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { label: 'Home', icon: '⬢', color: '#00ffff' },
    { label: 'Deploy', icon: '▲', color: '#00aaff' },
    { label: 'Scale', icon: '●', color: '#0077ff' },
    { label: 'Pricing', icon: '■', color: '#ff00ff' },
    { label: 'Docs', icon: '◆', color: '#ff0099' },
  ];

  return (
    <div className="fixed top-8 right-8 z-50">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Rotating outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Main circle */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-magenta-500/20 backdrop-blur-xl border border-cyan-400/30">
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-2xl font-bold text-cyan-400"
            >
              {isOpen ? '×' : '≡'}
            </motion.div>
          </div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl"
          animate={{
            scale: isOpen ? [1, 1.2, 1] : 1,
            opacity: isOpen ? [0.3, 0.6, 0.3] : 0.2,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute top-20 right-0 w-64"
          >
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute -top-4 right-7 w-px h-4 bg-gradient-to-b from-cyan-400/50 to-transparent" />

              {/* Menu container */}
              <div className="relative backdrop-blur-2xl bg-black/40 border border-cyan-400/30 rounded-2xl overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    background: [
                      'linear-gradient(180deg, rgba(0,255,255,0.5) 0%, rgba(255,0,255,0.5) 100%)',
                      'linear-gradient(180deg, rgba(255,0,255,0.5) 0%, rgba(0,255,255,0.5) 100%)',
                      'linear-gradient(180deg, rgba(0,255,255,0.5) 0%, rgba(255,0,255,0.5) 100%)',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Menu items */}
                <div className="relative p-4 space-y-2">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.label}
                      onClick={() => setActiveIndex(i)}
                      className="w-full relative group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative p-4 rounded-xl overflow-hidden">
                        {/* Active background */}
                        {activeIndex === i && (
                          <motion.div
                            layoutId="activeBackground"
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-magenta-500/20 border border-cyan-400/40"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}

                        {/* Hover background */}
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all rounded-xl" />

                        {/* Content */}
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Icon */}
                            <motion.div
                              className="text-2xl"
                              style={{ color: item.color }}
                              animate={{
                                textShadow: activeIndex === i
                                  ? `0 0 20px ${item.color}`
                                  : 'none',
                              }}
                            >
                              {item.icon}
                            </motion.div>

                            {/* Label */}
                            <span
                              className={`font-mono text-sm uppercase tracking-wider transition-all ${
                                activeIndex === i
                                  ? 'text-white font-bold'
                                  : 'text-white/60 group-hover:text-white/90'
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>

                          {/* Index */}
                          <span
                            className={`font-mono text-xs ${
                              activeIndex === i ? 'text-cyan-400' : 'text-white/30'
                            }`}
                          >
                            0{i + 1}
                          </span>
                        </div>

                        {/* Left accent line */}
                        {activeIndex === i && (
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                            style={{ backgroundColor: item.color }}
                            layoutId="activeAccent"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </div>

                      {/* Bottom separator line (except last item) */}
                      {i < navItems.length - 1 && (
                        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-magenta-400 opacity-50" />
              </div>

              {/* Corner decorations */}
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-magenta-400 rounded-bl-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerticalDropdownNav;