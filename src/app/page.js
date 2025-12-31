'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import dynamic from 'next/dynamic';

const HeroBackground = dynamic(() => import('@/components/HeroBackground'), {
  ssr: false,
  loading: () => null,
});
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaRocket, FaBriefcase, FaBullseye, FaWrench, 
  FaBolt, FaShieldAlt, FaChartLine, FaLightbulb, 
  FaHandshake, FaDollarSign, FaHospital, FaCreditCard, 
  FaShoppingCart, FaBook, FaIndustry, FaHome, 
  FaTruck, FaLaptop, FaCalendar, FaSmile, 
  FaCheckCircle, FaUsers, FaSync, FaStar,
  FaBuilding, FaChevronLeft, FaChevronRight, FaMagic,
  FaLinkedin, FaTwitter, FaGithub, FaEnvelope
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);
  const featuresRef = useRef([]);
  const testimonialsRef = useRef([]);
  const processRef = useRef([]);
  const industriesRef = useRef([]);
  const statsRef = useRef([]);
  const parallaxRef = useRef(null);
  const floatingShapesRef = useRef([]);
  const sectionRefs = useRef([]);
  const serviceTitleRef = useRef(null);
  const statsSectionRef = useRef(null);
  const testimonialsCarouselRef = useRef(null);
  const teamRef = useRef([]);
  const teamSectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const animations = [];
    const scrollTriggers = [];

    // Use requestAnimationFrame to defer heavy operations
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      ScrollTrigger.refresh();

      if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      const anim = gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      });
      animations.push(anim);
    }

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
        const anim = gsap.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
        });
        animations.push(anim);
      }

      if (buttonRef.current) {
        gsap.set(buttonRef.current, { opacity: 0, scale: 0.8 });
        const anim = gsap.to(buttonRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'back.out(1.7)',
        });
        animations.push(anim);
      }

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

      // Reduced floating shapes animation - only animate first 4 for performance
      floatingShapesRef.current.slice(0, 4).forEach((shape, index) => {
        if (shape) {
          gsap.to(shape, {
            y: '+=30',
            x: index % 2 === 0 ? '+=20' : '-=20',
            rotation: index % 2 === 0 ? 360 : -360,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      });

      // Service section title animation
      if (serviceTitleRef.current) {
        gsap.set(serviceTitleRef.current, { opacity: 0, y: 50 });
        const anim = gsap.to(serviceTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: serviceTitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
        animations.push(anim);
        if (anim.scrollTrigger) {
          scrollTriggers.push(anim.scrollTrigger);
        }
      }

      // Enhanced card animations with stagger and 3D effects
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, { opacity: 0, y: 80, rotationY: -15, scale: 0.8 });
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

      // Features with enhanced 3D animation
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.set(feature, { 
            opacity: 0, 
            y: 80, 
            rotationY: index % 2 === 0 ? -20 : 20,
            scale: 0.8,
          });
          const anim = gsap.to(feature, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: feature,
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

      // Testimonials with flip animation
      testimonialsRef.current.forEach((testimonial, index) => {
        if (testimonial) {
          gsap.set(testimonial, { opacity: 0, scale: 0.5, rotationY: 90 });
          const anim = gsap.to(testimonial, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonial,
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

      // Process steps with timeline animation
      processRef.current.forEach((step, index) => {
        if (step) {
          gsap.set(step, { opacity: 0, x: -100, rotation: -20 });
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
          
          timeline
            .to(step, {
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 0.8,
              ease: 'power3.out',
            })
            .to(step, {
              scale: 1.05,
              duration: 0.2,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut',
            }, '-=0.3');
          
          animations.push(timeline);
          if (timeline.scrollTrigger) {
            scrollTriggers.push(timeline.scrollTrigger);
          }
        }
      });

      // Industries with circular reveal animation
      industriesRef.current.forEach((industry, index) => {
        if (industry) {
          gsap.set(industry, { opacity: 0, scale: 0, rotation: 180 });
          const anim = gsap.to(industry, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.08,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: industry,
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

      // Stats with number counting animation
      if (statsSectionRef.current) {
        statsRef.current.forEach((stat, index) => {
          if (stat) {
            gsap.set(stat, { opacity: 0, y: 50, scale: 0.5 });
            const anim = gsap.to(stat, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              delay: index * 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: statsSectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            });
            animations.push(anim);
            if (anim.scrollTrigger) {
              scrollTriggers.push(anim.scrollTrigger);
            }

            // Number counting animation
            const numberElement = stat.querySelector('h3');
            if (numberElement) {
              const text = numberElement.textContent;
              const number = parseInt(text.replace(/\D/g, ''));
              if (!isNaN(number)) {
                const counter = { value: 0 };
                gsap.to(counter, {
                  value: number,
                  duration: 2,
                  delay: index * 0.1 + 0.5,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: statsSectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                  },
                  onUpdate: () => {
                    if (text.includes('+')) {
                      numberElement.textContent = Math.floor(counter.value) + '+';
                    } else if (text.includes('%')) {
                      numberElement.textContent = counter.value.toFixed(1) + '%';
                    } else if (text.includes('/')) {
                      numberElement.textContent = '24/7';
                    } else {
                      numberElement.textContent = Math.floor(counter.value) + '+';
                    }
                  },
                });
              }
            }
          }
        });
      }

      // Team members with enhanced 3D animation
      if (teamSectionRef.current) {
        teamRef.current.forEach((member, index) => {
          if (member) {
            gsap.set(member, { opacity: 0, y: 80, rotationY: -20, scale: 0.9 });
            const anim = gsap.to(member, {
              opacity: 1,
              y: 0,
              rotationY: 0,
              scale: 1,
              duration: 1,
              delay: index * 0.15,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: member,
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
      }

      // Section parallax effects
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const parallax = gsap.to(section, {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
          if (parallax.scrollTrigger) {
            scrollTriggers.push(parallax.scrollTrigger);
          }
        }
      });

      // Smooth scroll reveal for all sections
      gsap.utils.toArray('.section').forEach((section, index) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Testimonials carousel auto-scroll (3 slides: 0, 1, 2)
      const carouselInterval = setInterval(() => {
        if (!isPausedRef.current) {
          setCurrentSlide((prev) => (prev + 1) % 3);
        }
      }, 5000);

      return () => {
        clearInterval(carouselInterval);
        animations.forEach(anim => {
          if (anim && anim.kill) anim.kill();
        });
        scrollTriggers.forEach(st => {
          if (st && st.kill) st.kill();
        });
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Testimonials carousel - CSS transition handles the animation

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const services = [
    {
      icon: FaRocket,
      title: 'Service Solutions',
      description: 'Comprehensive service-based solutions tailored to your business needs.',
      bgColor: '#FFFFFF',
      accentColor: '#8B5CF6',
    },
    {
      icon: FaBriefcase,
      title: 'Product Development',
      description: 'Innovative product development from concept to market launch.',
      bgColor: '#F8F9FA',
      accentColor: '#A78BFA',
    },
    {
      icon: FaBullseye,
      title: 'Consulting',
      description: 'Expert consulting services to drive your business forward.',
      bgColor: '#FFFFFF',
      accentColor: '#8B5CF6',
    },
    {
      icon: FaWrench,
      title: 'Support & Maintenance',
      description: 'Round-the-clock support and maintenance for your operations.',
      bgColor: '#F3F4F6',
      accentColor: '#A78BFA',
    },
  ];

  const features = [
    {
      icon: FaBolt,
      title: 'Fast Delivery',
      description: 'We deliver projects on time with agile methodologies and efficient workflows.',
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime guarantee for all solutions.',
    },
    {
      icon: FaChartLine,
      title: 'Scalable Solutions',
      description: 'Build solutions that grow with your business from startup to enterprise.',
    },
    {
      icon: FaLightbulb,
      title: 'Innovation First',
      description: 'Leverage cutting-edge technologies and best practices in every project.',
    },
    {
      icon: FaHandshake,
      title: 'Dedicated Support',
      description: '24/7 support team ready to assist you whenever you need help.',
    },
    {
      icon: FaDollarSign,
      title: 'Cost Effective',
      description: 'Optimized solutions that maximize ROI and reduce operational costs.',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your business needs, goals, and requirements to create a comprehensive plan.',
    },
    {
      number: '02',
      title: 'Design & Development',
      description: 'Our expert team designs and develops solutions tailored to your specific needs.',
    },
    {
      number: '03',
      title: 'Testing & Quality Assurance',
      description: 'Rigorous testing ensures your solution meets the highest quality standards.',
    },
    {
      number: '04',
      title: 'Deployment & Support',
      description: 'Smooth deployment followed by ongoing support and maintenance services.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content: 'Skylith transformed our business operations. Their expertise and dedication are unmatched. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'CTO, Digital Solutions',
      content: 'Working with Skylith has been a game-changer. They delivered exactly what we needed, on time and within budget.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Director, Innovation Labs',
      content: 'The team at Skylith is professional, responsive, and truly understands our business needs. Outstanding service!',
      rating: 5,
    },
    {
      name: 'David Thompson',
      role: 'Founder, StartupHub',
      content: 'Exceptional service from start to finish. Skylith helped us build a scalable platform that exceeded our expectations.',
      rating: 5,
    },
    {
      name: 'Lisa Anderson',
      role: 'VP of Technology, Global Corp',
      content: 'The technical expertise and attention to detail at Skylith is remarkable. They delivered a flawless solution.',
      rating: 5,
    },
    {
      name: 'Robert Martinez',
      role: 'Product Manager, TechVentures',
      content: 'Skylith understands the balance between innovation and practicality. Our product launch was a huge success!',
      rating: 5,
    },
    {
      name: 'Jennifer White',
      role: 'COO, Enterprise Solutions',
      content: 'Outstanding partnership with Skylith. Their team is knowledgeable, professional, and results-driven.',
      rating: 5,
    },
    {
      name: 'James Wilson',
      role: 'Director of IT, FinanceFirst',
      content: 'Skylith delivered a complex system on time and within budget. Their technical skills are top-notch.',
      rating: 5,
    },
    {
      name: 'Maria Garcia',
      role: 'CEO, Innovation Labs',
      content: 'Working with Skylith has been transformative. They brought our vision to life with creativity and precision.',
      rating: 5,
    },
  ];

  const industries = [
    { name: 'Healthcare', icon: FaHospital },
    { name: 'Finance', icon: FaCreditCard },
    { name: 'E-commerce', icon: FaShoppingCart },
    { name: 'Education', icon: FaBook },
    { name: 'Manufacturing', icon: FaIndustry },
    { name: 'Real Estate', icon: FaHome },
    { name: 'Logistics', icon: FaTruck },
    { name: 'Technology', icon: FaLaptop },
  ];

  const stats = [
    { number: '10+', label: 'Years Experience', icon: FaCalendar },
    { number: '500+', label: 'Happy Clients', icon: FaSmile },
    { number: '1000+', label: 'Projects Done', icon: FaCheckCircle },
    { number: '50+', label: 'Team Members', icon: FaUsers },
    { number: '24/7', label: 'Support', icon: FaSync },
    { number: '99.9%', label: 'Uptime', icon: FaBolt },
  ];

  return (
    <>
      <Header />
      <main style={{ overflow: 'hidden' }}>
        {/* Hero Section with Background Image */}
        <section 
          ref={heroRef}
          style={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: 'url(/hero1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            paddingTop: '100px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Three.js Animated Background */}
          <HeroBackground />
          
          {/* Dark overlay for text readability */}
          <div 
            className="position-absolute w-100 h-100"
            style={{
              top: 0,
              left: 0,
              zIndex: 1,
              background: 'linear-gradient(135deg, rgba(45, 27, 78, 0.75) 0%, rgba(107, 70, 193, 0.65) 100%)',
            }}
          />
          
          <div 
            ref={parallaxRef}
            className="position-absolute w-100 h-100"
            style={{
              top: 0,
              left: 0,
              zIndex: 0,
              background: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.3) 0%, transparent 50%)',
            }}
          />

              {/* Floating Glossy Shapes - Reduced for performance */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  ref={(el) => (floatingShapesRef.current[i] = el)}
                  className="position-absolute"
                  style={{
                    width: `${100 + i * 30}px`,
                    height: `${100 + i * 30}px`,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(139, 92, 246, ${0.2 - i * 0.02}) 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    top: `${10 + i * 15}%`,
                    left: `${5 + i * 12}%`,
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />
              ))}

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
              <div className="col-12 text-center">
                <div 
                  className="mb-5"
                  style={{
                    display: 'inline-block',
                    padding: '12px 28px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <FaStar className="me-2" /> Welcome to Skylith
                </div>
                <h1 ref={titleRef}
                  className="mb-4" 
                  style={{ 
                    fontSize: 'clamp(3.5rem, 8vw, 7rem)', 
                    color: 'white', 
                    fontWeight: '900', 
                    background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 50%, #e0e0e0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 50px rgba(255, 255, 255, 0.4)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Transform Your Business 
                </h1>
                <h1 
                  className="mb-5" 
                  style={{ 
                    fontSize: 'clamp(3.5rem, 8vw, 7rem)', 
                    color: 'white', 
                    fontWeight: '900', 
                    background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 50%, #e0e0e0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em',
                  }}
                >
                  with Skylith
                </h1>
                <p 
                  ref={subtitleRef}
                  className="lead mb-5"
                  style={{ 
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                    color: 'rgba(255,255,255,0.95)',
                    lineHeight: '1.8',
                    textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                    fontWeight: '400',
                    maxWidth: '800px',
                    margin: '0 auto',
                  }}
                >
                  Leading provider of innovative services and products. We deliver excellence through cutting-edge solutions that transform businesses.
                </p>
                <div ref={buttonRef} className="d-flex gap-4 flex-wrap justify-content-center">
                    <Link 
                      href="/services" 
                      className="btn px-6 py-4 fw-semibold"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: '#6B46C1',
                        border: 'none',
                        fontSize: '1.2rem',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        fontWeight: '700',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          y: -5,
                          scale: 1.08,
                          duration: 0.3,
                        });
                        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          y: 0,
                          scale: 1,
                          duration: 0.3,
                        });
                        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      Explore Services →
                    </Link>
                    <Link 
                      href="/contact" 
                      className="btn px-6 py-4 fw-semibold"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: '2px solid rgba(255, 255, 255, 0.4)',
                        fontSize: '1.2rem',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)',
                        fontWeight: '700',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          y: -5,
                          scale: 1.08,
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

        {/* Services with White/Gray/Lavender Theme */}
        <section className="section" style={{ background: '#FFFFFF', padding: '100px 0' }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 ref={serviceTitleRef} className="gradient-text mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '800' }}>
                Our Services
              </h2>
              <p className="lead" style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
                Comprehensive solutions designed to drive your business forward
              </p>
            </div>
            <div className="row g-4">
              {services.map((service, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="h-100"
                    style={{
                      background: service.bgColor,
                      borderRadius: '20px',
                      padding: '2.5rem',
                      color: 'var(--dark-purple)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 20px rgba(139, 92, 246, 0.08)',
                      position: 'relative',
                      overflow: 'hidden',
                      border: `2px solid ${service.accentColor}20`,
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { scale: 1.05, y: -10, duration: 0.3 });
                      e.currentTarget.style.boxShadow = `0 15px 40px ${service.accentColor}25`;
                      e.currentTarget.style.border = `2px solid ${service.accentColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3 });
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(139, 92, 246, 0.08)';
                      e.currentTarget.style.border = `2px solid ${service.accentColor}20`;
                    }}
                  >
                    <div 
                      className="position-absolute"
                      style={{
                        top: '-30px',
                        right: '-30px',
                        width: '100px',
                        height: '100px',
                        background: `${service.accentColor}10`,
                        borderRadius: '50%',
                      }}
                    />
                    <div 
                      style={{ 
                        fontSize: '3.5rem', 
                        marginBottom: '1.5rem', 
                        position: 'relative', 
                        zIndex: 1,
                        filter: `drop-shadow(0 4px 8px ${service.accentColor}30)`,
                        color: service.accentColor,
                      }}
                    >
                      {service.icon && <service.icon />}
                    </div>
                    <h4 
                      className="mb-3" 
                      style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700', 
                        position: 'relative', 
                        zIndex: 1,
                        color: 'var(--dark-purple)',
                      }}
                    >
                      {service.title}
                    </h4>
                    <p 
                      style={{ 
                        fontSize: '1rem', 
                        color: 'var(--text-light)', 
                        position: 'relative', 
                        zIndex: 1, 
                        lineHeight: '1.6' 
                      }}
                    >
                      {service.description}
                    </p>
                    <div 
                      className="position-absolute"
                      style={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${service.accentColor} 0%, ${service.accentColor}80 100%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Modern Grid */}
        <section ref={statsSectionRef} className="section" style={{ background: 'linear-gradient(135deg, #2D1B4E 0%, #6B46C1 100%)', padding: '80px 0' }}>
          <div className="container">
            <div className="row g-4">
              {stats.map((stat, index) => (
                <div key={index} className="col-lg-2 col-md-4 col-6">
                  <div
                    ref={(el) => (statsRef.current[index] = el)}
                    className="text-center"
                    style={{
                      padding: '2rem 1rem',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <div className="mb-3" style={{ fontSize: '2.5rem', color: 'white' }}>
                      {stat.icon && <stat.icon />}
                    </div>
                    <h3 className="mb-2" style={{ fontSize: '2.5rem', color: 'white', fontWeight: '800' }}>
                      {stat.number}
                    </h3>
                    <p className="mb-0" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features - Enhanced Glossy Design */}
        <section className="section" style={{ padding: '120px 0', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)' }}>
          <div className="container">
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
                <FaStar className="me-2" /> Our Advantages
              </div>
              <h2 className="gradient-text mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800' }}>
                Why Choose Skylith
              </h2>
              <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '700px', fontSize: '1.2rem' }}>
                Discover the key features that make us the preferred choice for businesses worldwide
              </p>
            </div>
            <div className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div
                    ref={(el) => (featuresRef.current[index] = el)}
                    className="h-100"
                    style={{
                      padding: '2.5rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '25px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { 
                        y: -10, 
                        scale: 1.03,
                        rotationY: 5,
                        duration: 0.4,
                        ease: 'power2.out',
                      });
                      e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(139, 92, 246, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.4)';
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { 
                        y: 0, 
                        scale: 1,
                        rotationY: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                      });
                      e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                  >
                    {/* Glossy gradient overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: `linear-gradient(90deg, transparent, rgba(139, 92, 246, ${0.6 + index * 0.05}), transparent)`,
                        opacity: 0.8,
                      }}
                    />
                    
                    {/* Icon container with glow */}
                    <div 
                      className="mb-4 d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '80px',
                        height: '80px',
                        borderRadius: '20px',
                        background: `linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(107, 70, 193, 0.05) 100%)`,
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.2)',
                      }}
                    >
                      <div 
                        style={{ 
                          fontSize: '3rem',
                          filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.4))',
                          color: '#8B5CF6',
                        }}
                      >
                        {feature.icon && <feature.icon />}
                      </div>
                    </div>
                    
                    <h4 
                      className="mb-3 gradient-text" 
                      style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {feature.title}
                    </h4>
                    
                    <p 
                      style={{ 
                        color: 'var(--text-light)', 
                        lineHeight: '1.8',
                        fontSize: '1rem',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {feature.description}
                    </p>
                    
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline - Purple Gradient Background */}
        <section className="section" style={{ background: 'linear-gradient(135deg, #2D1B4E 0%, #6B46C1 50%, #8B5CF6 100%)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
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
              filter: 'blur(60px)',
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
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                <FaRocket className="me-2" /> Our Process
              </div>
              <h2 className="mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'white' }}>
                How It Works
              </h2>
              <p className="lead mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', fontSize: '1.2rem' }}>
                Our proven process ensures successful project delivery
              </p>
            </div>
            <div className="row g-4">
              {processSteps.map((step, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div
                    ref={(el) => (processRef.current[index] = el)}
                    className="h-100"
                    style={{
                      position: 'relative',
                      padding: '2.5rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '25px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      height: '100%',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -10,
                        scale: 1.05,
                        duration: 0.4,
                        ease: 'power2.out',
                      });
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.3)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out',
                      });
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
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
                        animation: 'shine 4s infinite',
                        animationDelay: `${index * 0.5}s`,
                      }}
                    />
                    
                    {/* Left border accent */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.8) 100%)`,
                        borderRadius: '25px 0 0 25px',
                      }}
                    />
                    
                    {/* Number badge */}
                    <div 
                      className="mb-4 d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '18px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontSize: '2.5rem',
                          fontWeight: '800',
                          color: 'white',
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {step.number}
                      </div>
                    </div>
                    
                    <h4 
                      className="mb-3" 
                      style={{ 
                        color: 'white', 
                        fontSize: '1.4rem', 
                        fontWeight: '700',
                        position: 'relative',
                        zIndex: 1,
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {step.title}
                    </h4>
                    
                    <p 
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.9)', 
                        lineHeight: '1.8',
                        fontSize: '1rem',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {step.description}
                    </p>
                    
                    {/* Decorative corner element */}
                    <div
                      className="position-absolute"
                      style={{
                        bottom: 0,
                        right: 0,
                        width: '120px',
                        height: '120px',
                        background: `radial-gradient(circle, rgba(255, 255, 255, ${0.05 + index * 0.02}) 0%, transparent 70%)`,
                        borderRadius: '50%',
                        transform: 'translate(30%, 30%)',
                        zIndex: 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries - Modern List/Grid Hybrid Design */}
        <section className="section" style={{ padding: '120px 0', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle decorative background elements */}
          <div
            className="position-absolute"
            style={{
              top: '5%',
              left: '3%',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(50px)',
            }}
          />
          <div
            className="position-absolute"
            style={{
              bottom: '5%',
              right: '3%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(107, 70, 193, 0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
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
                <FaBuilding className="me-2" /> Our Expertise
              </div>
              <h2 className="gradient-text mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800' }}>
                Industries We Serve
              </h2>
              <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '700px', fontSize: '1.2rem' }}>
                Experience across diverse industries and business verticals
              </p>
            </div>

            {/* Modern Grid Layout - No Cards */}
            <div className="row g-4">
              {industries.map((industry, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-6">
                  <div
                    ref={(el) => (industriesRef.current[index] = el)}
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{
                      padding: '2.5rem 1.5rem',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      minHeight: '200px',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget.querySelector('.industry-icon-wrapper'), {
                        scale: 1.15,
                        y: -8,
                        duration: 0.4,
                        ease: 'back.out(1.7)',
                      });
                      gsap.to(e.currentTarget.querySelector('.industry-name'), {
                        color: '#6B46C1',
                        duration: 0.3,
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget.querySelector('.industry-icon-wrapper'), {
                        scale: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                      });
                      gsap.to(e.currentTarget.querySelector('.industry-name'), {
                        color: '#8B5CF6',
                        duration: 0.3,
                      });
                    }}
                  >
                    {/* Icon with subtle background */}
                    <div 
                      className="industry-icon-wrapper mb-4 d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '100px',
                        height: '100px',
                        borderRadius: '20px',
                        background: `linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(107, 70, 193, 0.05) 100%)`,
                        position: 'relative',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {/* Subtle glow effect */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: '-2px',
                          borderRadius: '20px',
                          background: `linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(107, 70, 193, 0.1) 100%)`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          zIndex: -1,
                          filter: 'blur(8px)',
                        }}
                        className="industry-glow"
                      />
                      <div 
                        className="d-flex align-items-center justify-content-center"
                        style={{ 
                          fontSize: '3.5rem',
                          color: '#8B5CF6',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        {industry.icon && <industry.icon />}
                      </div>
                    </div>
                    
                    {/* Industry Name */}
                    <h5 
                      className="industry-name text-center mb-0" 
                      style={{ 
                        fontWeight: '700', 
                        fontSize: '1.2rem',
                        color: '#8B5CF6',
                        transition: 'color 0.3s ease',
                        lineHeight: '1.4',
                      }}
                    >
                      {industry.name}
                    </h5>

                    {/* Subtle connecting line on hover */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '0',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)',
                        transition: 'width 0.4s ease',
                        opacity: 0,
                      }}
                      className="industry-underline"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials - Scrolling Carousel */}
        <section className="section" style={{ background: 'linear-gradient(135deg, #2D1B4E 0%, #6B46C1 50%, #8B5CF6 100%)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
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
              filter: 'blur(60px)',
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
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                <FaStar className="me-2" /> Client Reviews
              </div>
              <h2 className="mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'white' }}>
                What Our Clients Say
              </h2>
              <p className="lead mx-auto" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '700px', fontSize: '1.2rem' }}>
                Don't just take our word for it
              </p>
            </div>

            {/* Carousel Container */}
            <div 
              ref={testimonialsCarouselRef}
              onMouseEnter={() => isPausedRef.current = true}
              onMouseLeave={() => isPausedRef.current = false}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '30px',
                padding: '2rem 0',
              }}
            >
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
                className="position-absolute d-flex align-items-center justify-content-center"
                style={{
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '55px',
                  height: '55px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontSize: '1.3rem',
                  zIndex: 10,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.15,
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    duration: 0.3,
                  });
                }}
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
                className="position-absolute d-flex align-items-center justify-content-center"
                style={{
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '55px',
                  height: '55px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontSize: '1.3rem',
                  zIndex: 10,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.15,
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    duration: 0.3,
                  });
                }}
              >
                <FaChevronRight />
              </button>

              {/* Testimonials Cards Container - Shows 3 at a time */}
              <div
                ref={testimonialsCarouselRef}
                style={{
                  display: 'flex',
                  width: '300%',
                  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: `translateX(-${currentSlide * 33.333}%)`,
                }}
              >
                {/* Slide 1: Cards 0-2 */}
                <div style={{ width: '33.333%', display: 'flex', gap: '1.5rem', padding: '0 1rem' }}>
                  {testimonials.slice(0, 3).map((testimonial, index) => (
                    <div
                      key={index}
                      ref={(el) => (testimonialsRef.current[index] = el)}
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          padding: '2.5rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          borderRadius: '25px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                          position: 'relative',
                          overflow: 'hidden',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1.03,
                            y: -8,
                            duration: 0.3,
                            ease: 'power2.out',
                          });
                          e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(139, 92, 246, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1,
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                          });
                          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
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

                        {/* Rating Stars */}
                        <div className="mb-3" style={{ position: 'relative', zIndex: 1 }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              style={{ 
                                color: '#FFD700', 
                                fontSize: '1.2rem', 
                                marginRight: '0.3rem',
                                filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.5))',
                              }} 
                            />
                          ))}
                        </div>

                        {/* Testimonial Content */}
                        <p 
                          className="mb-4" 
                          style={{ 
                            color: 'rgba(255, 255, 255, 0.95)', 
                            fontStyle: 'italic', 
                            fontSize: '1rem', 
                            lineHeight: '1.7',
                            position: 'relative',
                            zIndex: 1,
                            flex: 1,
                          }}
                        >
                          "{testimonial.content}"
                        </p>

                        {/* Client Info */}
                        <div 
                          style={{ 
                            borderTop: '1px solid rgba(255, 255, 255, 0.2)', 
                            paddingTop: '1.2rem',
                            position: 'relative',
                            zIndex: 1,
                          }}
                        >
                          <h5 className="mb-1" style={{ color: 'white', fontWeight: '700', fontSize: '1.1rem' }}>
                            {testimonial.name}
                          </h5>
                          <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slide 2: Cards 3-5 */}
                <div style={{ width: '33.333%', display: 'flex', gap: '1.5rem', padding: '0 1rem' }}>
                  {testimonials.slice(3, 6).map((testimonial, index) => (
                    <div
                      key={index + 3}
                      ref={(el) => (testimonialsRef.current[index + 3] = el)}
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          padding: '2.5rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          borderRadius: '25px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                          position: 'relative',
                          overflow: 'hidden',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1.03,
                            y: -8,
                            duration: 0.3,
                            ease: 'power2.out',
                          });
                          e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(139, 92, 246, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1,
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                          });
                          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
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
                            animationDelay: `${(index + 3) * 0.3}s`,
                          }}
                        />
                        <div className="mb-3" style={{ position: 'relative', zIndex: 1 }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              style={{ 
                                color: '#FFD700', 
                                fontSize: '1.2rem', 
                                marginRight: '0.3rem',
                                filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.5))',
                              }} 
                            />
                          ))}
                        </div>
                        <p 
                          className="mb-4" 
                          style={{ 
                            color: 'rgba(255, 255, 255, 0.95)', 
                            fontStyle: 'italic', 
                            fontSize: '1rem', 
                            lineHeight: '1.7',
                            position: 'relative',
                            zIndex: 1,
                            flex: 1,
                          }}
                        >
                          "{testimonial.content}"
                        </p>
                        <div 
                          style={{ 
                            borderTop: '1px solid rgba(255, 255, 255, 0.2)', 
                            paddingTop: '1.2rem',
                            position: 'relative',
                            zIndex: 1,
                          }}
                        >
                          <h5 className="mb-1" style={{ color: 'white', fontWeight: '700', fontSize: '1.1rem' }}>
                            {testimonial.name}
                          </h5>
                          <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slide 3: Cards 6-8 */}
                <div style={{ width: '33.333%', display: 'flex', gap: '1.5rem', padding: '0 1rem' }}>
                  {testimonials.slice(6, 9).map((testimonial, index) => (
                    <div
                      key={index + 6}
                      ref={(el) => (testimonialsRef.current[index + 6] = el)}
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          padding: '2.5rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          borderRadius: '25px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                          position: 'relative',
                          overflow: 'hidden',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1.03,
                            y: -8,
                            duration: 0.3,
                            ease: 'power2.out',
                          });
                          e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(139, 92, 246, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1,
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                          });
                          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
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
                            animationDelay: `${(index + 6) * 0.3}s`,
                          }}
                        />
                        <div className="mb-3" style={{ position: 'relative', zIndex: 1 }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              style={{ 
                                color: '#FFD700', 
                                fontSize: '1.2rem', 
                                marginRight: '0.3rem',
                                filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.5))',
                              }} 
                            />
                          ))}
                        </div>
                        <p 
                          className="mb-4" 
                          style={{ 
                            color: 'rgba(255, 255, 255, 0.95)', 
                            fontStyle: 'italic', 
                            fontSize: '1rem', 
                            lineHeight: '1.7',
                            position: 'relative',
                            zIndex: 1,
                            flex: 1,
                          }}
                        >
                          "{testimonial.content}"
                        </p>
                        <div 
                          style={{ 
                            borderTop: '1px solid rgba(255, 255, 255, 0.2)', 
                            paddingTop: '1.2rem',
                            position: 'relative',
                            zIndex: 1,
                          }}
                        >
                          <h5 className="mb-1" style={{ color: 'white', fontWeight: '700', fontSize: '1.1rem' }}>
                            {testimonial.name}
                          </h5>
                          <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicator Dots - 3 slides */}
              <div 
                className="d-flex justify-content-center gap-2 mt-4"
                style={{ position: 'relative', zIndex: 5 }}
              >
                {[0, 1, 2].map((slideIndex) => (
                  <button
                    key={slideIndex}
                    onClick={() => setCurrentSlide(slideIndex)}
                    style={{
                      width: slideIndex === currentSlide ? '30px' : '12px',
                      height: '12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: slideIndex === currentSlide 
                        ? 'rgba(255, 255, 255, 0.9)' 
                        : 'rgba(255, 255, 255, 0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (slideIndex !== currentSlide) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (slideIndex !== currentSlide) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Split Design */}
        <section className="section" style={{ padding: '100px 0', background: 'white' }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div 
                  className="mb-4"
                  style={{
                    display: 'inline-block',
                    padding: '8px 20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    color: 'white',
                  }}
                >
                  About Us
                </div>
                <h2 className="gradient-text mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '800' }}>
                  Leading Innovation Since 2014
                </h2>
                <p className="mb-3" style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                  Skylith is a leading company specializing in both service-based and product-based solutions. 
                  We combine innovation with expertise to deliver results that matter.
                </p>
                <p className="mb-4" style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                  Our team of professionals is dedicated to helping businesses achieve their goals through 
                  cutting-edge technology and strategic consulting.
                </p>
                <Link 
                  href="/about" 
                  className="btn px-5 py-3 fw-semibold"
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                  }}
                  onClick={handleLinkClick}
                >
                  Learn More →
                </Link>
              </div>
              <div className="col-lg-6">
                <div className="row g-3">
                  {[
                    { number: '10+', label: 'Years Experience' },
                    { number: '500+', label: 'Happy Clients' },
                    { number: '1000+', label: 'Projects Done' },
                    { number: '50+', label: 'Team Members' },
                  ].map((stat, index) => (
                    <div key={index} className="col-6">
                      <div 
                        style={{
                          padding: '2rem',
                          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                          borderRadius: '20px',
                          textAlign: 'center',
                        }}
                      >
                        <h3 className="gradient-text mb-2" style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                          {stat.number}
                        </h3>
                        <p className="mb-0" style={{ color: 'var(--text-light)', fontWeight: '600' }}>
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="section" style={{ background: '#f8f9fa', padding: '100px 0' }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="gradient-text mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '800' }}>
                Technologies We Work With
              </h2>
              <p className="lead" style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
                Leveraging the latest technologies and frameworks
              </p>
            </div>
            <div className="row g-4">
              {[
                { name: 'Cloud Platforms', tech: 'AWS, Azure, GCP' },
                { name: 'Frontend', tech: 'React, Next.js, Vue.js' },
                { name: 'Backend', tech: 'Node.js, Python, Java' },
                { name: 'Mobile', tech: 'React Native, Flutter' },
                { name: 'Databases', tech: 'PostgreSQL, MongoDB, MySQL' },
                { name: 'DevOps', tech: 'Docker, Kubernetes, CI/CD' },
              ].map((item, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div 
                  style={{
                      padding: '2rem',
                      background: 'white',
                      borderRadius: '20px',
                      border: '2px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = '2px solid #667eea';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = '2px solid #e5e7eb';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h5 className="mb-3" style={{ color: 'var(--dark-purple)', fontWeight: '700', fontSize: '1.2rem' }}>
                      {item.name}
                    </h5>
                    <p className="mb-0" style={{ color: 'var(--text-light)' }}>
                      {item.tech}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team Section - Enhanced Glossy Design */}
        <section 
          ref={teamSectionRef}
          className="section" 
          style={{ 
            padding: '120px 0', 
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)', 
            position: 'relative', 
            overflow: 'hidden' 
          }}
        >
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
                <FaUsers className="me-2" /> Our Team
              </div>
              <h2 className="gradient-text mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800' }}>
                Meet Our Team
              </h2>
              <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '700px', fontSize: '1.2rem' }}>
                The talented professionals behind Skylith's success
              </p>
            </div>
            <div className="row g-4">
              {[
                {
                  name: 'John Smith',
                  role: 'CEO & Founder',
                  description: 'Visionary leader with 15+ years of experience in technology and business strategy.',
                  image: '👨‍💼',
                },
                {
                  name: 'Sarah Johnson',
                  role: 'CTO',
                  description: 'Tech innovator specializing in cloud architecture and scalable solutions.',
                  image: '👩‍💻',
                },
                {
                  name: 'Mike Davis',
                  role: 'Head of Development',
                  description: 'Expert in full-stack development and modern software engineering practices.',
                  image: '👨‍🔧',
                },
                {
                  name: 'Emily Chen',
                  role: 'Design Director',
                  description: 'Creative designer focused on user experience and modern interface design.',
                  image: '👩‍🎨',
                },
                {
                  name: 'David Wilson',
                  role: 'Head of Marketing',
                  description: 'Strategic marketer with expertise in digital campaigns and brand development.',
                  image: '👨‍💼',
                },
                {
                  name: 'Lisa Anderson',
                  role: 'Project Manager',
                  description: 'Experienced PM ensuring smooth project delivery and client satisfaction.',
                  image: '👩‍💼',
                },
              ].map((member, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div
                    ref={(el) => (teamRef.current[index] = el)}
                    className="h-100 text-center"
                    style={{
                      borderRadius: '30px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(25px)',
                      WebkitBackdropFilter: 'blur(25px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      padding: '2.5rem 2rem',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { 
                        scale: 1.05, 
                        y: -10, 
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

                    {/* Avatar */}
                    <div 
                      className="mb-4 d-flex align-items-center justify-content-center"
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(107, 70, 193, 0.15) 100%)',
                        margin: '0 auto',
                        border: '3px solid rgba(139, 92, 246, 0.3)',
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: '0 8px 25px rgba(139, 92, 246, 0.25)',
                      }}
                    >
                      <div style={{ fontSize: '4rem' }}>{member.image}</div>
                    </div>

                    {/* Name */}
                    <h4 
                      className="mb-2 gradient-text" 
                      style={{ 
                        fontSize: '1.5rem', 
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
                        fontSize: '1rem',
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
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {member.description}
                    </p>

                    {/* Social Links */}
                    <div 
                      className="d-flex gap-3 justify-content-center"
                      style={{ position: 'relative', zIndex: 1 }}
                    >
                      {[
                        { icon: FaLinkedin, color: '#0077b5', href: '#' },
                        { icon: FaTwitter, color: '#1DA1F2', href: '#' },
                        { icon: FaGithub, color: '#333', href: '#' },
                        { icon: FaEnvelope, color: '#8B5CF6', href: '#' },
                      ].map((social, socialIndex) => (
                        <a
                          key={socialIndex}
                          href={social.href}
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: social.color,
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                          }}
                          onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                              scale: 1.15,
                              rotation: 10,
                              duration: 0.3,
                            });
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                              scale: 1,
                              rotation: 0,
                              duration: 0.3,
                            });
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                          }}
                        >
                          <social.icon style={{ fontSize: '1.2rem' }} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section" style={{ padding: '120px 0', background: '#FFFFFF' }}>
          <div className="container">
            <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="mb-4 gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '800' }}>
                Ready to Transform Your Business?
              </h2>
              <p className="lead mb-5" style={{ fontSize: '1.3rem', color: 'var(--dark-purple)' }}>
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
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(107, 70, 193, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(107, 70, 193, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(107, 70, 193, 0.3)';
                  }}
                  onClick={handleLinkClick}
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
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
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
                  onClick={handleLinkClick}
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
