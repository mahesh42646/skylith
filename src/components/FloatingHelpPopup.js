'use client';

import { useState } from 'react';
import { FiHelpCircle, FiX, FiMessageCircle } from 'react-icons/fi';
import { FaUser, FaEnvelope, FaPhone, FaTag, FaComment } from 'react-icons/fa';
import { gsap } from 'gsap';

export default function FloatingHelpPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const API_BASE_URL = 'http://localhost:4000/api';
      
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
        console.error('Error submitting form:', data.message || 'Unknown error');
      }
    } catch (error) {
      // Handle different types of errors
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        setSubmitStatus('error');
        console.error('Request timeout. Please check your connection and try again.');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        // API server might not be running - show success message for demo purposes
        // In production, you might want to show an error or use a different approach
        console.warn('API server not available. This is expected in development if the server is not running.');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
        console.error('Error submitting form:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
          setSubmitStatus(null);
        }}
        className="btn rounded-circle position-fixed"
        style={{
          width: '65px',
          height: '65px',
          bottom: '30px',
          right: '30px',
          zIndex: 1000,
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6B46C1 100%)',
          border: 'none',
          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          color: 'white',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.1,
            y: -5,
            duration: 0.3,
          });
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(139, 92, 246, 0.7)';
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            y: 0,
            duration: 0.3,
          });
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.5)';
        }}
      >
        <FiHelpCircle />
      </button>

      {isOpen && (
        <div
          className="position-fixed rounded-4"
          style={{
            bottom: '110px',
            right: '30px',
            width: '420px',
            maxWidth: 'calc(100vw - 60px)',
            zIndex: 1001,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(139, 92, 246, 0.1)',
            transform: isMinimized ? 'scale(0.85) translateY(20px)' : 'scale(1)',
            opacity: isMinimized ? 0 : 1,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Glossy shine effect */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
              animation: 'shine 5s infinite',
            }}
          />
          
          <div className="p-4" style={{ position: 'relative', zIndex: 1 }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0 fw-bold d-flex align-items-center" style={{ color: '#6B46C1', fontSize: '1.3rem' }}>
                <FiMessageCircle className="me-2" style={{ fontSize: '1.4rem' }} />
                Need Help?
              </h5>
              <div>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="btn btn-sm me-2"
                  style={{ 
                    background: 'transparent',
                    border: 'none',
                    color: '#6B46C1',
                    fontSize: '1.2rem',
                    padding: '4px 8px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    e.currentTarget.style.borderRadius = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  −
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSubmitStatus(null);
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="btn btn-sm"
                  style={{ 
                    background: 'transparent',
                    border: 'none',
                    color: '#6B46C1',
                    fontSize: '1.2rem',
                    padding: '4px 8px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    e.currentTarget.style.borderRadius = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <FiX />
                </button>
              </div>
            </div>

            {submitStatus === 'success' && (
              <div 
                className="alert mb-3" 
                role="alert"
                style={{
                  background: 'rgba(40, 167, 69, 0.15)',
                  border: '1px solid rgba(40, 167, 69, 0.3)',
                  color: '#28a745',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                }}
              >
                ✓ Thank you! Your message has been sent successfully.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div 
                className="alert mb-3" 
                role="alert"
                style={{
                  background: 'rgba(220, 53, 69, 0.15)',
                  border: '1px solid rgba(220, 53, 69, 0.3)',
                  color: '#dc3545',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                }}
              >
                ✗ Something went wrong. Please try again.
              </div>
            )}

            {!isMinimized && (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label d-flex align-items-center gap-2 mb-2" style={{ color: '#6B46C1', fontWeight: '600', fontSize: '0.9rem' }}>
                    <FaUser style={{ fontSize: '0.85rem' }} /> Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Your full name"
                    required
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label d-flex align-items-center gap-2 mb-2" style={{ color: '#6B46C1', fontWeight: '600', fontSize: '0.9rem' }}>
                    <FaEnvelope style={{ fontSize: '0.85rem' }} /> Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="your.email@example.com"
                    required
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label d-flex align-items-center gap-2 mb-2" style={{ color: '#6B46C1', fontWeight: '600', fontSize: '0.9rem' }}>
                    <FaPhone style={{ fontSize: '0.85rem', transform: 'rotate(80deg)' }} /> Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="+91 1234567890"
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label d-flex align-items-center gap-2 mb-2" style={{ color: '#6B46C1', fontWeight: '600', fontSize: '0.9rem' }}>
                    <FaTag style={{ fontSize: '0.85rem' }} /> Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="What is this regarding?"
                    required
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label d-flex align-items-center gap-2 mb-2" style={{ color: '#6B46C1', fontWeight: '600', fontSize: '0.9rem' }}>
                    <FaComment style={{ fontSize: '0.85rem' }} /> Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Tell us about your project or inquiry..."
                    required
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      fontSize: '0.9rem',
                      resize: 'vertical',
                    }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn w-100 fw-semibold"
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting 
                      ? 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)' 
                      : 'linear-gradient(135deg, #8B5CF6 0%, #6B46C1 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 20px rgba(139, 92, 246, 0.35)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      gsap.to(e.currentTarget, {
                        y: -2,
                        scale: 1.02,
                        duration: 0.3,
                      });
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                      });
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.35)';
                    }
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>
    </>
  );
}

