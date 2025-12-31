'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Privacy() {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);

  useEffect(() => {
    const animations = [];
    const scrollTriggers = [];

    // Reset and refresh ScrollTrigger
    ScrollTrigger.getAll().forEach(st => st.kill());
    ScrollTrigger.refresh();

    // Parallax effect
    if (parallaxRef.current && heroRef.current) {
      gsap.set(parallaxRef.current, { yPercent: 0 });
      const anim = gsap.to(parallaxRef.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      animations.push(anim);
      if (anim.scrollTrigger) {
        scrollTriggers.push(anim.scrollTrigger);
      }
    }

    // Animated elements - different style for privacy
    if (image1Ref.current) {
      gsap.set(image1Ref.current, { scale: 1, opacity: 0.7 });
      const anim = gsap.to(image1Ref.current, {
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        duration: 3.5,
        repeat: -1,
        ease: 'power1.inOut',
      });
      animations.push(anim);
    }
    if (image2Ref.current) {
      gsap.set(image2Ref.current, { x: 0, y: 0, rotation: 0 });
      const anim = gsap.to(image2Ref.current, {
        x: [0, 20, 0],
        y: [0, -20, 0],
        rotation: [0, 90, 0],
        duration: 6,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 0.3,
      });
      animations.push(anim);
    }
    if (image3Ref.current) {
      gsap.set(image3Ref.current, { scale: 1, rotation: 0 });
      const anim = gsap.to(image3Ref.current, {
        scale: [1, 1.4, 1],
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'none',
      });
      animations.push(anim);
    }

    // Cleanup function
    return () => {
      animations.forEach(anim => {
        if (anim && anim.kill) anim.kill();
      });
      scrollTriggers.forEach(st => {
        if (st && st.kill) st.kill();
      });
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="hero-section"
          style={{ 
            minHeight: '40vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(107, 70, 193, 0.05) 0%, rgba(255, 255, 255, 0.98) 30%, rgba(248, 249, 250, 0.95) 100%)',
            paddingTop: '180px',
            paddingBottom: '60px',
          }}
        >
          {/* Unique Privacy Background Pattern */}
          <div 
            ref={parallaxRef}
            className="position-absolute w-100 h-100"
            style={{
              top: 0,
              left: 0,
              zIndex: 0,
              overflow: 'hidden',
            }}
          >
            {/* Shield/security-inspired shapes */}
            <div 
              className="position-absolute"
              style={{
                width: '480px',
                height: '480px',
                background: 'linear-gradient(135deg, rgba(107, 70, 193, 0.1) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 100%)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                top: '-80px',
                right: '-60px',
                filter: 'blur(45px)',
                transform: 'rotate(20deg)',
              }}
            />
            <div 
              className="position-absolute"
              style={{
                width: '420px',
                height: '420px',
                background: 'linear-gradient(225deg, rgba(139, 92, 246, 0.12) 0%, rgba(107, 70, 193, 0.09) 100%)',
                clipPath: 'polygon(50% 0%, 100% 35%, 100% 100%, 0% 100%, 0% 35%)',
                bottom: '-70px',
                left: '-50px',
                filter: 'blur(40px)',
                transform: 'rotate(-15deg)',
              }}
            />
            <div 
              className="position-absolute"
              style={{
                width: '260px',
                height: '260px',
                background: 'radial-gradient(circle, rgba(45, 27, 78, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                top: '48%',
                left: '48%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(30px)',
              }}
            />
            
            {/* Security pattern - concentric circles */}
            <div 
              className="position-absolute w-100 h-100"
              style={{
                backgroundImage: `
                  radial-gradient(circle, rgba(107, 70, 193, 0.06) 1px, transparent 1px),
                  radial-gradient(circle, rgba(107, 70, 193, 0.04) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px, 120px 120px',
                backgroundPosition: '0 0, 30px 30px',
                opacity: 0.5,
              }}
            />
            
            {/* Animated security elements */}
            <div 
              ref={image1Ref}
              className="position-absolute d-none d-lg-block"
              style={{
                width: '90px',
                height: '90px',
                border: '4px solid rgba(107, 70, 193, 0.25)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                top: '18%',
                right: '18%',
                zIndex: 1,
              }}
            />
            <div 
              ref={image2Ref}
              className="position-absolute d-none d-lg-block"
              style={{
                width: '70px',
                height: '70px',
                background: 'rgba(139, 92, 246, 0.2)',
                borderRadius: '50%',
                border: '3px solid rgba(107, 70, 193, 0.3)',
                bottom: '22%',
                left: '16%',
                zIndex: 1,
              }}
            />
            <div 
              ref={image3Ref}
              className="position-absolute d-none d-md-block"
              style={{
                width: '55px',
                height: '55px',
                border: '3px solid rgba(107, 70, 193, 0.25)',
                borderRadius: '50%',
                top: '52%',
                right: '24%',
                zIndex: 1,
              }}
            />
          </div>

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row align-items-center" style={{ minHeight: 'calc(40vh - 120px)' }}>
              <div className="col-lg-8 mx-auto text-center">
                <div 
                  className="mb-4"
                  style={{
                    fontSize: '4rem',
                    lineHeight: '1',
                  }}
                >
                  🔒
                </div>
                <h1 
                  className="fw-bold mb-4"
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    color: 'var(--dark-purple)',
                    lineHeight: '1.2',
                    fontWeight: '700'
                  }}
                >
                  Privacy Policy
                </h1>
                <p 
                  className="lead mx-auto"
                  style={{ 
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                    color: 'var(--text-light)',
                    maxWidth: '700px'
                  }}
                >
                  Your privacy is important to us. Learn how we collect, use, and protect your information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="glass rounded-4 p-5" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                  <h2 className="mb-4 gradient-text">1. Information We Collect</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    <li>Name and contact information (email address, phone number, mailing address)</li>
                    <li>Company information and business details</li>
                    <li>Payment and billing information</li>
                    <li>Communications and correspondence with us</li>
                    <li>Information you provide when using our services or products</li>
                  </ul>

                  <h2 className="mb-4 gradient-text mt-5">2. How We Use Your Information</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    We use the information we collect to:
                  </p>
                  <ul className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices, updates, and support messages</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Personalize and improve your experience</li>
                    <li>Detect, prevent, and address technical issues</li>
                  </ul>

                  <h2 className="mb-4 gradient-text mt-5">3. Information Sharing and Disclosure</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    <li>With your consent or at your direction</li>
                    <li>With service providers who perform services on our behalf</li>
                    <li>To comply with legal obligations or respond to legal requests</li>
                    <li>To protect our rights, property, or safety, or that of our users</li>
                    <li>In connection with a business transfer or merger</li>
                  </ul>

                  <h2 className="mb-4 gradient-text mt-5">4. Data Security</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">5. Your Rights and Choices</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    You have the right to:
                  </p>
                  <ul className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    <li>Access and receive a copy of your personal information</li>
                    <li>Rectify inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to or restrict processing of your information</li>
                    <li>Data portability (receive your data in a structured format)</li>
                    <li>Withdraw consent at any time</li>
                  </ul>

                  <h2 className="mb-4 gradient-text mt-5">6. Cookies and Tracking Technologies</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">7. Third-Party Links</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">8. Children's Privacy</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">9. Changes to This Privacy Policy</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">10. Contact Us</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    <p><strong>Email:</strong> skylithsystems@gmail.com</p>
                    <p><strong>Phone:</strong> +91 9209965565</p>
                    <p><strong>Address:</strong> 418, 4th Floor, Gera Imperium Alpha, Kharadi, Pune, Maharashtra 411014</p>
                  </div>

                  <div className="mt-5 pt-4 border-top">
                    <p className="text-muted small">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingHelpPopup />
    </>
  );
}

