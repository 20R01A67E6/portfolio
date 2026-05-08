"use client";
import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, ExternalLink, ChevronDown, Send } from 'lucide-react';

export default function Portfolio() {
  const [expandedExp, setExpandedExp] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const response = await fetch('/api/getCertificates');
        const data = await response.json();
        setCertificates(data.certificates || []);
      } catch (error) {
        console.error('Error loading certificates:', error);
        setCertificates([]);
      } finally {
        setLoadingCerts(false);
      }
    };
    loadCertificates();
    fetch('/api/trackVisit').catch(err => console.error('Visit tracking error:', err));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const experiences = [
    {
      company: 'Analysis Express',
      role: 'Software Engineer Intern',
      period: 'Jan 2026 - Present',
      location: 'West Chester, OH',
      details: [
        'Developed core Python modules for IrisX automated engineering drawing analysis system',
        'Implemented YOLO object detection & pose estimation (YOLO11s-pose, YOLO12m) for GD&T symbol detection',
        'Generated 100K+ synthetic images for training dataset using custom pipeline',
        'Orchestrated multi-GPU model training on cloud (8× RTX 5090 via Vast.ai)',
        'Built Flask REST API for batch processing with concurrent model inference'
      ],
      featured: true
    },
    {
      company: 'University of Cincinnati',
      role: 'Graduate Student Associate',
      period: 'May 2025 - Apr 2026',
      location: 'Cincinnati, OH',
      details: [
        'Supervised team workflows and dataset management',
        'Automated operations reporting and dashboard design'
      ]
    }
  ];

  const projects = [
    {
      name: 'privtrain-demo',
      url: 'https://github.com/20R01A67E6/privtrain-demo',
      description: 'Privacy-preserving ML training system',
      featured: true,
      tags: ['Python', 'ML']
    },
    {
      name: 'YOLO Face Detection',
      url: 'https://github.com/20R01A67E6/YOLO-face-detection',
      description: 'Real-time face detection using YOLO',
      tags: ['YOLO', 'Computer Vision']
    }
  ];

  const skills = ['Python', 'ML', 'Computer Vision', 'YOLO', 'OpenCV', 'Flask', 'Docker', 'AWS'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <nav className="sticky top-0 z-50 bg-slate-900/95 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AR</div>
          <div className="flex gap-6"><a href="#about" className="hover:text-purple-400">About</a><a href="#experience" className="hover:text-purple-400">Experience</a><a href="#projects" className="hover:text-purple-400">Projects</a><a href="#contact" className="hover:text-purple-400">Contact</a></div>
        </div>
      </nav>

      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-pink-300 bg-clip-text text-transparent">Abhinav Reddy Kandula</h1>
        <p className="text-2xl text-purple-300 mb-6">Software Developer | AI/ML Engineer</p>
        <div className="flex gap-4"><a href="mailto:kandulay@mail.uc.edu" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600"><Mail size={20} /> Email</a><a href="https://github.com/20R01A67E6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-purple-400 rounded-lg"><Github size={20} /> GitHub</a></div>
      </section>

      <section id="experience" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="border border-gray-700 rounded-lg p-6 hover:border-purple-400 cursor-pointer" onClick={() => setExpandedExp(expandedExp === idx ? null : idx)}>
              <h3 className="text-xl font-bold text-blue-300">{exp.role}</h3>
              <p className="text-purple-300">{exp.company}</p>
              {expandedExp === idx && <ul className="mt-4 space-y-2">{exp.details.map((d, i) => <li key={i} className="text-gray-300">• {d}</li>)}</ul>}
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, idx) => (
            <a key={idx} href={proj.url} target="_blank" rel="noopener noreferrer" className="border border-gray-700 rounded-lg p-6 hover:border-purple-400">
              <h3 className="text-xl font-bold text-blue-300">{proj.name}</h3>
              <p className="text-gray-300">{proj.description}</p>
              <div className="flex gap-2 mt-3">{proj.tags.map(t => <span key={t} className="text-xs bg-purple-500/30 px-2 py-1 rounded">{t}</span>)}</div>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Get in Touch</h2>
        <form onSubmit={handleFormSubmit} className="max-w-2xl space-y-4">
          <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 text-white" required />
          <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 text-white" required />
          <textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows="5" className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 text-white" required></textarea>
          <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg"><Send size={20} className="inline mr-2" />{submitting ? 'Sending...' : 'Send'}</button>
          {submitted && <p className="text-green-400">Message sent!</p>}
        </form>
      </section>

      <footer className="border-t border-gray-700 mt-16 text-center text-gray-400 py-8">© 2025 Abhinav Kandula. Built with React & Firebase.</footer>
    </div>
  );
}
