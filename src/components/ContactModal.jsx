import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from './ui/Button';
import { useToast } from './ui/Toast';
import { LiquidCarveButton } from './originkit/LiquidCarveButton';

export function ContactModal({ isOpen, onClose, initialSpecs }) {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Brand Commercial',
    turnaround: 'Standard (1-2 Weeks)',
    budget: '$3,000 - $6,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialSpecs) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialSpecs.projectType || prev.projectType,
        turnaround: initialSpecs.turnaround || prev.turnaround,
        budget: initialSpecs.estimatedRange || prev.budget,
        message: initialSpecs.addons?.length
          ? `Project Requirements:\n- ${initialSpecs.addons.join('\n- ')}\n\nProject Brief details:`
          : prev.message,
      }));
    }
  }, [initialSpecs]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name or company';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Please provide a brief outline of the project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0066FF', '#00E5FF', '#38BDF8', '#10B981'],
      });

      addToast({
        type: 'success',
        title: 'Inquiry Sent to Pranay Kumar',
        message: `Thank you ${formData.name}! Pranay Kumar will review your video brief and reply within 12 hours.`,
      });
    }, 800);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl glass-panel rounded-3xl overflow-hidden my-auto max-h-[92vh] flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 id="contact-modal-title" className="text-base font-display font-bold text-white tracking-wide">
              CONTACT PRANAY KUMAR // INQUIRE
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-kage-boneDim hover:text-white transition-all cursor-pointer"
            aria-label="Close Inquiry Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-display font-bold text-white">Project Inquiry Received</h4>
              <p className="text-sm text-kage-boneDim max-w-md leading-relaxed">
                Your video brief for <strong className="text-cyan-400">{formData.projectType}</strong> has been transmitted directly to Pranay Kumar.
              </p>
              <div className="p-3.5 rounded-xl glass-inset font-mono text-xs text-kage-muted">
                Direct phone: +91 6301939938 • Response within 12 hours
              </div>
              <Button variant="primary" size="md" onClick={handleResetAndClose} className="mt-4 bg-blue-600 hover:bg-blue-500">
                Return to Portfolio
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Direct Reach Banner */}
              <div className="p-3.5 rounded-2xl glass-inset flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-kage-boneDim">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>pranayswaero111@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <Phone className="w-4 h-4" />
                  <span>+91 6301939938</span>
                </div>
              </div>

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-kage-boneDim uppercase mb-1.5">
                    Your Name / Company *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Brand Producer / Agency Lead"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500' : ''
                    }`}
                  />
                  {errors.name && <p className="text-rose-400 text-[11px] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-kage-boneDim uppercase mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    placeholder="producer@agency.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500' : ''
                    }`}
                  />
                  {errors.email && <p className="text-rose-400 text-[11px] mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Project Type & Turnaround */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-kage-boneDim uppercase mb-1.5">
                    Deliverable Category
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="Brand Commercial">Brand Commercial</option>
                    <option value="Motion Graphics & VFX">Motion Graphics & VFX</option>
                    <option value="Short Film / Narrative">Short Film / Narrative</option>
                    <option value="YouTube / Entertainment Episode">YouTube / Entertainment Episode</option>
                    <option value="Vertical / Social Reels Batch">Vertical / Social Reels Batch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-kage-boneDim uppercase mb-1.5">
                    Turnaround Pacing
                  </label>
                  <select
                    value={formData.turnaround}
                    onChange={(e) => setFormData({ ...formData, turnaround: e.target.value })}
                    className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="Rush 48h Turnaround">Rush 48h Turnaround</option>
                    <option value="Standard (1-2 Weeks)">Standard (1-2 Weeks)</option>
                    <option value="Dedicated Monthly Retainer">Dedicated Monthly Retainer</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Budget */}
              <div>
                <label className="block text-xs font-mono text-kage-boneDim uppercase mb-1.5">
                  Target Budget / Rate Tier
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹30,000 - ₹80,000 / $3,000 - $6,000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-xs font-mono text-kage-boneDim uppercase mb-1.5">
                  Project Brief & Video Requirements *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your vision, footage camera format, reference links, deadline, and motion graphic requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${
                    errors.message ? 'border-rose-500' : ''
                  }`}
                />
                {errors.message && <p className="text-rose-400 text-[11px] mt-1">{errors.message}</p>}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-kage-muted">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Direct reply from Pranay Kumar</span>
                </div>

                <LiquidCarveButton
                  type="submit"
                  variant="cyan"
                  size="lg"
                  icon={Send}
                  className="w-full sm:w-auto px-8 shadow-[0_10px_25px_rgba(0,102,255,0.35)]"
                >
                  {isSubmitting ? 'Sending...' : 'Send Video Brief'}
                </LiquidCarveButton>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
