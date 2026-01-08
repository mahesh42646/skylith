'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaCode, FaHandshake, FaTools, FaGraduationCap, 
  FaRocket, FaCheckCircle, FaArrowRight, FaChevronLeft,
  FaLaptopCode, FaUsers, FaChartLine, FaShieldAlt
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    slug: 'service-based-solutions',
    title: 'Service-Based Solutions',
    description: 'Comprehensive service offerings tailored to your business needs.',
    features: ['Custom Development', 'Consulting Services', 'Support & Maintenance', 'Training Programs'],
    icon: '🎯',
    featureIcons: [FaCode, FaHandshake, FaTools, FaGraduationCap],
    content: `At Skylith, we offer comprehensive service-based solutions designed to meet your unique business requirements. Our team of experienced professionals works closely with you to understand your challenges and deliver tailored services that drive results.

**Custom Development**
Our custom development services help you build applications and systems that perfectly fit your business needs. We work with modern technologies and best practices to create scalable, maintainable solutions. Whether you need a web application, mobile app, or enterprise software, we have the expertise to bring your vision to life.

**Consulting Services**
Leverage our strategic consulting expertise to make informed technology decisions. Our consultants help you:
- Assess your current technology stack
- Identify opportunities for improvement
- Develop technology roadmaps
- Navigate complex technical challenges
- Optimize your development processes

**Support & Maintenance**
Ongoing support is crucial for the long-term success of any technology solution. We provide:
- 24/7 monitoring and support
- Regular updates and patches
- Performance optimization
- Bug fixes and troubleshooting
- Security updates

**Training Programs**
Empower your team with comprehensive training programs. We offer:
- Technology-specific training
- Best practices workshops
- Code review sessions
- Documentation and knowledge transfer
- Ongoing mentorship

Our service-based approach ensures you get exactly what you need, when you need it, without the overhead of maintaining a full-time development team.`,
  },
  {
    slug: 'product-development',
    title: 'Product Development',
    description: 'End-to-end product development from ideation to launch.',
    features: ['Product Strategy', 'Design & Prototyping', 'Development', 'Launch Support'],
    icon: '💼',
    content: `Transform your ideas into successful products with our end-to-end product development services. From initial concept to market launch, we guide you through every stage of the product development lifecycle.

**Product Strategy**
Before writing a single line of code, we help you define a clear product strategy. Our strategic planning includes:
- Market research and competitive analysis
- User persona development
- Feature prioritization
- Go-to-market planning
- Success metrics definition

**Design & Prototyping**
Great products start with great design. Our design process includes:
- User experience (UX) research and design
- User interface (UI) design
- Interactive prototypes
- User testing and feedback integration
- Design system development

**Development**
Our development team uses agile methodologies to build your product iteratively. We focus on:
- Clean, maintainable code
- Scalable architecture
- Security best practices
- Performance optimization
- Continuous integration and deployment

**Launch Support**
A successful launch requires careful planning and execution. We provide:
- Pre-launch testing and QA
- Deployment and infrastructure setup
- Marketing support and documentation
- Post-launch monitoring
- User onboarding assistance

Whether you're building a SaaS platform, mobile app, or enterprise product, we have the expertise to help you succeed.`,
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services.',
    features: ['Cloud Migration', 'Infrastructure Setup', 'DevOps Services', 'Monitoring'],
    icon: '☁️',
    content: `Modernize your infrastructure with our comprehensive cloud solutions. We help you leverage the power of cloud computing to improve scalability, reduce costs, and enhance reliability.

**Cloud Migration**
Migrating to the cloud requires careful planning and execution. Our migration services include:
- Assessment of current infrastructure
- Migration strategy development
- Data migration and synchronization
- Application refactoring for cloud
- Testing and validation
- Cutover planning and execution

**Infrastructure Setup**
We design and implement cloud infrastructure tailored to your needs:
- Multi-cloud and hybrid cloud solutions
- Container orchestration (Kubernetes, Docker)
- Serverless architecture
- Auto-scaling configurations
- High availability setups
- Disaster recovery solutions

**DevOps Services**
Streamline your development and deployment processes with our DevOps services:
- CI/CD pipeline setup and optimization
- Infrastructure as Code (IaC)
- Configuration management
- Automated testing and deployment
- Monitoring and logging solutions
- Security and compliance automation

**Monitoring**
Proactive monitoring ensures your cloud infrastructure runs smoothly:
- Real-time performance monitoring
- Cost optimization and analysis
- Security monitoring and alerting
- Log aggregation and analysis
- Incident response and resolution
- Performance optimization recommendations

Our cloud solutions help you reduce operational overhead, improve scalability, and focus on what matters most - growing your business.`,
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    description: 'Transform your business with modern digital solutions.',
    features: ['Process Automation', 'Data Analytics', 'AI Integration', 'IoT Solutions'],
    icon: '🚀',
    content: `Digital transformation is more than just adopting new technology - it's about fundamentally reimagining how your business operates. We help you navigate this transformation with strategic guidance and practical implementation.

**Process Automation**
Automate repetitive tasks and streamline workflows to improve efficiency:
- Business process analysis and optimization
- Workflow automation
- Robotic Process Automation (RPA)
- Integration of disparate systems
- Document management automation
- Customer service automation

**Data Analytics**
Turn your data into actionable insights with our analytics solutions:
- Data warehouse design and implementation
- Business intelligence dashboards
- Predictive analytics and machine learning
- Real-time data processing
- Data visualization
- Custom reporting solutions

**AI Integration**
Leverage artificial intelligence to enhance your business capabilities:
- Natural language processing
- Computer vision solutions
- Recommendation engines
- Chatbots and virtual assistants
- Predictive maintenance
- Fraud detection systems

**IoT Solutions**
Connect and manage devices to create smart, data-driven operations:
- IoT device integration
- Edge computing solutions
- Real-time data collection and processing
- Remote monitoring and control
- Predictive maintenance systems
- Smart infrastructure solutions

Our digital transformation services help you stay competitive in an increasingly digital world, enabling you to serve customers better, operate more efficiently, and innovate faster.`,
  },
  {
    slug: 'security-services',
    title: 'Security Services',
    description: 'Comprehensive security solutions to protect your business.',
    features: ['Security Audits', 'Penetration Testing', 'Compliance', '24/7 Monitoring'],
    icon: '🔒',
    content: `Protect your business from evolving cyber threats with our comprehensive security services. We provide end-to-end security solutions to safeguard your data, applications, and infrastructure.

**Security Audits**
Identify vulnerabilities before they become problems with our thorough security audits:
- Infrastructure security assessment
- Application security review
- Network security analysis
- Access control evaluation
- Security policy review
- Compliance gap analysis

**Penetration Testing**
Test your defenses with simulated attacks to identify real-world vulnerabilities:
- Network penetration testing
- Web application security testing
- Mobile application security testing
- Social engineering assessments
- Physical security testing
- Red team exercises

**Compliance**
Ensure your organization meets regulatory requirements:
- GDPR compliance
- HIPAA compliance
- PCI DSS compliance
- SOC 2 preparation and certification
- Industry-specific compliance
- Compliance monitoring and reporting

**24/7 Monitoring**
Continuous monitoring protects your business around the clock:
- Security Information and Event Management (SIEM)
- Intrusion detection and prevention
- Threat intelligence and analysis
- Incident detection and response
- Vulnerability scanning
- Security operations center (SOC) services

**Additional Security Services**
- Security awareness training
- Incident response planning
- Security architecture design
- Identity and access management
- Encryption and key management
- Security consulting

In today's threat landscape, proactive security is essential. Our services help you build a robust security posture that protects your business while enabling growth.`,
  },
  {
    slug: 'managed-services',
    title: 'Managed Services',
    description: 'Complete IT management and support services.',
    features: ['Network Management', 'Server Management', 'Backup Solutions', 'Help Desk'],
    icon: '⚙️',
    content: `Focus on your core business while we handle your IT operations. Our managed services provide comprehensive IT management, allowing you to reduce costs, improve reliability, and access enterprise-level expertise.

**Network Management**
Keep your network running smoothly with our network management services:
- Network monitoring and optimization
- Firewall management and configuration
- VPN setup and management
- Bandwidth optimization
- Network security
- Troubleshooting and support

**Server Management**
Ensure your servers are always available and performing optimally:
- Server monitoring and maintenance
- Operating system updates and patches
- Performance optimization
- Capacity planning
- Backup and disaster recovery
- Security hardening

**Backup Solutions**
Protect your data with comprehensive backup and recovery solutions:
- Automated backup scheduling
- Off-site backup storage
- Data encryption
- Backup verification and testing
- Disaster recovery planning
- Rapid data restoration

**Help Desk**
Provide your team with expert technical support:
- 24/7 help desk support
- Ticket management system
- Remote support capabilities
- Knowledge base and documentation
- User training and onboarding
- Escalation management

**Additional Managed Services**
- Cloud infrastructure management
- Database administration
- Email and collaboration tools management
- Security monitoring and management
- Software license management
- IT asset management

Our managed services are designed to be flexible and scalable, growing with your business needs. With predictable monthly costs and expert support, you can focus on what you do best while we handle the technology.`,
  },
];

