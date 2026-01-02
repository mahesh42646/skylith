'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaLinkedin, FaTwitter, FaGithub, FaEnvelope,
  FaUsers, FaRocket, FaAward, FaLightbulb, FaStar
} from 'react-icons/fa';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Teams() {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const teamCardsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef([]);
  const floatingShapesRef = useRef([]);

  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      description: 'Visionary leader with 15+ years of experience in technology and business strategy. Passionate about innovation and driving digital transformation.',
      image: 'https://i.pravatar.cc/300?img=12',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: '#',
      },
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      description: 'Tech innovator specializing in cloud architecture and scalable solutions. Expert in modern software engineering practices.',
      image: 'https://i.pravatar.cc/300?img=47',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: '#',
      },
    },
    {
      name: 'Mike Davis',
      role: 'Head of Development',
      description: 'Expert in full-stack development and modern software engineering practices. Leads our technical team with excellence.',
      image: 'https://i.pravatar.cc/300?img=33',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: '#',
      },
    },
    {
      name: 'Emily Chen',
      role: 'Design Director',
      description: 'Creative designer focused on user experience and modern interface design. Transforms ideas into beautiful, functional designs.',
      image: 'https://i.pravatar.cc/300?img=20',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: '#',
      },
    },
    {
      name: 'David Wilson',
      role: 'Head of Marketing',
      description: 'Strategic marketer with expertise in digital campaigns and brand development. Drives growth through innovative marketing strategies.',
      image: 'https://i.pravatar.cc/300?img=51',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: '#',
      },
    },
    {
      name: 'Lisa Anderson',
      role: 'Project Manager',
      description: 'Experienced PM ensuring smooth project delivery and client satisfaction. Expert in agile methodologies and team coordination.',
      image: 'https://i.pravatar.cc/300?img=28',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: '#',
      },
    },
  ];

  useEffect(() => {
    const animations = [];
    const scrollTriggers = [];

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

    // Hero animation
    if (titleRef.current && subtitleRef.current) {
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 50 });
      const titleAnim = gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      });
      const subtitleAnim = gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });
      animations.push(titleAnim, subtitleAnim);
    }

    // Team cards animation with 3D effects
    teamCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, { opacity: 0, y: 80, rotationY: -15, scale: 0.9 });
        const anim = gsap.to(card, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'back.out(1.4)',
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

    // Stats animation
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        gsap.set(stat, { opacity: 0, scale: 0.8 });
        const anim = gsap.to(stat, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: stat,
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
        if (anim.kill) anim.kill();
      });
      scrollTriggers.forEach(st => {
        if (st.kill) st.kill();
      });
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section - Purple Gradient */}
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
              <div 
                ref={subtitleRef}
                className="mb-4"
                style={{
                  display: 'inline-block',
                  padding: 'clamp(10px, 2vw, 14px) clamp(24px, 4vw, 32px)',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  borderRadius: '50px',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                }}
              >
                <FaUsers className="me-2" /> Our Team
              </div>
              <h1 
                ref={titleRef}
                className="mb-4 text-white" 
                style={{ 
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                  fontWeight: '800',
                  lineHeight: '1.2',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                Meet Our Team
              </h1>
              <p 
                className="lead mx-auto text-white" 
                style={{ 
                  opacity: 0.95,
                  maxWidth: '700px', 
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  lineHeight: '1.7',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                The talented professionals behind Skylith's success. 
                We're a diverse team of experts dedicated to delivering excellence.
              </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section - Enhanced Glossy Design */}
        <section 
          className="section" 
          style={{ 
            padding: 'clamp(80px, 10vw, 120px) 0',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 50%, #F0F0F0 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative background elements */}
          <div
            className="position-absolute"
            style={{
              top: '10%',
              right: '5%',
              width: 'clamp(300px, 40vw, 500px)',
              height: 'clamp(300px, 40vw, 500px)',
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
              width: 'clamp(400px, 50vw, 600px)',
              height: 'clamp(400px, 50vw, 600px)',
              background: 'radial-gradient(circle, rgba(107, 70, 193, 0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(90px)',
            }}
          />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row g-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div
                    ref={(el) => (teamCardsRef.current[index] = el)}
                    className="h-100 text-center"
                    style={{
                      borderRadius: '30px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(25px)',
                      WebkitBackdropFilter: 'blur(25px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      padding: 'clamp(2rem, 4vw, 2.5rem) clamp(1.5rem, 3vw, 2rem)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { 
                        scale: 1.05, 
                        y: -12, 
                        rotationY: 5,
                        duration: 0.4,
                        ease: 'back.out(1.7)',
                      });
                      e.currentTarget.style.boxShadow = '0 25px 70px 0 rgba(139, 92, 246, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
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

                    {/* Decorative corner element */}
                    <div
                      className="position-absolute"
                      style={{
                        bottom: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        background: `radial-gradient(circle, rgba(139, 92, 246, ${0.05 + index * 0.02}) 0%, transparent 70%)`,
                        borderRadius: '50%',
                        transform: 'translate(30%, 30%)',
                        zIndex: 0,
                      }}
                    />

                    {/* Avatar */}
                    <div 
                      className="mb-4 d-flex align-items-center justify-content-center mx-auto"
                      style={{
                        width: 'clamp(120px, 15vw, 150px)',
                        height: 'clamp(120px, 15vw, 150px)',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(107, 70, 193, 0.15) 100%)',
                        border: '4px solid rgba(139, 92, 246, 0.3)',
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: '0 10px 30px rgba(139, 92, 246, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.25)';
                      }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={150}
                        height={150}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%',
                        }}
                      />
                    </div>

                    {/* Name */}
                    <h4 
                      className="mb-2 gradient-text" 
                      style={{ 
                        fontSize: 'clamp(1.4rem, 3vw, 1.7rem)', 
                        fontWeight: '800',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {member.name}
                    </h4>

                    {/* Role */}
                    <p 
                      className="mb-3" 
                      style={{ 
                        color: '#8B5CF6', 
                        fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                        fontWeight: '600',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {member.role}
                    </p>

                    {/* Description */}
                    <p 
                      className="mb-4" 
                      style={{ 
                        color: 'var(--text-light)', 
                        fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
                        lineHeight: '1.7',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {member.description}
                    </p>

                    {/* Social Links */}
                    <div 
                      className="d-flex gap-3 justify-content-center flex-wrap"
                      style={{ position: 'relative', zIndex: 1 }}
                    >
                      {[
                        { icon: FaLinkedin, color: '#0077b5', href: member.social.linkedin },
                        { icon: FaTwitter, color: '#1DA1F2', href: member.social.twitter },
                        { icon: FaGithub, color: '#333', href: member.social.github },
                        { icon: FaEnvelope, color: '#8B5CF6', href: member.social.email },
                      ].map((social, socialIndex) => (
                        <a
                          key={socialIndex}
                          href={social.href}
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: 'clamp(40px, 5vw, 44px)',
                            height: 'clamp(40px, 5vw, 44px)',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: social.color,
                            textDecoration: 'none',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                          }}
                          onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                              scale: 1.15,
                              rotation: 10,
                              y: -4,
                              duration: 0.3,
                              ease: 'back.out(1.7)',
                            });
                            e.currentTarget.style.background = social.color;
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = social.color;
                            e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}60`;
                          }}
                          onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                              scale: 1,
                              rotation: 0,
                              y: 0,
                              duration: 0.3,
                            });
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.color = social.color;
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                          }}
                        >
                          <social.icon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Purple Gradient Background */}
        <section 
          className="section" 
          style={{ 
            padding: 'clamp(80px, 10vw, 120px) 0',
            background: 'linear-gradient(135deg, #2D1B4E 0%, #6B46C1 50%, #8B5CF6 100%)',
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
              width: 'clamp(300px, 40vw, 500px)',
              height: 'clamp(300px, 40vw, 500px)',
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
              width: 'clamp(400px, 50vw, 600px)',
              height: 'clamp(400px, 50vw, 600px)',
              background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(100px)',
            }}
          />

          {/* Glassmorphism overlay */}
          <div
            className="position-absolute w-100 h-100"
            style={{
              top: 0,
              left: 0,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(167, 139, 250, 0.03) 50%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              zIndex: 0,
            }}
          />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row g-4">
              {[
                { icon: FaUsers, number: '50+', label: 'Team Members', color: '#FFFFFF' },
                { icon: FaRocket, number: '200+', label: 'Projects Delivered', color: '#FFFFFF' },
                { icon: FaAward, number: '15+', label: 'Years Experience', color: '#FFFFFF' },
                { icon: FaLightbulb, number: '100+', label: 'Innovations', color: '#FFFFFF' },
              ].map((stat, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div
                    ref={(el) => (statsRef.current[index] = el)}
                    className="text-center"
                    style={{
                      padding: 'clamp(2rem, 4vw, 2.5rem) clamp(1.5rem, 3vw, 2rem)',
                      borderRadius: '25px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.05,
                        y: -8,
                        duration: 0.4,
                        ease: 'back.out(1.2)',
                      });
                      e.currentTarget.style.boxShadow = '0 15px 50px 0 rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        y: 0,
                        duration: 0.4,
                      });
                      e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
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
                        animationDelay: `${index * 0.3}s`,
                      }}
                    />

                    <stat.icon 
                      style={{ 
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                        color: stat.color,
                        marginBottom: '1rem',
                        position: 'relative',
                        zIndex: 1,
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                      }} 
                    />
                    <h3 
                      style={{ 
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)', 
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '0.5rem',
                        position: 'relative',
                        zIndex: 1,
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {stat.number}
                    </h3>
                    <p style={{ 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', 
                      fontWeight: '500', 
                      margin: 0,
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="section" 
          style={{ 
            padding: 'clamp(80px, 10vw, 120px) 0',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
          }}
        >
          <div className="container">
            <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="mb-4 gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '800' }}>
                Ready to Work With Us?
              </h2>
              <p className="lead mb-5" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: 'var(--text-light)' }}>
                Let's discuss how we can help you achieve your goals with our innovative solutions.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link 
                  href="/contact" 
                  className="btn px-5 py-3 fw-semibold"
                  style={{ 
                    background: 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%)', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(107, 70, 193, 0.3)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(107, 70, 193, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(107, 70, 193, 0.3)';
                  }}
                >
                  Get Started Today
                </Link>
                <Link 
                  href="/services" 
                  className="btn px-5 py-3 fw-semibold"
                  style={{ 
                    background: 'transparent', 
                    color: 'var(--dark-purple)',
                    border: '2px solid #8B5CF6',
                    borderRadius: '12px',
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#8B5CF6';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--dark-purple)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
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

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>
    </>
  );
}
