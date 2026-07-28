'use client';
import { useState } from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'prathamdangboy@gmail.com',
    href: 'mailto:prathamdangboy@gmail.com',
    accent: '#D4A853',
    hoverBg: 'rgba(212,168,83,0.06)',
    hoverBorder: 'rgba(212,168,83,0.35)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/pratham-dang',
    href: 'https://www.linkedin.com/in/pratham-dang',
    accent: '#3B82F6',
    hoverBg: 'rgba(59,130,246,0.06)',
    hoverBorder: 'rgba(59,130,246,0.35)',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Pratham-tech',
    href: 'https://github.com/Pratham-tech',
    accent: '#10B981',
    hoverBg: 'rgba(16,185,129,0.06)',
    hoverBorder: 'rgba(16,185,129,0.35)',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+65 96607805',
    href: 'tel:+6596607805',
    accent: '#10B981',
    hoverBg: 'rgba(16,185,129,0.06)',
    hoverBorder: 'rgba(16,185,129,0.35)',
  },
];

export default function Contact() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="animate-on-scroll mb-16 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-vapor">
            Let&apos;s Connect
          </h2>
          <div className="mt-4 w-12 h-0.5 mx-auto" style={{ background: 'var(--accent)', opacity: 0.5 }} />
          <p className="mt-6 text-muted max-w-lg leading-relaxed text-[15px] sm:text-base mx-auto">
            I&apos;m always happy to chat about internship opportunities, research collaborations, or anything that sounds interesting.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-on-scroll stagger-1">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            const isHovered = hovered === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setHovered(link.label)}
                onMouseLeave={() => setHovered(null)}
                className="group flex items-center gap-5 p-5 rounded-xl transition-all duration-400 ease-out"
                style={{
                  background: isHovered ? link.hoverBg : 'var(--surface)',
                  border: `1px solid ${isHovered ? link.hoverBorder : 'rgba(240,232,216,0.07)'}`,
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: isHovered ? `0 8px 30px rgba(0,0,0,0.25), 0 0 0 1px ${link.hoverBorder}` : 'none',
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-400"
                  style={{
                    background: isHovered ? `${link.accent}18` : 'rgba(212,168,83,0.08)',
                    border: `1px solid ${isHovered ? `${link.accent}40` : 'rgba(212,168,83,0.15)'}`,
                  }}
                >
                  <Icon
                    size={19}
                    className="transition-colors duration-400"
                    style={{ color: isHovered ? link.accent : 'var(--accent)' }}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-medium uppercase tracking-wider mb-1 transition-colors duration-400"
                    style={{ color: isHovered ? link.accent : 'var(--muted)' }}
                  >
                    {link.label}
                  </p>
                  <p className="text-vapor text-sm truncate">{link.value}</p>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  size={16}
                  className="flex-shrink-0 transition-all duration-300"
                  style={{
                    color: isHovered ? link.accent : 'var(--muted)',
                    opacity: isHovered ? 1 : 0.4,
                    transform: isHovered ? 'translate(1px, -1px)' : 'translate(0, 0)',
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
