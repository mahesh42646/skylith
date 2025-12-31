'use client';

import { useState, useEffect } from 'react';
import { FiHelpCircle, FiX, FiMessageCircle } from 'react-icons/fi';

export default function FloatingHelpPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      type: 'help',
    };

    try {
      const response = await fetch('/api/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Thank you! We will get back to you soon.');
        e.target.reset();
        setIsOpen(false);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className="btn btn-gradient rounded-circle position-fixed"
        style={{
          width: '60px',
          height: '60px',
          bottom: '30px',
          right: '30px',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(107, 70, 193, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        <FiHelpCircle />
      </button>

      {isOpen && (
        <div
          className="position-fixed glass rounded-4 p-4"
          style={{
            bottom: '110px',
            right: '30px',
            width: '350px',
            maxWidth: '90vw',
            zIndex: 1001,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            transform: isMinimized ? 'scale(0.8) translateY(20px)' : 'scale(1)',
            opacity: isMinimized ? 0 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold" style={{ color: 'var(--dark-purple)' }}>
              <FiMessageCircle className="me-2" />
              Need Help?
            </h5>
            <div>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="btn btn-sm me-2"
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-light)'
                }}
              >
                −
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm"
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-light)'
                }}
              >
                <FiX />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                  required
                  style={{
                    borderRadius: '10px',
                    border: '1px solid rgba(107, 70, 193, 0.2)',
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Your Email"
                  required
                  style={{
                    borderRadius: '10px',
                    border: '1px solid rgba(107, 70, 193, 0.2)',
                  }}
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control"
                  rows="3"
                  placeholder="How can we help?"
                  required
                  style={{
                    borderRadius: '10px',
                    border: '1px solid rgba(107, 70, 193, 0.2)',
                  }}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-gradient w-100">
                Send Message
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

