'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaBullseye, FaBriefcase, FaCloud, FaRocket, 
  FaLock, FaCog, FaStar, FaMagic
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const cardsRef = useRef([]);
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const floatingShapesRef = useRef([]);

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

    // Animated elements - different style for services
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

    // Enhanced card animations with 3D effects
    cardsRef.current.forEach((card, index) => {
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

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const services = [
    {
      slug: 'service-based-solutions',
      title: 'Service-Based Solutions',
      description: 'Comprehensive service offerings tailored to your business needs.',
      features: ['Custom Development', 'Consulting Services', 'Support & Maintenance', 'Training Programs'],
      icon: FaBullseye,
    },
    {
      slug: 'product-development',
      title: 'Product Development',
      description: 'End-to-end product development from ideation to launch.',
      features: ['Product Strategy', 'Design & Prototyping', 'Development', 'Launch Support'],
      icon: FaBriefcase,
    },
    {
      slug: 'cloud-solutions',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services.',
      features: ['Cloud Migration', 'Infrastructure Setup', 'DevOps Services', 'Monitoring'],
      icon: FaCloud,
    },
    {
      slug: 'digital-transformation',
      title: 'Digital Transformation',
      description: 'Transform your business with modern digital solutions.',
      features: ['Process Automation', 'Data Analytics', 'AI Integration', 'IoT Solutions'],
      icon: FaRocket,
    },
    {
      slug: 'security-services',
      title: 'Security Services',
      description: 'Comprehensive security solutions to protect your business.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance', '24/7 Monitoring'],
      icon: FaLock,
    },
    {
      slug: 'managed-services',
      title: 'Managed Services',
      description: 'Complete IT management and support services.',
      features: ['Network Management', 'Server Management', 'Backup Solutions', 'Help Desk'],
      icon: FaCog,
    },
  ];

  return (
    <>
      <Header />
      <main >
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

            {/* Animated service icons/shapes */}
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
                  <FaStar className="me-2" /> Premium Services
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
                  Our Services
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
                  Comprehensive service-based and product-based solutions to drive your business forward with innovation and excellence.
                </p>

                {/* CTA Buttons */}
                <div className="d-flex gap-3 flex-wrap justify-content-center">
                  <Link 
                    href="#services" 
                    className="btn px-5 py-3 fw-semibold"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.98)',
                      color: '#6B46C1',
                      border: 'none',
                      fontSize: '1.1rem',
                      borderRadius: '15px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.35), 0 0 0 1px rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(12px)',
                      fontWeight: '700',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -5,
                        scale: 1.02,
                        duration: 0.3,
                        boxShadow: '0 18px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(255, 255, 255, 0.4)',
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        boxShadow: '0 12px 35px rgba(0,0,0,0.35), 0 0 0 1px rgba(255, 255, 255, 0.3)',
                      });
                    }}
                  >
                    Explore Services →
                  </Link>
                  <Link 
                    href="/contact" 
                    className="btn px-5 py-3 fw-semibold"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      border: '2px solid rgba(255, 255, 255, 0.4)',
                      fontSize: '1.1rem',
                      borderRadius: '15px',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(12px)',
                      fontWeight: '700',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -5,
                        scale: 1.02,
                        duration: 0.3,
                      });
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                      });
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid - Enhanced Glossy Design */}
        <section className="section" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 50%, #F0F0F0 100%)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative background elements */}
          <div
            className="position-absolute"
            style={{
              top: '10%',
              right: '5%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="position-absolute"
            style={{
              bottom: '10%',
              left: '5%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(107, 70, 193, 0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(90px)',
            }}
          />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="text-center mb-5">
              <div 
                className="mb-4"
                style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  color: 'var(--light-purple)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                <FaStar className="me-2" /> Our Expertise
              </div>
              <h2 className="gradient-text mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800' }}>
                What We Offer
              </h2>
              <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '700px', fontSize: '1.2rem' }}>
                Explore our comprehensive range of services designed to meet your business needs
              </p>
            </div>
            <div className="row g-4">
              {services.map((service, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="h-100"
                    style={{
                      borderRadius: '30px',
                      padding: '3rem 2.5rem',
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
                      gsap.to(e.currentTarget, { 
                        scale: 1.08, 
                        y: -15, 
                        rotationY: 5,
                        duration: 0.4,
                        ease: 'back.out(1.7)',
                      });
                      e.currentTarget.style.boxShadow = '0 25px 70px 0 rgba(139, 92, 246, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { 
                        scale: 1, 
                        y: 0,
                        rotationY: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                      });
                      e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
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
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                        animation: 'shine 4s infinite',
                        animationDelay: `${index * 0.3}s`,
                      }}
                    />

                    {/* Gradient top border overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: `linear-gradient(90deg, transparent, rgba(139, 92, 246, ${0.6 + index * 0.05}), transparent)`,
                        opacity: 0.8,
                        zIndex: 1,
                      }}
                    />

                    {/* Decorative corner elements */}
                    <div
                      className="position-absolute"
                      style={{
                        top: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        background: `radial-gradient(circle, rgba(139, 92, 246, ${0.1 + index * 0.01}) 0%, transparent 70%)`,
                        borderRadius: '0 30px 0 100%',
                        zIndex: 0,
                      }}
                    />
                    <div
                      className="position-absolute"
                      style={{
                        bottom: 0,
                        left: 0,
                        width: '80px',
                        height: '80px',
                        background: `radial-gradient(circle, rgba(107, 70, 193, ${0.08 + index * 0.01}) 0%, transparent 70%)`,
                        borderRadius: '0 0 0 30px',
                        zIndex: 0,
                      }}
                    />
                    
                    {/* Icon container with enhanced glow */}
                    <div 
                      className="mb-4 d-flex align-items-center justify-content-center mx-auto"
                      style={{ 
                        width: '100px',
                        height: '100px',
                        borderRadius: '25px',
                        background: `linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(107, 70, 193, 0.12) 100%)`,
                        backdropFilter: 'blur(15px)',
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: '0 8px 30px rgba(139, 92, 246, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <div 
                        className="d-flex align-items-center justify-content-center"
                        style={{ 
                          fontSize: '3.5rem',
                          filter: 'drop-shadow(0 6px 15px rgba(139, 92, 246, 0.5))',
                          color: '#8B5CF6',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        {service.icon && <service.icon />}
                      </div>
                    </div>
                    
                    <h3 
                      className="text-center mb-3" 
                      style={{ 
                        fontSize: '1.6rem',
                        fontWeight: '700',
                        position: 'relative',
                        zIndex: 1,
                        color: 'var(--dark-purple)',
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      }}
                    >
                      {service.title}
                    </h3>
                    
                    <p 
                      className="text-center mb-4" 
                      style={{ 
                        color: 'var(--text-light)',
                        fontSize: '1.05rem',
                        lineHeight: '1.7',
                        position: 'relative',
                        zIndex: 1,
                        fontWeight: '500',
                      }}
                    >
                      {service.description}
                    </p>
                    
                    <ul className="list-unstyled mb-4" style={{ position: 'relative', zIndex: 1 }}>
                      {service.features.map((feature, idx) => (
                        <li 
                          key={idx} 
                          className="mb-3 d-flex align-items-center" 
                          style={{ color: 'var(--text-light)', fontSize: '1rem' }}
                        >
                          <div
                            className="me-3 d-flex align-items-center justify-content-center"
                            style={{ 
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(107, 70, 193, 0.15) 100%)',
                              border: '1px solid rgba(139, 92, 246, 0.3)',
                              flexShrink: 0,
                            }}
                          >
                            <span 
                              style={{ 
                                color: '#8B5CF6',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                              }}
                            >
                              ✓
                            </span>
                          </div>
                          <span style={{ fontWeight: '500' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="text-center mt-4" style={{ position: 'relative', zIndex: 1 }}>
                      <Link 
                        href={`/services/${service.slug}`} 
                        className="btn px-5 py-3 fw-semibold"
                        style={{
                          background: 'linear-gradient(135deg, #8B5CF6 0%, #6B46C1 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '15px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 6px 20px rgba(139, 92, 246, 0.35)',
                          fontSize: '1rem',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            y: -3,
                            scale: 1.05,
                            duration: 0.3,
                          });
                          e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, {
                            y: 0,
                            scale: 1,
                            duration: 0.3,
                          });
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.35)';
                        }}
                        onClick={handleLinkClick}
                      >
                        Learn More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Clean Minimalist Design */}
        <section className="section" style={{ padding: '120px 0', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative purple circle */}
          <div
            className="position-absolute"
            style={{
              top: '10%',
              left: '15%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="text-center">
              {/* Main Heading - Split across two lines */}
              <h2 
                className="mb-4" 
                style={{ 
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  color: '#8B5CF6',
                  fontWeight: '800',
                  lineHeight: '1.1',
                }}
              >
                <div>Ready to Transform Your</div>
                <div style={{ fontSize: '1.2em' }}>Business?</div>
              </h2>

              {/* Subtitle */}
              <p 
                className="mb-5 lead mx-auto" 
                style={{ 
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
                  color: '#4B5563',
                  maxWidth: '600px',
                  lineHeight: '1.7',
                  fontWeight: '400',
                }}
              >
                Let's discuss how we can help you achieve your goals with our innovative solutions.
              </p>

              {/* CTA Buttons */}
              <div className="d-flex gap-3 flex-wrap justify-content-center">
                {/* Get Started Button - Purple Gradient */}
                <Link 
                  href="/contact" 
                  className="btn px-5 py-3 fw-semibold"
                  style={{ 
                    background: 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    minWidth: '180px',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -3,
                      scale: 1.02,
                      duration: 0.3,
                    });
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      scale: 1,
                      duration: 0.3,
                    });
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
                  }}
                >
                  Get Started Today
                </Link>

                {/* View Services Button - White with Purple Border */}
                <Link 
                  href="#services" 
                  className="btn px-5 py-3 fw-semibold"
                  style={{ 
                    background: 'white',
                    color: '#8B5CF6',
                    border: '2px solid #8B5CF6',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    minWidth: '180px',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -3,
                      scale: 1.02,
                      duration: 0.3,
                    });
                    e.currentTarget.style.background = '#F9FAFB';
                    e.currentTarget.style.borderColor = '#6B46C1';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      scale: 1,
                      duration: 0.3,
                    });
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#8B5CF6';
                  }}
                >
                  View Services
                </Link>
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

