'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { gsap } from 'gsap';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.15,
          y: -5,
          rotation: 5,
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }, []);

  const footerLinks = {
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/services', label: 'Services' },
      { href: '/contact', label: 'Contact' },
    ],
    legal: [
      { href: '/terms', label: 'Terms & Conditions' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
    resources: [
      { href: '/help', label: 'Help Center' },
      { href: '/blog', label: 'Blog' },
    ],
  };

  const socialMedia = [
    { icon: FaFacebookF, href: '#', color: '#1877F2' },
    { icon: FaTwitter, href: '#', color: '#1DA1F2' },
    { icon: FaLinkedinIn, href: '#', color: '#0077B5' },
    { icon: FaInstagram, href: '#', color: '#E4405F' },
  ];

  return (
    <footer 
      className="text-white"
      style={{ 
        background: 'linear-gradient(135deg, #2D1B4E 0%, #6B46C1 50%, #8B5CF6 100%)',
        padding: '80px 0 30px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <div
        className="position-absolute"
        style={{
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="position-absolute"
        style={{
          bottom: '-150px',
          left: '-150px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />

      {/* Glassmorphism overlay */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          top: 0,
          left: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          zIndex: 0,
        }}
      />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row g-4 mb-5">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '25px',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
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
              
              <h4 
                className="fw-bold mb-4" 
                style={{ 
                  fontSize: '2rem',
                  position: 'relative',
                  zIndex: 1,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                }}
              >
                Skylith
              </h4>
              <p 
                className="mb-4" 
                style={{ 
                  opacity: 0.95,
                  lineHeight: '1.8',
                  fontSize: '1rem',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Leading provider of innovative services and products. 
                We deliver excellence through cutting-edge solutions.
              </p>
              
              {/* Social Media Icons */}
              <div className="d-flex gap-3" style={{ position: 'relative', zIndex: 1 }}>
                {socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="social-link d-flex align-items-center justify-content-center"
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        fontSize: '1.2rem',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = social.color;
                        e.currentTarget.style.borderColor = social.color;
                        e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}50`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 
              className="fw-bold mb-4" 
              style={{ 
                fontSize: '1.2rem',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Company
            </h5>
            <ul className="list-unstyled">
              {footerLinks.company.map((link) => (
                <li key={link.href} className="mb-3">
                  <Link 
                    href={link.href} 
                    className="text-white d-inline-block"
                    style={{ 
                      opacity: 0.9, 
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontSize: '0.95rem',
                    }}
                    onClick={handleLinkClick}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(5px)';
                      e.currentTarget.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 
              className="fw-bold mb-4" 
              style={{ 
                fontSize: '1.2rem',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Legal
            </h5>
            <ul className="list-unstyled">
              {footerLinks.legal.map((link) => (
                <li key={link.href} className="mb-3">
                  <Link 
                    href={link.href} 
                    className="text-white d-inline-block"
                    style={{ 
                      opacity: 0.9, 
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontSize: '0.95rem',
                    }}
                    onClick={handleLinkClick}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(5px)';
                      e.currentTarget.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 
              className="fw-bold mb-4" 
              style={{ 
                fontSize: '1.2rem',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Resources
            </h5>
            <ul className="list-unstyled">
              {footerLinks.resources.map((link) => (
                <li key={link.href} className="mb-3">
                  <Link 
                    href={link.href} 
                    className="text-white d-inline-block"
                    style={{ 
                      opacity: 0.9, 
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontSize: '0.95rem',
                    }}
                    onClick={handleLinkClick}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(5px)';
                      e.currentTarget.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 
              className="fw-bold mb-4" 
              style={{ 
                fontSize: '1.2rem',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Contact
            </h5>
            <ul className="list-unstyled" style={{ opacity: 0.9 }}>
              <li className="mb-3 d-flex align-items-start">
                <FaEnvelope className="me-2 mt-1" style={{ fontSize: '1rem' }} />
                <a 
                  href="mailto:skylithsystems@gmail.com" 
                  className="text-white"
                  style={{ 
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  skylithsystems@gmail.com
                </a>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <FaPhone className="me-2 mt-1" style={{ fontSize: '1rem' }} />
                <a 
                  href="tel:+919209965565" 
                  className="text-white"
                  style={{ 
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  +91 9209965565
                </a>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <FaMapMarkerAlt className="me-2 mt-1" style={{ fontSize: '1rem' }} />
                <span style={{ fontSize: '0.95rem' }}>123 Business St, City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with glassmorphism */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            margin: '3rem 0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          }}
        />

        {/* Copyright Section */}
        <div className="row">
          <div className="col-12 text-center">
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <p className="mb-0" style={{ opacity: 0.9, fontSize: '0.95rem' }}>
                &copy; {currentYear} Skylith. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

