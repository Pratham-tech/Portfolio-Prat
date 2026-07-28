'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const featured = [
  {
    title: 'UG High Honour Roll',
    org: 'University of Sydney',
    date: 'May 2026',
    note: 'HD average across all computing units in the 2025 academic year, awarded by the School of Computing.',
  },
  {
    title: 'Dalyell Scholar',
    org: 'University of Sydney',
    date: 'Dec 2024',
    note: "Invitation-only program recognising students in the top academic percentile (ATAR 98+). Access to advanced, research-focused coursework and enrichment opportunities.",
  },
  {
    title: 'International Student Award — 20% Scholarship',
    org: 'University of Sydney',
    date: 'Dec 2024',
    note: 'Tuition scholarship for the duration of the degree, awarded in recognition of academic achievement as an international student.',
  },
];

const more = [
  {
    title: 'Dalyell Global Mobility Scholarship',
    org: 'University of Sydney',
    date: '2026',
    note: '$3,000 scholarship to undertake semester exchange at NUS Singapore.',
  },
  {
    title: 'Global Schools Award — Subject Proficiency (English)',
    org: 'Global Indian International School',
    date: 'Jul 2024',
    note: 'Highest English score in Grade 12 board exams across the school cohort.',
  },
  {
    title: 'Global Schools Award — Leadership',
    org: 'Global Indian International School',
    date: 'Jul 2023',
    note: 'Recognised for leadership and active involvement in school co-curricular activities.',
  },
  {
    title: 'Global Future Ready Merit Scholarship',
    org: 'Global Indian International School',
    date: 'Aug 2022',
    note: '10% tuition scholarship for outstanding Grade 10 results, sustained 2022–2024.',
  },
  {
    title: 'Dr. APJ Abdul Kalam Scholarship',
    org: 'Global Indian International School',
    date: 'Apr 2019',
    note: '10% annual tuition waiver for excellent Grade 6 results, sustained 2019–2021.',
  },
  {
    title: 'AI Fluency: Framework & Foundations',
    org: 'Anthropic',
    date: 'Mar 2026',
    note: 'Prompt engineering, output evaluation, and responsible AI integration frameworks.',
  },
  {
    title: 'Deloitte Australia — Data Analytics Simulation',
    org: 'Forage',
    date: 'Jan 2026',
    note: 'Built a Tableau dashboard and applied Excel-based classification in a forensic analysis context.',
  },
  {
    title: 'Goldman Sachs — Risk Management Simulation',
    org: 'Forage',
    date: 'Jan 2026',
    note: 'Credit risk assessments and real estate scenario analysis using quantitative financial data.',
  },
  {
    title: 'Pandas (Data Manipulation)',
    org: 'Kaggle Learn',
    date: 'Jan 2026',
    note: 'DataFrame operations, cleaning, grouping, merging, and time series manipulation.',
  },
  {
    title: 'NYAA Silver Award',
    org: 'National Youth Achievement Award, Singapore',
    date: 'Sep 2023',
    note: '98+ hours of volunteering across the National Library Board and WillingHearts, plus skill development and physical recreation commitments.',
  },
  {
    title: 'RoboRoarZ — Reconfigurable Robotics Competition',
    org: 'SUTD & National Robotics Programme',
    date: '2023',
    note: "Singapore's first national reconfigurable robotics competition. 175 participants from 24 institutions including NUS, NTU, and Raffles Institution.",
  },
];

function AchievementRow({ title, org, date, note }: {
  title: string; org: string; date: string; note: string; subtle?: boolean;
}) {
  return (
    <div className="py-5 group" style={{ borderBottom: '1px solid rgba(240,232,216,0.08)' }}>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-1.5">
        <h3 className="text-base sm:text-lg font-semibold leading-snug transition-colors duration-200"
          style={{ color: 'var(--text)' }}>
          {title}
        </h3>
        <span className="font-mono text-xs sm:text-sm font-semibold flex-shrink-0 px-2.5 py-0.5 rounded-full" style={{ color: 'var(--accent)', background: 'rgba(212,168,83,0.1)', border: '1px solid rgba(212,168,83,0.2)' }}>
          {date}
        </span>
      </div>
      <p className="text-xs sm:text-sm font-mono font-medium mb-2" style={{ color: '#00BAC2' }}>{org}</p>
      <p className="text-sm sm:text-[15px] leading-relaxed text-vapor/85">{note}</p>
    </div>
  );
}

export default function Achievements() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="achievements" className="py-28 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-4xl mx-auto">

        <div className="animate-on-scroll mb-14">
          <p className="section-label mb-3">Recognition</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl" style={{ color: 'var(--text)' }}>
            Achievements
          </h2>
          <div className="mt-4 w-12 h-0.5" style={{ background: 'var(--accent)', opacity: 0.6 }} />
        </div>

        {/* Featured three */}
        <div className="animate-on-scroll stagger-1" style={{ borderTop: '1px solid rgba(240,232,216,0.08)' }}>
          {featured.map(a => <AchievementRow key={a.title} {...a} />)}
        </div>

        {/* Toggle */}
        <div className="py-6 text-center animate-on-scroll stagger-2">
          <button onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {expanded ? 'Show less' : `View all ${more.length + featured.length} achievements`}
            <ChevronDown size={15}
              className="transition-transform duration-300"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
            />
          </button>
        </div>

        {/* Collapsible rest */}
        <div className="overflow-hidden transition-all duration-500"
          style={{ maxHeight: expanded ? '3000px' : '0', opacity: expanded ? 1 : 0 }}>
          <div style={{ borderTop: '1px solid rgba(240,232,216,0.08)' }}>
            {more.map(a => <AchievementRow key={a.title} {...a} subtle />)}
          </div>
        </div>

      </div>
    </section>
  );
}
