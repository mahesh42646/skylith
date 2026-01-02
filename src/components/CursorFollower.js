'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    if (window.innerWidth < 768) {
      cursor.style.display = 'none';
      follower.style.display = 'none';
      return;
    }

    // Initial setup with GSAP
    gsap.set([cursor, follower], {
      xPercent: -50,
      yPercent: -50,
    });

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

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
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      
      gsap.to([cursor, follower], {
        scale: 0.8,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      
      gsap.to(cursor, {
        scale: isHovering ? 1.5 : 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
      
      gsap.to(follower, {
        scale: isHovering ? 1.5 : 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    const handleLinkHover = (e) => {
      setIsHovering(true);
      
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      gsap.to(cursor, {
        x: centerX,
        y: centerY,
        scale: 1.5,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });

      gsap.to(follower, {
        x: centerX,
        y: centerY,
        scale: 1.5,
        opacity: 0.6,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    };

    const handleLinkLeave = () => {
      setIsHovering(false);
      
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(2)',
      });

      gsap.to(follower, {
        scale: 1,
        opacity: 0.3,
        duration: 0.3,
        ease: 'back.out(2)',
      });
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
      } else {
        cursor.style.display = 'block';
        follower.style.display = 'block';
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
      {/* Main Cursor Dot - Minimal & Elegant */}
      <div
        ref={cursorRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6B46C1 100%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.3)',
          willChange: 'transform',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Follower Ring - Subtle & Professional */}
      <div
        ref={followerRef}
        className="custom-cursor-follower"
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(139, 92, 246, 0.4)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
          opacity: 0.3,
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}
