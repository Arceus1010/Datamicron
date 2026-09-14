import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORTEXUS_VIDEO_ID = 'dZHT0Z10sDk'

const CAPABILITIES = [
  {
    id: 'monitoring',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    title: 'Continuous Monitoring',
    description: 'Declare a goal or a process in plain terms and an agent docks onto it — watching around the clock and investigating the moment reality drifts, not three weeks later.',
    points: ['Goals declared in plain terms', 'One agent per process', 'Drift caught while it is still small'],
  },
  {
    id: 'reasoning',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'Investigation & Reasoning',
    description: 'Not threshold alerting. The agent forms a hypothesis with a confidence it is willing to state, gathers evidence session after session, and has its own conclusion attacked by an adversarial reviewer before anything reaches you.',
    points: ['Hypotheses with stated confidence', 'Evidence gathered across sessions', 'Conclusions adversarially stress-tested'],
  },
  {
    id: 'agents',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    title: 'One Platform, a Whole Fleet',
    description: 'A spend watchdog, a supply sentinel, a web health monitor, an order clerk — each agent independent, with its own focus, its own memory, and a track record you can inspect, all governed one way on a single deployment.',
    points: ['Independent focus and memory per agent', 'Inspectable track record', 'New processes plug into the same contract'],
  },
  {
    id: 'ladder',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
      </svg>
    ),
    title: 'A Ladder of Trust',
    description: 'Every agent works on a ladder you control. By default it watches and reports. A rung up it recommends, with the reasoning attached. Above that it drafts the change completely, leaving only your yes. It acts alone only where you have allowed it.',
    points: ['Four rungs, you set each one', 'No write to a system of record without your decision', 'Every action on an audit trail'],
  },
  {
    id: 'orchestration',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    title: 'Cross-System Action',
    description: 'Hands, not just eyes. Agents resolve records against your master data and prepare complete, validated changes across CRM, ERP, and APIs — then stop for a person to confirm before the platform writes.',
    points: ['Resolved against your master data', 'Complete, validated changes prepared', 'Zero unauthorised writes, ever'],
  },
  {
    id: 'loop',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: 'It Learns Your Business',
    description: 'Grade a finding and the agent recalibrates — what matters to you gains weight, what does not fades back. Your thresholds, suppliers and seasonality become memory, scoped to your business and leaking nowhere you did not put it.',
    points: ['Recalibrates on your feedback', 'Memory of your thresholds & suppliers', 'Sharper at month six than day one'],
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    label: 'Declare',
    description: 'You state what matters in plain terms — the return you expect on ad spend, the delivery rate a supplier committed to, the orders that must reach the ERP. An agent docks onto each one.',
    color: 'bg-brand/10 text-brand border-brand/20',
    lineColor: 'bg-brand/30',
  },
  {
    step: '02',
    label: 'Watch',
    description: 'The agent monitors continuously, around the clock — no dashboard to check, no question you had to think to ask first.',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    lineColor: 'bg-purple-500/30',
  },
  {
    step: '03',
    label: 'Investigate',
    description: 'The moment reality drifts from the goal it digs in — forming a hypothesis, gathering evidence, then putting its own conclusion through an adversarial reviewer that tries to break it.',
    color: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    lineColor: 'bg-violet-500/30',
  },
  {
    step: '04',
    label: 'Report',
    description: 'What survives that review lands in one inbox, ranked, with the evidence and confidence attached — and the fix already prepared.',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    lineColor: 'bg-emerald-500/30',
  },
  {
    step: '05',
    label: 'Act — with you',
    description: 'On the rung you have granted: recommend, draft for your confirmation, or act where you have allowed it. Your decision teaches the agent what to weigh next time.',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    lineColor: 'bg-amber-500/30',
  },
]

