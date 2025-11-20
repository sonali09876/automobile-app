// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(false); // close mobile menu

  return (
    <nav className="w-full bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">Automobile</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg">
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/">Home</Link>
          </li>

          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/importdata">Import Data</Link>
          </li>

          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/products">Products</Link>
          </li>

          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <span className="text-3xl">&#10005;</span> // X icon
          ) : (
            <span className="text-3xl">&#9776;</span> // menu icon
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <ul className="md:hidden bg-blue-600 px-4 pb-4 space-y-3 text-lg">
          <li onClick={handleClick}>
            <Link className="hover:text-gray-300" to="/">Home</Link>
          </li>

          <li onClick={handleClick}>
            <Link className="hover:text-gray-300" to="/importdata">Import Data</Link>
          </li>

          <li onClick={handleClick}>
            <Link className="hover:text-gray-300" to="/products">Products</Link>
          </li>

          <li onClick={handleClick}>
            <Link className="hover:text-gray-300" to="/contact">Contact</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
