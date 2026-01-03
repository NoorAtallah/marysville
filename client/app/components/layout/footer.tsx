'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  ExternalLink
} from 'lucide-react';

const colors = {
  purple: '#7B2D8E',
  violet: '#8B5CF6',
  lightBlue: '#5BC0EB',
  navy: '#1E3A5F',
};

export function Footer() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing Plans', href: '/pricing' },
    { name: 'About Us', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ];



  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'SLA', href: '/sla' },
  ];

  const partner = {
    name: 'Flow Spanish',
    logo: '/2.jpg',
    url: 'https://flowspanish.com',
    description: 'Learn Arabic with experts',
  };

  const contactInfo = {
    email: 'info@marysville.es',
    phone: '+1 (555) 123-4567',
    address: 'Business Center, 4th Floor',
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
  ];

  return (
    <footer className="bg-[#fafafa] border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-8">
        {/* Top Section - CTA */}
        <motion.div 
          className="relative rounded-3xl p-8 md:p-12 mb-16 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${colors.navy}, ${colors.purple})` }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Pattern */}
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
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to get started?</h3>
              <p className="text-white/60 mt-2">Join thousands of developers building on Marysville</p>
            </div>
            <Link
              href="/pricing"
              className="group flex items-center gap-2 px-8 py-4 bg-white rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg"
              style={{ color: colors.navy }}
            >
              View Plans
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/1.png"
                alt="Marysville Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span 
                className="text-xl font-bold"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.purple}, ${colors.lightBlue})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                MARYSVILLE
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Enterprise-grade VPS hosting solutions designed for developers, businesses, and innovators. Powered by cutting-edge infrastructure with 99.9% uptime guarantee.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              {['Secure', 'Fast', 'Reliable'].map((badge) => (
                <span 
                  key={badge}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${colors.purple}15`, color: colors.purple }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: colors.navy }}>Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

     

          {/* Contact */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-semibold mb-4" style={{ color: colors.navy }}>Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-gray-500 hover:text-gray-900 text-sm transition-colors group"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${colors.purple}10` }}
                  >
                    <Mail className="w-5 h-5" style={{ color: colors.purple }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="group-hover:text-gray-900 transition-colors">{contactInfo.email}</p>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-3 text-gray-500 hover:text-gray-900 text-sm transition-colors group"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${colors.lightBlue}15` }}
                  >
                    <Phone className="w-5 h-5" style={{ color: colors.lightBlue }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="group-hover:text-gray-900 transition-colors">{contactInfo.phone}</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${colors.violet}15` }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: colors.violet }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Office</p>
                    <p>{contactInfo.address}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Partner Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Our Partner</span>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={32}
                  height={32}
                  className="rounded-lg object-contain"
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.navy }}>{partner.name}</p>
                  <p className="text-xs text-gray-400">{partner.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md text-gray-400 hover:text-gray-600 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} MARYSVILLE. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
       
        </div>
      </div>
    </footer>
  );
}