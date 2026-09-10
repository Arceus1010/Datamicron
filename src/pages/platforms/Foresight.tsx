import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const FORESIGHT_VIDEO_ID = 'oFiDv_2QWDM'

const WHY_FORESIGHT = [
  {
    id: 'training',
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
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
        />
      </svg>
    ),
    title: 'Automated Model Training',
    description:
      'Auto AI and machine learning let users create and train models efficiently and on their own terms — with or without coding.',
  },
  {
    id: 'exploration',
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
    title: 'Advanced Data Exploration',
    description:
      'Dive deep into your datasets to uncover hidden patterns and insight with ease, streamlining data preprocessing along the way.',
  },
  {
    id: 'ingestion',
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
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
    title: 'Seamless Data Ingestion',
    description:
      'Connect to a multitude of data sources — relational databases, NoSQL stores, local files and more — without bespoke loaders.',
  },
]

const CAPABILITIES = [
  {
    title: 'Feature Engineering',
    description: 'Transform raw data into the features that lift machine learning performance.',
  },
  {
    title: 'Model Creation & Training',
    description: 'Create and train models efficiently, with or without writing code.',
  },
  {
    title: 'Deploying',
    description:
      'Integrate trained models into the production environment where they drive the business.',
  },
  {
    title: 'Cluster Analysis',
    description:
      'Dive into the hidden structure of your data and see the groupings it forms on its own.',
  },
  {
    title: 'End-to-End Data Mining',
    description: 'Every task in the analytics life cycle handled on one automated platform.',
  },
  {
    title: 'Predictive Outcomes',
    description: 'Predict outcomes for unforeseen data and solve real-world computation problems.',
  },
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

// Studio visual — clusters forming as a model trains
const CLUSTER_POINTS = [
  { x: 54, y: 52, tone: 'fill-brand' },
  { x: 70, y: 38, tone: 'fill-brand' },
  { x: 44, y: 74, tone: 'fill-brand' },
  { x: 78, y: 66, tone: 'fill-brand' },
  { x: 62, y: 88, tone: 'fill-brand' },
  { x: 168, y: 46, tone: 'fill-cyan-400' },
  { x: 190, y: 66, tone: 'fill-cyan-400' },
  { x: 158, y: 76, tone: 'fill-cyan-400' },
  { x: 204, y: 40, tone: 'fill-cyan-400' },
  { x: 182, y: 96, tone: 'fill-cyan-400' },
  { x: 116, y: 132, tone: 'fill-sky-400' },
  { x: 142, y: 148, tone: 'fill-sky-400' },
  { x: 96, y: 156, tone: 'fill-sky-400' },
  { x: 132, y: 116, tone: 'fill-sky-400' },
  { x: 158, y: 132, tone: 'fill-sky-400' },
]

const PIPELINE = [
  { label: 'Ingest', value: 100 },
  { label: 'Engineer', value: 100 },
  { label: 'Train', value: 72 },
]

function StudioVisual() {
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
            Cluster analysis
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/60">
            <PulsingDot color="bg-emerald-400" />3 clusters found
          </span>
        </div>

        <div className="rounded-xl border border-white/8 bg-brand-navy/60 p-2">
          <svg viewBox="0 0 260 190" className="w-full h-auto">
            {/* Axes */}
            <line x1={20} y1={170} x2={244} y2={170} className="stroke-white/10" strokeWidth={1} />
            <line x1={20} y1={16} x2={20} y2={170} className="stroke-white/10" strokeWidth={1} />

            {/* Cluster hulls */}
            {[
              { d: 'M36 62 L82 26 L96 70 L60 100 Z', tone: 'fill-brand/8 stroke-brand/25' },
              {
                d: 'M148 32 L216 28 L204 104 L150 88 Z',
                tone: 'fill-cyan-400/8 stroke-cyan-400/25',
              },
              {
                d: 'M86 112 L146 104 L164 144 L100 166 Z',
                tone: 'fill-sky-400/8 stroke-sky-400/25',
              },
            ].map((hull, i) => (
              <motion.path
                key={hull.d}
                d={hull.d}
                className={hull.tone}
                strokeWidth={1.25}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.15, ease: EASE }}
              />
            ))}

            {/* Points */}
            {CLUSTER_POINTS.map((pt, i) => (
              <motion.circle
                key={`${pt.x}-${pt.y}`}
                cx={pt.x}
                cy={pt.y}
                r={4}
                className={pt.tone}
                fillOpacity={0.9}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.04, ease: EASE }}
                style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
              />
            ))}
          </svg>
        </div>

        {/* Pipeline progress */}
        <div className="flex flex-col gap-2.5">
          {PIPELINE.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-[11px] text-white/50">{step.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-brand to-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${step.value}%` }}
                  transition={{ duration: 0.9, delay: 0.6 + i * 0.15, ease: EASE }}
                />
              </div>
              <span className="text-[10px] text-white/55 shrink-0 w-8 text-right">
                {step.value}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-3 rounded-xl border border-white/8 bg-white/2 px-4 py-3 flex flex-wrap gap-x-4 gap-y-1.5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
      >
        {['Explore', 'Engineer', 'Train', 'Deploy'].map((item) => (
          <span key={item} className="flex items-center gap-1.5 text-xs text-white/60">
            <span className="w-1 h-1 rounded-full bg-brand/70 shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Foresight() {
  return (
    <div className="bg-white">
      {/* ── 01 · Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100dvh-4rem)] flex flex-col justify-center bg-brand-navy">
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />

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
                  Platforms — Foresight
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Foresight: <span className="text-brand">Data Science Studio.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-base sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                A comprehensive visual and programming interface for artificial intelligence,
                machine learning and advanced analytics — for users of every skill level.
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
                  href="#why"
                  className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-semibold px-7 py-3.5 rounded-sm border border-white/15 hover:border-white/30 transition-colors duration-200"
                >
                  Explore the Platform
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
              <StudioVisual />
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
              'With or without coding',
              'End-to-end data mining',
              'Automated cluster analysis',
              'Production deployment',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 02 · Why Foresight ───────────────────────────────────────────────── */}
      <section id="why" className="bg-white">
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
              Why Foresight
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Data mining with automated analytics and{' '}
              <span className="text-brand">cluster analysis.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              Equipped with AI and machine learning that supports end-to-end data mining, Foresight
              lets users dive into the hidden structure of their data — a simple, powerful,
              automated platform for every task in the analytics life cycle.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {WHY_FORESIGHT.map((item, i) => (
              <motion.div
                key={item.id}
                className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-brand/40 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-brand to-cyan-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }}
                />
                <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-brand-light text-brand shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · Key Features ────────────────────────────────────────────────── */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-12"
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
              Key Features
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              The whole analytics life cycle, <span className="text-brand">in one studio.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              From raw data to a model running in production — and predictions for the data you have
              not seen yet.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-2 shadow-sm hover:border-brand/30 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: EASE }}
              >
                <span className="text-xs font-semibold text-brand tracking-widest">{`0${i + 1}`}</span>
                <h3 className="text-base font-bold text-gray-900 tracking-tight leading-snug">
                  {cap.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · Foresight in Action ─────────────────────────────────────────── */}
      <section className="bg-brand-navy">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-12"
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
              Foresight in Action
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
            >
              See the studio <span className="text-brand">at work.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-white/55 leading-relaxed"
            >
              Watch a dataset move through Foresight — ingested, explored and transformed, then
              trained into a model ready for production.
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
              src={`https://www.youtube-nocookie.com/embed/${FORESIGHT_VIDEO_ID}`}
              title="Foresight product walkthrough"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link
              to="/about/contact"
              className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-brand/25"
            >
              Request Your Demo
              <ArrowIcon />
            </Link>
            <Link
              to="/about/contact"
              className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-semibold px-8 py-3.5 rounded-sm border border-white/15 hover:border-white/30 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
