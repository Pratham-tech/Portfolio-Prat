'use client';

import { useState, useRef, MouseEvent } from 'react';
import { Github, ExternalLink, TrendingUp, Users, BarChart3, Trophy, Brain } from 'lucide-react';

const projects = [
  {
    number: '01',
    title: 'Formula 1 Race Result Predictor',
    tagline: 'Pre-race probability estimation model with time-series backtesting',
    problem:
      'F1 race outcomes are highly dynamic and influenced by hidden signals like driver form, team momentum, and circuit history. Traditional analytics struggle to quantify these pre-race factors into reliable, probability-based predictions.',
    solution:
      'Engineered a machine learning pipeline using XGBoost that processes historical data from the Jolpica API. I developed 13 predictive features—quantifying recent team momentum and weighted driver form—and validated it via time-series backtesting. The model achieved a top-pick accuracy of 85.7% (6/7 winner predictions) and predicted podium finishes with 100% accuracy.',
    stack: ['Python', 'REST APIs', 'XGBoost', 'Pandas', 'Time-Series'],
    features: [
      'Retrieves F1 race and qualification results from Jolpica API (2022-2026 seasons)',
      'Estimates each driver’s pre-race win, podium, and top 10 finish probabilities',
      'Developed 13 pre-race input features including exponentially weighted recent form and team momentum',
      'Cross-validated on 2026 races: top pick was the actual winner 6/7 times, actual winner podiumed 7/7 times',
    ],
    github: 'https://github.com/Pratham-tech/F1-race-predictor',
    icon: Trophy,
    accent: '#D4A853', // Gold for featured
    highlight: true,
  },
  {
    number: '02',
    title: 'Provenance: AI Research Assistant',
    tagline: 'Multi-agent system for synthesized, fully cited research reports',
    problem:
      'Standard AI LLMs often hallucinate or fail to verify their claims across multiple sources, rendering them unreliable for thorough academic or business research where facts must be verified and cited.',
    solution:
      'Developed an autonomous multi-agent research platform utilizing the Gemini API and Pydantic. The system splits research tasks across specialized AI agents (planners, fact-checkers, and writers) to dynamically aggregate info from various sources, cross-check evidence, and compile fully cited markdown reports.',
    stack: ['Python', 'Gemini API', 'Pydantic', 'Multi-Agent Systems', 'Asyncio'],
    features: [
      'Autonomous multi-agent workflow with dedicated planning, evidence, verification, and writing agents',
      'AI-powered information synthesis across multiple external data sources',
      'Evidence cross-checking to prevent AI hallucinations and verify factual claims',
      'Automatic citation tracking allowing users to trace findings back to original sources',
    ],
    github: 'https://github.com/Pratham-tech/Provenance',
    icon: Brain,
    accent: '#3B82F6', // Vibrant Blue
    highlight: false,
  },
  {
    number: '03',
    title: 'Stock Market Performance Analysis & Prediction',
    tagline: 'Full-stack ML platform for real-time market intelligence',
    problem:
      'Retail investors often struggle to interpret raw market trends or access machine learning price projections without setting up complex technical environments or proprietary terminals.',
    solution:
      'Designed a streamlined full-stack platform with a React/Vite frontend and a Python backend. It integrates live market feeds, visualizes interactive metrics using Recharts, and delivers ML-based price forecasts using models trained on historical candlestick data.',
    stack: ['Python', 'React', 'Vite', 'Recharts', 'TailwindCSS', 'Framer Motion'],
    features: [
      'Interactive stock chart with historical OHLCV data',
      'Trend analysis and performance metrics dashboard',
      'ML-based price prediction signals',
      'Clean, responsive UI built with React + Tailwind',
    ],
    github: 'https://github.com/Pratham-tech',
    icon: TrendingUp,
    accent: '#60A5FA', // Sky Blue
    highlight: false,
  },
  {
    number: '04',
    title: 'Customer Churn Prediction & Profit Optimisation',
    tagline: 'End-to-end ML pipeline for retention strategy',
    problem:
      'While predictive models can flag customers likely to cancel a service, businesses often struggle to determine if the financial cost of a retention campaign outweighs the value of the customer.',
    solution:
      'Trained a robust XGBoost classification pipeline on 7,000+ customer records. I then developed a profit-curve optimization model to determine the mathematically optimal threshold for offering retention incentives, maximizing return on investment.',
    stack: ['Python', 'XGBoost', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    features: [
      'End-to-end churn prediction pipeline on 7,000+ records',
      'Profit-curve optimisation across decision thresholds',
      'Business-focused retention targeting strategy',
      'Full data cleaning, encoding, and feature engineering',
    ],
    github: 'https://github.com/Pratham-tech/Data-to-decisions',
    icon: BarChart3,
    accent: '#00BAC2', // Cyan Blue
    highlight: false,
  },
  {
    number: '05',
    title: 'RoboRoarZ Reconfigurable Robotics Competition',
    tagline: 'Autonomous navigation at Singapore\'s first national robotics competition',
    problem:
      'Autonomous navigation in unstructured environments requires robots to adapt dynamically. The competition challenge was to program a novel, modular robot to optimize physical space coverage under tight hardware constraints.',
    solution:
      'Assembled and programmed Smorphi, a modular reconfigurable robot through hardware assembling & embedded programming to achieve maximum space coverage. By applying design-thinking and embedded programming, our team maximized the robot\'s physical coverage area, competing against 175 participants.',
    stack: ['Embedded Programming', 'Autonomous Systems', 'Logical Reasoning'],
    features: [
      'Autonomous navigation & surface coverage maximisation',
      'Embedded programming of modular reconfigurable robot',
      'Competed among 175 participants from 24 institutions',
      'Hosted by SUTD & National Robotics Programme, Singapore',
    ],
    icon: Users,
    accent: '#2563EB', // Royal Blue
    highlight: false,
  },
];

function SpotlightProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const Icon = project.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group animate-on-scroll stagger-${index + 1} relative rounded-2xl overflow-hidden transition-all duration-500`}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${project.highlight ? 'rgba(212,168,83,0.18)' : 'rgba(240,232,216,0.07)'}`,
        boxShadow: project.highlight
          ? '0 0 40px rgba(212,168,83,0.08)'
          : '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {/* Simple hover spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl z-[1] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${project.accent}15, transparent 60%)`,
        }}
      />

      {/* Top accent line for featured */}
      {project.highlight && (
        <div
          className="absolute top-0 inset-x-0 h-px z-[3]"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
        />
      )}

      <div className="p-8 relative z-[5]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${project.accent}12`,
                  border: `1px solid ${project.accent}35`,
                  boxShadow: `0 0 20px ${project.accent}10`
                }}
              >
                <Icon size={22} style={{ color: project.accent }} />
              </div>
              <div>
                <span
                  className="font-mono text-[11px] font-semibold tracking-wider"
                  style={{ color: `${project.accent}99` }}
                >
                  {project.number}
                </span>
                <h3
                  className="font-display font-bold text-lg sm:text-xl lg:text-2xl leading-snug tracking-tight mt-0.5"
                  style={{ color: 'var(--text)' }}
                >
                  {project.title}
                </h3>
                <p className="text-sm font-medium mt-1.5" style={{ color: 'var(--muted)' }}>
                  {project.tagline}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p
                  className="font-mono text-xs font-semibold mb-1.5 uppercase tracking-wider flex items-center gap-2"
                  style={{ color: 'var(--accent)', opacity: 0.85 }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
                  The Challenge
                </p>
                <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-75)' }}>{project.problem}</p>
              </div>
              <div>
                <p
                  className="font-mono text-xs font-semibold mb-1.5 uppercase tracking-wider flex items-center gap-2"
                  style={{ color: 'var(--accent)', opacity: 0.85 }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
                  What I Built
                </p>
                <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-75)' }}>{project.solution}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs pt-1">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md transition-colors duration-200"
                  style={{
                    color: 'var(--text-75)',
                    background: 'rgba(240,232,216,0.04)',
                    border: '1px solid rgba(240,232,216,0.08)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.github && (
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium font-mono transition-colors duration-200"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div
              className="rounded-xl p-6 h-full"
              style={{
                background: 'var(--bg)',
                border: '1px solid rgba(240,232,216,0.06)',
              }}
            >
              <p
                className="font-mono text-xs font-semibold uppercase tracking-wider mb-4 pb-2"
                style={{
                  color: 'var(--text-75)',
                  borderBottom: '1px solid rgba(240,232,216,0.06)',
                }}
              >
                Key Highlights
              </p>
              <ul className="space-y-3.5">
                {project.features.map((feature, j) => (
                  <li key={j} className="flex gap-3 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-75)' }}>
                    <span className="mt-0.5 flex-shrink-0 font-mono font-bold" style={{ color: 'var(--accent)' }}>›</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="animate-on-scroll mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-vapor">
            Projects
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-cyan to-seafoam" />
          <p className="mt-6 text-muted max-w-xl leading-relaxed text-[15px] sm:text-base">
            Some of the projects I&apos;ve worked on recently ~ a mix of personal, academic, and competition work that I found interesting.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <SpotlightProjectCard key={project.number} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-16 text-center animate-on-scroll stagger-4">
          <p className="text-muted text-sm mb-3">More projects in progress and available on GitHub, follow along!</p>
          <a
            href="https://github.com/Pratham-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan hover:text-seafoam transition-colors duration-200 font-mono text-sm font-semibold tracking-wide"
          >
            <Github size={16} />
            github.com/Pratham-tech
            <span className="transition-transform duration-200">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
