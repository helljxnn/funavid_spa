import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdPeople,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';
import { RiServiceLine } from "react-icons/ri";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import logo from '../assets/Logo.png';
import { motion, AnimatePresence } from 'framer-motion';


export default function Sidebar() {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: MdDashboard,
      type: 'single'
    },
    { 
      name: 'Usuarios', 
      icon: MdPeople,
      type: 'parent',
      subItems: [
        { 
          name: 'Empleados', 
          path: '/employees', 
          icon: FaPersonBreastfeeding 
        },
        { 
          name: 'Clientes', 
          path: '/clients', 
          icon: MdPeople 
        }
      ]
    },
    { 
      name: 'Donaciones', 
      path: '/donations', 
      icon: RiServiceLine,
      type: 'single'
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 w-64 space-y-2 py-6 px-4 border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8 p-4"> 
        <Link to="/dashboard" className="flex items-center justify-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-24 w-auto"
          />
        </Link>
      </div>

      {/* Menú de navegación */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <div key={item.name} className="overflow-hidden">
            {item.type === 'single' ? (
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-[#4285F4] text-white' 
                    : 'text-gray-600 hover:bg-gray-100' 
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ) : (
              <>
                <div
                  onClick={() => toggleMenu(item.name)}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                    expandedMenu === item.name || 
                    item.subItems.some(subItem => location.pathname === subItem.path)
                      ? 'bg-[#4285F4] text-white' 
                      : 'text-gray-600 hover:bg-gray-100' 
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {expandedMenu === item.name ? (
                    <MdKeyboardArrowUp className="w-5 h-5" />
                  ) : (
                    <MdKeyboardArrowDown className="w-5 h-5" />
                  )}
                </div>

                <AnimatePresence>
                  {expandedMenu === item.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-8 mt-1 space-y-2"
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                            location.pathname === subItem.path
                              ? 'bg-blue-100 text-[#4285F4]' 
                              : 'text-gray-600 hover:bg-gray-50' 
                          }`}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{subItem.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}