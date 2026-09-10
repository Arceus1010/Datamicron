import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const GLOBES_VIDEO_ID = '8Ul-MqZPB1M'

const WHY_GLOBES = [
  {
    id: 'gis',
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
          d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
        />
      </svg>
    ),
    title: 'Comprehensive GIS Functionality',
    description:
      'A versatile suite of GIS tools that lets users interact with geographic data in innovative and powerful ways, tailored to the needs of each industry.',
  },
  {
    id: 'insights',
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
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
    title: 'Enhanced Location-Based Insights',
    description:
      'Harness the full potential of geospatial data to drive smarter decisions in urban planning, environmental monitoring and logistics.',
  },
  {
    id: 'precision',
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
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
    title: 'Precision in Decision-Making',
    description:
      'Geospatial data becomes a strategic asset, enabling precise, informed and innovative decision-making across the organization.',
  },
]

const CAPABILITIES = [
  {
    title: 'Intuitive Mapping',
    description:
      'Overlay layers, apply filters and pull actionable insight — whether you are a seasoned GIS professional or just getting started.',
  },
  {
    title: 'Point of Interest',
    description:
      'Identify critical locations effortlessly — landmarks, infrastructure or strategic points — and understand why they matter.',
  },
  {
    title: 'Customizable Dashboards',
    description:
      'Organise and display information the way your workflow needs, so you focus on what matters.',
  },
  {
    title: 'Layers & Filters',
    description:
      'Build up the picture layer by layer and filter down to the geography in question.',
  },
  {
    title: 'Location-Based Insights',
    description:
      'Turn where things happen into a driver of planning, monitoring and logistics decisions.',
  },
  {
    title: 'Interactive Maps',
    description:
      'Maps that link people, places and data — explored directly rather than read as a static image.',
  },
]

const USE_CASES = [
  'Environmental Monitoring',
  'Transportation Planning',
  'Urban Planning',
  'Sales and Marketing',
  'Real Estate',
  'Logistics',
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

// Map visual — points of interest and a route across a layered canvas
const MAP_PINS = [
  { id: 'a', x: 62, y: 58, label: 'Depot' },
  { id: 'b', x: 148, y: 40, label: 'Site' },
  { id: 'c', x: 214, y: 104, label: 'Hub' },
  { id: 'd', x: 96, y: 138, label: 'Zone' },
]

function MapVisual() {
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
            Map engine
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/60">
            <PulsingDot color="bg-emerald-400" />4 layers active
          </span>
        </div>

        <div className="rounded-xl border border-white/8 bg-brand-navy/60 p-2">
          <svg viewBox="0 0 280 190" className="w-full h-auto">
            {/* Grid */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * 38}
                x2={280}
                y2={i * 38}
                className="stroke-white/6"
                strokeWidth={1}
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line
                key={`v${i}`}
                x1={i * 40}
                y1={0}
                x2={i * 40}
                y2={190}
                className="stroke-white/6"
                strokeWidth={1}
              />
            ))}

            {/* Region shapes */}
            <motion.path
              d="M24 150 L70 96 L128 118 L160 78 L232 96 L256 150 Z"
              className="fill-brand/10 stroke-brand/25"
              strokeWidth={1.25}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            />

            {/* Route */}
            <motion.path
              d="M62 58 C 100 30, 130 34, 148 40 S 200 84, 214 104"
              className="fill-none stroke-cyan-400/70"
              strokeWidth={1.75}
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            />

            {/* Pins */}
            {MAP_PINS.map((pin, i) => (
              <motion.g
                key={pin.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.6 + i * 0.12, ease: EASE }}
                style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
              >
                <circle cx={pin.x} cy={pin.y} r={10} className="fill-brand/20" />
                <circle cx={pin.x} cy={pin.y} r={4} className="fill-brand" />
                <text
                  x={pin.x}
                  y={pin.y + 20}
                  textAnchor="middle"
                  className="fill-white/65 text-[9px] font-semibold uppercase tracking-wider"
                >
                  {pin.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>
      </motion.div>

      <motion.div
        className="mt-3 rounded-xl border border-white/8 bg-white/2 px-4 py-3 flex flex-wrap gap-x-4 gap-y-1.5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
      >
        {['Layers', 'Points of interest', 'Routes', 'Dashboards'].map((item) => (
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

export default function Globes() {
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
                  Platforms — GLOBES
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                GLOBES: <span className="text-brand">Map Engine.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-base sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Geographical map viewing and exploration — the creation of interactive maps that
                link people, places and data into one strategic picture.
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
              <MapVisual />
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
              'Full GIS toolset',
              'Interactive layered maps',
              'Points of interest',
              'Customizable dashboards',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 02 · Why GLOBES ──────────────────────────────────────────────────── */}
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
              Why GLOBES
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Geospatial data as a <span className="text-brand">strategic advantage.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              GLOBES is a robust, versatile GIS platform that transforms how you interact with
              geographic data — opening the door to smarter decision-making powered by geospatial
              insight, where precision meets innovation.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {WHY_GLOBES.map((item, i) => (
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
              Simplicity in data <span className="text-brand">visualization.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              Overlay layers, apply filters, mark what matters and shape the workspace around your
              workflow — whether you are an experienced GIS professional or just getting started.
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

          {/* Use cases */}
          <motion.div
            className="mt-12 pt-10 border-t border-gray-200 flex flex-col items-center gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger(0.07)}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-sm font-semibold text-gray-900"
            >
              GLOBES is ideal for these use cases and many more
            </motion.span>
            <div className="flex flex-wrap justify-center gap-3">
              {USE_CASES.map((useCase) => (
                <motion.span
                  key={useCase}
                  variants={fadeUp}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="rounded-full bg-white border border-brand/15 text-brand text-sm font-semibold px-4 py-2 shadow-sm"
                >
                  {useCase}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 04 · GLOBES in Action ────────────────────────────────────────────── */}
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
              GLOBES in Action
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
            >
              See the map engine <span className="text-brand">at work.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-white/55 leading-relaxed"
            >
              Watch GLOBES turn geographic data into an interactive map — layers overlaid, points of
              interest marked and insight read straight off the workspace.
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
              src={`https://www.youtube-nocookie.com/embed/${GLOBES_VIDEO_ID}`}
              title="GLOBES product walkthrough"
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
