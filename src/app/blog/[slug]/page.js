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

const blogPosts = [
  {
    slug: 'the-future-of-digital-transformation',
    title: 'The Future of Digital Transformation',
    content: `Digital transformation has become a critical imperative for businesses across all industries. In today's rapidly evolving technological landscape, companies that fail to adapt risk being left behind by more agile competitors.

The journey of digital transformation involves more than just adopting new technologies. It requires a fundamental shift in how organizations think about their operations, customer interactions, and value creation. Successful digital transformation initiatives combine strategic vision with practical implementation.

Key areas where digital transformation is making the biggest impact include:

**1. Customer Experience**
Modern businesses are leveraging technology to create seamless, personalized customer experiences. From AI-powered chatbots to predictive analytics, companies are using data to understand and anticipate customer needs.

**2. Operational Efficiency**
Automation and intelligent systems are streamlining operations, reducing costs, and improving accuracy. Cloud-based solutions enable businesses to scale quickly and respond to changing market conditions.

**3. Data-Driven Decision Making**
Advanced analytics and business intelligence tools are empowering organizations to make informed decisions based on real-time data rather than intuition alone.

**4. Innovation and Agility**
Digital transformation enables faster innovation cycles, allowing businesses to test, iterate, and deploy new solutions more quickly than ever before.

As we look to the future, emerging technologies like artificial intelligence, machine learning, and the Internet of Things will continue to reshape the business landscape. Organizations that embrace these changes and invest in their digital capabilities will be best positioned for long-term success.

The key to successful digital transformation lies in understanding that it's not just about technology—it's about creating a culture of innovation, empowering employees, and continuously adapting to new opportunities and challenges.`,
    excerpt: 'Explore how businesses are leveraging technology to transform their operations and stay competitive in the digital age.',
    author: 'John Smith',
    date: 'December 15, 2024',
    category: 'Technology',
    image: '🚀',
  },
  {
    slug: 'best-practices-for-cloud-migration',
    title: 'Best Practices for Cloud Migration',
    content: `Cloud migration has become a strategic priority for organizations looking to modernize their infrastructure, improve scalability, and reduce costs. However, migrating to the cloud requires careful planning and execution to avoid common pitfalls.

**Planning Phase**
Before beginning any migration, it's essential to conduct a thorough assessment of your current infrastructure. This includes:
- Inventorying all applications and their dependencies
- Identifying performance requirements and compliance needs
- Evaluating costs and potential savings
- Creating a detailed migration timeline

**Choosing the Right Strategy**
There are several migration strategies to consider:
- **Lift and Shift**: Moving applications as-is with minimal changes
- **Replatforming**: Making minor optimizations for the cloud
- **Refactoring**: Completely rearchitecting applications for cloud-native benefits
- **Hybrid Approach**: Combining on-premises and cloud solutions

**Security Considerations**
Security should be a top priority throughout the migration process. Implement:
- Strong access controls and identity management
- Encryption for data at rest and in transit
- Regular security audits and compliance checks
- Disaster recovery and backup strategies

**Best Practices**
1. Start with non-critical applications to build experience
2. Use automation tools to streamline the migration process
3. Monitor performance closely during and after migration
4. Train your team on cloud technologies and best practices
5. Establish clear governance and cost management policies

Successful cloud migration requires a combination of technical expertise, strategic planning, and organizational change management. By following these best practices, organizations can minimize risks and maximize the benefits of cloud computing.`,
    excerpt: 'Learn the essential steps and strategies for successfully migrating your infrastructure to the cloud.',
    author: 'Sarah Johnson',
    date: 'December 10, 2024',
    category: 'Cloud',
    image: '☁️',
  },
  {
    slug: 'cybersecurity-in-2024-what-you-need-to-know',
    title: 'Cybersecurity in 2024: What You Need to Know',
    content: `The cybersecurity landscape continues to evolve rapidly, with new threats emerging alongside innovative defense strategies. In 2024, organizations face an increasingly complex security environment that requires proactive measures and continuous vigilance.

**Current Threat Landscape**
Cybercriminals are becoming more sophisticated, using advanced techniques like:
- AI-powered attacks that can adapt and learn
- Ransomware-as-a-Service models that lower barriers to entry
- Supply chain attacks targeting third-party vendors
- Social engineering campaigns leveraging AI-generated content

**Key Security Trends**
1. **Zero Trust Architecture**: Moving beyond perimeter-based security to verify every access request
2. **AI and Machine Learning**: Using AI to detect anomalies and respond to threats in real-time
3. **Identity-Centric Security**: Focusing on user and device identity as the primary security boundary
4. **Cloud Security**: Enhanced focus on securing cloud environments and multi-cloud deployments

**Essential Security Practices**
- Implement multi-factor authentication across all systems
- Regularly update and patch software and systems
- Conduct regular security awareness training for employees
- Use encryption for sensitive data
- Maintain comprehensive backup and recovery procedures
- Monitor network traffic and system logs continuously

**Compliance and Regulations**
Organizations must stay informed about evolving regulations such as GDPR, CCPA, and industry-specific requirements. Compliance is not just about avoiding penalties—it's about protecting customer data and maintaining trust.

**The Human Element**
Despite advances in technology, human error remains a significant vulnerability. Investing in security awareness training and creating a culture of security is essential for effective defense.

As threats continue to evolve, organizations must adopt a proactive, layered approach to cybersecurity that combines technology, processes, and people. Regular assessments, continuous monitoring, and adaptive security strategies are key to staying ahead of cybercriminals.`,
    excerpt: 'Stay ahead of the latest cybersecurity threats and learn how to protect your business from emerging risks.',
    author: 'Mike Davis',
    date: 'December 5, 2024',
    category: 'Security',
    image: '🔒',
  },
  {
    slug: 'product-development-from-idea-to-market',
    title: 'Product Development: From Idea to Market',
    content: `Bringing a product from concept to market is a complex journey that requires careful planning, execution, and iteration. Whether you're developing a physical product, software application, or digital service, following a structured approach can significantly increase your chances of success.

**Phase 1: Ideation and Validation**
The first step is to validate that your idea solves a real problem for a specific audience. This involves:
- Conducting market research to understand customer needs
- Identifying your target audience and their pain points
- Analyzing competitors and market opportunities
- Creating a minimum viable product (MVP) concept

**Phase 2: Design and Prototyping**
Once validated, move into design and prototyping:
- Create detailed specifications and requirements
- Develop wireframes, mockups, or physical prototypes
- Gather feedback from potential users
- Iterate based on feedback before full development

**Phase 3: Development**
During development, focus on:
- Building core features that deliver value
- Maintaining code quality and documentation
- Implementing testing throughout the development process
- Preparing for scalability from the start

**Phase 4: Testing and Refinement**
Before launch, thorough testing is essential:
- User acceptance testing with real users
- Performance and load testing
- Security and compliance testing
- Bug fixes and final refinements

**Phase 5: Launch and Marketing**
A successful launch requires:
- Creating a go-to-market strategy
- Building anticipation through marketing campaigns
- Preparing customer support and documentation
- Monitoring metrics and gathering feedback

**Phase 6: Post-Launch Optimization**
After launch, continue to:
- Monitor user feedback and analytics
- Fix issues and improve features
- Plan for future iterations and updates
- Scale based on user demand

**Key Success Factors**
- Clear vision and product roadmap
- Strong team with diverse skills
- Customer-centric approach
- Agile development methodology
- Effective project management
- Adequate funding and resources

Remember, product development is an iterative process. Be prepared to pivot based on market feedback, and always keep your customers' needs at the center of your decisions.`,
    excerpt: 'A comprehensive guide to bringing your product ideas to life and successfully launching them in the market.',
    author: 'Emily Chen',
    date: 'November 28, 2024',
    category: 'Product',
    image: '💼',
  },
  {
    slug: 'the-power-of-ai-in-business-operations',
    title: 'The Power of AI in Business Operations',
    content: `Artificial Intelligence is transforming how businesses operate, offering unprecedented opportunities to automate processes, gain insights, and create value. From customer service to supply chain management, AI is reshaping every aspect of business operations.

**AI Applications in Business**
1. **Customer Service**: AI-powered chatbots and virtual assistants provide 24/7 support, handle routine inquiries, and escalate complex issues to human agents.

2. **Data Analytics**: Machine learning algorithms analyze vast amounts of data to identify patterns, predict trends, and provide actionable insights.

3. **Process Automation**: Robotic Process Automation (RPA) handles repetitive tasks, freeing employees to focus on strategic work.

4. **Predictive Maintenance**: AI systems predict equipment failures before they occur, reducing downtime and maintenance costs.

5. **Personalization**: AI enables hyper-personalized experiences for customers, from product recommendations to customized content.

**Benefits of AI Implementation**
- Increased efficiency and productivity
- Cost reduction through automation
- Improved decision-making with data-driven insights
- Enhanced customer experiences
- Competitive advantage through innovation

**Implementation Considerations**
Before implementing AI solutions, consider:
- Clear business objectives and use cases
- Data quality and availability
- Integration with existing systems
- Change management and training
- Ethical considerations and bias mitigation
- ROI and cost-benefit analysis

**Getting Started**
Start with low-risk, high-impact use cases. Focus on areas where AI can provide immediate value, such as customer service automation or data analysis. As you gain experience and see results, you can expand AI initiatives to other areas of your business.

**The Future of AI in Business**
As AI technology continues to advance, we can expect even more sophisticated applications. Organizations that invest in AI capabilities now will be better positioned to leverage future innovations and maintain competitive advantages.

The key to successful AI implementation is to start with clear objectives, ensure data quality, and focus on creating value for both your business and your customers.`,
    excerpt: 'Discover how artificial intelligence is revolutionizing business processes and creating new opportunities.',
    author: 'David Wilson',
    date: 'November 20, 2024',
    category: 'AI',
    image: '🤖',
  },
  {
    slug: 'building-scalable-solutions-for-growth',
    title: 'Building Scalable Solutions for Growth',
    content: `Scalability is a critical consideration for any growing business. Building solutions that can grow with your organization prevents costly rewrites and ensures smooth operations as demand increases.

**What is Scalability?**
Scalability refers to a system's ability to handle increased load, users, or data without significant performance degradation or the need for major architectural changes.

**Key Principles of Scalable Design**
1. **Modular Architecture**: Design systems with independent, loosely coupled components that can be scaled independently.

2. **Horizontal Scaling**: Plan for adding more servers or instances rather than just upgrading hardware (vertical scaling).

3. **Database Optimization**: Use appropriate database technologies, indexing strategies, and caching to handle growing data volumes.

4. **Load Balancing**: Distribute traffic across multiple servers to prevent bottlenecks and ensure high availability.

5. **Caching Strategies**: Implement caching at multiple levels to reduce database load and improve response times.

**Cloud-Native Approaches**
Modern scalable solutions leverage cloud platforms that offer:
- Auto-scaling capabilities
- Managed services for databases, queues, and storage
- Global content delivery networks (CDNs)
- Pay-as-you-go pricing models

**Architecture Patterns**
- **Microservices**: Break applications into smaller, independent services
- **Event-Driven Architecture**: Use messaging and events for asynchronous communication
- **API-First Design**: Create well-defined APIs that enable integration and flexibility
- **Containerization**: Use containers for consistent deployment and scaling

**Performance Optimization**
- Monitor and measure performance continuously
- Optimize code and database queries
- Use content delivery networks for static assets
- Implement lazy loading and pagination
- Optimize images and media files

**Planning for Scale**
When designing solutions, consider:
- Expected growth rates and peak loads
- Geographic expansion needs
- Integration requirements with other systems
- Compliance and security at scale
- Cost implications of scaling

**Best Practices**
- Start with a solid foundation but avoid over-engineering
- Design for failure and implement redundancy
- Use monitoring and alerting to detect issues early
- Document architecture decisions and patterns
- Plan for regular reviews and optimizations

Building scalable solutions requires balancing current needs with future growth. By following these principles and best practices, you can create systems that grow smoothly with your business.`,
    excerpt: 'Learn how to design and implement scalable solutions that grow with your business needs.',
    author: 'Lisa Anderson',
    date: 'November 15, 2024',
    category: 'Development',
    image: '📈',
  },
];

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const contentRef = useRef(null);
  const heroRef = useRef(null);

  const post = blogPosts.find(p => p.slug === params.slug);

  useEffect(() => {
    if (!post) {
      router.push('/blog');
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
  }, [post, router]);

  if (!post) {
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
            background: 'linear-gradient(225deg, rgba(248, 249, 250, 0.98) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(107, 70, 193, 0.06) 100%)',
            paddingTop: '200px',
            paddingBottom: '60px',
          }}
        >
          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <Link 
                  href="/blog" 
                  className="text-decoration-none mb-4 d-inline-block"
                  style={{ color: 'var(--light-purple)' }}
                  onClick={handleLinkClick}
                >
                  ← Back to Blog
                </Link>
                <div className="text-center mb-4" style={{ fontSize: '4rem' }}>
                  {post.image}
                </div>
                <div className="d-flex align-items-center gap-3 justify-content-center mb-3">
                  <span 
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background: 'rgba(107, 70, 193, 0.1)',
                      color: 'var(--light-purple)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {post.category}
                  </span>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    {post.date}
                  </span>
                </div>
                <h1 
                  className="text-center fw-bold mb-4"
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: 'var(--dark-purple)',
                    lineHeight: '1.2',
                  }}
                >
                  {post.title}
                </h1>
                <p className="text-center mb-0" style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
                  By {post.author}
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
                  className="blog-content"
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: 'var(--text-light)',
                  }}
                >
                  {post.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      const text = paragraph.replace(/\*\*/g, '');
                      return (
                        <h3 key={index} className="mt-4 mb-3" style={{ color: 'var(--dark-purple)', fontSize: '1.5rem' }}>
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
      </main>
      <Footer />
      <FloatingHelpPopup />
    </>
  );
}



