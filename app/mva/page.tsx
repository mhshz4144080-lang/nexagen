'use client';

import { useState } from "react";
import Link from "next/link";

export default function MVAPage() {
  const [activeForm, setActiveForm] = useState<'form1' | 'form2' | 'form3' | 'form4'>('form1');
  
  // Form 1 - WeCallPro
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
  const [apiResponse, setApiResponse] = useState<any>(null);

  // Form 2 - Elite-Calls
  const [formData2, setFormData2] = useState({
    caller_id: '',
    traffic_source_id: '',
    first_name: '',
    last_name: '',
    email: '',
    claimantrelationship: '',
    incidentstate: '',
    incident_date: '',
    incidentposition: '',
    at_fault: '',
    cited: '',
    currently_represented: '',
    changeattorney: '',
    settlement: '',
    trusted_form_cert_url: '',
    channel: ''
  });
  const [status2, setStatus2] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiResponse2, setApiResponse2] = useState<any>(null);

  // Form 3 - Elite-Calls (bb66a5c4...)
  const [formData3, setFormData3] = useState({
    caller_id: '',
    traffic_source_id: '',
    first_name: '',
    last_name: '',
    email: '',
    claimantrelationship: '',
    incidentstate: '',
    incident_date: '',
    incidentposition: '',
    at_fault: '',
    cited: '',
    currently_represented: '',
    changeattorney: '',
    settlement: '',
    trusted_form_cert_url: '',
    channel: ''
  });
  const [status3, setStatus3] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiResponse3, setApiResponse3] = useState<any>(null);

  // Form 4 - Elite-Calls (686ddbfe...)
  const [formData4, setFormData4] = useState({
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
    settlement: '',
    channel: '',
    cited: '',
    changeattorney: ''
  });
  const [status4, setStatus4] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiResponse4, setApiResponse4] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setApiResponse(null);

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

      const weCallProData = await weCallProResponse.json();
      
      setApiResponse({
        weCallPro: {
          status: weCallProResponse.status,
          statusText: weCallProResponse.statusText,
          data: weCallProData
        }
      });

      // Only send confirmation email if WeCallPro API returns 200 or 201
      if (weCallProResponse.status === 200 || weCallProResponse.status === 201) {
        // Send beautiful confirmation email via Web3Forms
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

        const emailData = await emailResponse.json();
        setApiResponse((prev: any) => ({
          ...prev,
          email: {
            status: emailResponse.status,
            statusText: emailResponse.statusText,
            data: emailData
          }
        }));

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
      } else {
        // If not 200/201, show error and keep form with data
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setApiResponse({
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: error
        }
      });
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

  // Form 2 Handler
  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus2("loading");
    setApiResponse2(null);

    try {
      // Submit to Elite-Calls API
      const formBody = new URLSearchParams();
      formBody.append('lead_token', '3b0b8194d6844142b456e0d1b1867fac');
      Object.entries(formData2).forEach(([key, value]) => {
        if (value) formBody.append(key, value);
      });

      const eliteCallsResponse = await fetch('https://elite-calls-com.trackdrive.com/api/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      const eliteCallsData = await eliteCallsResponse.json();
      
      setApiResponse2({
        eliteCalls: {
          status: eliteCallsResponse.status,
          statusText: eliteCallsResponse.statusText,
          data: eliteCallsData
        }
      });

      // Only send confirmation email if Elite-Calls API returns 200 or 201
      if (eliteCallsResponse.status === 200 || eliteCallsResponse.status === 201) {
        // Send beautiful confirmation email via Web3Forms
        const emailResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: 'ece1ba3b-64df-4136-b1b7-f58eeea670c7',
            subject: '✅ Elite-Calls Lead Submission Confirmation',
            from_name: 'NexaGen - Elite-Calls Lead Form',
            ...formData2,
            message: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 NEW ELITE-CALLS LEAD SUBMITTED SUCCESSFULLY! 🎉
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 CONTACT INFORMATION
────────────────────────────────────────────────────
👤 Name: ${formData2.first_name} ${formData2.last_name}
📞 Phone: ${formData2.caller_id}
📧 Email: ${formData2.email}

⚖️ CASE DETAILS
────────────────────────────────────────────────────
📍 Incident State: ${formData2.incidentstate || 'Not provided'}
📅 Incident Date: ${formData2.incident_date || 'Not provided'}
👥 Claimant Relationship: ${formData2.claimantrelationship || 'Not provided'}
🚦 Incident Position: ${formData2.incidentposition || 'Not provided'}
⚠️ At Fault: ${formData2.at_fault || 'Not provided'}

🔍 LEGAL STATUS
────────────────────────────────────────────────────
👨‍⚖️ Currently Represented: ${formData2.currently_represented || 'Not provided'}
📝 Cited: ${formData2.cited || 'Not provided'}
🔄 Change Attorney: ${formData2.changeattorney || 'Not provided'}
💰 Settlement: ${formData2.settlement || 'Not provided'}

📡 ADDITIONAL INFO
────────────────────────────────────────────────────
🆔 Traffic Source ID: ${formData2.traffic_source_id || 'Not provided'}
📢 Channel: ${formData2.channel || 'Not provided'}
🔗 Trusted Form URL: ${formData2.trusted_form_cert_url || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted via NexaGen Elite-Calls Lead Form
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          `
          }),
        });

        const emailData = await emailResponse.json();
        setApiResponse2((prev: any) => ({
          ...prev,
          email: {
            status: emailResponse.status,
            statusText: emailResponse.statusText,
            data: emailData
          }
        }));

        setStatus2("success");
        setFormData2({
          caller_id: '',
          traffic_source_id: '',
          first_name: '',
          last_name: '',
          email: '',
          claimantrelationship: '',
          incidentstate: '',
          incident_date: '',
          incidentposition: '',
          at_fault: '',
          cited: '',
          currently_represented: '',
          changeattorney: '',
          settlement: '',
          trusted_form_cert_url: '',
          channel: ''
        });
      } else {
        // If not 200/201, show error and keep form with data
        setStatus2("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus2("error");
      setApiResponse2({
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: error
        }
      });
    }
  };

  const handleChange2 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value,
    });
  };

  // Form 3 Handler
  const handleSubmit3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus3("loading");
    setApiResponse3(null);

    try {
      // Submit to Elite-Calls API (bb66a5c4...)
      const formBody = new URLSearchParams();
      formBody.append('lead_token', 'bb66a5c4899e4c578391147aca7acba6');
      Object.entries(formData3).forEach(([key, value]) => {
        if (value) formBody.append(key, value);
      });

      const eliteCallsResponse = await fetch('https://elite-calls-com.trackdrive.com/api/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      const eliteCallsData = await eliteCallsResponse.json();
      
      setApiResponse3({
        eliteCalls: {
          status: eliteCallsResponse.status,
          statusText: eliteCallsResponse.statusText,
          data: eliteCallsData
        }
      });

      // Only send confirmation email if Elite-Calls API returns 200 or 201
      if (eliteCallsResponse.status === 200 || eliteCallsResponse.status === 201) {
        // Send beautiful confirmation email via Web3Forms
        const emailResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: 'ece1ba3b-64df-4136-b1b7-f58eeea670c7',
            subject: '✅ Elite-Calls Lead Submission Confirmation (Form 3)',
            from_name: 'NexaGen - Elite-Calls Lead Form 3',
            ...formData3,
            message: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 NEW ELITE-CALLS LEAD SUBMITTED SUCCESSFULLY! 🎉
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 CONTACT INFORMATION
────────────────────────────────────────────────────
👤 Name: ${formData3.first_name} ${formData3.last_name}
📞 Phone: ${formData3.caller_id}
📧 Email: ${formData3.email}

⚖️ CASE DETAILS
────────────────────────────────────────────────────
📍 Incident State: ${formData3.incidentstate || 'Not provided'}
📅 Incident Date: ${formData3.incident_date || 'Not provided'}
👥 Claimant Relationship: ${formData3.claimantrelationship || 'Not provided'}
🚦 Incident Position: ${formData3.incidentposition || 'Not provided'}
⚠️ At Fault: ${formData3.at_fault || 'Not provided'}

🔍 LEGAL STATUS
────────────────────────────────────────────────────
👨‍⚖️ Currently Represented: ${formData3.currently_represented || 'Not provided'}
📝 Cited: ${formData3.cited || 'Not provided'}
🔄 Change Attorney: ${formData3.changeattorney || 'Not provided'}
💰 Settlement: ${formData3.settlement || 'Not provided'}

📡 ADDITIONAL INFO
────────────────────────────────────────────────────
🆔 Traffic Source ID: ${formData3.traffic_source_id || 'Not provided'}
📢 Channel: ${formData3.channel || 'Not provided'}
🔗 Trusted Form URL: ${formData3.trusted_form_cert_url || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted via NexaGen Elite-Calls Lead Form 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          `
          }),
        });

        const emailData = await emailResponse.json();
        setApiResponse3((prev: any) => ({
          ...prev,
          email: {
            status: emailResponse.status,
            statusText: emailResponse.statusText,
            data: emailData
          }
        }));

        setStatus3("success");
        setFormData3({
          caller_id: '',
          traffic_source_id: '',
          first_name: '',
          last_name: '',
          email: '',
          claimantrelationship: '',
          incidentstate: '',
          incident_date: '',
          incidentposition: '',
          at_fault: '',
          cited: '',
          currently_represented: '',
          changeattorney: '',
          settlement: '',
          trusted_form_cert_url: '',
          channel: ''
        });
      } else {
        // If not 200/201, show error and keep form with data
        setStatus3("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus3("error");
      setApiResponse3({
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: error
        }
      });
    }
  };

  const handleChange3 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData3({
      ...formData3,
      [e.target.name]: e.target.value,
    });
  };

  // Form 4 Handler
  const handleSubmit4 = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus4("loading");
    setApiResponse4(null);

    try {
      // Submit to Elite-Calls API (686ddbfe...)
      const formBody = new URLSearchParams();
      formBody.append('lead_token', '686ddbfefecb4cedb0e66a21ac36ab18');
      Object.entries(formData4).forEach(([key, value]) => {
        if (value) formBody.append(key, value);
      });

      const eliteCallsResponse = await fetch('https://elite-calls-com.trackdrive.com/api/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      const eliteCallsData = await eliteCallsResponse.json();
      
      setApiResponse4({
        eliteCalls: {
          status: eliteCallsResponse.status,
          statusText: eliteCallsResponse.statusText,
          data: eliteCallsData
        }
      });
        console.log(eliteCallsResponse);
      // Only send confirmation email if Elite-Calls API returns 200 or 201
      if (eliteCallsResponse.status === 200 || eliteCallsResponse.status === 201) {
        // Send beautiful confirmation email via Web3Forms
        const emailResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: 'ece1ba3b-64df-4136-b1b7-f58eeea670c7',
            subject: '✅ Elite-Calls Lead Submission Confirmation (Form 4)',
            from_name: 'NexaGen - Elite-Calls Lead Form 4',
            ...formData4,
            message: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 NEW ELITE-CALLS LEAD SUBMITTED SUCCESSFULLY! 🎉
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 CONTACT INFORMATION
────────────────────────────────────────────────────
👤 Name: ${formData4.first_name} ${formData4.last_name}
📞 Phone: ${formData4.caller_id}
📧 Email: ${formData4.email}

⚖️ CASE DETAILS
────────────────────────────────────────────────────
📍 Incident State: ${formData4.incidentstate || 'Not provided'}
📅 Incident Date: ${formData4.incident_date || 'Not provided'}
👥 Claimant Relationship: ${formData4.claimantrelationship || 'Not provided'}
🚦 Incident Position: ${formData4.incidentposition || 'Not provided'}
⚠️ Person at Fault: ${formData4.person_at_fault || 'Not provided'}

🔍 LEGAL STATUS
────────────────────────────────────────────────────
👨‍⚖️ Currently Represented: ${formData4.currently_represented || 'Not provided'}
📝 Cited: ${formData4.cited || 'Not provided'}
🔄 Change Attorney: ${formData4.changeattorney || 'Not provided'}
💰 Settlement: ${formData4.settlement || 'Not provided'}

📡 ADDITIONAL INFO
────────────────────────────────────────────────────
📢 Channel: ${formData4.channel || 'Not provided'}
🔗 Trusted Form URL: ${formData4.trusted_form_cert_url || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted via NexaGen Elite-Calls Lead Form 4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          `
          }),
        });

        const emailData = await emailResponse.json();
        setApiResponse4((prev: any) => ({
          ...prev,
          email: {
            status: emailResponse.status,
            statusText: emailResponse.statusText,
            data: emailData
          }
        }));

        setStatus4("success");
        setFormData4({
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
          settlement: '',
          channel: '',
          cited: '',
          changeattorney: ''
        });
      } else {
        // If not 200/201, show error and keep form with data
        setStatus4("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus4("error");
      setApiResponse4({
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: error
        }
      });
    }
  };

  const handleChange4 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData4({
      ...formData4,
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
              <div className="text-4xl md:text-5xl">📞</div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold">Lead Submission Forms</h1>
                <p className="text-red-100 mt-2 text-sm md:text-base">Choose a form and submit your information</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mt-6 flex-wrap">
              <button
                onClick={() => setActiveForm('form1')}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeForm === 'form1'
                    ? 'bg-white text-red-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Form 1: WeCallPro
              </button>
              <button
                onClick={() => setActiveForm('form2')}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeForm === 'form2'
                    ? 'bg-white text-red-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Form 2: Elite-Calls
              </button>
              <button
                onClick={() => setActiveForm('form3')}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeForm === 'form3'
                    ? 'bg-white text-red-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Form 3: Elite-Calls
              </button>
              <button
                onClick={() => setActiveForm('form4')}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeForm === 'form4'
                    ? 'bg-white text-red-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Form 4: Elite-Calls
              </button>
            </div>
          </div>

          {/* Form 1 - WeCallPro */}
          {activeForm === 'form1' && (
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
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                  Thank you for your submission. We've received your information and will contact you shortly.
                </p>
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 mb-6">
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    ✉️ A confirmation email has been sent to your email address.
                  </p>
                </div>
                {apiResponse && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-4 md:p-6 animate-fadeIn max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">API Response</h4>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <pre className="text-xs md:text-sm overflow-x-auto text-gray-800 dark:text-gray-200 max-h-96 overflow-y-auto font-mono whitespace-pre-wrap break-words">
                        {JSON.stringify(apiResponse, null, 2)}
                      </pre>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-3 text-center">
                      ℹ️ This response shows the result of your form submission
                    </p>
                  </div>
                )}
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
                    Trusted Form URL from Website <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="trusted_form_cert_url"
                    value={formData.trusted_form_cert_url}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    placeholder="https://..."
                  />
                </div>

                {/* Currently Represented */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Already Represented? <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="currently_represented"
                    value={formData.currently_represented}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    placeholder="Yes / No / etc."
                  />
                </div>

                {/* Person at Fault & Claimant Relationship */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Person at Fault <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="person_at_fault"
                      value={formData.person_at_fault}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Claimant Relationship <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="claimantrelationship"
                      value={formData.claimantrelationship}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                </div>

                {/* Incident State & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident State <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="incidentstate"
                      value={formData.incidentstate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="incident_date"
                      value={formData.incident_date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="YYYY-MM-DD or as required"
                    />
                  </div>
                </div>

                {/* Incident Position & Cited */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident Position <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="incidentposition"
                      value={formData.incidentposition}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Cited <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="cited"
                      value={formData.cited}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                </div>

                {/* Change Attorney & Settlement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Change Attorney <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="changeattorney"
                      value={formData.changeattorney}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Settlement <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="settlement"
                      value={formData.settlement}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Example"
                    />
                  </div>
                </div>

                {/* Channel */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Channel <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="channel"
                    value={formData.channel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    placeholder="Example"
                  />
                </div>

                {/* API Response Display */}
                {apiResponse && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-4 md:p-6 animate-fadeIn">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">API Response</h4>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <pre className="text-xs md:text-sm overflow-x-auto text-gray-800 dark:text-gray-200 max-h-96 overflow-y-auto font-mono whitespace-pre-wrap break-words">
                        {JSON.stringify(apiResponse, null, 2)}
                      </pre>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-3 text-center">
                      ℹ️ This response shows the result of your form submission
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {status === "error" && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-fadeIn">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-700 dark:text-red-300 text-sm md:text-base font-medium">
                        {apiResponse?.weCallPro?.data?.response?.result?.[0] === "Source Duplicate" 
                          ? "Lead creation failed: Duplicate entry detected" 
                          : "Something went wrong. Please check the response below."}
                      </p>
                    </div>
                    {apiResponse && (
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-red-200 dark:border-red-700 mt-3">
                        <pre className="text-xs md:text-sm overflow-x-auto text-gray-800 dark:text-gray-200 max-h-60 overflow-y-auto font-mono whitespace-pre-wrap break-words">
                          {JSON.stringify(apiResponse, null, 2)}
                        </pre>
                      </div>
                    )}
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
          )}

          {/* Form 2 - Elite-Calls */}
          {activeForm === 'form2' && (
            <div className="p-6 md:p-8">
              {status2 === "success" ? (
                <div className="text-center py-12 animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                    <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Lead Submitted Successfully! 🎉
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                    Thank you for your submission. We've received your information and will contact you shortly.
                  </p>
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 mb-6">
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      ✉️ A confirmation email has been sent to your email address.
                    </p>
                  </div>
                  {apiResponse2 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-4 md:p-6 animate-fadeIn max-w-2xl mx-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">API Response</h4>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <pre className="text-xs md:text-sm overflow-x-auto text-gray-800 dark:text-gray-200 max-h-96 overflow-y-auto font-mono whitespace-pre-wrap break-words">
                          {JSON.stringify(apiResponse2, null, 2)}
                        </pre>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-3 text-center">
                        ℹ️ This response shows the result of your form submission
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit2} className="space-y-4 md:space-y-6">
                  {/* Caller Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Caller Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="caller_id"
                      value={formData2.caller_id}
                      onChange={handleChange2}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="+17194451111"
                    />
                  </div>

                  {/* Traffic Source ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Traffic Source ID <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="traffic_source_id"
                      value={formData2.traffic_source_id}
                      onChange={handleChange2}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="P1"
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
                        value={formData2.first_name}
                        onChange={handleChange2}
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
                        value={formData2.last_name}
                        onChange={handleChange2}
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
                      value={formData2.email}
                      onChange={handleChange2}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="first-and-last-name@gmail.com"
                    />
                  </div>

                  {/* Claimant Relationship */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Claimant Relationship <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="claimantrelationship"
                      value={formData2.claimantrelationship}
                      onChange={handleChange2}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="Court Appointed Conservator"
                    />
                  </div>

                  {/* Incident State */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident State <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="incidentstate"
                      value={formData2.incidentstate}
                      onChange={handleChange2}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    >
                      <option value="">-- Select State --</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>

                  {/* Incident Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident Date <span className="text-red-600">*</span>
                      <span className="block text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">Format: mm/dd/yyyy</span>
                    </label>
                    <input
                      type="text"
                      name="incident_date"
                      value={formData2.incident_date}
                      onChange={handleChange2}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="01/15/2025"
                    />
                  </div>

                  {/* Incident Position */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident Position <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="incidentposition"
                      value={formData2.incidentposition}
                      onChange={handleChange2}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    >
                      <option value="">-- Select Position --</option>
                      <option value="Driver">Driver</option>
                      <option value="Passenger">Passenger</option>
                      <option value="Pedestrian">Pedestrian</option>
                    </select>
                  </div>

                  {/* Yes/No Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        At Fault? <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="at_fault"
                        value={formData2.at_fault}
                        onChange={handleChange2}
                        required
                        className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      >
                        <option value="">-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Cited for moving violation? <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="cited"
                        value={formData2.cited}
                        onChange={handleChange2}
                        required
                        className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      >
                        <option value="">-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  {/* More Yes/No Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Already Represented? <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="currently_represented"
                        value={formData2.currently_represented}
                        onChange={handleChange2}
                        required
                        className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      >
                        <option value="">-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Willing to Change Attorney? <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="changeattorney"
                        value={formData2.changeattorney}
                        onChange={handleChange2}
                        required
                        className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      >
                        <option value="">-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  {/* Settlement */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Received Settlement? <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="settlement"
                      value={formData2.settlement}
                      onChange={handleChange2}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    >
                      <option value="">-- Select --</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Trusted Form URL */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Trusted Form URL from Website <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="trusted_form_cert_url"
                      value={formData2.trusted_form_cert_url}
                      onChange={handleChange2}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                      placeholder="https://example.com/trustedform"
                    />
                  </div>

                  {/* Marketing Channel */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Marketing Channel <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="channel"
                      value={formData2.channel}
                      onChange={handleChange2}
                      required
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                    >
                      <option value="">-- Select Channel --</option>
                      <option value="Direct Mail">Direct Mail</option>
                      <option value="Display">Display</option>
                      <option value="Email">Email</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Google">Google</option>
                      <option value="Listicle">Listicle</option>
                      <option value="Microsoft">Microsoft</option>
                      <option value="Pinterest">Pinterest</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* API Response Display */}
                  {apiResponse2 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-4 md:p-6 animate-fadeIn">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">API Response</h4>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <pre className="text-xs md:text-sm overflow-x-auto text-gray-800 dark:text-gray-200 max-h-96 overflow-y-auto font-mono whitespace-pre-wrap break-words">
                          {JSON.stringify(apiResponse2, null, 2)}
                        </pre>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-3 text-center">
                        ℹ️ This response shows the result of your form submission
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {status2 === "error" && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-fadeIn">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-700 dark:text-red-300 text-sm md:text-base font-medium">
                          {apiResponse2?.eliteCalls?.data?.response?.result?.[0] === "Source Duplicate" 
                            ? "Lead creation failed: Duplicate entry detected" 
                            : "Something went wrong. Please check the response below."}
                        </p>
                      </div>
                      {apiResponse2 && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-red-200 dark:border-red-700 mt-3">
                          <pre className="text-xs md:text-sm overflow-x-auto text-gray-800 dark:text-gray-200 max-h-60 overflow-y-auto font-mono whitespace-pre-wrap break-words">
                            {JSON.stringify(apiResponse2, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status2 === "loading"}
                    className="w-full px-6 py-4 md:py-5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:from-red-400 disabled:to-pink-400 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed disabled:transform-none text-base md:text-lg"
                  >
                    {status2 === "loading" ? (
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
          )}

          {/* Form 3 - Elite-Calls (bb66a5c4...) */}
          {activeForm === 'form3' && (
            <div className="p-6 md:p-8">
              {status3 === "success" ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-6">🎉</div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Thank You!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                    Your Elite-Calls lead has been submitted successfully. We&apos;ll be in touch soon!
                  </p>
                  
                  {/* API Response Display */}
                  {apiResponse3 && (
                    <div className="mt-8 text-left bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        API Response
                      </h3>
                      <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        {JSON.stringify(apiResponse3, null, 2)}
                      </pre>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setStatus3("idle");
                      setApiResponse3(null);
                    }}
                    className="mt-6 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Submit Another Lead
                  </button>
                </div>
              ) : status3 === "error" ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-6">❌</div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Submission Error
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                    {apiResponse3?.eliteCalls?.data?.response?.result?.[0] === "Source Duplicate" 
                      ? 'Lead creation failed: Duplicate entry detected'
                      : 'There was an error submitting your form. Please try again.'}
                  </p>

                  {/* Error Alert Box */}
                  {apiResponse3?.eliteCalls?.data?.response?.result?.[0] && (
                    <div className="max-w-2xl mx-auto mb-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-700 dark:text-red-300 text-sm md:text-base font-medium">
                        {apiResponse3?.eliteCalls?.data?.response?.result?.[0] === "Source Duplicate" 
                          ? "Lead creation failed: Duplicate entry detected" 
                          : "Something went wrong. Please check the response below."}
                      </p>
                    </div>
                  )}

                  {/* API Response Display */}
                  {apiResponse3 && (
                    <div className="mt-8 text-left bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        Error Details
                      </h3>
                      <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-lg border border-red-200 dark:border-red-700">
                        {JSON.stringify(apiResponse3, null, 2)}
                      </pre>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setStatus3("idle");
                      setApiResponse3(null);
                    }}
                    className="mt-6 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit3} className="space-y-6">
                  {/* Caller ID */}
                  <div>
                    <label htmlFor="caller_id_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Caller Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="caller_id_3"
                      name="caller_id"
                      value={formData3.caller_id}
                      onChange={handleChange3}
                      placeholder="+17194451111"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Traffic Source ID */}
                  <div>
                    <label htmlFor="traffic_source_id_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Traffic Source ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="traffic_source_id_3"
                      name="traffic_source_id"
                      value={formData3.traffic_source_id}
                      onChange={handleChange3}
                      placeholder="P1"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* First Name */}
                  <div>
                    <label htmlFor="first_name_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="first_name_3"
                      name="first_name"
                      value={formData3.first_name}
                      onChange={handleChange3}
                      placeholder="John"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="last_name_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="last_name_3"
                      name="last_name"
                      value={formData3.last_name}
                      onChange={handleChange3}
                      placeholder="Smith"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email_3"
                      name="email"
                      value={formData3.email}
                      onChange={handleChange3}
                      placeholder="first-and-last-name@gmail.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Claimant Relationship */}
                  <div>
                    <label htmlFor="claimantrelationship_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Claimant Relationship <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="claimantrelationship_3"
                      name="claimantrelationship"
                      value={formData3.claimantrelationship}
                      onChange={handleChange3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    >
                      <option value="">-- Select Relationship --</option>
                      <option value="Power of Attorney">Power of Attorney</option>
                      <option value="Executor/Executrix">Executor/Executrix</option>
                      <option value="Parent of a Minor">Parent of a Minor</option>
                      <option value="Court Appointed Guardian">Court Appointed Guardian</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Trustee">Trustee</option>
                      <option value="Court Appointed Conservator">Court Appointed Conservator</option>
                      <option value="Child of Deceased (without spouse)">Child of Deceased (without spouse)</option>
                    </select>
                  </div>

                  {/* Incident State */}
                  <div>
                    <label htmlFor="incidentstate_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="incidentstate_3"
                      name="incidentstate"
                      value={formData3.incidentstate}
                      onChange={handleChange3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    >
                      <option value="">-- Select State --</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>

                  {/* Incident Date */}
                  <div>
                    <label htmlFor="incident_date_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident Date <span className="text-red-500">*</span>
                      <span className="text-xs text-gray-500 ml-2">(Format: mm/dd/yyyy)</span>
                    </label>
                    <input
                      type="text"
                      id="incident_date_3"
                      name="incident_date"
                      value={formData3.incident_date}
                      onChange={handleChange3}
                      placeholder="01/15/2025"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Incident Position */}
                  <div>
                    <label htmlFor="incidentposition_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident Position <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="incidentposition_3"
                      name="incidentposition"
                      value={formData3.incidentposition}
                      onChange={handleChange3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    >
                      <option value="">-- Select Position --</option>
                      <option value="Driver">Driver</option>
                      <option value="Passenger">Passenger</option>
                      <option value="Pedestrian">Pedestrian</option>
                    </select>
                  </div>

                  {/* At Fault */}
                  <div>
                    <label htmlFor="at_fault_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      At Fault? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="at_fault_3"
                      name="at_fault"
                      value={formData3.at_fault}
                      onChange={handleChange3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    >
                      <option value="">-- Select --</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Cited */}
                  <div>
                    <label htmlFor="cited_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Cited for moving violation? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="cited_3"
                      name="cited"
                      value={formData3.cited}
                      onChange={handleChange3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    >
                      <option value="">-- Select --</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Currently Represented */}
                  <div>
                    <label htmlFor="currently_represented_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Already Represented? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="currently_represented_3"
                      name="currently_represented"
                      value={formData3.currently_represented}
                      onChange={handleChange3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    >
                      <option value="">-- Select --</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Change Attorney */}
                  <div>
                    <label htmlFor="changeattorney_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Willing to Change Attorney? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="changeattorney_3"
                      name="changeattorney"
                      value={formData3.changeattorney}
                      onChange={handleChange3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    >
                      <option value="">-- Select --</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Settlement */}
                  <div>
                    <label htmlFor="settlement_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Received Settlement? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="settlement_3"
                      name="settlement"
                      value={formData3.settlement}
                      onChange={handleChange3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    >
                      <option value="">-- Select --</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Trusted Form URL */}
                  <div>
                    <label htmlFor="trusted_form_cert_url_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Trusted Form URL from Website <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="trusted_form_cert_url_3"
                      name="trusted_form_cert_url"
                      value={formData3.trusted_form_cert_url}
                      onChange={handleChange3}
                      placeholder="https://example.com/trustedform"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Channel */}
                  <div>
                    <label htmlFor="channel_3" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Marketing Channel <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="channel_3"
                      name="channel"
                      value={formData3.channel}
                      onChange={handleChange3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    >
                      <option value="">-- Select Channel --</option>
                      <option value="Direct Mail">Direct Mail</option>
                      <option value="Display">Display</option>
                      <option value="Email">Email</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Google">Google</option>
                      <option value="Listicle">Listicle</option>
                      <option value="Microsoft">Microsoft</option>
                      <option value="Native">Native</option>
                      <option value="Pinterest">Pinterest</option>
                      <option value="Radio">Radio</option>
                      <option value="Search">Search</option>
                      <option value="SEO">SEO</option>
                      <option value="Social Media">Social Media</option>
                      <option value="TikTok">TikTok</option>
                      <option value="TV">TV</option>
                      <option value="Twitter">Twitter</option>
                      <option value="YouTube">YouTube</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status3 === "loading"}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status3 === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
          )}

          {/* Form 4 - Elite-Calls (686ddbfe...) */}
          {activeForm === 'form4' && (
            <div className="p-6 md:p-8">
              {status4 === "success" ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-6">🎉</div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Thank You!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                    Your Elite-Calls lead has been submitted successfully. We&apos;ll be in touch soon!
                  </p>
                  
                  {/* API Response Display */}
                  {apiResponse4 && (
                    <div className="mt-8 text-left bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        API Response
                      </h3>
                      <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        {JSON.stringify(apiResponse4, null, 2)}
                      </pre>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setStatus4("idle");
                      setApiResponse4(null);
                    }}
                    className="mt-6 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Submit Another Lead
                  </button>
                </div>
              ) : status4 === "error" ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-6">❌</div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Submission Error
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                    {apiResponse4?.eliteCalls?.data?.response?.result?.[0] === "Source Duplicate" 
                      ? 'Lead creation failed: Duplicate entry detected'
                      : 'There was an error submitting your form. Please try again.'}
                  </p>

                  {/* Error Alert Box */}
                  {apiResponse4?.eliteCalls?.data?.response?.result?.[0] && (
                    <div className="max-w-2xl mx-auto mb-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-700 dark:text-red-300 text-sm md:text-base font-medium">
                        {apiResponse4?.eliteCalls?.data?.response?.result?.[0] === "Source Duplicate" 
                          ? "Lead creation failed: Duplicate entry detected" 
                          : "Something went wrong. Please check the response below."}
                      </p>
                    </div>
                  )}

                  {/* API Response Display */}
                  {apiResponse4 && (
                    <div className="mt-8 text-left bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        Error Details
                      </h3>
                      <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-lg border border-red-200 dark:border-red-700">
                        {JSON.stringify(apiResponse4, null, 2)}
                      </pre>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setStatus4("idle");
                      setApiResponse4(null);
                    }}
                    className="mt-6 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit4} className="space-y-6">
                  {/* Caller ID */}
                  <div>
                    <label htmlFor="caller_id_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Caller Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="caller_id_4"
                      name="caller_id"
                      value={formData4.caller_id}
                      onChange={handleChange4}
                      placeholder="+17194451111"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* First Name */}
                  <div>
                    <label htmlFor="first_name_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="first_name_4"
                      name="first_name"
                      value={formData4.first_name}
                      onChange={handleChange4}
                      placeholder="John"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="last_name_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="last_name_4"
                      name="last_name"
                      value={formData4.last_name}
                      onChange={handleChange4}
                      placeholder="Smith"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email_4"
                      name="email"
                      value={formData4.email}
                      onChange={handleChange4}
                      placeholder="first-and-last-name@gmail.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Trusted Form URL */}
                  <div>
                    <label htmlFor="trusted_form_cert_url_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Trusted Form URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="trusted_form_cert_url_4"
                      name="trusted_form_cert_url"
                      value={formData4.trusted_form_cert_url}
                      onChange={handleChange4}
                      placeholder="https://..."
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Currently Represented */}
                  <div>
                    <label htmlFor="currently_represented_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Already Represented? <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="currently_represented_4"
                      name="currently_represented"
                      value={formData4.currently_represented}
                      onChange={handleChange4}
                      placeholder="Yes / No / etc."
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Person at Fault */}
                  <div>
                    <label htmlFor="person_at_fault_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Person at Fault <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="person_at_fault_4"
                      name="person_at_fault"
                      value={formData4.person_at_fault}
                      onChange={handleChange4}
                      placeholder="Example"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Claimant Relationship */}
                  <div>
                    <label htmlFor="claimantrelationship_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Claimant Relationship <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="claimantrelationship_4"
                      name="claimantrelationship"
                      value={formData4.claimantrelationship}
                      onChange={handleChange4}
                      placeholder="Example"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Incident State */}
                  <div>
                    <label htmlFor="incidentstate_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="incidentstate_4"
                      name="incidentstate"
                      value={formData4.incidentstate}
                      onChange={handleChange4}
                      placeholder="Example (e.g., NC)"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Incident Date */}
                  <div>
                    <label htmlFor="incident_date_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="incident_date_4"
                      name="incident_date"
                      value={formData4.incident_date}
                      onChange={handleChange4}
                      placeholder="mm/dd/yyyy or per spec"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Incident Position */}
                  <div>
                    <label htmlFor="incidentposition_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Incident Position <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="incidentposition_4"
                      name="incidentposition"
                      value={formData4.incidentposition}
                      onChange={handleChange4}
                      placeholder="Driver / Passenger / Pedestrian"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Settlement */}
                  <div>
                    <label htmlFor="settlement_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Settlement <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="settlement_4"
                      name="settlement"
                      value={formData4.settlement}
                      onChange={handleChange4}
                      placeholder="Yes / No"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Channel */}
                  <div>
                    <label htmlFor="channel_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Channel <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="channel_4"
                      name="channel"
                      value={formData4.channel}
                      onChange={handleChange4}
                      placeholder="Example"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Cited */}
                  <div>
                    <label htmlFor="cited_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Cited <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cited_4"
                      name="cited"
                      value={formData4.cited}
                      onChange={handleChange4}
                      placeholder="Yes / No"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Change Attorney */}
                  <div>
                    <label htmlFor="changeattorney_4" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Change Attorney <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="changeattorney_4"
                      name="changeattorney"
                      value={formData4.changeattorney}
                      onChange={handleChange4}
                      placeholder="Yes / No"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status4 === "loading"}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status4 === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
          )}
        </div>
      </div>
    </div>
  );
}
