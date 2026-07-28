'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState('home');
  const [progress, setProgress]     = useState(0);
  const navRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });

  const updatePill = useCallback(() => {
    if (!navRef.current) return;
    const el = navRef.current.querySelector(`[data-id="${active}"]`) as HTMLElement;
    if (el) {
      const nr = navRef.current.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      setPill({ left: er.left - nr.left, width: er.width, opacity: 1 });
    }
  }, [active]);

  useEffect(() => { updatePill(); }, [active, updatePill]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(dh > 0 ? (window.scrollY / dh) * 100 : 0);
      const ids = ['home','about','experience','projects','achievements','contact'];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 110) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="reading-progress" style={{ width: `${progress}%` }} />

      <header
        className="fixed z-50 transition-all duration-500"
        style={scrolled
          ? { top:'12px', left:'50%', transform:'translateX(-50%)', width:'min(800px,calc(100vw - 32px))' }
          : { top:0, left:0, right:0, width:'100%' }}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'navbar-floating px-5 h-14' : 'px-6 h-16'
          }`}
          style={!scrolled ? { maxWidth:'100%' } : {}}
        >
          {/* Logo */}
          <a href="#home" className="flex-shrink-0">
            <Image src="/logo-t.png" alt="PD." width={48} height={28}
              className="object-contain"
              style={{ filter: 'drop-shadow(0 0 6px rgba(212,168,83,0.35))' }}
            />
          </a>

          {/* Desktop nav */}
          <ul ref={navRef} className="hidden md:flex items-center gap-0.5 relative">
            {scrolled && (
              <div className="nav-pill" style={{ left: pill.left, width: pill.width, opacity: pill.opacity }} />
            )}
            {links.map(l => {
              const id = l.href.slice(1);
              return (
                <li key={l.href}>
                  <a href={l.href} data-id={id}
                    className={`px-3 py-2 text-sm transition-colors duration-200 rounded-full
                      ${active===id ? 'text-amber-DEFAULT' : 'text-muted hover:text-vapor'}`}
                    style={{ color: active===id ? 'var(--accent)' : undefined }}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <a href="#contact"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm border rounded-full
                       transition-all duration-200"
            style={{ borderColor:'rgba(212,168,83,0.35)', color:'var(--accent)' }}
            onMouseEnter={e => (e.currentTarget.style.background='rgba(212,168,83,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background='transparent')}
          >
            Get in Touch
          </a>

          {/* Mobile */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden" style={{ color:'var(--muted)' }} aria-label="Menu"
          >
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </nav>

        {mobileOpen && (
          <div className="md:hidden mt-2 mx-4 rounded-2xl px-6 py-5 flex flex-col gap-3"
            style={{ background:'rgba(15,12,8,0.94)', border:'1px solid rgba(212,168,83,0.12)', backdropFilter:'blur(20px)' }}
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="text-sm py-1 transition-colors"
                style={{ color:'var(--muted)' }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
