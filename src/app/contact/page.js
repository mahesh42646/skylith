'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, 
  FaStar, FaPaperPlane, FaUser, FaTag, FaComment
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const floatingShapesRef = useRef([]);
  const formRef = useRef(null);
  const contactCardsRef = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

    // Hero section animations
    if (heroTitleRef.current) {
      gsap.set(heroTitleRef.current, { opacity: 0, y: 50 });
      const anim = gsap.to(heroTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      });
      animations.push(anim);
    }
    if (heroSubtitleRef.current) {
      gsap.set(heroSubtitleRef.current, { opacity: 0, y: 30 });
      const anim = gsap.to(heroSubtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });
      animations.push(anim);
    }

    // Floating shapes animation
    floatingShapesRef.current.forEach((shape, index) => {
      if (shape) {
        gsap.set(shape, { opacity: 0, scale: 0 });
        const anim = gsap.to(shape, {
          opacity: 0.6,
          scale: 1,
          duration: 1.5,
          delay: 0.5 + index * 0.2,
          ease: 'power2.out',
        });
        animations.push(anim);
        
        // Continuous floating animation
        gsap.to(shape, {
          y: '+=30',
          x: '+=20',
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    // Animated decorative shapes
    if (image1Ref.current) {
      gsap.set(image1Ref.current, { scale: 1, x: 0, y: 0 });
      const anim = gsap.to(image1Ref.current, {
        scale: [1, 1.2, 1],
        x: [0, 25, 0],
        y: [0, -25, 0],
        duration: 5,
        repeat: -1,
        ease: 'power2.inOut',
      });
      animations.push(anim);
    }
    if (image2Ref.current) {
      gsap.set(image2Ref.current, { scale: 1, x: 0, y: 0 });
      const anim = gsap.to(image2Ref.current, {
        scale: [1, 1.15, 1],
        x: [0, -20, 0],
        y: [0, 20, 0],
        duration: 4.5,
        repeat: -1,
        ease: 'power2.inOut',
        delay: 0.4,
      });
      animations.push(anim);
    }
    if (image3Ref.current) {
      gsap.set(image3Ref.current, { rotation: 0, scale: 1 });
      const anim = gsap.to(image3Ref.current, {
        rotation: 360,
        scale: [1, 1.3, 1],
        duration: 7,
        repeat: -1,
        ease: 'none',
      });
      animations.push(anim);
    }

    // Form and contact cards animations
    if (formRef.current) {
      gsap.set(formRef.current, { opacity: 0, y: 50 });
      const anim = gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
      animations.push(anim);
      if (anim.scrollTrigger) {
        scrollTriggers.push(anim.scrollTrigger);
      }
    }

    contactCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, { opacity: 0, y: 80, rotationY: -15, scale: 0.9 });
        const anim = gsap.to(card, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
        animations.push(anim);
        if (anim.scrollTrigger) {
          scrollTriggers.push(anim.scrollTrigger);
        }
      }
    });

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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section - Enhanced */}
        <section 
          ref={heroRef}
          className="hero-section"
          style={{ 
            minHeight: '60vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #2D1B4E 0%, #6B46C1 50%, #8B5CF6 100%)',
            paddingTop: '120px',
            paddingBottom: '80px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Enhanced Background with Depth */}
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
            {/* Large decorative blurred circles */}
            <div 
              className="position-absolute"
              style={{
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                top: '-200px',
                right: '-150px',
                filter: 'blur(80px)',
              }}
            />
            <div 
              className="position-absolute"
              style={{
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                bottom: '-150px',
                left: '-100px',
                filter: 'blur(70px)',
              }}
            />
            <div 
              className="position-absolute"
              style={{
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%)',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(60px)',
              }}
            />

            {/* Floating Glossy Shapes */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                ref={(el) => (floatingShapesRef.current[i] = el)}
                className="position-absolute"
                style={{
                  width: `${80 + i * 20}px`,
                  height: `${80 + i * 20}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(255, 255, 255, ${0.1 - i * 0.01}) 0%, transparent 70%)`,
                  filter: 'blur(30px)',
                  top: `${10 + i * 12}%`,
                  left: `${5 + i * 10}%`,
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Animated decorative shapes */}
            <div 
              ref={image1Ref}
              className="position-absolute d-none d-lg-block"
              style={{
                width: '120px',
                height: '120px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                top: '15%',
                right: '15%',
                zIndex: 1,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            />
            <div 
              ref={image2Ref}
              className="position-absolute d-none d-lg-block"
              style={{
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                bottom: '20%',
                left: '12%',
                zIndex: 1,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transform: 'rotate(45deg)',
              }}
            />
            <div 
              ref={image3Ref}
              className="position-absolute d-none d-md-block"
              style={{
                width: '110px',
                height: '110px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                top: '55%',
                right: '20%',
                zIndex: 1,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            />
          </div>

          {/* Dark overlay for better text readability */}
          <div 
            className="position-absolute w-100 h-100"
            style={{
              top: 0,
              left: 0,
              zIndex: 1,
              background: 'linear-gradient(135deg, rgba(45, 27, 78, 0.4) 0%, rgba(107, 70, 193, 0.3) 100%)',
            }}
          />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row justify-content-center" style={{ minHeight: 'auto' }}>
              <div className="col-12 text-center">
                {/* Badge */}
                <div 
                  className="mb-4"
                  style={{
                    display: 'inline-block',
                    padding: '12px 28px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50px',
                    fontSize: '0.95rem',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <FaEnvelope className="me-2" /> Get in Touch
                </div>

                {/* Main Title */}
                <h1 
                  ref={heroTitleRef}
                  className="mb-3" 
                  style={{ 
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
                    color: 'white', 
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 50%, #e0e0e0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 40px rgba(255, 255, 255, 0.4), 0 0 80px rgba(255, 255, 255, 0.2)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Contact Us
                </h1>

                {/* Subtitle */}
                <p 
                  ref={heroSubtitleRef}
                  className="lead mx-auto mb-4"
                  style={{ 
                    fontSize: 'clamp(1rem, 2vw, 1.3rem)', 
                    color: 'rgba(255,255,255,0.95)',
                    lineHeight: '1.7',
                    textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                    fontWeight: '500',
                    maxWidth: '700px',
                  }}
                >
                  Get in touch with us. We'd love to hear from you and help you achieve your goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Enhanced Glossy Design */}
        <section className="section" style={{ padding: '120px 0', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative background elements */}
          <div
            className="position-absolute"
            style={{
              top: '10%',
              right: '5%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="position-absolute"
            style={{
              bottom: '10%',
              left: '5%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(107, 70, 193, 0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(80px)',
            }}
          />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            {/* Contact Info Cards */}
            <div className="row g-4 mb-5">
              <div className="col-lg-3 col-md-6">
                <div
                  ref={(el) => (contactCardsRef.current[0] = el)}
                  className="h-100 text-center p-4"
                  style={{
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, y: -10, duration: 0.3 });
                    e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3 });
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div
                    className="mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(107, 70, 193, 0.15) 100%)',
                      margin: '0 auto',
                    }}
                  >
                    <FaEnvelope style={{ fontSize: '2rem', color: '#8B5CF6' }} />
                  </div>
                  <h5 className="mb-2" style={{ color: 'var(--dark-purple)', fontWeight: '700' }}>Email</h5>
                  <a href="mailto:skylithsystems@gmail.com" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.95rem' }}>
                    skylithsystems@gmail.com
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div
                  ref={(el) => (contactCardsRef.current[1] = el)}
                  className="h-100 text-center p-4"
                  style={{
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, y: -10, duration: 0.3 });
                    e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3 });
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div
                    className="mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(107, 70, 193, 0.15) 100%)',
                      margin: '0 auto',
                    }}
                  >
                    <FaPhone style={{ fontSize: '2rem', color: '#8B5CF6' }} />
                  </div>
                  <h5 className="mb-2" style={{ color: 'var(--dark-purple)', fontWeight: '700' }}>Phone</h5>
                  <a href="tel:+919209965565" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.95rem' }}>
                    +91 9209965565
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div
                  ref={(el) => (contactCardsRef.current[2] = el)}
                  className="h-100 text-center p-4"
                  style={{
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, y: -10, duration: 0.3 });
                    e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3 });
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div
                    className="mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(107, 70, 193, 0.15) 100%)',
                      margin: '0 auto',
                    }}
                  >
                    <FaMapMarkerAlt style={{ fontSize: '2rem', color: '#8B5CF6' }} />
                  </div>
                  <h5 className="mb-2" style={{ color: 'var(--dark-purple)', fontWeight: '700' }}>Address</h5>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', margin: 0 }}>
                    418, 4th Floor, Gera Imperium Alpha, Kharadi, Pune, Maharashtra 411014
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div
                  ref={(el) => (contactCardsRef.current[3] = el)}
                  className="h-100 text-center p-4"
                  style={{
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, y: -10, duration: 0.3 });
                    e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3 });
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div
                    className="mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(107, 70, 193, 0.15) 100%)',
                      margin: '0 auto',
                    }}
                  >
                    <FaClock style={{ fontSize: '2rem', color: '#8B5CF6' }} />
                  </div>
                  <h5 className="mb-2" style={{ color: 'var(--dark-purple)', fontWeight: '700' }}>Business Hours</h5>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', margin: 0 }}>
                    Mon - Fri: 9:03 AM - 6:30 PM<br />
                    Sat - Sun: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="row g-5">
              <div className="col-lg-6">
                <div 
                  className="rounded-4 p-5 h-100"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
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
                  <div className="mb-4" style={{ position: 'relative', zIndex: 1 }}>
                    <div 
                      className="mb-4"
                      style={{
                        display: 'inline-block',
                        padding: '10px 24px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50px',
                        fontSize: '0.9rem',
                        color: '#8B5CF6',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                      }}
                    >
                      <FaStar className="me-2" /> Let's Connect
                    </div>
                    <h2 className="gradient-text mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800' }}>
                      Get in Touch
                    </h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                      Have a question or want to work with us? Fill out the form and we'll get back to you as soon as possible. 
                      We're here to help you achieve your business goals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div 
                  ref={formRef}
                  className="rounded-4 p-5"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
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
                      animationDelay: '0.5s',
                    }}
                  />
                  
                  <h3 className="mb-4 gradient-text" style={{ fontSize: '2rem', fontWeight: '800', position: 'relative', zIndex: 1 }}>
                    Send us a Message
                  </h3>
                  
                  {submitStatus === 'success' && (
                    <div 
                      className="alert mb-4" 
                      role="alert"
                      style={{
                        background: 'rgba(40, 167, 69, 0.15)',
                        border: '1px solid rgba(40, 167, 69, 0.3)',
                        color: '#28a745',
                        borderRadius: '15px',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div 
                      className="alert mb-4" 
                      role="alert"
                      style={{
                        background: 'rgba(220, 53, 69, 0.15)',
                        border: '1px solid rgba(220, 53, 69, 0.3)',
                        color: '#dc3545',
                        borderRadius: '15px',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label d-flex align-items-center gap-2 mb-2" style={{ color: 'var(--dark-purple)', fontWeight: '600' }}>
                        <FaUser style={{ fontSize: '1rem' }} /> Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ 
                          borderRadius: '15px',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          padding: '14px 20px',
                          background: 'rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(10px)',
                        }}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="form-label d-flex align-items-center gap-2 mb-2" style={{ color: 'var(--dark-purple)', fontWeight: '600' }}>
                        <FaEnvelope style={{ fontSize: '1rem' }} /> Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ 
                          borderRadius: '15px',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          padding: '14px 20px',
                          background: 'rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(10px)',
                        }}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="phone" className="form-label d-flex align-items-center gap-2 mb-2" style={{ color: 'var(--dark-purple)', fontWeight: '600' }}>
                        <FaPhone style={{ fontSize: '1rem' }} /> Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{ 
                          borderRadius: '15px',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          padding: '14px 20px',
                          background: 'rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(10px)',
                        }}
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="subject" className="form-label d-flex align-items-center gap-2 mb-2" style={{ color: 'var(--dark-purple)', fontWeight: '600' }}>
                        <FaTag style={{ fontSize: '1rem' }} /> Subject *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        style={{ 
                          borderRadius: '15px',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          padding: '14px 20px',
                          background: 'rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(10px)',
                        }}
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="form-label d-flex align-items-center gap-2 mb-2" style={{ color: 'var(--dark-purple)', fontWeight: '600' }}>
                        <FaComment style={{ fontSize: '1rem' }} /> Message *
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{ 
                          borderRadius: '15px',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          padding: '14px 20px',
                          background: 'rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(10px)',
                          resize: 'vertical',
                        }}
                        placeholder="Tell us about your project or inquiry..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 py-3 fw-semibold"
                      disabled={isSubmitting}
                      style={{
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #6B46C1 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '15px',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 6px 20px rgba(139, 92, 246, 0.35)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          gsap.to(e.currentTarget, {
                            y: -3,
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
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" /> Send Message
                        </>
                      )}
                    </button>
                  </form>
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