const USE_CASES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    title: 'Spend Watchdog',
    items: ['Watches return on ad spend against target', 'Finds under-invested top performers', 'Drafts the bid change for your approval'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    title: 'Supply Sentinel',
    items: ['Tracks on-time delivery against contract', 'Flags supplier risk as it develops', 'Evidence trail for the supplier conversation'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: 'Web Health Monitor',
    items: ['Catches conversion and bounce regressions', 'Ties the change back to what shipped', 'Reports before a week of traffic is lost'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: 'Order Clerk',
    items: ['Reads orders from informal chat messages', 'Resolves customer, product and warehouse', 'Validated draft, confirmed by a person'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: 'Research & Coding',
    items: ['Takes the one-off work every team collects', 'Shows its steps and its sources', 'Delivers something you can read and check'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
    title: 'Your Next Process',
    items: ['A new account, market or system', 'Plugs into the same platform', 'Under the same safety contract'],
  },
]

const OUTCOMES = [
  { icon: '👁', metric: '24/7', label: 'Attention on every goal you declare' },
  { icon: '🔒', metric: 'Zero', label: 'Unauthorised writes to a system of record' },
  { icon: '🧾', metric: 'Every', label: 'Finding carries its evidence and confidence' },
  { icon: '🧠', metric: 'One', label: 'Platform for the whole agent fleet' },
]

const PROBLEMS = [
  'An ad account quietly burns budget on keywords that never convert',
  'A supplier slips below its contracted delivery rate, one order at a time',
  'A redesign doubles the bounce rate overnight, and nobody notices for weeks',
  'An order arrives as a chat message and waits for someone to re-type it',
  'Dashboards only answer the questions someone already thought to ask',
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

// Animated agent node graph for the hero
function AgentFlowDiagram() {
  const nodes = [
    { id: 'signal', label: 'Signal', x: 48, y: 180, color: '#117EC2', gate: false },
    { id: 'agent', label: 'Agent', x: 158, y: 100, color: '#8B5CF6', gate: false },
    { id: 'finding', label: 'Finding', x: 268, y: 180, color: '#10B981', gate: false },
    { id: 'approve', label: 'You approve', x: 378, y: 180, color: '#FFFFFF', gate: true },
    { id: 'crm', label: 'CRM', x: 488, y: 105, color: '#F59E0B', gate: false },
    { id: 'erp', label: 'ERP', x: 488, y: 255, color: '#EF4444', gate: false },
    { id: 'learn', label: 'Learn', x: 592, y: 180, color: '#117EC2', gate: false },
  ]

  // Edges downstream of the gate draw solid — nothing flows until it is approved.
  const edges = [
    { from: 'signal', to: 'agent', authorised: false },
    { from: 'agent', to: 'finding', authorised: false },
    { from: 'finding', to: 'approve', authorised: false },
    { from: 'approve', to: 'crm', authorised: true },
    { from: 'approve', to: 'erp', authorised: true },
    { from: 'crm', to: 'learn', authorised: false },
    { from: 'erp', to: 'learn', authorised: false },
  ]

  const getNode = (id: string) => nodes.find((n) => n.id === id)!
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 640 360"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Diagram: a signal flows into an agent, which investigates and produces a finding. Nothing reaches the CRM or ERP systems until you approve it, and the outcomes then feed back as learning."
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.25)" />
          </marker>
        </defs>

        {/* Grid background */}
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
        <rect width="640" height="360" fill="url(#grid)" />

        {/* Edges */}
        {edges.map((edge, i) => {
          const from = getNode(edge.from)
          const to = getNode(edge.to)
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
              strokeDasharray={edge.authorised ? undefined : '4 3'}
              markerEnd="url(#arrowhead)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: EASE }}
            />
          )
        })}

        {/* Animated data packets */}
        {!reduceMotion &&
          edges.map((edge, i) => {
            const from = getNode(edge.from)
            const to = getNode(edge.to)
            return (
              <motion.circle
                key={`packet-${i}`}
                r={3}
                fill={from.color}
                filter="url(#glow)"
                animate={{
                  cx: [from.x, to.x],
                  cy: [from.y, to.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  delay: 1 + i * 0.4 + (edge.authorised ? 0.7 : 0),
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
              />
            )
          })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.5, ease: EASE }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={28}
              fill={`${node.color}22`}
              stroke={`${node.color}66`}
              strokeWidth={1.5}
              strokeDasharray={node.gate ? '5 4' : undefined}
              filter="url(#glow)"
            />
            <circle cx={node.x} cy={node.y} r={16} fill={`${node.color}33`} stroke={node.color} strokeWidth={1.5} />
            {node.gate && (
              <path
                d={`M ${node.x - 6} ${node.y} L ${node.x - 1.5} ${node.y + 4.5} L ${node.x + 6.5} ${node.y - 5}`}
                fill="none"
                stroke={node.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {!reduceMotion && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={28}
                fill="none"
                stroke={node.color}
                strokeWidth={1}
                opacity={0.4}
                animate={{ r: [28, 36], opacity: [0.4, 0] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <text
              x={node.x}
              y={node.y + 44}
              textAnchor="middle"
              fill={node.gate ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)'}
              fontSize="11"
              fontWeight={node.gate ? 600 : 400}
              fontFamily="'Source Sans 3', sans-serif"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

// Pulsing agent indicator used in section labels
function PulsingDot() {
  const reduceMotion = useReducedMotion()

  return (
    <span className="relative flex h-2.5 w-2.5">
      {!reduceMotion && (
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"
          animate={{ scale: [1, 1.8], opacity: [0.75, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand" />
    </span>
  )
}

// Capability card with hover accent line
function CapabilityCard({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  return (
    <motion.div
      className="group relative bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-brand"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: EASE }}
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

export default function Cortexus() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100dvh-4rem)] flex flex-col justify-center bg-brand-navy">
        {/* Ambient blobs */}
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-purple-600/8 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-brand/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div className="flex flex-col gap-8" variants={stagger()} initial="hidden" animate="show">
              <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-2.5">
                <PulsingDot />
                <span className="text-sm font-semibold text-brand uppercase tracking-widest">
                  Phoenix AIP — Cortexus
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Every Signal,{' '}
                <span className="text-brand">Caught</span>
                <span className="text-white/60">—Automatically.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-base sm:text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Declare what matters and Cortexus docks an agent onto it. The agent watches continuously, investigates the moment reality drifts, and reports with the evidence and the fix already prepared — and never touches a system of record without your decision.
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
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-semibold px-7 py-3.5 rounded-sm border border-white/15 hover:border-white/30 transition-colors duration-200"
                >
                  See It in Action
                </a>
              </motion.div>
            </motion.div>

            {/* Agent flow diagram */}
            <motion.div
              className="hidden lg:flex items-center justify-center h-72 lg:h-80"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            >
              <AgentFlowDiagram />
            </motion.div>
          </div>

          {/* Trust bar */}
          <motion.div
            className="mt-20 pt-8 border-t border-white/10 flex flex-wrap gap-6 lg:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            {['Continuous process & goal monitoring', 'Evidence-backed findings', 'Adversarially stress-tested conclusions', 'Never writes without your approval', 'Learns your business over time'].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
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
                The signal is there. <span className="text-brand">The attention isn't.</span>
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
              className="relative"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            >
              <div className="bg-brand-navy rounded-2xl p-8 flex flex-col gap-6 border border-brand-navy-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand/20 text-brand flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Cortexus closes the attention gap</span>
                </div>
                <p className="text-white/60 leading-relaxed text-sm">
                  In every one of these cases the signal was already in your systems. What was missing was attention. Nobody is paid to stare at dashboards all day — and handing an AI the keys is a risk nobody wants to take. Cortexus is the attention, on a contract you set.
                </p>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-brand text-sm font-semibold italic">
                    "The attention your business was missing."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What Is Cortexus ─────────────────────────────────────────────────── */}
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
              What Is Cortexus?
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Process and goal monitoring, <span className="text-brand">automated.</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-gray-500 leading-relaxed max-w-2xl">
              You declare the goal. The watching, the digging, and the paperwork become the agent's job — continuously, with the evidence kept, and with everything prepared for action and nothing done without you.
            </motion.p>
            {/* The ladder of trust */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="w-full max-w-2xl mt-2"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">A ladder of trust, not a leap</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { rung: '01', name: 'Watch & report', sub: 'The default. It tells you, and nothing else.' },
                  { rung: '02', name: 'Recommend', sub: 'With the reasoning and evidence attached.' },
                  { rung: '03', name: 'Draft it', sub: 'Change prepared in full. All that is left is your yes.' },
                  { rung: '04', name: 'Act', sub: 'Only where you have allowed it, on an audit trail.' },
                ].map((r) => (
                  <div key={r.rung} className="rounded-xl border border-gray-200 bg-white p-4 text-left">
                    <p className="text-xs font-semibold text-gray-400 mb-1">{r.rung}</p>
                    <p className="text-sm font-semibold text-brand mb-1">{r.name}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{r.sub}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mt-3">
                Machine-speed vigilance, human-speed authority. You set the rung for every agent, and it never climbs one on its own.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid sm:grid-cols-3 gap-4 mt-6 w-full max-w-2xl"
            >
              {[
                { label: 'Not just alerts', sub: 'Investigated, evidence-backed findings' },
                { label: 'Not just dashboards', sub: 'Attention that never looks away' },
                { label: 'Not just automation', sub: 'Autonomy you grant, rung by rung' },
              ].map((item) => (
                <div key={item.label} className="bg-brand-light rounded-lg p-4 text-left">
                  <p className="text-xs text-gray-500 line-through mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-brand-dark">{item.sub}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Capabilities ────────────────────────────────────────────────── */}
      <section className="bg-gray-50">
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
              Everything you need to <span className="text-brand">execute at scale.</span>
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
      <section id="how-it-works" className="bg-brand-navy">
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
              Four steps, one <span className="text-brand">continuous loop.</span>
            </motion.h2>
          </motion.div>

          {/* Step flow */}
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-white/10" />

            <div
              className="grid grid-cols-2 lg:grid-cols-5 gap-8"
              role="tablist"
              aria-label="How Cortexus works"
            >
              {HOW_IT_WORKS.map((step, i) => (
                <motion.button
                  key={step.step}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === i}
                  aria-controls="cortexus-step-detail"
                  className="flex flex-col gap-4 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
                  onClick={() => setActiveStep(i)}
                >
                  <div className={`relative w-24 h-24 mx-auto rounded-2xl border flex items-center justify-center flex-col gap-1 transition-all duration-300 ${activeStep === i ? `${step.color} scale-105 shadow-lg` : 'bg-white/5 border-white/10 text-white/60'}`}>
                    <span className="text-2xl font-bold font-display">{step.step}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">{step.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Active step description */}
            <motion.div
              key={activeStep}
              id="cortexus-step-detail"
              role="tabpanel"
              aria-live="polite"
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
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
              Key Use Cases
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Built for every <span className="text-brand">enterprise function.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.title}
                className="group border border-gray-100 rounded-xl p-6 hover:border-brand/30 hover:shadow-md transition-all duration-300 bg-white flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
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
              The results speak <span className="text-brand">for themselves.</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OUTCOMES.map((o, i) => (
              <motion.div
                key={o.label}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-brand/10 flex flex-col gap-3 items-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
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

      {/* ── Differentiation ──────────────────────────────────────────────────── */}
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
                Why Cortexus
              </motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                The attention your business <span className="text-brand">was missing.</span>
              </motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-gray-500 leading-relaxed">
                Most monitoring tools alert on a threshold and leave you to work out why. Cortexus investigates: it forms a hypothesis, gathers evidence, and puts its own conclusion through an adversarial reviewer before you ever see it. What reaches you has survived that — and arrives with the evidence, the confidence, and the fix prepared.
              </motion.p>

              <motion.div variants={stagger(0.1)} className="flex flex-col gap-4 mt-2">
                {[
                  { before: 'Threshold alerts', after: 'Investigated findings' },
                  { before: 'A black box', after: 'Evidence you can audit' },
                  { before: 'Keys handed over', after: 'Autonomy you grant' },
                ].map((row) => (
                  <motion.div key={row.before} variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 line-through w-36 shrink-0">{row.before}</span>
                    <ArrowIcon />
                    <span className="text-sm font-semibold text-gray-800">{row.after}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Integration & Security panel */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            >
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-5">
                <h3 className="font-bold text-gray-900 text-lg">Integration & Ecosystem</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Phoenix Insights', sub: 'Hands over the findings and decisions worth acting on' },
                    { label: 'Spotlight Data Fabrics', sub: 'Reads context from the fabric and writes outcomes back' },
                    { label: 'DataForge', sub: 'Its agents prepare the data these agents act on' },
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
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest pt-1">And the systems it acts on</p>
                <div className="grid grid-cols-2 gap-3">
                  {['CRM & Sales', 'ERP & Finance', 'REST / GraphQL APIs', 'Data Platforms', 'Messaging Systems', 'Custom Connectors'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-navy rounded-2xl p-6 border border-brand-navy-border flex flex-col gap-5">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  Security & Governance
                </h3>
                <div className="flex flex-col gap-2.5">
                  {['Never writes to a system of record without your approval', 'Full audit trail on every agent action', 'Role-based access control (RBAC)', 'Compliance-ready execution framework', 'Encrypted data in transit and at rest', 'Agent memory scoped to your business'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Cortexus in Action ───────────────────────────────────────────────── */}
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
              Cortexus in Action
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              See the agents <span className="text-brand">at work.</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-gray-500 leading-relaxed">
              Watch an agent investigate a supplier slipping below contract — forming a hypothesis, gathering evidence, surviving an adversarial review, and arriving with the fix already drafted.
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
              src={`https://www.youtube-nocookie.com/embed/${CORTEXUS_VIDEO_ID}`}
              title="Cortexus product walkthrough"
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
              <PulsingDot />
              <span className="text-sm font-semibold text-brand-light/50 uppercase tracking-widest">Get Started</span>
            </motion.div>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-4xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Ready to Put an Agent on{' '}
              <span className="text-brand">Your Hardest Process?</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-lg text-white/55 leading-relaxed">
              Every business has processes worth watching. Bring your hardest one, and we will put an agent on it in a live demo against your own systems.
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
