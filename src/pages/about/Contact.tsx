import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger, EASE } from '@/lib/motion'

const CONTACT_OPTIONS = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>
    ),
    label: 'Call Us',
    sublabel: 'Speak directly with our team',
    value: '+603 2163 3168',
    href: 'tel:+60321633168',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
    label: 'Email Us',
    sublabel: 'Send us your requirements anytime',
    value: 'info@datamicron.com',
    href: 'mailto:info@datamicron.com',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6"
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
    label: 'Visit Us',
    sublabel: 'Lobby A, 11th Floor, Wisma UOA II, Kuala Lumpur',
    value: 'Get Directions →',
    href: 'https://maps.google.com/?q=Wisma+UOA+II+Kuala+Lumpur',
  },
]

const TRUST_SIGNALS = [
  'Response within 1 business day',
  '100% confidential',
  'No obligation consultation',
]

const INQUIRY_OPTIONS = [
  'General Inquiry',
  'Project Discussion',
  'Technical Support',
  'Partnership',
  'Other',
]

const FAQS = [
  {
    q: 'How quickly will you respond?',
    a: 'We aim to respond to all inquiries within 1 business day. For urgent matters, please call us directly.',
  },
  {
    q: 'Do you handle small projects?',
    a: 'Yes, we work with businesses of all sizes — from startups running a single dashboard to enterprises scaling across departments.',
  },
  {
    q: 'Is there a consultation fee?',
    a: "Initial discovery discussions are completely free. We'll understand your needs before recommending a solution or scope.",
  },
  {
    q: 'Can I request a meeting?',
    a: 'Absolutely. We can arrange virtual sessions via Zoom or Teams, or in-person meetings at our Kuala Lumpur office.',
  },
]

const faqPanelId = (q: string) => `faq-${q.replace(/\W+/g, '-').toLowerCase()}`

type FormState = 'idle' | 'handoff'

const CONTACT_EMAIL = 'info@datamicron.com'

/**
 * Builds the mailto: URL the form hands off to. There is no backend, so the
 * message is composed into the visitor's own mail client rather than posted.
 */
