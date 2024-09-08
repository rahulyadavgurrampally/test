"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../supabase'; 
import { useSearchParams} from 'next/navigation';

export default function EmployeePage() {
  const [jobDuties, setJobDuties] = useState([]);
  const [understandDuties, setUnderstandDuties] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const empcode = searchParams.get('id');
  console.log(empcode);

  useEffect(() => {
    const fetchJobDuties = async () => {
      if (!empcode) return;
      
      const res = await fetch(`/api/auth/jobDuties?employeeId=${empcode}`, {
        method: 'GET', 
      });

      const data = await res.json();

      console.log('Job Duties:', data);

      if (res.status === 200) {
        setJobDuties(data.jobDuties);
      } else {
        console.error('Error fetching job duties:', data.error);
      }

      setLoading(false);
    };

    fetchJobDuties();
  }, [empcode]);

  const handleUnderstandDuties = (response) => {
    setUnderstandDuties(response);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Leadership System</h1>
        <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded mb-6">
          Welcome, Employee {empcode}
        </button>
        <h2 className="text-xl mb-4">Today's Job Duties</h2>
        {loading ? (
          <p>Loading job duties...</p>
        ) : (
          <ul className="mb-6">
            {jobDuties.length > 0 ? (
              jobDuties.map((duty, index) => (
                <li key={index} className="bg-gray-700 p-2 rounded mb-2 border border-orange-500">
                  {duty.duty} (Frequency: {duty.frequency}, Measurement: {duty.measurement})
                </li>
              ))
            ) : (
              <p>No job duties assigned for today.</p>
            )}
          </ul>
        )}
        {jobDuties.length>0 &&(
          <><h2 className="text-lg mb-4">Do you understand your duties required for today?</h2><div className="flex justify-center space-x-4">
            <button
              onClick={() => handleUnderstandDuties(true)}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => handleUnderstandDuties(false)}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              No
            </button>
          </div></>
        )}
        {understandDuties !== null && (
          <p className="mt-4">
            {understandDuties ? "You have acknowledged your duties." : "Please review your duties again."}
          </p>
        )}
      </div>
      {jobDuties.length > 0 && understandDuties !== null && (
      <Link href={{ pathname: "/Submit", query: { id:empcode } }}>
        <button className="bg-orange-600 mt-4 text-white py-2 px-4 rounded hover:bg-orange-700">
          Submit
        </button>
      </Link>
      )
      }

    </div>
  );
}
