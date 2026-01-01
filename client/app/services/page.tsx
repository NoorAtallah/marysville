'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  Server, 
  Cpu, 
  Shield, 
  Settings, 
  Cloud, 
  Code, 
  Headphones,
  Zap,
  Activity,
  Clock,
  Users,
  ChevronDown
} from 'lucide-react';

const colors = {
  purple: '#7B2D8E',
  violet: '#8B5CF6',
  lightBlue: '#5BC0EB',
  navy: '#1E3A5F',
};

const services = [
  {
    number: '01',
    title: 'Power for Every Scale',
    subtitle: 'VPS Hosting Plans',
    description: 'From startups to enterprises, our Standard, Quasar, and Turbo plans deliver exactly what you need.',
    features: ['Standard VPS', 'Quasar Plans', 'Turbo Performance', 'Managed Support'],
    icon: Server,
    color: colors.purple,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  },
  {
    number: '02',
    title: 'Built for Performance',
    subtitle: 'Server Resources',
    description: 'Scale from 1 GB to 64 GB RAM seamlessly. Lightning-fast SSD storage comes standard.',
    features: ['1-64 GB RAM', 'SSD Storage', 'NVMe Available', 'Unlimited Bandwidth'],
    icon: Cpu,
    color: colors.lightBlue,
    image: 'https://images.unsplash.com/photo-1591238372338-22d30c883a86?w=800&q=80',
  },
  {
    number: '03',
    title: 'Protected & Connected',
    subtitle: 'Network & Security',
    description: 'Dedicated IPs, private networking, IPv6 support, and enterprise-grade DDoS protection.',
    features: ['Dedicated IPs', 'Private Network', 'IPv6 Ready', 'DDoS Protected'],
    icon: Shield,
    color: colors.violet,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  },
  {
    number: '04',
    title: 'Manage with Ease',
    subtitle: 'Control Panels',
    description: 'Industry-leading control panels including cPanel/WHM, Plesk, and Interworx.',
    features: ['cPanel/WHM', 'Plesk Panel', 'Interworx', '400+ Apps'],
    icon: Settings,
    color: colors.navy,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    number: '05',
    title: 'Scale Without Limits',
    subtitle: 'Cloud Infrastructure',
    description: 'Built on enterprise cloud architecture with automatic scaling and high availability.',
    features: ['Cloud VPS', 'Auto-Scaling', 'Load Balancing', 'High Availability'],
    icon: Cloud,
    color: colors.purple,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    number: '06',
    title: 'Built for Developers',
    subtitle: 'Developer Tools',
    description: 'Full root access, secure SSH, powerful APIs, and automation tools.',
    features: ['Root Access', 'SSH Access', 'API Ready', 'Git Integration'],
    icon: Code,
    color: colors.lightBlue,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  },
  {
    number: '07',
    title: 'Always Here for You',
    subtitle: '24/7 Expert Support',
    description: 'Round-the-clock support from certified experts. Free migrations and real-time monitoring.',
    features: ['24/7 Support', 'Expert Team', 'Free Migration', 'Real-Time Monitoring'],
    icon: Headphones,
    color: colors.violet,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
  },
];

