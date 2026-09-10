import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const FALCON_VIDEO_ID = 'ORlaqCF9zcU'

const WHY_FALCON = [
  {
    id: 'multimedia',
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
          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
    title: 'Cross-Platform Multimedia Sharing',
    description:
      'Seamless engagement across mobile and web, so teams share the full range of multimedia content — messages, photos and video — from wherever they are working.',
  },
  {
    id: 'reporting',
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
    title: 'Secure Custom Reporting',
    description:
      'Generate customised reports inside a private environment — sensitive information stays protected while detailed analysis and documentation keep moving.',
  },
  {
    id: 'command',
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
          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
        />
      </svg>
    ),
    title: 'Ideal for Command Centers',
    description:
      'Video streaming, location analytics and Eagle Eye integration for natural language processing — built for command centres collecting collaborative field reports.',
  },
]

const CAPABILITIES = [
  {
    title: 'Instant Messaging',
    description: 'Secure text, photos, video and location in one-to-one or group threads.',
  },
  {
    title: 'Audio & Video Calls',
    description: 'Stable, high-quality, encrypted calling between users and groups.',
  },
  {
    title: 'Dispatch Management',
    description: 'Intuitive dispatch with live geolocation tracking and patrol routing.',
  },
  {
    title: 'Command Control Centre',
    description: 'Command and control of every user with live location intelligence.',
  },
  {
    title: 'Live Streaming',
    description: 'Stream events from the field and interact with users in real time.',
  },
  {
    title: 'Smart Reports & Dashboards',
    description: 'Automated reports and dashboards that turn activity into decisions.',
  },
  {
    title: 'Secure & Audit Trail',
    description: 'End-to-end encryption with a full audit trail for compliance.',
  },
  {
    title: 'On-Premise or Cloud',
    description: 'Deploy however your security and infrastructure policy requires.',
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

function FalconMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3c3.6 1.4 6 2.2 9 2.2-.4 7.4-3.6 12.6-9 15.8C6.6 17.8 3.4 12.6 3 5.2c3 0 5.4-.8 9-2.2Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 11.5l2.2 2.2L15.5 9.4" />
    </svg>
  )
}

// Comms hub visual — Falcon at the centre of a secured field network
const HUB_NODES = [
  { id: 'centre', label: 'Control Room', x: 32, y: 34 },
  { id: 'field', label: 'Field Unit', x: 168, y: 26 },
  { id: 'patrol', label: 'Patrol', x: 246, y: 96 },
  { id: 'stream', label: 'Live Stream', x: 26, y: 150 },
  { id: 'dispatch', label: 'Dispatch', x: 150, y: 174 },
]

function CommsNetworkVisual() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="w-full max-w-lg rounded-2xl border border-brand-navy-border bg-white/2 p-6 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
          Secured network
        </span>
        <span className="flex items-center gap-1.5 text-xs text-white/60">
          <PulsingDot color="bg-emerald-400" />
          Encrypted
        </span>
      </div>

      <svg viewBox="0 0 280 210" className="w-full h-auto">
        {HUB_NODES.map((node, i) => (
          <motion.line
            key={`link-${node.id}`}
            x1={140}
            y1={105}
            x2={node.x + 14}
            y2={node.y + 14}
            className="stroke-brand/35"
            strokeWidth={1.25}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease: EASE }}
          />
        ))}

        {HUB_NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: EASE }}
            style={{ transformOrigin: `${node.x + 14}px ${node.y + 14}px` }}
          >
            <rect
              x={node.x}
              y={node.y}
              width={28}
              height={28}
              rx={9}
              className="fill-white/8 stroke-white/15"
            />
            <circle cx={node.x + 14} cy={node.y + 14} r={4} className="fill-brand" />
            <text
              x={node.x + 14}
              y={node.y + 42}
              textAnchor="middle"
              className="fill-white/65 text-[9px] font-semibold uppercase tracking-wider"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        <motion.circle
          cx={140}
          cy={105}
          r={30}
          className="fill-brand/15 stroke-brand/40"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          style={{ transformOrigin: '140px 105px' }}
        />
        {!reduceMotion && (
          <motion.circle
            cx={140}
            cy={105}
            r={30}
            className="fill-none stroke-brand/30"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: '140px 105px' }}
          />
        )}
        <foreignObject x={124} y={89} width={32} height={32}>
          <div className="w-8 h-8 flex items-center justify-center text-brand">
            <FalconMark className="w-6 h-6" />
          </div>
        </foreignObject>
      </svg>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Falcon() {
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
                  Platforms — Falcon
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Forces <span className="text-brand">At Work.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-base sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Falcon is an efficient, fully secure private messaging service with command and
                control capabilities — wholly licensed and operated by the customer on-premise, with
                full autonomy over its policy and procedures.
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
              <CommsNetworkVisual />
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
              'Customer-operated on-premise',
              'End-to-end encrypted',
              'Command and control built in',
              'iOS, Android and web',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 02 · Why Falcon ──────────────────────────────────────────────────── */}
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
              Why Falcon
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Built for teams who <span className="text-brand">cannot afford leaks.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              Falcon enhances multimedia reporting across mobile and web, with video streaming,
              location analytics and Eagle Eye integration — built on the latest encryption so
              private teams communicate securely.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {WHY_FALCON.map((item, i) => (
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
              Secured unified <span className="text-brand">communication.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              Stay connected and in control no matter where the work takes you — web, iOS and
              Android, private and real-time throughout.
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

      {/* ── 04 · Falcon in Action ────────────────────────────────────────────── */}
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
              Falcon in Action
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
            >
              See the platform <span className="text-brand">at work.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-white/55 leading-relaxed"
            >
              Watch how Falcon connects the command centre and the field — secure messaging,
              dispatch, live streaming and reporting in a single environment.
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
              src={`https://www.youtube-nocookie.com/embed/${FALCON_VIDEO_ID}`}
              title="Falcon platform overview"
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
