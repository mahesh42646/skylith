'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Help() {
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

    // Animated elements - different style for help
    if (image1Ref.current) {
      gsap.set(image1Ref.current, { scale: 1, y: 0 });
      const anim = gsap.to(image1Ref.current, {
        scale: [1, 1.3, 1],
        y: [0, -25, 0],
        duration: 4,
        repeat: -1,
        ease: 'power1.inOut',
      });
      animations.push(anim);
    }
    if (image2Ref.current) {
      gsap.set(image2Ref.current, { x: 0, y: 0, rotation: 0 });
      const anim = gsap.to(image2Ref.current, {
        x: [0, -18, 0],
        y: [0, 18, 0],
        rotation: [0, -45, 0],
        duration: 5.5,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 0.4,
      });
      animations.push(anim);
    }
    if (image3Ref.current) {
      gsap.set(image3Ref.current, { scale: 1, opacity: 0.6 });
      const anim = gsap.to(image3Ref.current, {
        scale: [1, 1.35, 1],
        opacity: [0.6, 1, 0.6],
        rotation: 360,
        duration: 6,
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
  const faqs = [
    {
      question: 'How do I get started with Skylith?',
      answer: 'Getting started is easy! Simply contact us through our contact form or reach out to our sales team. We\'ll schedule a consultation to understand your needs and provide a tailored solution.',
    },
    {
      question: 'What services does Skylith offer?',
      answer: 'Skylith offers both service-based and product-based solutions including custom development, consulting, cloud solutions, digital transformation, security services, and managed services.',
    },
    {
      question: 'How can I contact support?',
      answer: 'You can contact our support team through the floating help button on any page, email us at skylithsystems@gmail.com, or call us at +91 9209965565. Our support team is available Monday-Friday, 9.30 AM - 6.30PM.',
    },
    {
      question: 'Do you offer custom solutions?',
      answer: 'Yes! We specialize in creating custom solutions tailored to your specific business needs. Contact us to discuss your requirements and we\'ll provide a customized proposal.',
    },
    {
      question: 'What is your pricing model?',
      answer: 'Our pricing varies based on the services and products you need. We offer flexible pricing models including one-time payments, subscriptions, and custom enterprise agreements. Contact us for a detailed quote.',
    },
    {
      question: 'How long does implementation take?',
      answer: 'Implementation timelines vary depending on the scope and complexity of your project. Simple solutions can be deployed in weeks, while complex enterprise solutions may take several months. We\'ll provide a detailed timeline during our consultation.',
    },
  ];

  const supportOptions = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'skylithsystems@gmail.com',
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Call us directly',
      contact: '+91 9209965565',
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 9 AM - 6 PM EST',
    },
    {
      icon: '📚',
      title: 'Documentation',
      description: 'Browse our guides',
      contact: 'Coming soon',
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="hero-section"
          style={{ 
            minHeight: '50vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(45deg, rgba(248, 249, 250, 0.98) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(139, 92, 246, 0.04) 100%)',
            paddingTop: '200px',
            paddingBottom: '80px',
          }}
        >
          {/* Unique Help Background Pattern */}
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
            {/* Question mark/chat-inspired shapes */}
            <div 
              className="position-absolute"
              style={{
                width: '520px',
                height: '520px',
                background: 'linear-gradient(180deg, rgba(107, 70, 193, 0.1) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 100%)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                top: '-120px',
                right: '-80px',
                filter: 'blur(50px)',
                transform: 'rotate(25deg)',
              }}
            />
            <div 
              className="position-absolute"
              style={{
                width: '460px',
                height: '460px',
                background: 'linear-gradient(0deg, rgba(139, 92, 246, 0.12) 0%, rgba(107, 70, 193, 0.09) 100%)',
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                bottom: '-100px',
                left: '-70px',
                filter: 'blur(45px)',
                transform: 'rotate(-20deg)',
              }}
            />
            <div 
              className="position-absolute"
              style={{
                width: '300px',
                height: '300px',
                background: 'radial-gradient(ellipse, rgba(45, 27, 78, 0.09) 0%, transparent 70%)',
                borderRadius: '50%',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(35px)',
              }}
            />
            
            {/* Help/support pattern - speech bubbles */}
            <div 
              className="position-absolute w-100 h-100"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(107, 70, 193, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
                `,
                opacity: 0.6,
              }}
            />
            
            {/* Animated help elements */}
            <div 
              ref={image1Ref}
              className="position-absolute d-none d-lg-block"
              style={{
                width: '100px',
                height: '100px',
                background: 'rgba(107, 70, 193, 0.2)',
                borderRadius: '50% 50% 50% 0%',
                top: '15%',
                right: '20%',
                zIndex: 1,
                transform: 'rotate(-45deg)',
              }}
            />
            <div 
              ref={image2Ref}
              className="position-absolute d-none d-lg-block"
              style={{
                width: '75px',
                height: '75px',
                border: '4px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '50%',
                bottom: '20%',
                left: '18%',
                zIndex: 1,
              }}
            />
            <div 
              ref={image3Ref}
              className="position-absolute d-none d-md-block"
              style={{
                width: '65px',
                height: '65px',
                background: 'rgba(107, 70, 193, 0.15)',
                borderRadius: '50% 0% 50% 50%',
                top: '50%',
                right: '22%',
                zIndex: 1,
                transform: 'rotate(45deg)',
              }}
            />
          </div>

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row align-items-center" style={{ minHeight: 'calc(50vh - 160px)' }}>
              <div className="col-lg-8 mx-auto text-center">
                <div 
                  className="mb-4"
                  style={{
                    fontSize: '4rem',
                    lineHeight: '1',
                  }}
                >
                  ❓
                </div>
                <h1 
                  className="fw-bold mb-4"
                  style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: 'var(--dark-purple)',
                    lineHeight: '1.2',
                    fontWeight: '700'
                  }}
                >
                  Help Center
                </h1>
                <p 
                  className="lead mx-auto"
                  style={{ 
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    color: 'var(--text-light)',
                    maxWidth: '700px'
                  }}
                >
                  Find answers to common questions or get in touch with our support team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="section">
          <div className="container">
            <h2 className="section-title gradient-text">Get Support</h2>
            <p className="section-subtitle">
              Choose the best way to reach us
            </p>
            <div className="row g-4">
              {supportOptions.map((option, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div 
                    className="card h-100 border-0 shadow-sm glass text-center p-4"
                    style={{
                      borderRadius: '20px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="mb-3" style={{ fontSize: '3rem' }}>
                      {option.icon}
                    </div>
                    <h4 className="mb-3" style={{ color: 'var(--dark-purple)' }}>
                      {option.title}
                    </h4>
                    <p className="mb-3" style={{ color: 'var(--text-light)' }}>
                      {option.description}
                    </p>
                    <p className="fw-semibold" style={{ color: 'var(--light-purple)' }}>
                      {option.contact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section" style={{ background: 'var(--light-bg)' }}>
          <div className="container">
            <h2 className="section-title gradient-text">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Quick answers to common questions
            </p>
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="accordion" id="faqAccordion">
                  {faqs.map((faq, index) => (
                    <div key={index} className="accordion-item border-0 mb-3 shadow-sm" style={{ borderRadius: '15px' }}>
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq${index}`}
                          style={{
                            background: 'white',
                            color: 'var(--dark-purple)',
                            fontWeight: '600',
                            borderRadius: '15px',
                          }}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`faq${index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body" style={{ color: 'var(--text-light)' }}>
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section">
          <div className="container">
            <div 
              className="glass rounded-4 p-5 text-center"
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
              }}
            >
              <h2 className="mb-4">Still Need Help?</h2>
              <p className="mb-4 lead">
                Our support team is here to assist you. Get in touch and we'll respond as soon as possible.
              </p>
              <Link href="/contact" className="btn btn-lg" style={{ 
                background: 'white', 
                color: 'var(--dark-purple)',
                border: 'none',
                padding: '12px 40px',
                borderRadius: '50px',
                fontWeight: '600'
              }}>
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingHelpPopup />
    </>
  );
}

