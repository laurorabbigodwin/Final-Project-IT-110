import { useForm } from "@inertiajs/react";

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-96 space-y-4">
        <h1 className="text-xl font-semibold">Register</h1>

        <input
          placeholder="Username"
          className="w-full border p-2"
          onChange={e => setData("username", e.target.value)}
        />

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

        {Object.values(errors).map((err, i) => (
          <div key={i} className="text-red-500 text-sm">
            {err}
          </div>
        ))}

        <button
          disabled={processing}
          className="w-full bg-purple-500 text-white p-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}
