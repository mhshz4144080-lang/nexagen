'use client';

import { useState } from 'react';

interface MVAFormProps {
  onClose: () => void;
}

export function MVAForm({ onClose }: MVAFormProps) {
  const [formData, setFormData] = useState({
    caller_id: '',
    first_name: '',
    last_name: '',
    email: '',
    trusted_form_cert_url: '',
    currently_represented: '',
    person_at_fault: '',
    claimantrelationship: '',
    incidentstate: '',
    incident_date: '',
    incidentposition: '',
    cited: '',
    changeattorney: '',
    settlement: '',
    channel: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // First, submit to WeCallPro API
      const formBody = new URLSearchParams();
      formBody.append('lead_token', '7d739eaa3ea7488689171a59e62e2707');
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formBody.append(key, value);
      });

      const weCallProResponse = await fetch('https://wecall-pro.trackdrive.com/api/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      // Then send confirmation email via Web3Forms
      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'ece1ba3b-64df-4136-b1b7-f58eeea670c7',
          subject: '✅ WeCallPro Lead Submission Confirmation',
          from_name: 'NexaGen - WeCallPro Lead Form',
          ...formData,
          message: `
            New WeCallPro Lead Submitted Successfully!
            
            Contact Information:
            - Name: ${formData.first_name} ${formData.last_name}
            - Phone: ${formData.caller_id}
            - Email: ${formData.email}
            
            Case Details:
            - Incident State: ${formData.incidentstate}
            - Incident Date: ${formData.incident_date}
            - Currently Represented: ${formData.currently_represented}
            - Person at Fault: ${formData.person_at_fault}
            - Claimant Relationship: ${formData.claimantrelationship}
            - Incident Position: ${formData.incidentposition}
            - Cited: ${formData.cited}
            - Change Attorney: ${formData.changeattorney}
            - Settlement: ${formData.settlement}
            - Channel: ${formData.channel}
            - Trusted Form URL: ${formData.trusted_form_cert_url}
          `
        }),
      });

      if (weCallProResponse.ok || emailResponse.ok) {
        setStatus('success');
        setFormData({
          caller_id: '',
          first_name: '',
          last_name: '',
          email: '',
          trusted_form_cert_url: '',
          currently_represented: '',
          person_at_fault: '',
          claimantrelationship: '',
          incidentstate: '',
          incident_date: '',
          incidentposition: '',
          cited: '',
          changeattorney: '',
          settlement: '',
          channel: ''
        });
        
        // Close form after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[80vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-slideIn flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition-all duration-300 group"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-8 text-center flex-shrink-0">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-white mb-2">
            WeCallPro Lead Form
          </h2>
          <p className="text-white/90 text-lg">
            Submit your information and we'll contact you shortly
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8 overflow-y-auto flex-1">
          {status === 'success' ? (
            <div className="text-center py-12 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Form Submitted Successfully!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Thank you for reaching out. We'll contact you shortly to assist with your claim.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Caller Number */}
              <div>
                <label htmlFor="caller_id" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Caller Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="caller_id"
                  name="caller_id"
                  value={formData.caller_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                  placeholder="+17194451111"
                />
              </div>

              {/* Name fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                    placeholder="Smith"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                  placeholder="first-and-last-name@gmail.com"
                />
              </div>

              {/* Trusted Form URL */}
              <div>
                <label htmlFor="trusted_form_cert_url" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Trusted Form URL from Website <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="trusted_form_cert_url"
                  name="trusted_form_cert_url"
                  value={formData.trusted_form_cert_url}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                  placeholder="https://..."
                />
              </div>

              {/* Currently Represented */}
              <div>
                <label htmlFor="currently_represented" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Already Represented? <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="currently_represented"
                  name="currently_represented"
                  value={formData.currently_represented}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                  placeholder="Yes / No / etc."
                />
              </div>

              {/* Person at Fault & Claimant Relationship */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="person_at_fault" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Person at Fault <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="person_at_fault"
                    name="person_at_fault"
                    value={formData.person_at_fault}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                    placeholder="Example"
                  />
                </div>
                <div>
                  <label htmlFor="claimantrelationship" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Claimant Relationship <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="claimantrelationship"
                    name="claimantrelationship"
                    value={formData.claimantrelationship}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                    placeholder="Example"
                  />
                </div>
              </div>

              {/* Incident State & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="incidentstate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Incident State <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="incidentstate"
                    name="incidentstate"
                    value={formData.incidentstate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                    placeholder="Example"
                  />
                </div>
                <div>
                  <label htmlFor="incident_date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Incident Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="incident_date"
                    name="incident_date"
                    value={formData.incident_date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                    placeholder="YYYY-MM-DD or as required"
                  />
                </div>
              </div>

              {/* Incident Position & Cited */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="incidentposition" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Incident Position <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="incidentposition"
                    name="incidentposition"
                    value={formData.incidentposition}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                    placeholder="Example"
                  />
                </div>
                <div>
                  <label htmlFor="cited" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Cited <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="cited"
                    name="cited"
                    value={formData.cited}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                    placeholder="Example"
                  />
                </div>
              </div>

              {/* Change Attorney & Settlement */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="changeattorney" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Change Attorney <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="changeattorney"
                    name="changeattorney"
                    value={formData.changeattorney}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                    placeholder="Example"
                  />
                </div>
                <div>
                  <label htmlFor="settlement" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Settlement <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="settlement"
                    name="settlement"
                    value={formData.settlement}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                    placeholder="Example"
                  />
                </div>
              </div>

              {/* Channel */}
              <div>
                <label htmlFor="channel" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Channel <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="channel"
                  name="channel"
                  value={formData.channel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                  placeholder="Example"
                />
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-fadeIn">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-800 dark:text-red-300 text-sm font-medium">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Form'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
