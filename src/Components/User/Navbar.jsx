// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react'; // Using Lucide for icons

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // New state for a potential dropdown

  const handleClick = () => {
    setOpen(false);
    setDropdownOpen(false); // Close dropdown on link click
  };

  // Toggles the mobile menu open/closed
  const toggleMenu = () => setOpen(!open);

  // Toggles the profile dropdown open/closed
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Common link styling for desktop
  const desktopLinkClasses = 'hover:text-blue-200 transition duration-300 relative group';

  // Common button styling
  const buttonClasses = 'px-4 py-1.5 rounded-full font-medium transition duration-300 text-sm';

  return (
    <nav className='w-full bg-blue-800 text-white shadow-xl sticky top-0 z-50'> {/* Darker blue, stronger shadow, sticky */}
      <div className='max-w-7xl mx-auto px-6 lg:px-8 py-3 flex justify-between items-center'>
        {/* Logo */}
        <Link to='/' className='text-3xl font-extrabold tracking-wider hover:text-blue-300 transition duration-300'>
          {/* Using a subtle hover effect on the logo */}
          Automobile
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-10 text-lg items-center'>
          {/* Navigation Links */}
          <li className={desktopLinkClasses}>
            <Link to='/' onClick={handleClick}>
              Home
            </Link>
            <span className='absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
          </li>

          <li className={desktopLinkClasses}>
            <Link to='/importdata' onClick={handleClick}>
              Directory
            </Link>
             <span className='absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
          </li>

          <li className={desktopLinkClasses}>
            <Link to='/contact' onClick={handleClick}>
              Contact
            </Link>
             <span className='absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
          </li>

          {/* Login/Profile Section with Dropdown Potential */}
          <li className='relative flex items-center gap-3'>
            <Link
              to='/login'
              className={`${buttonClasses} bg-white text-blue-800 hover:bg-gray-100`}
              onClick={handleClick}
            >
              Login
            </Link>
            
            <div className='relative'>
              <button
                onClick={toggleDropdown}
                className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-500 flex items-center`}
              >
                Profile <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white text-blue-800 rounded-lg shadow-lg py-1 z-20'>
                  <Link
                    to='/profilepage'
                    onClick={handleClick}
                    className='block px-4 py-2 hover:bg-gray-100'
                  >
                    View Profile
                  </Link>
                  {/* Example: You can add more profile-related links here */}
                  <div className='border-t border-gray-100 my-1'></div>
                  <button
                    onClick={() => {handleClick(); /* Add actual logout logic */}}
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
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? (
            <X className='w-7 h-7' /> // 'X' icon from Lucide
          ) : (
            <Menu className='w-7 h-7' /> // 'Menu' icon from Lucide
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {/* Added transition for smoother open/close effect */}
      <ul className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-screen' : 'max-h-0'}`}>
        <div className='bg-blue-700 px-6 pb-4 space-y-4 text-lg border-t border-blue-600'>
          {/* Navigation Links */}
          <li onClick={handleClick}>
            <Link className='block py-2 hover:bg-blue-600 rounded-md transition duration-200' to='/'>
              Home
            </Link>
          </li>

          <li onClick={handleClick}>
            <Link className='block py-2 hover:bg-blue-600 rounded-md transition duration-200' to='/importdata'>
              Directory
            </Link>
          </li>

          <li onClick={handleClick}>
            <Link className='block py-2 hover:bg-blue-600 rounded-md transition duration-200' to='/contact'>
              Contact
            </Link>
          </li>

          {/* Buttons for Mobile */}
          <li className='pt-2 flex flex-col gap-3'>
            <Link
              className={`${buttonClasses} bg-white text-blue-800 hover:bg-gray-100 text-center`}
              to='/login'
              onClick={handleClick}
            >
              Login
            </Link>
             <Link
              className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-500 text-center`}
              to='/profilepage'
              onClick={handleClick}
            >
              Profile
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}