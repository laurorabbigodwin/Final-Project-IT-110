import { useState, useRef } from "react"
import { usePage, router, useForm } from "@inertiajs/react"
import { motion } from "framer-motion"
import StarryBackground from "@/Components/StarryBackground"
// Images
import Logo from "@/components/logo.png"
import NameLogo from "@/components/namelogo.png"

import ReloadIcon from "@/components/reload.png"
import HeartIcon from "@/components/heart.png"
import CopyIcon from "@/components/copy.png"
import ShareIcon from "@/components/share.png"
import UserIcon from "@/components/user.png"
import LockIcon from "@/components/padlock.png"
import MailIcon from "@/components/mail.png"

export default function Home({ quote, likedQuotes = [] }) {git remote set-url origin https://github.com/laurorabbigodwin/IT-110.git

  const { auth } = usePage().props
  const user = auth?.user

  const [isRegister, setIsRegister] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const authRef = useRef(null)

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

  <div
  className="bg-[#FAF7F2] text-purple-700 overflow-x-hidden min-h-screen transition-all duration-500 relative"
  style={{ minHeight: likedQuotes.length > 0 ? "140vh" : "100vh" }}
>
  {/* ADD THIS LINE */}
  <StarryBackground />

  {/* ================= HEADER ================= */}
  <header className="flex justify-between items-center px-8 py-6 relative"></header>
  const removeLike = (id) => {
    router.delete(`/like/${id}`)
  }

  const logout = () => {
    router.post("/logout")
  }

  return (
    <div
      className="bg-[#FAF7F2] text-purple-700 overflow-x-hidden min-h-screen transition-all duration-500"
      style={{ minHeight: likedQuotes.length > 0 ? "140vh" : "100vh" }}
    >

      {/* ================= HEADER ================= */}
      <header className="flex justify-between items-center px-8 py-6 relative">
        <div className="flex items-center gap-3">
          <img src={Logo} className="h-20 w-20" />
          <span className="font-semibold tracking-wide italic">inspirely</span>
        </div>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"
            >
              <span>{user.username}</span>
              <img src={UserIcon} className="h-5 w-5" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl p-5 z-50">
                <p className="text-sm font-medium mb-1">{user.username}</p>
                <p className="text-xs text-gray-500 mb-4">{user.email}</p>

                <button
                  onClick={logout}
                  className="w-full bg-purple-300 text-purple-800 py-2 rounded-full text-sm hover:bg-purple-400 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              setIsRegister(false)
              authRef.current?.scrollIntoView({ behavior: "smooth" })
            }}
            className="text-sm opacity-70 hover:opacity-100 underline"
          >
            Guest
          </button>
        )}
      </header>

      {/* ================= HERO ================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12 px-6"
      >
        <img src={NameLogo} className="mx-auto h-40 mb-2" />
      </motion.section>


    {/* Content */}
    <div className="max-w-6xl px-12 mt-12 text-purple-300">
    <div className="ml-32">
    <h2 className="text-3xl md:text-5xl font-serif font-light leading-snug tracking-wide text-left">
        INSPIRELY IS A<br />
        SPACE WHERE<br />
        WORDS IGNITE<br />
        PURPOSE.
    </h2>
    </div>

    <div className="ml-auto max-w-3xl">
        <p className="mt-12 text-3xl md:text-5xl font-serif font-light leading-snug tracking-wide text-right">
        TO INSPIRE CONFIDENCE, ENCOURAGE GROWTH, AND
        UPLIFT MINDS. SIMPLE YET POWERFUL, EVERY QUOTE IS
        CREATED TO REMIND YOU TO BELIEVE, KEEP GOING,
        AND MOVE FORWARD WITH PURPOSE.
        </p>
    </div>
    </div>

      {/* ================= QUOTE CARD ================= */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex justify-center mt-20 px-6"
      >
        <div className="w-full max-w-xl bg-purple-100/80 rounded-2xl shadow-lg p-12 text-center">
          <p className="text-xl leading-relaxed">“{quote}”</p>

          <div className="flex justify-center gap-3 mt-10 flex-wrap">
            <button
              onClick={() => router.reload({ only: ["quote"] })}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border hover:bg-purple-200 transition"
            >
              <img src={ReloadIcon} className="h-4 w-4" />
              New Quote
            </button>

            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border hover:bg-purple-200 transition"
            >
              <img src={HeartIcon} className="h-4 w-4" />
              Like
            </button>

            <button
              onClick={() => navigator.clipboard.writeText(quote)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border hover:bg-purple-200 transition"
            >
              <img src={CopyIcon} className="h-4 w-4" />
              Copy
            </button>
          </div>
        </div>
      </motion.section>

      {/* ================= ABOUT US ================= */}
      <section className="mt-32 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-light tracking-[0.25em] text-purple-300 mb-6">ABOUT&nbsp;US</h2>


        <p className="text-base leading-relaxed text-gray-700">
          Inspirely is your daily companion for inspiration and motivation.
          We curate the most powerful quotes from history&apos;s greatest minds
          to help you stay motivated, focused, and inspired throughout your journey.
        </p>
      </section>

      {/* ================= LIKED ================= */}
      <section className="mt-24 text-center px-6">
        <h2 className="text-4xl font-serif font-light tracking-[0.25em] text-purple-300 mb-6">Liked</h2>


        <div className="mx-auto w-full max-w-xl bg-purple-100/60 rounded-2xl shadow-inner p-4 space-y-3">
          {likedQuotes.length === 0 && (
            <p className="text-sm text-gray-400">No liked quotes yet</p>
          )}

          {likedQuotes.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white/70 rounded-xl p-3 text-sm"
            >
              <span>{item.quote}</span>

              <button
                onClick={() => removeLike(item.id)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

{/* ================= AUTH ================= */}
      {!user && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 flex justify-center px-6 pb-24"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">

            <img src={Logo} className="h-30 mx-auto mb-3" />

            <h3 className="font-medium text-lg">
              {isRegister ? "Join inspirely" : "Welcome Back"}
            </h3>

            <p className="text-sm mb-6 text-gray-500">
              {isRegister ? "to be inspired!" : "Sign in to unlock features"}
            </p>

            {/* Username */}
            <div className="relative mb-1">
              <img src={UserIcon} className="absolute left-4 top-3 h-4 opacity-50" />
              <input
                value={form.data.username}
                onChange={e => form.setData("username", e.target.value)}
                className="w-full border rounded-full px-10 py-2 text-sm"
                placeholder="Enter username"
              />
            </div>
            {form.errors.username && (
              <p className="text-xs text-red-500 mb-2">{form.errors.username}</p>
            )}

            {/* Email */}
            {isRegister && (
              <>
                <div className="relative mb-1">
                  <img src={MailIcon} className="absolute left-4 top-3 h-4 opacity-50" />
                  <input
                    value={form.data.email}
                    onChange={e => form.setData("email", e.target.value)}
                    className="w-full border rounded-full px-10 py-2 text-sm"
                    placeholder="Enter email"
                  />
                </div>
                {form.errors.email && (
                  <p className="text-xs text-red-500 mb-2">{form.errors.email}</p>
                )}
              </>
            )}

            {/* Password */}
            <div className="relative mb-1">
              <img src={LockIcon} className="absolute left-4 top-3 h-4 opacity-50" />
              <input
                type="password"
                value={form.data.password}
                onChange={e => form.setData("password", e.target.value)}
                className="w-full border rounded-full px-10 py-2 text-sm"
                placeholder="Enter password"
              />
            </div>
            {form.errors.password && (
              <p className="text-xs text-red-500 mb-2">{form.errors.password}</p>
            )}

            {/* Confirm password */}
            {isRegister && (
              <div className="relative mb-3">
                <img src={LockIcon} className="absolute left-4 top-3 h-4 opacity-50" />
                <input
                  type="password"
                  value={form.data.password_confirmation}
                  onChange={e =>
                    form.setData("password_confirmation", e.target.value)
                  }
                  className="w-full border rounded-full px-10 py-2 text-sm"
                  placeholder="Confirm password"
                />
              </div>
            )}

            <button
              onClick={submitAuth}
              className="w-full bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600 transition"
            >
              {isRegister ? "Sign up" : "Sign in"}
            </button>

            <p className="text-xs mt-4 text-gray-500">
              {isRegister ? (
                <>Already have an account? <span onClick={() => setIsRegister(false)} className="underline cursor-pointer text-purple-700 hover:text-purple-900">Log in</span></>
              ) : (
                <>Don’t have an account? <span onClick={() => setIsRegister(true)} className="underline cursor-pointer text-purple-700 hover:text-purple-900">Sign up</span></>
              )}
            </p>

          </div>
        </motion.section>
      )}
    </div>
  )
}
