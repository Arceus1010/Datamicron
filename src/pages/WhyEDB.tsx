import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: 'twin',
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
          d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
        />
      </svg>
    ),
    title: 'Digital Twin',
    summary: 'A real-time digital representation of the enterprise and its environment.',
    capabilities: ['Operations', 'Processes', 'Assets'],
  },
  {
    id: 'knowledge',
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
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    title: 'Knowledge Graph',
    summary: 'Captures and structures enterprise knowledge, relationships, and business context.',
    capabilities: ['Facts', 'Documents', 'Relationships', 'Business Context'],
  },
  {
    id: 'simulation',
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
          d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
        />
      </svg>
    ),
    title: 'Simulation Engine',
    summary: 'Explores possible futures to evaluate options and inform better decisions.',
    capabilities: ['Scenario Analysis', 'Forecasting', 'What-if Modelling'],
  },
  {
    id: 'agents',
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
    title: 'Orchestration & AI Agents',
    summary: 'AI agents that orchestrate workflows, automate processes, and execute actions.',
    capabilities: ['Recommendation', 'Automation', 'Execution'],
  },
  {
    id: 'judgement',
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
          d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
        />
      </svg>
    ),
    title: 'Judgement Graph',
    summary: "Represents how decisions are made, why, and what's learned.",
    capabilities: ['Assumptions', 'Reasoning', 'Decisions', 'Confidence', 'Outcomes & Lessons'],
  },
]

const ERAS = [
  {
    years: '1980–2005',
    name: 'Systems of Record',
    systems: 'ERP, CRM, Finance, HR, SCM',
    verbs: 'Store, process, record.',
  },
  {
    years: '2005–2022',
    name: 'Systems of Insight',
    systems: 'BI, analytics, dashboards, ML, reports',
    verbs: 'Explain, analyse, understand.',
  },
  {
    years: '2023–2030+',
    name: 'Enterprise Digital Brain',
    systems: 'AI reasoning, enterprise knowledge graph, digital twin, multi-agent AI',
    verbs: 'Predict, simulate, recommend, execute.',
    current: true,
  },
]

const AIP_LAYERS = [
  {
    tier: 'Layer 03',
    name: 'Cortexus',
    href: '/phoenix-aip/cortexus',
    role: 'Autonomous Agents & Orchestration',
    summary: 'Turns decisions into action — agents that execute across systems and close the loop.',
    capabilities: [
      'AI Agents',
      'Workflow Automation',
      'Cross-System Actions',
      'Closed-Loop Operations',
    ],
    // What this layer hands to the one above it
    emits: 'Actions, decisions & orchestration',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
        />
      </svg>
    ),
    accent: {
      text: 'text-rose-300',
      border: 'border-rose-400/25',
      bg: 'bg-rose-500/8',
      dot: 'bg-rose-400',
      rule: 'from-rose-400/70',
      chip: 'bg-rose-400/10 text-rose-200 border-rose-400/30',
      line: '#fb7185',
      label: '#fda4af', // rose-300 — 9.0:1 on brand-navy
    },
  },
  {
    tier: 'Layer 02',
    name: 'Spotlight Data Fabrics',
    href: '/phoenix-aip/spotlight-data-fabrics',
    role: 'Unified Data. Everywhere.',
    summary: 'One governed data layer across every source, structured, unstructured and semantic.',
    capabilities: [
      'Structured & Unstructured',
      'Vector & Semantic Data',
      'Governance & Quality',
      'Enterprise Ontology',
    ],
    emits: 'Governed, semantic context',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m6.429 9.75 2.25 2.25-2.25 2.25M12 3.75 3 8.25l9 4.5 9-4.5-9-4.5Zm9 7.5-9 4.5-9-4.5m18 4.5-9 4.5-9-4.5"
        />
      </svg>
    ),
    accent: {
      text: 'text-cyan-300',
      border: 'border-cyan-400/25',
      bg: 'bg-cyan-500/8',
      dot: 'bg-cyan-400',
      rule: 'from-cyan-400/70',
      chip: 'bg-cyan-400/10 text-cyan-200 border-cyan-400/30',
      line: '#22d3ee',
      label: '#67e8f9', // cyan-300 — 12.7:1 on brand-navy
    },
  },
  {
    tier: 'Layer 01',
    name: 'DataForge',
    href: '/phoenix-aip/dataforge',
    role: 'Data Engineering & Activation Engine',
    summary:
      'Moves, cleans and activates enterprise data in real time — the foundation everything runs on.',
    capabilities: [
      'Real-Time Ingestion',
      'Data Transformation',
      'Quality & Enrichment',
      'APIs & Pipelines',
    ],
    emits: 'Clean, activated data streams',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
    accent: {
      text: 'text-emerald-300',
      border: 'border-emerald-400/25',
      bg: 'bg-emerald-500/8',
      dot: 'bg-emerald-400',
      rule: 'from-emerald-400/70',
      chip: 'bg-emerald-400/10 text-emerald-200 border-emerald-400/30',
      line: '#34d399',
      label: '#6ee7b7', // emerald-300 — 11.4:1 on brand-navy
    },
  },
]

