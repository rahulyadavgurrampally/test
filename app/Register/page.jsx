"use client";

import { useSearchParams } from 'next/navigation';
import { supabase } from '../supabase';
import EmployeeRegister from '../components/EmployeeRegister';
import ManagerRegister from '../components/ManagerRegister';

export default function Register() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  console.log(role);

  const handleRegister = async (email, password, role, name,employeeID,managerCode) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role, name,employeeID,managerCode }),
  });
  
  
    const data = await res.json();
  
    if (res.ok) {
      alert('Registration successful!');
      console.log(data.user);
    } else {
      alert(data.message);
      console.error('Error:', data.message);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {role === 'employee' && <EmployeeRegister onRegister={handleRegister} />}
      {role === 'manager' && <ManagerRegister onRegister={handleRegister} />}
    </div>
  );
}
