import { useState, useEffect } from "react";
import { 
  Smartphone, Battery, Droplets, ShieldAlert, HardDrive, Cpu, 
  MapPin, Phone, Mail, ChevronDown, ChevronUp, Star, CheckCircle2,
  Menu, X, Facebook, Instagram, Twitter
} from "lucide-react";
import "./App.css";

function App() {
  const [currentReview, setCurrentReview] = useState(0);
  const [repairStatus, setRepairStatus] = useState(null);
  const [repairLoading, setRepairLoading] = useState(false);
  const [formMsg, setFormMsg] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // --- DATA ---
  const reviews = [ 
    { 
      text: "Fast and honest — fixed my iPhone screen same day. Highly recommended!", 
      author: "Nana A., Accra", 
      stars: 5, 
      img: "https://i.pravatar.cc/150?img=11" 
    },
    { 
      text: "Saved my laptop data after a crash. Very professional and they know their stuff.", 
      author: "Kofi B., Tema", 
      stars: 5, 
      img: "https://i.pravatar.cc/150?img=59" 
    },
    { 
      text: "Reasonable price and excellent service at midnight! Really 24/7.", 
      author: "Ama S., Accra", 
      stars: 5, 
      img: "https://i.pravatar.cc/150?img=5" 
    }
  ];

  const team = [
    { name: "Clifford D.", role: "Lead Engineer", img: "https://i.pravatar.cc/150?img=60" },
    { name: "Sarah J.", role: "Software Specialist", img: "https://i.pravatar.cc/150?img=44" },
    { name: "Emmanuel K.", role: "Hardware Technician", img: "https://i.pravatar.cc/150?img=12" },
    { name: "Jessica M.", role: "Customer Success", img: "https://i.pravatar.cc/150?img=9" }
  ];

  const services = [
    { title: "Screen Repair", price: "GHS 150+", desc: "Original displays with TrueTone calibration.", icon: <Smartphone size={32} /> },
    { title: "Battery Swap", price: "GHS 90+", desc: "High-capacity cells with health check included.", icon: <Battery size={32} /> },
    { title: "Water Damage", price: "From GHS 120", desc: "Ultrasonic cleaning & logic board recovery.", icon: <Droplets size={32} /> },
    { title: "Virus Removal", price: "GHS 80+", desc: "Malware cleanup & security hardening.", icon: <ShieldAlert size={32} /> },
    { title: "Data Recovery", price: "Custom Quote", desc: "Forensic retrieval from dead drives.", icon: <HardDrive size={32} /> },
    { title: "Custom PC", price: "From GHS 100", desc: "Gaming builds, SSD upgrades & RAM.", icon: <Cpu size={32} /> },
  ];

  const faqs = [
    { q: "How long does a screen repair take?", a: "Most iPhone screens are fixed in 30-45 minutes. iPads and Laptops may take 24 hours." },
    { q: "Do you offer a warranty?", a: "Yes! All hardware repairs come with a 90-day warranty on parts and labor." },
    { q: "Can you fix water damaged phones?", a: "Yes, but time is critical. Bring it in immediately. We have a 70% success rate if treated within 24 hours." },
    { q: "Do I lose my data during repair?", a: "Rarely. However, we always recommend backing up your device before bringing it in." }
  ];

  const brands = ["APPLE", "SAMSUNG", "HP", "DELL", "LENOVO", "ASUS", "GOOGLE", "SONY", "TOSHIBA", "MICROSOFT"];

  useEffect(() => {
    const timer = setInterval(() => setCurrentReview((prev) => (prev + 1) % reviews.length), 5000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => { clearInterval(timer); window.removeEventListener("scroll", handleScroll); };
  }, [reviews.length]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormMsg("Sending...");
    // Simulate API call for demo
    setTimeout(() => { setFormMsg("✅ Message sent successfully!"); e.target.reset(); }, 1500);
  };

  const checkStatus = async (e) => {
    e.preventDefault();
    const phone = e.target.phoneCheck.value;
    if (phone.length < 8) return;
    setRepairLoading(true); setRepairStatus(null);
    // Simulate API
    setTimeout(() => {
        setRepairLoading(false);
        setRepairStatus([{ _id: "123", device: "iPhone 12", issue: "Screen Crack", status: "In Progress" }]);
    }, 1500);
  };

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="font-sans text-slate-100 bg-slate-950 min-h-screen selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      
      {/* TOP BAR */}
      <div className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2"><MapPin size={14} /> Accra, Ghana — Open 24/7</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cyan-200 transition">Facebook</a>
            <a href="#" className="hover:text-cyan-200 transition">Instagram</a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-600 rounded-xl grid place-items-center text-white font-black text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">CT</div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight">Cliff_Tech</h1>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase">Solutions</span>
            </div>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {['Services', 'Team', 'Reviews', 'FAQ'].map((item) => (
               <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition hover:scale-105">{item}</a>
            ))}
            <a href="#contact" className="bg-white text-slate-950 px-6 py-2.5 rounded-full font-bold hover:bg-cyan-400 transition shadow-lg shadow-white/10 hover:shadow-cyan-400/50">
              Book Repair
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              #1 Rated Tech Repair in Accra
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              We Bring Dead <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Devices Back to Life.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Don't panic. From cracked screens to liquid damage, our certified engineers use microsoldering to fix what others can't.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition hover:-translate-y-1">
                Get a Free Quote
              </a>
              <a href="#status" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-white hover:bg-white/10 transition flex items-center justify-center gap-2">
                <CheckCircle2 size={18} className="text-cyan-400"/> Track Repair
              </a>
            </div>
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>90-Day Warranty</span> • <span>Data Secure</span> • <span>Fast Turnaround</span>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src="/images/repair1.jpg" alt="Repair" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
              
              {/* Floating Cards */}
              <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><CheckCircle2 size={20} /></div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold">Success Rate</div>
                  <div className="text-white font-bold">99.8% Fixed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-slate-950 border-y border-white/5 py-6 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
        <div className="flex whitespace-nowrap animate-marquee">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span key={i} className="mx-12 text-2xl font-black text-slate-800 uppercase tracking-tighter">
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Services</h2>
            <p className="text-slate-400">Expert hardware and software solutions. We don't just swap parts; we understand the circuitry.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.07] transition duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition group-hover:bg-cyan-500/20"></div>
                <div className="mb-6 text-cyan-400 bg-cyan-500/10 w-14 h-14 rounded-2xl grid place-items-center group-hover:scale-110 transition duration-300">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{s.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-cyan-400 font-bold">{s.price}</span>
                  <span className="w-8 h-8 rounded-full border border-white/10 grid place-items-center text-slate-400 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition">
                    <ChevronDown className="-rotate-90" size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Meet The Experts</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="relative mb-4 inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-violet-600 rounded-full blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
                  <img src={member.img} alt={member.name} className="relative w-32 h-32 rounded-full object-cover border-4 border-slate-800 group-hover:scale-105 transition duration-300" />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-cyan-500 text-xs font-bold uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl font-bold">Client Stories</h2>
          </div>
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 p-12 rounded-3xl relative">
            <div className="text-cyan-500 mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">"{reviews[currentReview].text}"</p>
            <div className="flex items-center justify-center gap-4">
              <img src={reviews[currentReview].img} alt="User" className="w-12 h-12 rounded-full border-2 border-cyan-500" />
              <div className="text-left">
                <div className="font-bold text-white">{reviews[currentReview].author}</div>
                <div className="text-xs text-slate-400 uppercase">Verified Customer</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-8">
             {reviews.map((_, i) => (
                <button key={i} onClick={() => setCurrentReview(i)} className={`h-1.5 rounded-full transition-all duration-300 ${currentReview === i ? "w-8 bg-cyan-500" : "w-2 bg-slate-700"}`} />
             ))}
          </div>
        </div>
      </section>

      {/* TRACKER & FAQ GRID */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
          
          {/* Tracker */}
          <div id="status" className="bg-slate-950 p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div> Live Repair Tracker</h3>
            <p className="text-slate-400 mb-6">Enter your phone number to check your device status.</p>
            <form onSubmit={checkStatus} className="flex gap-2 mb-8">
              <input name="phoneCheck" type="tel" placeholder="+233..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-cyan-500 transition" required />
              <button type="submit" className="bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-xl hover:bg-cyan-400 transition">Check</button>
            </form>
            
            <div className="space-y-3">
              {repairLoading && <div className="text-center py-4 text-cyan-400 animate-pulse">Searching database...</div>}
              {repairStatus && repairStatus.map((job) => (
                <div key={job._id} className="bg-white/5 p-4 rounded-xl border-l-4 border-cyan-500 flex justify-between items-center">
                  <div>
                    <div className="font-bold">{job.device}</div>
                    <div className="text-xs text-slate-400">{job.issue}</div>
                  </div>
                  <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full">{job.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div id="faq">
            <h3 className="text-2xl font-bold mb-8">Common Questions</h3>
            <div className="space-y-4">
              {faqs.map((item, i) => (
                <div key={i} className={`border rounded-2xl transition-all duration-300 ${openFaq === i ? "border-cyan-500 bg-white/5" : "border-white/10 hover:border-white/20"}`}>
                  <button onClick={() => toggleFaq(i)} className="w-full text-left p-6 flex justify-between items-center font-bold">
                    {item.q}
                    {openFaq === i ? <ChevronUp className="text-cyan-500" /> : <ChevronDown className="text-slate-500" />}
                  </button>
                  <div className={`px-6 text-slate-400 overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-indigo-950/20 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Let's Fix It.</h2>
                <p className="text-slate-400 mb-8">Send us a message and we'll get back to you within 15 minutes.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full grid place-items-center text-cyan-500"><MapPin /></div>
                    <div><div className="font-bold">Visit Us</div><div className="text-sm text-slate-400">Accra, Ghana</div></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full grid place-items-center text-cyan-500"><Phone /></div>
                    <div><div className="font-bold">Call Us</div><div className="text-sm text-slate-400">+233 54 709 2289</div></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full grid place-items-center text-cyan-500"><Mail /></div>
                    <div><div className="font-bold">Email Us</div><div className="text-sm text-slate-400">cliffdesignz@gmail.com</div></div>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input name="name" placeholder="Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition w-full" required />
                  <input name="phone" placeholder="Phone" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition w-full" />
                </div>
                <input name="email" type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition w-full" required />
                <textarea name="message" rows="4" placeholder="What's wrong with your device?" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition w-full" required></textarea>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition transform hover:-translate-y-1">
                  Send Message
                </button>
                {formMsg && <div className="text-center text-green-400 font-bold mt-2">{formMsg}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950 py-12 text-center md:text-left">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg"></div>
              <span className="font-bold text-xl">Cliff_Tech</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs mx-auto md:mx-0">Professional tech repair services for the modern world. We fix what others can't.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-cyan-400">Services</a></li>
              <li><a href="#reviews" className="hover:text-cyan-400">Reviews</a></li>
              <li><a href="#contact" className="hover:text-cyan-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-slate-600 text-xs">
          © 2025 Cliff_Tech Solutions. Built by Cliff Designz.
        </div>
      </footer>

      <a href="https://wa.me/233547092289" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50 flex items-center gap-2 font-bold pr-6">
        <span className="text-xl">💬</span> Chat
      </a>
    </div>
  );
}

export default App;
