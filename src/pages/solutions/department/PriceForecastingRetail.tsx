import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const PRICE_FORECASTING_VIDEO_ID = 'YlIXCwlkDTU'

export default function PriceForecastingRetail() {
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
            src={`https://www.youtube-nocookie.com/embed/${PRICE_FORECASTING_VIDEO_ID}`}
            title="Price Forecasting Retail solution walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  )
}
