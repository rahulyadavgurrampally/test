"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ManagerDashboard() {
  const searchParams = useSearchParams();
  const empcode = searchParams.get("id");
  console.log(empcode);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/mobile.png"
          alt="Leadership System Logo"
          width={200}
          height={200}
        />
        <h1 className="text-3xl font-bold mt-4">LEADERSHIP SYSTEM</h1>
        <div className="flex flex-col mt-6 space-y-4">
          <Link href={{ pathname: "/MDashboard", query: { id: empcode } }}>
            <button className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">
              Manager Dashboard
            </button>
          </Link>
          <Link href={{ pathname: "/Dashboard", query: { id: empcode } }}>
            <button className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">
              Add Employee Duties
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
