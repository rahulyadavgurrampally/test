import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManagerRegister({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [managerCode, setManagerCode] = useState("");

  const router = useRouter(); // Initialize useRouter hook

  const handleRegister = async () => {
    // Registration logic here
    onRegister(email, password, "manager", name, "", managerCode);
    setEmail("");
    setName("");
    setPassword("");
    setManagerCode("");
    router.push("/Login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-4xl font-bold mb-6 text-orange-600">
        Manager Register
      </h1>
      <div className="w-full mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
        />
      </div>
      <div className="w-full mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
        />
      </div>
      <div className="w-full mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
        />
      </div>
      <div className="w-full mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Manager Code
        </label>
        <input
          type="text"
          placeholder="Manager Code"
          value={managerCode}
          onChange={(e) => setManagerCode(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
        />
      </div>
      <button
        onClick={handleRegister}
        className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300"
      >
        Register
      </button>
    </div>
  );
}
