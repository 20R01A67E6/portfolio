"use client";

import React, { useState, useEffect } from 'react';

export default function Portfolio() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [loadingCerts, setLoadingCerts] = useState(true);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch('/api/trackVisit', { method: 'POST' });
      } catch (err) {
        console.error('Visit tracking failed:', err);
      }
    };
    trackVisit();

    const fetchCertificates = async () => {
      try {
        const response = await fetch('/api/getCertificates');
        const data = await response.json();
        setCertificates(data.certificates || []);
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setCertificates([]);
      } finally {
        setLoadingCerts(false);
      }
    };
    fetchCertificates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit form');

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Error submitting form. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Analysis Express",
      period: "Jan 2026 - Present",
      location: "West Chester, OH",
      description: "Developed core Python modules for IrisX automated engineering drawing analysis. Implemented YOLO object detection & pose estimation for GD&T symbol detection with 100K+ synthetic training images."
    },
    {
      title: "Graduate Student Associate",
      company: "University of Cincinnati",
      period: "May 2025 - Apr 2026",
      location: "Cincinnati, OH",
      description: "Supervised team workflows, managed datasets, and automated operations reporting with dashboard design."
    }
  ];

  const projects = [
    {
      title: "privtrain-demo",
      description: "Privacy-preserving ML training system",
      tags: ["Python", "ML"],
      link: "https://github.com/20R01A67E6/privtrain-demo"
    },
    {
      title: "YOLO Face Detection",
      description: "Real-time face detection using YOLO with Computer Vision",
      tags: ["YOLO", "OpenCV"],
      link: "https://github.com/20R01A67E6/YOLO-face-detection"
    }
  ];

  return (
    <div style={{ 
      backgroundColor: '#0f172a', 
      color: '#e2e8f0', 
      minHeight: '100vh', 
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        zIndex: 50
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Abhinav</h1>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Home', 'About', 'Experience', 'Certifications', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#cbd5e1', 
                cursor: 'pointer', 
                fontSize: '0.95rem',
                padding: 0
              }}
              onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '0 2rem', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '80px' }}>
        <span style={{ fontSize: '0.95rem', color: '#3b82f6', marginBottom: '1rem' }}>Welcome</span>
        <h2 style={{ fontSize: '3.5rem', fontWeight: '600', lineHeight: 1.2, marginBottom: '1.5rem', maxWidth: '750px' }}>Software Developer & AI/ML Engineer</h2>
        <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '650px' }}>Specializing in full-stack development, computer vision, and machine learning. Currently building intelligent systems at Analysis Express.</p>
        <button onClick={() => scrollToSection('contact')} style={{ padding: '1rem 2rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', cursor: 'pointer', fontWeight: '500' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'} onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}>Get In Touch</button>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '6rem 2rem', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <h3 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '3rem' }}>About Me</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#cbd5e1', marginBottom: '1.5rem' }}>I'm a passionate full-stack developer with expertise in Python, machine learning, and modern web technologies. I build scalable solutions that combine elegant design with powerful functionality.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#cbd5e1' }}>Currently working on automated engineering drawing analysis using computer vision and deep learning. I'm committed to staying at the forefront of technology while writing clean, maintainable code.</p>
          </div>
          <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '0.75rem', padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Core Skills</h4>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>Python, React, Next.js, Machine Learning, Computer Vision, YOLO</p>
            </div>
            <div>
              <h4 style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Technologies</h4>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>OpenCV, Flask, Docker, AWS, Firebase, TensorFlow, Git</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <h3 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '3rem' }}>Experience</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {experiences.map((exp, i) => (
            <div key={i} style={{ padding: '2rem', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '0.75rem', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderLeft: '4px solid #3b82f6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.5rem 0', color: '#e2e8f0' }}>{exp.title}</h4>
                  <p style={{ fontSize: '1rem', color: '#3b82f6', margin: 0, fontWeight: '500' }}>{exp.company}</p>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>{exp.location}</p>
                </div>
                <span style={{ fontSize: '0.95rem', color: '#94a3b8' }}>{exp.period}</span>
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" style={{ padding: '6rem 2rem', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <h3 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '3rem' }}>Certifications & Awards</h3>
        {loadingCerts ? (
          <p style={{ color: '#cbd5e1' }}>Loading certifications...</p>
        ) : certificates.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {certificates.map((cert, i) => (
              <a key={i} href={cert.webViewLink} target="_blank" rel="noopener noreferrer" style={{ padding: '2rem', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '0.75rem', backgroundColor: 'rgba(30, 41, 59, 0.5)', textDecoration: 'none', color: 'inherit', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.8)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)'}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '0 0 0.5rem 0', color: '#e2e8f0' }}>{cert.name}</h4>
                <p style={{ fontSize: '0.95rem', color: '#3b82f6', margin: 0 }}>View Certificate →</p>
              </a>
            ))}
          </div>
        ) : (
          <p style={{ color: '#cbd5e1' }}>No certifications available yet.</p>
        )}
      </section>

      {/* Projects */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <h3 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '3rem' }}>Featured Projects</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {projects.map((proj, i) => (
            <a key={i} href={proj.link} target="_blank" rel="noopener noreferrer" style={{ padding: '2rem', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '0.75rem', backgroundColor: 'rgba(30, 41, 59, 0.5)', textDecoration: 'none', color: 'inherit', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.8)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)'}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.75rem 0', color: '#e2e8f0' }}>{proj.title}</h4>
              <p style={{ fontSize: '1rem', color: '#cbd5e1', margin: '0 0 1rem 0', lineHeight: 1.6 }}>{proj.description}</p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {proj.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: '0.85rem', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', padding: '0.4rem 0.8rem', borderRadius: '0.4rem' }}>{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '6rem 2rem', maxWidth: '850px', marginLeft: 'auto', marginRight: 'auto', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <h3 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '3rem' }}>Get In Touch</h3>
        <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2.5rem', lineHeight: 1.8 }}>I'd love to collaborate on exciting projects or discuss opportunities. Feel free to reach out anytime.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required style={{ padding: '1rem', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '0.5rem', color: '#e2e8f0', fontSize: '1rem', fontFamily: 'inherit' }} onFocus={(e) => e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)'} onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'} />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required style={{ padding: '1rem', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '0.5rem', color: '#e2e8f0', fontSize: '1rem', fontFamily: 'inherit' }} onFocus={(e) => e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)'} onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'} />
          </div>
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleInputChange} required rows="6" style={{ padding: '1rem', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '0.5rem', color: '#e2e8f0', fontSize: '1rem', fontFamily: 'inherit', resize: 'none' }} onFocus={(e) => e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)'} onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'} />
          <button type="submit" disabled={loading} style={{ padding: '1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.6 : 1 }} onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')} onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}>{loading ? 'Sending...' : 'Send Message'}</button>
          {submitted && <p style={{ color: '#10b981', textAlign: 'center' }}>✓ Message sent successfully!</p>}
          {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}
        </form>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 2rem', borderTop: '1px solid rgba(148, 163, 184, 0.1)', backgroundColor: 'rgba(15, 23, 42, 0.5)', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem' }}>
            <a href="https://github.com/20R01A67E6" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#3b82f6'}>GitHub</a>
            <a href="mailto:abhinavjsearch@gmail.com" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#3b82f6'}>Email</a>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>© 2024 Abhinav Reddy Kandula. Built with React & Modern Web Tech.</p>
        </div>
      </footer>
    </div>
  );
}
