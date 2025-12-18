import { motion, useScroll, useTransform } from "framer-motion"

export function PageShell({ children }) {
  // Parallax-style floating background that reacts to scroll
  const { scrollYProgress } = useScroll()
  const yTopLeft = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yTopRight = useTransform(scrollYProgress, [0, 1], [0, 80])
  const yBottom = useTransform(scrollYProgress, [0, 1], [0, -60])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#FDFCFB] via-[#FAF4FF] to-[#F7ECFF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-purple-800 dark:text-purple-200 transition-colors duration-300">
      {/* Soft gradient orbs for background storytelling */}
      <motion.div
        className="pointer-events-none absolute -top-40 -left-32 h-80 w-80 rounded-full bg-purple-200/40 dark:bg-purple-900/30 blur-3xl"
        style={{ y: yTopLeft, rotate }}
      />
      <motion.div
        className="pointer-events-none absolute top-40 -right-10 h-72 w-72 rounded-full bg-pink-200/40 dark:bg-pink-900/30 blur-3xl"
        style={{ y: yTopRight, rotate }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-100/40 dark:bg-amber-900/20 blur-3xl"
        style={{ y: yBottom, rotate }}
      />

      {/* Extra floating decorations (slow, looping movement) */}
      <motion.div
        className="pointer-events-none absolute top-1/3 left-4 h-10 w-10 rounded-full border border-purple-200/70 dark:border-purple-800/50 bg-purple-50/40 dark:bg-purple-900/20 blur-md"
        animate={{ y: [0, -18, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 right-6 h-12 w-24 rounded-full border border-pink-200/70 dark:border-pink-800/50 bg-pink-50/40 dark:bg-pink-900/20 blur-md"
        animate={{ y: [0, 16, 0], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function SectionTitle({ label, eyebrow }) {
  return (
    <motion.div
      className="mb-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-purple-300 dark:text-purple-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[0.25em] text-purple-500 dark:text-purple-400">
        {label}
      </h2>
    </motion.div>
  )
}

export function PrimaryButton({ children, className = "", ...rest }) {
  return (
    <motion.button
      {...rest}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97, y: 0, backgroundColor: "#fb923c" }} // warm orange on tap
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 px-5 py-2 text-sm font-medium text-white shadow-md shadow-purple-200/70 transition hover:shadow-lg hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className}`}
    >
      {children}
    </motion.button>
  )
}

export function IconButton({ icon, children, variant = "ghost", className = "", ...rest }) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"

  const variants = {
    ghost:
      "border border-purple-100/60 dark:border-purple-700/60 bg-white/40 dark:bg-gray-700/40 text-purple-700 dark:text-purple-300 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:border-purple-200 dark:hover:border-purple-600",
    subtle:
      "bg-purple-50/80 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-100/90 dark:hover:bg-purple-900/70 border border-purple-100/40 dark:border-purple-700/40",
  }

  return (
    <motion.button
      {...rest}
      whileHover={{ scale: 1.03, y: -1 }}
      // tap shifts to a warmer tone; backgroundColor overlays Tailwind bg
      whileTap={{ scale: 0.97, y: 0, backgroundColor: "#fed7aa" }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {icon && <img src={icon} className="h-4 w-4" alt="" />}
      {children}
    </motion.button>
  )
}

export function GlassCard({ children, className = "", variant = "solid" }) {
  const bg =
    variant === "transparent"
      ? "bg-white/10 dark:bg-gray-900/30 border border-white/40 dark:border-white/20 backdrop-blur-lg"
      : "bg-white/65 dark:bg-gray-800/65 backdrop-blur-md"

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`rounded-3xl p-8 shadow-xl shadow-purple-200/40 dark:shadow-gray-900/60 ${bg} ${className}`}
    >
      {children}
    </motion.div>
  )
}


