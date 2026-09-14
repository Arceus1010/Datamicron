import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPOTLIGHT_VIDEO_ID = 'J2ItSRvftM0'

const CAPABILITIES = [
  {
    id: 'unified',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: 'Unified Storage',
    description: 'Store structured and unstructured data in a single lakehouse architecture — eliminating silos, simplifying your data estate, and creating one reliable foundation.',
    points: ['All data types in one place', 'Eliminate warehouse + lake sprawl', 'Simplified data architecture'],
  },
  {
    id: 'etl',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: 'Built-In ETL & Transformation Engine',
    description: 'A full ETL runtime inside the platform — build visual or code-based pipelines, schedule and orchestrate them, and execute scripts directly against lakehouse tables with no data movement.',
    points: ['Visual & code-based pipelines', 'Scheduling & orchestration', 'Native script execution in-place'],
  },
  {
    id: 'vector',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
    title: 'Vector & Semantic Storage',
    description: 'Native embedding support powers LLM and AI applications with semantic search and contextual retrieval across all your enterprise data.',
    points: ['Native vector embeddings', 'Semantic search & retrieval', 'LLM-ready context store'],
  },
  {
    id: 'speeddb',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'SpeedDB Warehouse Engine',
    description: 'SpeedDB is our own columnar analytical database, included with the platform — purpose-built for data warehousing, with real-time ingestion that makes records queryable the moment they arrive.',
    points: ['Columnar analytical storage', 'Real-time ingestion & query', 'Sub-second queries at any scale'],
  },
  {
    id: 'ml',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
    ),
    title: 'Machine Learning & MLOps',
    description: 'Develop, train, deploy, and monitor models without leaving the fabric — versioned experiments, a governed model registry, and drift detection on data that never has to be copied out.',
    points: ['Model development & training', 'Versioned registry & deployment', 'Monitoring & drift detection'],
  },
  {
    id: 'governance',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Governance & Security',
    description: 'Fine-grained access control, end-to-end encryption, and full data lineage — so every data asset is traceable, auditable, and compliance-ready from day one.',
    points: ['Fine-grained access control', 'Data lineage & auditability', 'Compliance-ready by design'],
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    label: 'Ingest',
    description: 'Data streams in from any source — structured databases, document stores, APIs, streaming platforms, and legacy systems — via DataForge, where AI agents do the engineering, or loaded directly by the built-in ETL engine.',
    color: 'bg-brand/10 text-brand border-brand/20',
  },
  {
    step: '02',
    label: 'Unify',
    description: 'All data lands in a single lakehouse layer, with analytical tables served by the SpeedDB columnar engine — no more isolated data lakes or disconnected warehouses. One place, one schema, one truth.',
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
  {
    step: '03',
    label: 'Transform',
    description: 'Built-in ETL pipelines clean, reshape, and enrich data in place — visual or code-based, orchestrated on a schedule — landing it indexed, catalogued, and stored as vectors or tables.',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  {
    step: '04',
    label: 'Model',
    description: 'Models are developed, trained, and deployed directly against governed data — with versioned experiments, a model registry, and continuous monitoring for drift and performance.',
    color: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  },
  {
    step: '05',
    label: 'Serve',
    description: 'Clean, governed data is delivered to Phoenix Insights for reasoning, Cortexus for execution, and any downstream application or BI tool.',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
]

const USE_CASES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    title: 'AI & LLM Enablement',
    items: ['Vector databases for retrieval-augmented generation', 'Context-aware AI applications', 'Knowledge store for enterprise LLMs'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: 'Data Engineering',
    items: ['Pipeline development & orchestration', 'In-platform script execution', 'Scheduled, monitored data workflows'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    title: 'Predictive ML at Scale',
    items: ['Model training on governed data', 'Deployment and serving in-platform', 'Drift monitoring & retraining'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75" />
      </svg>
    ),
    title: 'Business Intelligence',
    items: ['Unified dashboards across all data', 'Cross-functional analytics in one query', 'No more BI tool proliferation'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: 'Data Modernisation',
    items: ['Replace legacy data warehouses and lakes', 'Simplify and consolidate infrastructure', 'Reduce operational overhead'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: 'Knowledge Management',
    items: ['Centralised enterprise knowledge base', 'Semantic search across all documents', 'Institutional memory at scale'],
  },
]

const OUTCOMES = [
  { icon: '📦', metric: '1', label: 'Platform for storage, pipelines, and models' },
  { icon: '⚡', metric: '8×', label: 'Faster queries on the SpeedDB engine' },
  { icon: '🤖', metric: '100%', label: 'AI-ready — from ingestion to deployed model' },
  { icon: '🔐', metric: 'Zero', label: 'Governance blind spots' },
]

const PROBLEMS = [
  'Data lives across silos — warehouses, lakes, apps',
  'Structured and unstructured data aren\'t unified',
  'AI systems lack clean, accessible data to reason over',
  'Governance and security are inconsistent across systems',
  'Pipelines, storage, and ML tooling live in three disconnected platforms',
  'Models stall between notebook and production',
]

const SPEEDDB_REASONS = [
  'Columnar storage tuned for analytical scans, not row lookups',
  'Streaming ingestion — no waiting for a nightly batch window',
  'Sub-second response across billions of rows',
  'Included with Spotlight Data Fabrics, not licensed separately',
]

const SPEEDDB_SPECS = [
  'Vectorised columnar query execution',
  'Real-time ingestion with immediate visibility',
  'Massively parallel, elastic scale-out',
  'Star-schema and dimensional modelling support',
  'Compression that shrinks the storage footprint',
  'Standard SQL interface for every BI tool',
]

const GOVERNANCE_ITEMS = [
  'Role-based access control (RBAC)',
  'Data classification & tagging',
  'End-to-end encryption at rest and in transit',
  'Audit logs and real-time monitoring',
  'Data lineage and full traceability',
  'Compliance-ready architecture (GDPR, SOC 2)',
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

function PulsingDot({ color = 'bg-brand' }: { color?: string }) {
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

// Data convergence diagram for the hero — streams flowing into a central hub
function DataConvergenceDiagram() {
  const sources = [
    { label: 'Databases', x: 60, y: 60, color: '#6366F1' },
    { label: 'Documents', x: 60, y: 160, color: '#06B6D4' },
    { label: 'Streams', x: 60, y: 260, color: '#8B5CF6' },
    { label: 'APIs', x: 60, y: 360 - 60, color: '#14B8A6' },
  ]
  const hubX = 280
  const hubY = 180
  const outputs = [
    { label: 'Phoenix Insights', x: 490, y: 80, color: '#F97316' },
    { label: 'Cortexus', x: 490, y: 180, color: '#117EC2' },
    { label: 'BI & Analytics', x: 490, y: 280, color: '#10B981' },
  ]

  const reduceMotion = useReducedMotion()

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 580 360"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Diagram: databases, documents, streams and APIs converge into the Spotlight Data Fabrics hub, which serves Phoenix Insights, Cortexus, and BI and analytics tools."
      >
        <defs>
          <filter id="lh-glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Radial gradient for hub */}
          <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#117EC2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#117EC2" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* Subtle grid */}
        <pattern id="lh-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
        <rect width="580" height="360" fill="url(#lh-grid)" />

        {/* Lines: sources → hub */}
        {sources.map((src, i) => (
          <motion.line
            key={`s-${i}`}
            x1={src.x + 18}
            y1={src.y}
            x2={hubX}
            y2={hubY}
            stroke={src.color}
            strokeWidth="1.5"
            strokeOpacity="0.25"
            strokeDasharray="5 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: EASE }}
          />
        ))}

        {/* Lines: hub → outputs */}
        {outputs.map((out, i) => (
          <motion.line
            key={`o-${i}`}
            x1={hubX}
            y1={hubY}
            x2={out.x - 18}
            y2={out.y}
            stroke={out.color}
            strokeWidth="1.5"
            strokeOpacity="0.25"
            strokeDasharray="5 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.7, ease: EASE }}
          />
        ))}

        {/* Animated data packets: sources → hub */}
        {!reduceMotion && sources.map((src, i) => (
          <motion.circle
            key={`pk-in-${i}`}
            r={2.5}
            fill={src.color}
            filter="url(#lh-glow)"
            animate={{
              cx: [src.x + 18, hubX],
              cy: [src.y, hubY],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.2,
              delay: 1.2 + i * 0.35,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Animated data packets: hub → outputs */}
        {!reduceMotion && outputs.map((out, i) => (
          <motion.circle
            key={`pk-out-${i}`}
            r={2.5}
            fill={out.color}
            filter="url(#lh-glow)"
            animate={{
              cx: [hubX, out.x - 18],
              cy: [hubY, out.y],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.2,
              delay: 1.8 + i * 0.3,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Source nodes */}
        {sources.map((src, i) => (
          <motion.g
            key={`sn-${i}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: EASE }}
          >
            <rect x={src.x - 30} y={src.y - 14} width={60} height={28} rx={6} fill={`${src.color}20`} stroke={`${src.color}50`} strokeWidth={1} />
            <text x={src.x} y={src.y + 4} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="'Source Sans 3', sans-serif">
              {src.label}
            </text>
          </motion.g>
        ))}

        {/* Central hub */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
        >
          <circle cx={hubX} cy={hubY} r={46} fill="url(#hubGrad)" stroke="#117EC2" strokeWidth={1.5} filter="url(#lh-glow)" />
          {!reduceMotion && (
            <motion.circle
              cx={hubX} cy={hubY} r={46}
              fill="none"
              stroke="#117EC2"
              strokeWidth={1}
              opacity={0.3}
              animate={{ r: [46, 58], opacity: [0.3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <text x={hubX} y={hubY - 6} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="600" fontFamily="'Source Sans 3', sans-serif" letterSpacing="0.06em">
            SPOTLIGHT
          </text>
          <text x={hubX} y={hubY + 8} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'Source Sans 3', sans-serif">
            DATA FABRICS
          </text>
        </motion.g>

        {/* Output nodes */}
        {outputs.map((out, i) => (
          <motion.g
            key={`on-${i}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.5, ease: EASE }}
          >
            <rect x={out.x - 46} y={out.y - 14} width={92} height={28} rx={6} fill={`${out.color}18`} stroke={`${out.color}45`} strokeWidth={1} />
            <text x={out.x} y={out.y + 4} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="'Source Sans 3', sans-serif">
              {out.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

function CapabilityCard({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  return (
    <motion.div
      className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-brand/25 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
    >
      {/* Subtle top accent */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-brand"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: EASE }}
      />
      <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-brand-light text-brand shrink-0">
        {cap.icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug">{cap.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
      <ul className="flex flex-col gap-1.5 mt-auto">
        {cap.points.map((pt) => (
          <li key={pt} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
            {pt}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SpotlightDataFabrics() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100dvh-4rem)] flex flex-col justify-center bg-brand-navy">
        {/* Cooler blue/indigo tones — "stable foundation" feel */}
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-indigo-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-cyan-500/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div className="flex flex-col gap-8" variants={stagger()} initial="hidden" animate="show">
              <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-2.5">
                <PulsingDot color="bg-cyan-400" />
                <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
                  Phoenix AIP — Spotlight Data Fabrics
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                One Unified{' '}
                <span className="text-cyan-400">Data Layer</span>{' '}
                <span className="text-white/60">for Everything.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-base sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Spotlight Data Fabrics brings all your structured and unstructured data into a single, AI-ready platform — with a built-in ETL engine and integrated ML and MLOps, so you can store, transform, and model in one place.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Link
                  to="/about/contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-7 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-brand/30"
                >
                  Request Demo
                  <ArrowIcon />
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-semibold px-7 py-3.5 rounded-sm border border-white/15 hover:border-white/30 transition-colors duration-200"
                >
                  Explore Platform
                </a>
              </motion.div>
            </motion.div>

            {/* Data convergence diagram */}
            <motion.div
              className="hidden lg:flex items-center justify-center h-72 lg:h-80"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            >
              <DataConvergenceDiagram />
            </motion.div>
          </div>

          {/* Trust bar */}
          <motion.div
            className="mt-20 pt-8 border-t border-white/10 flex flex-wrap gap-6 lg:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            {['Structured + unstructured data', 'SpeedDB columnar warehouse engine', 'Real-time ingestion & analytics', 'Built-in ETL & pipeline runtime', 'Integrated ML & MLOps', 'Enterprise governance built-in'].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
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
              <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
                The Problem
              </motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Enterprise data is <span className="text-brand">fragmented and hard to use.</span>
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
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Spotlight Data Fabrics unifies everything</span>
                </div>
                <p className="text-white/60 leading-relaxed text-sm">
                  Fragmented data costs enterprises in missed AI opportunities, duplicated infrastructure, and inconsistent governance. Spotlight Data Fabrics brings it all together — one platform, one truth, governed from the start.
                </p>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-cyan-400 text-sm font-semibold italic">
                    "The foundation that powers intelligence and execution."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What Is Spotlight Data Fabrics ──────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div
            className="flex flex-col gap-6 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
              What Is Spotlight Data Fabrics?
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              The flexibility of a lake. The performance of a warehouse. <span className="text-brand">The workbench to build on both.</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-gray-500 leading-relaxed max-w-2xl">
              A unified data platform optimised for AI, analytics, and real-time access — combining the openness of a data lake with the governance and performance of a data warehouse, powered by our own SpeedDB columnar engine, with a built-in ETL runtime and the full ML lifecycle on top.
            </motion.p>

            {/* Lake + Warehouse → Lakehouse visual */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-6 w-full max-w-2xl"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex-1 rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center">
                  <p className="text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-1.5">Data Lake</p>
                  <p className="text-xs text-indigo-700/80">Flexible storage<br />Any data type<br />Low governance</p>
                </div>
                <div className="flex items-center justify-center shrink-0">
                  <span className="text-gray-500 text-xl">+</span>
                </div>
                <div className="flex-1 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-center">
                  <p className="text-xs font-semibold text-cyan-700 uppercase tracking-widest mb-1.5">Data Warehouse</p>
                  <p className="text-xs text-cyan-700/80">Fast querying<br />Structured data<br />Strong governance</p>
                </div>
                <div className="flex items-center justify-center shrink-0">
                  <span className="text-gray-500 text-xl">=</span>
                </div>
                <div className="flex-1 rounded-xl border border-brand/30 bg-brand-light p-4 text-center">
                  <p className="text-xs font-semibold text-brand-dark uppercase tracking-widest mb-1.5">Spotlight Data Fabrics</p>
                  <p className="text-xs text-brand-dark/80">Best of both<br />AI-ready<br />Governed by design</p>
                </div>
              </div>
            </motion.div>

            {/* One platform, three layers */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="w-full max-w-2xl"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">One platform, four layers</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { layer: 'Storage', sub: 'Lakehouse for structured, unstructured and vector data' },
                  { layer: 'SpeedDB', sub: 'Columnar warehouse engine with real-time ingestion' },
                  { layer: 'ETL Runtime', sub: 'Pipelines, transformations and script execution' },
                  { layer: 'ML & MLOps', sub: 'Training, deployment, registry and monitoring' },
                ].map((l) => (
                  <div key={l.layer} className="rounded-xl border border-gray-200 bg-white p-4 text-left">
                    <p className="text-sm font-semibold text-brand mb-1">{l.layer}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{l.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid sm:grid-cols-3 gap-4 mt-4 w-full max-w-2xl"
            >
              {[
                { label: 'Not just a place to store', sub: 'A place to build, train, and ship' },
                { label: 'Not just a lake', sub: 'Structured + semantic intelligence' },
                { label: 'Not just centralised', sub: 'Governed and secure by design' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-4 text-left border border-gray-100">
                  <p className="text-xs text-gray-500 line-through mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-brand-dark">{item.sub}</p>
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
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
              Core Capabilities
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Built for modern data <span className="text-brand">and AI workloads.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {CAPABILITIES.map((cap, i) => (
              <CapabilityCard key={cap.id} cap={cap} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SpeedDB ──────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger()}
            >
              <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
                The Engine Inside
              </motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Warehouse-grade speed, <span className="text-brand">already included.</span>
              </motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-gray-500 leading-relaxed">
                SpeedDB is our own analytical database — a columnar engine built for data warehousing, where records become queryable the moment they arrive rather than after the next batch load. It ships as part of Spotlight Data Fabrics, so the warehouse layer is something you configure, not something you buy and integrate.
              </motion.p>
              <motion.ul variants={stagger(0.1)} className="flex flex-col gap-3 mt-1">
                {SPEEDDB_REASONS.map((r, i) => (
                  <motion.li
                    key={r}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <span className="mt-1 w-5 h-5 rounded-full bg-brand-light text-brand flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                    {r}
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
              <div className="bg-brand-navy rounded-2xl p-8 border border-brand-navy-border flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand/20 text-brand flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">SpeedDB</h3>
                    <p className="text-white/50 text-xs">Columnar analytical database</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {SPEEDDB_SPECS.map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/8">
                      <div className="w-6 h-6 rounded-md bg-brand/20 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
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
              From raw input to <span className="text-cyan-400">AI-ready output.</span>
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-white/10" />

            <div
              className="grid grid-cols-2 lg:grid-cols-5 gap-8"
              role="tablist"
              aria-label="How Spotlight Data Fabrics works"
            >
              {HOW_IT_WORKS.map((step, i) => (
                <motion.button
                  key={step.step}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === i}
                  aria-controls="spotlight-step-detail"
                  className="flex flex-col gap-4 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
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
              id="spotlight-step-detail"
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
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
              Key Use Cases
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              The data backbone for every <span className="text-brand">modern workload.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.title}
                className="group border border-gray-100 rounded-xl p-6 hover:border-brand/25 hover:shadow-md transition-all duration-300 bg-white flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
                    {uc.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight">{uc.title}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {uc.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
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
      <section className="bg-brand-light">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
              Business Outcomes
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              What a solid foundation <span className="text-brand">makes possible.</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OUTCOMES.map((o, i) => (
              <motion.div
                key={o.label}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-brand/10 flex flex-col gap-3 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <span className="text-3xl" aria-hidden="true">
                  {o.icon}
                </span>
                <span className="text-4xl font-bold text-brand font-display">{o.metric}</span>
                <p className="text-sm text-gray-500 leading-snug">{o.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Differentiation + Governance ─────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: why */}
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger()}
            >
              <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
                Why Spotlight Data Fabrics
              </motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                The foundation that powers <span className="text-brand">intelligence and execution.</span>
              </motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-gray-500 leading-relaxed">
                Most data platforms force a trade-off between flexibility and governance — then leave the warehouse engine, the pipelines, and the modelling to separate tools you have to buy and join together. Spotlight Data Fabrics was designed so you never have to choose: every dataset is open, structured, secured, and AI-ready from the moment it lands, with SpeedDB, the ETL engine, and the ML workbench already in the box.
              </motion.p>

              <motion.div variants={stagger(0.1)} className="flex flex-col gap-4 mt-2">
                {[
                  { before: 'Just storage', after: 'AI-ready data platform' },
                  { before: 'Data lake or warehouse', after: 'Structured + semantic intelligence' },
                  { before: 'Centralised chaos', after: 'Governed and secure by design' },
                ].map((row) => (
                  <motion.div key={row.before} variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 line-through w-40 shrink-0">{row.before}</span>
                    <ArrowIcon />
                    <span className="text-sm font-semibold text-gray-800">{row.after}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Integration in the Phoenix AIP stack */}
              <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="mt-2 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
                <h3 className="font-bold text-gray-900">Integration & Ecosystem</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'DataForge', sub: 'Where AI agents build and populate warehouses in the fabric' },
                    { label: 'Phoenix Insights', sub: 'Serves clean data to the intelligence & reasoning layer' },
                    { label: 'Cortexus', sub: 'Supplies context and state to the execution engine' },
                    { label: 'BI & Analytics tools', sub: 'Feeds dashboards, reports, and downstream apps' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: expanded governance */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            >
              <div className="bg-brand-navy rounded-2xl p-8 border border-brand-navy-border flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand/20 text-brand flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Security & Governance</h3>
                    <p className="text-xs text-white/60 mt-0.5">Enterprise-grade from day one</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {GOVERNANCE_ITEMS.map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/8">
                      <div className="w-6 h-6 rounded-md bg-brand/20 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

      {/* ── Spotlight Data Fabrics in Action ─────────────────────────────────── */}
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
              Spotlight in Action
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              See the fabric <span className="text-brand">at work.</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-gray-500 leading-relaxed">
              Watch semantic search, vector embeddings and the knowledge graph come together — stored data turned into context you can query.
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
              src={`https://www.youtube-nocookie.com/embed/${SPOTLIGHT_VIDEO_ID}`}
              title="Spotlight Data Fabrics product walkthrough"
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
              <PulsingDot color="bg-cyan-400" />
              <span className="text-sm font-semibold text-brand-light/50 uppercase tracking-widest">Get Started</span>
            </motion.div>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-4xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Ready to Unify Your{' '}
              <span className="text-cyan-400">Data for AI?</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-lg text-white/55 leading-relaxed">
              See Spotlight Data Fabrics consolidate your data estate into a single, governed, AI-ready platform — in a live demo tailored to your stack.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/about/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-brand/30"
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
