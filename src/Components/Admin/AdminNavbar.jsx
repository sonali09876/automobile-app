import React, { useState } from "react";
import { Menu, ChevronDown, Search } from "lucide-react";

export default function AdminNavbar({ toggleSidebar }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogout = () => {
    setShowConfirm(true); // Show confirmation popup
  };

  const confirmLogout = () => {
    setShowConfirm(false); // Hide confirm popup
    setShowSuccess(true);  // Show success popup

    // OPTIONAL: redirect after delay
    // setTimeout(() => {
    //   window.location.href = "/login";
    // }, 2000);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-white/80 backdrop-blur-md shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100">
        {/* Left Section */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent truncate">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-500 font-medium">Welcome back, Admin!</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-700 rounded-2xl transition-all duration-200 font-medium">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xs">SA</span>
              </div>
              <span className="hidden sm:block">Super Admin</span>
              <ChevronDown size={18} className="transition-transform duration-200 group-hover:-rotate-180" />
            </button>

            {/* Profile Dropdown */}
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-gray-900">Super Admin</p>
                <p className="text-sm text-gray-500">admin@company.com</p>
              </div>

              <button
                className="block w-full text-left px-4 py-3 text-sm hover:bg-red-50 text-red-600 hover:text-red-700 font-medium transition-colors rounded-xl mx-1"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ======================= CONFIRM LOGOUT POPUP ======================= */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Are you sure?</h2>
            <p className="text-gray-500 mb-6">Do you really want to logout?</p>

            <div className="flex justify-center gap-4">
              <button
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= SUCCESS POPUP ======================= */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center animate-fadeIn">
            <h2 className="text-xl font-bold text-green-600 mb-3">Logout Successful</h2>
            <p className="text-gray-500 mb-4">You have been logged out.</p>

            <button
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
