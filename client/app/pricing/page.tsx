'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Zap, 
  Shield, 
  Clock, 
  Server, 
  Cpu, 
  HardDrive, 
  Cloud, 
  Database,
  Lock,
  RefreshCw,
  Headphones,
  ArrowRight,
  Star
} from 'lucide-react';

const colors = {
  purple: '#7B2D8E',
  violet: '#8B5CF6',
  lightBlue: '#5BC0EB',
  navy: '#1E3A5F',
};

// Pricing data organized by category
const pricingData = {
  'VPS Hosting': [
    {
      name: 'Standard VPS',
      price: '19.99',
      description: 'Balanced resources, perfect for small businesses and personal projects.',
      features: [
        'Balanced CPU & RAM',
        'Standard SSD storage',
        'Perfect for small sites',
        '24/7 support included',
        'Free SSL certificate',
        '99.9% uptime guarantee',
      ],
      popular: false,
      color: colors.lightBlue,
    },
    {
      name: 'Quasar VPS',
      price: '39.99',
      description: 'Enhanced CPU/RAM for growing applications and medium traffic sites.',
      features: [
        'Enhanced CPU power',
        'Increased RAM capacity',
        'Perfect for growing apps',
        'Priority support',
        'Free SSL certificate',
        'Daily backups included',
      ],
      popular: true,
      color: colors.purple,
    },
    {
      name: 'Turbo VPS',
      price: '69.99',
      description: 'Maximum performance for high-traffic enterprise applications.',
      features: [
        'Maximum performance',
        'High-speed processing',
        'Enterprise-grade resources',
        'VIP support 24/7',
        'Advanced DDoS protection',
        'Hourly backups',
      ],
      popular: false,
      color: colors.violet,
    },
    {
      name: 'Managed VPS',
      price: '20',
      description: 'Expert management for your VPS - we handle everything.',
      features: [
        'Full server management',
        'Automatic updates',
        'Security monitoring',
        'Expert support team',
        'Performance optimization',
        'Incident response',
      ],
      popular: false,
      color: colors.navy,
    },
  ],
  'Resources': [
    {
      name: '1GB RAM',
      price: '5',
      description: 'Additional RAM for enhanced performance.',
      features: [
        'Instant activation',
        'Seamless integration',
        'No downtime required',
        'Stackable upgrade',
      ],
      popular: false,
      color: colors.lightBlue,
    },
    {
      name: '2 vCPU',
      price: '10',
      description: 'Extra CPU cores for demanding applications.',
      features: [
        'Dedicated cores',
        'Improved processing',
        'Better multitasking',
        'Instant activation',
      ],
      popular: true,
      color: colors.purple,
    },
    {
      name: '50GB SSD',
      price: '8',
      description: 'Additional NVMe storage space.',
      features: [
        'NVMe technology',
        'Fast read/write',
        'Expandable anytime',
        'No data migration',
      ],
      popular: false,
      color: colors.violet,
    },
    {
      name: 'Bandwidth Pack',
      price: '15',
      description: '1TB additional monthly bandwidth.',
      features: [
        '1TB extra transfer',
        'No throttling',
        'Global CDN included',
        'Automatic scaling',
      ],
      popular: false,
      color: colors.navy,
    },
  ],
  'Software': [
    {
      name: 'cPanel/WHM',
      price: '15',
      description: 'Industry-leading control panel for easy management.',
      features: [
        'Full cPanel access',
        'WHM included',
        'Auto-installer',
        'Email management',
        'DNS management',
        'File manager',
      ],
      popular: true,
      color: colors.purple,
    },
    {
      name: 'Plesk Panel',
      price: '12',
      description: 'Powerful alternative control panel.',
      features: [
        'Intuitive interface',
        'WordPress toolkit',
        'Multi-site management',
        'Security features',
      ],
      popular: false,
      color: colors.lightBlue,
    },
    {
      name: 'Softaculous',
      price: '3',
      description: '400+ one-click application installs.',
      features: [
        '400+ scripts',
        'Auto updates',
        'Staging environment',
        'Backup & restore',
      ],
      popular: false,
      color: colors.violet,
    },
    {
      name: 'LiteSpeed',
      price: '10',
      description: 'High-performance web server.',
      features: [
        '10x faster than Apache',
        'Built-in caching',
        'DDoS protection',
        'HTTP/3 support',
      ],
      popular: false,
      color: colors.navy,
    },
  ],
  'Security': [
    {
      name: 'DDoS Protection',
      price: '10',
      description: 'Enterprise-grade DDoS mitigation.',
      features: [
        'Layer 3-7 protection',
        'Automatic detection',
        'Zero downtime',
        '24/7 monitoring',
      ],
      popular: true,
      color: colors.purple,
    },
    {
      name: 'SSL Certificate',
      price: '0',
      description: 'Free Let\'s Encrypt SSL included.',
      features: [
        'Free SSL',
        'Auto-renewal',
        'Wildcard support',
        'Quick setup',
      ],
      popular: false,
      color: colors.lightBlue,
    },
    {
      name: 'Firewall Pro',
      price: '8',
      description: 'Advanced firewall protection.',
      features: [
        'Custom rules',
        'IP blocking',
        'Brute force protection',
        'Real-time alerts',
      ],
      popular: false,
      color: colors.violet,
    },
    {
      name: 'Malware Scanner',
      price: '5',
      description: 'Daily malware scanning and removal.',
      features: [
        'Daily scans',
        'Auto removal',
        'Quarantine system',
        'Email alerts',
      ],
      popular: false,
      color: colors.navy,
    },
  ],
  'Backups': [
    {
      name: 'Daily Backup',
      price: '5',
      description: 'Automatic daily backups with 7-day retention.',
      features: [
        'Daily snapshots',
        '7-day retention',
        'One-click restore',
        'Off-site storage',
      ],
      popular: true,
      color: colors.purple,
    },
    {
      name: 'Weekly Backup',
      price: '3',
      description: 'Weekly backups with 30-day retention.',
      features: [
        'Weekly snapshots',
        '30-day retention',
        'Easy restore',
        'Secure storage',
      ],
      popular: false,
      color: colors.lightBlue,
    },
    {
      name: 'Hourly Backup',
      price: '15',
      description: 'Enterprise hourly backups.',
      features: [
        'Hourly snapshots',
        '48-hour retention',
        'Instant restore',
        'Priority storage',
      ],
      popular: false,
      color: colors.violet,
    },
    {
      name: 'Custom Backup',
      price: '10',
      description: 'Customizable backup schedule.',
      features: [
        'Custom schedule',
        'Flexible retention',
        'Multiple destinations',
        'Encryption included',
      ],
      popular: false,
      color: colors.navy,
    },
  ],
  'Cloud': [
    {
      name: 'Cloud Starter',
      price: '29.99',
      description: 'Entry-level cloud hosting solution.',
      features: [
        '2 vCPU cores',
        '4GB RAM',
        '80GB NVMe SSD',
        '4TB bandwidth',
        'Auto-scaling ready',
        '99.99% uptime SLA',
      ],
      popular: false,
      color: colors.lightBlue,
    },
    {
      name: 'Cloud Pro',
      price: '59.99',
      description: 'Professional cloud infrastructure.',
      features: [
        '4 vCPU cores',
        '8GB RAM',
        '160GB NVMe SSD',
        '8TB bandwidth',
        'Load balancing',
        'Priority support',
      ],
      popular: true,
      color: colors.purple,
    },
    {
      name: 'Cloud Enterprise',
      price: '119.99',
      description: 'Enterprise-grade cloud solution.',
      features: [
        '8 vCPU cores',
        '16GB RAM',
        '320GB NVMe SSD',
        'Unlimited bandwidth',
        'Dedicated resources',
        'VIP support 24/7',
      ],
      popular: false,
      color: colors.violet,
    },
    {
      name: 'Cloud Custom',
      price: 'Custom',
      description: 'Tailored cloud infrastructure.',
      features: [
        'Custom resources',
        'Dedicated hardware',
        'Private network',
        'Custom SLA',
        'Dedicated account manager',
        'On-demand scaling',
      ],
      popular: false,
      color: colors.navy,
    },
  ],
  'Billing': [
    {
      name: 'Monthly',
      price: '0',
      description: 'Pay month-to-month with flexibility.',
      features: [
        'No long-term commitment',
        'Cancel anytime',
        'Full features access',
        'Standard support',
      ],
      popular: false,
      color: colors.lightBlue,
    },
    {
      name: 'Quarterly',
      price: '-5%',
      description: 'Save 5% with quarterly billing.',
      features: [
        '5% discount',
        '3-month commitment',
        'Priority support',
        'Price lock guarantee',
      ],
      popular: false,
      color: colors.violet,
    },
    {
      name: 'Annual',
      price: '-15%',
      description: 'Best value with annual billing.',
      features: [
        '15% discount',
        '12-month commitment',
        'Priority support',
        'Free domain included',
        'Price lock guarantee',
      ],
      popular: true,
      color: colors.purple,
    },
    {
      name: 'Biennial',
      price: '-25%',
      description: 'Maximum savings with 2-year plan.',
      features: [
        '25% discount',
        '24-month commitment',
        'VIP support',
        'Free domain included',
        'Dedicated account manager',
      ],
      popular: false,
      color: colors.navy,
    },
  ],
};

