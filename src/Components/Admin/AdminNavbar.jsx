// src/components/AdminNavbar.jsx
import React, { useState } from "react";
import { Menu, Bell, User } from "lucide-react";

export default function AdminNavbar({ toggleSidebar }) {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden bg-blue-700 text-white p-2 rounded-lg"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-2xl font-bold text-blue-700">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer text-gray-700 hover:text-blue-700" size={22} />
        <User className="cursor-pointer text-gray-700 hover:text-blue-700" size={22} />
      </div>
    </nav>
  );
}
