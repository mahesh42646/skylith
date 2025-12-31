'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header 
      className="fixed-top shadow-lg"
      style={{ 
        background: 'var(--dark-purple)',
        transition: 'all 0.3s ease',
        zIndex: 1000 
      }}
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link 
            className="navbar-brand fw-bold fs-3" 
            href="/" 
            style={{ color: 'var(--white)' }}
            onClick={handleLinkClick}
          >
            Skylith
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'var(--white)'
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-center">
              {navLinks.map((link) => (
                <li key={link.href} className="nav-item">
                  <Link
                    className={`nav-link mx-2 ${pathname === link.href ? 'active' : ''}`}
                    href={link.href}
                    style={{ 
                      color: 'var(--white)',
                      fontWeight: pathname === link.href ? '600' : '400'
                    }}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="nav-item ms-3">
                <Link 
                  href="/contact" 
                  className="btn btn-gradient text-white"
                  onClick={handleLinkClick}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

