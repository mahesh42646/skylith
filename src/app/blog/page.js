'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaRocket, FaCloud, FaLock, FaBriefcase, 
  FaRobot, FaChartLine, FaPenFancy, FaStar,
  FaCalendar, FaUser, FaArrowRight, FaEnvelope
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
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

    // Animated elements - different style for blog
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

  const blogPosts = [
    {
      slug: 'the-future-of-digital-transformation',
      title: 'The Future of Digital Transformation',
      excerpt: 'Explore how businesses are leveraging technology to transform their operations and stay competitive in the digital age.',
      author: 'John Smith',
      date: 'December 15, 2024',
      category: 'Technology',
      icon: FaRocket,
    },
    {
      slug: 'best-practices-for-cloud-migration',
      title: 'Best Practices for Cloud Migration',
      excerpt: 'Learn the essential steps and strategies for successfully migrating your infrastructure to the cloud.',
      author: 'Sarah Johnson',
      date: 'December 10, 2024',
      category: 'Cloud',
      icon: FaCloud,
    },
    {
      slug: 'cybersecurity-in-2024-what-you-need-to-know',
      title: 'Cybersecurity in 2024: What You Need to Know',
      excerpt: 'Stay ahead of the latest cybersecurity threats and learn how to protect your business from emerging risks.',
      author: 'Mike Davis',
      date: 'December 5, 2024',
      category: 'Security',
      icon: FaLock,
    },
    {
      slug: 'product-development-from-idea-to-market',
      title: 'Product Development: From Idea to Market',
      excerpt: 'A comprehensive guide to bringing your product ideas to life and successfully launching them in the market.',
      author: 'Emily Chen',
      date: 'November 28, 2024',
      category: 'Product',
      icon: FaBriefcase,
    },
    {
      slug: 'the-power-of-ai-in-business-operations',
      title: 'The Power of AI in Business Operations',
      excerpt: 'Discover how artificial intelligence is revolutionizing business processes and creating new opportunities.',
      author: 'David Wilson',
      date: 'November 20, 2024',
      category: 'AI',
      icon: FaRobot,
    },
    {
      slug: 'building-scalable-solutions-for-growth',
      title: 'Building Scalable Solutions for Growth',
      excerpt: 'Learn how to design and implement scalable solutions that grow with your business needs.',
      author: 'Lisa Anderson',
      date: 'November 15, 2024',
      category: 'Development',
      icon: FaChartLine,
    },
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
                  <FaPenFancy className="me-2" /> Latest Insights
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
                  Blog
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
                  Insights, tips, and updates from the Skylith team
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts - Enhanced Glossy Design */}
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
                <FaStar className="me-2" /> Our Articles
              </div>
              <h2 className="gradient-text mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800' }}>
                Latest Articles
              </h2>
              <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '700px', fontSize: '1.2rem' }}>
                Stay updated with the latest trends, insights, and best practices
              </p>
            </div>
            <div className="row g-4">
              {blogPosts.map((post, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div 
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="h-100"
                    style={{
                      borderRadius: '30px',
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

                    {/* Icon Header */}
                    <div 
                      className="text-center p-5"
                      style={{
                        background: `linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(107, 70, 193, 0.15) 100%)`,
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                        zIndex: 1,
                        minHeight: '220px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100px',
                          height: '100px',
                          borderRadius: '25px',
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {post.icon && <post.icon style={{ fontSize: '3.5rem', color: '#8B5CF6' }} />}
                      </div>
                    </div>
                    <div className="p-4" style={{ position: 'relative', zIndex: 1 }}>
                      <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                        <span 
                          className="badge rounded-pill px-3 py-2"
                          style={{
                            background: 'rgba(139, 92, 246, 0.15)',
                            color: '#8B5CF6',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                          }}
                        >
                          {post.category}
                        </span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <FaCalendar style={{ fontSize: '0.8rem' }} /> {post.date}
                        </span>
                      </div>
                      <h3 className="mb-3" style={{ color: 'var(--dark-purple)', fontSize: '1.5rem', fontWeight: '700', lineHeight: '1.4' }}>
                        {post.title}
                      </h3>
                      <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: '1.7', fontSize: '1rem' }}>
                        {post.excerpt}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <FaUser style={{ fontSize: '0.8rem' }} /> {post.author}
                        </span>
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-decoration-none fw-semibold d-flex align-items-center gap-2"
                          style={{ color: '#8B5CF6', fontSize: '1rem' }}
                          onClick={handleLinkClick}
                          onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                              x: 5,
                              duration: 0.3,
                            });
                          }}
                          onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                              x: 0,
                              duration: 0.3,
                            });
                          }}
                        >
                          Read More <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section - Enhanced Glossy */}
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
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div 
                  className="rounded-4 p-5 text-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
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
                  <div className="mb-4" style={{ position: 'relative', zIndex: 1 }}>
                    <FaEnvelope style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }} />
                  </div>
                  <h2 className="mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', fontWeight: '800', position: 'relative', zIndex: 1 }}>
                    Subscribe to Our Newsletter
                  </h2>
                  <p className="mb-5 lead mx-auto" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255, 255, 255, 0.95)', maxWidth: '600px', position: 'relative', zIndex: 1 }}>
                    Get the latest insights, tips, and updates delivered to your inbox.
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap" style={{ position: 'relative', zIndex: 1 }}>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      style={{
                        maxWidth: '400px',
                        borderRadius: '15px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '14px 24px',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        fontSize: '1rem',
                      }}
                    />
                    <button 
                      className="btn px-5 py-3 fw-semibold"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.98)', 
                        color: '#6B46C1',
                        border: 'none',
                        borderRadius: '15px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        fontSize: '1.1rem',
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          y: -3,
                          scale: 1.05,
                          duration: 0.3,
                        });
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          y: 0,
                          scale: 1,
                          duration: 0.3,
                        });
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                      }}
                    >
                      Subscribe
                    </button>
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

