import { useForm } from "@inertiajs/react";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-96 space-y-4">
        <h1 className="text-xl font-semibold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={e => setData("email", e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={e => setData("password", e.target.value)}
        />

        {errors.email && (
          <div className="text-red-500 text-sm">
            {errors.email}
          </div>
        )}

        <button
          disabled={processing}
          className="w-full bg-purple-500 text-white p-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
