'use client';
import { Briefcase, Users, Globe } from 'lucide-react';

const experiences = [
  {
    role: 'ENGO Peer Mentor',
    org: 'University of Sydney',
    period: 'Feb 2026 – Present',
    location: 'Sydney, NSW',
    logo: '/usyd.png',
    icon: Users,
    color: 'text-cyan',
    description: [
      'Mentored a cohort of first-year engineering students through their university transition, providing structured guidance on academic resources, faculty navigation, and student support services.',
      'Facilitated workshops each semester to build student confidence, increase awareness of university programs, and foster peer community within the faculty.',
    ],
    tags: ['Mentoring', 'Leadership', 'Workshop Facilitation'],
  },
  {
    role: 'Events Subcommittee',
    org: 'University of Sydney Robotics Club (USRC)',
    period: 'Sep 2025 – Present',
    location: 'Sydney, NSW',
    logo: '/usrc.png',
    icon: Briefcase,
    color: 'text-cyan',
    description: [
      'Coordinated event logistics for numerous club events including the USRC × ANT61 Hackathon and Weekend of Arduino, managing vendor coordination, attendee flow, and on-site operations for audiences of 30–80+ participants.',
      'Executed cross-functional responsibilities across planning, communications, and day-of facilitation, ensuring consistent delivery against event timelines.',
    ],
    tags: ['Event Management', 'Logistics', 'Industry Hackathons'],
  },
  {
    role: 'Head of Web Development',
    org: 'GIIS Tech Club',
    period: 'Dec 2022 – Dec 2023',
    location: 'Singapore',
    logo: '/techclub.png',
    icon: Globe,
    color: 'text-seafoam',
    description: [
      "Led the Web Development division, overseeing technical direction and delivering the club's official website prototype for 2023.",
      'Co-organised the annual GIIS Hackathon 2023 — held judging responsibilities, conducted pre-event workshops in Web Development, and mentored participants in Game Development.',
    ],
    tags: ['Web Development', 'Team Leadership', 'Hackathon Organising'],
  },
];

const volunteering = [
  {
    org: 'National Library Board',
    period: '2022 – 2023',
    logo: '/nlb.png',
    description:
      'Assisted patrons — often elderly visitors — with digital and in-person library services, including self-service systems and account setup.',
  },
  {
    org: 'WillingHearts',
    period: 'Mar 2023 – Sep 2023',
    logo: '/willinghearts.png',
    description:
      "Supported meal preparation and distribution at one of Singapore's largest soup kitchens, serving thousands of underprivileged beneficiaries daily. Involved in food packing, logistics coordination, and workspace maintenance.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 relative bg-graphite/20">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="animate-on-scroll mb-14">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-vapor ">
            Experience
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-cyan to-seafoam" />
        </div>

        {/* Timeline */}
        <div className="space-y-6 mb-16">
          {experiences.map((exp, i) => {
            const FallbackIcon = exp.icon;
            return (
              <div
                key={`${exp.role}-${exp.org}`}
                className={`relative flex gap-6 animate-on-scroll stagger-${i + 1}`}
              >
                {/* Timeline dot + line */}
                <div className="relative flex-shrink-0 timeline-item">
                  <div className="w-4 h-4 rounded-full border-2 border-cyan bg-obsidian mt-4 relative z-10" />
                </div>

                {/* Card */}
                <div className="flex-1 bg-graphite border border-white/8 rounded-xl p-6 mb-2 card-hover glow-border">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    {/* Title with Logo */}
                    <div className="flex items-center gap-3.5">
                      {exp.logo ? (
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 p-1 relative">
                          <img
                            src={exp.logo}
                            alt={exp.org}
                            className="w-full h-full object-contain rounded-md"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                              if (fallback) fallback.classList.remove('hidden');
                            }}
                          />
                          <span className="fallback-icon hidden absolute inset-0 flex items-center justify-center w-full h-full">
                            <FallbackIcon size={16} className={exp.color} />
                          </span>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <FallbackIcon size={16} className={exp.color} />
                        </div>
                      )}
                      <div>
                        <h3 className="font-display font-semibold text-vapor text-base sm:text-lg leading-snug">
                          {exp.role}
                        </h3>
                        <p className="text-muted text-sm mt-0.5">{exp.org}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 font-mono text-xs">
                      <p className="text-cyan">{exp.period}</p>
                      <p className="text-muted mt-1">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm text-vapor/75 leading-relaxed">
                        <span className="text-cyan mt-1.5 flex-shrink-0">›</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Clean text tags, no boxes */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-4">
                    {exp.tags.map((tag, j) => (
                      <span key={tag} className="flex items-center gap-3">
                        {j > 0 && <span className="w-1 h-1 rounded-full bg-cyan/35 select-none" />}
                        <span className="font-mono text-xs text-muted tracking-wide select-none">{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volunteering */}
        <div className="animate-on-scroll stagger-4">
          <h3 className="font-display font-semibold text-vapor text-xl mb-6 flex items-center gap-3">
            <span className="w-5 h-px bg-cyan" />
            Volunteering
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {volunteering.map((v) => (
              <div
                key={v.org}
                className="bg-graphite border border-white/8 rounded-lg p-5 card-hover flex gap-4 items-start"
              >
                {v.logo ? (
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 p-1 relative">
                    <img
                      src={v.logo}
                      alt={v.org}
                      className="w-full h-full object-contain rounded-md"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                    <span className="fallback-icon hidden absolute inset-0 flex items-center justify-center w-full h-full">
                      <Briefcase size={16} className="text-cyan" />
                    </span>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={16} className="text-cyan" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-vapor text-sm truncate">{v.org}</h4>
                    <span className="font-mono text-xs text-cyan flex-shrink-0">{v.period}</span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-graphite/50 border border-cyan/10 rounded-lg px-5 py-4 flex items-center gap-3">
            <span className="text-seafoam font-mono text-sm">▸</span>
            <p className="text-muted text-sm">
              <span className="text-vapor font-medium">98 hours</span> of structured community
              service completed under the{' '}
              <span className="text-cyan">
                National Youth Achievement Award (NYAA) — Silver Level
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
