import { router, usePage } from "@inertiajs/react";

export default function Home({ quote, likedQuotes }) {
  const { auth } = usePage().props;

  const likeQuote = () => {
    if (!auth.user) {
      alert("Please sign in to like quotes.");
      return;
    }

    router.post("/like", { quote });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-8">

      <header className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-purple-400">
          inspirely
        </h1>

        {auth.user && (
          <span className="text-sm text-gray-600">
            {auth.user.username}
          </span>
        )}
      </header>

      <section className="text-center mt-10">
        <h2 className="text-4xl font-light text-purple-300 tracking-wide">
          INSPIRELY
        </h2>
        <p className="italic text-gray-400">
          Small words, big impact.
        </p>
      </section>

      <div className="mt-10 bg-purple-100 h-48 rounded-xl shadow flex items-center justify-center text-center px-6">
        <p className="text-lg italic text-purple-700">
          “{quote}”
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
        <button onClick={() => location.reload()}>New Quote</button>
        <button onClick={likeQuote}>Like</button>
        <button onClick={() => navigator.clipboard.writeText(quote)}>
          Copy
        </button>
      </div>

      <section className="mt-14">
        <h3 className="text-center text-purple-300 text-xl">
          Liked
        </h3>

        {likedQuotes.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-4">
            No liked quotes yet.
          </p>
        )}

        {likedQuotes.map(item => (
          <div
            key={item.id}
            className="bg-purple-100 rounded-lg p-4 mt-4 flex justify-between"
          >
            <p>{item.quote}</p>

            <button
              className="text-red-400"
              onClick={() => router.delete(`/like/${item.id}`)}
            >
              ✕
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