const categories = Object.keys(pricingData);

const categoryIcons: { [key: string]: React.ElementType } = {
  'VPS Hosting': Server,
  'Resources': Cpu,
  'Software': HardDrive,
  'Security': Shield,
  'Backups': Database,
  'Cloud': Cloud,
  'Billing': RefreshCw,
};

export default function PricingPage() {
  const [activeCategory, setActiveCategory] = useState('VPS Hosting');

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
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          {/* Badge */}
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wider uppercase"
            style={{ backgroundColor: `${colors.purple}10`, color: colors.purple, border: `1px solid ${colors.purple}20` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Zap className="w-4 h-4" />
            Flexible Pricing
          </motion.span>

          {/* Heading */}
          <motion.h1
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            style={{ color: colors.navy }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Choose Your Perfect{' '}
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${colors.purple}, ${colors.lightBlue})` }}
            >
              Plan
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            From VPS hosting to add-ons, find everything you need to power your online presence
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <Shield className="w-4 h-4" style={{ color: colors.purple }} />
              <span className="text-sm text-gray-600">Secure</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <Headphones className="w-4 h-4" style={{ color: colors.lightBlue }} />
              <span className="text-sm text-gray-600">24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== TABS ==================== */}
      <section className="relative pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            className="flex flex-wrap justify-center gap-2 md:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-full text-sm font-medium transition-all ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: isActive ? colors.purple : undefined,
                    boxShadow: isActive ? `0 10px 30px ${colors.purple}30` : undefined
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  {category}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==================== PRICING CARDS ==================== */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {pricingData[activeCategory as keyof typeof pricingData].map((plan, index) => (
                <PricingCard key={plan.name} plan={plan} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-center"
            style={{ background: `linear-gradient(135deg, ${colors.navy}, ${colors.purple})` }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div 
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Need a Custom Solution?
              </h2>
              <p className="mt-4 text-white/70 max-w-xl mx-auto">
                Contact our sales team for a tailored plan that fits your specific requirements
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 ">
                <Link href="/contact">
                  <motion.button
                    className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white font-semibold cursor-pointer"
                    style={{ color: colors.navy }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Sales
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white border-2 border-white/30 hover:bg-white/10  cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-16" />
    </div>
  );
}

// ==================== PRICING CARD ====================
function PricingCard({ plan, index }: { plan: any; index: number }) {
  return (
    <motion.div
      className={`relative bg-white rounded-3xl p-6 md:p-8 border-2 transition-all hover:shadow-xl ${
        plan.popular ? 'border-purple-400 shadow-lg' : 'border-gray-100 hover:border-gray-200'
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1"
          style={{ backgroundColor: colors.purple }}
        >
          <Star className="w-3 h-3" />
          Popular
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold" style={{ color: colors.navy }}>{plan.name}</h3>
        <p className="mt-2 text-sm text-gray-500 min-h-[40px]">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        {plan.price === 'Custom' ? (
          <span className="text-3xl md:text-4xl font-bold" style={{ color: colors.navy }}>Custom</span>
        ) : plan.price.startsWith('-') ? (
          <span className="text-3xl md:text-4xl font-bold" style={{ color: colors.purple }}>{plan.price}</span>
        ) : (
          <>
            <span className="text-3xl md:text-4xl font-bold" style={{ color: colors.navy }}>${plan.price}</span>
            <span className="text-gray-500">/ month</span>
          </>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link href="/contact">
        <motion.button
          className={`w-full py-3 rounded-full font-semibold transition-all cursor-pointer ${
            plan.popular 
              ? 'text-white' 
              : 'border-2 hover:bg-gray-50'
          }`}
          style={{ 
            backgroundColor: plan.popular ? colors.purple : 'transparent',
            borderColor: plan.popular ? undefined : colors.navy,
            color: plan.popular ? 'white' : colors.navy,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
      </Link>
    </motion.div>
  );
}