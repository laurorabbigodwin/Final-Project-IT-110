import { usePage, router } from "@inertiajs/react"

export default function Home({ quote }) {
  const { auth } = usePage().props
  const user = auth?.user

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-purple-600">

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <div className="font-semibold tracking-wide">inspirely</div>
        <div className="text-sm">{user ? user.username : "Guest"}</div>
      </header>

      {/* Hero */}
      <section className="text-center mt-10">
        <h1 className="text-6xl font-light tracking-widest">INSPIRELY</h1>
        <p className="italic text-purple-400 mt-2">
          Small words, big impact
        </p>
      </section>

      {/* Quote Card */}
      <section className="flex justify-center mt-16 px-6">
        <div className="w-full max-w-xl bg-purple-100 rounded-2xl shadow-md p-12 text-center">
          <p className="text-xl leading-relaxed">
            {quote}
          </p>

          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <button
              onClick={() => router.reload({ only: ["quote"] })}
              className="px-4 py-2 border rounded-full text-sm hover:bg-purple-200"
            >
              New Quote
            </button>
            <button className="px-4 py-2 border rounded-full text-sm">
              Like
            </button>
            <button className="px-4 py-2 border rounded-full text-sm">
              Copy
            </button>
            <button className="px-4 py-2 border rounded-full text-sm">
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Liked Section */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-light mb-6">Liked</h2>
        <div className="mx-auto w-full max-w-xl bg-purple-100 rounded-2xl h-40"></div>
      </section>

      {/* About */}
      <section className="mt-24 px-8 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-light mb-4">ABOUT US</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Inspirely is your daily companion for inspiration and motivation.
          We curate the most powerful quotes from history’s greatest minds
          to help you stay motivated, focused, and inspired throughout your journey.
        </p>
      </section>

      {/* Auth */}
      {!user && (
        <section className="mt-20 flex justify-center px-6 pb-20">
          <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm text-center">
            <h3 className="mb-4 font-medium">Welcome Back</h3>
            <p className="text-sm mb-6">Sign in to unlock features</p>

            <input
              className="w-full border rounded px-3 py-2 mb-3 text-sm"
              placeholder="Username"
            />
            <input
              className="w-full border rounded px-3 py-2 mb-4 text-sm"
              placeholder="Password"
              type="password"
            />

            <button className="w-full bg-purple-500 text-white py-2 rounded">
              Sign in
            </button>

            <p className="text-xs mt-4">
              Don’t have an account? <span className="underline">Sign up</span>
            </p>
          </div>
        </section>
      )}

    </div>
  )
}
