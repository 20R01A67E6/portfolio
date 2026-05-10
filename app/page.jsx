"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function Portfolio() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState({});
  const [typedText, setTypedText] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  const titles = ["Software Developer", "AI/ML Engineer", "Computer Vision Specialist", "Full Stack Developer"];
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentTitle.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(currentTitle.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTitleIndex((titleIndex + 1) % titles.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  useEffect(() => {
    const moveCursor = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < 300) { setActiveNav(sections[i]); break; }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisibleSections((p) => ({ ...p, [e.target.id]: true }));
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-animate]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('/api/trackVisit', { method: 'POST' }).catch(() => {});
    (async () => {
      try {
        const res = await fetch('/api/getCertificates');
        const data = await res.json();
        setCertificates(data.certificates || []);
      } catch { setCertificates([]); }
      finally { setLoadingCerts(false); }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res = await fetch('/api/submitForm', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Analysis Express",
      period: "Jan 2026 — Present",
      location: "West Chester, OH",
      highlights: [
        "Architected and developed core Python modules for the IrisX platform — an automated engineering drawing analysis system that processes complex CAD drawings",
        "Implemented YOLO11s-pose and YOLO12m object detection models for real-time GD&T (Geometric Dimensioning & Tolerancing) symbol recognition, increasing company efficiency by 15%",
        "Designed and built an end-to-end synthetic data pipeline generating 100K+ annotated training images with realistic noise, rotation, and scale variations",
        "Orchestrated distributed multi-GPU model training across 8× NVIDIA RTX 5090 GPUs on Vast.ai cloud infrastructure, reducing training time by 6x",
        "Developed a production-grade Flask REST API enabling batch document processing with concurrent model inference and queue-based job management",
        "Integrated OCR text extraction with symbol detection pipeline for comprehensive drawing analysis and automated compliance checking",
        "Implemented model versioning, A/B testing framework, and performance monitoring dashboards for continuous model improvement",
        "Collaborated with mechanical engineers to refine detection accuracy for industry-specific symbols and annotation standards"
      ]
    },
    {
      title: "Graduate Student Associate",
      company: "University of Cincinnati",
      period: "May 2025 — Apr 2026",
      location: "Cincinnati, OH",
      highlights: [
        "Supervised and coordinated team workflows across multiple research projects involving dataset curation and annotation",
        "Automated weekly operations reporting using Python scripts and built interactive dashboards for real-time project tracking",
        "Managed large-scale dataset pipelines for academic research, ensuring data quality and version control across collaborators"
      ]
    }
  ];

  const projects = [
    { title: "privtrain-demo", desc: "Privacy-preserving ML training system with differential privacy guarantees for sensitive data", tags: ["Python", "ML", "Privacy"], link: "https://privtrain-demo.vercel.app/" },
    { title: "YOLO Face Detection", desc: "Real-time face detection system using YOLO architecture with live webcam inference", tags: ["YOLO", "OpenCV", "Deep Learning"], link: "https://github.com/20R01A67E6/YOLO-face-detection" }
  ];

  const skillBars = [
    { name: "Python", level: 95 },
    { name: "Machine Learning", level: 88 },
    { name: "Computer Vision", level: 85 },
    { name: "React / Next.js", level: 82 },
    { name: "Docker / AWS", level: 78 },
    { name: "Flask / Node.js", level: 80 },
  ];

  const stats = [
    { number: "100K+", label: "Training Images Generated" },
    { number: "10+", label: "Models Built & Tested" },
    { number: "15%", label: "Company Efficiency Boost" },
    { number: "10+", label: "Projects Built" }
  ];

  const vis = (id) => visibleSections[id];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #08080d; color: #e8e6e3; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

        ::selection { background: rgba(212, 175, 55, 0.3); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #08080d; }
        ::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.25); border-radius: 10px; }

        .custom-cursor {
          width: 40px; height: 40px; border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 50%; position: fixed; top: 0; left: 0;
          pointer-events: none; z-index: 9999;
          transition: transform 0.15s ease-out;
          mix-blend-mode: difference;
        }
        .cursor-dot {
          width: 8px; height: 8px; background: #d4af37;
          border-radius: 50%; position: fixed; top: 0; left: 0;
          pointer-events: none; z-index: 10000;
          transition: transform 0.08s ease-out;
        }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes barFill { from { width: 0%; } }
        @keyframes borderGlow { 0%, 100% { border-color: rgba(212, 175, 55, 0.1); } 50% { border-color: rgba(212, 175, 55, 0.3); } }

        .hero-anim-1 { animation: fadeUp 1s ease-out 0.2s both; }
        .hero-anim-2 { animation: fadeUp 1s ease-out 0.4s both; }
        .hero-anim-3 { animation: fadeUp 1s ease-out 0.6s both; }
        .hero-anim-4 { animation: fadeUp 1s ease-out 0.8s both; }
        .hero-anim-5 { animation: fadeUp 1s ease-out 1s both; }

        .typing-cursor { animation: pulse 0.8s infinite; color: #d4af37; }

        .nav-item { position: relative; transition: color 0.3s; }
        .nav-item::after {
          content: ''; position: absolute; bottom: -6px; left: 50%; width: 0; height: 2px;
          background: #d4af37; transition: all 0.3s ease; transform: translateX(-50%);
        }
        .nav-item:hover::after, .nav-active::after { width: 100%; }
        .nav-active { color: #d4af37 !important; }

        .glow-card {
          position: relative; overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glow-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.06) 0%, transparent 60%);
          pointer-events: none; opacity: 0; transition: opacity 0.3s;
        }
        .glow-card:hover::before { opacity: 1; }
        .glow-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.25);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.05);
        }

        .skill-bar-fill {
          animation: barFill 1.5s ease-out both;
          position: relative; overflow: hidden;
        }
        .skill-bar-fill::after {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmer 2s infinite;
        }

        .stat-card { transition: all 0.4s ease; animation: borderGlow 3s infinite; }
        .stat-card:hover { transform: scale(1.05); background: rgba(212, 175, 55, 0.05); }

        .floating-shape { position: absolute; border-radius: 50%; animation: float 6s ease-in-out infinite; pointer-events: none; }

        .input-glow { transition: all 0.3s ease; }
        .input-glow:focus {
          outline: none; border-color: rgba(212, 175, 55, 0.4);
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.08), 0 0 20px rgba(212, 175, 55, 0.05);
        }

        .submit-glow { transition: all 0.4s ease; position: relative; overflow: hidden; }
        .submit-glow::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s ease;
        }
        .submit-glow:hover::before { left: 100%; }
        .submit-glow:hover { transform: translateY(-3px); box-shadow: 0 10px 40px rgba(212, 175, 55, 0.35); }

        .cert-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .cert-card:hover { transform: translateY(-6px) scale(1.02); border-color: rgba(212, 175, 55, 0.3); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }

        .footer-link { position: relative; transition: color 0.3s; }
        .footer-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #d4af37; transition: width 0.3s; }
        .footer-link:hover::after { width: 100%; }

        /* Hamburger menu */
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 5px; z-index: 200; }
        .hamburger span { display: block; width: 24px; height: 2px; background: #d4af37; transition: all 0.3s ease; }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        .desktop-nav { display: flex; gap: 2rem; align-items: center; }
        .mobile-nav {
          display: none; position: fixed; top: 0; right: -100%; width: 280px; height: 100vh;
          background: rgba(8, 8, 13, 0.98); backdrop-filter: blur(20px);
          flex-direction: column; padding: 6rem 2.5rem 2rem;
          border-left: 1px solid rgba(212, 175, 55, 0.1);
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1); z-index: 150;
        }
        .mobile-nav.open { right: 0; }
        .mobile-overlay {
          display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.6); z-index: 140; opacity: 0; transition: opacity 0.3s;
          pointer-events: none;
        }
        .mobile-overlay.open { opacity: 1; pointer-events: auto; }

        /* ===== MOBILE RESPONSIVE ===== */
        @media (max-width: 900px) {
          body { cursor: auto; }
          .custom-cursor, .cursor-dot { display: none !important; }
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-nav { display: flex !important; }
          .mobile-overlay { display: block !important; }

          .glow-card:hover { transform: none; }
          .stat-card:hover { transform: none; }
          .cert-card:hover { transform: none; }
        }

        @media (max-width: 768px) {
          .hero-title-text { font-size: 2.8rem !important; }
          .hero-typed { font-size: 1.15rem !important; }
          .section-heading { font-size: 2rem !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .certs-grid { grid-template-columns: 1fr !important; }
          .contact-inputs { grid-template-columns: 1fr !important; }
          .section-pad { padding: 4rem 1.25rem !important; }
          .hero-section { padding: 0 1.25rem !important; }
          .nav-bar { padding: 1rem 1.25rem !important; }
          .footer-inner { flex-direction: column; gap: 1.5rem; text-align: center; }
          .hero-buttons { flex-direction: column; }
          .hero-buttons a, .hero-buttons button { width: 100%; text-align: center; }
          .scroll-indicator { display: none !important; }
          .exp-header { flex-direction: column !important; gap: 0.5rem !important; }
          .exp-period { white-space: normal !important; }
        }

        @media (max-width: 480px) {
          .hero-title-text { font-size: 2.2rem !important; }
          .hero-typed { font-size: 1rem !important; }
          .section-heading { font-size: 1.7rem !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
          .stat-number { font-size: 1.8rem !important; }
        }
      `}</style>

      {/* Custom Cursor (desktop only) */}
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="cursor-dot" />

      <div style={{ minHeight: '100vh', background: '#08080d', position: 'relative', overflowX: 'hidden' }}>

        {/* Ambient Background */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '30%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(100, 120, 180, 0.03) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'fixed', top: mousePos.y - 200, left: mousePos.x - 200, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.015) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', transition: 'top 0.3s ease-out, left 0.3s ease-out' }} />
        </div>

        {/* Navigation */}
        <nav className="nav-bar" style={{
          position: 'fixed', top: 0, width: '100%', zIndex: 100, padding: '1.25rem 3rem',
          background: scrollY > 80 ? 'rgba(8, 8, 13, 0.95)' : 'transparent',
          backdropFilter: scrollY > 80 ? 'blur(16px)' : 'none',
          borderBottom: scrollY > 80 ? '1px solid rgba(212, 175, 55, 0.06)' : '1px solid transparent',
          transition: 'all 0.5s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: '600', background: 'linear-gradient(135deg, #d4af37, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', zIndex: 200 }}>ARK</div>

          {/* Desktop Nav */}
          <div className="desktop-nav">
            {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                className={`nav-item ${activeNav === item.toLowerCase() ? 'nav-active' : ''}`}
                style={{ background: 'none', border: 'none', color: activeNav === item.toLowerCase() ? '#d4af37' : '#777', fontSize: '0.85rem', fontWeight: '400', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", padding: '0.25rem 0', cursor: 'pointer' }}>
                {item}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>

          {/* Mobile Overlay */}
          <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

          {/* Mobile Nav */}
          <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
            {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                style={{ background: 'none', border: 'none', color: activeNav === item.toLowerCase() ? '#d4af37' : '#888', fontSize: '1.1rem', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", padding: '1rem 0', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {item}
              </button>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section id="home" className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 3rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, paddingBottom: '5rem', paddingTop: '6rem' }}>
          <div className="floating-shape" style={{ top: '15%', right: '10%', width: '6px', height: '6px', background: 'rgba(212, 175, 55, 0.3)', animationDelay: '0s' }} />
          <div className="floating-shape" style={{ top: '60%', right: '20%', width: '4px', height: '4px', background: 'rgba(212, 175, 55, 0.2)', animationDelay: '2s' }} />
          <div className="floating-shape" style={{ top: '40%', right: '5%', width: '8px', height: '8px', border: '1px solid rgba(212, 175, 55, 0.15)', background: 'transparent', animationDelay: '4s' }} />

          <p className="hero-anim-1" style={{ fontSize: '0.9rem', color: '#d4af37', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '2rem' }}>Welcome to my portfolio</p>
          <h1 className="hero-anim-2 hero-title-text" style={{
            fontFamily: "'Playfair Display', serif", fontSize: '5.5rem', fontWeight: '600', lineHeight: 1.05, marginBottom: '1.5rem', maxWidth: '800px',
            background: 'linear-gradient(135deg, #e8e6e3 0%, #d4af37 40%, #f4d03f 60%, #e8e6e3 100%)', backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'shimmer 5s linear infinite, fadeUp 1s ease-out 0.4s both'
          }}>Abhinav Reddy Kandula</h1>
          <div className="hero-anim-3 hero-typed" style={{ fontSize: '1.5rem', color: '#999', marginBottom: '2rem', fontWeight: '300', minHeight: '2.5rem' }}>
            {typedText}<span className="typing-cursor" style={{ fontSize: '1.6rem', fontWeight: '300' }}>|</span>
          </div>
          <p className="hero-anim-4" style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.9, maxWidth: '550px', marginBottom: '3rem', fontWeight: '300' }}>
            Building intelligent systems at the intersection of computer vision, deep learning, and scalable web applications.
          </p>
          <div className="hero-anim-5 hero-buttons" style={{ display: 'flex', gap: '1.5rem' }}>
            <button onClick={() => scrollTo('contact')} className="submit-glow"
              style={{ padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #d4af37, #b8941e)', color: '#08080d', border: 'none', borderRadius: '3px', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}>
              Get in Touch
            </button>
            <a href="https://github.com/20R01A67E6" target="_blank" rel="noopener noreferrer"
              style={{ padding: '1rem 2.5rem', background: 'transparent', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '3px', fontSize: '0.85rem', fontWeight: '500', textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.3s ease', textAlign: 'center' }}
              onMouseEnter={(e) => { e.target.style.background = 'rgba(212, 175, 55, 0.08)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}>GitHub</a>
            <a href="https://www.linkedin.com/in/kandula-abhinav-reddy" target="_blank" rel="noopener noreferrer"
              style={{ padding: '1rem 2.5rem', background: 'transparent', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '3px', fontSize: '0.85rem', fontWeight: '500', textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.3s ease', textAlign: 'center' }}
              onMouseEnter={(e) => { e.target.style.background = 'rgba(212, 175, 55, 0.08)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}>LinkedIn</a>
            <a href="/resume.pdf" download="Abhinav Reddy Kandula Resume.pdf" style={{
              padding: '1rem 2.5rem', background: 'transparent', color: '#d4af37',
              border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '3px', fontSize: '0.85rem',
              fontWeight: '500', textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif", transition: 'all 0.3s ease', textAlign: 'center'
            }}
              onMouseEnter={(e) => { e.target.style.background = 'rgba(212, 175, 55, 0.08)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}>↓ Resume</a>
          </div>

          {/* Scroll indicator - fades out on scroll */}
          <div className="scroll-indicator" style={{
            position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            animation: 'float 3s ease-in-out infinite',
            opacity: Math.max(0, 1 - scrollY / 200),
            transition: 'opacity 0.3s ease',
            pointerEvents: scrollY > 50 ? 'none' : 'auto'
          }}>
            <span style={{ color: '#555', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ width: '1px', height: '25px', background: 'linear-gradient(to bottom, #d4af37, transparent)' }} />
          </div>
        </section>

        {/* Stats */}
        <section data-animate id="stats" className="section-pad" style={{
          padding: '4rem 3rem', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.04)',
          opacity: vis('stats') ? 1 : 0, transform: vis('stats') ? 'none' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 1
        }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {stats.map((s, i) => (
              <div key={i} className="stat-card" style={{ padding: '2rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', background: 'rgba(255,255,255,0.01)' }}>
                <div className="stat-number" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: '600', color: '#d4af37', marginBottom: '0.5rem' }}>{s.number}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" data-animate className="section-pad" style={{
          padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1,
          opacity: vis('about') ? 1 : 0, transform: vis('about') ? 'none' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '5rem', alignItems: 'start' }}>
            <div>
              <p style={{ color: '#d4af37', fontSize: '0.82rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>About</p>
              <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: '500', lineHeight: 1.15, color: '#e8e6e3' }}>The story so far</h2>
              <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, #d4af37, transparent)', marginTop: '2rem' }} />
            </div>
            <div>
              <p style={{ fontSize: '1.05rem', lineHeight: 2, color: '#888', marginBottom: '1.5rem', fontWeight: '300' }}>
                It started with a simple curiosity — how do machines learn to see? That question led me from writing my first Python script to training deep learning models on multi-GPU clusters. What began as late-night experiments with image classification evolved into a genuine obsession with making computers understand the visual world the way we do.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 2, color: '#888', marginBottom: '1.5rem', fontWeight: '300' }}>
                Today, I'm at Analysis Express, where I get to live that obsession every day. I build systems that read complex engineering drawings — something even experienced engineers find tedious — and turn them into structured, actionable data in seconds. When I saw our models increase the company's operational efficiency by 15%, I knew this was exactly where I was meant to be.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 2, color: '#888', fontWeight: '300' }}>
                But I'm not just about AI. I love the entire journey from idea to deployment — designing clean APIs, crafting intuitive interfaces, and making sure the whole system works seamlessly. Whether it's generating 100K synthetic training images or building a React dashboard, I bring the same energy: build it right, make it beautiful, and never stop learning.
              </p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" data-animate className="section-pad" style={{
          padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1,
          opacity: vis('experience') ? 1 : 0, transform: vis('experience') ? 'none' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <p style={{ color: '#d4af37', fontSize: '0.82rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>Career</p>
          <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: '500', marginBottom: '1rem', color: '#e8e6e3' }}>Experience</h2>
          <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, #d4af37, transparent)', marginBottom: '4rem' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {experiences.map((exp, i) => (
              <div key={i} className="glow-card" onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
              }} style={{ padding: '2.5rem 2.5rem 2.5rem 3rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)', borderLeft: '3px solid #d4af37' }}>
                <div className="exp-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '500', color: '#e8e6e3', marginBottom: '0.4rem' }}>{exp.title}</h3>
                    <p style={{ color: '#d4af37', fontWeight: '400' }}>{exp.company}<span style={{ color: '#555', margin: '0 0.75rem' }}>·</span><span style={{ color: '#666', fontSize: '0.9rem' }}>{exp.location}</span></p>
                  </div>
                  <span className="exp-period" style={{ color: '#555', fontSize: '0.9rem', whiteSpace: 'nowrap', fontWeight: '300' }}>{exp.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {exp.highlights.map((h, j) => (
                    <li key={j} style={{ color: '#777', fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: '1.25rem', position: 'relative', marginBottom: '0.4rem' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#d4af37', fontSize: '0.7rem', top: '0.45rem' }}>◆</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" data-animate className="section-pad" style={{
          padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1,
          opacity: vis('skills') ? 1 : 0, transform: vis('skills') ? 'none' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <p style={{ color: '#d4af37', fontSize: '0.82rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>Expertise</p>
          <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: '500', marginBottom: '1rem', color: '#e8e6e3' }}>Skills</h2>
          <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, #d4af37, transparent)', marginBottom: '4rem' }} />

          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem 4rem' }}>
            {skillBars.map((s, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ color: '#ccc', fontSize: '0.95rem' }}>{s.name}</span>
                  <span style={{ color: '#d4af37', fontSize: '0.85rem' }}>{s.level}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div className={vis('skills') ? 'skill-bar-fill' : ''} style={{ width: vis('skills') ? `${s.level}%` : '0%', height: '100%', background: 'linear-gradient(90deg, #d4af37, #f4d03f)', borderRadius: '10px', animationDelay: `${i * 0.15}s` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-animate className="section-pad" style={{
          padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1,
          opacity: vis('projects') ? 1 : 0, transform: vis('projects') ? 'none' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <p style={{ color: '#d4af37', fontSize: '0.82rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>Work</p>
          <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: '500', marginBottom: '1rem', color: '#e8e6e3' }}>Featured Projects</h2>
          <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, #d4af37, transparent)', marginBottom: '4rem' }} />

          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {projects.map((proj, i) => (
              <a key={i} href={proj.link} target="_blank" rel="noopener noreferrer" className="glow-card"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                  e.currentTarget.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
                }}
                style={{ padding: '2.5rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', background: 'rgba(255,255,255,0.015)', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#e8e6e3', marginBottom: '0.75rem' }}>{proj.title}</h3>
                <p style={{ color: '#777', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{proj.desc}</p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {proj.tags.map((t) => (
                    <span key={t} style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '2px', color: '#d4af37', background: 'rgba(212, 175, 55, 0.05)' }}>{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" data-animate className="section-pad" style={{
          padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1,
          opacity: vis('certifications') ? 1 : 0, transform: vis('certifications') ? 'none' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <p style={{ color: '#d4af37', fontSize: '0.82rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>Achievements</p>
          <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: '500', marginBottom: '1rem', color: '#e8e6e3' }}>Certifications</h2>
          <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, #d4af37, transparent)', marginBottom: '4rem' }} />

          {loadingCerts ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d4af37', animation: `pulse 1.2s infinite ${i * 0.2}s` }} />)}
            </div>
          ) : certificates.length > 0 ? (
            <div className="certs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {certificates.map((cert, i) => (
                <a key={i} href={cert.webViewLink} target="_blank" rel="noopener noreferrer" className="cert-card"
                  style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', background: 'rgba(255,255,255,0.015)', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '500', color: '#e8e6e3', marginBottom: '0.75rem', lineHeight: 1.4 }}>{cert.name}</h4>
                  <span style={{ color: '#d4af37', fontSize: '0.85rem' }}>View Certificate →</span>
                </a>
              ))}
            </div>
          ) : (
            <p style={{ color: '#555', fontSize: '1rem', fontStyle: 'italic' }}>Certifications coming soon.</p>
          )}
        </section>

        {/* Contact */}
        <section id="contact" data-animate className="section-pad" style={{
          padding: '8rem 3rem', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1,
          opacity: vis('contact') ? 1 : 0, transform: vis('contact') ? 'none' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#d4af37', fontSize: '0.82rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>Connect</p>
            <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: '500', color: '#e8e6e3' }}>Let's Work Together</h2>
            <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', margin: '2rem auto' }} />
            <p style={{ color: '#777', fontSize: '1.05rem', lineHeight: 1.9, fontWeight: '300' }}>Have a project in mind or want to discuss opportunities? I'd love to hear from you.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="contact-inputs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="input-glow"
                style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '3px', color: '#e8e6e3', fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif" }} />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="input-glow"
                style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '3px', color: '#e8e6e3', fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif" }} />
            </div>
            <textarea placeholder="Your message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows="6" className="input-glow"
              style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '3px', color: '#e8e6e3', fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif", resize: 'none' }} />
            <button type="submit" disabled={loading} className="submit-glow"
              style={{ padding: '1rem', background: 'linear-gradient(135deg, #d4af37, #b8941e)', color: '#08080d', border: 'none', borderRadius: '3px', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {submitted && <p style={{ color: '#d4af37', textAlign: 'center', fontSize: '0.95rem' }}>✓ Message sent successfully.</p>}
            {error && <p style={{ color: '#e74c3c', textAlign: 'center', fontSize: '0.95rem' }}>{error}</p>}
          </form>
        </section>

        {/* Footer */}
        <footer className="section-pad" style={{ padding: '4rem 3rem', borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', zIndex: 1 }}>
          <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#444', fontSize: '0.9rem', fontWeight: '300' }}>© 2026 Abhinav Reddy Kandula</p>
            <div style={{ display: 'flex', gap: '2.5rem' }}>
              {[{ label: 'GitHub', url: 'https://github.com/20R01A67E6' }, { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kandula-abhinav-reddy' }, { label: 'Resume', url: '/resume.pdf' }, { label: 'Email', url: 'mailto:abhinavjsearch@gmail.com' }].map((l) => (
                <a key={l.label} href={l.url} target={l.url.startsWith('mailto') || l.url.startsWith('/') ? undefined : '_blank'} rel="noopener noreferrer" className="footer-link"
                  download={l.url.endsWith('.pdf') ? "Abhinav Reddy Kandula Resume.pdf" : undefined}
                  style={{ color: '#555', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}
                  onMouseEnter={(e) => e.target.style.color = '#d4af37'} onMouseLeave={(e) => e.target.style.color = '#555'}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