const AIP_STUDIO = {
  name: 'Phoenix Studio',
  href: '/phoenix-aip/phoenix-studio',
  role: 'Applications people work in',
  plane: 'Experience Plane',
  icon: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
      />
    </svg>
  ),
  items: [
    'Operational Excellence',
    'Supply Chain Intelligence',
    'Customer 360',
    'Financial Performance',
    'Risk & Compliance',
    'Strategy & Planning',
  ],
}

const AIP_INSIGHTS = {
  name: 'Phoenix Insights',
  href: '/phoenix-aip/phoenix-insights',
  role: 'Reasoning and foresight',
  plane: 'Reasoning Plane',
  icon: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    </svg>
  ),
  items: [
    'AI Reasoning & Decision Intelligence',
    'Predictive Analytics',
    'Knowledge Graph',
    'Simulation & Digital Twin',
    'What-If Scenarios',
  ],
}

// Bottom band of the architecture diagram — what feeds DataForge
const AIP_SOURCES = ['ERP', 'CRM', 'SCADA & IoT', 'Documents', 'APIs & Events', 'Data Lake']

// Cross-cutting concerns that run the full height of the stack
const AIP_CROSSCUTS = ['Security', 'Governance', 'Lineage', 'Observability']

const PARTNER_TRACKS = [
  {
    title: 'Channel Partners',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835"
        />
      </svg>
    ),
    points: [
      'Open doors to customers, sectors, and regions',
      'Lead co-selling, account coverage, and local market expansion',
      'Package EDB into repeatable offerings',
      'Earn recurring revenue, services margin, and joint pipeline growth',
    ],
    winWin: 'Datamicron gains reach — partner gains a differentiated AI portfolio.',
  },
  {
    title: 'Value-Added Partners',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
        />
      </svg>
    ),
    points: [
      'Add implementation, integration, data engineering, and managed services',
      'Build solution accelerators, connectors, and deployment playbooks',
      'Provide change management, user adoption, and support',
      'Increase project size and long-term customer value',
    ],
    winWin: 'Datamicron scales delivery — partner grows higher-value services.',
  },
  {
    title: 'Domain Partners',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    points: [
      'Contribute industry expertise, use cases, and business process knowledge',
      'Help define ontologies, KPIs, digital twins, and simulation logic',
      'Co-create vertical AI apps for government, banking, healthcare, manufacturing, and supply chain',
      'Improve credibility, outcomes, and speed to value',
    ],
    winWin: 'Datamicron gets domain depth — partner monetises expertise through AI solutions.',
  },
]

const BUILD_STEPS = [
  {
    step: '01',
    title: 'Discover use cases',
    detail: 'Identify business pain points and target decisions',
  },
  {
    step: '02',
    title: 'Model the domain',
    detail: 'Define ontology, entities, rules, and knowledge structure',
  },
  {
    step: '03',
    title: 'Build the digital twin',
    detail: 'Connect data, processes, context, and state',
  },
  {
    step: '04',
    title: 'Deploy AI agents & apps',
    detail: 'Create copilots, workflows, alerts, and decision support',
  },
  {
    step: '05',
    title: 'Measure & scale',
    detail: 'Track outcomes, improve models, replicate across sectors',
  },
]

const COLLAB_OUTCOMES = [
  'Faster go-to-market for EDB',
  'More complete AI solutions for customers',
  'Shared revenue and reusable IP',
  'Stronger ecosystem and regional scale',
]

const EDB_VIDEO_ID = '1oA85TZUke0'

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

