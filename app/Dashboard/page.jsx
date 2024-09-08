"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ManagerDashboard() {
  const [jobDuties, setJobDuties] = useState([
    { duty: "", frequency: "", measurement: "" },
  ]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const searchParams = useSearchParams();
  const code = searchParams.get("id");

  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/auth/employees");
        const data = await response.json();
        console.log("Employees:", data);
        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const addJobDuty = () => {
    setJobDuties([...jobDuties, { duty: "", frequency: "", measurement: "" }]);
  };

  const removeJobDuty = (index) => {
    setJobDuties(jobDuties.filter((_, i) => i !== index));
  };

  const handleSaveJobDuties = async () => {
    if (!selectedEmployee) {
      alert("Please select an employee.");
      return;
    }

    const jobDutiesToInsert = jobDuties.map((jobDuty) => ({
      ...jobDuty,
      employee_id: selectedEmployee,
      Date: new Date().toISOString(),
    }));

    try {
      const response = await fetch("/api/auth/jobDuties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDutiesToInsert),
      });

      if (!response.ok) {
        throw new Error("Failed to save job duties");
      }

      const data = await response.json();
      console.log("Job duties saved successfully:", data);
      alert("Job duties saved successfully!");
      setJobDuties([{ duty: "", frequency: "", measurement: "" }]); // Clear job duties after saving
      router.push(`/Manager?id=${code}`); // Redirect to Manager page with the code
    } catch (error) {
      console.error("Error saving job duties:", error);
      alert("Error saving job duties: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Manager Dashboard
        </h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="employee" className="mb-2">
            Select your Employee
          </label>
          <select
            id="employee"
            className="p-2 rounded bg-gray-700 border border-gray-600"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        {jobDuties.map((jobDuty, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={`duty-${index}`} className="mb-2">
                Define Job Duty #{index + 1}
              </label>
              {index > 0 && (
                <button
                  onClick={() => removeJobDuty(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="flex flex-col mb-2">
              <input
                type="text"
                id={`duty-${index}`}
                value={jobDuty.duty}
                onChange={(e) => {
                  const newJobDuties = [...jobDuties];
                  newJobDuties[index].duty = e.target.value;
                  setJobDuties(newJobDuties);
                }}
                className="p-2 rounded bg-gray-700 border border-gray-600"
                placeholder="Make 30 outbound calls"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor={`frequency-${index}`} className="mb-2">
                Frequency of Job Duty #{index + 1}
              </label>
              <select
                id={`frequency-${index}`}
                value={jobDuty.frequency}
                onChange={(e) => {
                  const newJobDuties = [...jobDuties];
                  newJobDuties[index].frequency = e.target.value;
                  setJobDuties(newJobDuties);
                }}
                className="p-2 rounded bg-gray-700 border border-gray-600"
              >
                <option value="">Select Frequency</option>
                <option value="Every Work Day">Every Work Day</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor={`measurement-${index}`} className="mb-2">
                How do you measure Job Duty #{index + 1}
              </label>
              <input
                type="text"
                id={`measurement-${index}`}
                value={jobDuty.measurement}
                onChange={(e) => {
                  const newJobDuties = [...jobDuties];
                  newJobDuties[index].measurement = e.target.value;
                  setJobDuties(newJobDuties);
                }}
                className="p-2 rounded bg-gray-700 border border-gray-600"
                placeholder="Sales Logged In our CRM"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addJobDuty}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add another job duty
        </button>
        <button
          onClick={handleSaveJobDuties}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Save job duties
        </button>
      </div>
    </div>
  );
}