const stats = [
  { value: '10,000+', label: 'Active Servers', icon: Server },
  { value: '99.99%', label: 'Uptime SLA', icon: Activity },
  { value: '< 100ms', label: 'Response Time', icon: Clock },
  { value: '24/7', label: 'Expert Support', icon: Users },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="bg-[#fafafa]">
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

      {/* ==================== HERO ==================== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${colors.navy} 1px, transparent 1px), linear-gradient(90deg, ${colors.navy} 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Floating Images - Left Side */}
        <motion.div
          className="absolute left-[5%] top-[15%] w-[180px] h-[220px] md:w-[220px] md:h-[280px] rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
          initial={{ opacity: 0, x: -100, rotate: -12 }}
          animate={isHeroInView ? { opacity: 1, x: 0, rotate: -6 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" 
            alt="Data Center" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: colors.purple }}>
              VPS Hosting
            </span>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-[8%] bottom-[20%] w-[150px] h-[180px] md:w-[180px] md:h-[220px] rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
          initial={{ opacity: 0, y: 100, rotate: 8 }}
          animate={isHeroInView ? { opacity: 1, y: 0, rotate: 4 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" 
            alt="Dashboard" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: colors.lightBlue }}>
              Control Panel
            </span>
          </div>
        </motion.div>

        {/* Floating Images - Right Side */}
        <motion.div
          className="absolute right-[5%] top-[20%] w-[160px] h-[200px] md:w-[200px] md:h-[250px] rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
          initial={{ opacity: 0, x: 100, rotate: 12 }}
          animate={isHeroInView ? { opacity: 1, x: 0, rotate: 6 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80" 
            alt="Security" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: colors.violet }}>
              Security
            </span>
          </div>
        </motion.div>

        <motion.div
          className="absolute right-[10%] bottom-[18%] w-[140px] h-[170px] md:w-[170px] md:h-[210px] rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
          initial={{ opacity: 0, y: 100, rotate: -8 }}
          animate={isHeroInView ? { opacity: 1, y: 0, rotate: -4 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" 
            alt="Global Network" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: colors.navy }}>
              Global CDN
            </span>
          </div>
        </motion.div>

        {/* Floating Stats Cards */}
        <motion.div
          className="absolute left-[15%] top-[50%] -translate-y-1/2 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 hidden xl:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${colors.purple}15` }}>
              <Server className="w-5 h-5" style={{ color: colors.purple }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: colors.navy }}>10K+</p>
              <p className="text-xs text-gray-500">Active Servers</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute right-[15%] top-[45%] bg-white rounded-2xl p-4 shadow-xl border border-gray-100 hidden xl:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, type: "spring" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${colors.lightBlue}15` }}>
              <Activity className="w-5 h-5" style={{ color: colors.lightBlue }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: colors.navy }}>99.99%</p>
              <p className="text-xs text-gray-500">Uptime SLA</p>
            </div>
          </div>
        </motion.div>

        {/* Center Content */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-3xl mx-auto">
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wider uppercase"
            style={{ backgroundColor: `${colors.purple}10`, color: colors.purple, border: `1px solid ${colors.purple}20` }}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          >
            <Zap className="w-4 h-4" />
            Our Services
          </motion.span>

          <motion.h1
            className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{ color: colors.navy }}
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Professional
            <br />
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${colors.purple}, ${colors.lightBlue})` }}
            >
              Hosting
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-500 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Everything you need to power your digital presence
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold"
              style={{ backgroundColor: colors.purple }}
              whileHover={{ scale: 1.05, boxShadow: `0 20px 50px ${colors.purple}40` }}
            >
              Explore Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border-2"
              style={{ borderColor: colors.navy, color: colors.navy }}
              whileHover={{ scale: 1.05, backgroundColor: `${colors.navy}08` }}
            >
              View Pricing
            </motion.button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm">DDoS Protected</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-5 h-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Zap className="w-5 h-5" />
              <span className="text-sm">Instant Setup</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== HORIZONTAL SCROLL SECTION ==================== */}
      <HorizontalScrollSection />

      {/* ==================== STATS ==================== */}
      <section className="relative py-24 md:py-32">
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
            <span className="text-sm font-medium tracking-widest uppercase text-white/60">Why Choose Us</span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white">Trusted by Thousands</h2>
            <p className="mt-4 text-lg text-white/50">The numbers speak for themselves</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ color: colors.navy }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg text-gray-500 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Choose your perfect plan and launch your project today
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full font-semibold text-lg text-white"
              style={{ backgroundColor: colors.purple }}
            >
              View Pricing Plans
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="w-full sm:w-auto px-10 py-5 rounded-full font-semibold text-lg border-2"
              style={{ borderColor: colors.navy, color: colors.navy }}
            >
              Contact Sales
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ==================== HORIZONTAL SCROLL SECTION ====================
function HorizontalScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 0.95], ["1%", "-72%"]);

  return (
    <section ref={targetRef} className="relative h-[350vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-[#fafafa]">
        {/* Header */}
        <div className="absolute top-8 left-8 md:left-16 z-20">
          <span className="text-sm font-medium tracking-widest uppercase" style={{ color: colors.lightBlue }}>
            What We Offer
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: colors.navy }}>
            Our Services
          </h2>
        </div>

        {/* Gradient Edges */}
        <div className="pointer-events-none w-[10vw] h-full absolute left-0 top-0 z-10 bg-gradient-to-r from-[#fafafa] to-transparent" />
        <div className="pointer-events-none w-[10vw] h-full absolute right-0 top-0 z-10 bg-gradient-to-l from-[#fafafa] to-transparent" />

        {/* Cards */}
        <motion.div style={{ x }} className="flex gap-6 md:gap-8 pl-8 md:pl-16">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="absolute bottom-8 left-8 right-8 md:left-16 md:right-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full rounded-full origin-left"
            style={{ backgroundColor: colors.purple, scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}

// ==================== SERVICE CARD ====================
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const Icon = service.icon;

  return (
    <div
      className="relative flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-[45vw] lg:w-[35vw] xl:w-[30vw] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div 
        className="absolute inset-0 transition-transform duration-500"
        style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
      >
        <img src={service.image} alt={service.subtitle} className="w-full h-full object-cover" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Number */}
      <div 
        className="absolute top-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
        style={{ backgroundColor: service.color }}
      >
        {service.number}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300"
          style={{ backgroundColor: service.color, transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <p className="text-sm font-medium tracking-wider uppercase mb-1" style={{ color: service.color }}>
          {service.title}
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-white">{service.subtitle}</h3>
      </div>

      {/* Hover Content */}
      <div
        className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6 p-5 rounded-2xl backdrop-blur-xl transition-all duration-400"
        style={{ 
          backgroundColor: 'rgba(255,255,255,0.95)',
          transform: isHovered ? 'translateY(0)' : 'translateY(130%)',
          opacity: isHovered ? 1 : 0,
        }}
      >
        <div className="mb-3">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Service</span>
          <div className="mt-1">
            <span 
              className="inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: service.color }}
            >
              {service.subtitle}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Features</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {service.features.map((feature) => (
              <span key={feature} className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>

        <button
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: service.color }}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}