import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMonths, subMonths } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

// Set up the localizer for the calendar
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TeamCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');
  
  // Icons
  const CalendarIcon = getIcon('calendar');
  const UsersIcon = getIcon('users');
  const AlertCircleIcon = getIcon('alert-circle');
  const ChevronLeftIcon = getIcon('chevron-left');
  const ChevronRightIcon = getIcon('chevron-right');
  const FilterIcon = getIcon('filter');

  // Mock data for team members
  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', department: 'Engineering' },
    { id: 2, name: 'Michael Brown', department: 'Marketing' },
    { id: 3, name: 'Emily Davis', department: 'Design' },
    { id: 4, name: 'David Wilson', department: 'Product' },
    { id: 5, name: 'Jennifer Taylor', department: 'HR' },
    { id: 6, name: 'Robert Miller', department: 'Engineering' },
    { id: 7, name: 'Jessica Anderson', department: 'Finance' },
    { id: 8, name: 'Christopher Martinez', department: 'Engineering' },
  ];

  // Mock data for leave events
  const generateEvents = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    const events = [
      {
        id: 1,
        title: 'Sarah Johnson - Vacation',
        start: new Date(currentYear, currentMonth, 5),
        end: new Date(currentYear, currentMonth, 10),
        allDay: true,
        resourceId: 1,
        leaveType: 'vacation',
        status: 'approved'
      },
      {
        id: 2,
        title: 'Michael Brown - Sick Leave',
        start: new Date(currentYear, currentMonth, 15),
        end: new Date(currentYear, currentMonth, 16),
        allDay: true,
        resourceId: 2,
        leaveType: 'sick',
        status: 'approved'
      },
      {
        id: 3,
        title: 'Emily Davis - Casual Leave',
        start: new Date(currentYear, currentMonth, 20),
        end: new Date(currentYear, currentMonth, 21),
        allDay: true,
        resourceId: 3,
        leaveType: 'casual',
        status: 'pending'
      },
      {
        id: 4,
        title: 'David Wilson - Vacation',
        start: new Date(currentYear, currentMonth + 1, 3),
        end: new Date(currentYear, currentMonth + 1, 14),
        allDay: true,
        resourceId: 4,
        leaveType: 'vacation',
        status: 'approved'
      },
      {
        id: 5,
        title: 'Team Building Day',
        start: new Date(currentYear, currentMonth, 25),
        end: new Date(currentYear, currentMonth, 26),
        allDay: true,
        leaveType: 'holiday',
        status: 'info'
      }
    ];
    
    return events;
  };

  const events = generateEvents();
  
  // Handle navigation between months
  const navigateToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const navigateToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Custom event styling based on leave type
  const eventPropGetter = (event) => {
    let className = '';
    
    switch (event.leaveType) {
      case 'vacation':
        className = 'vacation-event';
        break;
      case 'sick':
        className = 'sick-event';
        break;
      case 'casual':
        className = 'casual-event';
        break;
      case 'holiday':
        className = 'holiday-event';
        break;
      default:
        className = '';
    }
    
    return { className };
  };

  return (
    <motion.div
      key="calendar"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-surface-900">Team Calendar</h2>
        <p className="text-surface-600 text-sm">Visualize team availability and leave schedules</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-secondary/10 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div className="p-2 bg-white rounded-full shrink-0 self-start sm:self-auto">
            <UsersIcon className="h-5 w-5 text-secondary-dark" />
          </div>
          <div>
            <h3 className="font-medium text-surface-800">Team Availability</h3>
            <p className="text-sm text-surface-600 mt-1">
              View your team's leave schedule to plan better and manage resources effectively.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 650 }}
            eventPropGetter={eventPropGetter}
            date={currentDate}
            onNavigate={date => setCurrentDate(date)}
            view={calendarView}
            onView={view => setCalendarView(view)}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 border border-surface-200 rounded-lg bg-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-leave-vacation rounded-sm"></div>
              <span className="text-sm font-medium text-surface-800">Vacation Leave</span>
            </div>
            <p className="text-xs text-surface-600">Annual leaves for holidays and personal time</p>
          </div>
          <div className="p-3 border border-surface-200 rounded-lg bg-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-leave-sick rounded-sm"></div>
              <span className="text-sm font-medium text-surface-800">Sick Leave</span>
            </div>
            <p className="text-xs text-surface-600">Leave due to illness or medical appointments</p>
          </div>
          <div className="p-3 border border-surface-200 rounded-lg bg-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-leave-casual rounded-sm"></div>
              <span className="text-sm font-medium text-surface-800">Casual Leave</span>
            </div>
            <p className="text-xs text-surface-600">Short-term leave for personal matters</p>
          </div>
          <div className="p-3 border border-surface-200 rounded-lg bg-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-leave-holiday rounded-sm"></div>
              <span className="text-sm font-medium text-surface-800">Company Holiday</span>
            </div>
            <p className="text-xs text-surface-600">Company-wide holidays and events</p>
          </div>
        </div>
        
        <div className="bg-surface-50 p-4 rounded-lg border border-surface-100">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-secondary/20 rounded-full text-secondary-dark shrink-0">
              <AlertCircleIcon className="h-4 w-4" />
            </div>
            <p className="text-sm text-surface-600">
              Managers can use this calendar to visualize team availability and plan projects accordingly. 
              You can switch between month, week, and day views using the buttons above the calendar.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCalendar;