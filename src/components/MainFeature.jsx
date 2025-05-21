import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
import { toast } from 'react-toastify';

const MainFeature = () => {
  // Icons
  const CalendarIcon = getIcon('calendar');
  const ClockIcon = getIcon('clock');
  const CheckIcon = getIcon('check');
  const AlertCircleIcon = getIcon('alert-circle');
  const XIcon = getIcon('x');
  const CalendarPlusIcon = getIcon('calendar-plus');
  const UserCheckIcon = getIcon('user-check');
  const UserXIcon = getIcon('user-x');
  const FileTextIcon = getIcon('file-text');
  const ChevronRightIcon = getIcon('chevron-right');
  const PlusIcon = getIcon('plus');
  const EditIcon = getIcon('edit');
  const TrashIcon = getIcon('trash');
  
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
  
  // Mock leave requests data
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, type: 'Vacation', startDate: '2023-05-15', endDate: '2023-05-20', reason: 'Family vacation', status: 'Approved', appliedOn: '2023-05-01' },
    { id: 2, type: 'Sick', startDate: '2023-04-10', endDate: '2023-04-11', reason: 'Caught a cold', status: 'Approved', appliedOn: '2023-04-09' },
    { id: 3, type: 'Personal', startDate: '2023-05-25', endDate: '2023-05-25', reason: 'Personal errands', status: 'Pending', appliedOn: '2023-05-18' },
    { id: 4, type: 'Casual', startDate: '2023-06-05', endDate: '2023-06-07', reason: 'Mental health break', status: 'Pending', appliedOn: '2023-05-22' }
  ]);
  
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Mock leave balance data
  const leaveBalances = [
    { type: 'Casual Leave', allocated: 12, used: 3, remaining: 9 },
    { type: 'Sick Leave', allocated: 15, used: 2, remaining: 13 },
    { type: 'Vacation', allocated: 20, used: 10, remaining: 10 },
    { type: 'Optional Holidays', allocated: 3, used: 1, remaining: 2 }
  ];
  
  // Mock leave policies
  const leavePolicies = [
    { title: 'Casual Leave Policy', description: 'Casual leaves are for personal matters and errands that do not fall under sick leave. Maximum 12 days per year.', icon: 'calendar' },
    { title: 'Sick Leave Policy', description: 'Available when you are ill and unable to work. Requires medical certificate for more than 2 consecutive days. Maximum 15 days per year.', icon: 'thermometer' },
    { title: 'Vacation Policy', description: 'Annual vacation time for rest and recreation. Should be applied at least 2 weeks in advance. Maximum 20 days per year.', icon: 'plane' },
    { title: 'Maternity/Paternity Leave', description: 'Available for new parents. Up to 12 weeks for primary caregivers and 4 weeks for secondary caregivers.', icon: 'baby' }
  ];
  
  // Mock calendar data (team on leave)
  const teamOnLeave = [
    { name: 'Sarah Johnson', dates: ['2023-05-05', '2023-05-06'], type: 'Casual' },
    { name: 'Michael Brown', dates: ['2023-05-10', '2023-05-12'], type: 'Vacation' },
    { name: 'Emily Davis', dates: ['2023-05-18', '2023-05-18'], type: 'Sick' },
    { name: 'Robert Wilson', dates: ['2023-05-22', '2023-05-26'], type: 'Vacation' },
    { name: 'Jennifer Lee', dates: ['2023-05-15', '2023-05-15'], type: 'Personal' }
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

      // Create a new request object
      const newRequest = { id: leaveRequests.length + 1, type: leaveForm.leaveType, startDate: leaveForm.startDate, 
        endDate: leaveForm.endDate, reason: leaveForm.reason, status: 'Pending', appliedOn: today };
      
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
          setLeaveRequests([newRequest, ...leaveRequests]);
          setShowSuccess(false);
          
          // Show success notification
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
  
  // Function to approve a leave request
  const approveLeaveRequest = (id) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id ? { ...request, status: 'Approved' } : request
    ));
    toast.success('Leave request approved successfully!');
  };
  
  // Function to reject a leave request
  const rejectLeaveRequest = (id) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id ? { ...request, status: 'Rejected' } : request
    ));
    toast.error('Leave request rejected');
  };
  
  // Function to cancel a leave request
  const cancelLeaveRequest = (id) => {
    if (confirm('Are you sure you want to cancel this leave request?')) {
      setLeaveRequests(leaveRequests.map(request => 
        request.id === id ? { ...request, status: 'Cancelled' } : request
      ));
      toast.info('Leave request cancelled');
    }
  };
  
  // Function to view leave request details
  const viewLeaveRequestDetails = (request) => {
    setSelectedRequest(request);
  };

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
            activeSection === 'requests'
              ? 'border-primary text-primary'
              : 'border-transparent text-surface-600 hover:text-surface-900 hover:bg-surface-50'
          }`}
          onClick={() => setActiveSection('requests')}
        >
          My Requests
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
          
          {/* My Leave Requests Section */}
          {activeSection === 'requests' && (
            <motion.div
              key="requests"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-surface-900">My Leave Requests</h2>
                <p className="text-surface-600 text-sm">View and manage your leave applications</p>
              </div>
              
              {selectedRequest ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <button
                      className="text-surface-600 hover:text-surface-900 flex items-center gap-2 text-sm"
                      onClick={() => setSelectedRequest(null)}
                    >
                      <ArrowLeftIcon className="h-4 w-4" />
                      Back to requests
                    </button>
                    
                    {selectedRequest.status === 'Pending' && (
                      <button
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                        onClick={() => {
                          cancelLeaveRequest(selectedRequest.id);
                          setSelectedRequest(null);
                        }}
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                  
                  <div className="bg-surface-50 rounded-lg p-5 border border-surface-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-surface-800">
                        {selectedRequest.type} Leave Request
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedRequest.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        selectedRequest.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        selectedRequest.status === 'Cancelled' ? 'bg-surface-200 text-surface-700' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {selectedRequest.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-surface-600 mb-1">Date Range</p>
                        <p className="text-surface-900 font-medium">
                          {new Date(selectedRequest.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          {selectedRequest.startDate !== selectedRequest.endDate ? ` - ${new Date(selectedRequest.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-surface-600 mb-1">Applied On</p>
                        <p className="text-surface-900 font-medium">
                          {new Date(selectedRequest.appliedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <p className="text-sm text-surface-600 mb-1">Reason</p>
                        <p className="text-surface-900">{selectedRequest.reason}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1.5 text-sm bg-primary/10 text-primary-dark rounded-md">All</button>
                      <button className="px-3 py-1.5 text-sm text-surface-600 hover:bg-surface-100 rounded-md">Pending</button>
                      <button className="px-3 py-1.5 text-sm text-surface-600 hover:bg-surface-100 rounded-md">Approved</button>
                      <button className="px-3 py-1.5 text-sm text-surface-600 hover:bg-surface-100 rounded-md">Rejected</button>
                    </div>
                    
                    <button
                      className="btn btn-primary text-sm py-1.5 px-3 flex items-center gap-1"
                      onClick={() => setActiveSection('apply')}
                    >
                      <PlusIcon className="h-4 w-4" />
                      New Request
                    </button>
                  </div>
                  
                  <div className="border border-surface-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-surface-200">
                      <thead className="bg-surface-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-surface-700 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-surface-700 uppercase tracking-wider">Date Range</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-surface-700 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-surface-700 uppercase tracking-wider">Applied On</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-surface-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-surface-200">
                        {leaveRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-surface-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-surface-900">{request.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600">
                              {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              {request.startDate !== request.endDate ? ` - ${new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                request.status === 'Cancelled' ? 'bg-surface-200 text-surface-700' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600">
                              {new Date(request.appliedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button 
                                className="text-primary hover:text-primary-dark mr-3"
                                onClick={() => viewLeaveRequestDetails(request)}
                              >
                                View
                              </button>
                              {request.status === 'Pending' && (
                                <button 
                                  className="text-red-600 hover:text-red-800"
                                  onClick={() => cancelLeaveRequest(request.id)}
                                >
                                  Cancel
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
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
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-surface-900">Leave Calendar</h2>
                <p className="text-surface-600 text-sm">Team members on leave</p>
              </div>
              
              <div className="space-y-5">
                <div className="bg-secondary/10 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  <div className="p-2 bg-white rounded-full shrink-0 self-start sm:self-auto">
                    <ClockIcon className="h-5 w-5 text-secondary-dark" />
                  </div>
                  <div>
                    <h3 className="font-medium text-surface-800">Upcoming Leave Calendar</h3>
                    <p className="text-sm text-surface-600 mt-1">
                      View your team's leave schedule to plan better.
                    </p>
                  </div>
                </div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-surface-800">Team Leave Schedule - May 2023</h3>
                    <div className="flex space-x-2">
                      <button className="p-1 bg-surface-100 rounded hover:bg-surface-200 text-surface-700">◀</button>
                      <button className="p-1 bg-surface-100 rounded hover:bg-surface-200 text-surface-700">▶</button>
                    </div>
                  </div>
                
                
                  </div>
                  
                  {teamOnLeave.length > 0 ? (
                    <div className="divide-y divide-surface-100">
                      {teamOnLeave.map((entry, index) => (
                        <div key={index} className="p-4 hover:bg-surface-50 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-surface-200 flex items-center justify-center text-surface-600 font-medium">
                                {entry.name.split(' ').map(part => part[0]).join('')}
                              </div>
                              <div>
                                <h4 className="font-medium text-surface-800">{entry.name}</h4>
                                <div className="text-sm text-surface-600">
                                  {entry.type} Leave
                                </div>
                              </div>
                            </div>
                            <div className="ml-12 sm:ml-0">
                              <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-dark">
                                {entry.dates.length === 1 
                                  ? new Date(entry.dates[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                  : `${new Date(entry.dates[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(entry.dates[entry.dates.length-1]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto bg-surface-100 rounded-full flex items-center justify-center mb-3">
                        <CalendarIcon className="h-6 w-6 text-surface-500" />
                
                {/* Leave Policy Quick View */}
                <div className="mt-8">
                <h3 className="text-lg font-semibold text-surface-800 mb-4">Leave Policies Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {leavePolicies.map((policy, index) => (
                    <div key={index} className="p-4 bg-surface-50 rounded-lg border border-surface-200 flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {React.createElement(getIcon(policy.icon), { 
                            className: "h-5 w-5" 
                          })}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-surface-800 mb-1">{policy.title}</h4>
                        <p className="text-sm text-surface-600">{policy.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="md:col-span-2 mt-2">
                    <button className="text-primary hover:text-primary-dark text-sm font-medium">View Complete Leave Policy Document →</button>
                  </div>
                </div>
                </div>
                
                {/* Calendar View */}
                <div className="mt-8">
                  <h3 className="font-medium text-surface-800 mb-4">Monthly Calendar View</h3>
                  <div className="border border-surface-200 rounded-lg overflow-hidden">
                    <div className="bg-white p-4">
                      <div className="grid grid-cols-7 gap-px bg-surface-200">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                          <div key={idx} className="bg-surface-50 text-center py-2 text-sm font-medium text-surface-700">
                            {day}
                          </div>
                        ))}
                        
                        {/* Calendar days - this would normally be dynamically generated */}
                        {Array(35).fill(0).map((_, idx) => {
                          const dayNum = idx - 1; // Offset for starting day of month
                          const isCurrentMonth = dayNum >= 0 && dayNum < 31;
                          const dayDisplay = isCurrentMonth ? dayNum + 1 : '';
                          
                          // Check if any team member is on leave this day
                          const hasLeave = isCurrentMonth && teamOnLeave.some(member => 
                            member.dates.some(date => {
                              const dateObj = new Date(date);
                              return dateObj.getDate() === dayNum + 1 && dateObj.getMonth() === 4; // May is month 4 (0-indexed)
                            })
                          );
                          
                          return (
                            <div 
                              key={idx} 
                              className={`bg-white p-2 min-h-[70px] ${
                                !isCurrentMonth ? 'bg-surface-50 text-surface-400' : ''
                              } ${hasLeave ? 'relative' : ''}`}
                            >
                              <div className="text-sm">{dayDisplay}</div>
                              
                              {hasLeave && isCurrentMonth && (
                                <div className="mt-1">
                                  {teamOnLeave
                                    .filter(member => member.dates.some(date => {
                                      const dateObj = new Date(date);
                                      return dateObj.getDate() === dayNum + 1 && dateObj.getMonth() === 4;
                                    }))
                                    .slice(0, 2) // Only show first 2 for space
                                    .map((member, memberIdx) => (
                                      <div 
                                        key={memberIdx}
                                        className={`text-xs rounded px-1 py-0.5 mb-1 truncate ${
                                          member.type === 'Vacation' ? 'bg-primary/10 text-primary-dark' :
                                          member.type === 'Sick' ? 'bg-red-100 text-red-800' :
                                          'bg-secondary/10 text-secondary-dark'
                                        }`}
                                      >
                                        {member.name.split(' ')[0]}
                                      </div>
                                    ))
                                  }
                                  
                                  {/* If more than 2 people are on leave */}
                                  {teamOnLeave.filter(member => member.dates.some(date => {
                                    const dateObj = new Date(date);
                                    return dateObj.getDate() === dayNum + 1 && dateObj.getMonth() === 4;
                                  })).length > 2 && (
                                    <div className="text-xs text-surface-600">
                                      +{teamOnLeave.filter(member => member.dates.some(date => {
                                        const dateObj = new Date(date);
                                        return dateObj.getDate() === dayNum + 1 && dateObj.getMonth() === 4;
                                      })).length - 2} more
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Approvals Section (for managers) */}
                <div className="mt-8 border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-surface-800">Pending Approvals</h3>
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">2 Pending</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-surface-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-surface-100 flex items-center justify-center text-surface-600">JD</div>
                          <div>
                            <h4 className="font-medium text-surface-800">John Doe</h4>
                            <p className="text-sm text-surface-600">Casual Leave · May 29-30, 2023</p>
                            <p className="text-sm text-surface-600 mt-1">Reason: Family event</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200" onClick={() => approveLeaveRequest(5)}>
                            <UserCheckIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200" onClick={() => rejectLeaveRequest(5)}>
                            <UserXIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-surface-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-surface-100 flex items-center justify-center text-surface-600">JS</div>
                          <div>
                            <h4 className="font-medium text-surface-800">Jane Smith</h4>
                            <p className="text-sm text-surface-600">Sick Leave · May 24, 2023</p>
                            <p className="text-sm text-surface-600 mt-1">Reason: Doctor's appointment</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200" onClick={() => approveLeaveRequest(6)}>
                            <UserCheckIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200" onClick={() => rejectLeaveRequest(6)}>
                            <UserXIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                      </div>
                      <h3 className="font-medium text-surface-800 mb-1">No upcoming leaves</h3>
                      <p className="text-sm text-surface-600">
                        There are no team members on leave for the selected period.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="bg-surface-50 p-4 rounded-lg border border-surface-100">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-secondary/20 rounded-full text-secondary-dark shrink-0">
                      <AlertCircleIcon className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-surface-600">
                      You can view up to 3 months of leave schedule. For a complete annual view, please visit the HR portal.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainFeature;