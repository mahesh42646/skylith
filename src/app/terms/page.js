'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Terms() {
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

    // Animated elements - different style for terms
    if (image1Ref.current) {
      gsap.set(image1Ref.current, { scale: 1, opacity: 0.6 });
      const anim = gsap.to(image1Ref.current, {
        scale: [1, 1.25, 1],
        opacity: [0.6, 0.9, 0.6],
        duration: 4,
        repeat: -1,
        ease: 'power1.inOut',
      });
      animations.push(anim);
    }
    if (image2Ref.current) {
      gsap.set(image2Ref.current, { x: 0, y: 0 });
      const anim = gsap.to(image2Ref.current, {
        x: [0, 15, 0],
        y: [0, -15, 0],
        duration: 5,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 0.5,
      });
      animations.push(anim);
    }
    if (image3Ref.current) {
      gsap.set(image3Ref.current, { rotation: 0 });
      const anim = gsap.to(image3Ref.current, {
        rotation: 360,
        duration: 12,
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
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 250, 0.95) 50%, rgba(107, 70, 193, 0.04) 100%)',
            paddingTop: '180px',
            paddingBottom: '60px',
          }}
        >
          {/* Unique Terms Background Pattern */}
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
            {/* Formal/structured shapes */}
            <div 
              className="position-absolute"
              style={{
                width: '500px',
                height: '500px',
                background: 'linear-gradient(90deg, rgba(107, 70, 193, 0.08) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 100%)',
                borderRadius: '0%',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 0% 100%)',
                top: '-100px',
                right: '-100px',
                filter: 'blur(40px)',
              }}
            />
            <div 
              className="position-absolute"
              style={{
                width: '450px',
                height: '450px',
                background: 'linear-gradient(270deg, rgba(139, 92, 246, 0.1) 0%, rgba(107, 70, 193, 0.08) 100%)',
                borderRadius: '0%',
                clipPath: 'polygon(0% 30%, 100% 0%, 100% 100%, 0% 100%)',
                bottom: '-80px',
                left: '-80px',
                filter: 'blur(35px)',
              }}
            />
            <div 
              className="position-absolute"
              style={{
                width: '280px',
                height: '280px',
                background: 'rgba(45, 27, 78, 0.08)',
                borderRadius: '0%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                filter: 'blur(25px)',
              }}
            />
            
            {/* Formal lines pattern */}
            <div 
              className="position-absolute w-100 h-100"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 98px, rgba(107, 70, 193, 0.05) 98px, rgba(107, 70, 193, 0.05) 100px)',
                opacity: 0.6,
              }}
            />
            
            {/* Animated formal elements */}
            <div 
              ref={image1Ref}
              className="position-absolute d-none d-lg-block"
              style={{
                width: '100px',
                height: '100px',
                border: '4px solid rgba(107, 70, 193, 0.2)',
                borderRadius: '0%',
                top: '20%',
                right: '20%',
                zIndex: 1,
                transform: 'rotate(45deg)',
              }}
            />
            <div 
              ref={image2Ref}
              className="position-absolute d-none d-lg-block"
              style={{
                width: '60px',
                height: '60px',
                background: 'rgba(139, 92, 246, 0.18)',
                borderRadius: '0%',
                bottom: '25%',
                left: '18%',
                zIndex: 1,
              }}
            />
            <div 
              ref={image3Ref}
              className="position-absolute d-none d-md-block"
              style={{
                width: '50px',
                height: '50px',
                border: '3px dashed rgba(107, 70, 193, 0.2)',
                borderRadius: '50%',
                top: '55%',
                right: '25%',
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
                  📜
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
                  Terms & Conditions
                </h1>
                <p 
                  className="lead mx-auto"
                  style={{ 
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                    color: 'var(--text-light)',
                    maxWidth: '700px'
                  }}
                >
                  Please read these terms carefully before using our services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="glass rounded-4 p-5" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                  <h2 className="mb-4 gradient-text">1. Acceptance of Terms</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    By accessing and using Skylith's services, you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, please do not 
                    use this service.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">2. Use License</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    Permission is granted to temporarily use Skylith's services for personal, non-commercial 
                    transitory viewing only. This is the grant of a license, not a transfer of title, and 
                    under this license you may not:
                  </p>
                  <ul className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on Skylith's website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>

                  <h2 className="mb-4 gradient-text mt-5">3. Service Terms</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    Skylith provides both service-based and product-based solutions. All services are provided 
                    "as is" and "as available" without warranties of any kind, either express or implied.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">4. Payment Terms</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    Payment terms will be specified in individual service agreements. All fees are due as 
                    specified in the agreement. Late payments may result in service suspension.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">5. Intellectual Property</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    All content, including but not limited to text, graphics, logos, and software, is the 
                    property of Skylith and is protected by copyright and other intellectual property laws.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">6. Limitation of Liability</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    In no event shall Skylith or its suppliers be liable for any damages (including, without 
                    limitation, damages for loss of data or profit, or due to business interruption) arising 
                    out of the use or inability to use the materials on Skylith's website.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">7. Revisions</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    Skylith may revise these terms of service at any time without notice. By using this 
                    website you are agreeing to be bound by the then current version of these terms of service.
                  </p>

                  <h2 className="mb-4 gradient-text mt-5">8. Contact Information</h2>
                  <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    If you have any questions about these Terms & Conditions, please contact us at 
                    skylithsystems@gmail.com or through our contact page.
                  </p>

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

