'use client';
import MinecraftBlock from './MinecraftBlock';
import {
  Code2, Database, Wrench, Layers, Terminal, Cpu,
  LineChart, Server, GitBranch, Globe2, FileSpreadsheet
} from 'lucide-react';

const skillCategories = [
  {
    group: 'Languages',
    icon: Code2,
    items: ['Python', 'Java', 'SQL', 'JavaScript']
  },
  {
    group: 'Frameworks & ML',
    icon: Layers,
    items: ['React.js', 'Next.js', 'TailwindCSS', 'Pandas', 'XGBoost']
  },
  {
    group: 'Databases',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'Supabase']
  },
  {
    group: 'Tools & Platforms',
    icon: Wrench,
    items: ['Tableau', 'Excel', 'Git', 'GitHub', 'Vercel']
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="animate-on-scroll mb-14">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl" style={{ color: 'var(--text)' }}>
            About Me
          </h2>
          <div className="mt-4 w-12 h-0.5" style={{ background: 'var(--accent)', opacity: 0.6 }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: bio ── */}
          <div className="space-y-5 animate-on-scroll stagger-1">
            <p className="text-[15px] sm:text-base leading-relaxed text-vapor/90">
              The part of tech I enjoy most is reaching the point where something that once felt complicated starts to feel obvious. I like understanding ideas deeply enough that I can explain them simply, because that&apos;s when I know I&apos;ve really understood them. Whether I&apos;m building software, analysing data or exploring something completely new, I&apos;m far more interested in understanding <em className="not-italic text-cyan/80">why</em> something works before figuring out how to use it.
            </p>
            <p className="text-[15px] sm:text-base leading-relaxed text-vapor/75">
              That mindset shapes the way I approach every project. I enjoy asking questions, experimenting with different ideas and gradually building an intuition for how things work. I&apos;ve learnt not to rush that process. Some of the most rewarding moments have come from finally understanding something that felt completely out of reach just a few days earlier.
            </p>
            <p className="text-[15px] sm:text-base leading-relaxed text-vapor/75">
              During the semester, I&apos;m an <span className="text-cyan font-medium">ENGO Peer Mentor</span> and help organise events through the <span className="text-cyan font-medium">University of Sydney Robotics Club</span>, both of which have reminded me how much I enjoy learning alongside other people. Outside of uni, you&apos;ll usually find me following Formula 1, the NBA or football, watching a good movie or exploring a new café with friends.
            </p>
            <p className="text-[15px] sm:text-base leading-relaxed text-vapor/85 pt-1">
              As I begin my career, I hope to keep becoming someone who&apos;s comfortable asking better questions, learning continuously and turning complex problems into simple, thoughtful solutions. I&apos;m currently looking for internship opportunities across software engineering, AI and data roles. Always open to research opportunities and everything in between.
            </p>
          </div>

          {/* ── Right: minecraft + skills ── */}
          <div className="space-y-10 animate-on-scroll stagger-2">

            {/* Minecraft block */}
            <div className="flex flex-col items-center justify-center p-8 bg-graphite border border-white/5 rounded-2xl">
              <MinecraftBlock />
              <p className="text-[11px] text-muted/50 mt-5 text-center select-none tracking-wide">
                Click to mine · Drag to rotate
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-5 bg-graphite border border-white/5 rounded-2xl p-6">
              <p className="text-xs text-muted uppercase tracking-wider mb-2 select-none font-mono">
                Tech Stack &amp; Skills
              </p>
              <div className="space-y-4">
                {skillCategories.map(cat => {
                  const CatIcon = cat.icon;
                  return (
                    <div key={cat.group} className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--accent)' }}>
                        <CatIcon size={14} />
                        <span className="font-medium tracking-wide uppercase">{cat.group}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pl-2">
                        {cat.items.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 hover:border-cyan/40 hover:text-cyan"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(240,232,216,0.08)',
                              color: 'var(--text)',
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan/60" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
