'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Headphones, 
  Code,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  Globe,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Server,
  Activity
} from 'lucide-react';

const colors = {
  purple: '#7B2D8E',
  violet: '#8B5CF6',
  lightBlue: '#5BC0EB',
  navy: '#1E3A5F',
};

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[300px] -right-[300px] w-[800px] h-[800px] rounded-full blur-[150px] opacity-[0.12]"
          style={{ background: `linear-gradient(135deg, ${colors.lightBlue}, ${colors.purple})` }}
        />
        <div 
          className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.08]"
          style={{ background: `linear-gradient(135deg, ${colors.violet}, ${colors.navy})` }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${colors.navy} 1px, transparent 1px), linear-gradient(90deg, ${colors.navy} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ==================== HERO ==================== */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
                style={{ color: colors.navy }}
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              >
                Hosting Without
                <br />
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, ${colors.purple}, ${colors.lightBlue})` }}
                >
                  the Headaches
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 text-lg md:text-xl text-gray-500 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
              >
                We built the hosting platform we wish existed. Fast, secure, and refreshingly simple.
              </motion.p>

              <Link href="/pricing">
                <motion.button
                  className="mt-8 group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold"
                  style={{ backgroundColor: colors.purple }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05, boxShadow: `0 20px 50px ${colors.purple}40` }}
                >
                  Start Building
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              {/* Stats */}
              <motion.div
                className="mt-12 flex flex-wrap gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                {[
                  { value: '10K+', label: 'Active Websites' },
                  { value: '99.9%', label: 'Uptime SLA' },
                  { value: '24/7', label: 'Expert Support' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl md:text-4xl font-bold" style={{ color: colors.navy }}>{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" 
                  alt="Data Center" 
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${colors.purple}15` }}>
                    <Server className="w-6 h-6" style={{ color: colors.purple }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: colors.navy }}>150+</p>
                    <p className="text-xs text-gray-500">Global Locations</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7, type: "spring" }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-gray-600">All Systems Online</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== OUR ORIGIN ==================== */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80" 
                    alt="Team Working" 
                    className="w-full h-[350px] md:h-[450px] object-cover"
                  />
                </div>
                
                {/* Overlapping Image */}
                <motion.div
                  className="absolute -bottom-8 -right-8 w-48 md:w-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" 
                    alt="Code" 
                    className="w-full h-32 md:h-40 object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span 
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: colors.lightBlue }}
              >
                Our Origin
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: colors.navy }}>
                Built by Developers,
                <br />
                <span style={{ color: colors.purple }}>For Developers</span>
              </h2>

              <div className="mt-8 space-y-6 text-gray-600">
                <p className="text-lg">
                  It was 3 AM. Another deployment failed. Another cryptic error message. We realized the problem wasn't our code—it was our hosting.
                </p>
                <p>
                  Complex interfaces. Hidden fees. Support tickets that went nowhere. We knew there had to be a better way.
                </p>
                <p>
                  So we built <span className="font-semibold" style={{ color: colors.purple }}>MARYSVILLE</span>. Simple, transparent, and built for the way developers actually work.
                </p>
              </div>

              {/* Origin Stats */}
              <div className="mt-10 flex flex-wrap gap-8">
                {[
                  { value: '2020', label: 'Founded' },
                  { value: '50+', label: 'Countries' },
                  { value: '300%', label: 'Growth in 2023' },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="text-2xl md:text-3xl font-bold" style={{ color: colors.purple }}>{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== WHAT MAKES US DIFFERENT ==================== */}
      <section className="relative py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span 
              className="text-sm font-medium tracking-widest uppercase"
              style={{ color: colors.lightBlue }}
            >
              What Makes Us Different
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: colors.navy }}>
              Our core principles that guide every decision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: 'Speed First',
                description: 'Every millisecond counts. We optimize relentlessly for performance.',
                color: colors.purple,
              },
              {
                icon: Shield,
                title: 'Security Built-In',
                description: "DDoS protection, SSL, and backups included. Not an upsell.",
                color: colors.lightBlue,
              },
              {
                icon: Headphones,
                title: 'Human Support',
                description: 'Real engineers answering questions. No bots, no scripts.',
                color: colors.violet,
              },
              {
                icon: Code,
                title: 'Developer Tools',
                description: 'APIs, CLI, Git integration. Built the way you actually work.',
                color: colors.navy,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="group bg-[#fafafa] rounded-3xl p-6 md:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.navy }}>{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INFRASTRUCTURE ==================== */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ backgroundColor: `${colors.purple}15`, color: colors.purple }}
              >
                <Activity className="w-4 h-4" />
                99.9% Uptime SLA
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: colors.navy }}>
                Enterprise-Grade
                <br />
                <span style={{ color: colors.purple }}>Infrastructure</span>
              </h2>

              <p className="mt-6 text-lg text-gray-500">
                Your applications run on cutting-edge hardware in premium data centers. We don't compromise on the foundation.
              </p>

              {/* Specs Grid */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { icon: Cpu, label: 'AMD EPYC CPUs', value: 'Latest Gen' },
                  { icon: HardDrive, label: 'NVMe SSD Storage', value: 'Ultra Fast' },
                  { icon: Wifi, label: 'Network Speed', value: '10 Gbps' },
                  { icon: Lock, label: 'DDoS Protection', value: 'Always On' },
                ].map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    className="bg-white rounded-2xl p-4 border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <spec.icon className="w-6 h-6 mb-3" style={{ color: colors.purple }} />
                    <p className="text-sm text-gray-500">{spec.label}</p>
                    <p className="font-semibold" style={{ color: colors.navy }}>{spec.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" 
                  alt="Server Infrastructure" 
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${colors.purple}40, ${colors.lightBlue}20)` }}
                />
              </div>

              {/* Floating Stats */}
              <motion.div
                className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-3xl font-bold" style={{ color: colors.purple }}>10Gbps</p>
                <p className="text-xs text-gray-500">Network Speed</p>
              </motion.div>

              <motion.div
                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-3xl font-bold" style={{ color: colors.lightBlue }}>99.99%</p>
                <p className="text-xs text-gray-500">Uptime Record</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== WHY TEAMS CHOOSE US ==================== */}
      <section className="relative py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span 
              className="text-sm font-medium tracking-widest uppercase"
              style={{ color: colors.lightBlue }}
            >
              Why Teams Choose MARYSVILLE
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: colors.navy }}>
              Join thousands building on our platform
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Trusted by Thousands',
                description: 'Developers worldwide build on MARYSVILLE',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
              },
              {
                icon: Activity,
                title: 'Industry Leading',
                description: 'Best-in-class uptime and performance',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
              },
              {
                icon: Headphones,
                title: '24/7 Expert Support',
                description: 'Real engineers ready to help',
                image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="group relative rounded-3xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: colors.purple }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NUMBERS THAT MATTER ==================== */}
      <section className="relative py-20 md:py-32">
        <div 
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.purple} 100%)` }}
        />
        <div className="absolute inset-0 opacity-10">
          <div 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
              width: '100%',
              height: '100%'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium tracking-widest uppercase text-white/60">
              Numbers That Matter
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Real metrics from real infrastructure
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '50+', label: 'Countries Served', icon: Globe },
              { value: '10K+', label: 'Websites Hosted', icon: Server },
              { value: '<100ms', label: 'Avg Response', icon: Clock },
              { value: '100%', label: 'DDoS Protected', icon: Shield },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <stat.icon className="w-7 h-7 text-white/80" />
                </div>
                <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: colors.lightBlue }}>
                  {stat.value}
                </p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="relative py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: colors.navy }}>
              Ready to Experience
              <br />
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.purple}, ${colors.lightBlue})` }}
              >
                Better Hosting?
              </span>
            </h2>
            <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto">
              Join thousands of developers who've made the switch to MARYSVILLE
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing">
                <motion.button
                  className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-semibold"
                  style={{ backgroundColor: colors.purple }}
                  whileHover={{ scale: 1.05, boxShadow: `0 20px 50px ${colors.purple}40` }}
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/pricing">
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold border-2"
                  style={{ borderColor: colors.navy, color: colors.navy }}
                  whileHover={{ scale: 1.05, backgroundColor: `${colors.navy}08` }}
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              No credit card required • Cancel anytime • 30-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-16 bg-[#fafafa]" />
    </div>
  );
}