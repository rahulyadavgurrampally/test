"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function EmployeeSubmitPage() {
  const [jobDuties, setJobDuties] = useState([]);
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [comments, setComments] = useState("");
  const searchParams = useSearchParams();
  const empcode = searchParams.get('id');

  const handleResultChange = (index, result) => {
    const newResults = [...results];
    newResults[index] = result;
    setResults(newResults);
  };

  const handleSubmit = async () => {
    console.log("Job Duties Results:", results);
    console.log("Comments:", comments);
    console.log("Employee ID:", empcode);
    alert("Submitting job duties...");

    try {
      const response = await fetch('/api/auth/jobDuties', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: empcode,
          comments: comments,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job duties');
      }

      const data = await response.json();
      console.log('Job duties updated successfully:', data);
      router.push(`/Employee?id=${empcode}`);
    } catch (error) {
      console.error('Error updating job duties:', error);
      alert('Error updating job duties: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Leadership System</h1>
        <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded mb-6">
          EMPLOYEE
        </button>
        <h2 className="text-xl mb-4">Submit Results from Today:</h2>
        <ul className="mb-6">
          {jobDuties.map((duty, index) => (
            <li key={duty.id} className="bg-gray-700 p-2 rounded mb-2 border border-orange-500 flex justify-between items-center">
              <span>{duty.duty}</span> {/* Render specific properties of job duty */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleResultChange(index, true)}
                  className={`bg-green-500 text-white font-bold py-1 px-2 rounded ${results[index] === true ? 'opacity-50' : ''}`}
                  disabled={results[index] === true}
                >
                  ✓
                </button>
                <button
                  onClick={() => handleResultChange(index, false)}
                  className={`bg-red-500 text-white font-bold py-1 px-2 rounded ${results[index] === false ? 'opacity-50' : ''}`}
                  disabled={results[index] === false}
                >
                  ✗
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-col mb-6">
          <label htmlFor="comments" className="mb-2">Comments:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="p-2 rounded bg-gray-700 border border-orange-500"
            rows="4"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
