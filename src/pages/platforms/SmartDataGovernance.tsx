import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SDG_VIDEO_ID = 'go2X94vdWkc'

const WHY_SDG = [
  {
    id: 'control',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Comprehensive Data Control',
    description:
      'Advanced tools to manage data availability, usability, integrity and security — so organizations take full control of their data assets.',
  },
  {
    id: 'metadata',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 17.25a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
      </svg>
    ),
    title: 'Enhanced Metadata Management',
    description:
      'Deep insight into data lineage, quality, sensitivity and usage — enabling effective classification, access control and regulatory compliance.',
  },
  {
    id: 'design',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    title: 'Cutting-Edge Technology and User-Friendly Design',
    description:
      'Innovative technology behind an intuitive interface, simplifying data management so teams can derive value from their information assets.',
  },
]

const CAPABILITIES = [
  { title: 'Data Policies', description: 'The standards and rules that define how data is managed across the organization.' },
  { title: 'Data Standards', description: 'Format, structure and content specified so data stays consistent everywhere.' },
  { title: 'Data Architecture', description: 'The systems, tools and processes used to manage and store data.' },
  { title: 'Data Quality', description: 'Ensuring the data your business runs on is accurate, complete and consistent.' },
  { title: 'Data Security', description: 'The measures that protect data from unauthorised access, theft or loss.' },
  { title: 'Data Privacy', description: 'Data used responsibly and ethically, in compliance with regulatory requirements.' },
  { title: 'Metadata Catalog & Lineage', description: 'Organise, catalog and maintain metadata across systems, with lineage tracked end to end.' },
  { title: 'Automated Tagging', description: 'Automated classification and detailed metadata insight that speed up data discovery.' },
]

const PILLARS = [
  { label: 'Policies', value: 96 },
  { label: 'Standards', value: 88 },
  { label: 'Quality', value: 92 },
  { label: 'Security', value: 99 },
  { label: 'Privacy', value: 94 },
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

// Governance visual — coverage across the pillars of a data estate
function GovernanceVisual() {
  return (
    <div className="relative w-full max-w-lg">
      <motion.div
        className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm p-5 flex flex-col gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Governance coverage</span>
          <span className="flex items-center gap-1.5 text-xs text-white/40">
            <PulsingDot color="bg-emerald-400" />
            Compliant
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {PILLARS.map((pillar, i) => (
            <div key={pillar.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">{pillar.label}</span>
                <span className="text-white/35">{pillar.value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-brand to-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${pillar.value}%` }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: EASE }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/8 flex items-center justify-between">
          <span className="text-xs text-white/35">Assets catalogued</span>
          <span className="text-sm font-semibold text-white">14,820</span>
        </div>
      </motion.div>

      <motion.div
        className="mt-3 rounded-xl border border-white/8 bg-white/2 px-4 py-3 flex flex-wrap gap-x-4 gap-y-1.5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
      >
        {['Lineage', 'Classification', 'Access control', 'Compliance'].map((item) => (
          <span key={item} className="flex items-center gap-1.5 text-xs text-white/35">
            <span className="w-1 h-1 rounded-full bg-brand/70 shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SmartDataGovernance() {
  return (
    <div className="bg-white">
      {/* ── 01 · Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-brand-navy">
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div className="flex flex-col gap-8" variants={stagger()} initial="hidden" animate="show">
              <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-2.5">
                <PulsingDot color="bg-brand" />
                <span className="text-sm font-semibold text-brand uppercase tracking-widest">
                  Platforms — Smart Data Governance
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Smart Data Governance: <span className="text-brand">Metadata Management.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-xl text-white/60 leading-relaxed max-w-xl"
              >
                Managing data availability, usability, integrity and security — a data strategy and transformation program for every enterprise that aspires to become data centric.
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
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            >
              <GovernanceVisual />
            </motion.div>
          </div>

          {/* Trust bar */}
          <motion.div
            className="mt-20 pt-8 border-t border-white/10 flex flex-wrap gap-6 lg:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            {['Metadata catalog and lineage', 'Classification and access control', 'Regulatory compliance', 'Automated tagging'].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 02 · Why Smart Data Governance ───────────────────────────────────── */}
      <section id="why" className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
              Why Smart Data Governance
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              For every enterprise aspiring to be <span className="text-brand">data centric.</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-gray-500 leading-relaxed">
              In an era where data is king, Smart Data Governance redefines how organizations manage, secure and derive value from their information assets — cutting-edge technology behind a user-friendly design.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {WHY_SDG.map((item, i) => (
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
                <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug">{item.title}</h3>
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
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
              Key Features
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              The pillars of a governed <span className="text-brand">data estate.</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-gray-500 leading-relaxed">
              Comprehensive tools to organise, catalog and maintain metadata across systems — streamlining discovery, classification and lineage tracking so data usage, collaboration and compliance all improve together.
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
                <h3 className="text-base font-bold text-gray-900 tracking-tight leading-snug">{cap.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · Smart Data Governance in Action ─────────────────────────────── */}
      <section className="bg-brand-navy">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} className="text-sm font-semibold text-brand uppercase tracking-widest">
              Governance in Action
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              See the platform <span className="text-brand">at work.</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE }} className="text-xl text-white/55 leading-relaxed">
              Watch how Smart Data Governance catalogs an estate — metadata organised, lineage traced, sensitive data classified and policies applied across the business.
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
              src={`https://www.youtube-nocookie.com/embed/${SDG_VIDEO_ID}`}
              title="Smart Data Governance product walkthrough"
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
