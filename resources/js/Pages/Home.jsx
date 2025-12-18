import { useState, useRef, useEffect } from "react"
import { usePage, router, useForm } from "@inertiajs/react"
import { motion, useScroll, useTransform } from "framer-motion"

import { PageShell, SectionTitle, PrimaryButton, IconButton, GlassCard } from "@/components/ui"
import { useTheme } from "@/hooks/useTheme"
import Footer from "@/components/Footer"

// Images
import Logo from "@/components/logo.png"
import ReloadIcon from "@/components/reload.png"
import HeartIcon from "@/components/heart.png"
import CopyIcon from "@/components/copy.png"
import UserIcon from "@/components/user.png"
import LockIcon from "@/components/padlock.png"
import MailIcon from "@/components/mail.png"

export default function Home({ quote, likedQuotes = [] }) {
  const { auth } = usePage().props
  const user = auth?.user
  const { theme, toggleTheme } = useTheme()

  const [isRegister, setIsRegister] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const [editedQuote, setEditedQuote] = useState("")

  const authRef = useRef(null)

  // Scroll-based motion for foreground content (parallax feel)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const quoteY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const likedY = useTransform(scrollYProgress, [0, 1], [0, -40])

  /* ================= AUTH FORM ================= */

  const form = useForm({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const submitAuth = () => {
    if (isRegister) {
      form.post("/register")
    } else {
      form.post("/login")
    }
  }

  /* ================= LIKE HANDLERS ================= */

  const handleLike = () => {
    if (!user) {
      setIsRegister(false)
      authRef.current?.scrollIntoView({ behavior: "smooth" })
      return
    }

    router.post("/like", { quote })
  }

  const removeLike = (id) => {
    router.delete(`/like/${id}`, {
      preserveScroll: true,
    })
  }


  const updateLike = (id) => {
    if (!editedQuote.trim()) return

    router.put(
      `/like/${id}`,
      { quote: editedQuote },
      {
        onSuccess: () => {
          setEditingId(null)
          setEditedQuote("")
        },
      },
    )
  }

  const logout = () => {
    router.post("/logout")
  }

  return (
    <PageShell className="min-h-screen bg-black">
      {/* ================= HEADER ================= */}
      <header className="relative z-50 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            className="h-20 w-15 drop-shadow-md sm:h-16 sm:w-16"
            alt="Inspirely logo"
          />
          <div className="flex flex-col">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-purple-300 dark:text-purple-400 sm:text-xs">
              Daily Affirmation Studio
            </span>
            <span className="text-lg font-semibold italic tracking-wide text-purple-800 dark:text-purple-200 sm:text-xl">
              inspirely
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => {
              console.log('🔄 Button clicked! Current theme:', theme)
              toggleTheme()
              // Force check after toggle
              setTimeout(() => {
                console.log('🔍 After toggle - HTML has dark class?', document.documentElement.classList.contains('dark'))
                console.log('🔍 Current classes:', document.documentElement.classList.toString())
              }, 100)
            }}
            className="flex items-center justify-center rounded-full bg-white/60 dark:bg-gray-800/60 px-3 py-2 text-sm text-purple-700 dark:text-purple-300 shadow-sm shadow-purple-200/60 dark:shadow-gray-700/60 backdrop-blur hover:bg-white/90 dark:hover:bg-gray-800/90 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {user ? (
            <div className="relative z-50">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 rounded-full bg-white/60 dark:bg-gray-800/60 px-4 py-2 text-sm text-purple-700 dark:text-purple-300 shadow-sm shadow-purple-200/60 dark:shadow-gray-700/60 backdrop-blur hover:bg-white/90 dark:hover:bg-gray-800/90"
              >
                <span>{user.username}</span>
                <img src={UserIcon} className="h-5 w-5" alt="User profile" />
              </button>

              {showProfile && (
                <div className="absolute right-0 z-50 mt-3 w-64 rounded-2xl bg-white dark:bg-gray-800 p-5 shadow-xl shadow-purple-200/80 dark:shadow-gray-900/80 border border-purple-100/50 dark:border-gray-700/50">
                  <p className="mb-1 text-sm font-medium text-purple-900 dark:text-purple-100">
                    {user.username}
                  </p>
                  <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">{user.email}</p>

                  <PrimaryButton className="w-full" onClick={logout}>
                    Logout
                  </PrimaryButton>
                </div>
              )}
            </div>
          ) : (
            <PrimaryButton
              onClick={() => {
                setIsRegister(false)
                authRef.current?.scrollIntoView({ behavior: "smooth" })
              }}
              className="text-xs md:text-sm"
            >
              Start as Guest
            </PrimaryButton>
          )}
        </div>
      </header>

      {/* ================= HERO / CINEMATIC STRIP ================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        style={{ y: heroY }}
        className="mx-auto mt-4 max-w-6xl px-4 pb-6 sm:mt-10 sm:px-6"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#fdf3ea] via-[#f8ecff] to-[#e8f1ff] dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 shadow-xl shadow-purple-200/60 dark:shadow-gray-900/60">
          {/* Background image / texture */}
          <div className="absolute inset-0 opacity-70">
            <img
              src="/images/hero-street.jpg"
              alt="Calm sunrise street background"
              className="h-full w-full object-cover"
            />
          </div>

          {/* White accent bar like the reference */}
          <div className="relative z-10 mx-auto mt-6 h-1 w-4/5 rounded-full bg-white/90 dark:bg-white/30 sm:mt-8" />

          {/* Centered headline */}
          <div className="relative z-10 px-6 py-10 text-center sm:px-10 sm:py-14 md:py-16">
            <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/80 dark:text-white/90 sm:text-xs">
              YOUR NEXT
            </p>
            <h1 className="mx-auto max-w-3xl text-3xl font-serif tracking-[0.12em] text-white drop-shadow-md dark:drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
              AFFIRMATION
              <span className="block text-[0.8em] font-light tracking-[0.25em]">
                SERVICE EXPERIENCE
              </span>
            </h1>
          </div>

          {/* Floating quote card overlapping bottom like a call‑to‑action */}
          <motion.div
            style={{ y: quoteY }}
            className="relative z-20 -mb-10 flex justify-center pb-6 sm:-mb-12 sm:pb-10"
          >
            <GlassCard
              variant="transparent"
              className="relative w-full max-w-xl overflow-hidden"
            >
              <div className="pointer-events-none absolute -top-6 right-0 h-24 w-24 rounded-full bg-purple-100/70 dark:bg-purple-900/50 blur-2xl" />

              <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-purple-300 dark:text-purple-400 sm:mb-6 sm:text-xs">
                Today&apos;s focus
              </p>
              <p className="text-base leading-relaxed text-purple-50 dark:text-purple-100 drop-shadow dark:drop-shadow-lg sm:text-lg md:text-xl">
                "{quote}"
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <IconButton
                  icon={ReloadIcon}
                  onClick={() => router.reload({ only: ["quote"] })}
                  variant="subtle"
                >
                  New Quote
                </IconButton>

                <IconButton icon={HeartIcon} onClick={handleLike}>
                  Save to Favorites
                </IconButton>

                <IconButton
                  icon={CopyIcon}
                  onClick={() => navigator.clipboard.writeText(quote)}
                >
                  Copy
                </IconButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= STORY STRIP ================= */}
      <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <motion.div
          className="grid gap-6 rounded-3xl bg-white/40 dark:bg-gray-800/40 p-6 shadow-md shadow-purple-100/70 dark:shadow-gray-900/70 backdrop-blur sm:gap-8 sm:p-8 md:grid-cols-2"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-300 dark:text-purple-400 sm:text-sm">
              Why we exist
            </p>
            <motion.p
              className="mt-3 text-xl font-serif font-light leading-snug text-purple-900 dark:text-purple-100 sm:mt-4 sm:text-2xl md:text-3xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Inspirely is a{" "}
              <span className="underline decoration-purple-300 dark:decoration-purple-400 decoration-2 underline-offset-4">
                daily ritual
              </span>{" "}
              for people who want gentle encouragement without the noise.
            </motion.p>
          </div>
          <motion.p
            className="self-end text-sm leading-relaxed text-purple-700/85 dark:text-purple-300/85 sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Instead of endless scrolling, you step into a focused space—soft colors,
            slow motion, and thoughtful words. Every interaction is designed to feel
            intentional: one tap to refresh, one tap to save, one tap to return to the
            words that have carried you this far.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= ABOUT US ================= */}
      <section className="mx-auto mt-20 max-w-4xl px-4 text-center sm:mt-24 sm:px-6">
        <SectionTitle eyebrow="Behind the experience" label="ABOUT&nbsp;US" />

        <p className="text-base leading-relaxed text-purple-800/90 dark:text-purple-200/90">
          Inspirely is your quiet corner of the internet—built for students, dreamers,
          and builders who need a small reminder to keep going. We draw from timeless
          thinkers and modern voices to weave a library of words that feel like a friend
          checking in on you.
        </p>
      </section>

      {/* ================= LIKED ================= */}
      <motion.section
        className="mx-auto mt-20 max-w-4xl px-4 sm:mt-24 sm:px-6"
        style={{ y: likedY }}
      >
        <SectionTitle eyebrow="Your personal constellation" label="LIKED QUOTES" />

        <GlassCard className="bg-white/70 dark:bg-gray-800/70">
          {likedQuotes.length === 0 ? (
            <p className="text-sm text-purple-400 dark:text-purple-500">
              You haven&apos;t saved anything yet. Tap the heart on a quote that feels like
              yours—that&apos;s where your story begins.
            </p>
          ) : (
            <div className="max-h-80 space-y-3 overflow-y-auto pr-1 sm:max-h-96">
              {likedQuotes.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white/80 dark:bg-gray-700/80 px-4 py-3 text-sm shadow-sm"
                >
                  {editingId === item.id ? (
                    <input
                      value={editedQuote}
                      onChange={e => setEditedQuote(e.target.value)}
                      className="flex-1 border-b border-purple-200 dark:border-purple-600 bg-transparent text-purple-900 dark:text-purple-100 focus:outline-none focus:border-purple-400 dark:focus:border-purple-500"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1 text-purple-900 dark:text-purple-100">{item.quote}</span>
                  )}

                  <div className="flex items-center gap-2">
                    {editingId === item.id ? (
                      <button
                        onClick={() => updateLike(item.id)}
                        className="rounded-full bg-purple-50 dark:bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/70"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(item.id)
                          setEditedQuote(item.quote)
                        }}
                        className="rounded-full bg-purple-50 dark:bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/70"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => removeLike(item.id)}
                      className="rounded-full bg-red-50 dark:bg-red-900/50 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/70"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </motion.section>

      {/* ================= AUTH ================= */}
      {!user && (
        <motion.section
          ref={authRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 flex max-w-4xl justify-center px-4 pb-20 sm:mt-24 sm:px-6 sm:pb-24"
        >
          <GlassCard className="w-full max-w-sm bg-white/80 dark:bg-gray-800/80 text-center">
            <img src={Logo} className="mx-auto mb-4 h-16" alt="Inspirely badge" />
            <h3 className="text-lg font-medium text-purple-900 dark:text-purple-100">
              {isRegister ? "Join inspirely" : "Welcome back"}
            </h3>

            <p className="mb-6 text-sm text-purple-500 dark:text-purple-400">
              {isRegister
                ? "Create an account so your favorite words always find their way back to you."
                : "Sign in to unlock saved quotes and a more personal ritual."}
            </p>

            {/* Username */}
            <div className="relative mb-1">
              <img
                src={UserIcon}
                className="absolute left-4 top-3 h-4 opacity-50"
                alt=""
              />
              <input
                value={form.data.username}
                onChange={e => form.setData("username", e.target.value)}
                className="w-full rounded-full border border-purple-100 dark:border-purple-700 bg-white/70 dark:bg-gray-700/70 px-10 py-2 text-sm text-purple-900 dark:text-purple-100 shadow-sm placeholder:text-purple-300 dark:placeholder:text-purple-500 focus:border-purple-300 dark:focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-600"
                placeholder="Enter username"
              />
            </div>
            {form.errors.username && (
              <p className="mb-2 text-xs text-red-500 dark:text-red-400">{form.errors.username}</p>
            )}

            {/* Email */}
            {isRegister && (
              <>
                <div className="relative mb-1">
                  <img
                    src={MailIcon}
                    className="absolute left-4 top-3 h-4 opacity-50"
                    alt=""
                  />
                  <input
                    value={form.data.email}
                    onChange={e => form.setData("email", e.target.value)}
                    className="w-full rounded-full border border-purple-100 dark:border-purple-700 bg-white/70 dark:bg-gray-700/70 px-10 py-2 text-sm text-purple-900 dark:text-purple-100 shadow-sm placeholder:text-purple-300 dark:placeholder:text-purple-500 focus:border-purple-300 dark:focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-600"
                    placeholder="Enter email"
                  />
                </div>
                {form.errors.email && (
                  <p className="mb-2 text-xs text-red-500 dark:text-red-400">{form.errors.email}</p>
                )}
              </>
            )}

            {/* Password */}
            <div className="relative mb-1">
              <img
                src={LockIcon}
                className="absolute left-4 top-3 h-4 opacity-50"
                alt=""
              />
              <input
                type="password"
                value={form.data.password}
                onChange={e => form.setData("password", e.target.value)}
                className="w-full rounded-full border border-purple-100 dark:border-purple-700 bg-white/70 dark:bg-gray-700/70 px-10 py-2 text-sm text-purple-900 dark:text-purple-100 shadow-sm placeholder:text-purple-300 dark:placeholder:text-purple-500 focus:border-purple-300 dark:focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-600"
                placeholder="Enter password"
              />
            </div>
            {form.errors.password && (
              <p className="mb-2 text-xs text-red-500 dark:text-red-400">{form.errors.password}</p>
            )}

            {/* Confirm password */}
            {isRegister && (
              <div className="relative mb-3">
                <img
                  src={LockIcon}
                  className="absolute left-4 top-3 h-4 opacity-50"
                  alt=""
                />
                <input
                  type="password"
                  value={form.data.password_confirmation}
                  onChange={e =>
                    form.setData("password_confirmation", e.target.value)
                  }
                  className="w-full rounded-full border border-purple-100 dark:border-purple-700 bg-white/70 dark:bg-gray-700/70 px-10 py-2 text-sm text-purple-900 dark:text-purple-100 shadow-sm placeholder:text-purple-300 dark:placeholder:text-purple-500 focus:border-purple-300 dark:focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-600"
                  placeholder="Confirm password"
                />
              </div>
            )}

            <PrimaryButton onClick={submitAuth} className="mt-1 w-full">
              {isRegister ? "Sign up" : "Sign in"}
            </PrimaryButton>

            <p className="mt-4 text-xs text-purple-500 dark:text-purple-400">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className="font-medium text-purple-700 dark:text-purple-300 underline underline-offset-2 hover:text-purple-900 dark:hover:text-purple-200"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className="font-medium text-purple-700 dark:text-purple-300 underline underline-offset-2 hover:text-purple-900 dark:hover:text-purple-200"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </GlassCard>
        </motion.section>
      )}

      {/* ================= FOOTER ================= */}
      <Footer />
    </PageShell>
  )
}
