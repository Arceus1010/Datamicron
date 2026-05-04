import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSULTING_SERVICES = [
  {
    title: 'Artificial Intelligence (AI) & Large Language Model (LLM)',
    items: [
      'Artificial Intelligence',
      'Machine Learning',
      'Large Language Model',
      'Forecasting',
      'Pattern Matching',
      'Sentiment Analysis',
      'Semantic Analysis',
      'Visualization',
      'Data Governance',
      'Data / Text Mining',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    imageSide: 'left' as const,
  },
  {
    title: 'Business Analytics Consulting',
    items: [
      'Analytics Discovery & Use case development',
      'Analytics readiness & roadmap definition',
      'Operational Technology roadmap',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    imageSide: 'right' as const,
  },
]

const IMPLEMENTATION_SERVICES = [
  {
    title: 'Business Intelligence & Data Warehouse Implementation',
    items: [
      'Business / User Requirements',
      'Artificial Intelligence, Machine Learning and Large Language Model',
      'Data Warehouse Design & ETL',
      'Data Management',
      'Dashboard & Reports Development',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    imageSide: 'left' as const,
  },
  {
    title: 'Support Services',
    items: [
      'Artificial Intelligence & Machine Learning',
      'Technical Support',
      'Software Trainings',
      'Analytics Training',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.653-4.655m5.8-5.8 3.516 3.516a2.248 2.248 0 0 1 0 3.18L16.5 15l-3.516-3.516m0 0-3.516-3.516a2.248 2.248 0 0 1 0-3.18L12 2.25l3.516 3.516" />
      </svg>
    ),
    imageSide: 'right' as const,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

function ImagePlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full aspect-video rounded-sm bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-300 ${className}`}>
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M21 12V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75V15" />
      </svg>
    </div>
  )
}

interface ServiceCardProps {
  title: string
  items: string[]
  icon: React.ReactNode
  imageSide: 'left' | 'right'
  index: number
  dark?: boolean
}

function ServiceCard({ title, items, icon, imageSide, index, dark = false }: ServiceCardProps) {
  const isImageLeft = imageSide === 'left'
  return (
    <motion.div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-xl p-6 lg:p-8 border ${
        dark
          ? 'bg-white/5 border-white/10'
          : 'bg-white border-gray-100 shadow-sm'
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
    >
      <div className={isImageLeft ? 'lg:order-1' : 'lg:order-2'}>
        <ImagePlaceholder />
      </div>

      <div className={`flex flex-col gap-5 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${dark ? 'bg-brand/20 text-brand' : 'bg-brand-light text-brand'}`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold leading-snug tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
          {items.map((item) => (
            <li key={item} className={`flex items-start gap-2 text-sm ${dark ? 'text-white/70' : 'text-gray-500'}`}>
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Services() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-white">

        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-brand/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <motion.div
              className="flex flex-col gap-8"
              variants={stagger()}
              initial="hidden"
              animate="show"
            >
              <motion.span
                variants={fadeUp}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-sm font-semibold text-brand uppercase tracking-widest"
              >
                Our Services
              </motion.span>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.55, ease: EASE }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.05] tracking-tight"
              >
                Cutting-edge services in{' '}
                <span className="text-brand">AI, Machine Learning, and Big Data.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.55, ease: EASE }}
                className="text-xl text-gray-500 leading-relaxed max-w-xl"
              >
                We provide strategic consulting and end-to-end implementation services that guide your organisation through every step of its data-driven transformation.
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
                  href="#consulting"
                  className="inline-flex items-center justify-center gap-2 text-gray-700 hover:text-brand text-base font-semibold px-7 py-3.5 rounded-sm border border-gray-300 hover:border-brand/60 transition-colors duration-200"
                >
                  Explore Services
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="hidden lg:block"
            >
              <ImagePlaceholder className="rounded-2xl" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Professional Consulting */}
      <section id="consulting" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">

          <motion.div
            className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-16"
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
              Consulting
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Professional <span className="text-brand">Consulting Services</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-lg text-gray-500 leading-relaxed"
            >
              At Datamicron, we understand that successful integration of AI, Machine Learning, and Big Data requires more than just cutting-edge technology — it demands a strategic and thoughtful approach. Our consulting services are designed to guide your organisation tailored every step of this transformative journey.
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {CONSULTING_SERVICES.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* Implementation Services */}
      <section className="bg-brand-navy">
        <div className="max-w-6xl mx-auto px-6 py-24">

          <motion.div
            className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger()}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-sm font-semibold text-brand-light/50 uppercase tracking-widest"
            >
              Implementation
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Implementation <span className="text-brand">Services</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-lg text-white/60 leading-relaxed"
            >
              Our Implementation Services bring your strategic plans to life, delivering practical, efficient, and effective solutions that leverage the latest advancements in AI, Machine Learning, and Big Data technologies.
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {IMPLEMENTATION_SERVICES.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} dark />
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-light">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <motion.div
            className="flex flex-col items-center gap-6 max-w-2xl"
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
              Request Your <span className="text-brand">Demo Today</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-lg text-gray-500 leading-relaxed"
            >
              See how Datamicron's services can transform your organisation into a data-driven enterprise. Talk to our team today.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Link
                to="/about/contact"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 shadow-sm shadow-brand/20"
              >
                Contact Us
                <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
