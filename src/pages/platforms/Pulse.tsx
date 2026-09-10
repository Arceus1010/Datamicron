import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

// Listed descriptively as coverage — plain text only, no platform logos or marks.
const PLATFORMS = ['Facebook', 'Instagram', 'X', 'YouTube', 'TikTok', 'News portals']

const CAPABILITIES = [
  {
    id: 'monitoring',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    ),
    title: 'Multi-platform monitoring',
    description:
      'One search covers six platforms at once, with duplicate results filtered out automatically.',
  },
  {
    id: 'sentiment',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
        />
      </svg>
    ),
    title: 'AI sentiment analysis',
    description:
      'Understands Bahasa Malaysia and English natively, combining a local language model with AI scoring for context and nuance.',
  },
  {
    id: 'pestle',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v18m0-18 7.794 4.5v9L12 21l-7.794-4.5v-9L12 3Z"
        />
      </svg>
    ),
    title: 'PESTLE risk scoring',
    description:
      'Classifies public discourse across Political, Economic, Social, Technological, Legal, and Environmental dimensions, each with its own risk rating.',
  },
  {
    id: 'entities',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
        />
      </svg>
    ),
    title: 'Entities, topics & networks',
    description:
      'Identifies the people, organisations, and themes in the conversation, and maps how they connect in a visual relationship graph.',
  },
  {
    id: 'research',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    ),
    title: 'AI research workspace',
    description:
      'Commission multi-step investigations that plan their own approach, search, and return structured reports — with every reasoning step logged and reviewable.',
  },
  {
    id: 'scheduled',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    title: 'Scheduled monitoring',
    description:
      'Set recurring jobs on any keyword or topic and track how sentiment shifts across weeks and months.',
  },
]

const AUDIENCES = [
  {
    role: 'Communications & media units',
    outcome: 'Track public reaction to announcements as it happens',
  },
  {
    role: 'Security & intelligence teams',
    outcome: 'Follow entities and networks across platforms',
  },
  {
    role: 'Policy & research departments',
    outcome: 'Classify discourse by risk dimension before a decision',
  },
  {
    role: 'Crisis management teams',
    outcome: 'Catch early warning signals before a trend peaks',
  },
]

const ASSISTANT_QUESTIONS = [
  'What is driving the negative sentiment this week?',
  'Which topics carry the highest political risk?',
]

