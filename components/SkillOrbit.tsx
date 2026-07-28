'use client';

import { useEffect, useRef, useState } from 'react';

const orbitSkills = [
  { label: 'Python', icon: '🐍' },
  { label: 'React', icon: '⚛️' },
  { label: 'SQL', icon: '🗃️' },
  { label: 'Next.js', icon: '▲' },
  { label: 'ML', icon: '🧠' },
  { label: 'Java', icon: '☕' },
  { label: 'TypeScript', icon: 'TS' },
  { label: 'Pandas', icon: '🐼' },
];

export default function SkillOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const radius = 130;
  const count = orbitSkills.length;

  return (
    <div
      ref={containerRef}
      className="relative w-[320px] h-[320px] mx-auto"
      style={{ perspective: '800px' }}
    >
      {/* Central core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center
                     border border-cyan/30 bg-graphite/80 backdrop-blur-sm"
          style={{
            boxShadow: '0 0 30px rgba(0,186,194,0.15), 0 0 60px rgba(0,186,194,0.05)',
          }}
        >
          <span className="font-display font-bold text-cyan text-lg">PD</span>
        </div>
        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-full border border-cyan/20 animate-ping"
          style={{ animationDuration: '3s' }}
        />
      </div>

      {/* Orbit ring (visual) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
        style={{ width: radius * 2 + 20, height: radius * 2 + 20 }}
      />

      {/* Skill nodes */}
      {orbitSkills.map((skill, i) => {
        const angle = (i / count) * 360;
        const isHovered = hovered === i;

        return (
          <div
            key={skill.label}
            className="absolute top-1/2 left-1/2 z-20"
            style={{
              animation: mounted ? `orbit-spin 25s linear infinite` : 'none',
              animationDelay: `${-(i / count) * 25}s`,
              animationPlayState: hovered !== null ? 'paused' : 'running',
            }}
          >
            <div
              className={`
                -translate-x-1/2 -translate-y-1/2 cursor-default
                transition-all duration-300 ease-out
              `}
              style={{
                transform: `translateX(${radius}px) rotate(0deg)`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`
                  flex items-center gap-2 rounded-full px-3 py-1.5
                  border transition-all duration-300
                  ${isHovered
                    ? 'bg-graphite border-cyan/50 shadow-lg shadow-cyan/10 scale-110'
                    : 'bg-graphite/60 border-white/10 scale-100'
                  }
                `}
                style={{
                  // Counter-rotate so text stays readable
                  animation: mounted ? `orbit-counter-spin 25s linear infinite` : 'none',
                  animationDelay: `${-(i / count) * 25}s`,
                  animationPlayState: hovered !== null ? 'paused' : 'running',
                }}
              >
                <span className="text-sm">{skill.icon}</span>
                <span
                  className={`font-mono text-xs whitespace-nowrap transition-colors duration-200
                              ${isHovered ? 'text-cyan' : 'text-muted'}`}
                >
                  {skill.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes orbit-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
