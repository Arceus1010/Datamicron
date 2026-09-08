import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PHOENIX_INSIGHTS_VIDEO_ID = 'wYqkoDpz-B8'

const CAPABILITIES = [
  {
    id: 'predictive',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    title: 'Predictive Analytics',
    description: 'Forecast trends and outcomes with AI models that identify risks and opportunities before they surface — shifting your organisation from reactive to proactive.',
    points: ['Trend and outcome forecasting', 'Early risk & opportunity detection', 'Proactive decision support'],
  },
  {
    id: 'llm',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    title: 'LLM Reasoning',
    description: 'Ask questions in natural language and receive contextual answers grounded in your enterprise data — no SQL, no dashboards, just instant intelligence.',
    points: ['Natural language data querying', 'Context-aware answer generation', 'Instant insight synthesis'],
  },
  {
    id: 'knowledge',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 0 0 .284 2.253" />
      </svg>
    ),
    title: 'Knowledge Graph',
    description: 'Connect data across systems into a web of meaning — building contextual relationships between business entities so every insight is grounded in full context.',
    points: ['Cross-system entity linking', 'Contextual relationship mapping', 'Deeper business understanding'],
  },
  {
    id: 'simulation',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'Simulation & Digital Twin',
    description: 'Model real-world scenarios against your live data, test decisions before committing resources, and optimise strategy with confidence and zero risk.',
    points: ['Scenario modelling & what-if analysis', 'Pre-execution decision testing', 'Strategy optimisation at scale'],
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    label: 'Ingest',
    description: 'Pulls structured and unstructured data from across your enterprise — databases, documents, streams, and APIs — into a unified context layer.',
    color: 'bg-brand/10 text-brand border-brand/20',
  },
  {
    step: '02',
    label: 'Understand',
    description: 'Builds a knowledge graph from raw data, connecting entities, relationships, and meaning so every insight has full context behind it.',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    step: '03',
    label: 'Predict',
    description: 'Applies AI models, predictive analytics, and LLM reasoning to surface trends, risks, and opportunities before they become visible.',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    step: '04',
    label: 'Recommend',
    description: 'Generates clear, explainable insight cards and decision options — ready to act on directly or pass to Cortexus for autonomous execution.',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
]

const USE_CASES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75" />
      </svg>
    ),
    title: 'Business Strategy',
    items: ['Market trend forecasting', 'Scenario planning & simulation', 'Competitive intelligence analysis'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    title: 'Finance',
    items: ['Risk analysis & exposure modelling', 'Revenue forecasting', 'Budget variance detection'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: 'Customer Intelligence',
    items: ['Behaviour prediction & churn signals', 'Personalisation insights', 'Segment-level opportunity scoring'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: 'Operations',
    items: ['Demand forecasting', 'Process optimisation', 'Capacity planning intelligence'],
  },
]

const OUTCOMES = [
  { icon: '🧠', metric: '5×', label: 'Faster decision-making cycles' },
  { icon: '🔮', metric: '40%', label: 'Improvement in forecast accuracy' },
  { icon: '📊', metric: '360°', label: 'Unified view of enterprise data' },
  { icon: '🚀', metric: '2×', label: 'Competitive advantage through insight' },
]

const PROBLEMS = [
  'Insights are fragmented across disconnected tools',
  'Analytics are reactive, not predictive',
  'Data lacks context and business meaning',
  'Decision-making is slow and inconsistent',
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

function PulsingDot({ color = 'bg-orange-400' }: { color?: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <motion.span
        className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
        animate={{ scale: [1, 1.8], opacity: [0.75, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
      />
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
    </span>
  )
}

// Animated insight visualisation for the hero
function InsightVisual() {
  // Simulated sparkline data points (normalised 0–1)
  const lineA = [0.5, 0.45, 0.55, 0.4, 0.6, 0.5, 0.65, 0.7, 0.6, 0.75, 0.8, 0.85]
  const lineB = [0.3, 0.35, 0.28, 0.4, 0.35, 0.42, 0.38, 0.45, 0.5, 0.48, 0.55, 0.6]

  const W = 520
  const H = 200
  const pad = { x: 32, y: 20 }

  const toPath = (points: number[]) =>
    points
      .map((v, i) => {
        const x = pad.x + (i / (points.length - 1)) * (W - pad.x * 2)
        const y = pad.y + (1 - v) * (H - pad.y * 2)
        return `${i === 0 ? 'M' : 'L'}${x},${y}`
      })
      .join(' ')

  const pathA = toPath(lineA)
  const pathB = toPath(lineB)

  // Area fill path
  const toArea = (points: number[]) => {
    const line = toPath(points)
    const lastX = pad.x + (W - pad.x * 2)
    const firstX = pad.x
    const bottom = H - pad.y
    return `${line} L${lastX},${bottom} L${firstX},${bottom} Z`
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Card backdrop */}
      <div className="relative w-full max-w-lg bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">Revenue Intelligence</span>
            <span className="text-2xl font-bold text-white font-display">$4.2M</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
            +18.4% predicted
          </div>
        </div>

        {/* Chart */}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#117EC2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#117EC2" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((v) => (
            <line
              key={v}
              x1={pad.x}
              y1={pad.y + (1 - v) * (H - pad.y * 2)}
              x2={W - pad.x}
              y2={pad.y + (1 - v) * (H - pad.y * 2)}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          ))}

          {/* Area fills */}
          <path d={toArea(lineA)} fill="url(#gradA)" />
          <path d={toArea(lineB)} fill="url(#gradB)" />

          {/* Lines */}
          <motion.path
            d={pathA}
            fill="none"
            stroke="#117EC2"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
          />
          <motion.path
            d={pathB}
            fill="none"
            stroke="#F97316"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.7 }}
          />

          {/* Forecast annotation dot at end of line A */}
          <motion.circle
            cx={pad.x + (W - pad.x * 2)}
            cy={pad.y + (1 - lineA[lineA.length - 1]) * (H - pad.y * 2)}
            r={5}
            fill="#117EC2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.4, ease: EASE }}
          />
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-3">
          <span className="flex items-center gap-1.5 text-xs text-white/50">
            <span className="w-4 h-0.5 rounded bg-brand inline-block" />
            Actual
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/50">
            <span className="w-4 h-0.5 rounded bg-orange-400 inline-block" style={{ borderTop: '2px dashed #F97316', background: 'none' }} />
            AI Forecast
          </span>
        </div>

        {/* Insight card overlay */}
        <motion.div
          className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 flex items-start gap-2.5 max-w-45 border border-gray-100"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.5, ease: EASE }}
        >
          <div className="w-7 h-7 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800 leading-snug">AI Recommendation</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-snug">Increase Q3 inventory by 12% in Western region</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function CapabilityCard({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  return (
    <motion.div
      className="group relative bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-orange-300/40 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-brand to-orange-400"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: EASE }}
      />
      <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-orange-50 text-orange-500 shrink-0">
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

