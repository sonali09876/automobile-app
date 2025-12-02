// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false); 
  const [logoutSuccess, setLogoutSuccess] = useState(false); // 🔴 NEW STATE FOR SUCCESS POPUP

  const handleClick = () => {
    setOpen(false);
    setDropdownOpen(false);
  };

  const toggleMenu = () => setOpen(!open);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const desktopLinkClasses = 'hover:text-blue-200 transition duration-300 relative group';
  const buttonClasses = 'px-4 py-1.5 rounded-full font-medium transition duration-300 text-sm';

  return (
    <nav className='w-full bg-blue-800 text-white shadow-xl sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8 py-3 flex justify-between items-center'>
        
        {/* Logo */}
        <Link to='/' className='text-3xl font-extrabold tracking-wider hover:text-blue-300 transition duration-300'>
          Automobile
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-10 text-lg items-center'>
          <li className={desktopLinkClasses}>
            <Link to='/' onClick={handleClick}>Home</Link>
            <span className='absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
          </li>

          <li className={desktopLinkClasses}>
            <Link to='/importdata' onClick={handleClick}>Directory</Link>
            <span className='absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
          </li>

          <li className={desktopLinkClasses}>
            <Link to='/contact' onClick={handleClick}>Contact</Link>
            <span className='absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
          </li>

          {/* Profile Dropdown */}
          <li className='relative flex items-center gap-3'>
            <div className='relative'>
              <button
                onClick={toggleDropdown}
                className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-500 flex items-center`}
              >
                Profile
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>

              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white text-blue-800 rounded-lg shadow-lg py-1 z-20'>

                  <Link
                    to='/profilepage'
                    onClick={handleClick}
                    className='block px-4 py-2 hover:bg-gray-100'
                  >
                    View Profile
                  </Link>

                  <div className='border-t border-gray-100 my-1'></div>

                  {/* 🔴 OPEN LOGOUT POPUP */}
                  <button
                    onClick={() => setConfirmLogout(true)}
                    className='w-full text-left px-4 py-2 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden focus:outline-none p-1 rounded-md hover:bg-blue-700 transition duration-300'
          onClick={toggleMenu}
        >
          {open ? <X className='w-7 h-7' /> : <Menu className='w-7 h-7' />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <ul className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'}`}>
        <div className='bg-blue-700 px-6 pb-4 space-y-4 text-lg border-t border-blue-600'>

          <li onClick={handleClick}>
            <Link className='block py-2 hover:bg-blue-600 rounded-md' to='/'>Home</Link>
          </li>

          <li onClick={handleClick}>
            <Link className='block py-2 hover:bg-blue-600 rounded-md' to='/importdata'>Directory</Link>
          </li>

          <li onClick={handleClick}>
            <Link className='block py-2 hover:bg-blue-600 rounded-md' to='/contact'>Contact</Link>
          </li>

          <li className='pt-2 flex flex-col gap-3'>
            <Link className={`${buttonClasses} bg-white text-blue-800 text-center hover:bg-gray-100`} to='/login'>
              Login
            </Link>

            <Link className={`${buttonClasses} bg-blue-600 text-white text-center hover:bg-blue-500`} to='/profilepage'>
              Profile
            </Link>
          </li>

        </div>
      </ul>

      {/* 🔴 LOGOUT CONFIRMATION POPUP */}
      {confirmLogout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
          <div className="bg-white text-blue-900 rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold">Confirm Logout</h2>
            <p className="text-sm mt-2">Are you sure you want to logout?</p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setConfirmLogout(false)}
                className="px-4 py-1.5 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setConfirmLogout(false);
                  setLogoutSuccess(true); // 🔴 SHOW SUCCESS POPUP
                  handleClick();
                  console.log("Logged out");
                }}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 SUCCESS POPUP AFTER LOGOUT */}
      {logoutSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[999]">
          <div className="bg-white text-green-700 border border-green-400 rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold">Logout Successful</h2>
            <p className="text-sm mt-2">You have been logged out successfully.</p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setLogoutSuccess(false)}
                className="px-4 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}
