'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle,
  Server,
  Settings,
  Shield,
  Network,
  Headphones,
  CreditCard,
  ChevronDown,
  CheckCircle,
  Zap,
  Search,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

const colors = {
  purple: '#7B2D8E',
  violet: '#8B5CF6',
  lightBlue: '#5BC0EB',
  navy: '#1E3A5F',
};

const categories = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'vps', label: 'VPS Hosting', icon: Server },
  { id: 'control', label: 'Control Panels & OS', icon: Settings },
  { id: 'security', label: 'Security & Backups', icon: Shield },
  { id: 'network', label: 'IP & Networking', icon: Network },
  { id: 'support', label: 'Support & Management', icon: Headphones },
  { id: 'billing', label: 'Billing & Licenses', icon: CreditCard }
];

const faqs = [
  // VPS Hosting
  {
    category: 'vps',
    question: 'What is VPS hosting?',
    answer: 'A VPS (Virtual Private Server) is a virtual machine that runs its own operating system and resources. It offers more control, power, and isolation than shared hosting.',
    color: colors.purple
  },
  {
    category: 'vps',
    question: "What's the difference between Standard, Quasar, and Turbo VPS?",
    answer: 'standard-quasar-turbo',
    color: colors.purple
  },
  {
    category: 'vps',
    question: 'Can I upgrade my VPS plan later?',
    answer: 'Yes, you can upgrade your CPU, RAM, storage, and bandwidth at any time — with no downtime.',
    color: colors.purple
  },

  // Control Panels & OS
  {
    category: 'control',
    question: 'Which control panels do you offer?',
    answer: 'We support cPanel/WHM, Plesk, and Interworx, depending on your OS and preference.',
    color: colors.violet
  },
  {
    category: 'control',
    question: 'What operating systems are available?',
    answer: 'os-list',
    color: colors.violet
  },
  {
    category: 'control',
    question: 'Can I install my own software or OS?',
    answer: "Yes — with full root access, you're free to install custom applications or re-install your preferred OS.",
    color: colors.violet
  },

  // Security & Backups
  {
    category: 'security',
    question: 'Do you provide SSL certificates?',
    answer: 'Yes! Free SSL certificates are included with all hosting plans.',
    color: colors.lightBlue
  },
  {
    category: 'security',
    question: 'Is DDoS protection included?',
    answer: 'Yes. All plans include basic DDoS protection. Turbo VPS plans come with enhanced protection.',
    color: colors.lightBlue
  },
  {
    category: 'security',
    question: 'Are backups included?',
    answer: 'We offer automated daily backups and on-demand snapshots. Additional backup storage is available as an add-on.',
    color: colors.lightBlue
  },

  // IP & Networking
  {
    category: 'network',
    question: 'Do I get a dedicated IP?',
    answer: 'Yes, each VPS comes with at least one dedicated IPv4 address. Additional IPs are available.',
    color: colors.navy
  },
  {
    category: 'network',
    question: 'Is IPv6 supported?',
    answer: 'Yes, we offer native IPv6 support on all VPS plans.',
    color: colors.navy
  },
  {
    category: 'network',
    question: 'Can I use private networking?',
    answer: 'Yes. You can set up private/internal networks between your VPS instances for secure, internal communication.',
    color: colors.navy
  },

  // Support & Management
  {
    category: 'support',
    question: 'Is support available 24/7?',
    answer: 'Yes, our technical support team is available 24/7/365.',
    color: colors.purple
  },
  {
    category: 'support',
    question: 'Do you offer managed services?',
    answer: 'Yes. We offer Managed VPS plans where we take care of updates, security patches, and performance tuning.',
    color: colors.purple
  },
  {
    category: 'support',
    question: 'Can you migrate my website or server?',
    answer: 'Absolutely. We offer free migration services for new clients.',
    color: colors.purple
  },

  // Billing & Licenses
  {
    category: 'billing',
    question: 'Which payment methods do you accept?',
    answer: 'We accept major credit/debit cards, PayPal, and select cryptocurrencies.',
    color: colors.violet
  },
  {
    category: 'billing',
    question: 'Can I bundle a domain with my hosting?',
    answer: 'Yes! We offer domain registration and hosting bundles for convenience and savings.',
    color: colors.violet
  },
  {
    category: 'billing',
    question: 'Do you provide licenses for cPanel or Plesk?',
    answer: 'Yes, you can add cPanel, Plesk, and Softaculous licenses to your plan at discounted prices.',
    color: colors.violet
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          {/* Badge */}
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wider uppercase"
            style={{ backgroundColor: `${colors.purple}10`, color: colors.purple, border: `1px solid ${colors.purple}20` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <HelpCircle className="w-4 h-4" />
            Help Center
          </motion.span>

          {/* Heading */}
          <motion.h1
            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            style={{ color: colors.navy }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Frequently Asked{' '}
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${colors.purple}, ${colors.lightBlue})` }}
            >
              Questions
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Everything you need to know about our VPS hosting services
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="mt-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:border-purple-300 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-gray-700 placeholder-gray-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="relative pb-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div 
            className="flex flex-wrap justify-center gap-2 md:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setOpenQuestion(null);
                  }}
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
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ LIST ==================== */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No questions found matching your search.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                    className="mt-4 text-purple-600 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <FAQItem 
                    key={index}
                    faq={faq}
                    index={index}
                    isOpen={openQuestion === index}
                    onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ==================== STILL HAVE QUESTIONS ==================== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden p-8 md:p-12"
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

            <div className="relative z-10 text-center">
              <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Still Have Questions?
              </h2>
              <p className="mt-4 text-white/70 max-w-xl mx-auto">
                Can't find what you're looking for? Our support team is here to help 24/7.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white font-semibold"
                  style={{ color: colors.navy }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Headphones className="w-5 h-5" />
                  Contact Support
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white border-2 border-white/30 hover:bg-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Live Chat
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== QUICK LINKS ==================== */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: colors.navy }}>
              Quick Links
            </h2>
            <p className="mt-2 text-gray-500">Popular resources to get you started</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Getting Started',
                description: 'Learn the basics of setting up your VPS',
                link: '#',
                color: colors.purple
              },
              {
                icon: Server,
                title: 'Server Management',
                description: 'Tips for managing your server efficiently',
                link: '#',
                color: colors.lightBlue
              },
              {
                icon: Shield,
                title: 'Security Best Practices',
                description: 'Keep your server and data secure',
                link: '#',
                color: colors.violet
              }
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href={item.link}
                className="group bg-[#fafafa] rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.navy }}>{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium" style={{ color: item.color }}>
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-16 bg-[#fafafa]" />
    </div>
  );
}

// ==================== FAQ ITEM COMPONENT ====================
function FAQItem({ faq, index, isOpen, onClick }: { 
  faq: typeof faqs[0]; 
  index: number; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  const renderAnswer = () => {
    if (faq.answer === 'standard-quasar-turbo') {
      return (
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: faq.color }} />
            <span><strong>Standard:</strong> Ideal for small websites and dev environments.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: faq.color }} />
            <span><strong>Quasar:</strong> Great for medium apps needing more performance.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: faq.color }} />
            <span><strong>Turbo:</strong> Designed for high-traffic, resource-heavy apps.</span>
          </li>
        </ul>
      );
    }
    
    if (faq.answer === 'os-list') {
      return (
        <ul className="space-y-2">
          {['CentOS 7 / 8', 'Ubuntu 20.04 / 22.04', 'Debian', 'AlmaLinux', 'Windows Server (with optional licensing)'].map((os) => (
            <li key={os} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: faq.color }} />
              <span>{os}</span>
            </li>
          ))}
        </ul>
      );
    }
    
    return <p>{faq.answer}</p>;
  };

  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: faq.color }}
          />
          <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-gray-600 border-t border-gray-50"
              style={{ borderLeftWidth: '3px', borderLeftColor: faq.color, marginLeft: '1.25rem', paddingLeft: '1.25rem' }}
            >
              <div className="pt-4">
                {renderAnswer()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}