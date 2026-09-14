import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATAFORGE_VIDEO_ID = 'hNEZU9_8Uv0'

const CAPABILITIES = [
  {
    id: 'conversational',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    title: 'Conversational Data Engineering',
    description: 'Tell the assistant what you need in plain language. It interprets the request, asks what it needs to know, plans the work, and carries it out — no tickets, no hand-offs, no pipeline authoring.',
    points: ['Plain-language instructions', 'Agent plans before it acts', 'Schedule work by conversation'],
  },
  {
    id: 'sql',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
      </svg>
    ),
    title: 'Autonomous SQL Generation',
    description: 'Agents establish the database connection, inspect the schema, write the SQL, and run it — so nobody has to hand-author a query to move, reshape, or model data.',
    points: ['Automatic source connection', 'Query generation & execution', 'No hand-written SQL required'],
  },
  {
    id: 'warehouse',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
    title: 'Agent-Built Warehouses',
    description: 'Describe the model you want and agents design the schema, build the warehouse and its marts, and manage the loads — dimensional modelling included, without a data engineer writing DDL.',
    points: ['Schema & dimensional design', 'Warehouse and mart construction', 'Load orchestration end to end'],
  },
  {
    id: 'skills',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    title: 'Extensible AI Skills',
    description: 'Enrich the assistant with specific data engineering skills — your modelling standards, naming conventions, and quality practices — until it works with the judgement of an experienced warehouse engineer.',
    points: ['Add domain & practice skills', 'Encode your own conventions', 'Capability grows with your team'],
  },
  {
    id: 'quality',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: 'Data Quality & Enrichment',
    description: 'Agents profile every source, infer the validation rules that matter, then cleanse and enrich records against internal and external references — and flag what they cannot resolve alone.',
    points: ['Automated profiling & validation', 'Internal + external enrichment', 'Exceptions raised, not buried'],
  },
  {
    id: 'ingestion',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5" />
      </svg>
    ),
    title: 'Ingestion & Delivery',
    description: 'Real-time streams and high-volume batch loads arrive from any source, and agents route the results wherever they are needed — into the lakehouse, an API, or any downstream consumer.',
    points: ['Multi-source connectivity', 'Streaming + batch in one platform', 'API-first delivery to any consumer'],
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    label: 'Describe',
    description: 'Tell the assistant what you need — a warehouse, a cleansed table, a nightly load — in plain language. No ticket, no specification document, no SQL.',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    step: '02',
    label: 'Plan',
    description: 'Agents connect to your sources, inspect the schemas, and lay out how they intend to build it — so you can see and approve the approach before anything runs.',
    color: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  {
    step: '03',
    label: 'Build',
    description: 'Agents generate and execute the SQL — creating tables, loading data, cleansing records, and applying transformations against the sources they connected to.',
    color: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  },
  {
    step: '04',
    label: 'Operate',
    description: 'The work is scheduled, monitored, and self-healing from then on — with results routed to Spotlight Data Fabrics, Phoenix Insights, Cortexus, or any application that needs them.',
    color: 'bg-brand/10 text-brand border-brand/20',
  },
]

