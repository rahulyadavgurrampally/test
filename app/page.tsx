"use client";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Leadership System</title>
      </Head>
      <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <div className="flex flex-col items-center text-center">
          <Image src="/mobile.png" alt="Leadership System Logo" width={200} height={200} />
          <h1 className="text-3xl font-bold mt-4">LEADERSHIP SYSTEM</h1>
          <p className="text-sm mt-1">VERSION 1.0</p>
          <p className="text-xl mt-6">Choose your Role Type</p>
          <div className="flex flex-col mt-6 space-y-4">
            <Link href={{ pathname: "/Register", query: { role: "employee" } }}>
              <button className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">EMPLOYEE</button>
            </Link>
            <Link href={{ pathname: "/Register", query: { role: "manager" } }}>
              <button className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">MANAGER</button>
            </Link>
          </div>
          <p className="mt-6 text-sm">
            Already have an account?{' '}
            <Link href="/Login">
              <span className="text-blue-400 underline hover:text-blue-500">Login Here</span>
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
