import { useState } from "react";

// Mock data for employer
const employees = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    rating: 4.5,
    blacklisted: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Product Manager",
    rating: 3.8,
    blacklisted: false,
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "UX Designer",
    rating: 2.9,
    blacklisted: true,
  },
];

// Mock data for employee
const employeeProfile = {
  name: "John Doe",
  role: "Software Engineer",
  ratings: [5, 4, 4, 5, 3],
  notifications: [
    "Your latest performance review has been updated.",
    "A new company policy has been published.",
    "Your verification request has been approved.",
  ],
};

function EmployerDashboard() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>

      <h2 className="text-xl font-semibold mb-2">Employee List</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Blacklist Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.role}</td>
                <td className="p-3">{emp.rating} ⭐</td>
                <td className="p-3">
                  {emp.blacklisted ? (
                    <span className="text-red-600 font-bold">Blacklisted</span>
                  ) : (
                    <span className="text-green-600 font-bold">Active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployeeDashboard() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Profile Overview</h2>
        <p className="text-gray-700">Name: {employeeProfile.name}</p>
        <p className="text-gray-700">Role: {employeeProfile.role}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Performance Ratings</h2>
        <p className="text-gray-700">
          Recent Ratings: {employeeProfile.ratings.join(", ")} ⭐
        </p>
        <p className="text-gray-700">
          Average Rating:{" "}
          {(
            employeeProfile.ratings.reduce((a, b) => a + b, 0) /
            employeeProfile.ratings.length
          ).toFixed(1)}{" "}
          ⭐
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Notifications</h2>
        <ul className="list-disc list-inside text-gray-700">
          {employeeProfile.notifications.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function App() {
  const [role, setRole] = useState("employer");

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">VeriRate Platform</h1>
        <div>
          <label htmlFor="roleSelect" className="mr-2">
            Select Role:
          </label>
          <select
            id="roleSelect"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-black p-1 rounded"
          >
            <option value="employer">Employer</option>
            <option value="employee">Employee</option>
          </select>
        </div>
      </header>
      <main className="p-6">
        {role === "employer" ? <EmployerDashboard /> : <EmployeeDashboard />}
      </main>
    </div>
  );
}

export default App;
