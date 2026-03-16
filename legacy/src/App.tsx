import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Globe, Cpu, Zap, Layout, 
  MessageSquare, Database, Users, Mail, Phone, MapPin,
  CheckCircle2, Award, Rocket, Heart, ShieldCheck, Target,
  Twitter, Linkedin, Github, Instagram, Facebook, Calendar, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Types ---
const API_BASE_URL = '/backend/api.php';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface ServiceCardProps {
  key?: React.Key;
  icon: React.ElementType;
  title: string;
  index: number;
}

interface TeamMemberProps {
  key?: React.Key;
  name: string;
  role: string;
  index: number;
}

interface ProductCardProps {
  title: string;
  description: string;
  status?: string;
  index: number;
}

// --- Components ---

const NavLink = ({ href, children, onClick }: NavLinkProps) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-slate-600 hover:text-brand-gold transition-colors font-medium px-2 py-1 rounded-md focus-visible:ring-2 focus-visible:ring-brand-gold outline-none"
  >
    {children}
  </a>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-3xl md:text-4xl font-display font-bold mb-4 text-brand-navy"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="text-slate-500 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="h-1 bg-brand-gold mx-auto mt-6 rounded-full"
    ></motion.div>
  </div>
);

const ServiceCard = ({ icon: Icon, title, index }: ServiceCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover="hover"
    className="glass-card p-8 flex flex-col items-center text-center group transition-all duration-300 hover:border-brand-gold/50"
  >
    <motion.div
      variants={{
        hover: { y: -10, scale: 1.02 }
      }}
      className="flex flex-col items-center"
    >
      <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
        <motion.div
          variants={{
            hover: { scale: 1.2, color: "#E59400" }
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-8 h-8 text-brand-gold" />
        </motion.div>
      </div>
      <h3 className="text-xl font-display font-semibold mb-2 text-brand-navy">{title}</h3>
    </motion.div>
  </motion.div>
);

const TeamCard = ({ name, role, image_url, index }: TeamMemberProps & { image_url?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="glass-card p-6 text-center"
  >
    <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-brand-gold/20 overflow-hidden">
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        {image_url ? (
          <img src={image_url} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Users className="w-10 h-10 text-slate-400" />
          </div>
        )}
      </motion.div>
    </div>
    <h4 className="text-lg font-bold text-brand-navy">{name}</h4>
    <p className="text-brand-gold text-sm font-medium">{role}</p>
  </motion.div>
);

const ProductCard = ({ title, description, status, index }: ProductCardProps) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="glass-card p-8 relative overflow-hidden group"
  >
    {status && (
      <span className="absolute top-4 right-4 bg-brand-gold/20 text-brand-gold-dark text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">
        {status}
      </span>
    )}
    <h3 className="text-xl font-display font-bold mb-4 text-brand-navy group-hover:text-brand-gold-dark transition-colors">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const BlogCard = ({ title, author, date, image, index }: { key?: React.Key, title: string, author: string, date: string, image?: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="glass-card overflow-hidden group border-slate-100"
  >
    <div className="h-48 overflow-hidden relative">
      <img 
        src={image || `https://picsum.photos/seed/${index + 10}/800/600`} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 mb-3 text-[10px] font-bold uppercase tracking-widest text-brand-gold">
        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {author}</span>
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(date).toLocaleDateString()}</span>
      </div>
      <h3 className="text-lg font-display font-bold text-brand-navy mb-4 line-clamp-2 group-hover:text-brand-gold transition-colors">
        {title}
      </h3>
      <button className="text-brand-navy font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
        Read Article <ArrowRight className="w-4 h-4 text-brand-gold" />
      </button>
    </div>
  </motion.div>
);

const AssessmentQuiz = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    {
      question: "How do you currently track your inventory and sales?",
      options: [
        { text: "Pen/Paper", pts: 0 },
        { text: "Basic Spreadsheets", pts: 5 },
        { text: "Dedicated Software", pts: 10 }
      ]
    },
    {
      question: "How do you handle customer inquiries and support?",
      options: [
        { text: "Manual calls/WhatsApp", pts: 0 },
        { text: "Standard Helpdesk", pts: 5 },
        { text: "Automated AI/CRM Systems", pts: 10 }
      ]
    },
    {
      question: "How do you manage your business data?",
      options: [
        { text: "Physical files", pts: 0 },
        { text: "Scattered digital files", pts: 5 },
        { text: "Centralized Cloud Dashboard", pts: 10 }
      ]
    }
  ];

  const handleAnswer = (pts: number) => {
    const newScore = score + pts;
    setScore(newScore);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    let resultText = "";
    if (score <= 10) {
      resultText = "Your business relies heavily on manual processes. Sardauna Tech Lab can help you transition to Custom Business Systems and save hours of work.";
    } else if (score <= 20) {
      resultText = "You have a digital foundation, but there are bottlenecks. Let's integrate our AI & Automation tools to scale your operations.";
    } else {
      resultText = "You are digitally advanced! Let's talk about our custom IT Consulting and enterprise platforms to take you to the next level.";
    }

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="text-brand-gold-dark w-10 h-10" />
        </div>
        <h4 className="text-2xl font-display font-bold mb-4 text-brand-navy">Your Score: {score}/30</h4>
        <p className="text-slate-500 mb-8 leading-relaxed">{resultText}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="btn-primary">Book a Free Consultation</a>
          <button onClick={resetQuiz} className="text-slate-400 hover:text-brand-navy transition-colors text-sm font-medium">Retake Quiz</button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
            className="h-full bg-brand-gold"
          ></motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-xl font-display font-bold mb-8 text-brand-navy">{questions[step].question}</h4>
          <div className="space-y-4">
            {questions[step].options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileHover={{ x: 10, backgroundColor: "rgba(253, 184, 19, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(opt.pts)}
                className="w-full text-left p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-brand-gold transition-all flex justify-between items-center group"
              >
                <span className="text-slate-600 group-hover:text-brand-navy transition-colors">{opt.text}</span>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-brand-gold transition-colors" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SavingsCalculator = () => {
  const [employees, setEmployees] = useState(10);
  const [hours, setHours] = useState(20);
  const [wage, setWage] = useState(2500);

  // Formula: (Hours per week * Hourly Wage) * 4 weeks. 
  // Assume Sardauna's automation systems eliminate 70% of this manual work.
  const monthlyManualCost = hours * wage * 4;
  const potentialSavings = Math.round(monthlyManualCost * 0.7);
  const hoursSaved = Math.round(hours * 4 * 0.7);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Number of Employees</label>
            <span className="text-brand-gold font-bold">{employees}</span>
          </div>
          <input 
            type="range" min="1" max="50" value={employees} 
            onChange={(e) => setEmployees(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-gold"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Manual Data Entry (Hrs/Week)</label>
            <span className="text-brand-gold font-bold">{hours}h</span>
          </div>
          <input 
            type="range" min="5" max="100" value={hours} 
            onChange={(e) => setHours(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-gold"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Avg. Hourly Wage (₦)</label>
            <span className="text-brand-gold font-bold">₦{wage.toLocaleString()}</span>
          </div>
          <input 
            type="range" min="1000" max="10000" step="500" value={wage} 
            onChange={(e) => setWage(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-gold"
          />
        </div>
      </div>

      <motion.div 
        layout
        className="p-6 rounded-2xl bg-brand-gold/5 border border-brand-gold/20"
      >
        <p className="text-slate-600 leading-relaxed mb-4">
          By automating with Sardauna Tech Lab, you could save approximately:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <motion.p 
              key={potentialSavings}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-display font-bold text-brand-navy"
            >
              ₦{potentialSavings.toLocaleString()}
            </motion.p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Savings</p>
          </div>
          <div>
            <motion.p 
              key={hoursSaved}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-display font-bold text-brand-gold-dark"
            >
              {hoursSaved}h
            </motion.p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hours Recovered</p>
          </div>
        </div>
      </motion.div>
      
      <p className="text-[10px] text-slate-400 italic text-center">
        *Calculations based on 70% efficiency gain through automation.
      </p>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}?action=submit_inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrors({ submit: result.message || 'Submission failed' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="h-full">
      {isSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-full flex flex-col items-center justify-center text-center py-10"
        >
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="text-emerald-500 w-8 h-8" />
          </div>
          <h4 className="text-xl font-display font-bold text-white mb-2">Message Sent!</h4>
          <p className="text-slate-400">Thank you for reaching out. We'll get back to you shortly.</p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="mt-6 text-brand-blue text-sm font-bold uppercase tracking-wider hover:underline"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-white border ${errors.name ? 'border-red-500/50' : 'border-slate-200'} rounded-lg px-4 py-3 text-brand-navy focus:outline-none focus:border-brand-gold transition-colors`} 
                placeholder="John Doe" 
              />
              {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-white border ${errors.email ? 'border-red-500/50' : 'border-slate-200'} rounded-lg px-4 py-3 text-brand-navy focus:outline-none focus:border-brand-gold transition-colors`} 
                placeholder="john@example.com" 
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Subject</label>
            <input 
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-brand-navy focus:outline-none focus:border-brand-gold transition-colors" 
              placeholder="Project Inquiry" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4} 
              className={`w-full bg-white border ${errors.message ? 'border-red-500/50' : 'border-slate-200'} rounded-lg px-4 py-3 text-brand-navy focus:outline-none focus:border-brand-gold transition-colors`} 
              placeholder="Tell us about your project..."
            ></textarea>
            {errors.message && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.message}</p>}
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending...
              </>
            ) : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconMap: Record<string, any> = {
    Globe, Cpu, Zap, Layout, MessageSquare, Database
  };

  const defaultTeam = [
    { name: "Muhammad Auwal Abubakar", role: "Founder/CEO" },
    { name: "Maryam Abubakar", role: "Co-Founder" },
    { name: "Jibril Raji Qasim", role: "Chief Technology Officer" },
    { name: "Mustapha Abdulsalam", role: "Assistant CTO" },
    { name: "Hussaini Jibril", role: "AI/ML Engineer" },
    { name: "Khalid Murtala", role: "Developer" },
    { name: "Ibrahim Rabie Ismail", role: "Business Development Manager" },
    { name: "Muhammad Mukthar", role: "Product Designer" }
  ];

  const defaultServices = [
    { icon: Globe, title: "Web Development & Design" },
    { icon: Layout, title: "Custom Business Systems" },
    { icon: Cpu, title: "AI & Automation Integration" },
    { icon: Layout, title: "UI/UX Design" },
    { icon: MessageSquare, title: "IT Consulting & Digital Strategy" },
    { icon: Database, title: "Admin Dashboards & CRM" }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white text-slate-700 selection:bg-brand-gold selection:text-brand-navy flex flex-col">
      {/* 1. Header & Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-header py-3' : 'bg-transparent py-6'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 focus-visible:ring-brand-gold rounded-lg group">
            <div className="w-10 h-10 bg-brand-navy rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
              <span className="text-brand-gold font-display font-bold text-xl">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold text-brand-navy leading-none tracking-tight">Sardauna</span>
              <span className="text-xs font-display font-bold text-brand-gold uppercase tracking-widest">Tech Lab</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#products">Products</NavLink>
            <NavLink href="#blog">Blog</NavLink>
            <NavLink href="#team">Team</NavLink>
            <NavLink href="#contact" onClick={() => {}}>
              <span className="btn-primary py-2 px-6 text-sm">Contact</span>
            </NavLink>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-brand-navy p-2 focus-visible:ring-brand-gold rounded-lg" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <NavLink href="#home" onClick={toggleMenu}>Home</NavLink>
                <NavLink href="#about" onClick={toggleMenu}>About</NavLink>
                <NavLink href="#services" onClick={toggleMenu}>Services</NavLink>
                <NavLink href="#products" onClick={toggleMenu}>Products</NavLink>
                <NavLink href="#blog" onClick={toggleMenu}>Blog</NavLink>
                <NavLink href="#team" onClick={toggleMenu}>Team</NavLink>
                <NavLink href="#contact" onClick={toggleMenu}>Contact</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <section id="home" className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-slate-50">
        {/* Background Accents with Parallax */}
        <motion.div style={{ y: y1 }} className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-navy/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-gold/10 blur-[120px] rounded-full"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            style={{ opacity, scale }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-dark text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={14} /> Established 2023
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-8 text-brand-navy tracking-tighter">
              Building Digital <br />
              <span className="text-brand-gold">Infrastructure</span> <br />
              for Africa.
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed">
              Empowering SMEs to operate efficiently, scale confidently, and compete in a modern digital economy.
            </p>
            <div className="flex flex-wrap gap-6">
              <motion.a 
                href="#products" 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2"
              >
                Explore Solutions <ChevronRight size={18} />
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 glass-card p-8 rotate-3 hover:rotate-0 transition-all duration-700 border-slate-200 bg-white shadow-2xl">
              <div className="w-full aspect-square bg-slate-50 rounded-2xl flex items-center justify-center p-12">
                <div className="w-full h-full bg-brand-navy rounded-3xl flex items-center justify-center shadow-inner">
                   <span className="text-brand-gold font-display font-bold text-9xl">S</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-brand-gold/20 -z-10 blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-brand-navy/10 -z-10 blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* 3. About Us / Our Story */}
      <section id="about" className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 rounded-full bg-brand-navy/5 text-brand-navy text-xs font-bold uppercase tracking-widest mb-6">
                Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-brand-navy leading-tight">
                Crafting the <span className="text-brand-gold">Future</span> <br />
                of Digital Africa.
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Founded in 2023, Sardauna Tech Lab began as an independent freelance initiative and has since grown into a structured, registered technology company.
                </p>
                <p>
                  The company is dedicated to solving real business challenges by helping small and medium enterprises transition from manual operations to efficient, automated systems.
                </p>
              </div>

              <div className="mt-12 grid sm:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="glass-card p-8 border-t-4 border-brand-navy bg-white shadow-xl shadow-brand-navy/5"
                >
                  <div className="w-12 h-12 bg-brand-navy/5 rounded-xl flex items-center justify-center mb-6">
                    <Rocket className="text-brand-navy" size={24} />
                  </div>
                  <h3 className="text-brand-navy font-bold mb-3 text-xl">Vision</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    To be the leading catalyst for digital transformation across Africa, empowering every SME with world-class technology.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="glass-card p-8 border-t-4 border-brand-gold bg-white shadow-xl shadow-brand-gold/5"
                >
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-6">
                    <Target className="text-brand-gold-dark" size={24} />
                  </div>
                  <h3 className="text-brand-navy font-bold mb-3 text-xl">Mission</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    To bridge the digital divide by providing accessible, innovative, and automated solutions that drive business growth.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glass-card p-10 bg-slate-50 border-slate-200 shadow-2xl relative z-10">
                <h3 className="text-3xl font-display font-bold mb-10 text-brand-navy">Core Values</h3>
                <ul className="space-y-6">
                  {[
                    { title: "Integrity & Accountability", icon: ShieldCheck, color: "text-brand-navy", bg: "bg-brand-navy/5" },
                    { title: "Innovation", icon: Zap, color: "text-brand-gold-dark", bg: "bg-brand-gold/10" },
                    { title: "Collaboration", icon: Users, color: "text-brand-navy", bg: "bg-brand-navy/5" },
                    { title: "Excellence", icon: Award, color: "text-brand-gold-dark", bg: "bg-brand-gold/10" },
                    { title: "Community Responsibility", icon: Heart, color: "text-brand-navy", bg: "bg-brand-navy/5" }
                  ].map((value, idx) => (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-6 group"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${value.bg} flex items-center justify-center ${value.color} group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                        <value.icon size={26} />
                      </div>
                      <span className="text-lg font-semibold text-slate-800 group-hover:text-brand-navy transition-colors">{value.title}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-brand-gold/20 rounded-full blur-[100px] -z-10"></div>
              <div className="absolute -top-12 -left-12 w-80 h-80 bg-brand-navy/5 rounded-full blur-[100px] -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Why Choose Us" 
            subtitle="We combine local expertise with world-class technology to deliver impactful results."
          />
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: "Local Expertise", icon: MapPin },
              { title: "Innovative Tech", icon: Cpu },
              { title: "Reliable Delivery", icon: CheckCircle2 },
              { title: "Sustainable Growth", icon: Rocket },
              { title: "Impact-Driven", icon: Zap }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover="hover"
                className="glass-card p-6 text-center group hover:bg-white transition-colors cursor-default border-slate-200"
              >
                <motion.div
                  variants={{
                    hover: { scale: 1.15, rotate: 5 }
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-10 h-10 text-brand-gold mx-auto mb-4 transition-colors" />
                </motion.div>
                <h4 className="font-bold text-brand-navy text-sm uppercase tracking-wider">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Services */}
      <section id="services" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Our Services" 
            subtitle="Comprehensive digital solutions tailored for the African business landscape."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {defaultServices.map((s, idx) => (
              <ServiceCard key={idx} icon={s.icon} title={s.title} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Flagship Products */}
      <section id="products" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Flagship Products" 
            subtitle="Innovative platforms designed to revolutionize how businesses operate."
          />
          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard 
              title="Community Business Platform" 
              description="A robust digital marketplace designed specifically for SMEs to showcase products and reach wider audiences."
              status="Live"
              index={0}
            />
            <ProductCard 
              title="AI Omnichannel Support" 
              description="Automated customer support systems that integrate across multiple channels to ensure seamless communication."
              status="Concept"
              index={1}
            />
            <ProductCard 
              title="Inventory & Vendor Platform" 
              description="Streamlined management of stock levels and supplier relationships to optimize supply chain efficiency."
              status="Concept"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-navy/5 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/10 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Interactive Business Tools" 
            subtitle="Assess your digital readiness and calculate your potential savings with our automation solutions."
          />

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Feature 1: SME Digital Readiness Assessment Tool */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 border-slate-200"
            >
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3 text-brand-navy">
                <ShieldCheck className="text-brand-gold" /> Digital Readiness Quiz
              </h3>
              
              <AssessmentQuiz />
            </motion.div>

            {/* Feature 2: ROI & Automation Savings Calculator */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 md:p-10 border-slate-200"
            >
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3 text-brand-navy">
                <Zap className="text-brand-gold" /> ROI Savings Calculator
              </h3>
              
              <SavingsCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Blog & News Section */}
      <section id="blog" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Blog & News" 
            subtitle="Insights, updates, and technology trends from the Sardauna Tech Lab team."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "The Future of SME Automation in Nigeria", author: "Muhammad Auwal", date: new Date().toISOString() },
              { title: "Why UI/UX Design is the Key to Business Growth", author: "Muhammad Mukthar", date: new Date().toISOString() },
              { title: "Integrating AI into Your Daily Workflow", author: "Hussaini Jibril", date: new Date().toISOString() }
            ].map((post, idx) => (
              <BlogCard 
                key={idx}
                title={post.title}
                author={post.author}
                date={post.date}
                index={idx}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="btn-primary px-10 py-4">View All Insights</button>
          </div>
        </div>
      </section>

      {/* 9. Leadership & Team */}
      <section id="team" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Our Leadership Team" 
            subtitle="Meet the visionaries and engineers behind Sardauna Tech Lab."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {defaultTeam.map((m, idx) => (
              <TeamCard key={idx} name={m.name} role={m.role} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Partners & Collaborators */}
      <section className="section-padding border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-center text-slate-400 uppercase tracking-[0.3em] text-xs font-bold mb-12">Partners & Collaborators</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <motion.div 
              initial={{ opacity: 0.6 }}
              whileHover={{ scale: 1.2, opacity: 1 }}
              className="text-2xl font-display font-bold text-brand-navy cursor-default transition-all duration-300"
            >
              Techfort Foundation
            </motion.div>
            <motion.div 
              initial={{ opacity: 0.6 }}
              whileHover={{ scale: 1.2, opacity: 1 }}
              className="text-2xl font-display font-bold text-brand-navy cursor-default transition-all duration-300"
            >
              Pinkpetals Initiative (PPI)
            </motion.div>
          </div>
        </div>
      </section>
      </main>

      {/* 9. Footer & Contact Section */}
      <footer id="contact" className="pt-20 pb-10 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Get in Touch</h2>
              <p className="text-slate-300 mb-8">Have a project in mind or want to learn more about our solutions? We're here to help.</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Call Us</p>
                    <p className="text-slate-300 text-sm">07019672820, 09060276333</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email Us</p>
                    <p className="text-slate-300 text-sm">sardaunatechlabs@gmail.com</p>
                    <p className="text-slate-300 text-sm">sardaunatechlabs@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-brand-gold shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Visit Us</p>
                    <p className="text-slate-300 text-sm">Dutse, Jigawa State, Nigeria</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 bg-white/5 border-white/10"
            >
              <ContactForm />
            </motion.div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Sardauna Tech Lab Ltd. All rights reserved.
            </div>
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" }
              ].map((social) => (
                <motion.a 
                  key={social.label} 
                  href={social.href} 
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
