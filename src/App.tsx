import { useEffect, useRef, useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, CheckCircle2, Code2, Download, Github, GraduationCap, Linkedin, Mail, MapPin, Menu, Send, Sparkles, Trophy, X, Zap, ExternalLink, Database, Smartphone, BrainCircuit, Globe, Terminal, Layers3, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const profile = {
  name: 'Anuj Bharat Gadekar',
  title: 'Software Development Engineer',
  email: 'anujgadekar688@gmail.com',
  phone: '+91 96578 47353',
  location: 'Pune, Maharashtra, India',
  resume: '/Anuj-Gadekar-Resume.pdf',
  linkedin: 'https://www.linkedin.com/in/anuj-gadekar-360991313/',
  github: 'https://github.com/',
  instagram: 'https://www.instagram.com/itz__anuzz______/',
};
const nav = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];
const roles = ['Full Stack Developer', '.NET Developer', 'React Developer', 'Software Engineer'];
const projects = [
  { title: 'Student Management System', type: '.NET Application', desc: 'A student management application built to organize student records and related academic data.', stack: ['.NET', 'C#'], image: '/assets/projects/student-management.svg', icon: GraduationCap },
  { title: 'Employee Management System', type: 'Web Application', desc: 'A role-based system with separate admin and employee dashboards for assigning work and tracking task status in real time.', stack: ['Next.js', 'TypeScript', 'Tailwind', 'Firebase'], image: '/assets/projects/employee-management.svg', icon: BriefcaseBusiness },
  { title: 'Travel Booking Platform', type: 'Full Stack Platform', desc: 'REST APIs for destination management and bookings, backed by a normalized MySQL schema and Hibernate ORM.', stack: ['Spring Boot', 'Vue.js', 'MySQL', 'Hibernate'], image: '/assets/projects/travel-booking.svg', icon: Globe },
  { title: 'Crop Selling Mobile App', type: 'Mobile Application', desc: 'A farmer-to-buyer marketplace with crop listings, price and quantity management, and real-time data sync.', stack: ['Flutter', 'Node.js', 'Firebase'], image: '/assets/projects/crop-selling.svg', icon: Smartphone },
  { title: 'Product Management App', type: 'Web Application', desc: 'Product CRUD operations with authentication, protected routes, and asynchronous state management.', stack: ['React', 'TypeScript', 'Redux Toolkit', 'Firestore'], image: '/assets/projects/product-management.svg', icon: Database },
  { title: 'AI-Based Chess Game', type: 'Python Project', desc: 'A chess game with an AI opponent that evaluates board positions and selects moves using search-based logic.', stack: ['Python', 'AI', 'Search Algorithms'], image: '/assets/projects/ai-chess.svg', icon: BrainCircuit },
];
const skillGroups = [
  { name: 'Languages', icon: Code2, skills: ['C#', 'Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'PHP', 'Dart', 'SQL'] },
  { name: 'Backend', icon: Terminal, skills: ['ASP.NET', '.NET', 'Node.js', 'Express.js', 'Spring Boot', 'Hibernate', 'REST APIs', 'Authentication'] },
  { name: 'Frontend & Mobile', icon: Layers3, skills: ['React.js', 'Next.js', 'Vue.js', 'Redux Toolkit', 'Tailwind CSS', 'React Native', 'Flutter', 'WordPress', 'Elementor'] },
  { name: 'Database & Cloud', icon: Database, skills: ['MongoDB', 'MySQL', 'Firebase Auth', 'Firestore', 'Realtime Database', 'Vercel', 'cPanel'] },
  { name: 'AI & Data', icon: BrainCircuit, skills: ['NumPy', 'pandas', 'scikit-learn', 'Prompt Engineering', 'Claude', 'Gemini', 'ChatGPT', 'n8n', 'NotebookLM'] },
  { name: 'Tools & CS', icon: Zap, skills: ['Git', 'GitLab', 'Postman', 'Jira', 'Confluence', 'VS Code', 'DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'System Design Basics'] },
];

function App() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error' | 'unconfigured'>('idle');
  const [formError, setFormError] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex(v => (v + 1) % roles.length), 2600);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
    });
    return () => ctx.revert();
  }, [reduceMotion]);
  useEffect(() => {
    const sections = nav.map(n => document.getElementById(n.toLowerCase())).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id[0].toUpperCase() + entry.target.id.slice(1)); }), { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goTo = (label: string) => { document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); setMobileOpen(false); };
  const categories = ['All', ...skillGroups.map(g => g.name)];
  const shownSkills = filter === 'All' ? skillGroups : skillGroups.filter(g => g.name === filter);

  const submitContact = async (e: FormEvent) => {
    e.preventDefault(); setFormError(''); setFormState('idle');
    if (form.name.trim().length < 2) { setFormError('Please enter your name (at least 2 characters).'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setFormError('Please enter a valid email address.'); return; }
    if (form.subject.trim().length < 3) { setFormError('Please add a short subject.'); return; }
    if (form.message.trim().length < 10) { setFormError('Your message should contain at least 10 characters.'); return; }
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !key) { setFormState('unconfigured'); return; }
    setFormState('sending');
    try {
      await emailjs.send(service, template, { from_name: form.name, reply_to: form.email, subject: form.subject, message: form.message, to_email: profile.email }, key);
      setFormState('success'); setForm({ name: '', email: '', subject: '', message: '' });
    } catch { setFormState('error'); }
  };

  return <div className="site-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-glow" />
    <header className="topbar">
      <a className="brand" href="#home" onClick={e => { e.preventDefault(); goTo('Home') }} aria-label="Anuj Gadekar home"><span>A</span>G<span className="brand-dot">.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item => <button key={item} className={active === item ? 'nav-link active' : 'nav-link'} onClick={() => goTo(item)}>{item}</button>)}</nav>
      <a className="nav-resume" href={profile.resume} download><Download size={15} /> <span>Resume</span></a>
      <button className="mobile-toggle" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle navigation">{mobileOpen ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{mobileOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>{nav.map(n => <button key={n} onClick={() => goTo(n)}>{n}</button>)}<a href={profile.resume} download>Download resume <Download size={15} /></a></motion.nav>}</AnimatePresence>

    <main>
      <section className="hero section-wrap" id="home" ref={heroRef}>
        <div className="hero-copy">
          <div className="availability"><span className="pulse-dot" /> Open to software engineering opportunities</div>
          <p className="eyebrow">HELLO, WORLD <span>—</span> I'M</p>
          <h1>Anuj Bharat<br /><span className="gradient-text">Gadekar.</span></h1>
          <div className="role-line"><span className="role-prefix">{profile.title}</span><span className="role-divider" /><AnimatePresence mode="wait"><motion.span key={roleIndex} className="changing-role" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: .25 }}>{roles[roleIndex]}</motion.span></AnimatePresence></div>
          <h2>Building <span className="cyan-text">digital experiences.</span><br />Engineering <span className="purple-text">scalable solutions.</span></h2>
          <p className="hero-description">Final-year Computer Engineering student with hands-on industry experience, building useful products across modern web technologies.</p>
          <div className="hero-actions"><button className="button button-primary" onClick={() => goTo('Projects')}>Explore my work <ArrowRight size={17} /></button><a className="button button-ghost" href={profile.resume} download><Download size={16} /> Download resume</a></div>
          <div className="social-row"><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a></div>
        </div>
        <div className="hero-visual">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
          <div className="portrait-halo" /><div className="portrait-frame"><img src="/assets/anuj-profile.png" alt="Portrait of Anuj Bharat Gadekar" /></div>
          <div className="floating-tech tech-react"><svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="24" cy="24" rx="21" ry="8" /><ellipse cx="24" cy="24" rx="21" ry="8" transform="rotate(60 24 24)" /><ellipse cx="24" cy="24" rx="21" ry="8" transform="rotate(120 24 24)" /></g><circle cx="24" cy="24" r="3" fill="currentColor" /></svg></div>
          <div className="floating-tech tech-net">.NET</div><div className="floating-tech tech-js">JS</div><div className="floating-tech tech-python">Py</div><div className="floating-tech tech-db">DB</div>
          <div className="orbit-caption"><span className="caption-line" /> Building with curiosity</div>
        </div>
        <div className="hero-meta"><div><GraduationCap /><span><b>Education</b><small>B.E. Computer Engineering</small></span></div><div><BriefcaseBusiness /><span><b>Experience</b><small>Britwise Technologies</small></span></div><div><Trophy /><span><b>Achievement</b><small>College Chess Master</small></span></div><div><MapPin /><span><b>Location</b><small>Pune, Maharashtra</small></span></div></div>
        <button className="scroll-hint" onClick={() => goTo('About')}><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></button>
      </section>

      <section className="section-wrap about-section" id="about">
        <div className="section-heading reveal"><span className="section-kicker"><Sparkles size={14} /> A LITTLE ABOUT ME</span><h2>More than just <span className="gradient-text">writing code.</span></h2><p>I enjoy turning ideas into reliable, thoughtfully designed software.</p></div>
        <div className="about-grid">
          <div className="about-art reveal"><div className="art-orbit" /><div className="code-window"><div className="window-dots"><i /><i /><i /></div><div className="code-lines"><span><b>const</b> developer = {'{'}</span><span className="indent"><em>name</em>: <strong>'Anuj'</strong>,</span><span className="indent"><em>focus</em>: <strong>'Full Stack'</strong>,</span><span className="indent"><em>mindset</em>: <strong>'Always learning'</strong></span><span>{'}'};</span><span className="code-cursor">▍</span></div></div><div className="art-chip chip-one"><Code2 /> Clean code</div><div className="art-chip chip-two"><Zap /> Curious mind</div></div>
          <div className="about-copy reveal"><h3>Engineer by learning.<br /><span className="cyan-text">Builder by mindset.</span></h3><p>I'm a Computer Engineering student and Full Stack Developer with practical industry experience delivering client applications. I like working across the stack — from shaping a responsive interface to building APIs, connecting databases, and helping ship a working product.</p><p>My experience spans frontend and backend development, REST API design, authentication, database integration, deployment, and collaboration in an agile team.</p><div className="check-grid">{['Frontend development', 'Backend development', 'REST API development', 'Database integration', 'Authentication', 'Deployment'].map(t => <div key={t}><CheckCircle2 />{t}</div>)}</div><button className="text-link" onClick={() => goTo('Experience')}>Explore my journey <ArrowUpRight size={16} /></button></div>
        </div>
      </section>

      <section className="section-wrap experience-section" id="experience">
        <div className="section-heading reveal"><span className="section-kicker"><BriefcaseBusiness size={14} /> PROFESSIONAL JOURNEY</span><h2>Experience that <span className="gradient-text">moves me forward.</span></h2><p>Learning through real products, real teams, and real delivery.</p></div>
        <div className="experience-card reveal"><div className="timeline-rail"><span /></div><div className="experience-main"><div className="experience-top"><div><span className="date-label">OCT 2025 — PRESENT</span><h3>Full Stack Development Intern</h3><p className="company-name">Britwise Technologies Pvt. Ltd. <span>· Pune</span></p></div><div className="company-mark">B<span>.</span></div></div><p className="experience-intro">Contributing to full-stack features and client projects, from requirements and API design through to production deployment.</p><ul className="experience-points"><li>Deliver full-stack features and client projects across .NET, MERN, PHP, and CMS platforms.</li><li>Build and launch applications spanning frontend, backend, databases, and hosting.</li><li>Develop REST APIs and work with production application workflows.</li><li>Collaborate through code reviews, sprint planning, and release workflows using Git, GitLab, Postman, Jira, and Confluence.</li></ul><div className="project-at-work"><div className="subhead-row"><b>Work across client projects</b><span>Selected experience</span></div><div className="work-tags">{['Travel Business CRM', 'GetSetGo Travel Website', 'RIIM College Software', 'Business Websites', 'Dynamic Travel Booking'].map((x, i) => <span key={x}><i>{['01', '02', '03', '04', '05'][i]}</i>{x}</span>)}</div><div className="stack-line"><span>React</span><span>Node.js</span><span>TypeScript</span><span>Firebase</span><span>WordPress</span><span>Next.js</span><span>PHP</span><span>ASP.NET</span><span>C#</span></div></div></div></div>
      </section>

      <section className="section-wrap skills-section" id="skills">
        <div className="section-heading reveal"><span className="section-kicker"><Zap size={14} /> MY TOOLKIT</span><h2>My technical <span className="gradient-text">arsenal.</span></h2><p>A growing toolkit for building across the software stack.</p></div>
        <div className="filter-row reveal">{categories.map(c => <button key={c} onClick={() => setFilter(c)} className={filter === c ? 'filter-pill selected' : 'filter-pill'}>{c}</button>)}</div>
        <div className="skills-grid">{shownSkills.map((group, i) => { const Icon = group.icon; return <motion.article layout key={group.name} className="skill-card"><div className="skill-card-head"><span className={`skill-icon skill-color-${i}`}><Icon /></span><h3>{group.name}</h3><span className="skill-count">{String(group.skills.length).padStart(2, '0')}</span></div><div className="skill-list">{group.skills.map(s => <span key={s}>{s}</span>)}</div></motion.article> })}</div>
      </section>

      <section className="section-wrap projects-section" id="projects">
        <div className="section-heading reveal"><span className="section-kicker"><Layers3 size={14} /> SELECTED WORK</span><h2>Things I've <span className="gradient-text">built.</span></h2><p>A selection of projects that reflect my curiosity and hands-on learning.</p></div>
        <div className="projects-grid">{projects.map((p, i) => { const Icon = p.icon; return <motion.article key={p.title} className="project-card" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ duration: .5, delay: i * .06 }} whileHover={reduceMotion ? {} : { y: -7 }}><button className="project-image" onClick={() => setSelectedProject(p)} aria-label={`View ${p.title} details`}><img src={p.image} alt={`${p.title} illustrative project preview`} loading="lazy" /><span className="image-open"><ArrowUpRight /></span></button><div className="project-content"><div className="project-type"><Icon size={14} />{p.type}</div><h3>{p.title}</h3><p>{p.desc}</p><div className="project-tags">{p.stack.map(t => <span key={t}>{t}</span>)}</div><button className="project-detail" onClick={() => setSelectedProject(p)}>View project details <ArrowRight size={15} /></button></div></motion.article> })}</div>
      </section>

      <section className="section-wrap education-section" id="education">
        <div className="section-heading reveal"><span className="section-kicker"><GraduationCap size={14} /> ACADEMIC BACKGROUND</span><h2>Learning is a <span className="gradient-text">lifelong journey.</span></h2><p>Building a strong foundation in computer engineering.</p></div>
        <div className="education-layout"><div className="education-visual reveal"><div className="edu-glow" /><div className="cap-icon"><GraduationCap size={92} strokeWidth={1.2} /></div><div className="edu-orbit orbit-edu-one" /><div className="edu-orbit orbit-edu-two" /><span className="edu-year">2027</span></div><div className="education-list"><article className="education-item reveal"><span className="edu-dot" /><div className="edu-year-label">EXPECTED 2027</div><h3>B.E. Computer Engineering</h3><p>Genba Sopanrao Moze College of Engineering · Pune University</p><div className="edu-result"><b>9.5 CGPA</b><span>Currently pursuing</span></div></article><article className="education-item reveal"><span className="edu-dot" /><div className="edu-year-label">2023</div><h3>Higher Secondary Certificate (12th)</h3><p>PVP Loni</p><div className="edu-result"><b>70%</b><span>Maharashtra State Board</span></div></article><article className="education-item reveal"><span className="edu-dot" /><div className="edu-year-label">2021</div><h3>Secondary School Certificate (10th)</h3><p>PMVC Chinchpur</p><div className="edu-result"><b>91.20%</b><span>Maharashtra State Board</span></div></article></div></div>
        <div className="achievements reveal"><div className="achievement-item"><Trophy /><div><b>College Chess Master</b><span>2024 & 2025</span></div></div><div className="achievement-item"><Sparkles /><div><b>Generative AI & AI Tools</b><span>Certifications · Spoken Tutorial, IIT Bombay</span></div></div><div className="achievement-item"><UsersIcon /><div><b>Community Volunteer</b><span>College Fest & Pune Marathon 2025</span></div></div></div>
      </section>

      <section className="section-wrap contact-section" id="contact">
        <div className="contact-banner reveal"><div><span className="section-kicker"><Mail size={14} /> LET'S CONNECT</span><h2>Have an idea?<br /><span className="gradient-text">Let's build it together.</span></h2><p>I'm always open to discussing software engineering opportunities, interesting projects, and collaborations.</p><div className="contact-details"><a href={`mailto:${profile.email}`}><Mail />{profile.email}</a><a href={`tel:${profile.phone.replaceAll(' ', '')}`}><Smartphone />{profile.phone}</a><span><MapPin />{profile.location}</span></div></div><div className="contact-orb"><div className="orb-ring ring-1" /><div className="orb-ring ring-2" /><Send size={54} /><span>Say hello</span></div></div>
        <div className="contact-form-wrap reveal"><div className="form-intro"><h3>Send me a message</h3><p>Tell me a little about what you have in mind.</p><div className="form-note"><span className="pulse-dot" /> Replies go directly to my inbox when email delivery is configured.</div></div><form onSubmit={submitContact} noValidate><div className="form-row"><label>Your name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" autoComplete="name" /></label><label>Email address<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" autoComplete="email" /></label></div><label>Subject<input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="What's this about?" /></label><label>Message<textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Write your message here..." /></label>{formError && <p className="form-feedback error">{formError}</p>}{formState === 'success' && <p className="form-feedback success">Your message was sent successfully. Thank you!</p>}{formState === 'error' && <p className="form-feedback error">Message could not be sent. Please try again or email me directly.</p>}{formState === 'unconfigured' && <p className="form-feedback info">The form is validated and ready, but email delivery is not configured yet. Please email me directly or add your EmailJS keys to the .env file.</p>}<button className="button button-primary submit-button" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending...' : 'Send message'} <Send size={16} /></button></form></div>
      </section>
    </main>
    <footer className="footer section-wrap"><a className="brand" href="#home" onClick={e => { e.preventDefault(); goTo('Home') }}><span>A</span>G<span className="brand-dot">.</span></a><div className="footer-copy"><b>Anuj Bharat Gadekar</b><span>Software Development Engineer · Full Stack Developer</span></div>
      <div className="footer-social">
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Linkedin />
        </a>

        <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram />
        </a>

        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github />
        </a>

        <a href={`mailto:${profile.email}`} aria-label="Email">
          <Mail />
        </a>
      </div>
      <span className="copyright">© {new Date().getFullYear()} Anuj Bharat Gadekar. Built with care.</span><button className="back-top" onClick={() => goTo('Home')} aria-label="Back to top"><ArrowUpRight /></button></footer>

    <AnimatePresence>{selectedProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}><motion.div className="project-modal" initial={{ opacity: 0, y: 25, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X /></button><img src={selectedProject.image} alt="Project preview" /><span className="project-type">{selectedProject.type}</span><h3>{selectedProject.title}</h3><p>{selectedProject.desc}</p><div className="project-tags">{selectedProject.stack.map(t => <span key={t}>{t}</span>)}</div><p className="modal-note">Project preview artwork is illustrative. Add a repository or live-demo URL in <code>src/App.tsx</code> when you are ready to publish one.</p></motion.div></motion.div>}</AnimatePresence>
  </div>;
}
function UsersIcon() { return <span className="users-icon"><Trophy size={21} /></span> }
export default App;
