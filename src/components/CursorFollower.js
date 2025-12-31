'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const glowRef = useRef(null);
  const innerDotRef = useRef(null);
  const pulseRingRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const glow = glowRef.current;
    const innerDot = innerDotRef.current;
    const pulseRing = pulseRingRef.current;

    if (!cursor || !follower || !glow || !innerDot || !pulseRing) return;

    if (window.innerWidth < 768) {
      cursor.style.display = 'none';
      follower.style.display = 'none';
      glow.style.display = 'none';
      return;
    }

    // Initial setup with GSAP
    gsap.set([cursor, follower, glow], {
      xPercent: -50,
      yPercent: -50,
    });

    // Continuous rotation animation for pulse ring
    gsap.to(pulseRing, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: 'none',
    });

    // Breathing animation for inner dot
    gsap.to(innerDot, {
      scale: 1.2,
      opacity: 0.7,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let glowX = 0;
    let glowY = 0;
    let velocity = { x: 0, y: 0 };
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Calculate velocity for dynamic effects
      velocity.x = mouseX - lastMouseX;
      velocity.y = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Immediate cursor position
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0,
        ease: 'none',
      });

      // Smooth follower with spring-like effect
      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Slower glow for depth effect
      gsap.to(glow, {
        x: mouseX,
        y: mouseY,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Dynamic rotation based on movement
      const rotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
      if (Math.abs(velocity.x) > 0.5 || Math.abs(velocity.y) > 0.5) {
        gsap.to(follower, {
          rotation: rotation,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      
      // Create a timeline for click animation
      const clickTL = gsap.timeline();
      
      clickTL
        .to([cursor, follower, glow], {
          scale: 0.85,
          duration: 0.1,
          ease: 'power2.out',
        })
        .to(innerDot, {
          scale: 0.5,
          duration: 0.1,
          ease: 'power2.out',
        }, 0)
        .to(pulseRing, {
          scale: 1.3,
          opacity: 0.8,
          duration: 0.15,
          ease: 'power2.out',
        }, 0);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      
      const releaseTL = gsap.timeline();
      
      releaseTL
        .to(cursor, {
          scale: isHovering ? 1.8 : 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        })
        .to(follower, {
          scale: isHovering ? 1.8 : 1,
          rotation: 0,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        }, 0)
        .to(glow, {
          scale: isHovering ? 1.5 : 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        }, 0)
        .to(innerDot, {
          scale: isHovering ? 1.5 : 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        }, 0)
        .to(pulseRing, {
          scale: 1,
          opacity: 0.6,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        }, 0);
    };

    const handleLinkHover = (e) => {
      setIsHovering(true);
      
      const hoverTL = gsap.timeline();
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      hoverTL
        .to(cursor, {
          x: centerX,
          y: centerY,
          scale: 1.5,
          width: '12px',
          height: '12px',
          duration: 0.5,
          ease: 'back.out(1.7)',
        })
        .to(follower, {
          x: centerX,
          y: centerY,
          scale: 1.5,
          width: '45px',
          height: '45px',
          opacity: 0.7,
          rotation: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }, 0)
        .to(glow, {
          x: centerX,
          y: centerY,
          scale: 1.6,
          opacity: 0.6,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }, 0)
        .to(innerDot, {
          scale: 1.5,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }, 0)
        .to(pulseRing, {
          scale: 1.2,
          opacity: 0.8,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }, 0);

      // Magnetic effect - slight pull towards center
      gsap.to(follower, {
        x: centerX,
        y: centerY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLinkLeave = () => {
      setIsHovering(false);
      
      const leaveTL = gsap.timeline();
      
      leaveTL
        .to(cursor, {
          scale: 1,
          width: '8px',
          height: '8px',
          duration: 0.4,
          ease: 'back.out(2)',
        })
        .to(follower, {
          scale: 1,
          width: '32px',
          height: '32px',
          opacity: 0.4,
          rotation: 0,
          duration: 0.4,
          ease: 'back.out(2)',
        }, 0)
        .to(glow, {
          scale: 1,
          opacity: 0.3,
          duration: 0.4,
          ease: 'back.out(2)',
        }, 0)
        .to(innerDot, {
          scale: 1,
          opacity: 0.9,
          duration: 0.4,
          ease: 'back.out(2)',
        }, 0)
        .to(pulseRing, {
          scale: 1,
          opacity: 0.3,
          duration: 0.4,
          ease: 'back.out(2)',
        }, 0);
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        glow.style.display = 'none';
      } else {
        cursor.style.display = 'block';
        follower.style.display = 'block';
        glow.style.display = 'block';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    const updateLinks = () => {
      const links = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      links.forEach((link) => {
        link.addEventListener('mouseenter', handleLinkHover);
        link.addEventListener('mouseleave', handleLinkLeave);
      });
      return links;
    };

    let links = updateLinks();

    // Update links periodically for dynamically added elements
    const linkUpdateInterval = setInterval(() => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
      links = updateLinks();
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      clearInterval(linkUpdateInterval);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [isHovering]);

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6B46C1 50%, #A78BFA 100%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px rgba(139, 92, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.3)',
          willChange: 'transform',
        }}
      >
        <div
          ref={innerDotRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.5)',
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* Follower Ring */}
      <div
        ref={followerRef}
        className="custom-cursor-follower"
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(139, 92, 246, 0.6)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 100%)',
          boxShadow: '0 0 25px rgba(139, 92, 246, 0.4), inset 0 0 15px rgba(139, 92, 246, 0.15)',
          opacity: 0.4,
          willChange: 'transform, opacity, width, height',
        }}
      >
        {/* Animated pulse ring with GSAP */}
        <div
          ref={pulseRingRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px solid rgba(139, 92, 246, 0.4)',
            opacity: 0.6,
            willChange: 'transform, opacity, scale',
          }}
        />
      </div>

      {/* Glow effect */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9997,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(107, 70, 193, 0.25) 30%, rgba(167, 139, 250, 0.15) 50%, transparent 70%)',
          filter: 'blur(20px)',
          opacity: 0.3,
          willChange: 'transform, opacity, scale',
        }}
      />
    </>
  );
}