function buildMailtoHref(form: {
  name: string
  email: string
  phone: string
  company: string
  inquiry: string
  message: string
}) {
  const subject = `${form.inquiry || 'General Inquiry'} — ${form.name}`
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone && `Phone: ${form.phone}`,
    form.company && `Company: ${form.company}`,
    `Enquiry type: ${form.inquiry || 'General Inquiry'}`,
    '',
    form.message,
  ]
    .filter(Boolean)
    .join('\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiry: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formState, setFormState] = useState<FormState>('idle')
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim()) e.email = 'Please enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email'
    if (!form.message.trim()) e.message = 'Please tell us how we can help'
    return e
  }

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field])
      setErrors((e) => {
        const n = { ...e }
        delete n[field]
        return n
      })
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    // Hands the composed message to the visitor's mail client
    window.location.href = buildMailtoHref(form)
    setFormState('handoff')
  }

  return (
    <main className="bg-white">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-130 h-130 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-85 h-85 rounded-full bg-brand/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #117EC2 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-32 text-center">
          <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="space-y-6">
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 text-brand text-sm font-semibold tracking-widest uppercase"
            >
              <span className="w-6 h-px bg-brand" />
              Get In Touch
              <span className="w-6 h-px bg-brand" />
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
              className="font-display text-4xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Let's Build Something <span className="text-brand">Meaningful</span> Together
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
              Whether you have a project in mind, need technical consultation, or just want to
              explore ideas — our team is ready to help.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <a
                href="#contact-form"
                className="bg-brand hover:bg-brand-dark text-white px-8 py-3.5 rounded-sm font-semibold shadow-sm shadow-brand/30 transition-colors duration-200"
              >
                Request a Consultation
              </a>
              <a
                href="mailto:info@datamicron.com"
                className="text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                Or email us directly at{' '}
                <span className="text-brand-light hover:underline">info@datamicron.com</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Contact Options ───────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-3 gap-4"
          >
            {CONTACT_OPTIONS.map((opt) => (
              <motion.a
                key={opt.label}
                href={opt.href}
                target={opt.href.startsWith('https') ? '_blank' : undefined}
                rel={opt.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: EASE }}
                whileHover={{ y: -3 }}
                className="group flex flex-col gap-4 p-6 rounded-xl border border-gray-100 hover:border-brand/30 hover:shadow-md hover:shadow-brand/10 transition-all duration-200 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-light flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-200">
                  {opt.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 font-display">{opt.label}</p>
                  <p className="text-sm text-gray-500 mt-0.5 leading-snug">{opt.sublabel}</p>
                  <p className="text-sm text-brand-dark font-medium mt-2 group-hover:underline">
                    {opt.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main Contact Section ────────────────────────────────────── */}
      <section id="contact-form" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — Context + Trust */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: EASE }}>
                <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">
                  Contact Us
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                  Tell Us About Your Project
                </h2>
                <p className="text-gray-500 mt-4 leading-relaxed">
                  The more details you share, the better we can assist you. Whether it's a small
                  question or a large-scale solution, we'll respond with clarity and direction.
                </p>
              </motion.div>

              <motion.ul
                variants={fadeUp}
                transition={{ duration: 0.45, ease: EASE }}
                className="space-y-3"
              >
                {TRUST_SIGNALS.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-gray-700">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-brand" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium">{s}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.45, ease: EASE }}
                className="rounded-xl border border-gray-200 bg-white p-6 space-y-4"
              >
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-1">
                    Office Hours
                  </p>
                  <p className="text-gray-700 font-medium">Mon – Fri: 9:00 AM – 6:00 PM</p>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-1">
                    Support
                  </p>
                  <p className="text-gray-700 font-medium">Available via email 24/7</p>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+60321633168"
                    className="text-brand-dark font-medium hover:underline"
                  >
                    +603 2163 3168
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {formState === 'handoff' ? (
                    <motion.div
                      key="handoff"
                      role="status"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex flex-col items-center justify-center text-center py-16 gap-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-brand-dark"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-gray-900">
                          Your message is ready to send
                        </h3>
                        <p className="text-gray-500 mt-2 max-w-md">
                          We've opened your email app with the details filled in — press send there
                          and it reaches us. If nothing opened, email us directly at{' '}
                          <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="text-brand-dark font-medium hover:underline"
                          >
                            {CONTACT_EMAIL}
                          </a>
                          .
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a
                          href={buildMailtoHref(form)}
                          className="text-brand-dark text-sm font-medium hover:underline"
                        >
                          Reopen my email app
                        </a>
                        <button
                          onClick={() => {
                            setFormState('idle')
                            setErrors({})
                            setForm({
                              name: '',
                              email: '',
                              phone: '',
                              company: '',
                              inquiry: '',
                              message: '',
                            })
                          }}
                          className="text-gray-600 text-sm font-medium hover:underline"
                        >
                          Start a new message
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={(e) => {
                        void handleSubmit(e)
                      }}
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Field
                          id="name"
                          label="Full Name"
                          required
                          autoComplete="name"
                          value={form.name}
                          error={errors.name}
                          onChange={(v) => handleChange('name', v)}
                          placeholder="Jane Smith"
                        />
                        <Field
                          id="email"
                          label="Work Email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          error={errors.email}
                          onChange={(v) => handleChange('email', v)}
                          placeholder="jane@company.com"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <Field
                          id="phone"
                          label="Phone Number"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(v) => handleChange('phone', v)}
                          placeholder="+60 12 345 6789"
                        />
                        <Field
                          id="company"
                          label="Company / Organisation"
                          autoComplete="organization"
                          value={form.company}
                          onChange={(v) => handleChange('company', v)}
                          placeholder="Acme Corp"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="inquiry" className="text-sm font-medium text-gray-700">
                          What can we help you with?
                        </label>
                        <select
                          id="inquiry"
                          name="inquiry"
                          value={form.inquiry}
                          onChange={(e) => handleChange('inquiry', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-150 appearance-none"
                        >
                          <option value="">Select an option…</option>
                          {INQUIRY_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                          Your Message{' '}
                          <span className="text-red-600" aria-hidden="true">
                            *
                          </span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          aria-required="true"
                          aria-invalid={errors.message ? true : undefined}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                          value={form.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Tell us about your project, challenge, or question…"
                          className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-150 resize-none ${
                            errors.message
                              ? 'border-red-400 bg-red-50/30'
                              : 'border-gray-200 bg-white'
                          }`}
                        />
                        {errors.message && (
                          <p id="message-error" className="text-xs text-red-600">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {Object.keys(errors).length > 0 && (
                        <p role="alert" className="text-sm text-red-600">
                          Please correct the highlighted fields and try again.
                        </p>
                      )}

                      <div className="pt-1">
                        <motion.button
                          type="submit"
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3.5 rounded-sm shadow-sm shadow-brand/30 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          Compose Email
                        </motion.button>
                        <p className="text-center text-xs text-gray-600 mt-3">
                          Opens in your email app. We typically respond within 1 business day.
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ────────────────────────────────────────────── */}
      <section className="bg-brand-navy border-t border-brand-navy-border">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-white/50 text-sm uppercase tracking-widest font-semibold mb-8"
          >
            Trusted Across Southeast Asia
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="font-display text-2xl lg:text-3xl font-bold text-white leading-snug max-w-2xl mx-auto"
          >
            Trusted by businesses across Southeast Asia for data intelligence and digital solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-10 mt-10"
          >
            {(
              [
                ['10+', 'Years Experience'],
                ['200+', 'Projects Delivered'],
                ['50+', 'Enterprise Clients'],
              ] as [string, string][]
            ).map(([stat, label]) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl font-bold text-brand">{stat}</p>
                <p className="text-white/50 text-sm mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Map ────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
          >
            <div className="relative">
              <iframe
                title="Datamicron Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.8063153906654!2d101.71080647499266!3d3.152930096877937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d7b03bf4e7%3A0x8f1e4f5e5b9a3c7a!2sWisma%20UOA%20II!5e0!3m2!1sen!2smy!4v1699999999999!5m2!1sen!2smy"
                width="100%"
                height="360"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://maps.google.com/?q=Wisma+UOA+II+Kuala+Lumpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg border border-gray-100 transition-shadow duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    className="w-4 h-4 text-brand"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <p className="text-sm text-gray-600 font-medium">
                Wisma UOA II, Lobby A, 11th Floor, No. 21 Jalan Pinang, 50450 Kuala Lumpur, Malaysia
              </p>
              <span className="hidden sm:block text-gray-300">·</span>
              <p className="text-sm text-gray-600">Ample parking available in the building</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center mb-12"
          >
            <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Common Questions
            </h2>
          </motion.div>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-3"
          >
            {FAQS.map((faq) => (
              <motion.div
                key={faq.q}
                variants={fadeUp}
                transition={{ duration: 0.4, ease: EASE }}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                  aria-expanded={openFaq === faq.q}
                  aria-controls={faqPanelId(faq.q)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
                >
                  <span className="font-medium text-gray-900 font-display">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === faq.q ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 w-5 h-5 text-brand-dark"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === faq.q && (
                    <motion.div
                      key="content"
                      id={faqPanelId(faq.q)}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-gray-500 leading-relaxed text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────── */}
      <section className="bg-brand-navy">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight"
            >
              Still have questions? Let's talk.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.45, ease: EASE }}
              className="text-white/50 max-w-lg mx-auto"
            >
              Our team is available during business hours. We'd love to hear from you.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.45, ease: EASE }}>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-8 py-3.5 rounded-sm font-semibold shadow-sm shadow-brand/40 transition-colors duration-200"
              >
                Contact Our Team
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

/* ── Field helper component ──────────────────────────────────────── */
function Field({
  id,
  label,
  required,
  value,
  error,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
}: {
  id: string
  label: string
  required?: boolean
  value: string
  error?: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  autoComplete?: string
}) {
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}{' '}
        {required && (
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-150 ${
          error ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-white'
        }`}
      />
      {error && (
        <p id={errorId} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