// Neural graph — five pillar nodes feeding a central cognitive core
const NODES = [
  { x: 90, y: 70, label: 'TWIN' },
  { x: 300, y: 48, label: 'KNOWLEDGE' },
  { x: 452, y: 132, label: 'SIMULATION' },
  { x: 356, y: 268, label: 'AGENTS' },
  { x: 108, y: 240, label: 'JUDGEMENT' },
]

function BrainNetworkVisual() {
  const cx = 256
  const cy = 160

  return (
    <svg
      viewBox="0 0 520 330"
      className="w-full h-auto"
      role="img"
      aria-label="Enterprise Digital Brain network of five connected pillars"
    >
      <defs>
        <radialGradient id="edb-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#117EC2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#117EC2" stopOpacity="0.05" />
        </radialGradient>
        <filter id="edb-glow">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Node-to-node lattice */}
      {NODES.map((a, i) =>
        NODES.slice(i + 1).map((b, j) => (
          <motion.line
            key={`lattice-${i}-${j}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#ffffff"
            strokeOpacity={0.07}
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.3 + i * 0.08, ease: EASE }}
          />
        )),
      )}

      {/* Spokes into the core, with a travelling pulse */}
      {NODES.map((n, i) => (
        <g key={`spoke-${i}`}>
          <motion.line
            x1={n.x}
            y1={n.y}
            x2={cx}
            y2={cy}
            stroke="#117EC2"
            strokeOpacity={0.35}
            strokeWidth={1.25}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: EASE }}
          />
          <motion.circle
            r={2.6}
            fill="#5FB3E4"
            initial={{ cx: n.x, cy: n.y, opacity: 0 }}
            animate={{ cx: [n.x, cx], cy: [n.y, cy], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.2,
              delay: 1 + i * 0.35,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: 'easeInOut',
            }}
          />
        </g>
      ))}

      {/* Pillar nodes */}
      {NODES.map((n, i) => (
        <motion.g
          key={`node-${i}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r={9} fill="#0B1E2D" stroke="#117EC2" strokeWidth={1.5} />
          <circle cx={n.x} cy={n.y} r={3.5} fill="#5FB3E4" />
          <text
            x={n.x}
            y={n.y - 18}
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontSize="9.5"
            letterSpacing="0.14em"
            fontFamily="'Source Sans 3', sans-serif"
          >
            {n.label}
          </text>
        </motion.g>
      ))}

      {/* Cognitive core */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={54}
          fill="url(#edb-core)"
          stroke="#117EC2"
          strokeWidth={1.5}
          filter="url(#edb-glow)"
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={54}
          fill="none"
          stroke="#117EC2"
          strokeWidth={1}
          animate={{ r: [54, 72], opacity: [0.35, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="15"
          fontWeight="700"
          fontFamily="Manrope, sans-serif"
          letterSpacing="0.08em"
        >
          EDB
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="9"
          letterSpacing="0.14em"
          fontFamily="'Source Sans 3', sans-serif"
        >
          DIGITAL BRAIN
        </text>
      </motion.g>
    </svg>
  )
}

// Vertical connector between two stacked architecture layers — flow runs upward.
// `to` drives the decorative stroke; `labelColor` is the AA-checked text tone.
function FlowConnector({
  label,
  from,
  to,
  labelColor,
}: {
  label: string
  from: string
  to: string
  labelColor: string
}) {
  return (
    <div className="relative flex justify-center py-1" aria-hidden="true">
      <div
        className="relative h-12 w-px"
        style={{ backgroundImage: `linear-gradient(to top, ${from}59, ${to}b3)` }}
      >
        <motion.span
          className="absolute -left-0.75 h-1.5 w-1.5 rounded-full"
          style={{ background: to, boxShadow: `0 0 8px ${to}` }}
          initial={{ top: '100%', opacity: 0 }}
          animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
        />
        <svg
          className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5"
          viewBox="0 0 10 10"
          fill="none"
          stroke={to}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.9}
        >
          <path d="M1.5 5.5 5 2l3.5 3.5" />
        </svg>
        <span
          className="hidden sm:block absolute left-1/2 top-1/2 -translate-y-1/2 ml-4 text-[11px] font-medium uppercase tracking-[0.16em] whitespace-nowrap"
          style={{ color: labelColor }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

// Horizontal bridge from the platform stack out to a side plane
function BridgeConnector({ side, color }: { side: 'left' | 'right'; color: string }) {
  const isLeft = side === 'left'
  return (
    <div
      className={`hidden lg:flex items-center absolute top-1/2 -translate-y-1/2 w-8 ${isLeft ? '-left-8 flex-row-reverse' : '-right-8'}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-white/35" />
      <motion.span
        className="absolute top-1/2 -translate-y-1/2 h-1 w-1 rounded-full"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
        initial={{ [isLeft ? 'right' : 'left']: 0, opacity: 0 }}
        animate={{ [isLeft ? 'right' : 'left']: ['0%', '100%'], opacity: [0, 1, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
      />
      <svg
        className="w-2 h-2 text-white/55 shrink-0"
        viewBox="0 0 8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={isLeft ? 'M5 1.5 2 4l3 2.5' : 'M3 1.5 6 4l-3 2.5'} />
      </svg>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  children,
  dark = false,
  center = false,
}: {
  eyebrow: string
  children: React.ReactNode
  dark?: boolean
  center?: boolean
}) {
  return (
    <motion.div
      className={`flex flex-col gap-4 mb-16 ${center ? 'max-w-2xl mx-auto text-center' : 'max-w-2xl'}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={stagger()}
    >
      <motion.span
        variants={fadeUp}
        transition={{ duration: 0.5, ease: EASE }}
        className={`text-sm font-semibold uppercase tracking-widest ${dark ? 'text-brand-light/75' : 'text-brand'}`}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.55, ease: EASE }}
        className={`text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}
      >
        {children}
      </motion.h2>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhyEDB() {
  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-brand-navy">
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-brand/8 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-brand/5 blur-3xl pointer-events-none" />

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
                <PulsingDot />
                <span className="text-sm font-semibold text-brand-light/70 uppercase tracking-widest">
                  Enterprise Digital Brain
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Why <span className="text-brand-light">Enterprise Digital Brain</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-xl text-white/60 leading-relaxed max-w-xl"
              >
                The next decade of enterprise AI won't be won by chatbots, dashboards, or simple
                automation. It will be won by the company that becomes the Artificial Intelligence
                Platform — the Enterprise Digital Brain — for enterprise intelligence.
              </motion.p>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-xl font-bold text-white border-l-2 border-brand pl-5"
              >
                Datamicron is building that system for Asia.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <a
                  href="#video"
                  className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-7 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-brand/25"
                >
                  Watch EDB in action
                  <ArrowIcon />
                </a>
                <Link
                  to="/phoenix-aip/phoenix-studio"
                  className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-semibold px-7 py-3.5 rounded-sm border border-white/15 hover:border-white/30 transition-colors duration-200"
                >
                  Explore Phoenix AIP
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            >
              <BrainNetworkVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What Is EDB ──────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-3xl mx-auto text-center flex flex-col gap-6 mb-16"
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
              What Is EDB
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              One cognitive system for <span className="text-brand">the whole enterprise.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              Enterprise Digital Brain (EDB) is a unified cognitive system that connects reality,
              knowledge, simulation, intelligence and judgement — so a business can move from{' '}
              <em className="text-gray-700 not-italic font-semibold">recording</em> what happened to{' '}
              <em className="text-gray-700 not-italic font-semibold">reasoning</em> about what to do
              next.
            </motion.p>
          </motion.div>

          {/* Framing line */}
          <motion.div
            className="max-w-4xl mx-auto mb-16 rounded-2xl bg-brand-navy border border-brand-navy-border p-8 sm:p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
              ERP records your business.
              <br className="hidden sm:block" />{' '}
              <span className="text-brand-light">
                The Enterprise Digital Brain understands, reasons, and runs your business.
              </span>
            </p>
          </motion.div>

          {/* Five pillars — the cognitive chain */}
          <div className="relative">
            {/* Rail running behind the step markers */}
            <div
              className="hidden xl:block absolute top-7 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-brand/30 to-transparent"
              aria-hidden="true"
            />

            <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-6 xl:gap-3 items-stretch">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="relative flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                >
                  {/* Step marker */}
                  <div className="flex justify-center">
                    <span className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-brand text-brand-dark font-display text-xl font-bold flex items-center justify-center shadow-sm">
                      {i + 1}
                    </span>
                  </div>

                  {/* Flow arrow into the next pillar */}
                  {i < PILLARS.length - 1 && (
                    <span
                      className="hidden xl:flex absolute top-7 -translate-y-1/2 -right-2 z-10 w-4 h-4 items-center justify-center text-brand"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <path d="M3.5 1.5 8 6l-4.5 4.5" />
                      </svg>
                    </span>
                  )}

                  <div className="group relative -mt-7 pt-9 flex-1 flex flex-col overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-brand/40 transition-all duration-300">
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-brand to-brand-light"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: EASE }}
                    />

                    {/* Identity */}
                    <div className="px-4 pb-4 flex flex-col items-center gap-3 text-center">
                      <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-brand-light text-brand-dark shrink-0">
                        {p.icon}
                      </div>
                      <h3 className="min-h-10 flex items-center text-sm font-bold text-brand-dark uppercase tracking-wider leading-snug">
                        {p.title}
                      </h3>
                    </div>

                    {/* What it holds */}
                    <div className="border-t border-gray-100 px-3 py-3.5 flex flex-wrap justify-center content-start gap-1.5 grow">
                      {p.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="rounded-md bg-brand-light border border-brand/15 text-brand-dark text-[11px] font-medium leading-snug px-2 py-1"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>

                    {/* What it does */}
                    <p className="border-t border-gray-100 px-4 py-4 text-sm text-gray-600 leading-relaxed text-center">
                      {p.summary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing band */}
          <motion.div
            className="mt-8 rounded-xl border border-brand/20 bg-brand-light/60 px-6 py-6 flex flex-col lg:flex-row lg:items-center gap-x-8 gap-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className="text-sm font-semibold text-brand-dark uppercase tracking-widest lg:w-52 shrink-0">
              Five pillars, one brain
            </span>
            <p className="text-sm text-gray-700 leading-relaxed">
              Each pillar is useful alone. Connected, they compound — reality informs knowledge,
              knowledge feeds simulation, simulation guides agents, and every decision is recorded
              so the system learns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── How We Got Here ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeading eyebrow="How We Got Here" center>
            Transition of <span className="text-brand">enterprise systems.</span>
          </SectionHeading>

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-[16.6%] right-[16.6%] h-px bg-gray-200" />

            <div className="grid lg:grid-cols-3 gap-8">
              {ERAS.map((era, i) => (
                <motion.div
                  key={era.name}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
                >
                  <div className="relative flex justify-center">
                    <span
                      className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                        era.current
                          ? 'bg-brand text-white border-brand shadow-lg shadow-brand/25'
                          : 'bg-white text-gray-400 border-gray-200'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div
                    className={`rounded-xl border p-6 flex flex-col gap-3 h-full text-center ${
                      era.current
                        ? 'bg-white border-brand/30 shadow-sm'
                        : 'bg-white border-gray-100'
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold uppercase tracking-widest ${era.current ? 'text-brand' : 'text-gray-400'}`}
                    >
                      {era.years}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">{era.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{era.systems}</p>
                    <p
                      className={`text-sm font-semibold mt-auto pt-3 border-t ${era.current ? 'text-brand border-brand/15' : 'text-gray-600 border-gray-100'}`}
                    >
                      {era.verbs}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Phoenix AIP Architecture ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-navy">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-brand/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <SectionHeading eyebrow="The EDB, Realised" dark center>
            Phoenix AIP — the Enterprise Digital Brain,{' '}
            <span className="text-brand-light">in production.</span>
          </SectionHeading>

          <motion.p
            className="max-w-2xl mx-auto text-center text-lg text-white/70 leading-relaxed -mt-10 mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            The five pillars are not a concept deck. They ship as one platform: a data foundation, a
            unified fabric, an execution layer for agents — with reasoning on one side and
            applications on the other.
          </motion.p>

          {/* Architecture canvas */}
          <motion.div
            className="relative rounded-3xl border border-white/10 bg-white/2 p-5 sm:p-8 lg:p-10 overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Blueprint grid backdrop */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                backgroundSize: '44px 44px',
                maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 78%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 78%)',
              }}
              aria-hidden="true"
            />

            <div className="relative">
              {/* Canvas legend */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-5 border-b border-white/15">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                  Phoenix AIP — reference architecture
                </span>
                <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/65">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 10.5v-9m0 0L2.5 5M6 1.5 9.5 5" />
                  </svg>
                  Data flows up · intelligence flows out
                </span>
              </div>

              <div className="grid lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,14rem)] gap-6 lg:gap-8 items-stretch">
                {/* Experience plane */}
                <motion.div
                  className="relative rounded-2xl border border-indigo-400/25 bg-indigo-500/[0.07] p-5 flex flex-col gap-4 h-full"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span className="absolute -top-2.5 left-5 px-2 py-0.5 rounded-full bg-brand-navy border border-indigo-400/30 text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-300">
                    {AIP_STUDIO.plane}
                  </span>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="w-9 h-9 rounded-lg bg-indigo-400/10 border border-indigo-400/25 text-indigo-300 flex items-center justify-center shrink-0">
                      {AIP_STUDIO.icon}
                    </span>
                    <div className="flex flex-col">
                      <Link
                        to={AIP_STUDIO.href}
                        className="text-base font-bold text-white hover:text-indigo-300 transition-colors duration-200 tracking-tight"
                      >
                        {AIP_STUDIO.name}
                      </Link>
                      <span className="text-xs text-indigo-200">{AIP_STUDIO.role}</span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-1.5">
                    {AIP_STUDIO.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-white/75 rounded-md bg-white/5 border border-white/12 px-2.5 py-1.5"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Platform stack */}
                <div className="flex flex-col">
                  {AIP_LAYERS.map((layer, i) => (
                    <div key={layer.name} className="flex flex-col">
                      <motion.div
                        className={`relative rounded-2xl border ${layer.accent.border} ${layer.accent.bg} pl-6 pr-5 py-5 flex flex-col gap-4 overflow-hidden`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                      >
                        {/* Layer edge rule */}
                        <span
                          className={`absolute inset-y-0 left-0 w-1 bg-linear-to-b ${layer.accent.rule} to-transparent`}
                          aria-hidden="true"
                        />

                        {/* Bridges out to the side planes, from the top layer */}
                        {i === 0 && (
                          <>
                            <BridgeConnector side="left" color="#818cf8" />
                            <BridgeConnector side="right" color="#fb923c" />
                          </>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-9 h-9 rounded-lg border ${layer.accent.border} ${layer.accent.text} bg-white/5 flex items-center justify-center shrink-0`}
                            >
                              {layer.icon}
                            </span>
                            <div className="flex flex-col">
                              <Link
                                to={layer.href}
                                className="text-xl font-bold text-white hover:text-white/80 transition-colors duration-200 tracking-tight leading-tight"
                              >
                                {layer.name}
                              </Link>
                              <span
                                className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${layer.accent.text}`}
                              >
                                {layer.role}
                              </span>
                            </div>
                          </div>

                          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                            <PulsingDot color={layer.accent.dot} />
                            {layer.tier}
                          </span>
                        </div>

                        <p className="text-sm text-white/75 leading-relaxed">{layer.summary}</p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                          {layer.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className={`text-[11px] leading-snug text-center border rounded-md px-2 py-1.5 ${layer.accent.chip}`}
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      {i < AIP_LAYERS.length - 1 && (
                        <FlowConnector
                          label={AIP_LAYERS[i + 1].emits}
                          from={AIP_LAYERS[i + 1].accent.line}
                          to={layer.accent.line}
                          labelColor={layer.accent.label}
                        />
                      )}
                    </div>
                  ))}

                  {/* Ingestion band */}
                  <FlowConnector
                    label="Ingest & activate"
                    from="#34d399"
                    to="#34d399"
                    labelColor="#6ee7b7"
                  />

                  <motion.div
                    className="rounded-2xl border border-dashed border-white/25 bg-white/5 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:w-28 shrink-0">
                      Source systems
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {AIP_SOURCES.map((src) => (
                        <span
                          key={src}
                          className="text-[11px] text-white/75 bg-white/8 border border-white/15 rounded px-2.5 py-1"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Reasoning plane */}
                <motion.div
                  className="relative rounded-2xl border border-orange-400/25 bg-orange-500/[0.07] p-5 flex flex-col gap-4 h-full"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span className="absolute -top-2.5 left-5 px-2 py-0.5 rounded-full bg-brand-navy border border-orange-400/30 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300">
                    {AIP_INSIGHTS.plane}
                  </span>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="w-9 h-9 rounded-lg bg-orange-400/10 border border-orange-400/25 text-orange-300 flex items-center justify-center shrink-0">
                      {AIP_INSIGHTS.icon}
                    </span>
                    <div className="flex flex-col">
                      <Link
                        to={AIP_INSIGHTS.href}
                        className="text-base font-bold text-white hover:text-orange-300 transition-colors duration-200 tracking-tight"
                      >
                        {AIP_INSIGHTS.name}
                      </Link>
                      <span className="text-xs text-orange-200">{AIP_INSIGHTS.role}</span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-1.5">
                    {AIP_INSIGHTS.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-white/75 rounded-md bg-white/5 border border-white/12 px-2.5 py-1.5"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Cross-cutting concerns */}
              <motion.div
                className="mt-8 pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                  Across every layer
                </span>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {AIP_CROSSCUTS.map((c) => (
                    <span
                      key={c}
                      className="flex items-center gap-2 text-xs text-white/75 tracking-wide"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-light" />
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Video ────────────────────────────────────────────────────────────── */}
      <section id="video" className="bg-gray-50 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <SectionHeading eyebrow="See It In Action" center>
            EDB, <span className="text-brand">explained.</span>
          </SectionHeading>

          <motion.div
            className="rounded-2xl overflow-hidden border border-brand-navy-border bg-black/40 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${EDB_VIDEO_ID}`}
                title="Enterprise Digital Brain in action"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Partners Build on EDB ────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-3xl mx-auto text-center flex flex-col gap-6 mb-16"
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
              Why Partners Build on EDB
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              We don't build EDB <span className="text-brand">alone.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              We build it with a partner ecosystem — because turning fragmented systems into
              intelligent, industry-specific AI applications takes reach, delivery expertise, and
              domain knowledge no single company owns by itself. It's a win-win collaboration model.
            </motion.p>
          </motion.div>

          {/* Partner tracks */}
          <div className="grid lg:grid-cols-3 gap-6">
            {PARTNER_TRACKS.map((track, i) => (
              <motion.div
                key={track.title}
                className="border border-gray-100 rounded-xl p-6 hover:border-brand/30 hover:shadow-md transition-all duration-300 bg-white flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
                    {track.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight">{track.title}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {track.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-4 border-t border-gray-100 text-sm text-brand font-semibold italic leading-snug">
                  Win-win: {track.winWin}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Build process stepper */}
          <div className="mt-20">
            <motion.h3
              className="text-2xl font-bold text-gray-900 tracking-tight text-center mb-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              How AI apps get built on EDB
            </motion.h3>

            <div className="relative">
              <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px bg-gray-200" />

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {BUILD_STEPS.map((s, i) => (
                  <motion.div
                    key={s.step}
                    className="flex flex-col gap-3 text-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  >
                    <span className="relative z-10 w-12 h-12 rounded-full bg-brand-light text-brand border-2 border-white ring-1 ring-brand/20 flex items-center justify-center text-sm font-bold shrink-0">
                      {s.step}
                    </span>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{s.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Collaboration outcomes */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger(0.08)}
          >
            {COLLAB_OUTCOMES.map((item) => (
              <motion.span
                key={item}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full bg-gray-50 border border-gray-100 px-4 py-2 text-sm text-gray-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {item}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Link
              to="/partners"
              className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 shadow-lg shadow-brand/25"
            >
              Become a partner
              <ArrowIcon />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-brand-navy">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <motion.div
            className="flex flex-col items-center gap-6 max-w-3xl"
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
              <PulsingDot />
              <span className="text-sm font-semibold text-brand-light/75 uppercase tracking-widest">
                The Road Ahead
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-4xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
            >
              The future of <span className="text-brand-light">enterprise intelligence</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-lg text-white/70 leading-relaxed"
            >
              The next decade of enterprise AI will not be won by chatbots, dashboards, or simple
              automation. It will be won by the company that becomes the Artificial Intelligence
              Platform — the Enterprise Digital Brain — for enterprise intelligence.
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-2xl font-bold text-white"
            >
              Datamicron is building that system for Asia.
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
                Talk to us about EDB
                <ArrowIcon />
              </Link>
              <Link
                to="/phoenix-aip/phoenix-studio"
                className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-semibold px-8 py-3.5 rounded-sm border border-white/15 hover:border-white/30 transition-colors duration-200"
              >
                Explore Phoenix AIP
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
