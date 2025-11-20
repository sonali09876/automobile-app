
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-gray-100">
      

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="w-64 bg-blue-800 text-white min-h-screen p-5 absolute left-0 top-0">
            <button
              onClick={() => setOpen(false)}
              className="text-white float-right text-xl"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
            {/* Add same links here if needed */}
          </div>
        </div>
      )}

      <div className="flex-1">
       

        {/* Page Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome Admin</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 shadow-xl rounded-xl">
              <h3 className="text-lg font-semibold">Users</h3>
              <p className="text-gray-600 mt-2">Total: 120</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl">
              <h3 className="text-lg font-semibold">Orders</h3>
              <p className="text-gray-600 mt-2">Total: 45</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl">
              <h3 className="text-lg font-semibold">Revenue</h3>
              <p className="text-gray-600 mt-2">₹56,000</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl">
              <h3 className="text-lg font-semibold">Pending Tasks</h3>
              <p className="text-gray-600 mt-2">8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
