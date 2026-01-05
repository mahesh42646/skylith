'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home', mobileLabel: 'Home' },
    { href: '/about', label: 'About Us', mobileLabel: 'About' },
    { href: '/services', label: 'Services', mobileLabel: 'Services' },
    { href: '/blog', label: 'Blog', mobileLabel: 'Blog' },
    { href: '/contact', label: 'Contact', mobileLabel: 'Contact' },
  ];

  return (
    <>
    <header 
        className="fixed-top"
        style={{ 
          background: isScrolled 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          boxShadow: isScrolled 
            ? '0 10px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
            : '0 4px 30px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line - Purple gradient for desktop */}
        <div
          className="d-none d-lg-block"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), rgba(167, 139, 250, 0.5), rgba(139, 92, 246, 0.7), rgba(167, 139, 250, 0.5), rgba(139, 92, 246, 0.3), transparent)',
            pointerEvents: 'none',
          }}
        />
        
        <nav className="navbar navbar-expand-lg" style={{ padding: '1rem 0', position: 'relative', zIndex: 1 }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo - Desktop and Mobile */}
            <Link 
              className="navbar-brand" 
              href="/" 
              onClick={handleLinkClick}
              style={{ 
                textDecoration: 'none',
                position: 'relative',
                zIndex: 1001,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                height: '70px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
                const img = e.currentTarget.querySelector('img');
                if (img) {
                  img.style.filter = 'brightness(1.15) drop-shadow(0 0 25px rgba(139, 92, 246, 0.6))';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                const img = e.currentTarget.querySelector('img');
                if (img) {
                  img.style.filter = 'brightness(1) drop-shadow(0 0 18px rgba(139, 92, 246, 0.4))';
                }
              }}
            >
              {/* Desktop Logo - Larger */}
              <Image
                src="/skylithlogo.png"
                alt="Skylith Logo"
                width={180}
                height={150}
                priority
                className="d-none d-lg-block"
                style={{
                  height: 'auto',
                  width: 'auto',
                  maxHeight: '220px',
                  maxWidth: '400px',
                  objectFit: 'contain',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: 'brightness(1) drop-shadow(0 0 18px rgba(139, 92, 246, 0.4))',
                }}
              />
              {/* Mobile Logo - Increased Size */}
              <Image
                src="/skylithlogo.png"
                alt="Skylith Logo"
                width={160}
                height={130}
                priority
                className="d-lg-none"
                style={{
                  height: 'auto',
                  width: 'auto',
                  maxHeight: '220px',
                  maxWidth: '350px',
                  objectFit: 'contain',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: 'brightness(1) drop-shadow(0 0 18px rgba(139, 92, 246, 0.4))',
                }}
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="d-none d-lg-flex align-items-center" style={{ gap: '0.75rem' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  style={{ 
                    color: pathname === link.href ? 'white' : 'rgba(88, 28, 135, 0.9)',
                    fontWeight: pathname === link.href ? '600' : '500',
                    fontSize: '1.15rem',
                    textDecoration: 'none',
                    position: 'relative',
                    padding: '0.75rem 1.4rem',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '12px',
                    background: pathname === link.href 
                      ? 'linear-gradient(135deg, rgba(88, 28, 135, 0.95) 0%, rgba(109, 40, 217, 0.9) 50%, rgba(139, 92, 246, 0.95) 100%)' 
                      : 'transparent',
                    backdropFilter: pathname === link.href ? 'blur(10px)' : 'none',
                    border: 'none',
                    boxShadow: pathname === link.href 
                      ? '0 8px 32px rgba(88, 28, 135, 0.4), 0 4px 16px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)' 
                      : 'none',
                    transform: pathname === link.href ? 'translateY(-2px)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== link.href) {
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(88, 28, 135, 0.9) 0%, rgba(109, 40, 217, 0.85) 50%, rgba(139, 92, 246, 0.9) 100%)';
                      e.currentTarget.style.backdropFilter = 'blur(10px)';
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(88, 28, 135, 0.5), 0 6px 20px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.15)';
                    } else {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(88, 28, 135, 0.5), 0 6px 20px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== link.href) {
                      e.currentTarget.style.color = 'rgba(88, 28, 135, 0.95)';
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.backdropFilter = 'none';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    } else {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(88, 28, 135, 0.4), 0 4px 16px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '50%',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9), transparent)',
                        borderRadius: '2px',
                        boxShadow: '0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)',
                      }}
                    />
                  )}
                </Link>
              ))}
              <Link 
                href="/contact" 
                onClick={handleLinkClick}
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(99, 102, 241, 0.95) 100%)',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.15rem',
                  letterSpacing: '0.3px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(139, 92, 246, 0.5)',
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 35px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(99, 102, 241, 1) 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(99, 102, 241, 0.95) 100%)';
                }}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="d-lg-none"
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '0.5rem',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1001,
                width: '40px',
                height: '40px',
                display: isMobileMenuOpen ? 'none' : 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                transition: 'opacity 0.3s ease, visibility 0.3s ease',
                opacity: isMobileMenuOpen ? 0 : 1,
                visibility: isMobileMenuOpen ? 'hidden' : 'visible',
              }}
              aria-label="Toggle menu"
            >
              <span
                style={{
                  width: '25px',
                  height: '3px',
                  background: 'rgba(88, 28, 135, 0.9)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: isMobileMenuOpen ? 'rotate(45deg) translate(8px, 8px)' : 'none',
                }}
              />
              <span
                style={{
                  width: '25px',
                  height: '3px',
                  background: 'rgba(88, 28, 135, 0.9)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <span
      style={{ 
                  width: '25px',
                  height: '3px',
                  background: 'rgba(88, 28, 135, 0.9)',
                  borderRadius: '2px',
        transition: 'all 0.3s ease',
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none',
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: isMobileMenuOpen ? 0 : '-100%',
          width: '340px',
          height: '100vh',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 237, 255, 0.96) 20%, rgba(226, 222, 235, 0.94) 40%, rgba(196, 181, 253, 0.92) 60%, rgba(167, 139, 250, 0.94) 80%, rgba(139, 92, 246, 0.96) 100%)',
          backdropFilter: 'blur(35px) saturate(200%)',
          WebkitBackdropFilter: 'blur(35px) saturate(200%)',
          zIndex: 1000,
          transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isMobileMenuOpen ? '8px 0 50px rgba(88, 28, 135, 0.3), 4px 0 30px rgba(139, 92, 246, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.2)' : 'none',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(167, 139, 250, 0.4)',
        }}
      >
        {/* Sidebar Header with Brand Logo */}
        <div style={{ 
          padding: '2rem 1.8rem 1.5rem',
          borderBottom: '1px solid rgba(167, 139, 250, 0.35)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(240, 237, 255, 0.12) 100%)',
          backdropFilter: 'blur(15px)',
          position: 'relative',
        }}>
          {/* Header accent line */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), rgba(167, 139, 250, 0.6), rgba(139, 92, 246, 0.5), transparent)',
          }} />
          <Link 
            href="/" 
            onClick={handleLinkClick}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
              const img = e.currentTarget.querySelector('img');
              if (img) {
                img.style.filter = 'brightness(1.1) drop-shadow(0 0 25px rgba(139, 92, 246, 0.6))';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              const img = e.currentTarget.querySelector('img');
              if (img) {
                img.style.filter = 'brightness(1) drop-shadow(0 0 18px rgba(139, 92, 246, 0.4))';
              }
            }}
          >
            <Image
              src="/skylithlogo.png"
              alt="Skylith Logo"
              width={160}
              height={130}
              priority
              style={{
                height: 'auto',
                width: 'auto',
                maxHeight: '220px',
                maxWidth: '350px',
                objectFit: 'contain',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'brightness(1) drop-shadow(0 0 18px rgba(139, 92, 246, 0.4))',
              }}
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.25) 100%)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: 'rgba(88, 28, 135, 0.95)',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: '600',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(88, 28, 135, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(109, 40, 217, 0.4) 100%)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(88, 28, 135, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.25) 100%)';
              e.currentTarget.style.color = 'rgba(88, 28, 135, 0.95)';
              e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(88, 28, 135, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
          >
            ×
          </button>
        </div>

        {/* Sidebar Content */}
        <div style={{ padding: '2.5rem 1.8rem', flex: 1 }}>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link, index) => (
                  <Link
                key={link.href}
                    href={link.href}
                onClick={handleLinkClick}
                    style={{ 
                  color: pathname === link.href ? 'white' : 'rgba(88, 28, 135, 0.95)',
                  textDecoration: 'none',
                  padding: '1.1rem 1.5rem',
                  borderRadius: '14px',
                    background: pathname === link.href 
                      ? 'linear-gradient(135deg, rgba(88, 28, 135, 0.95) 0%, rgba(109, 40, 217, 0.9) 50%, rgba(139, 92, 246, 0.95) 100%)' 
                      : 'rgba(255, 255, 255, 0.4)',
                    border: pathname === link.href 
                      ? '1px solid rgba(139, 92, 246, 0.6)' 
                      : '1px solid rgba(167, 139, 250, 0.35)',
                    backdropFilter: 'blur(14px)',
                  fontWeight: pathname === link.href ? '600' : '500',
                  fontSize: '1.2rem',
                  letterSpacing: '0.3px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'block',
                  position: 'relative',
                  boxShadow: pathname === link.href 
                    ? '0 8px 24px rgba(88, 28, 135, 0.35), 0 4px 12px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                    : '0 2px 8px rgba(139, 92, 246, 0.1)',
                  animation: isMobileMenuOpen 
                    ? `slideInLeft 0.4s ease ${index * 0.1}s both` 
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(88, 28, 135, 0.85) 0%, rgba(109, 40, 217, 0.8) 50%, rgba(139, 92, 246, 0.85) 100%)';
                    e.currentTarget.style.border = '1px solid rgba(139, 92, 246, 0.7)';
                    e.currentTarget.style.transform = 'translateX(8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(88, 28, 135, 0.4), 0 6px 16px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                  } else {
                    e.currentTarget.style.transform = 'translateX(4px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(88, 28, 135, 0.4), 0 6px 16px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    e.currentTarget.style.color = 'rgba(88, 28, 135, 0.95)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.border = '1px solid rgba(167, 139, 250, 0.35)';
                    e.currentTarget.style.transform = 'translateX(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.1)';
                  } else {
                    e.currentTarget.style.transform = 'translateX(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(88, 28, 135, 0.35), 0 4px 12px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  }
                }}
                  >
                    {link.mobileLabel || link.label}
                    {pathname === link.href && (
                      <span
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.9)',
                          boxShadow: '0 0 12px rgba(255, 255, 255, 0.8), 0 0 24px rgba(139, 92, 246, 0.6)',
                        }}
                      />
                    )}
                  </Link>
              ))}
            
            {/* Get Started Button */}
                <Link 
                  href="/contact" 
                  onClick={handleLinkClick}
              style={{
                marginTop: '1.5rem',
                padding: '1.2rem 1.8rem',
                background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.95) 0%, rgba(109, 40, 217, 0.98) 50%, rgba(139, 92, 246, 0.95) 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '1.15rem',
                letterSpacing: '0.5px',
                textAlign: 'center',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 28px rgba(88, 28, 135, 0.4), 0 4px 16px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.6)',
                backdropFilter: 'blur(14px)',
                position: 'relative',
                overflow: 'hidden',
                animation: isMobileMenuOpen 
                  ? `slideInLeft 0.4s ease ${navLinks.length * 0.1}s both` 
                  : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(88, 28, 135, 0.5), 0 6px 20px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(88, 28, 135, 1) 0%, rgba(109, 40, 217, 1) 50%, rgba(139, 92, 246, 1) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(88, 28, 135, 0.4), 0 4px 16px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(88, 28, 135, 0.95) 0%, rgba(109, 40, 217, 0.98) 50%, rgba(139, 92, 246, 0.95) 100%)';
              }}
                >
                  Get Started
                </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease',
          }}
        />
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </>
  );
}

