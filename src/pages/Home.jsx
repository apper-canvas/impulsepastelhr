import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainFeatureRef = useRef(null);
  
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
    { id: 'analytics', label: 'Reports & Analytics', icon: 'bar-chart-2' },
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
  const BarChartIcon = getIcon('bar-chart-2');
  const PieChartIcon = getIcon('pie-chart');
  const TrendingUpIcon = getIcon('trending-up');
  const CalendarPlusIcon = getIcon('calendar-plus');
  const DownloadIcon = getIcon('download');
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

          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-surface-900">Analytics Dashboard</h1>
                  <p className="text-surface-600">Monitor key performance indicators and generate reports</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="btn btn-primary flex items-center gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
              
              {/* KPI Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Attendance Rate Card */}
                <div className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm text-surface-600">Attendance Rate</p>
                      <h3 className="text-2xl font-bold text-surface-900">95.7%</h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-md">
                      <CheckCircleIcon className="h-6 w-6 text-primary-dark" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-green-600">+2.4%</span>
                    <span className="text-xs text-surface-600">vs last month</span>
                  </div>
                </div>
                
                {/* Leave Utilization Card */}
                <div className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm text-surface-600">Leave Utilization</p>
                      <h3 className="text-2xl font-bold text-surface-900">32.8%</h3>
                    </div>
                    <div className="p-2 bg-secondary/10 rounded-md">
                      <CalendarIcon className="h-6 w-6 text-secondary-dark" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-red-600">+5.3%</span>
                    <span className="text-xs text-surface-600">vs last month</span>
                  </div>
                </div>
                
                {/* Overtime Hours Card */}
                <div className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm text-surface-600">Overtime Hours</p>
                      <h3 className="text-2xl font-bold text-surface-900">126h</h3>
                    </div>
                    <div className="p-2 bg-accent/10 rounded-md">
                      <ClockIcon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-red-600">+12.5%</span>
                    <span className="text-xs text-surface-600">vs last month</span>
                  </div>
                </div>
                
                {/* Employee Engagement Card */}
                <div className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm text-surface-600">Engagement Score</p>
                      <h3 className="text-2xl font-bold text-surface-900">78/100</h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-md">
                      <TrendingUpIcon className="h-6 w-6 text-primary-dark" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-green-600">+4.2%</span>
                    <span className="text-xs text-surface-600">vs last month</span>
                  </div>
                </div>
              </div>
              
              {/* Analytics Tabs */}
              <div className="mb-6">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="flex border-b">
                    <button className="px-4 py-3 text-surface-900 border-b-2 border-primary font-medium flex-1">
                      Attendance Analytics
                    </button>
                    <button className="px-4 py-3 text-surface-600 hover:text-surface-900 flex-1">
                      Leave Analytics
                    </button>
                    <button className="px-4 py-3 text-surface-600 hover:text-surface-900 flex-1">
                      Performance Metrics
                    </button>
                  </div>
                  
                  {/* Filter Controls */}
                  <div className="p-4 bg-surface-50 border-b">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-surface-700 mb-1">Date Range</label>
                        <select className="input-field">
                          <option>Last 30 days</option>
                          <option>Last Quarter</option>
                          <option>Last 6 months</option>
                          <option>Year to date</option>
                          <option>Custom Range</option>
                        </select>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-surface-700 mb-1">Department</label>
                        <select className="input-field">
                          <option>All Departments</option>
                          <option>Engineering</option>
                          <option>Marketing</option>
                          <option>Sales</option>
                          <option>Operations</option>
                          <option>Human Resources</option>
                        </select>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-surface-700 mb-1">Employee</label>
                        <select className="input-field">
                          <option>All Employees</option>
                          <option>Management Only</option>
                          <option>Staff Only</option>
                          <option>Remote Workers</option>
                          <option>On-site Workers</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart Content */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Attendance Trend Chart */}
                      <div className="card">
                        <h3 className="text-lg font-semibold text-surface-800 mb-4">Attendance Trend</h3>
                        <div className="h-80 chart-container">
                          {/* ApexCharts would be rendered here */}
                          <div className="flex items-center justify-center h-full bg-surface-50 rounded-lg">
                            <div className="text-center">
                              <BarChartIcon className="h-10 w-10 text-surface-400 mx-auto mb-3" />
                              <p className="text-surface-600">
                                Monthly attendance trend showing check-in patterns
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Department Comparison Chart */}
                      <div className="card">
                        <h3 className="text-lg font-semibold text-surface-800 mb-4">Department Comparison</h3>
                        <div className="h-80 chart-container">
                          {/* ApexCharts would be rendered here */}
                          <div className="flex items-center justify-center h-full bg-surface-50 rounded-lg">
                            <div className="text-center">
                              <BarChartIcon className="h-10 w-10 text-surface-400 mx-auto mb-3" />
                              <p className="text-surface-600">
                                Attendance comparison across all departments
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Working Hours Distribution */}
                      <div className="card">
                        <h3 className="text-lg font-semibold text-surface-800 mb-4">Working Hours Distribution</h3>
                        <div className="h-80 chart-container">
                          {/* ApexCharts would be rendered here */}
                          <div className="flex items-center justify-center h-full bg-surface-50 rounded-lg">
                            <div className="text-center">
                              <PieChartIcon className="h-10 w-10 text-surface-400 mx-auto mb-3" />
                              <p className="text-surface-600">
                                Distribution of work hours, overtime, and breaks
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Absence Reasons */}
                      <div className="card">
                        <h3 className="text-lg font-semibold text-surface-800 mb-4">Absence Reasons</h3>
                        <div className="h-80 chart-container">
                          {/* ApexCharts would be rendered here */}
                          <div className="flex items-center justify-center h-full bg-surface-50 rounded-lg">
                            <div className="text-center">
                              <PieChartIcon className="h-10 w-10 text-surface-400 mx-auto mb-3" />
                              <p className="text-surface-600">
                                Breakdown of absence reasons and categories
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional Metrics Table */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-surface-800 mb-4">Detailed Attendance Metrics</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                          <thead className="bg-surface-100">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-surface-700 uppercase tracking-wider">Employee</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-surface-700 uppercase tracking-wider">Department</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-surface-700 uppercase tracking-wider">Attendance Rate</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-surface-700 uppercase tracking-wider">Avg. Work Hours</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-surface-700 uppercase tracking-wider">Leave Days Used</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-surface-700 uppercase tracking-wider">Performance Score</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-surface-200">
                            <tr className="hover:bg-surface-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">Alex Morgan</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600">Engineering</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">97.5%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">7.9 hrs</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">5/28</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">85/100</td>
                            </tr>
                            <tr className="hover:bg-surface-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">Jamie Williams</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600">Marketing</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">94.2%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">8.2 hrs</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">8/28</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">79/100</td>
                            </tr>
                            <tr className="hover:bg-surface-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">Sam Reynolds</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600">Sales</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">98.1%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">8.5 hrs</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">3/28</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">92/100</td>
                            </tr>
                            <tr className="hover:bg-surface-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">Taylor Kim</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600">Operations</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">95.8%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">7.7 hrs</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">6/28</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">81/100</td>
                            </tr>
                            <tr className="hover:bg-surface-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">Jordan Lee</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600">Engineering</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">96.3%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">8.0 hrs</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">4/28</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-800">88/100</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Report Generation Section */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-surface-900 mb-4">Generate Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Attendance Report Card */}
                  <div className="card hover:shadow-soft cursor-pointer transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                      <CheckCircleIcon className="h-6 w-6 text-primary-dark" />
                    </div>
                    <h3 className="text-lg font-semibold text-surface-800 mb-2">Attendance Report</h3>
                    <p className="text-surface-600 mb-4">Detailed employee attendance patterns, clock-in/out times, and absence rates.</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <button className="btn btn-primary text-sm py-1.5 flex-1">Generate</button>
                      <button className="btn bg-surface-100 text-surface-800 hover:bg-surface-200 text-sm py-1.5">
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Leave Utilization Report Card */}
                  <div className="card hover:shadow-soft cursor-pointer transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4">
                      <CalendarIcon className="h-6 w-6 text-secondary-dark" />
                    </div>
                    <h3 className="text-lg font-semibold text-surface-800 mb-2">Leave Utilization</h3>
                    <p className="text-surface-600 mb-4">Analysis of leave usage patterns, balance tracking, and type distribution.</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <button className="btn btn-primary text-sm py-1.5 flex-1">Generate</button>
                      <button className="btn bg-surface-100 text-surface-800 hover:bg-surface-200 text-sm py-1.5">
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Performance Metrics Report Card */}
                  <div className="card hover:shadow-soft cursor-pointer transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                      <TrendingUpIcon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-surface-800 mb-2">Performance Metrics</h3>
                    <p className="text-surface-600 mb-4">Comprehensive view of employee performance indicators and engagement scores.</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <button className="btn btn-primary text-sm py-1.5 flex-1">Generate</button>
                      <button className="btn bg-surface-100 text-surface-800 hover:bg-surface-200 text-sm py-1.5">
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'leave' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-surface-900">Leave Management</h1>
                  <p className="text-surface-600">Apply, track, and manage leave requests</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="btn btn-primary flex items-center gap-2" 
                    onClick={() => mainFeatureRef.current?.setActiveSection('apply')}>
                    <CalendarPlusIcon className="h-4 w-4" />
                    <span>Apply for Leave</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Leave Status Card */}
                <div className="card bg-gradient-to-br from-primary-light to-white lg:col-span-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-surface-800">My Leave Requests</h3>
                      <p className="text-sm text-surface-600">Recent applications</p>
                    </div>
                    <CalendarIcon className="h-7 w-7 text-primary-dark" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-surface-100 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm font-medium text-surface-900">Vacation Leave</span>
                          <p className="text-xs text-surface-600">Apr 15 - Apr 20, 2023</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Approved</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg border border-surface-100 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm font-medium text-surface-900">Sick Leave</span>
                          <p className="text-xs text-surface-600">Mar 3, 2023</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Approved</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg border border-surface-100 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm font-medium text-surface-900">Personal Leave</span>
                          <p className="text-xs text-surface-600">May 25, 2023</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">Pending</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                    View All Leave History
                  </button>
                </div>
                
                {/* Leave Statistics */}
                <div className="card lg:col-span-2">
                  <h3 className="text-lg font-semibold text-surface-800 mb-4">Leave Balance Overview</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-surface-50 p-4 rounded-lg border border-surface-200">
                      <div className="text-sm text-surface-600 mb-1">Casual Leave</div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-bold text-surface-900">9</div>
                        <div className="text-xs text-surface-500">of 12 days</div>
                      </div>
                      <div className="w-full bg-surface-200 h-2 rounded-full mt-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-surface-50 p-4 rounded-lg border border-surface-200">
                      <div className="text-sm text-surface-600 mb-1">Sick Leave</div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-bold text-surface-900">13</div>
                        <div className="text-xs text-surface-500">of 15 days</div>
                      </div>
                      <div className="w-full bg-surface-200 h-2 rounded-full mt-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: "87%" }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-surface-50 p-4 rounded-lg border border-surface-200">
                      <div className="text-sm text-surface-600 mb-1">Vacation</div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-bold text-surface-900">10</div>
                        <div className="text-xs text-surface-500">of 20 days</div>
                      </div>
                      <div className="w-full bg-surface-200 h-2 rounded-full mt-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-surface-800 mb-4">Team On Leave Today</h3>
                  
                  <div className="border border-surface-200 rounded-lg overflow-hidden">
                    {/* Team on leave today */}
                    <div className="divide-y divide-surface-100">
                      <div className="p-4 hover:bg-surface-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              MJ
                            </div>
                            <div>
                              <h4 className="font-medium text-surface-800">Michael Johnson</h4>
                              <div className="text-sm text-surface-600">UI/UX Designer</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-secondary-dark">Vacation Leave</div>
                        </div>
                      </div>
                      
                      <div className="p-4 hover:bg-surface-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary-dark font-medium">
                              AS
                            </div>
                            <div>
                              <h4 className="font-medium text-surface-800">Amy Smith</h4>
                              <div className="text-sm text-surface-600">Marketing Specialist</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-primary-dark">Sick Leave</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Leave Management Component */}
              <div className="bg-white rounded-xl shadow-card overflow-hidden">
                <div className="border-b">
                  <div className="flex">
                    <button id="applyLeaveTab" className="px-6 py-4 text-primary font-medium border-b-2 border-primary">Apply</button>
                    <button className="px-6 py-4 text-surface-600 hover:text-surface-900 border-b-2 border-transparent">My Requests</button>
                    <button className="px-6 py-4 text-surface-600 hover:text-surface-900 border-b-2 border-transparent">Team Calendar</button>
                    <button className="px-6 py-4 text-surface-600 hover:text-surface-900 border-b-2 border-transparent">Leave Policies</button>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Embed the MainFeature component that already has leave application functionality */}
                  <MainFeature ref={mainFeatureRef} initialSection="apply" />
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab !== 'dashboard' && (
            activeTab !== 'leave' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center min-h-[60vh]"
              >
                <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mb-4">
                  {React.createElement(getIcon(navItems.find(item => item.id === activeTab)?.icon || 'help-circle'), { 
                    // Using React.createElement to dynamically render the appropriate icon
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
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;