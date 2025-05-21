import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Mock user data
  const user = {
    name: "Alex Morgan",
    position: "Software Developer",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    leaveBalance: {
      casual: 8,
      sick: 10,
      vacation: 15,
      total: 33,
      consumed: 5,
      remaining: 28
    },
    attendance: {
      status: "Present",
      checkInTime: "09:15 AM",
      workHours: "7h 45m"
    }
  };

  // Mock navigation items with icons
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    { id: 'leave', label: 'Leave Management', icon: 'calendar' },
    { id: 'attendance', label: 'Attendance', icon: 'clock-3' },
    { id: 'payslips', label: 'Payslips', icon: 'receipt' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  // Set up icons
  const MenuIcon = getIcon('menu');
  const BellIcon = getIcon('bell');
  const XIcon = getIcon('x');
  const CheckCircleIcon = getIcon('check-circle');
  const ClockIcon = getIcon('clock');
  const CalendarIcon = getIcon('calendar');
  const FileTextIcon = getIcon('file-text');
  const ChevronRightIcon = getIcon('chevron-right');
  const UserIcon = getIcon('user');
  const LogOutIcon = getIcon('log-out');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-surface-600 hover:text-surface-900 hover:bg-surface-100 focus:outline-none"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-primary-dark font-extrabold text-2xl">Pastel</span>
                <span className="text-secondary-dark font-extrabold text-2xl">HR</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full text-surface-600 hover:text-surface-900 hover:bg-surface-100 relative">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary-dark ring-2 ring-white"></span>
              </button>
              <div className="flex items-center">
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (Mobile) */}
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-surface-900 bg-opacity-50" onClick={toggleSidebar}></div>
            <div className="relative flex flex-col w-72 max-w-xs bg-white h-full shadow-xl">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-primary-dark font-extrabold text-2xl">Pastel</span>
                  <span className="text-secondary-dark font-extrabold text-2xl">HR</span>
                </div>
                <button 
                  onClick={toggleSidebar}
                  className="p-2 rounded-md text-surface-600 hover:text-surface-900 hover:bg-surface-100 focus:outline-none"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-surface-900">{user.name}</h3>
                    <p className="text-sm text-surface-600">{user.position}</p>
                  </div>
                </div>
              </div>
              
              <nav className="flex-1 overflow-y-auto p-3">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const NavIcon = getIcon(item.icon);
                    return (
                      <li key={item.id}>
                        <button
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-100 transition-colors ${
                            activeTab === item.id ? 'bg-primary/10 text-primary-dark font-medium' : 'text-surface-700'
                          }`}
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsSidebarOpen(false);
                          }}
                        >
                          <NavIcon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              
              <div className="p-4 border-t">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-surface-700 hover:bg-surface-100 transition-colors">
                  <LogOutIcon className="h-5 w-5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex md:flex-col bg-white shadow-sm w-64 flex-shrink-0">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-surface-900">{user.name}</h3>
                <p className="text-sm text-surface-600">{user.position}</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const NavIcon = getIcon(item.icon);
                return (
                  <li key={item.id}>
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-100 transition-colors ${
                        activeTab === item.id ? 'bg-primary/10 text-primary-dark font-medium' : 'text-surface-700'
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <NavIcon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-surface-700 hover:bg-surface-100 transition-colors">
              <LogOutIcon className="h-5 w-5" />
              <span>Log out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-surface-900 mb-6">Welcome back, {user.name.split(' ')[0]}!</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Leave Balance Card */}
                <div className="card bg-gradient-to-br from-primary-light to-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-surface-800">Leave Balance</h3>
                      <p className="text-sm text-surface-600">Available leaves</p>
                    </div>
                    <CalendarIcon className="h-7 w-7 text-primary-dark" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-surface-800">{user.leaveBalance.remaining}</div>
                    <div className="text-sm text-surface-600">of {user.leaveBalance.total} days</div>
                  </div>
                  <div className="mt-4 w-full bg-surface-100 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(user.leaveBalance.remaining / user.leaveBalance.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Attendance Status Card */}
                <div className="card bg-gradient-to-br from-secondary-light to-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-surface-800">Today's Status</h3>
                      <p className="text-sm text-surface-600">Clock in time: {user.attendance.checkInTime}</p>
                    </div>
                    <ClockIcon className="h-7 w-7 text-secondary-dark" />
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                      <span className="text-lg font-semibold text-surface-800">{user.attendance.status}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-surface-600">Working hours</div>
                    <div className="text-lg font-semibold text-surface-800">{user.attendance.workHours}</div>
                  </div>
                </div>
                
                {/* Recent Payslip Card */}
                <div className="card bg-gradient-to-br from-accent/30 to-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-surface-800">Latest Payslip</h3>
                      <p className="text-sm text-surface-600">April 2023</p>
                    </div>
                    <FileTextIcon className="h-7 w-7 text-accent" />
                  </div>
                  <div className="mt-4">
                    <button className="w-full py-2 px-4 bg-accent/20 hover:bg-accent/30 rounded-lg flex items-center justify-center gap-2 transition-all">
                      <span className="text-surface-800 font-medium">View Payslip</span>
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Main Feature Component for Leave Application */}
              <MainFeature />
            </motion.div>
          )}
          
          {activeTab !== 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mb-4">
                {React.createElement(getIcon(navItems.find(item => item.id === activeTab)?.icon || 'help-circle'), { 
                  className: "h-10 w-10 text-primary", 
                })}
              </div>
              <h2 className="text-xl font-semibold text-surface-800 mb-2">
                {navItems.find(item => item.id === activeTab)?.label} Feature
              </h2>
              <p className="text-surface-600 text-center max-w-md">
                This feature will be implemented in the next iteration of the application.
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;