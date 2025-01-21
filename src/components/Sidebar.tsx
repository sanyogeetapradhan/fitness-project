import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  LayoutDashboard, 
  Utensils, 
  Droplets, 
  Activity, 
  Users, 
  SmilePlus,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  User,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Utensils, label: 'Calorie Tracker', path: '/nutrition' },
    { icon: SmilePlus, label: 'Mood' , path: '/mood' },
    { icon: Users, label: 'Community', path: '/community' },

    { icon: Heart, label: 'Portion Estimator' , path: '/portion-estimator' },
    { icon: Droplets, label: 'Reminder System' , path: '/reminders' }
  ];

  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '5rem' }
  };

  return (
    <motion.div 
      initial={false}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      className={`fixed top-0 bottom-0 left-0 w-64 bg-gradient-to-b from-purple-700 to-indigo-900 text-white
      transition-all duration-300 ease-in-out z-50 flex flex-col justify-between h-screen md:w-16rem lg:w-20rem xl:w-24rem`}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-indigo-600 rounded-full p-1.5 hover:bg-indigo-700 transition-colors shadow-lg"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </motion.button>
      
      <div className="p-4 flex-1 overflow-y-auto h-screen sidebar">
        <div className="sidebar-content">
          <motion.div 
            className="flex items-center justify-center mb-8 mt-4"
            whileHover={{ scale: 1.05 }}
          >
            <Activity className="h-10 w-10 text-indigo-300" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="ml-3 text-xl font-bold"
                >
                  Wellness AI
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  activeItem === item.label
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-white/80'
                }`}
              >
                <Link to={item.path ?? ''} onClick={() => setActiveItem(item.label)}>
                  <item.icon className="h-6 w-6" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="ml-3"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>

      {/* User Profile Section */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4"
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-300 flex items-center justify-center">
            <User className="h-6 w-6 text-indigo-900" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="ml-3"
              >
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-indigo-300">Premium Member</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;