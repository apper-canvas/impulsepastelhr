/**
 * Utility functions for leave management
 */

/**
 * Calculate the number of working days between two dates
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @param {Array} holidays - Array of holiday dates in YYYY-MM-DD format
 * @returns {number} - Number of working days
 */
export const calculateWorkingDays = (startDate, endDate, holidays = []) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Convert holidays to Date objects
  const holidayDates = holidays.map(h => new Date(h).getTime());
  
  let workingDays = 0;
  const current = new Date(start);
  
  while (current <= end) {
    // Skip weekends (0 = Sunday, 6 = Saturday)
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Skip holidays
      if (!holidayDates.includes(current.getTime())) {
        workingDays++;
      }
    }
    
    // Move to next day
    current.setDate(current.getDate() + 1);
  }
  
  return workingDays;
};

/**
 * Get appropriate style class for leave status badge
 * @param {string} status - Leave status (Pending, Approved, Rejected, Cancelled)
 * @returns {string} - CSS class name
 */
export const getLeaveStatusClass = (status) => {
  switch (status) {
    case 'Approved':
      return 'status-badge status-badge-approved';
    case 'Rejected':
      return 'status-badge status-badge-rejected';
    case 'Cancelled':
      return 'status-badge status-badge-cancelled';
    case 'Pending':
    default:
      return 'status-badge status-badge-pending';
  }
};

/**
 * Format a date range to display
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {string} - Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startFormatted = start.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  });
  
  // If start and end dates are the same, just return the start date
  if (startDate === endDate) {
    return startFormatted;
  }
  
  const endFormatted = end.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  });
  
  return `${startFormatted} - ${endFormatted}`;
};