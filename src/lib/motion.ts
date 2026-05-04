export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
}

export const stagger = (delay = 0.12) => ({
  show: { transition: { staggerChildren: delay } },
})

// Sliding-line indicator used on hover in nav/footer links
export const slidingLineVariants = {
  rest:  { width: 0, opacity: 0 },
  hover: { width: 12, opacity: 1 },
} as const
