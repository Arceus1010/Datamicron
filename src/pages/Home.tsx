import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const stagger = (delay = 0.12) => ({
  show: { transition: { staggerChildren: delay } },
})

const EASE = [0.22, 1, 0.36, 1] as const

// ─── Data ─────────────────────────────────────────────────────────────────────

const CYCLING_WORDS = ['Digital Brain.', 'Autonomous AI.', 'Digital Twin.']

const LAYERS = [
  {
    step: '01',
    name: 'Cortexus',
    tag: 'Autonomous Agents & Orchestration',
    href: '/phoenix-aip/cortexus',
    description:
      'AI agents that plan, reason, and act — orchestrating workflows across systems without human intervention, continuously optimising toward business outcomes.',
  },
  {
    step: '02',
    name: 'Phoenix Insights',
    tag: 'Business Intelligence & Decision Layer',
    href: '/phoenix-aip/phoenix-insights',
    description:
      'Surfaces decisions, forecasts, and recommendations directly to business users — closing the loop from raw data to measurable enterprise action.',
  },
  {
    step: '03',
    name: 'Spotlight Lakehouse',
    tag: 'Semantic & Vector Storage',
    href: '/phoenix-aip/spotlight-lakehouse',
    description:
      'A unified lakehouse combining semantic search, vector embeddings, and a knowledge graph — turning stored data into contextually queryable intelligence.',
  },
  {
    step: '04',
    name: 'DataForge',
    tag: 'Data Ingestion & Pipelines',
    href: '/phoenix-aip/dataforge',
    description:
      'Connects and normalises data from any source — structured, unstructured, streaming or batch — into a unified, governed pipeline ready for intelligence.',
  },
]

const CAPABILITIES = [
  {
    title: 'Enterprise Digital Brain',
    description:
      'A unified intelligence layer that connects every data source, model, and workflow across your organisation.',
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
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    title: 'Digital Twin',
    description:
      'Real-time virtual replicas of your operations — simulate, monitor, and optimise before acting in the real world.',
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
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m11.25 0H4.5m15 0a2.25 2.25 0 012.25 2.25v7.5A2.25 2.25 0 0119.5 21H4.5a2.25 2.25 0 01-2.25-2.25v-7.5A2.25 2.25 0 014.5 9"
        />
      </svg>
    ),
  },
  {
    title: 'Autonomous AI Agents',
    description:
      'Agents that reason and act independently — handling complex decisions and multi-step tasks without human intervention.',
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
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
      </svg>
    ),
  },
  {
    title: 'Write-back to ERP & Systems',
    description:
      "Decisions don't stop at insight — Phoenix AIP pushes actions directly back into your ERP, CRM, and operational systems.",
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
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
  },
]

// ─── Shared Sub-components ────────────────────────────────────────────────────

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

function ImagePlaceholder({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M21 12V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75V15"
      />
    </svg>
  )
}

function CyclingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % CYCLING_WORDS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="relative inline-grid" style={{ gridTemplateColumns: '1fr' }}>
      {/* Invisible longest word to hold the width */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">Autonomous AI.</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="text-brand col-start-1 row-start-1 whitespace-nowrap"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {CYCLING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        {/* Full-bleed video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/Corporate Video Phoenix (1080p_30fps_H264-128kbit_AAC).mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-16 w-full">
          <motion.div
            className="flex flex-col gap-8 max-w-6xl mr-auto backdrop-blur-sm bg-black/30 rounded-xl px-10 py-10 border border-white/10 shadow-2xl"
            variants={stagger()}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-6xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight"
            >
              The Enterprise <CyclingWord />
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-xl text-white/90 leading-relaxed"
            >
              Transform your organization into an autonomous, AI-driven enterprise — from raw data
              to closed-loop intelligence.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                to="/about/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-7 py-3.5 rounded-sm transition-colors duration-200 shadow-sm shadow-brand/30"
              >
                Request a Demo
                <ArrowIcon />
              </Link>
              <a
                href="#learn-more"
                className="inline-flex items-center justify-center gap-2 text-white hover:text-brand text-base font-semibold px-7 py-3.5 rounded-sm border border-white/40 hover:border-brand/60 transition-colors duration-200"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
      </section>

      {/* The Problem */}
      <section className="bg-brand-navy">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            className="max-w-3xl mx-auto text-center flex flex-col gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={stagger(0.15)}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-sm font-semibold text-brand-light/50 uppercase tracking-widest"
            >
              The Problem
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Your data is everywhere.{' '}
              <span className="text-brand">Phoenix AIP fills the gap.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-lg text-gray-400 leading-relaxed"
            >
              Too many tools. No unified intelligence. Phoenix AIP closes the loop.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Phoenix AIP Architecture */}
      <section id="learn-more" className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="max-w-2xl mb-16 flex flex-col gap-4"
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
              Phoenix AIP
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Built in layers.{' '}
              <span className="text-brand whitespace-nowrap">Intelligent end-to-end.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-lg text-gray-500"
            >
              Four integrated modules that take your enterprise from raw data to autonomous
              decisions.
            </motion.p>
          </motion.div>

          <div className="relative flex flex-col gap-24">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gray-100 hidden lg:block" />

            {LAYERS.map((layer, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={layer.step}
                  className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand border-2 border-white ring-1 ring-brand/30 hidden lg:block z-10" />

                  <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="w-full aspect-video rounded-sm bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-300">
                      <ImagePlaceholder />
                    </div>
                  </div>

                  <div
                    className={`flex flex-col gap-4 ${isEven ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8 lg:text-right'}`}
                  >
                    <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">
                      {layer.step}
                    </span>
                    <div className={`flex flex-col gap-1 ${isEven ? '' : 'lg:items-end'}`}>
                      <span className="text-xs font-semibold text-brand bg-brand-light px-2.5 py-0.5 rounded-full w-fit">
                        {layer.tag}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900">{layer.name}</h3>
                    </div>
                    <p className="text-gray-500 text-base leading-relaxed">{layer.description}</p>
                    <Link
                      to={layer.href}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark w-fit transition-colors ${isEven ? '' : 'lg:self-end'}`}
                    >
                      Learn More
                      <ArrowIcon />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            className="flex flex-col gap-3 mb-14"
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
              What <span className="text-brand">Phoenix AIP</span> can do for your enterprise.
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                className="bg-white rounded-xl p-8 flex flex-col gap-5 border border-gray-100 hover:border-brand/20 hover:shadow-sm transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <div className="w-10 h-10 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
                  {cap.icon}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-gray-900 text-base">{cap.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-light">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <motion.div
            className="flex flex-col items-center gap-6 max-w-3xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger(0.14)}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-sm font-semibold text-brand uppercase tracking-widest"
            >
              Get Started
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Ready to build your <span className="text-brand">Enterprise Digital Brain?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-lg text-gray-500 leading-relaxed"
            >
              See how Phoenix AIP transforms your data into autonomous decisions. Talk to our team
              today.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                to="/about/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 shadow-sm shadow-brand/20"
              >
                Request a Demo
                <ArrowIcon />
              </Link>
              <Link
                to="/about/contact"
                className="inline-flex items-center justify-center gap-2 text-gray-700 hover:text-brand text-base font-semibold px-8 py-3.5 rounded-sm border border-gray-300 hover:border-brand/40 transition-colors duration-200"
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
