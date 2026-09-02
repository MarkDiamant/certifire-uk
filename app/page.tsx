'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AlarmSmoke, BadgeCheck, CalendarClock, ChevronRight, Flame, Lightbulb, Mail, MapPin, Phone, ShieldCheck, Sparkles, ClipboardCheck } from 'lucide-react';

const LOGO = 'https://fueqkodtkzpkgyljuiui.supabase.co/storage/v1/object/public/business-logos/01c95810-24b8-42c9-b457-01d4bf4c4e28/logo-1783344661104.jpg';
const DS_LOGO = 'https://raw.githubusercontent.com/MarkDiamant/diamant-solutions/main/public/DS%20Logo%20with%20new%20tagline%20White.png';

const services = [
  {
    icon: ClipboardCheck,
    title: 'Fire Risk Assessment',
    price: '£195',
    copy: 'A comprehensive assessment of your property, identifying potential fire hazards, reviewing existing safety measures and highlighting any improvements required. A full written Fire Risk Assessment report is provided following the inspection.',
  },
  {
    icon: AlarmSmoke,
    title: 'Fire Alarm Certificate',
    price: '£95',
    copy: 'Professional inspection and testing of your fire alarm system to check its operation and condition. A Fire Alarm Inspection & Servicing Certificate is issued, together with details of any faults or recommendations identified.',
  },
  {
    icon: Lightbulb,
    title: 'Emergency Lighting Certificate',
    price: '£75',
    copy: 'Inspection and testing of your emergency lighting system to ensure the lights operate correctly in the event of a power failure. A certificate is provided with any faults or required remedial works clearly identified.',
  },
  {
    icon: CalendarClock,
    title: 'Weekly / Monthly Fire Safety Logging',
    price: '£18 per visit',
    copy: 'Regular on-site fire safety checks carried out weekly or monthly, depending on your requirements. Checks can include fire alarm testing, emergency lighting checks and other routine fire safety items, with each visit recorded in the property fire safety logbook.',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: 'Fire Risk Assessment', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const embers = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 17 + 7) % 100}%`,
    delay: `${(i % 7) * 0.55}s`,
    duration: `${5 + (i % 5)}s`,
    size: `${2 + (i % 4)}px`,
  })), []);

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({ name: '', phone: '', email: '', service: 'Fire Risk Assessment', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Certifire UK home">
          <img src={LOGO} alt="Certifire UK" />
          <div><strong>Certifire UK</strong><span>Fire safety services</span></div>
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#process">How it works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">Book a service <ChevronRight size={17} /></a>
      </header>

      <section className="hero" id="top">
        <div className="heat-orb heat-orb-one" />
        <div className="heat-orb heat-orb-two" />
        <div className="ember-field" aria-hidden="true">
          {embers.map((ember, i) => <i key={i} style={{ left: ember.left, animationDelay: ember.delay, animationDuration: ember.duration, width: ember.size, height: ember.size }} />)}
        </div>
        <div className="hero-grid" />
        <div className="hero-content">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="eyebrow">
            <Flame size={16} /> Fire safety support across London & surrounding areas
          </motion.div>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.08 }}>
            Fire safety that is<br /><span>clear, documented</span><br />and kept on track.
          </motion.h1>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, delay: 0.18 }} className="hero-copy">
            Fire risk assessments, alarm servicing, emergency lighting checks and regular fire safety logging for properties across London and surrounding areas.
          </motion.p>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, delay: 0.28 }} className="hero-actions">
            <a className="btn btn-primary" href="#services">View services <ChevronRight size={18} /></a>
            <a className="btn btn-secondary" href="tel:+447308449574"><Phone size={17} /> 07308 449574</a>
          </motion.div>
          <div className="trust-row">
            <span><BadgeCheck size={18} /> BAFE registered</span>
            <span><MapPin size={18} /> London & surrounding areas</span>
            <span><CalendarClock size={18} /> Online bookings attended within 7 working days</span>
          </div>
        </div>
        <motion.aside initial={reduceMotion ? false : { opacity: 0, x: 40, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.78, delay: 0.2 }} className="hero-panel">
          <div className="panel-topline"><span>Certifire UK</span><span>Fire Safety</span></div>
          <img className="hero-logo" src={LOGO} alt="Certifire UK logo" />
          <div className="panel-rule" />
          <p>Practical fire safety inspections, certification and ongoing logging support.</p>
          <div className="mini-list">
            <span><ShieldCheck size={18} /> Fire Risk Assessment</span>
            <span><AlarmSmoke size={18} /> Fire Alarm Servicing</span>
            <span><Lightbulb size={18} /> Emergency Lighting</span>
            <span><ClipboardCheck size={18} /> Weekly / Monthly Logging</span>
          </div>
          <div className="panel-flare" />
        </motion.aside>
      </section>

      <section className="ticker" aria-label="Certifire services">
        <div><span>FIRE RISK ASSESSMENTS</span><i>•</i><span>ALARM SERVICING</span><i>•</i><span>EMERGENCY LIGHTING</span><i>•</i><span>FIRE SAFETY LOGGING</span><i>•</i><span>FIRE RISK ASSESSMENTS</span><i>•</i><span>ALARM SERVICING</span></div>
      </section>

      <section className="section services-section" id="services">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="section-heading">
          <div><span className="section-kicker">Services & pricing</span><h2>Straightforward fire safety services.</h2></div>
          <p>Choose the service you need. Online bookings are attended within the next 7 working days rather than at a selected appointment time.</p>
        </motion.div>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.title} initial={reduceMotion ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: index * 0.07 }} className="service-card">
                <div className="service-number">0{index + 1}</div>
                <div className="service-icon"><Icon /></div>
                <h3>{service.title}</h3>
                <div className="price">{service.price}</div>
                <p>{service.copy}</p>
                <a href="#contact" onClick={() => setForm((current) => ({ ...current, service: service.title }))}>Book / enquire <ChevronRight size={17} /></a>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="process-wrap" id="process">
        <div className="process-glow" />
        <div className="section process-inner">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="process-copy">
            <span className="section-kicker">How online booking works</span>
            <h2>Book now. We attend within 7 working days.</h2>
            <p>Online bookings reserve the service rather than a specific appointment slot. Certifire will attend within the following 7 working days.</p>
            <a className="btn btn-primary" href="#contact">Start a booking <ChevronRight size={18} /></a>
          </motion.div>
          <div className="steps">
            {[
              ['01', 'Choose your service', 'Select the inspection, certificate or logging service you require.'],
              ['02', 'Send your details', 'Tell us about the property and how we can reach you.'],
              ['03', 'Certifire attends', 'Your online booking will be attended within the next 7 working days.'],
              ['04', 'Documentation follows', 'The relevant report, certificate or logbook record is provided following the service.'],
            ].map(([n, title, copy]) => (
              <motion.div key={n} initial={reduceMotion ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="step">
                <strong>{n}</strong><div><h3>{title}</h3><p>{copy}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="about-card">
          <div className="about-mark"><Flame /></div>
          <div>
            <span className="section-kicker">About Certifire UK</span>
            <h2>Ongoing support for safer properties.</h2>
            <p>Certifire UK provides fire safety services including fire risk assessments, fire alarm servicing, emergency lighting checks and regular weekly or monthly fire safety logging.</p>
            <p>Based in London, Certifire serves London and surrounding areas.</p>
          </div>
          <div className="about-stats">
            <div><strong>4</strong><span>core services</span></div>
            <div><strong>7</strong><span>working day attendance window for online bookings</span></div>
            <div><strong>£18</strong><span>per logging visit</span></div>
          </div>
        </motion.div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section contact-grid">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="contact-copy">
            <span className="section-kicker">Book or enquire</span>
            <h2>Tell us what you need.</h2>
            <p>Send the details below and Certifire UK will come back to you about your booking or enquiry.</p>
            <div className="contact-links">
              <a href="tel:+447308449574"><Phone /> <span><small>Call / WhatsApp</small>07308 449574</span></a>
              <a href="mailto:certifireukltd@gmail.com"><Mail /> <span><small>Email</small>certifireukltd@gmail.com</span></a>
              <div><MapPin /> <span><small>Area covered</small>London & surrounding areas</span></div>
            </div>
          </motion.div>
          <motion.form initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="contact-form" onSubmit={submitForm}>
            <div className="form-row">
              <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
              <label>Phone<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your number" /></label>
            </div>
            <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email" /></label>
            <label>Service<select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
            <label>Property / enquiry details<textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us anything useful about the property or service required" /></label>
            <button className="btn btn-primary form-submit" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : <>Send enquiry <ChevronRight size={18} /></>}
            </button>
            <div className="form-status" aria-live="polite">
              {status === 'success' && <span className="success"><Sparkles size={16} /> Thank you. Your enquiry has been sent.</span>}
              {status === 'error' && <span className="error">Something went wrong. Please call or WhatsApp 07308 449574.</span>}
            </div>
          </motion.form>
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <a className="brand footer-brand" href="#top"><img src={LOGO} alt="Certifire UK" /><div><strong>Certifire UK</strong><span>Fire safety services</span></div></a>
          <p>Fire risk assessments, fire alarm servicing, emergency lighting checks and regular fire safety logging across London and surrounding areas.</p>
          <div className="footer-links"><a href="#services">Services</a><a href="#process">How it works</a><a href="#contact">Contact</a></div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Certifire UK Ltd. All rights reserved.</span>
          <a className="diamant-credit" href="https://diamantsolutions.co.uk" target="_blank" rel="noreferrer">
            <span>Website by</span><img src={DS_LOGO} alt="Diamant Solutions" /><span className="credit-tagline">Websites • Systems • Automation</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
