import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileSpreadsheet, Box } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const menuItems = [
    { id: "/admin/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "/admin/importexcel", label: "Import Excel", icon: <FileSpreadsheet size={20} /> },
    { id: "/admin/productmaster", label: "Product Master", icon: <Box size={20} /> },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-6 hidden md:block shadow-lg">
      <h2 className="text-3xl font-extrabold mb-10 tracking-wide border-b border-blue-700 pb-4">
        Admin Panel
      </h2>

      <nav className="flex flex-col space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 text-lg cursor-pointer p-3 rounded-xl transition ${
              active === item.id ? "bg-blue-700 shadow-md font-semibold" : "hover:bg-blue-700"
            }`}
            title={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
