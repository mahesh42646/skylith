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
      { href: '/teams', label: 'Teams' },
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
        background: 'linear-gradient(180deg, rgba(88, 28, 135, 0.98) 0%, rgba(109, 40, 217, 0.95) 30%, rgba(139, 92, 246, 0.92) 60%, rgba(167, 139, 250, 0.95) 80%, rgba(196, 181, 253, 0.98) 100%)',
        padding: 'clamp(60px, 8vw, 100px) 0 clamp(30px, 4vw, 50px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Enhanced decorative background elements */}
      <div
        className="position-absolute"
        style={{
          top: '-150px',
          right: '-150px',
          width: 'clamp(300px, 40vw, 500px)',
          height: 'clamp(300px, 40vw, 500px)',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(167, 139, 250, 0.1) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="position-absolute"
        style={{
          bottom: '-200px',
          left: '-200px',
          width: 'clamp(400px, 50vw, 600px)',
          height: 'clamp(400px, 50vw, 600px)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.15) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="position-absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(200px, 30vw, 400px)',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      {/* Enhanced glassmorphism overlay */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          top: 0,
          left: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(167, 139, 250, 0.05) 50%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          zIndex: 0,
        }}
      />
      
      {/* Animated gradient overlay */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          top: 0,
          left: 0,
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(109, 40, 217, 0.08) 50%, rgba(139, 92, 246, 0.1) 100%)',
          opacity: 0.6,
          animation: 'pulse 8s ease-in-out infinite',
          zIndex: 0,
        }}
      />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row g-4 mb-5">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 col-12 mb-4 mb-md-0">
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                borderRadius: '24px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 12px 40px rgba(88, 28, 135, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
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
                  fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                  position: 'relative',
                  zIndex: 1,
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.3)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(240, 237, 255, 0.95) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Skylith
              </h4>
              <p 
                className="mb-4" 
                style={{ 
                  opacity: 0.95,
                  lineHeight: '1.8',
                  fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                  position: 'relative',
                  zIndex: 1,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                Leading provider of innovative services and products. 
                We deliver excellence through cutting-edge solutions.
              </p>
              
              {/* Social Media Icons */}
              <div className="d-flex gap-3 flex-wrap" style={{ position: 'relative', zIndex: 1 }}>
                {socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="social-link d-flex align-items-center justify-content-center"
                      style={{
                        width: 'clamp(42px, 5vw, 50px)',
                        height: 'clamp(42px, 5vw, 50px)',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        boxShadow: '0 4px 15px rgba(88, 28, 135, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = social.color;
                        e.currentTarget.style.borderColor = social.color;
                        e.currentTarget.style.boxShadow = `0 8px 25px ${social.color}70`;
                        e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(88, 28, 135, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
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
          <div className="col-lg-2 col-md-6 col-12 mb-4 mb-md-0">
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                height: '100%',
              }}
            >
              <h5 
                className="fw-bold mb-4" 
                style={{ 
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                Company
              </h5>
              <ul className="list-unstyled mb-0">
                {footerLinks.company.map((link) => (
                  <li key={link.href} className="mb-3">
                    <Link 
                      href={link.href} 
                      className="text-white d-inline-block"
                      style={{ 
                        opacity: 0.9, 
                        textDecoration: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px',
                        display: 'block',
                      }}
                      onClick={handleLinkClick}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.9';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.textShadow = 'none';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="col-lg-2 col-md-6 col-12 mb-4 mb-md-0">
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                height: '100%',
              }}
            >
              <h5 
                className="fw-bold mb-4" 
                style={{ 
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                Legal
              </h5>
              <ul className="list-unstyled mb-0">
                {footerLinks.legal.map((link) => (
                  <li key={link.href} className="mb-3">
                    <Link 
                      href={link.href} 
                      className="text-white d-inline-block"
                      style={{ 
                        opacity: 0.9, 
                        textDecoration: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px',
                        display: 'block',
                      }}
                      onClick={handleLinkClick}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.9';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.textShadow = 'none';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources Links */}
          <div className="col-lg-2 col-md-6 col-12 mb-4 mb-md-0">
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                height: '100%',
              }}
            >
              <h5 
                className="fw-bold mb-4" 
                style={{ 
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                Resources
              </h5>
              <ul className="list-unstyled mb-0">
                {footerLinks.resources.map((link) => (
                  <li key={link.href} className="mb-3">
                    <Link 
                      href={link.href} 
                      className="text-white d-inline-block"
                      style={{ 
                        opacity: 0.9, 
                        textDecoration: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px',
                        display: 'block',
                      }}
                      onClick={handleLinkClick}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.9';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.textShadow = 'none';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-lg-2 col-md-6 col-12 mb-4 mb-md-0">
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                height: '100%',
              }}
            >
              <h5 
                className="fw-bold mb-4" 
                style={{ 
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                Contact
              </h5>
              <ul className="list-unstyled mb-0" style={{ opacity: 0.95 }}>
                <li className="mb-3 d-flex align-items-start">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '0.75rem',
                      flexShrink: 0,
                    }}
                  >
                    <FaEnvelope style={{ fontSize: '0.9rem', color: 'white' }} />
                  </div>
                  <a 
                    href="mailto:skylithsystems@gmail.com" 
                    className="text-white"
                    style={{ 
                      textDecoration: 'none',
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      transition: 'all 0.3s ease',
                      wordBreak: 'break-word',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.95';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                     team@skyliths.com
                  </a>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '0.75rem',
                      flexShrink: 0,
                    }}
                  >
                    <FaPhone style={{ fontSize: '0.9rem', color: 'white', transform: 'rotate(80deg)' }} />
                  </div>
                  <a 
                    href="tel:+919209965565" 
                    className="text-white"
                    style={{ 
                      textDecoration: 'none',
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.95';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    +919209965565
                  </a>
                </li>
                <li className="mb-0 d-flex align-items-start">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '0.75rem',
                      flexShrink: 0,
                    }}
                  >
                    <FaMapMarkerAlt style={{ fontSize: '0.9rem', color: 'white' }} />
                  </div>
                  <span style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', lineHeight: '1.6' }}>
                    Kharadi,Pune  
                  </span>
                </li>
              </ul>
            </div>
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
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(15px)',
                borderRadius: '18px',
                padding: 'clamp(1.2rem, 3vw, 1.8rem)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 20px rgba(88, 28, 135, 0.15)',
              }}
            >
              <p className="mb-0" style={{ opacity: 0.95, fontSize: 'clamp(0.9rem, 2vw, 1rem)', color: 'rgba(255, 255, 255, 0.9)' }}>
                &copy; {currentYear} Skylith. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

