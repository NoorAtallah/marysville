'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
  MessageSquare,
  Clock,
  Globe
} from 'lucide-react';

const colors = {
  purple: '#7B2D8E',
  violet: '#8B5CF6',
  lightBlue: '#5BC0EB',
  navy: '#1E3A5F',
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@marysville.es',
    href: 'mailto:info@marysville.es',
    color: colors.purple,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    color: colors.lightBlue,
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Business Center, 4th Floor',
    subvalue: 'Barcelona, Spain',
    color: colors.violet,
  },
];

const supportHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM CET' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM CET' },
  { day: 'Sunday', hours: 'Closed' },
];

export default function ContactPage() {
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
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${colors.purple}10`, color: colors.purple }}
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            >
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </motion.span>

            <motion.h1
              className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
              style={{ color: colors.navy }}
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Contact
              <br />
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.purple}, ${colors.lightBlue})` }}
              >
                Our Team
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              We're here to help. Reach out to us through any of the channels below and we'll get back to you as soon as possible.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT INFO CARDS ==================== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>

                  {/* Label */}
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                    {item.label}
                  </p>

                  {/* Value */}
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="block text-xl md:text-2xl font-bold mb-1 hover:opacity-70 transition-opacity"
                      style={{ color: colors.navy }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p 
                      className="text-xl md:text-2xl font-bold mb-1"
                      style={{ color: colors.navy }}
                    >
                      {item.value}
                    </p>
                  )}

                  {/* Subvalue */}
                  {item.subvalue && (
                    <p className="text-sm text-gray-500">{item.subvalue}</p>
                  )}

                  {/* Bottom accent line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl transition-all"
                    style={{ 
                      backgroundColor: item.color,
                      transform: 'scaleX(0)',
                    }}
              
                  
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== SUPPORT HOURS ==================== */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Hours */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${colors.purple}15` }}
                >
                  <Clock className="w-6 h-6" style={{ color: colors.purple }} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.navy }}>
                  Support Hours
                </h2>
              </div>

              <div className="space-y-4">
                {supportHours.map((schedule, index) => (
                  <motion.div
                    key={schedule.day}
                    className="flex items-center justify-between p-4 rounded-2xl bg-[#fafafa] border border-gray-100"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-medium" style={{ color: colors.navy }}>
                      {schedule.day}
                    </span>
                    <span className="text-gray-500">{schedule.hours}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl"
                style={{ backgroundColor: `${colors.lightBlue}10`, borderLeft: `4px solid ${colors.lightBlue}` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-3">
                  <Send className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: colors.lightBlue }} />
                  <div>
                    <p className="font-semibold mb-1" style={{ color: colors.navy }}>
                      Emergency Support
                    </p>
                    <p className="text-sm text-gray-600">
                      For critical issues outside business hours, our emergency support team is available 24/7.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80" 
                  alt="Support Team" 
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: colors.purple }}
                    >
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg" style={{ color: colors.navy }}>
                        Global Support
                      </p>
                      <p className="text-sm text-gray-600">
                        Available in 15+ languages
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== LOCATION MAP (Optional placeholder) ==================== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] bg-gray-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Map placeholder - you can replace this with actual map integration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: colors.purple }} />
                <p className="text-xl font-semibold" style={{ color: colors.navy }}>
                  Business Center, 4th Floor
                </p>
                <p className="text-gray-500">Barcelona, Spain</p>
              </div>
            </div>
            
            {/* You can integrate Google Maps or similar here */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" 
              alt="Barcelona" 
              className="w-full h-full object-cover opacity-30"
            />
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: colors.navy }}>
              Ready to Get Started?
            </h2>
            <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto">
              Explore our hosting plans and find the perfect solution for your needs
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing">
                <motion.button
                  className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-semibold"
                  style={{ backgroundColor: colors.purple }}
                  whileHover={{ scale: 1.05, boxShadow: `0 20px 50px ${colors.purple}40` }}
                >
                  View Pricing Plans
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold border-2"
                  style={{ borderColor: colors.navy, color: colors.navy }}
                  whileHover={{ scale: 1.05, backgroundColor: `${colors.navy}08` }}
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-16 bg-[#fafafa]" />
    </div>
  );
}