export default function ServiceDetail() {
  const params = useParams();
  const router = useRouter();
  const contentRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const featureCardsRef = useRef([]);
  const parallaxRef = useRef(null);
  const floatingShapesRef = useRef([]);

  const service = services.find(s => s.slug === params.slug);

  useEffect(() => {
    if (!service) {
      router.push('/services');
      return;
    }

    const animations = [];
    const scrollTriggers = [];

    ScrollTrigger.getAll().forEach(st => st.kill());
    ScrollTrigger.refresh();

    // Hero animations
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      const anim = gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
      });
      animations.push(anim);
    }

    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      const anim = gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out',
      });
      animations.push(anim);
    }

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

    // Content animation
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 30 });
      const anim = gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out',
      });
      animations.push(anim);
    }

    // Feature cards animation
    featureCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, { opacity: 0, y: 40 });
        const anim = gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.8 + index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
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
  }, [service, router]);

  if (!service) {
    return null;
  }

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <Header />
      <main style={{ overflow: 'hidden' }}>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          style={{ 
            minHeight: '60vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #2D1B4E 0%, #6B46C1 50%, #8B5CF6 100%)',
            paddingTop: 'clamp(120px, 15vw, 180px)',
            paddingBottom: 'clamp(60px, 8vw, 100px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Parallax Background */}
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

          {/* Floating Glossy Shapes */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (floatingShapesRef.current[i] = el)}
              className="position-absolute"
              style={{
                width: `${100 + i * 30}px`,
                height: `${100 + i * 30}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(255, 255, 255, ${0.15 - i * 0.02}) 0%, transparent 70%)`,
                filter: 'blur(40px)',
                top: `${10 + i * 15}%`,
                left: `${5 + i * 12}%`,
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Dark overlay */}
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
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <Link 
                  href="/services" 
                  className="text-decoration-none mb-4 d-inline-flex align-items-center"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    borderRadius: '14px',
                    padding: 'clamp(0.625rem, 1.5vw, 0.875rem) clamp(1rem, 2vw, 1.5rem)',
                    color: 'white',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    fontWeight: '600',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                  }}
                  onClick={handleLinkClick}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      x: -5,
                      scale: 1.02,
                      duration: 0.3,
                    });
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      x: 0,
                      scale: 1,
                      duration: 0.3,
                    });
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
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
                  <FaChevronLeft 
                    className="me-2" 
                    style={{ 
                      fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                      position: 'relative',
                      zIndex: 1,
                    }} 
                  />
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    Back to Services
                  </span>
                </Link>
                <div className="text-center mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                  {service.icon}
                </div>
                <h1 
                  ref={titleRef}
                  className="text-center fw-bold mb-4"
                  style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: 'white',
                    lineHeight: '1.2',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 50%, #e0e0e0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {service.title}
                </h1>
                <p 
                  ref={subtitleRef}
                  className="text-center mb-0" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.95)', 
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                    maxWidth: '700px', 
                    margin: '0 auto',
                    lineHeight: '1.6',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="section" style={{ background: '#FFFFFF', padding: 'clamp(60px, 8vw, 100px) 0' }}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 
                  className="fw-bold mb-3"
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: '#2D1B4E',
                    lineHeight: '1.2',
                  }}
                >
                  Key Features
                </h2>
                <p 
                  style={{ 
                    color: '#6B7280',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    maxWidth: '600px',
                    margin: '0 auto',
                  }}
                >
                  Comprehensive solutions designed to drive your business forward
                </p>
              </div>
            </div>
            <div className="row g-4">
              {service.features.map((feature, idx) => {
                const IconComponent = service.featureIcons?.[idx] || FaCheckCircle;
                return (
                  <div key={idx} className="col-lg-3 col-md-6 col-12">
                    <div
                      ref={(el) => (featureCardsRef.current[idx] = el)}
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.98) 100%)',
                        borderRadius: '20px',
                        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                        height: '100%',
                        border: '2px solid rgba(139, 92, 246, 0.1)',
                        boxShadow: '0 8px 30px rgba(139, 92, 246, 0.08)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          y: -10,
                          scale: 1.02,
                          duration: 0.3,
                        });
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          y: 0,
                          scale: 1,
                          duration: 0.3,
                        });
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.1)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.08)';
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
                      <div 
                        style={{
                          width: 'clamp(60px, 6vw, 80px)',
                          height: 'clamp(60px, 6vw, 80px)',
                          borderRadius: '18px',
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(167, 139, 250, 0.1) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1.5rem',
                          position: 'relative',
                          zIndex: 1,
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                        }}
                      >
                        <IconComponent 
                          style={{ 
                            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                            color: '#8B5CF6',
                          }} 
                        />
                      </div>
                      <h4 
                        style={{ 
                          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                          color: '#2D1B4E',
                          fontWeight: '700',
                          marginBottom: '0.75rem',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        {feature}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section" style={{ background: '#F8F9FA', padding: 'clamp(60px, 8vw, 100px) 0' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div 
                  ref={contentRef}
                  className="service-content"
                  style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: 'clamp(2rem, 4vw, 3.5rem)',
                    boxShadow: '0 10px 40px rgba(139, 92, 246, 0.08)',
                    border: '1px solid rgba(139, 92, 246, 0.1)',
                  }}
                >
                  {service.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      const text = paragraph.replace(/\*\*/g, '');
                      return (
                        <h3 
                          key={index} 
                          className="mt-5 mb-4" 
                          style={{ 
                            color: '#2D1B4E', 
                            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                            fontWeight: '700',
                            lineHeight: '1.3',
                          }}
                        >
                          {text}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('-')) {
                      const items = paragraph.split('\n').filter(item => item.trim().startsWith('-'));
                      return (
                        <ul key={index} className="mb-4" style={{ paddingLeft: '1.5rem' }}>
                          {items.map((item, i) => (
                            <li 
                              key={i}
                              style={{ 
                                color: '#4B5563',
                                fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                                lineHeight: '1.8',
                                marginBottom: '0.5rem',
                              }}
                            >
                              {item.replace(/^-\s*/, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.startsWith('**')) {
                      const parts = paragraph.split('**');
                      return (
                        <p key={index} className="mb-4" style={{ color: '#4B5563', fontSize: 'clamp(1rem, 1.8vw, 1.1rem)', lineHeight: '1.8' }}>
                          {parts.map((part, i) => 
                            i % 2 === 1 ? (
                              <strong key={i} style={{ color: '#8B5CF6', fontWeight: '600' }}>{part}</strong>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )}
                        </p>
                      );
                    }
                    return (
                      <p 
                        key={index} 
                        className="mb-4" 
                        style={{ 
                          color: '#4B5563', 
                          fontSize: 'clamp(1rem, 1.8vw, 1.1rem)', 
                          lineHeight: '1.8',
                        }}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section" style={{ background: 'linear-gradient(135deg, #2D1B4E 0%, #6B46C1 50%, #8B5CF6 100%)', padding: 'clamp(60px, 8vw, 100px) 0', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative elements */}
          <div
            className="position-absolute"
            style={{
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="position-absolute"
            style={{
              bottom: '-100px',
              left: '-100px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
            }}
          />
          
          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div 
                  className="text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    borderRadius: '28px',
                    padding: 'clamp(2.5rem, 5vw, 4rem)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
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
                  
                  <h2 
                    className="mb-4 fw-bold"
                    style={{ 
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      color: 'white',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    Ready to Get Started?
                  </h2>
                  <p 
                    className="mb-4 lead"
                    style={{ 
                      fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                      color: 'rgba(255, 255, 255, 0.95)',
                      lineHeight: '1.6',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    Contact us today to discuss how we can help with {service.title.toLowerCase()}.
                  </p>
                  <Link 
                    href="/contact" 
                    className="btn btn-lg fw-semibold d-inline-flex align-items-center"
                    style={{ 
                      background: 'white',
                      color: '#8B5CF6',
                      border: 'none',
                      borderRadius: '16px',
                      padding: 'clamp(0.875rem, 2vw, 1.125rem) clamp(2rem, 4vw, 3rem)',
                      fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                    onClick={handleLinkClick}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -5,
                        scale: 1.05,
                        duration: 0.3,
                      });
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                      });
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    Contact Us
                    <FaArrowRight className="ms-2" style={{ fontSize: '0.9rem' }} />
                  </Link>
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



