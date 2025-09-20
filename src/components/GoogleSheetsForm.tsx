/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import './styles/GoogleSheetsForms.css';
import { User, Mail, Phone, IdCard, Github, Send, CheckCircle } from 'lucide-react';

interface FormData {
  Name: string;
  Email: string;
  Phone: string;
  AdmissionID: string;
  GithubURL: string;
}

const GoogleSheetsForm: React.FC = () => {
  const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

  const [formData, setFormData] = useState<FormData>({
    Name: '',
    Email: '',
    Phone: '',
    AdmissionID: '',
    GithubURL: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Check required fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        const fieldName = key === 'AdmissionID' ? 'Admission ID' : 
                         key === 'GithubURL' ? 'GitHub URL' : key;
        newErrors[key] = `${fieldName} is required`;
      }
    });

    // Validate email format
    if (formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = 'Please enter a valid email address';
    }

    // Validate GitHub URL format
    if (formData.GithubURL && !formData.GithubURL.includes('github.com')) {
      newErrors.GithubURL = 'Please enter a valid GitHub URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    const form = new FormData();
    form.append('Timestamp', new Date().toISOString());
    form.append('Name', formData.Name);
    form.append('Email', formData.Email);
    form.append('Phone', formData.Phone);
    form.append('AdmissionID', formData.AdmissionID);
    form.append('GithubURL', formData.GithubURL);

    const res = await fetch(googleSheetsUrl, { method: 'POST', body: form });
    if (!res.ok) throw new Error('Failed to submit');
    return await res.text();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await submitForm();
      setSubmitSuccess(true);
      setFormData({ Name:'', Email:'', Phone:'', AdmissionID:'', GithubURL:'' });
      setTimeout(() => setSubmitSuccess(false), 10000); // revert after 10 seconds
    } catch {
      alert('Submission failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (field: keyof FormData, Icon: any, placeholder: string, type: string = 'text') => (
    <div className="input-wrapper">
      <Icon className="input-icon" />
      <input
        type={type}
        placeholder={placeholder}
        value={formData[field]}
        onChange={e => handleInputChange(field, e.target.value)}
      />
      {errors[field] && <div className="error-message">{errors[field]}</div>}
    </div>
  );

  return (
    <div id="form" className="form-container">
      <div className="form-grid">
        <div className="left-section">
          <h2>Student Registration</h2>
          <p>Please fill out all the required information. Our team will review your submission and get back to you shortly.</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            {renderInput('Name', User, 'Full Name *')}
            {renderInput('Email', Mail, 'Email Address *', 'email')}
            {renderInput('Phone', Phone, 'Phone Number *', 'tel')}
            {renderInput('AdmissionID', IdCard, 'Admission ID *')}
            {renderInput('GithubURL', Github, 'GitHub Profile URL *', 'url')}

            <button type="submit" disabled={isSubmitting}>
              {submitSuccess ? (
                <><CheckCircle className="inline-block mr-2"/>Registration Submitted Successfully!</>
              ) : (
                <>{isSubmitting ? 'Submitting...' : <><Send className="inline-block mr-2"/>Submit Registration</>}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetsForm;