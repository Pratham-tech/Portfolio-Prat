'use client';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 py-12" style={{ borderTop:'1px solid rgba(240,232,216,0.06)' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-lg" style={{ color:'var(--text)' }}>
            Pratham Dang<span style={{ color:'var(--accent)' }}>.</span>
          </p>
          <p className="font-mono text-xs mt-1" style={{ color:'var(--muted)' }}>
            Sydney, NSW · Singapore
          </p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon:<Github size={15}/>, href:'https://github.com/Pratham-tech', label:'GitHub', hoverLabel: 'github', color: 'hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/5' },
            { icon:<Linkedin size={15}/>, href:'https://www.linkedin.com/in/pratham-dang', label:'LinkedIn', hoverLabel: 'linkedin', color: 'hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/5' },
            { icon:<Mail size={15}/>, href:'mailto:prathamdangboy@gmail.com', label:'Email', hoverLabel: 'email', color: 'hover:border-amber/40 hover:text-amber hover:bg-amber-soft' },
            { icon:<Phone size={15}/>, href:'tel:+61450336381', label:'Phone', hoverLabel: 'phone', color: 'hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/5' },
          ].map(s => (
            <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={s.label}
              className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/5 bg-surface/30 text-muted transition-all duration-300 ${s.color}`}
            >
              {s.icon}
              <span className="max-w-0 overflow-hidden font-mono text-[9px] font-semibold uppercase tracking-wider transition-all duration-300 group-hover:max-w-[80px] select-none">
                {s.hoverLabel}
              </span>
            </a>
          ))}
        </div>

        <p className="font-mono text-xs" style={{ color:'rgba(138,128,117,0.5)' }}>
          © {new Date().getFullYear()} Pratham Dang. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
