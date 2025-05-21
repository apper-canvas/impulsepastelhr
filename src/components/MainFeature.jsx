import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
import TeamCalendar from './TeamCalendar';
import { toast } from 'react-toastify';

const MainFeature = () => {
  // Icons
  const CalendarIcon = getIcon('calendar');
  const ClockIcon = getIcon('clock');
  const CheckIcon = getIcon('check');
  const AlertCircleIcon = getIcon('alert-circle');
  const XIcon = getIcon('x');
  const CalendarPlusIcon = getIcon('calendar-plus');
  
  // States
  const [activeSection, setActiveSection] = useState('apply'); // 'apply', 'balance', 'calendar'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Leave application form state
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    attachment: null
  });
  
  // Form validation state
  const [formErrors, setFormErrors] = useState({});
  
  // Mock leave balance data
  const leaveBalances = [
    { type: 'Casual Leave', allocated: 12, used: 3, remaining: 9 },
    { type: 'Sick Leave', allocated: 15, used: 2, remaining: 13 },
    { type: 'Vacation', allocated: 20, used: 10, remaining: 10 },
    { type: 'Optional Holidays', allocated: 3, used: 1, remaining: 2 }
  ];
  
  // Mock calendar data (team on leave)
  const teamOnLeave = [
    { name: 'Sarah Johnson', dates: ['2023-05-05', '2023-05-06'], type: 'Casual' },
    { name: 'Michael Brown', dates: ['2023-05-10', '2023-05-12'], type: 'Vacation' },
    { name: 'Emily Davis', dates: ['2023-05-18', '2023-05-18'], type: 'Sick' }
  ];
  
  // Calculate today's date in YYYY-MM-DD format for min date in the date picker
  const today = new Date().toISOString().split('T')[0];
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'attachment' && files.length > 0) {
      setLeaveForm(prev => ({ ...prev, attachment: files[0] }));
    } else {
      setLeaveForm(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!leaveForm.leaveType) {
      errors.leaveType = 'Please select leave type';
    }
    
    if (!leaveForm.startDate) {
      errors.startDate = 'Start date is required';
    }
    
    if (!leaveForm.endDate) {
      errors.endDate = 'End date is required';
    }
    
    if (leaveForm.startDate && leaveForm.endDate && leaveForm.startDate > leaveForm.endDate) {
      errors.endDate = 'End date cannot be before start date';
    }
    
    if (!leaveForm.reason || leaveForm.reason.trim().length < 5) {
      errors.reason = 'Please provide a valid reason (min 5 characters)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Reset form after short delay
        setTimeout(() => {
          setLeaveForm({
            leaveType: '',
            startDate: '',
            endDate: '',
            reason: '',
            attachment: null
          });
          setShowSuccess(false);
          
          // Show toast notification
          toast.success('Leave application submitted successfully!');
        }, 2000);
      }, 1500);
    }
  };
  
  // Reset success state when form changes
  useEffect(() => {
    if (showSuccess) {
      setShowSuccess(false);
    }
  }, [leaveForm]);

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      {/* Feature Navigation */}
      <div className="flex items-center border-b">
        <button
          className={`flex-1 px-4 py-3 text-center font-medium text-sm transition-colors border-b-2 ${
            activeSection === 'apply'
              ? 'border-primary text-primary'
              : 'border-transparent text-surface-600 hover:text-surface-900 hover:bg-surface-50'
          }`}
          onClick={() => setActiveSection('apply')}
        >
          Apply Leave
        </button>
        <button
          className={`flex-1 px-4 py-3 text-center font-medium text-sm transition-colors border-b-2 ${
            activeSection === 'balance'
              ? 'border-primary text-primary'
              : 'border-transparent text-surface-600 hover:text-surface-900 hover:bg-surface-50'
          }`}
          onClick={() => setActiveSection('balance')}
        >
          Leave Balance
        </button>
        <button
          className={`flex-1 px-4 py-3 text-center font-medium text-sm transition-colors border-b-2 ${
            activeSection === 'calendar'
              ? 'border-primary text-primary'
              : 'border-transparent text-surface-600 hover:text-surface-900 hover:bg-surface-50'
          }`}
          onClick={() => setActiveSection('calendar')}
        >
          Leave Calendar
        </button>
      </div>
      
      {/* Feature Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Apply Leave Section */}
          {activeSection === 'apply' && (
            <motion.div
              key="apply"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-surface-900">Apply for Leave</h2>
                  <p className="text-surface-600 text-sm">Request time off from work</p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <div className="flex items-center gap-2 text-sm text-surface-600">
                    <CalendarPlusIcon className="h-4 w-4 text-primary" />
                    <span>Today: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Leave Request Submitted</h3>
                  <p className="text-green-700">
                    Your leave request has been submitted successfully and is pending approval.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Leave Type */}
                    <div>
                      <label htmlFor="leaveType" className="block text-sm font-medium text-surface-700 mb-1">
                        Leave Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="leaveType"
                        name="leaveType"
                        value={leaveForm.leaveType}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.leaveType ? 'border-red-300 focus:ring-red-500' : ''}`}
                      >
                        <option value="">Select leave type</option>
                        <option value="casual">Casual Leave</option>
                        <option value="sick">Sick Leave</option>
                        <option value="vacation">Vacation</option>
                        <option value="optional">Optional Holiday</option>
                      </select>
                      {formErrors.leaveType && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.leaveType}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {/* Start Date */}
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-surface-700 mb-1">
                          From <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          min={today}
                          value={leaveForm.startDate}
                          onChange={handleInputChange}
                          className={`input-field ${formErrors.startDate ? 'border-red-300 focus:ring-red-500' : ''}`}
                        />
                        {formErrors.startDate && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.startDate}</p>
                        )}
                      </div>
                      
                      {/* End Date */}
                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-surface-700 mb-1">
                          To <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          min={leaveForm.startDate || today}
                          value={leaveForm.endDate}
                          onChange={handleInputChange}
                          className={`input-field ${formErrors.endDate ? 'border-red-300 focus:ring-red-500' : ''}`}
                        />
                        {formErrors.endDate && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.endDate}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Reason */}
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-surface-700 mb-1">
                      Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      rows="3"
                      value={leaveForm.reason}
                      onChange={handleInputChange}
                      placeholder="Please provide a reason for your leave request"
                      className={`input-field resize-none ${formErrors.reason ? 'border-red-300 focus:ring-red-500' : ''}`}
                    ></textarea>
                    {formErrors.reason && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.reason}</p>
                    )}
                  </div>
                  
                  {/* Attachment */}
                  <div>
                    <label htmlFor="attachment" className="block text-sm font-medium text-surface-700 mb-1">
                      Attachment (Optional)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="attachment"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-surface-200 border-dashed rounded-lg cursor-pointer bg-surface-50 hover:bg-surface-100 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-3 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <p className="mb-1 text-sm text-surface-600">
                            <span className="font-medium">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-surface-500">PDF, PNG, JPG or JPEG (MAX. 2MB)</p>
                          {leaveForm.attachment && (
                            <p className="mt-2 text-xs text-primary font-medium">
                              Selected: {leaveForm.attachment.name}
                            </p>
                          )}
                        </div>
                        <input
                          id="attachment"
                          name="attachment"
                          type="file"
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2.5 bg-primary text-white rounded-lg shadow-sm hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
          
          {/* Leave Balance Section */}
          {activeSection === 'balance' && (
            <motion.div
              key="balance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-surface-900">Leave Balance</h2>
                <p className="text-surface-600 text-sm">Overview of your leave allocations and usage</p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {leaveBalances.map((balance, index) => (
                    <div key={index} className="neu-card hover:shadow-soft transition-all duration-300">
                      <h3 className="text-lg font-medium text-surface-800 mb-2">{balance.type}</h3>
                      <div className="flex items-end justify-between mb-2">
                        <div className="text-3xl font-semibold text-primary-dark">{balance.remaining}</div>
                        <div className="text-sm text-surface-600">of {balance.allocated}</div>
                      </div>
                      <div className="w-full bg-surface-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${(balance.remaining / balance.allocated) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-surface-600">
                        Used: {balance.used} days
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-surface-50 p-5 rounded-lg border border-surface-200">
                  <div className="flex items-start sm:items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-surface-800">Leave Policy</h3>
                      <p className="text-sm text-surface-600">Important notes about leave allocation</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm text-surface-700">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 text-primary">•</div>
                      <p>Leave balance is calculated for the calendar year (January to December).</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 text-primary">•</div>
                      <p>Unused casual leaves cannot be carried forward to the next year.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 text-primary">•</div>
                      <p>A maximum of 5 sick leaves can be carried forward.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 text-primary">•</div>
                      <p>Leave requests must be submitted at least 3 days in advance (except for emergencies).</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Leave Calendar Section */}
          {activeSection === 'calendar' && (
            <TeamCalendar />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainFeature;