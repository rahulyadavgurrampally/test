"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../supabase";

const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [jobDuties, setJobDuties] = useState([]);
  const [profile, setProfile] = useState([]);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const searchParams = useSearchParams();
  const code = searchParams.get("id");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/auth/employees");
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        console.log("Employees data:", data); // Check the structure of the data
        setEmployees(data.employees || []); // Adjust based on actual data structure
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchJobDuties = async () => {
      try {
        const response = await fetch("/api/auth/jobduties");
        if (!response.ok) throw new Error("Failed to fetch job duties");
        const data = await response.json();
        console.log("Job Duties:", data);
        setJobDuties(data.jobDuties || []); // Ensure you use data.jobDuties if your API returns an object
      } catch (error) {
        console.error("Error fetching job duties:", error);
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/auth/manager?code=${code}`);
        if (!response.ok) throw new Error("Failed to fetch manager profile");
        const data = await response.json();
        console.log("profile data", data); // Use console.log instead of alert for debugging
        setProfile(data.profile); // Ensure you're setting profile correctly
      } catch (error) {
        console.error("Error fetching manager profile:", error);
      }
    };

    if (code) {
      fetchProfile();
      fetchEmployees();
      fetchJobDuties();
    }
  }, [code]);

  const navItems = [
    { name: "Dashboard", icon: "M9 5l7 7-7 7" },
    { name: "Insights", icon: "M8 12h8m-4 4v-8" },
    { name: "Transactions", icon: "M4 6h16M4 10h16m-7 4h7m-7 4h7" },
    {
      name: "Account",
      icon: "M5.5 5.5L12 12m0 0l6.5-6.5M12 12l-6.5 6.5M12 12l6.5 6.5",
    },
    {
      name: "Settings",
      icon: "M12 4.354v15.292M19.176 4.354A9.965 9.965 0 0012 2a9.965 9.965 0 00-7.176 2.354M5.924 19.646A9.965 9.965 0 0012 22a9.965 9.965 0 007.176-2.354M5.924 4.354L12 12l6.076-7.646",
    },
  ];

  const handleLinkClick = (linkName) => setActiveLink(linkName);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-8">
        <div className="flex flex-col items-center mb-8">
          <img src="./mobile.png" alt="Logo" className="h-12 mb-4" />
          <h1 className="text-xl font-bold">Leadership System</h1>
        </div>
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center p-2 rounded-2xl ${
                activeLink === item.name ? "bg-purple-700" : "hover:bg-gray-700"
              }`}
              onClick={() => handleLinkClick(item.name)}
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={item.icon}
                />
              </svg>
              {item.name}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{profile.name}'s Dashboard</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search here"
              className="bg-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-gray-800 p-2 rounded hover:bg-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7h18M3 11h18M3 15h18M3 19h18"
                />
              </svg>
            </button>
          </div>
        </header>

        <div className="flex flex-row space-x-8">
          {/* Left Side Content */}
          <section className="flex flex-col gap-8 mb-8  w-1/2">
            {/* Results Card */}
            <div className="bg-gray-800 p-4 rounded-3xl flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  Results for June 1, 2024
                </h3>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-yellow-400 mr-4">
                    76%
                  </span>
                </div>
                <span className="text-xl font-bold text-white">...</span>
              </div>
            </div>

            {/* Duties Card */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg flex-1">
              <div className="flex justify-between items-center mb-4 p-2">
                <h4 className="text-xl font-bold text-white">Duties</h4>
                <span className="text-white text-xl">...</span>
              </div>
              <ul className="space-y-4">
                {jobDuties.map((duty) => (
                  <li key={duty.id} className="flex justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Green Tick Mark */}
                      <div className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-white">✔️</span>
                      </div>
                      {/* Duty Name and Date */}
                      <div>
                        <p className="text-white font-medium">{duty.duty}</p>
                        <span className="text-gray-400 text-sm">
                          {new Date(duty.Date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col text-gray-400 text-sm">
                      <span className="text-white font-medium">Log in CRM</span>
                      <span>Measure</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Employees Card */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg flex-1">
              <h3 className="text-2xl font-bold mb-4">Employee List</h3>
              <div className="flex bg-gray-800 rounded-lg shadow-lg w-full p-4">
                <ul className="flex space-x-4 overflow-x-auto p-2">
                  {Array.isArray(employees) && employees.length > 0 ? (
                    employees.map((employee) => (
                      <li
                        key={employee.id}
                        className="flex flex-col items-center"
                      >
                        {/* Placeholder Avatar */}
                        <img
                          src={`https://ui-avatars.com/api/?background=random&name=${employee.name}&rounded=true`}
                          alt={employee.name}
                          className="w-12 h-12 rounded-full"
                        />
                        {/* Username */}
                        <span className="text-white font-medium text-center mt-2">
                          {employee.name}
                        </span>
                      </li>
                    ))
                  ) : (
                    <p>No employees found</p>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* Right Side Content */}
          <section className="flex flex-col gap-8  w-1/2">
            {/* Profile Card */}
            {profile && (
              <div className="bg-gray-800 p-4 rounded-3xl flex-1">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {profile.name}
                    </h3>
                    <p className="text-gray-400">{profile.email}</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400">Role: {profile.role}</span>
                  <span className="text-gray-400">Manager Code: {code}</span>
                </div>
              </div>
            )}

            {/* Performance Over Time Card */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg flex-1">
              <h4 className="text-xl font-bold text-white mb-4">
                Performance Over Time
              </h4>
              {[
                { label: "Today", value: "26%" },
                { label: "Yesterday", value: "30%" },
                { label: "Last Week", value: "35%" },
                { label: "MTD", value: "20%" },
                { label: "YTD", value: "15%" },
                { label: "App Compliance", value: "10%" },
                { label: "Clarity Reported", value: "5%" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between mb-2 text-gray-400"
                >
                  <span>{label}</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
            </div>

            {/* Add Employee Button */}
            <div className="flex justify-center mt-8">
              <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
                Add Employee
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