const USE_CASES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75" />
      </svg>
    ),
    title: 'Real-Time Analytics',
    items: ['Stream processing for live dashboards', 'Operational insights with no lag', 'Event-driven alerting pipelines'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    title: 'AI Data Preparation',
    items: ['Prepare datasets for ML and LLMs', 'Continuous pipelines for training & inference', 'Feature engineering at scale'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: 'ETL / ELT Modernisation',
    items: ['Replace brittle legacy data pipelines', 'Simplify complex data workflows', 'Cut pipeline maintenance overhead'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    title: 'Data Integration',
    items: ['Unify SaaS, databases, and APIs', 'Seamless cross-system data flow', 'Single integration layer for all tools'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
    title: 'Self-Service Data Access',
    items: ['Analysts request datasets in plain language', 'No queue behind the engineering team', 'Answers in minutes, not sprints'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: 'Scaling a Small Data Team',
    items: ['Encode senior expertise as reusable skills', 'Deliver like a much larger team', 'Consistent standards on every build'],
  },
]

const OUTCOMES = [
  { icon: '⚡', metric: '10×', label: 'Faster time-to-data across the stack' },
  { icon: '🧼', metric: '99%', label: 'Data quality and reliability SLA' },
  { icon: '💬', metric: 'Zero', label: 'Hand-written SQL required' },
  { icon: '🚀', metric: '3×', label: 'Acceleration in AI and analytics delivery' },
]

const PROBLEMS = [
  'Every warehouse, pipeline, and transformation is built by hand',
  'Delivery is bottlenecked on scarce SQL and data modelling expertise',
  'Teams wait weeks for a dataset they could describe in one sentence',
  'Pipelines are brittle, break often, and are hard to scale',
  'Poor data quality cascades into broken AI and bad decisions',
]

const RELIABILITY_ITEMS = [
  'Fault-tolerant, self-healing pipeline architecture',
  'Real-time data validation and quality monitoring',
  'Secure data transfer with end-to-end encryption',
  'Role-based access control across all pipeline assets',
  'Dead-letter queues and automatic error recovery',
  'Full observability — logs, metrics, and alerting',
  'Human review and approval before agents apply changes',
  'Full audit trail of every agent action and generated query',
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

function PulsingDot({ color = 'bg-emerald-400' }: { color?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <span className="relative flex h-2.5 w-2.5">
      {!reduceMotion && (
        <motion.span
          className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
          animate={{ scale: [1, 1.8], opacity: [0.75, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
    </span>
  )
}

// Streaming pipeline visual — horizontal lanes of flowing data particles
function PipelineVisual() {
  const lanes = [
    { label: 'Kafka', color: '#10B981', y: 54 },
    { label: 'PostgreSQL', color: '#6366F1', y: 108 },
    { label: 'REST API', color: '#F59E0B', y: 162 },
    { label: 'S3 / Files', color: '#8B5CF6', y: 216 },
    { label: 'Salesforce', color: '#06B6D4', y: 270 },
  ]

  // Transformation stage X positions
  const stageX = { connect: 80, ingest: 200, transform: 340, deliver: 470 }
  const stageLabels = [
    { x: stageX.connect, label: 'Connect' },
    { x: stageX.ingest, label: 'Ingest' },
    { x: stageX.transform, label: 'Transform' },
    { x: stageX.deliver, label: 'Deliver' },
  ]

  const reduceMotion = useReducedMotion()

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 580 330"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Diagram: data from Kafka, PostgreSQL, REST API, S3 files and Salesforce flows through Connect, Ingest, Transform and Deliver stages, emerging as clean data."
      >
        <defs>
          <filter id="df-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Green gradient for pipeline track */}
          <linearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#117EC2" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Subtle grid */}
        <pattern id="df-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
        <rect width="580" height="330" fill="url(#df-grid)" />

        {/* Stage header labels */}
        {stageLabels.map((s) => (
          <g key={s.label}>
            <rect x={s.x - 34} y={8} width={68} height={22} rx={4} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            <text x={s.x} y={23} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9.5" fontWeight="600" fontFamily="'Source Sans 3', sans-serif" letterSpacing="0.06em">
              {s.label.toUpperCase()}
            </text>
          </g>
        ))}

        {/* Vertical stage dividers */}
        {[stageX.ingest - 60, stageX.transform - 60, stageX.deliver - 60].map((x, i) => (
          <line key={i} x1={x} y1={38} x2={x} y2={300} stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="3 4" />
        ))}

        {/* Pipeline lanes */}
        {lanes.map((lane, li) => (
          <g key={lane.label}>
            {/* Track */}
            <rect x={stageX.connect - 30} y={lane.y - 10} width={580 - stageX.connect + 10} height={20} rx={4} fill="url(#trackGrad)" />
            {/* Lane label (source) */}
            <text x={stageX.connect - 36} y={lane.y + 4} textAnchor="end" fill={lane.color} fontSize="9.5" fontWeight="600" fontFamily="'Source Sans 3', sans-serif" opacity={0.85}>
              {lane.label}
            </text>

            {/* Animated particles — 3 per lane, staggered */}
            {!reduceMotion &&
              [0, 1, 2].map((pi) => (
                <motion.circle
                  key={`p-${li}-${pi}`}
                  r={3.5}
                  cy={lane.y}
                  fill={lane.color}
                  filter="url(#df-glow)"
                  animate={{
                    cx: [stageX.connect - 20, 555],
                    opacity: [0, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    delay: li * 0.22 + pi * 0.9,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    ease: 'linear',
                  }}
                />
              ))}

            {/* Transform node — glowing dot at transform stage */}
            <motion.circle
              cx={stageX.transform}
              cy={lane.y}
              r={6}
              fill={`${lane.color}30`}
              stroke={lane.color}
              strokeWidth={1.5}
              filter="url(#df-glow)"
              animate={reduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, delay: li * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        ))}

        {/* Deliver output box */}
        <motion.g
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
        >
          <rect x={516} y={40} width={52} height={240} rx={8} fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" strokeWidth={1.5} />
          <text x={542} y={170} textAnchor="middle" fill="rgba(16,185,129,0.8)" fontSize="9" fontWeight="600" fontFamily="'Source Sans 3', sans-serif" letterSpacing="0.05em"
            transform="rotate(-90, 542, 170)">
            CLEAN DATA
          </text>
        </motion.g>

        {/* Raw → Clean label */}
        <text x={stageX.connect - 10} y={314} fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="'Source Sans 3', sans-serif">Raw</text>
        <text x={498} y={314} fill="rgba(16,185,129,0.5)" fontSize="9" fontFamily="'Source Sans 3', sans-serif">Refined</text>
        <line x1={stageX.connect + 14} y1={310} x2={490} y2={310} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <path d="M488,307 L494,310 L488,313" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth={1.2} />
      </svg>
    </div>
  )
}

function CapabilityCard({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  return (
    <motion.div
      className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300/50 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-emerald-400 to-brand"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: EASE }}
      />
      <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 shrink-0">
        {cap.icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug">{cap.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
      <ul className="flex flex-col gap-1.5 mt-auto">
        {cap.points.map((pt) => (
          <li key={pt} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            {pt}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dataforge() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100dvh-4rem)] flex flex-col justify-center bg-brand-navy">
        {/* Emerald/green energy tones */}
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-emerald-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-green-600/8 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-emerald-400/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div className="flex flex-col gap-8" variants={stagger()} initial="hidden" animate="show">
              <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-2.5">
                <PulsingDot color="bg-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">
                  Phoenix AIP — DataForge
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Data Engineering
                <span className="text-white/60">—</span>
                <span className="text-emerald-400">Done by AI Agents.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-base sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Describe what you need in plain language. DataForge's agents connect to your sources, generate and run the SQL, and build the warehouses, transformations, and schedules for you.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Link
                  to="/about/contact"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-base font-semibold px-7 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-emerald-500/25"
                >
                  Request Demo
                  <ArrowIcon />
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-semibold px-7 py-3.5 rounded-sm border border-white/15 hover:border-white/30 transition-colors duration-200"
                >
                  Explore Capabilities
                </a>
              </motion.div>
            </motion.div>

            {/* Streaming pipeline visual */}
            <motion.div
              className="hidden lg:flex items-center justify-center h-72 lg:h-80"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            >
              <PipelineVisual />
            </motion.div>
          </div>

          {/* Trust bar */}
          <motion.div
            className="mt-20 pt-8 border-t border-white/10 flex flex-wrap gap-6 lg:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            {['No SQL required', 'Autonomous agent execution', 'Extensible with data engineering skills', 'Automated data quality', 'API-first delivery'].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger()}
            >
              <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-emerald-700 uppercase tracking-widest">
                The Problem
              </motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Data engineering is slow because it is <span className="text-emerald-600">still done by hand.</span>
              </motion.h2>
              <motion.ul variants={stagger(0.1)} className="flex flex-col gap-3 mt-2">
                {PROBLEMS.map((p, i) => (
                  <motion.li
                    key={p}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <span className="mt-1 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 text-xs font-bold">✕</span>
                    {p}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            >
              <div className="bg-brand-navy rounded-2xl p-8 flex flex-col gap-6 border border-brand-navy-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">DataForge puts an AI data engineer on the work</span>
                </div>
                <p className="text-white/60 leading-relaxed text-sm">
                  Every hand-built pipeline, every hand-written query, every dataset stuck in a backlog costs your organisation in stalled AI initiatives and wasted engineering hours. DataForge hands that work to agents instead.
                </p>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-emerald-400 text-sm font-semibold italic">
                    "An AI data engineer for your entire data estate."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What Is DataForge ─────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div
            className="flex flex-col gap-6 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-emerald-700 uppercase tracking-widest">
              What Is DataForge?
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              A data engineering platform where <span className="text-emerald-600">agents do the work.</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-gray-500 leading-relaxed max-w-2xl">
              You describe the outcome; the assistant handles connection, SQL generation, execution, and scheduling — building warehouses, cleansing records, and running transformations autonomously across your entire ecosystem.
            </motion.p>

            {/* Raw → Refined → Usable transformation flow */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-6 w-full max-w-2xl"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {[
                  { label: 'Raw Data', sub: 'Fragmented, inconsistent', color: 'bg-red-50 border-red-200 text-red-700', sub_color: 'text-red-600' },
                  { label: 'DataForge', sub: 'Connect · Generate · Run', color: 'bg-emerald-50 border-emerald-300 text-emerald-700', sub_color: 'text-emerald-700', highlight: true },
                  { label: 'Refined Data', sub: 'Clean, reliable, AI-ready', color: 'bg-brand-light border-brand/20 text-brand-dark', sub_color: 'text-brand-dark/80' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex flex-col sm:flex-row items-center gap-3 flex-1"
                  >
                    <div className={`w-full sm:flex-1 rounded-xl border p-4 text-center ${item.color} ${item.highlight ? 'ring-2 ring-emerald-400/30' : ''}`}>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1">{item.label}</p>
                      <p className={`text-xs ${item.sub_color}`}>{item.sub}</p>
                    </div>
                    {i < 2 && (
                      <svg
                        className="w-5 h-5 text-gray-400 shrink-0 rotate-90 sm:rotate-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills the assistant can be taught */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="w-full max-w-2xl"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Teach it your data engineering practice</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { skill: 'Warehouse Design', sub: 'Dimensional modelling, star schemas, slowly changing dimensions' },
                  { skill: 'Data Quality', sub: 'Profiling, validation rules, and cleansing strategies' },
                  { skill: 'Your Conventions', sub: 'Naming, standards, and the way your team builds' },
                ].map((s) => (
                  <div key={s.skill} className="rounded-xl border border-gray-200 bg-white p-4 text-left">
                    <p className="text-sm font-semibold text-emerald-700 mb-1">{s.skill}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.sub}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mt-3">
                Each skill you add makes the assistant more capable — until it works with the judgement of an experienced data warehouse engineer.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid sm:grid-cols-3 gap-4 mt-4 w-full max-w-2xl"
            >
              {[
                { label: 'Not just pipelines', sub: 'Agents that build them for you' },
                { label: 'Not just low-code', sub: 'No SQL to write at all' },
                { label: 'Not just ingestion', sub: 'End-to-end data engineering' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-4 text-left border border-gray-100">
                  <p className="text-xs text-gray-500 line-through mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-emerald-700">{item.sub}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Capabilities ────────────────────────────────────────────────── */}
      <section id="capabilities" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-emerald-700 uppercase tracking-widest">
              Core Capabilities
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Every stage of the pipeline, <span className="text-emerald-600">covered.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {CAPABILITIES.map((cap, i) => (
              <CapabilityCard key={cap.id} cap={cap} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="bg-brand-navy">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand-light/50 uppercase tracking-widest">
              How It Works
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              From source to delivery, <span className="text-emerald-400">in one pipeline.</span>
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-white/10" />

            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              role="tablist"
              aria-label="How DataForge works"
            >
              {HOW_IT_WORKS.map((step, i) => (
                <motion.button
                  key={step.step}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === i}
                  aria-controls="dataforge-step-detail"
                  className="flex flex-col gap-4 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
                  onClick={() => setActiveStep(i)}
                >
                  <div className={`relative w-24 h-24 mx-auto rounded-2xl border flex items-center justify-center flex-col gap-1 transition-all duration-300 ${activeStep === i ? `${step.color} scale-105 shadow-lg` : 'bg-white/5 border-white/10 text-white/60'}`}>
                    <span className="text-2xl font-bold font-display">{step.step}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">{step.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeStep}
              id="dataforge-step-detail"
              role="tabpanel"
              aria-live="polite"
              className="mt-10 max-w-xl mx-auto text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="text-white/60 text-lg leading-relaxed">
                {HOW_IT_WORKS[activeStep].description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Use Cases ────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-emerald-700 uppercase tracking-widest">
              Key Use Cases
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Built for every data <span className="text-emerald-600">engineering need.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.title}
                className="group border border-gray-100 rounded-xl p-6 hover:border-emerald-300/50 hover:shadow-md transition-all duration-300 bg-white flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    {uc.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight">{uc.title}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {uc.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Outcomes ────────────────────────────────────────────────── */}
      <section className="bg-emerald-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-emerald-700 uppercase tracking-widest">
              Business Outcomes
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              What fast, clean pipelines <span className="text-emerald-600">unlock.</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OUTCOMES.map((o, i) => (
              <motion.div
                key={o.label}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-emerald-100 flex flex-col gap-3 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <span className="text-3xl" aria-hidden="true">
                  {o.icon}
                </span>
                <span className="text-4xl font-bold text-emerald-600 font-display">{o.metric}</span>
                <p className="text-sm text-gray-500 leading-snug">{o.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Differentiation + Reliability ────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger()}
            >
              <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-emerald-700 uppercase tracking-widest">
                Why DataForge
              </motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                An AI data engineer for your <span className="text-emerald-600">entire data estate.</span>
              </motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-gray-500 leading-relaxed">
                Legacy ETL tools still expect an engineer to author every connection, query, and transformation. DataForge expects a sentence — and grows more capable as you add data engineering skills, until it works with the judgement of a seasoned warehouse engineer.
              </motion.p>

              <motion.div variants={stagger(0.1)} className="flex flex-col gap-4 mt-2">
                {[
                  { before: 'Brittle pipelines', after: 'Real-time data activation' },
                  { before: 'Legacy ETL jobs', after: 'Continuous intelligent flow' },
                  { before: 'Manual ingestion', after: 'End-to-end data engineering' },
                ].map((row) => (
                  <motion.div key={row.before} variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 line-through w-36 shrink-0">{row.before}</span>
                    <ArrowIcon />
                    <span className="text-sm font-semibold text-gray-800">{row.after}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Integration stack */}
              <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="mt-2 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
                <h3 className="font-bold text-gray-900">Integration & Ecosystem</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Spotlight Data Fabrics', sub: 'Where agents build and populate the warehouses they create' },
                    { label: 'Phoenix Insights', sub: 'Delivers clean, enriched data for AI reasoning and analytics' },
                    { label: 'Cortexus', sub: 'Supplies real-time context for autonomous agent execution' },
                    { label: 'Any downstream app', sub: 'API-first delivery to any consumer in your stack' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Security & Reliability panel */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            >
              <div className="bg-brand-navy rounded-2xl p-8 border border-brand-navy-border flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Security & Reliability</h3>
                    <p className="text-xs text-white/60 mt-0.5">Production-grade from the first pipeline</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {RELIABILITY_ITEMS.map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/8">
                      <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-sm text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DataForge in Action ──────────────────────────────────────────────── */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
              DataForge in Action
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              See the pipelines <span className="text-brand">at work.</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-gray-500 leading-relaxed">
              Watch DataForge connect and normalise sources — structured, unstructured, streaming or batch — into one governed pipeline ready for intelligence.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden border border-brand-navy-border shadow-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <iframe
              className="w-full aspect-video block"
              src={`https://www.youtube-nocookie.com/embed/${DATAFORGE_VIDEO_ID}`}
              title="DataForge product walkthrough"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-brand-navy">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <motion.div
            className="flex flex-col items-center gap-6 max-w-2xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger(0.14)}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-2.5">
              <PulsingDot color="bg-emerald-400" />
              <span className="text-sm font-semibold text-brand-light/50 uppercase tracking-widest">Get Started</span>
            </motion.div>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-4xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Ready to Hand Data Engineering{' '}
              <span className="text-emerald-400">to Agents?</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-lg text-white/55 leading-relaxed">
              See the assistant connect to a live source, design a warehouse, and build it end to end — in a demo run against your own architecture.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/about/contact"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-emerald-500/25"
              >
                Book a Demo
                <ArrowIcon />
              </Link>
              <Link
                to="/about/contact"
                className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-semibold px-8 py-3.5 rounded-sm border border-white/15 hover:border-white/30 transition-colors duration-200"
              >
                Talk to an Expert
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
