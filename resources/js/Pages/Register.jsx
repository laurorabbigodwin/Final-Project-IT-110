// import { useForm } from "@inertiajs/react";

// export default function Register() {
//   const { data, setData, post, processing, errors } = useForm({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const submit = e => {
//     e.preventDefault();
//     post("/register");
//   };

//   return (
//     <form
//       onSubmit={submit}
//       className="bg-white shadow-md rounded-xl p-6 w-80"
//     >
//       <h2 className="text-center font-semibold mb-4">
//         Join inspirely
//       </h2>

//       <input
//         className="w-full border p-2 mb-3"
//         placeholder="Username"
//         onChange={e => setData("username", e.target.value)}
//       />

//       <input
//         className="w-full border p-2 mb-3"
//         placeholder="Email"
//         onChange={e => setData("email", e.target.value)}
//       />

//       <input
//         type="password"
//         className="w-full border p-2 mb-3"
//         placeholder="Password"
//         onChange={e => setData("password", e.target.value)}
//       />

//       {Object.values(errors).map((err, i) => (
//         <p key={i} className="text-red-400 text-sm">
//           {err}
//         </p>
//       ))}

//       <button
//         disabled={processing}
//         className="w-full bg-purple-400 text-white py-2 rounded mt-3"
//       >
//         Sign Up
//       </button>
//     </form>
//   );
// }
