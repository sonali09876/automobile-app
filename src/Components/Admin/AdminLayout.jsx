import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-grow">
        <AdminNavbar />
        <main className="p-4 flex-grow bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
