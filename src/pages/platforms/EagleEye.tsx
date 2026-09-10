import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const EAGLE_EYE_VIDEO_ID = '5bMQBDycoGQ'

const WHY_EAGLE_EYE = [
  {
    id: 'graph',
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
          d="M7.5 6.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-6.75 10.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-7.2-9.3 3.9 7.05m6.9-7.05-3.9 7.05M7.5 6.75h9"
        />
      </svg>
    ),
    title: 'One Connected Case Graph',
    description:
      'People, organizations, events, evidence and relationships come together in a single graph — so every record sits in the context of everything around it.',
  },
  {
    id: 'investigate',
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
    title: 'Follow the Evidence',
    description:
      'Move between network analysis, timelines, locations, dashboards and underlying records — or ask questions in plain language and keep exploring the answer.',
  },
  {
    id: 'ai',
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
    title: 'An AI Investigator',
    description:
      'An autonomous agent works across case data, documents and communications to explain findings, test hypotheses and cite the evidence behind every conclusion.',
  },
]

const CAPABILITIES = [
  {
    title: 'Unified Case Graph',
    description:
      'Entities, relationships and evidence linked as you ingest, one workspace per case.',
  },
  {
    title: 'Flexible Data Ingestion',
    description:
      'Structured records, documents, communications and third-party feeds — no rigid schema first.',
  },
  {
    title: 'Custom Ontology',
    description:
      'Entity types, attributes and relationships defined in the language your investigators use.',
  },
  {
    title: 'Reusable Case Templates',
    description: 'Recurring case types open from proven practice instead of a blank page.',
  },
  {
    title: 'Network Analytics',
    description:
      'Centrality, shortest path and community detection surface the connections manual review misses.',
  },
  {
    title: 'Natural Language Queries',
    description: 'Ask the case a question in plain language and drill straight through to source.',
  },
  {
    title: 'Time & Geospatial',
    description:
      'Timeline reconstruction and geospatial mapping alongside dashboards and record views.',
  },
  {
    title: 'Audited & Read-Only',
    description:
      'A controlled, read-only posture over source evidence with a full audit trail of agent activity.',
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

// Case-graph visual — scattered records resolving into a connected network
const GRAPH_NODES = [
  { id: 'p1', x: 50, y: 40, r: 9, label: 'Person', tone: 'fill-brand' },
  { id: 'o1', x: 150, y: 26, r: 11, label: 'Org', tone: 'fill-sky-400' },
  { id: 'e1', x: 232, y: 74, r: 8, label: 'Event', tone: 'fill-cyan-400' },
  { id: 'p2', x: 118, y: 104, r: 14, label: 'Subject', tone: 'fill-white' },
  { id: 'd1', x: 30, y: 140, r: 8, label: 'Doc', tone: 'fill-sky-400' },
  { id: 'p3', x: 196, y: 158, r: 9, label: 'Person', tone: 'fill-brand' },
  { id: 'a1', x: 96, y: 192, r: 8, label: 'Account', tone: 'fill-cyan-400' },
]

const GRAPH_EDGES: [string, string][] = [
  ['p1', 'p2'],
  ['o1', 'p2'],
  ['o1', 'e1'],
  ['e1', 'p3'],
  ['p2', 'd1'],
  ['p2', 'p3'],
  ['p2', 'a1'],
  ['d1', 'a1'],
]

function nodeById(id: string) {
  return GRAPH_NODES.find((n) => n.id === id)!
}

function CaseGraphVisual() {
  return (
    <div className="relative w-full max-w-md">
      <motion.div
        className="relative rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm p-5 flex flex-col gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
            Case Graph
          </span>
          <span className="text-xs text-white/55">7 entities · 8 links</span>
        </div>

        {/* Graph canvas */}
        <div className="rounded-xl border border-white/8 bg-brand-navy/60 p-2">
          <svg viewBox="0 0 262 222" className="w-full h-auto">
            {GRAPH_EDGES.map(([from, to], i) => {
              const a = nodeById(from)
              const b = nodeById(to)
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className="stroke-brand/40"
                  strokeWidth={1.25}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.1, ease: EASE }}
                />
              )
            })}

            {GRAPH_NODES.map((node, i) => (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.09, ease: EASE }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                <circle cx={node.x} cy={node.y} r={node.r + 6} className="fill-brand/10" />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  className={node.tone}
                  fillOpacity={0.9}
                />
                <text
                  x={node.x}
                  y={node.y + node.r + 13}
                  textAnchor="middle"
                  className="fill-white/65 text-[9px] font-semibold uppercase tracking-wider"
                >
                  {node.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Live activity line */}
        <div className="flex items-center gap-2">
          <PulsingDot color="bg-brand" />
          <span className="text-xs text-white/60">AI agent analyzing relationships</span>
        </div>
      </motion.div>

      {/* Source foundation */}
      <motion.div
        className="mt-3 rounded-xl border border-white/8 bg-white/2 px-4 py-3 flex flex-wrap gap-x-4 gap-y-1.5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
      >
        {['Records', 'Documents', 'Communications', 'External sources'].map((item) => (
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

export default function EagleEye() {
  return (
    <div className="bg-white">
      {/* ── 01 · Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100dvh-4rem)] flex flex-col justify-center bg-brand-navy">
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-sky-400/4 blur-3xl pointer-events-none" />

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
                  Platforms — Eagle Eye
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Turn Disconnected Records Into{' '}
                <span className="text-brand">Connected Intelligence.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-base sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Eagle Eye is an AI-powered case management and investigation platform that
                transforms fragmented information into a navigable case graph — helping teams
                uncover relationships, investigate faster and act with greater clarity.
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
              <CaseGraphVisual />
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
              'Unified case graph',
              'Network and pattern analytics',
              'Autonomous AI investigator',
              'Read-only over source evidence',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 02 · Why Eagle Eye ───────────────────────────────────────────────── */}
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
              Why Eagle Eye
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              The evidence is there. The <span className="text-brand">connections aren’t.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              A case is not a list of records — it is a network of people, organizations, events and
              evidence. Eagle Eye assembles that network from the sources you already hold, so
              investigators explore relationships instead of reconstructing them by hand.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {WHY_EAGLE_EYE.map((item, i) => (
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

      {/* ── 03 · Capabilities ────────────────────────────────────────────────── */}
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
              Capabilities
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Build it, interrogate it, <span className="text-brand">defend it.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              Everything needed to assemble a case, explore it from every angle and keep findings
              traceable back to the evidence behind them.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-2 shadow-sm hover:border-brand/30 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.08, ease: EASE }}
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

      {/* ── 04 · Product Walkthrough ─────────────────────────────────────────── */}
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
              Product Walkthrough
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
            >
              See Eagle Eye <span className="text-brand">in action.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-white/55 leading-relaxed"
            >
              Watch how Eagle Eye turns fragmented information into a connected investigation — from
              building the case graph to AI-assisted analysis and reporting.
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
              src={`https://www.youtube-nocookie.com/embed/${EAGLE_EYE_VIDEO_ID}`}
              title="Eagle Eye product walkthrough"
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
        </div>
      </section>
    </div>
  )
}
