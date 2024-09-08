"use client";

import { useState } from 'react';
import { supabase } from '../supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
      alert("Login successful!");
  
      // Assuming the API returns the user role and ID in the response
      const { role, employeeID, managerCode } = data;
  
      // Redirect based on the role
      if (role === 'manager') {
        router.push(`/Manager?id=${managerCode}`);
      } else if (role === 'employee') {
        router.push(`/Employee?id=${employeeID}`);
      } else {
        router.push('/defaultDashboard');
      }
    } else {
      // Handle error
      alert(data.error || "Login failed. Please try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
