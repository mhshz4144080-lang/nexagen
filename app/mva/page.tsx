'use client';

import { useState } from "react";
import Link from "next/link";

export default function MVAPage() {
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

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

      // Then send beautiful confirmation email via Web3Forms
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
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 NEW WECALLPRO LEAD SUBMITTED SUCCESSFULLY! 🎉
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 CONTACT INFORMATION
────────────────────────────────────────────────────
👤 Name: ${formData.first_name} ${formData.last_name}
📞 Phone: ${formData.caller_id}
📧 Email: ${formData.email}

⚖️ CASE DETAILS
────────────────────────────────────────────────────
📍 Incident State: ${formData.incidentstate || 'Not provided'}
📅 Incident Date: ${formData.incident_date || 'Not provided'}
👥 Claimant Relationship: ${formData.claimantrelationship || 'Not provided'}
🚦 Incident Position: ${formData.incidentposition || 'Not provided'}

🔍 LEGAL STATUS
────────────────────────────────────────────────────
👨‍⚖️ Currently Represented: ${formData.currently_represented || 'Not provided'}
⚠️ Person at Fault: ${formData.person_at_fault || 'Not provided'}
📝 Cited: ${formData.cited || 'Not provided'}
🔄 Change Attorney: ${formData.changeattorney || 'Not provided'}
💰 Settlement: ${formData.settlement || 'Not provided'}

📡 ADDITIONAL INFO
────────────────────────────────────────────────────
📢 Channel: ${formData.channel || 'Not provided'}
🔗 Trusted Form URL: ${formData.trusted_form_cert_url || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted via NexaGen WeCallPro Lead Form
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          `
        }),
      });

      if (weCallProResponse.ok || emailResponse.ok) {
        setStatus("success");
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
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-6 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/home"
          className="inline-flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 md:p-8 text-white">
            <div className="flex items-center gap-3 md:gap-4 mb-4">
              <div className="text-4xl md:text-5xl">�</div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold">WeCallPro Lead Form</h1>
                <p className="text-red-100 mt-2 text-sm md:text-base">Submit your information and we'll contact you shortly</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            {status === "success" ? (
              <div className="text-center py-12 animate-fadeIn">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                  <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Lead Submitted Successfully! 🎉
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Thank you for your submission. We've received your information and will contact you shortly.
                </p>
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    ✉️ A confirmation email has been sent to your email address.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Caller Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Caller Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="caller_id"
                    value={formData.caller_id}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    placeholder="+17194451111"
                  />
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    placeholder="first-and-last-name@gmail.com"
                  />
                </div>

                {/* Trusted Form URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Trusted Form URL from Website
                  </label>
                  <input
                    type="text"
                    name="trusted_form_cert_url"
                    value={formData.trusted_form_cert_url}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    placeholder="https://..."
                  />
                </div>

                {/* Currently Represented */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Already Represented?
                  </label>
                  <input
                    type="text"
                    name="currently_represented"
                    value={formData.currently_represented}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    placeholder="Yes / No / etc."
                  />
                </div>

                {/* Person at Fault & Claimant Relationship */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Person at Fault
                    </label>
                    <input
                      type="text"
                      name="person_at_fault"
                      value={formData.person_at_fault}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Claimant Relationship
                    </label>
                    <input
                      type="text"
                      name="claimantrelationship"
                      value={formData.claimantrelationship}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                </div>

                {/* Incident State & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident State
                    </label>
                    <input
                      type="text"
                      name="incidentstate"
                      value={formData.incidentstate}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident Date
                    </label>
                    <input
                      type="text"
                      name="incident_date"
                      value={formData.incident_date}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="YYYY-MM-DD or as required"
                    />
                  </div>
                </div>

                {/* Incident Position & Cited */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident Position
                    </label>
                    <input
                      type="text"
                      name="incidentposition"
                      value={formData.incidentposition}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Cited
                    </label>
                    <input
                      type="text"
                      name="cited"
                      value={formData.cited}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                </div>

                {/* Change Attorney & Settlement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Change Attorney
                    </label>
                    <input
                      type="text"
                      name="changeattorney"
                      value={formData.changeattorney}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Settlement
                    </label>
                    <input
                      type="text"
                      name="settlement"
                      value={formData.settlement}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                </div>

                {/* Channel */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Channel
                  </label>
                  <input
                    type="text"
                    name="channel"
                    value={formData.channel}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    placeholder="Example"
                  />
                </div>

                {/* Error Message */}
                {status === "error" && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-700 dark:text-red-300 text-sm md:text-base font-medium">
                        Something went wrong. Please try again.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-6 py-4 md:py-5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:from-red-400 disabled:to-pink-400 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed disabled:transform-none text-base md:text-lg"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting Lead...
                    </span>
                  ) : (
                    "Submit Lead"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
