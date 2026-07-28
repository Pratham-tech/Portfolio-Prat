'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import ParticleField from './ParticleField';

const skills = ['Python', 'SQL', 'React', 'Next.js', 'Data Analysis', 'Machine Learning'];

const TAGLINE = "Dalyell Scholar bringing data and engineering ideas into existence. I'm always open to new experiences and I'm currently seeking internship opportunities in data analytics, AI, software development and related roles.";
const CHAR_MS = 22;
const START_DELAY = 1500;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);
  const [typed, setTyped] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setMounted(true);
    skills.forEach((_, i) => {
      setTimeout(() => setVisibleSkills(p => [...p, i]), 900 + i * 110);
    });
  }, []);

  useEffect(() => {
    let ci = 0, interval: ReturnType<typeof setInterval>;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        ci++;
        setTyped(TAGLINE.slice(0, ci));
        if (ci >= TAGLINE.length) {
          clearInterval(interval);
          setTypingDone(true);
          setTimeout(() => setShowCursor(false), 2500);
        }
      }, CHAR_MS);
    }, START_DELAY);
    return () => { clearTimeout(timer); clearInterval(interval); setTyped(''); setTypingDone(false); setShowCursor(true); };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          {/* ── Left content ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Name */}
            <h1 className={`font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] transition-all duration-700 delay-100
                           ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ color: 'var(--text)' }}
            >
              Pratham<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent), #A87E38)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>Dang</span>
              <span style={{ color: 'var(--accent)' }}>.</span>
            </h1>

            {/* Subtitle */}
            <p className={`font-mono text-sm sm:text-base transition-all duration-700 delay-200
                          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ color: 'rgba(212,168,83,0.75)' }}
            >
              Computational Data Science &amp; Business Analytics @ USYD
            </p>

            {/* Typewriter */}
            <div className={`min-h-[5rem] sm:min-h-[3.5rem] transition-opacity duration-500 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-[15px] sm:text-base leading-relaxed max-w-xl" style={{ color: 'var(--muted)' }}>
                {typed}
                {showCursor && (
                  <span className={`inline-block w-[2px] h-[1.1em] ml-0.5 align-middle ${typingDone ? 'animate-blink' : ''}`}
                    style={{ background: 'var(--accent)', verticalAlign: 'text-bottom' }}
                  />
                )}
              </p>
            </div>

            {/* Skills — clean, minimalist inline list separated by dots */}
            <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {skills.map((s, i) => (
                <div key={s}
                  className={`flex items-center gap-3 transition-all duration-500 ${visibleSkills.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                >
                  {i > 0 && <span className="text-amber/30 font-mono select-none text-xs">·</span>}
                  <span className="font-mono text-xs sm:text-sm tracking-wide text-muted select-none">
                    {s}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#C49840')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
              >
                View Projects
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm rounded-lg transition-all duration-200"
                style={{ border: '1px solid rgba(240,232,216,0.13)', color: 'var(--text)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,168,83,0.4)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,232,216,0.13)'; e.currentTarget.style.color = 'var(--text)'; }}
              >
                Get in Touch
              </a>
            </div>

            {/* Socials */}
            <div className={`flex flex-wrap items-center gap-3 transition-all duration-700 delay-[600ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {[
                { href: 'https://github.com/Pratham-tech', icon: <Github size={16} />, label: 'GitHub', accent: '#10B981', hoverBg: 'rgba(16,185,129,0.08)', hoverBorder: 'rgba(16,185,129,0.35)', external: true },
                { href: 'https://www.linkedin.com/in/pratham-dang', icon: <Linkedin size={16} />, label: 'LinkedIn', accent: '#3B82F6', hoverBg: 'rgba(59,130,246,0.08)', hoverBorder: 'rgba(59,130,246,0.35)', external: true },
                { href: 'mailto:prathamdangboy@gmail.com', icon: <Mail size={16} />, label: 'Email', accent: '#D4A853', hoverBg: 'rgba(212,168,83,0.08)', hoverBorder: 'rgba(212,168,83,0.35)', external: false },
                { href: 'tel:+61450336381', icon: <Phone size={16} />, label: 'Phone', accent: '#10B981', hoverBg: 'rgba(16,185,129,0.08)', hoverBorder: 'rgba(16,185,129,0.35)', external: false },
              ].map(s => (
                <a key={s.label} href={s.href}
                  target={s.external ? '_blank' : undefined}
                  rel={s.external ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className="group flex items-center gap-2 px-3.5 py-2 rounded-xl text-muted text-xs transition-all duration-300 ease-out"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid rgba(240,232,216,0.08)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = s.hoverBg;
                    e.currentTarget.style.borderColor = s.hoverBorder;
                    e.currentTarget.style.color = s.accent;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.25), 0 0 0 1px ${s.hoverBorder}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--surface)';
                    e.currentTarget.style.borderColor = 'rgba(240,232,216,0.08)';
                    e.currentTarget.style.color = 'var(--muted)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span className="transition-colors duration-300">{s.icon}</span>
                  <span className="hidden sm:inline font-medium select-none">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Photo ── */}
          <div className={`lg:col-span-2 flex justify-center lg:justify-end transition-all duration-1000 delay-300
                          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative w-64 sm:w-72 lg:w-80">
              {/* Ambient warm glow behind photo */}
              <div className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.08), transparent 70%)' }}
              />
              {/* Photo slot — replace the div below with <Image src="/profile.jpg" ...> */}
              <div className="relative w-full rounded-2xl overflow-hidden photo-blend"
                style={{ aspectRatio: '4/5' }}>
                <img src="/profile2.jpg" alt="Pratham Dang" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.35 }}>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </div>
    </section>
  );
}
