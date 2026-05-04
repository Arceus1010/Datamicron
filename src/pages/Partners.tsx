import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Connect',
    description: 'Reach out and introduce your organization to start the conversation.',
  },
  {
    step: '02',
    title: 'Collaborate',
    description: 'Align on shared goals and explore opportunities for innovation.',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Work together to develop impactful, technology-driven solutions.',
  },
  {
    step: '04',
    title: 'Scale',
    description: 'Expand success and drive long-term growth through continuous collaboration.',
  },
]

const WHY_ITEMS = [
  {
    title: 'Expertise',
    description:
      'Deep expertise in Artificial Intelligence, Machine Learning, and Big Data enables us to deliver scalable, high-impact solutions. Our team is dedicated to pushing the boundaries of what technology can achieve.',
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
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description:
      'We foster a culture of innovation through collaboration. By sharing ideas, insights, and expertise, we co-create forward-thinking solutions that address real-world challenges.',
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
          d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
  },
  {
    title: 'Mutual Growth',
    description:
      'Our partnerships are built on shared success. We work closely with our partners to achieve common goals, unlock new opportunities, and create long-term business value.',
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
          d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
        />
      </svg>
    ),
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Partners() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-white">
        {/* Decorative brand accents */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-brand/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <motion.div
            className="flex flex-col gap-8 max-w-3xl"
            variants={stagger()}
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-sm font-semibold text-brand uppercase tracking-widest"
            >
              Partner Program
            </motion.span>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight"
            >
              Build the Future. <span className="text-brand">Together.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-xl text-gray-500 leading-relaxed max-w-2xl"
            >
              At Datamicron, we believe in the power of collaboration. We partner with
              organizations, institutions, and technology leaders to create a strong ecosystem that
              drives innovation in Artificial Intelligence, Machine Learning, and Big Data.
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
                Partner With Us
                <ArrowIcon />
              </Link>
              <a
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 text-gray-700 hover:text-brand text-base font-semibold px-7 py-3.5 rounded-sm border border-gray-300 hover:border-brand/60 transition-colors duration-200"
              >
                Explore Benefits
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Partner With Datamicron */}
      <section id="benefits" className="bg-brand-navy">
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
              className="text-sm font-semibold text-brand-light/50 uppercase tracking-widest"
            >
              Why Us
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Why Partner with <span className="text-brand">Datamicron?</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white/5 rounded-xl p-8 flex flex-col gap-5 border border-white/10 hover:border-brand/40 hover:bg-white/8 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <div className="w-11 h-11 rounded-lg bg-brand/20 text-brand flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-white text-lg">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Becoming a Partner */}
      <section className="bg-white">
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
              Partnership Journey
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Becoming a <span className="text-brand">Partner</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-lg text-gray-500 leading-relaxed"
            >
              We welcome organizations that are passionate about innovation and growth. Whether
              you're a technology provider, academic institution, or business, we invite you to
              collaborate with us and be part of a forward-thinking ecosystem.
            </motion.p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            <div className="absolute top-6 left-6 right-6 h-px bg-gray-100 hidden lg:block" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {JOURNEY_STEPS.map((item, i) => (
                <motion.div
                  key={item.step}
                  className="relative flex flex-col gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                >
                  <div className="w-12 h-12 rounded-full bg-brand-light text-brand flex items-center justify-center shrink-0 z-10 border-2 border-white ring-1 ring-brand/20">
                    <span className="text-sm font-bold">{item.step}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link
              to="/about/contact"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-7 py-3.5 rounded-sm transition-colors duration-200 shadow-sm shadow-brand/30"
            >
              Contact Us
              <ArrowIcon />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
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
              Start Your <span className="text-brand">Partnership Journey</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-lg text-gray-500 leading-relaxed"
            >
              Join a growing network of innovators shaping the future of technology and business.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: EASE }}>
              <Link
                to="/about/contact"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 shadow-sm shadow-brand/20"
              >
                Get in Touch
                <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
