'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaBuilding, FaBullseye, FaHandshake, FaRocket, 
  FaLightbulb, FaUsers, FaChartLine, FaAward, 
  FaHeadset, FaCog, FaStar
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const cardsRef = useRef([]);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const floatingShapesRef = useRef([]);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);

  useEffect(() => {
    const animations = [];
    const scrollTriggers = [];

    ScrollTrigger.getAll().forEach(st => st.kill());
    ScrollTrigger.refresh();

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

    // Story section animation
    if (storyRef.current) {
      gsap.set(storyRef.current, { opacity: 0, x: -50 });
      const anim = gsap.to(storyRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      animations.push(anim);
      if (anim.scrollTrigger) {
        scrollTriggers.push(anim.scrollTrigger);
      }
    }

    // Mission & Vision animations
    if (missionRef.current) {
      gsap.set(missionRef.current, { opacity: 0, y: 50 });
      const anim = gsap.to(missionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
      animations.push(anim);
      if (anim.scrollTrigger) {
        scrollTriggers.push(anim.scrollTrigger);
      }
    }
    if (visionRef.current) {
      gsap.set(visionRef.current, { opacity: 0, y: 50 });
      const anim = gsap.to(visionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: visionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
      animations.push(anim);
      if (anim.scrollTrigger) {
        scrollTriggers.push(anim.scrollTrigger);
      }
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

  const values = [
    {
      icon: FaBullseye,
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.',
    },
    {
      icon: FaHandshake,
      title: 'Integrity',
      description: 'We build trust through transparency, honesty, and ethical business practices in everything we do.',
    },
    {
      icon: FaRocket,
      title: 'Excellence',
      description: 'We strive for perfection in every project, ensuring the highest quality standards and client satisfaction.',
    },
    {
      icon: FaLightbulb,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and work closely with clients to achieve shared success.',
    },
  ];

  const stats = [
    { number: '10+', label: 'Years of Experience' },
    { number: '500+', label: 'Happy Clients' },
    { number: '1000+', label: 'Projects Completed' },
    { number: '50+', label: 'Expert Team Members' },
  ];

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
                  <FaStar className="me-2" /> Our Story
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
                  About Skylith
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
                  Leading provider of innovative services and products. We deliver excellence through cutting-edge solutions that transform businesses.
                </p>

                {/* CTA Buttons */}
                <div className="d-flex gap-3 flex-wrap justify-content-center">
                  <Link 
                    href="#story" 
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
                    Learn More →
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
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Story Section - Enhanced */}
        <section id="story" className="section" style={{ padding: '120px 0', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)', position: 'relative', overflow: 'hidden' }}>
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
            <div className="row align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div 
                  ref={storyRef}
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
                  <FaBuilding className="me-2" /> Our Journey
                </div>
                <h2 className="mb-4 gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '800' }}>
                  Our Story
                </h2>
                <p className="mb-4" style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                  Skylith is a leading company specializing in both service-based and product-based solutions. 
                  Founded with a vision to transform businesses through innovation and technology, we have been 
                  at the forefront of delivering cutting-edge solutions for over a decade.
                </p>
                <p className="mb-4" style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                  Our team of experienced professionals combines deep industry knowledge with technical expertise 
                  to help businesses achieve their goals. We understand that every business is unique, which is 
                  why we tailor our solutions to meet specific needs and challenges.
                </p>
                <p className="mb-5" style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                  From startups to enterprise-level organizations, we have successfully delivered projects across 
                  various industries, helping our clients stay competitive in an ever-evolving digital landscape.
                </p>
                <Link 
                  href="/contact" 
                  className="btn px-5 py-3 fw-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6B46C1 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 20px rgba(139, 92, 246, 0.35)',
                    fontSize: '1.1rem',
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
                  Get in Touch →
                </Link>
              </div>
              <div className="col-lg-6">
                <div 
                  className="rounded-4 p-5"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '450px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                  <div className="text-center w-100" style={{ position: 'relative', zIndex: 1 }}>
                    {stats.map((stat, index) => (
                      <div key={index} className="mb-5">
                        <h3 className="gradient-text mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800' }}>{stat.number}</h3>
                        <p className="mb-0" style={{ fontSize: '1.1rem', color: 'var(--text-light)', fontWeight: '500' }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section - Enhanced */}
        <section className="section" style={{ padding: '120px 0', background: 'linear-gradient(135deg, #2D1B4E 0%, #6B46C1 50%, #8B5CF6 100%)', position: 'relative', overflow: 'hidden' }}>
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
              filter: 'blur(80px)',
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
              filter: 'blur(90px)',
            }}
          />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row g-4">
              <div className="col-lg-6">
                <div 
                  ref={missionRef}
                  className="rounded-4 p-5 h-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.6) 0%, rgba(139, 92, 246, 0.55) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
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
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                      animation: 'shine 5s infinite',
                    }}
                  />
                  <div className="text-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <FaBullseye style={{ fontSize: '2.5rem', color: 'white' }} />
                    </div>
                  </div>
                  <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '800', color: 'white', position: 'relative', zIndex: 1 }}>Our Mission</h3>
                  <p className="text-center" style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.95)', lineHeight: '1.8', position: 'relative', zIndex: 1 }}>
                    To empower businesses with innovative technology solutions and strategic consulting that drive 
                    growth, efficiency, and competitive advantage. We are committed to delivering excellence in 
                    every project and building long-term partnerships with our clients.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div 
                  ref={visionRef}
                  className="rounded-4 p-5 h-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.6) 0%, rgba(139, 92, 246, 0.55) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
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
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                      animation: 'shine 5s infinite',
                      animationDelay: '0.5s',
                    }}
                  />
                  <div className="text-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <FaRocket style={{ fontSize: '2.5rem', color: 'white' }} />
                    </div>
                  </div>
                  <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '800', color: 'white', position: 'relative', zIndex: 1 }}>Our Vision</h3>
                  <p className="text-center" style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.95)', lineHeight: '1.8', position: 'relative', zIndex: 1 }}>
                    To be the most trusted partner for businesses seeking transformative technology solutions. 
                    We envision a future where every organization we work with achieves sustainable growth and 
                    innovation through our expertise and dedication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Enhanced Glossy */}
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
                  color: '#8B5CF6',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                <FaStar className="me-2" /> Our Foundation
              </div>
              <h2 className="gradient-text mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800' }}>
                Our Core Values
              </h2>
              <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '700px', fontSize: '1.2rem' }}>
                The principles that guide everything we do and shape our company culture
              </p>
            </div>
            <div className="row g-4">
              {values.map((value, index) => (
                <div key={index} className="col-lg-3 col-md-6">
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

                    {/* Icon container */}
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
                          fontSize: '3rem',
                          color: '#8B5CF6',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        {value.icon && <value.icon />}
                      </div>
                    </div>
                    <h4 className="text-center mb-3" style={{ color: 'var(--dark-purple)', fontWeight: '700', fontSize: '1.4rem', position: 'relative', zIndex: 1 }}>
                      {value.title}
                    </h4>
                    <p className="text-center" style={{ color: 'var(--text-light)', lineHeight: '1.7', position: 'relative', zIndex: 1 }}>
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Enhanced */}
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
                  color: '#8B5CF6',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                <FaStar className="me-2" /> Why Us
              </div>
              <h2 className="gradient-text mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800' }}>
                Why Choose Skylith
              </h2>
            </div>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div 
                  className="rounded-4 p-4 h-100"
                  style={{
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
                      scale: 1.05, 
                      y: -10,
                      duration: 0.4,
                      ease: 'back.out(1.7)',
                    });
                    e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      scale: 1, 
                      y: 0,
                      duration: 0.4,
                      ease: 'power2.out',
                    });
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
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
                  <div className="mb-3" style={{ position: 'relative', zIndex: 1 }}>
                    <FaUsers style={{ fontSize: '2.5rem', color: '#8B5CF6' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: 'var(--dark-purple)', fontWeight: '700', fontSize: '1.3rem', position: 'relative', zIndex: 1 }}>Expert Team</h4>
                  <p style={{ color: 'var(--text-light)', lineHeight: '1.7', position: 'relative', zIndex: 1 }}>
                    Our team consists of highly skilled professionals with years of experience in their respective 
                    fields. We stay updated with the latest technologies and industry best practices.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div 
                  className="rounded-4 p-4 h-100"
                  style={{
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
                      scale: 1.05, 
                      y: -10,
                      duration: 0.4,
                      ease: 'back.out(1.7)',
                    });
                    e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      scale: 1, 
                      y: 0,
                      duration: 0.4,
                      ease: 'power2.out',
                    });
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                      animation: 'shine 5s infinite',
                      animationDelay: '0.2s',
                    }}
                  />
                  <div className="mb-3" style={{ position: 'relative', zIndex: 1 }}>
                    <FaAward style={{ fontSize: '2.5rem', color: '#8B5CF6' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: 'var(--dark-purple)', fontWeight: '700', fontSize: '1.3rem', position: 'relative', zIndex: 1 }}>Proven Track Record</h4>
                  <p style={{ color: 'var(--text-light)', lineHeight: '1.7', position: 'relative', zIndex: 1 }}>
                    With over 1000 projects completed and 500+ satisfied clients, we have a proven track record 
                    of delivering successful solutions across various industries and business sizes.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div 
                  className="rounded-4 p-4 h-100"
                  style={{
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
                      scale: 1.05, 
                      y: -10,
                      duration: 0.4,
                      ease: 'back.out(1.7)',
                    });
                    e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      scale: 1, 
                      y: 0,
                      duration: 0.4,
                      ease: 'power2.out',
                    });
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                      animation: 'shine 5s infinite',
                      animationDelay: '0.4s',
                    }}
                  />
                  <div className="mb-3" style={{ position: 'relative', zIndex: 1 }}>
                    <FaCog style={{ fontSize: '2.5rem', color: '#8B5CF6' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: 'var(--dark-purple)', fontWeight: '700', fontSize: '1.3rem', position: 'relative', zIndex: 1 }}>Custom Solutions</h4>
                  <p style={{ color: 'var(--text-light)', lineHeight: '1.7', position: 'relative', zIndex: 1 }}>
                    We understand that one size doesn't fit all. Our solutions are tailored to meet your specific 
                    business needs, ensuring maximum value and return on investment.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div 
                  className="rounded-4 p-4 h-100"
                  style={{
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
                      scale: 1.05, 
                      y: -10,
                      duration: 0.4,
                      ease: 'back.out(1.7)',
                    });
                    e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      scale: 1, 
                      y: 0,
                      duration: 0.4,
                      ease: 'power2.out',
                    });
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                      animation: 'shine 5s infinite',
                      animationDelay: '0.6s',
                    }}
                  />
                  <div className="mb-3" style={{ position: 'relative', zIndex: 1 }}>
                    <FaHeadset style={{ fontSize: '2.5rem', color: '#8B5CF6' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: 'var(--dark-purple)', fontWeight: '700', fontSize: '1.3rem', position: 'relative', zIndex: 1 }}>24/7 Support</h4>
                  <p style={{ color: 'var(--text-light)', lineHeight: '1.7', position: 'relative', zIndex: 1 }}>
                    We provide round-the-clock support to ensure your systems run smoothly. Our dedicated support 
                    team is always ready to assist you whenever you need help.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div 
                  className="rounded-4 p-4 h-100"
                  style={{
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
                      scale: 1.05, 
                      y: -10,
                      duration: 0.4,
                      ease: 'back.out(1.7)',
                    });
                    e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      scale: 1, 
                      y: 0,
                      duration: 0.4,
                      ease: 'power2.out',
                    });
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                      animation: 'shine 5s infinite',
                      animationDelay: '0.8s',
                    }}
                  />
                  <div className="mb-3" style={{ position: 'relative', zIndex: 1 }}>
                    <FaLightbulb style={{ fontSize: '2.5rem', color: '#8B5CF6' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: 'var(--dark-purple)', fontWeight: '700', fontSize: '1.3rem', position: 'relative', zIndex: 1 }}>Innovation Focus</h4>
                  <p style={{ color: 'var(--text-light)', lineHeight: '1.7', position: 'relative', zIndex: 1 }}>
                    We continuously invest in research and development to bring you the latest innovations and 
                    technologies that can give you a competitive edge in the market.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div 
                  className="rounded-4 p-4 h-100"
                  style={{
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
                      scale: 1.05, 
                      y: -10,
                      duration: 0.4,
                      ease: 'back.out(1.7)',
                    });
                    e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      scale: 1, 
                      y: 0,
                      duration: 0.4,
                      ease: 'power2.out',
                    });
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                      animation: 'shine 5s infinite',
                      animationDelay: '1s',
                    }}
                  />
                  <div className="mb-3" style={{ position: 'relative', zIndex: 1 }}>
                    <FaHandshake style={{ fontSize: '2.5rem', color: '#8B5CF6' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: 'var(--dark-purple)', fontWeight: '700', fontSize: '1.3rem', position: 'relative', zIndex: 1 }}>Long-term Partnership</h4>
                  <p style={{ color: 'var(--text-light)', lineHeight: '1.7', position: 'relative', zIndex: 1 }}>
                    We believe in building long-term relationships with our clients. Our commitment extends beyond 
                    project delivery to ongoing support and continuous improvement.
                  </p>
                </div>
              </div>
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
                  onClick={handleLinkClick}
                >
                  Get Started Today
                </Link>

                {/* View Services Button - White with Purple Border */}
                <Link 
                  href="/services" 
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

