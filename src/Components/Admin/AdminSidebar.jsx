// src/components/AdminSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileSpreadsheet, X } from 'lucide-react';
import { Menu } from 'lucide-react';

export default function AdminSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    {
      id: '/admin/dashboard',
      label: 'Dashboard',
      icon: <Home size={20} />,
    },
    {
      id: '/admin/importexcel',
      label: 'Import Excel',
      icon: <FileSpreadsheet size={20} />,
    },
    {
      id: '/admin/contactmaster',
      label: 'Contact Master',
      icon: <FileSpreadsheet size={20} />,
    },
    {
      id: '/admin/infomaster',
      label: 'Info Master',
      icon: <FileSpreadsheet size={20} />,
    },
  ];
  const handleLinkClick = (itemId) => {
    setActive(itemId);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    console.log(sidebarVisible);
  }, [sidebarVisible]);

  return (
    <div className='flex'>
      {sidebarVisible ? (
        <div
          className={`   fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white min-h-screen p-6
        shadow-2xl z-50 transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 md:shadow-lg md:w-64 md:z-auto
        ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
        >
          {/* Header */}
          <div className='flex items-center justify-between mb-8 pb-6 border-b border-blue-700/50'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg'>
                <span className='text-white font-black text-xl'>
                  A
                </span>
              </div>
              <div>
                <h2 className='text-2xl font-black tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
                  Admin Panel
                </h2>
                <p className='text-xs text-blue-200 font-medium'>
                  Management System
                </p>
              </div>
            </div>

            {/* Close button - mobile only */}
            <button
              className='p-2 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 md:hidden hover:scale-110'
              onClick={toggleSidebar}
              aria-label='Close sidebar'
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className='flex flex-col space-y-2 flex-1'>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden
              hover:bg-white/20 hover:shadow-xl hover:scale-[1.02] backdrop-blur-sm border-2 border-transparent
              ${
                active === item.id
                  ? 'bg-white/30 shadow-2xl border-white/30 font-bold text-white scale-105'
                  : 'hover:border-white/30'
              }`}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 group-hover:scale-110 flex-shrink-0 ${
                    active === item.id
                      ? 'bg-white/20 shadow-lg'
                      : 'bg-white/10 group-hover:bg-white/20'
                  }`}
                >
                  {item.icon}
                </div>
                <span className='text-lg font-semibold tracking-wide flex-1'>
                  {item.label}
                </span>

                {/* Active indicator */}
                {active === item.id && (
                  <div className='absolute right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse' />
                )}
              </Link>
            ))}
          </nav>
        </div>
      ) : (
        <></>
      )}

      <div>
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className='flex mt-[30px] items-center gap-2 px-4 py-4 bg-gradient-to-b from-blue-900 to-blue-800 text-white rounded-r-lg hover:bg-blue-700 transition-colors shadow-md'
        >
          <Menu size={20} />
          <span className='font-medium'>Menu</span>
        </button>
      </div>
    </div>
  );
}
