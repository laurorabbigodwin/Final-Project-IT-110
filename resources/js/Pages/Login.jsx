import { useForm } from "@inertiajs/react";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  const submit = e => {
    e.preventDefault();
    post("/login");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white shadow-md rounded-xl p-6 w-80"
    >
      <h2 className="text-center font-semibold mb-4">
        Welcome Back
      </h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Email"
        onChange={e => setData("email", e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2 mb-3"
        placeholder="Password"
        onChange={e => setData("password", e.target.value)}
      />

      {errors.email && (
        <p className="text-red-400 text-sm">{errors.email}</p>
      )}

      <button
        disabled={processing}
        className="w-full bg-purple-400 text-white py-2 rounded mt-3"
      >
        Sign In
      </button>
    </form>
  );
}
