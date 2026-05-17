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
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  const titles = ["Software Developer", "AI/ML Engineer", "Computer Vision Specialist", "Full Stack Developer"];
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mount check
  useEffect(() => { setMounted(true); }, []);

  // Typing animation
  useEffect(() => {
    if (!mounted) return;
    const currentTitle = titles[titleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentTitle.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentTitle.length) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setTypedText(currentTitle.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) { setIsDeleting(false); setTitleIndex((titleIndex + 1) % titles.length); }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex, mounted]);

  // Custom cursor
  useEffect(() => {
    const moveCursor = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Scroll tracking + active nav
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

  // Intersection observer
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

  // API calls
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

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  const handleCardGlow = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const vis = (id) => visibleSections[id];

  // ===== DATA =====
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Analysis Express",
      period: "Jan 2026 — Present",
      location: "West Chester, OH",
      highlights: [
        "Built the core Python engine behind IrisX, a platform that automates engineering drawing analysis for manufacturing clients. Before IrisX, engineers spent hours manually reviewing technical drawings for compliance. Now the system handles it in minutes.",
        "Trained and fine-tuned over 10 YOLO-based object detection models from scratch, including YOLO11s-pose and YOLO12m, to recognize GD&T symbols on complex engineering blueprints. Went through multiple iterations of data collection, labeling, and hyperparameter tuning to get production-ready results.",
        "Designed a synthetic data generation pipeline that produced over 100,000 annotated training images with realistic noise, rotation, and scale variations, solving the problem of limited real-world labeled data.",
        "Set up distributed model training across cloud GPUs on Vast.ai, cutting training cycles from days to hours and enabling rapid experimentation with new model architectures.",
        "Developed a Flask REST API for batch document processing that handles concurrent inference requests, allowing multiple engineers to submit drawings for analysis simultaneously.",
        "Integrated OCR text extraction with the symbol detection pipeline so the system could read both visual symbols and written annotations from a single drawing.",
        "Built model versioning and monitoring dashboards so the team could track performance metrics across different model iterations and catch regressions early.",
        "Worked closely with mechanical engineers to understand real-world edge cases and refine detection accuracy for industry-specific annotation standards."
      ]
    },
    {
      title: "Graduate Student Associate",
      company: "University of Cincinnati",
      period: "May 2025 — Apr 2026",
      location: "Cincinnati, OH",
      highlights: [
        "Coordinated team workflows across multiple research projects, managing dataset curation and annotation pipelines that supported ongoing academic research.",
        "Built Python automation scripts that replaced manual weekly reporting, saving the team roughly 4 hours per week and generating interactive dashboards for real-time project tracking.",
        "Maintained large-scale dataset pipelines, ensuring data quality, proper version control, and smooth handoffs between collaborators working on shared research datasets."
      ]
    }
  ];

  const projects = [
    { title: "privtrain", desc: "An end-to-end privacy-preserving machine learning training system. Built this to explore how differential privacy can protect sensitive training data without sacrificing model accuracy. The demo walks through the full pipeline from data preprocessing to private model training and evaluation.", tags: ["Python", "ML", "Differential Privacy"], link: "https://privtrain-demo.vercel.app/" },
    { title: "RAGaii", desc: "A full-stack AI-powered RAG platform built from scratch. Upload documents, codebases, product catalogs, or news feeds and ask questions in plain English to get instant AI-powered answers. Features 5 distinct modes, dual LLM support with Groq and Gemini with automatic fallback, Supabase authentication, pgvector embeddings, and a fully responsive dashboard.", tags: ["Next.js", "FastAPI", "Python", "Supabase", "pgvector", "Groq", "Gemini"], link: "https://ragaii.vercel.app" }
  ];

  const skillBars = [
    { name: "Python", level: 95 },
    { name: "Machine Learning / Deep Learning", level: 88 },
    { name: "Computer Vision (YOLO, OpenCV)", level: 85 },
    { name: "Agentic AI / LLM Orchestration", level: 80 },
    { name: "React / Next.js", level: 82 },
    { name: "Flask / Node.js / REST APIs", level: 80 },
    { name: "Databases (PostgreSQL, Firebase, MongoDB)", level: 78 },
    { name: "Docker / AWS / Cloud Infrastructure", level: 78 },
    { name: "Java / C++ / SQL", level: 75 },
    { name: "Git / CI-CD / Linux", level: 82 },
  ];

  const stats = [
    { number: "100K+", label: "Training Images Generated" },
    { number: "10+", label: "Models Built & Tested" },
    { number: "15%", label: "Company Efficiency Boost" },
    { number: "10+", label: "Projects Built" }
  ];

  const navItems = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact'];

  return (
    <>
      {/* Custom Cursor */}
      {mounted && <div ref={cursorRef} className="custom-cursor" />}
      {mounted && <div ref={cursorDotRef} className="cursor-dot" />}

      <div className="min-h-screen bg-dark relative overflow-x-hidden">

        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[30%] right-[5%] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(100,120,180,0.03) 0%, transparent 70%)' }} />
          <div className="fixed w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-300 ease-out"
            style={{ top: mounted ? mousePos.y - 200 : -400, left: mounted ? mousePos.x - 200 : -400, background: 'radial-gradient(circle, rgba(212,175,55,0.015) 0%, transparent 70%)' }} />
        </div>

        {/* Navigation */}
        <nav className="nav-bar fixed top-0 w-full z-[100] px-12 py-5 flex justify-between items-center transition-all duration-500"
          style={{
            background: mounted && scrollY > 80 ? 'rgba(8,8,13,0.95)' : 'transparent',
            backdropFilter: mounted && scrollY > 80 ? 'blur(16px)' : 'none',
            borderBottom: mounted && scrollY > 80 ? '1px solid rgba(212,175,55,0.06)' : '1px solid transparent',
          }}>
          <div className="font-serif text-2xl font-semibold z-[200]" style={{ background: 'linear-gradient(135deg, #d4af37, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ARK</div>

          {/* Desktop Nav */}
          <div className="desktop-nav flex gap-8 items-center">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                className={`nav-item ${activeNav === item.toLowerCase() ? 'nav-active' : ''} bg-transparent border-none text-sm font-normal tracking-widest uppercase font-sans py-1 cursor-pointer`}
                style={{ color: activeNav === item.toLowerCase() ? '#d4af37' : '#777' }}>
                {item}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>

          {/* Mobile Overlay + Nav */}
          <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
          <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                className="bg-transparent border-none text-left text-lg font-normal tracking-widest uppercase font-sans py-4 cursor-pointer border-b border-white/5"
                style={{ color: activeNav === item.toLowerCase() ? '#d4af37' : '#888' }}>
                {item}
              </button>
            ))}
          </div>
        </nav>

        {/* ===== HERO ===== */}
        <section id="home" className="hero-section min-h-screen flex flex-col justify-center px-12 max-w-[1200px] mx-auto relative z-[1] pt-24 pb-20">
          <div className="floating-shape top-[15%] right-[10%] w-1.5 h-1.5 bg-gold/30" />
          <div className="floating-shape top-[60%] right-[20%] w-1 h-1 bg-gold/20" style={{ animationDelay: '2s' }} />
          <div className="floating-shape top-[40%] right-[5%] w-2 h-2 border border-gold/15 bg-transparent" style={{ animationDelay: '4s' }} />

          <p className="hero-anim-1 text-sm text-gold tracking-[4px] uppercase mb-8">Welcome to my portfolio</p>

          <h1 className="hero-anim-2 hero-shimmer hero-title font-serif text-[5.5rem] font-semibold leading-[1.05] mb-6 max-w-[800px]">
            Abhinav Reddy Kandula
          </h1>

          <div className="hero-anim-3 hero-typed text-2xl text-gray-400 mb-8 font-light min-h-[2.5rem]">
            {mounted ? typedText : ''}<span className="typing-cursor text-[1.6rem] font-light">|</span>
          </div>

          <p className="hero-anim-4 text-lg text-gray-500 leading-relaxed max-w-[550px] mb-12 font-light">
            Building intelligent systems at the intersection of computer vision, deep learning, and scalable web applications.
          </p>

          <div className="hero-anim-5 hero-buttons flex gap-6">
            <button onClick={() => scrollTo('contact')}
              className="submit-glow px-10 py-4 bg-gradient-to-br from-gold to-gold-dark text-dark border-none rounded-sm text-sm font-semibold tracking-widest uppercase font-sans cursor-pointer">
              Get in Touch
            </button>
            <a href="https://github.com/20R01A67E6" target="_blank" rel="noopener noreferrer"
              className="outline-btn px-10 py-4 bg-transparent text-gold border border-gold/30 rounded-sm text-sm font-medium no-underline tracking-widest uppercase font-sans text-center">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/kandula-abhinav-reddy" target="_blank" rel="noopener noreferrer"
              className="outline-btn px-10 py-4 bg-transparent text-gold border border-gold/30 rounded-sm text-sm font-medium no-underline tracking-widest uppercase font-sans text-center">
              LinkedIn
            </a>
            <a href="/resume.pdf" download="Abhinav Reddy Resume.pdf"
              className="outline-btn px-10 py-4 bg-transparent text-gold border border-gold/30 rounded-sm text-sm font-medium no-underline tracking-widest uppercase font-sans text-center">
              ↓ Resume
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ animation: 'float 3s ease-in-out infinite', opacity: mounted ? Math.max(0, 1 - scrollY / 200) : 0, pointerEvents: mounted && scrollY > 50 ? 'none' : 'auto' }}>
            <span className="text-gray-600 text-xs tracking-widest uppercase">There's more below</span>
            <div className="w-px h-[25px]" style={{ background: 'linear-gradient(to bottom, #d4af37, transparent)' }} />
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section data-animate id="stats" className={`section-pad py-16 px-12 max-w-[1200px] mx-auto border-t border-white/5 relative z-[1] section-reveal ${vis('stats') ? 'section-visible' : 'section-hidden'}`}>
          <div className="stats-grid grid grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="stat-card p-8 text-center border border-white/5 rounded bg-white/[0.01]">
                <div className="stat-number font-serif text-[2.5rem] font-semibold text-gold mb-2">{s.number}</div>
                <div className="text-xs text-gray-500 tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section id="about" data-animate className={`section-pad py-32 px-12 max-w-[1200px] mx-auto relative z-[1] section-reveal ${vis('about') ? 'section-visible' : 'section-hidden'}`}>
          <div className="about-grid grid grid-cols-[1fr_1.3fr] gap-20 items-start">
            <div>
              <p className="text-gold text-xs tracking-[4px] uppercase mb-4">About</p>
              <h2 className="section-heading font-serif text-5xl font-medium leading-tight text-gray-100">The story so far</h2>
              <div className="gold-line mt-8" />
            </div>
            <div>
              <p className="text-base leading-loose text-gray-400 mb-6 font-light">
                It started with a simple curiosity — how do machines learn to see? That question led me from writing my first Python script to training deep learning models on multi-GPU clusters. What began as late-night experiments with image classification evolved into a genuine obsession with making computers understand the visual world the way we do.
              </p>
              <p className="text-base leading-loose text-gray-400 mb-6 font-light">
                Today at Analysis Express, I get to live that obsession every day. I build systems that read complex engineering drawings, something even experienced engineers find tedious, and turn them into structured, actionable data in seconds. When I saw our automation pipeline cut manual review time by 15% across the team, I knew this was exactly where I was meant to be.
              </p>
              <p className="text-base leading-loose text-gray-400 font-light">
                But I'm not just about AI. I love the entire journey from idea to deployment. Designing clean APIs, crafting intuitive interfaces, shipping products that real people rely on. Whether it's generating 100K training images from scratch or deploying a full-stack app on Vercel, I bring the same energy to everything I build.
              </p>
            </div>
          </div>
        </section>

        {/* ===== EXPERIENCE ===== */}
        <section id="experience" data-animate className={`section-pad py-32 px-12 max-w-[1200px] mx-auto relative z-[1] section-reveal ${vis('experience') ? 'section-visible' : 'section-hidden'}`}>
          <p className="text-gold text-xs tracking-[4px] uppercase mb-4">Career</p>
          <h2 className="section-heading font-serif text-5xl font-medium mb-4 text-gray-100">Experience</h2>
          <div className="gold-line mb-16" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <div key={i} className="glow-card p-10 pl-12 rounded border border-white/5 bg-white/[0.015] border-l-[3px] border-l-gold"
                onMouseMove={handleCardGlow}>
                <div className="exp-header flex justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-medium text-gray-100 mb-1.5">{exp.title}</h3>
                    <p className="text-gold font-normal">
                      {exp.company}<span className="text-gray-600 mx-3">·</span><span className="text-gray-500 text-sm">{exp.location}</span>
                    </p>
                  </div>
                  <span className="exp-period text-gray-600 text-sm whitespace-nowrap font-light">{exp.period}</span>
                </div>
                <ul className="list-none p-0">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-gray-400 text-[0.95rem] leading-relaxed pl-5 relative mb-2">
                      <span className="absolute left-0 text-gold text-xs top-[0.45rem]">◆</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section id="skills" data-animate className={`section-pad py-32 px-12 max-w-[1200px] mx-auto relative z-[1] section-reveal ${vis('skills') ? 'section-visible' : 'section-hidden'}`}>
          <p className="text-gold text-xs tracking-[4px] uppercase mb-4">Expertise</p>
          <h2 className="section-heading font-serif text-5xl font-medium mb-4 text-gray-100">Skills</h2>
          <div className="gold-line mb-16" />

          <div className="skills-grid grid grid-cols-2 gap-x-16 gap-y-8">
            {skillBars.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-[0.95rem]">{s.name}</span>
                  <span className="text-gold text-sm">{s.level}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={vis('skills') ? 'skill-bar-fill' : ''}
                    style={{ width: vis('skills') ? `${s.level}%` : '0%', height: '100%', background: 'linear-gradient(90deg, #d4af37, #f4d03f)', borderRadius: '10px', animationDelay: `${i * 0.15}s` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section id="projects" data-animate className={`section-pad py-32 px-12 max-w-[1200px] mx-auto relative z-[1] section-reveal ${vis('projects') ? 'section-visible' : 'section-hidden'}`}>
          <p className="text-gold text-xs tracking-[4px] uppercase mb-4">Work</p>
          <h2 className="section-heading font-serif text-5xl font-medium mb-4 text-gray-100">Featured Projects</h2>
          <div className="gold-line mb-16" />

          <div className="projects-grid grid grid-cols-2 gap-8">
            {projects.map((proj, i) => (
              <a key={i} href={proj.link} target="_blank" rel="noopener noreferrer"
                className="glow-card p-10 border border-white/5 rounded bg-white/[0.015] no-underline text-inherit block"
                onMouseMove={handleCardGlow}>
                <h3 className="text-xl font-medium text-gray-100 mb-3">{proj.title}</h3>
                <p className="text-gray-400 text-[0.95rem] leading-relaxed mb-6">{proj.desc}</p>
                <div className="flex gap-2.5 flex-wrap">
                  {proj.tags.map((t) => (
                    <span key={t} className="text-xs py-1.5 px-3.5 border border-gold/20 rounded-sm text-gold bg-gold/5">{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ===== CERTIFICATIONS ===== */}
        <section id="certifications" data-animate className={`section-pad py-32 px-12 max-w-[1200px] mx-auto relative z-[1] section-reveal ${vis('certifications') ? 'section-visible' : 'section-hidden'}`}>
          <p className="text-gold text-xs tracking-[4px] uppercase mb-4">Achievements</p>
          <h2 className="section-heading font-serif text-5xl font-medium mb-4 text-gray-100">Certifications</h2>
          <div className="gold-line mb-16" />

          {loadingCerts ? (
            <div className="flex gap-2">
              {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-gold" style={{ animation: `pulse 1.2s infinite ${i * 0.2}s` }} />)}
            </div>
          ) : certificates.length > 0 ? (
            <div className="certs-grid grid grid-cols-3 gap-6">
              {certificates.map((cert, i) => (
                <a key={i} href={cert.webViewLink} target="_blank" rel="noopener noreferrer"
                  className="cert-card p-8 border border-white/5 rounded bg-white/[0.015] no-underline text-inherit block">
                  <h4 className="text-base font-medium text-gray-100 mb-3 leading-snug">{cert.name}</h4>
                  <span className="text-gold text-sm">View Certificate →</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-base italic">Certifications coming soon.</p>
          )}
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" data-animate className={`section-pad py-32 px-12 max-w-[800px] mx-auto relative z-[1] section-reveal ${vis('contact') ? 'section-visible' : 'section-hidden'}`}>
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[4px] uppercase mb-4">Connect</p>
            <h2 className="section-heading font-serif text-5xl font-medium text-gray-100">Let's Work Together</h2>
            <div className="gold-line-center my-8" />
            <p className="text-gray-400 text-base leading-relaxed font-light">Have a project in mind or want to discuss opportunities? I'd love to hear from you.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="contact-inputs grid grid-cols-2 gap-5">
              <input type="text" placeholder="Name" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                className="input-glow p-4 px-5 bg-white/[0.025] border border-white/[0.06] rounded-sm text-gray-100 text-[0.95rem] font-sans" />
              <input type="email" placeholder="Email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                className="input-glow p-4 px-5 bg-white/[0.025] border border-white/[0.06] rounded-sm text-gray-100 text-[0.95rem] font-sans" />
            </div>
            <textarea placeholder="Your message" value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows="6"
              className="input-glow p-4 px-5 bg-white/[0.025] border border-white/[0.06] rounded-sm text-gray-100 text-[0.95rem] font-sans resize-none" />
            <button type="submit" disabled={loading}
              className={`submit-glow p-4 bg-gradient-to-br from-gold to-gold-dark text-dark border-none rounded-sm text-sm font-semibold tracking-widest uppercase font-sans ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {submitted && <p className="text-gold text-center text-[0.95rem]">✓ Message sent successfully.</p>}
            {error && <p className="text-red-500 text-center text-[0.95rem]">{error}</p>}
          </form>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="section-pad py-16 px-12 border-t border-white/5 relative z-[1]">
          <div className="footer-inner max-w-[1200px] mx-auto flex justify-between items-center">
            <p className="text-gray-600 text-sm font-light">© 2026 Abhinav Reddy Kandula</p>
            <div className="flex gap-10">
              {[
                { label: 'GitHub', url: 'https://github.com/20R01A67E6' },
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kandula-abhinav-reddy' },
                { label: 'Resume', url: '/resume.pdf' },
                { label: 'Email', url: 'mailto:abhinavjsearch@gmail.com' },
              ].map((l) => (
                <a key={l.label} href={l.url}
                  target={l.url.startsWith('mailto') || l.url.startsWith('/') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="footer-link text-gray-500 no-underline text-sm tracking-widest uppercase"
                  download={l.url.endsWith('.pdf') ? "Abhinav Reddy Resume.pdf" : undefined}
                  onMouseEnter={(e) => e.target.style.color = '#d4af37'}
                  onMouseLeave={(e) => e.target.style.color = '#666'}>
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
