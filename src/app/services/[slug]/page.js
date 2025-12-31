'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHelpPopup from '@/components/FloatingHelpPopup';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    slug: 'service-based-solutions',
    title: 'Service-Based Solutions',
    description: 'Comprehensive service offerings tailored to your business needs.',
    features: ['Custom Development', 'Consulting Services', 'Support & Maintenance', 'Training Programs'],
    icon: '🎯',
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

    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 30 });
      const anim = gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
      });
      animations.push(anim);
    }

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
      <main>
        <section 
          ref={heroRef}
          className="hero-section"
          style={{ 
            minHeight: '40vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.98) 40%, rgba(107, 70, 193, 0.05) 100%)',
            paddingTop: '200px',
            paddingBottom: '60px',
          }}
        >
          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <Link 
                  href="/services" 
                  className="text-decoration-none mb-4 d-inline-block"
                  style={{ color: 'var(--light-purple)' }}
                  onClick={handleLinkClick}
                >
                  ← Back to Services
                </Link>
                <div className="text-center mb-4" style={{ fontSize: '4rem' }}>
                  {service.icon}
                </div>
                <h1 
                  className="text-center fw-bold mb-4"
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: 'var(--dark-purple)',
                    lineHeight: '1.2',
                  }}
                >
                  {service.title}
                </h1>
                <p className="text-center mb-0" style={{ color: 'var(--text-light)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ padding: '60px 0' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div 
                  ref={contentRef}
                  className="service-content"
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: 'var(--text-light)',
                  }}
                >
                  {service.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      const text = paragraph.replace(/\*\*/g, '');
                      return (
                        <h3 key={index} className="mt-5 mb-3" style={{ color: 'var(--dark-purple)', fontSize: '1.5rem' }}>
                          {text}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('**')) {
                      const parts = paragraph.split('**');
                      return (
                        <p key={index} className="mb-4">
                          {parts.map((part, i) => 
                            i % 2 === 1 ? (
                              <strong key={i} style={{ color: 'var(--dark-purple)' }}>{part}</strong>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )}
                        </p>
                      );
                    }
                    return (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--light-bg)', padding: '60px 0' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="card border-0 shadow-sm glass p-4" style={{ borderRadius: '20px' }}>
                  <h3 className="mb-3" style={{ color: 'var(--dark-purple)' }}>Key Features</h3>
                  <ul className="list-unstyled">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="mb-2" style={{ color: 'var(--text-light)' }}>
                        <span className="me-2" style={{ color: 'var(--light-purple)' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ padding: '60px 0' }}>
          <div className="container">
            <div 
              className="glass rounded-4 p-5 text-center"
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
              }}
            >
              <h2 className="mb-4">Ready to Get Started?</h2>
              <p className="mb-4 lead">
                Contact us today to discuss how we can help with {service.title.toLowerCase()}.
              </p>
              <Link 
                href="/contact" 
                className="btn btn-lg rounded-pill px-5 py-3 fw-semibold"
                style={{ 
                  background: 'white', 
                  color: 'var(--dark-purple)',
                  border: 'none',
                }}
                onClick={handleLinkClick}
              >
                Contact Us
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