// PESTLE dimensions with illustrative risk ratings for the radar visual
const PESTLE = [
  { axis: 'Political', value: 0.82 },
  { axis: 'Economic', value: 0.55 },
  { axis: 'Social', value: 0.74 },
  { axis: 'Technological', value: 0.38 },
  { axis: 'Legal', value: 0.46 },
  { axis: 'Environmental', value: 0.29 },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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

// Sentiment trend shown in the hero mock — normalised 0–1
const TREND = [0.42, 0.38, 0.46, 0.4, 0.34, 0.3, 0.36, 0.28, 0.22, 0.26, 0.18, 0.14]

function ListeningVisual() {
  const W = 460
  const H = 120

  const points = TREND.map((v, i) => ({
    x: (i / (TREND.length - 1)) * W,
    y: (1 - v) * H,
  }))
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${W},${H} L0,${H} Z`

  return (
    <div className="relative w-full max-w-lg">
      <motion.div
        className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm p-5 flex flex-col gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
            Sentiment over time
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/60">
            <PulsingDot color="bg-brand" />
            Live
          </span>
        </div>

        {/* Sentiment split */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Negative', value: '48%' },
            { label: 'Neutral', value: '37%' },
            { label: 'Positive', value: '15%' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 flex flex-col gap-0.5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: EASE }}
            >
              <span className="text-lg font-bold font-display text-white">{s.value}</span>
              <span className="text-[10px] uppercase tracking-wider text-white/60">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Trend chart */}
        <div className="rounded-xl border border-white/8 bg-brand-navy/60 p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            <defs>
              <linearGradient id="pulseTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#117EC2" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#117EC2" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#pulseTrend)" />
            <motion.path
              d={line}
              fill="none"
              stroke="#117EC2"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
            />
          </svg>
          <div className="mt-3 pt-3 border-t border-white/8 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/55">
            <span>Week 1</span>
            <span>Week 6</span>
            <span>Week 12</span>
          </div>
        </div>
      </motion.div>

      {/* Platform coverage — names only, per trademark guidance */}
      <motion.div
        className="mt-3 rounded-xl border border-white/8 bg-white/2 px-4 py-3 flex flex-wrap gap-x-4 gap-y-1.5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
      >
        {PLATFORMS.map((item) => (
          <span key={item} className="flex items-center gap-1.5 text-xs text-white/60">
            <span className="w-1 h-1 rounded-full bg-brand/70 shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function PestleRadar() {
  const cx = 150
  const cy = 145
  const rMax = 95

  const pointAt = (i: number, r: number) => {
    const angle = ((-90 + i * (360 / PESTLE.length)) * Math.PI) / 180
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const ring = (scale: number) =>
    PESTLE.map((_, i) => {
      const p = pointAt(i, rMax * scale)
      return `${p.x},${p.y}`
    }).join(' ')

  const shape = PESTLE.map((d, i) => {
    const p = pointAt(i, rMax * d.value)
    return `${p.x},${p.y}`
  }).join(' ')

  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full h-auto max-w-sm mx-auto"
      role="img"
      aria-label="Radar chart rating public discourse across six PESTLE risk dimensions, with Political and Social scoring highest."
    >
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon
          key={s}
          points={ring(s)}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={1}
        />
      ))}

      {PESTLE.map((d, i) => {
        const p = pointAt(i, rMax)
        return (
          <line
            key={d.axis}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={1}
          />
        )
      })}

      <motion.polygon
        points={shape}
        fill="rgba(17,126,194,0.18)"
        stroke="#117EC2"
        strokeWidth={1.75}
        initial={{ opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {PESTLE.map((d, i) => {
        const p = pointAt(i, rMax * d.value)
        return <circle key={d.axis} cx={p.x} cy={p.y} r={3.5} fill="#117EC2" />
      })}

      {PESTLE.map((d, i) => {
        const p = pointAt(i, rMax + 22)
        const anchor = p.x > cx + 5 ? 'start' : p.x < cx - 5 ? 'end' : 'middle'
        return (
          <text
            key={d.axis}
            x={p.x}
            y={p.y + 3}
            textAnchor={anchor}
            fill="rgba(255,255,255,0.75)"
            fontSize="11"
            fontFamily="'Source Sans 3', sans-serif"
          >
            {d.axis}
          </text>
        )
      })}
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Pulse() {
  return (
    <div className="bg-white">
      {/* ── 01 · Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100dvh-4rem)] flex flex-col justify-center bg-brand-navy">
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-brand/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="flex flex-col gap-8"
              variants={stagger()}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex items-center gap-2.5"
              >
                <PulsingDot color="bg-brand" />
                <span className="text-sm font-semibold text-brand uppercase tracking-widest">
                  Platforms — Pulse
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Pulse
                <span className="block mt-3 text-xl sm:text-2xl lg:text-3xl text-brand leading-snug">
                  Social Media &amp; News Intelligence Platform
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-base sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                From a single search, Pulse collects public discourse across Facebook, Instagram, X,
                YouTube, TikTok, and news portals, then analyses sentiment, topics, risks, and the
                accounts driving the conversation — all in one interactive dashboard.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Link
                  to="/about/contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-7 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-brand/25"
                >
                  Request a Demo
                  <ArrowIcon />
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-semibold px-7 py-3.5 rounded-sm border border-white/15 hover:border-white/30 transition-colors duration-200"
                >
                  What Pulse Does
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="hidden lg:flex items-center justify-center"
              aria-hidden="true"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            >
              <ListeningVisual />
            </motion.div>
          </div>

          {/* Trust bar */}
          <motion.div
            className="mt-20 pt-8 border-t border-white/10 flex flex-wrap gap-6 lg:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            {[
              'Six platforms, one search',
              'Bahasa Malaysia and English',
              'PESTLE risk scoring',
              'Runs on your own infrastructure',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 02 · Why Pulse ───────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div
            className="flex flex-col gap-6 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-sm font-semibold text-brand uppercase tracking-widest"
            >
              Why Pulse
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Know what the public is saying —{' '}
              <span className="text-brand">before it becomes a crisis.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-base sm:text-xl text-gray-500 leading-relaxed max-w-2xl"
            >
              Public sentiment moves at the speed of social media. A single viral post or an
              emerging narrative can shift public perception overnight, yet most organisations still
              monitor one platform at a time, by hand, and find out too late.
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl"
            >
              Built with native Bahasa Malaysia and English understanding, Pulse is designed for
              organisations that need an accurate read on public opinion in the Malaysian context.
              It runs on your own infrastructure, so sensitive data never leaves your environment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── 03 · What Pulse Does ─────────────────────────────────────────────── */}
      <section id="capabilities" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-sm font-semibold text-brand uppercase tracking-widest"
            >
              What Pulse Does
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Six platforms, one <span className="text-brand">analysis pipeline.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.id}
                className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-brand/40 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: EASE }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-brand to-cyan-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + (i % 3) * 0.1, ease: EASE }}
                />
                <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-brand-light text-brand shrink-0">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug">
                  {cap.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · PESTLE risk view ────────────────────────────────────────────── */}
      <section className="bg-brand-navy">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger()}
            >
              <motion.span
                variants={fadeUp}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-sm font-semibold text-brand uppercase tracking-widest"
              >
                Risk Dimensions
              </motion.span>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.55, ease: EASE }}
                className="text-3xl sm:text-4xl font-bold text-white leading-[1.1] tracking-tight"
              >
                Every conversation, scored across{' '}
                <span className="text-brand">six risk dimensions.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.55, ease: EASE }}
                className="text-white/60 leading-relaxed"
              >
                Pulse classifies public discourse across Political, Economic, Social, Technological,
                Legal, and Environmental dimensions — each with its own risk rating, so teams can
                see which pressures are building before acting on them.
              </motion.p>
              <motion.ul
                variants={stagger(0.08)}
                className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-2"
              >
                {PESTLE.map((d) => (
                  <motion.li
                    key={d.axis}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="flex items-center gap-2.5 text-sm text-white/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {d.axis}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
            >
              <PestleRadar />
              <p className="text-center text-xs text-white/55 mt-4">
                Illustrative ratings shown for demonstration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 05 · Ask it anything ─────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <motion.div
            className="rounded-2xl border border-brand/15 bg-brand-light/40 p-8 sm:p-10 flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white text-brand flex items-center justify-center shrink-0 border border-brand/15">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Ask it anything
              </h2>
            </div>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Pulse includes a built-in AI assistant that answers questions about your own collected
              data in plain language.
            </p>

            <ul className="flex flex-col gap-3">
              {ASSISTANT_QUESTIONS.map((q) => (
                <li
                  key={q}
                  className="bg-white rounded-xl border border-brand/15 px-5 py-3.5 text-sm sm:text-base text-gray-700 italic"
                >
                  “{q}”
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── 06 · Who it's for ────────────────────────────────────────────────── */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-sm font-semibold text-brand uppercase tracking-widest"
            >
              Who It's For
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Built for the teams watching <span className="text-brand">public opinion.</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AUDIENCES.map((a, i) => (
              <motion.div
                key={a.role}
                className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-2.5 shadow-sm hover:border-brand/40 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              >
                <span className="w-8 h-px bg-brand" />
                <h3 className="text-base font-bold text-gray-900 tracking-tight leading-snug">
                  {a.role}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 · CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-brand-navy">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <motion.div
            className="flex flex-col items-center gap-6 max-w-2xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger(0.14)}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-2.5"
            >
              <PulsingDot color="bg-brand" />
              <span className="text-sm font-semibold text-brand-light/60 uppercase tracking-widest">
                Get Started
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
            >
              See Pulse <span className="text-brand">in action.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-base sm:text-lg text-white/60 leading-relaxed"
            >
              We run live demonstrations using topics relevant to your work — a real search, real
              analysis, real results.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                to="/about/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-brand/25"
              >
                Request a Demo
                <ArrowIcon />
              </Link>
              <Link
                to="/about/contact"
                className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-semibold px-8 py-3.5 rounded-sm border border-white/15 hover:border-white/30 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