export default function PhoenixInsights() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-brand-navy">
        {/* Ambient blobs — warmer orange tint to differentiate from Cortexus */}
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-orange-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-orange-400/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div className="flex flex-col gap-8" variants={stagger()} initial="hidden" animate="show">
              <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-2.5">
                <PulsingDot color="bg-orange-400" />
                <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest">
                  Phoenix AIP — Phoenix Insights
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                From Data to{' '}
                <span className="text-orange-400">Decisions</span>
                <span className="text-white/60">—In Real Time.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Phoenix Insights transforms enterprise data into actionable intelligence using AI reasoning, predictive analytics, and knowledge-driven insights.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Link
                  to="/about/contact"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-base font-semibold px-7 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-orange-500/25"
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

            {/* Insight chart visual */}
            <motion.div
              className="hidden lg:flex items-center justify-center h-72 lg:h-80"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            >
              <InsightVisual />
            </motion.div>
          </div>

          {/* Trust bar */}
          <motion.div
            className="mt-20 pt-8 border-t border-white/10 flex flex-wrap gap-6 lg:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            {['Predictive & prescriptive analytics', 'LLM-powered reasoning', 'Knowledge graph intelligence', 'Explainable AI outputs'].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
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
              <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-orange-500 uppercase tracking-widest">
                The Problem
              </motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Drowning in data, starving for <span className="text-orange-500">decisions.</span>
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
                  <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Phoenix Insights closes the gap</span>
                </div>
                <p className="text-white/60 leading-relaxed text-sm">
                  Raw data has no voice. Phoenix Insights gives it one — turning fragmented signals into clear, contextual, and predictive intelligence your teams can act on immediately.
                </p>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-orange-400 text-sm font-semibold italic">
                    "The intelligence layer that powers autonomous enterprises."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What Is Phoenix Insights ─────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div
            className="flex flex-col gap-6 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-orange-500 uppercase tracking-widest">
              What Is Phoenix Insights?
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              An AI-powered <span className="text-orange-500">decision intelligence</span> platform.
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-gray-500 leading-relaxed max-w-2xl">
              Phoenix Insights combines predictive analytics, LLM reasoning, and knowledge graphs to help organisations understand, predict, and act with confidence.
            </motion.p>

            {/* Transformation visual: raw → insight → decision */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-6 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between gap-2">
                {[
                  { label: 'Raw Data', sub: 'Fragmented signals', color: 'bg-gray-100 text-gray-500 border-gray-200' },
                  { label: 'Insight', sub: 'Context & meaning', color: 'bg-orange-50 text-orange-600 border-orange-200' },
                  { label: 'Decision', sub: 'Confident action', color: 'bg-brand-light text-brand border-brand/20' },
                ].map((item, i) => (
                  <div key={item.label} className="flex items-center gap-2 flex-1">
                    <div className={`flex-1 rounded-lg p-4 border text-center ${item.color}`}>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-xs opacity-70">{item.sub}</p>
                    </div>
                    {i < 2 && (
                      <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    )}
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
                { label: 'Not just dashboards', sub: 'Intelligent reasoning' },
                { label: 'Not just analytics', sub: 'Predictive + prescriptive' },
                { label: 'Not just data', sub: 'Contextual understanding' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-4 text-left border border-gray-100">
                  <p className="text-xs text-gray-400 line-through mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-orange-500">{item.sub}</p>
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
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-orange-500 uppercase tracking-widest">
              Core Capabilities
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Intelligence that goes beyond <span className="text-orange-500">the dashboard.</span>
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
              Four steps from raw data to <span className="text-orange-400">clear decisions.</span>
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-white/10" />

            <div className="grid lg:grid-cols-4 gap-8">
              {HOW_IT_WORKS.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="flex flex-col gap-4 cursor-pointer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
                  onClick={() => setActiveStep(i)}
                >
                  <div className={`relative w-24 h-24 mx-auto rounded-2xl border flex items-center justify-center flex-col gap-1 transition-all duration-300 ${activeStep === i ? `${step.color} scale-105 shadow-lg` : 'bg-white/5 border-white/10 text-white/40'}`}>
                    <span className="text-2xl font-bold font-display">{step.step}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">{step.label}</span>
                    {i < HOW_IT_WORKS.length - 1 && (
                      <div className="lg:hidden absolute -right-5 top-1/2 -translate-y-1/2 text-white/20 text-lg">→</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={activeStep}
              className="mt-10 max-w-xl mx-auto text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
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
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-orange-500 uppercase tracking-widest">
              Key Use Cases
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Intelligence across every <span className="text-orange-500">business function.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.title}
                className="group border border-gray-100 rounded-xl p-6 hover:border-orange-300/50 hover:shadow-md transition-all duration-300 bg-white flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                    {uc.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight">{uc.title}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {uc.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
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
      <section className="bg-orange-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-orange-500 uppercase tracking-widest">
              Business Outcomes
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Intelligence that <span className="text-orange-500">moves the needle.</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OUTCOMES.map((o, i) => (
              <motion.div
                key={o.label}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-orange-100 flex flex-col gap-3 items-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              >
                <span className="text-3xl">{o.icon}</span>
                <span className="text-4xl font-bold text-orange-500 font-display">{o.metric}</span>
                <p className="text-sm text-gray-500 leading-snug">{o.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Differentiation + Integration ────────────────────────────────────── */}
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
              <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-orange-500 uppercase tracking-widest">
                Why Phoenix Insights
              </motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                The intelligence layer that powers <span className="text-orange-500">autonomous enterprises.</span>
              </motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-gray-500 leading-relaxed">
                Most analytics platforms tell you what happened. Phoenix Insights tells you what will happen — and what to do about it. Grounded in knowledge graphs and powered by LLM reasoning, every insight is traceable, explainable, and ready to act on.
              </motion.p>

              <motion.div variants={stagger(0.1)} className="flex flex-col gap-4 mt-2">
                {[
                  { before: 'Static dashboards', after: 'Intelligent reasoning' },
                  { before: 'Reactive analytics', after: 'Predictive + prescriptive' },
                  { before: 'Raw data', after: 'Contextual knowledge' },
                ].map((row) => (
                  <motion.div key={row.before} variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-4">
                    <span className="text-sm text-gray-400 line-through w-36 shrink-0">{row.before}</span>
                    <ArrowIcon />
                    <span className="text-sm font-semibold text-gray-800">{row.after}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            >
              {/* Integration in the Phoenix AIP stack */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-5">
                <h3 className="font-bold text-gray-900 text-lg">Integration & Ecosystem</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Spotlight Data Fabrics', sub: 'Pulls from your semantic & vector storage layer' },
                    { label: 'Cortexus', sub: 'Feeds decisions into the autonomous execution engine' },
                    { label: 'DataForge', sub: 'Works across structured + unstructured data pipelines' },
                    { label: 'External sources', sub: 'REST APIs, cloud DWs, SaaS, and streaming data' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                        <p className="text-xs text-gray-400">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-navy rounded-2xl p-6 border border-brand-navy-border flex flex-col gap-5">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  Security & Governance
                </h3>
                <div className="flex flex-col gap-2.5">
                  {['Data lineage and full traceability', 'Explainable AI outputs', 'Enterprise-grade compliance', 'Role-based data access'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Phoenix Insights in Action ───────────────────────────────────────── */}
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
              Phoenix Insights in Action
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              See the decisions <span className="text-brand">surface.</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-gray-500 leading-relaxed">
              Watch Phoenix Insights turn enterprise data into forecasts and recommendations that reach business users where the decision actually gets made.
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
              src={`https://www.youtube-nocookie.com/embed/${PHOENIX_INSIGHTS_VIDEO_ID}`}
              title="Phoenix Insights product walkthrough"
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
              <PulsingDot color="bg-orange-400" />
              <span className="text-sm font-semibold text-brand-light/50 uppercase tracking-widest">Get Started</span>
            </motion.div>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-4xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Ready to Make Smarter{' '}
              <span className="text-orange-400">Decisions at Scale?</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-lg text-white/55 leading-relaxed">
              See Phoenix Insights turn your enterprise data into clear, predictive, and actionable intelligence in a live demo.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/about/contact"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-orange-500/25"
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
