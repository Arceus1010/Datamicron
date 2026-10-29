import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const INDUSTRY_40_VIDEO_ID = 'ra5clStWxtY'

export default function Industry40() {
  return (
    <section className="bg-white min-h-[calc(100dvh-4rem)] flex items-center">
      <div className="w-full max-w-5xl mx-auto px-6 py-24">
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <iframe
            className="w-full aspect-video block"
            src={`https://www.youtube-nocookie.com/embed/${INDUSTRY_40_VIDEO_ID}`}
            title="Industry 4.0 solution walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  )
}
