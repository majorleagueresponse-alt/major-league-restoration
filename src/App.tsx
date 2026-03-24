import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Menu, X, PhoneCall, Phone, ArrowRight, ShieldCheck, Star, 
  Droplets, AlertTriangle, Send, Home as HomeIcon, MapPin, CheckCircle, Clock, Award, ChevronRight,
  Flame, Boxes
} from 'lucide-react';
import GalleryPage from './pages/GalleryPage';
import CitySeoPage from './pages/CitySeoPage';

export interface HomeContent {
  global?: { phoneNumber: string, companyEmail: string, formAccessKey: string };
  hero?: { title1: string, title2: string, tagline: string, subtitle: string };
  about?: { show: boolean, header: string, text: string, image: string };
  servicesSection?: { show: boolean, items: Array<{name: string, description: string}> };
  processSection?: { show: boolean, steps: Array<{title: string, description: string, image: string}> };
  insuranceSection?: { show: boolean, header: string, text: string };
  reviews?: { showGoogle: boolean, googleLink?: string, showYelp: boolean, yelpLink?: string };
  victoriesSection?: { show: boolean, items: Array<{image: string, badge?: string, title?: string, description?: string}> };
  testimonialsSection?: { show: boolean, items: Array<{name: string, quote: string, rating: number}> };
  faqSection?: { show: boolean, items: Array<{question: string, answer: string}> };
  footerSection?: { description: string, licenseNumber: string, serviceAreas: Array<{city: string}> };
}

function MainApp() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const accessKey = homeContent?.global?.formAccessKey;
    
    if (accessKey && accessKey.trim() !== "") {
        // Submit via Web3Forms using the CMS access key
        formData.append("access_key", accessKey);
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        }).then(() => alert("Thank you! Your event details have been securely received. Our dispatch team will contact you shortly."))
          .catch(() => alert("There was an error submitting your request. Please try again."));
    } else {
        // Fallback to Netlify Forms native handling
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString()
        }).then(() => alert("Thank you! Your event details have been securely received. Our dispatch team will contact you shortly."))
          .catch(() => alert("There was an error submitting your request. Please try again."));
    }
    e.currentTarget.reset();
  };

  useEffect(() => {
    fetch('/content/home.json')
      .then(res => res.json())
      .then(data => setHomeContent(data))
      .catch(err => console.error(err));
      
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!homeContent) return <div className="min-h-screen flex items-center justify-center font-display text-dodger-blue text-2xl animate-pulse">Loading Setup...</div>;

  const phone = homeContent.global?.phoneNumber || "1 (800) 555-0199";

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-dodger-blue selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-100' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
             <img src="/assets/new-shield-logo.png" alt="Major League Response Logo" className="h-16 md:h-20 drop-shadow-md my-1" />
          </Link>
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a href="#about" className={`font-display font-bold uppercase tracking-widest text-sm transition-colors relative ${isScrolled ? 'text-gray-700 hover:text-dodger-blue' : 'text-gray-800 hover:text-dodger-blue'}`}>About</a>
            <a href="#services" className={`font-display font-bold uppercase tracking-widest text-sm transition-colors relative ${isScrolled ? 'text-gray-700 hover:text-dodger-blue' : 'text-gray-800 hover:text-dodger-blue'}`}>Services</a>
            <a href="#process" className={`font-display font-bold uppercase tracking-widest text-sm transition-colors relative ${isScrolled ? 'text-gray-700 hover:text-dodger-blue' : 'text-gray-800 hover:text-dodger-blue'}`}>Process</a>
            <Link to="/gallery" className={`font-display font-bold uppercase tracking-widest text-sm transition-colors relative ${isScrolled ? 'text-gray-700 hover:text-dodger-blue' : 'text-gray-800 hover:text-dodger-blue'}`}>Gallery</Link>
            <a href="#insurance" className={`font-display font-bold uppercase tracking-widest text-sm transition-colors relative ${isScrolled ? 'text-gray-700 hover:text-dodger-blue' : 'text-gray-800 hover:text-dodger-blue'}`}>Insurance</a>
            <a href="#contact" className={`font-display font-bold uppercase tracking-widest text-sm transition-colors relative ${isScrolled ? 'text-gray-700 hover:text-dodger-blue' : 'text-gray-800 hover:text-dodger-blue'}`}>Contact</a>
            
            <a href={`tel:${phone.replace(/\D/g,'')}`} className="flex items-center gap-2 bg-dodger-red text-white px-5 py-2.5 rounded shadow-lg shadow-dodger-red/30 font-display font-bold uppercase text-sm hover:bg-dodger-red-hover hover:scale-105 transition-all">
              <PhoneCall className="w-4 h-4" /> {phone}
            </a>
          </div>
          <button className="lg:hidden focus:outline-none text-dodger-blue" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl transition-all duration-300 origin-top overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-6 gap-2">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 font-display font-bold uppercase tracking-wider py-3 border-b border-gray-100">About Us</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 font-display font-bold uppercase tracking-wider py-3 border-b border-gray-100">Services</a>
            <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 font-display font-bold uppercase tracking-wider py-3 border-b border-gray-100">Our Process</a>
            <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 font-display font-bold uppercase tracking-wider py-3 border-b border-gray-100">Our Gallery</Link>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 font-display font-bold uppercase tracking-wider py-3 border-b border-gray-100">Contact</a>
            <a href={`tel:${phone.replace(/\D/g,'')}`} className="mt-6 bg-dodger-blue text-white text-center py-4 font-display text-xl font-bold uppercase tracking-widest rounded shadow-md flex justify-center items-center gap-3">
              <Phone className="w-6 h-6" /> Call Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-50 pt-32 pb-20 md:pt-24">
        <div className="absolute inset-0 bg-white opacity-80 z-0"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-red-50 blur-3xl z-0"></div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <div className="mb-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <div className="flex">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-dodger-blue text-dodger-blue" />)}
              </div>
              <span className="text-xs font-black text-gray-900 tracking-tighter uppercase">Southern California's Top Rated</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-gray-900 mb-6 tracking-tighter drop-shadow-xl leading-[0.9] uppercase font-display">
            <span className="text-dodger-blue">{homeContent.hero?.title1 || "When every second"}</span> <br /> 
            <span className="text-dodger-red">{homeContent.hero?.title2 || "Counts."}</span>
          </h1>
          
          <h2 className="text-xl md:text-3xl text-gray-800 font-black font-display uppercase tracking-widest mb-6 px-4 py-2 border-y-2 border-dodger-red inline-block">
            {homeContent.hero?.tagline || "24/7 EMERGENCY RESPONSE"}
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mb-12 leading-relaxed font-medium">
             {homeContent.hero?.subtitle || "Top-rated water damage mitigation and mold remediation services."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full justify-center mb-10 px-4">
            <a href="#contact" className="group px-8 py-4 md:px-12 md:py-5 bg-dodger-blue hover:bg-dodger-blue-hover text-white font-black text-lg md:text-xl rounded shadow-xl shadow-dodger-blue/20 uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 font-display">
              Get Immediate Help <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#insurance" className="group px-8 py-4 md:px-12 md:py-5 bg-white border-2 border-gray-200 text-gray-800 hover:border-dodger-red font-black text-lg md:text-xl rounded shadow-md uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 font-display transform hover:-translate-y-1">
              <ShieldCheck className="w-6 h-6 text-dodger-red group-hover:scale-110 transition-transform" /> We Bill Insurance
            </a>
          </div>

          {/* Optional Google/Yelp Review Badges */}
          {homeContent.reviews && (homeContent.reviews.showGoogle || homeContent.reviews.showYelp) && (
             <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
                {homeContent.reviews.showGoogle && homeContent.reviews.googleLink && (
                  <a href={homeContent.reviews.googleLink} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 hover:border-blue-500 hover:shadow-md transition-all">
                      <span className="font-bold text-gray-800">Review us on <span className="text-blue-600">Google</span></span>
                      <div className="flex"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /></div>
                  </a>
                )}
                {homeContent.reviews.showYelp && homeContent.reviews.yelpLink && (
                  <a href={homeContent.reviews.yelpLink} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 hover:border-red-500 hover:shadow-md transition-all">
                      <span className="font-bold text-gray-800">Find us on <span className="text-red-600">Yelp</span></span>
                      <div className="flex"><Star className="w-4 h-4 text-red-500 fill-red-500" /><Star className="w-4 h-4 text-red-500 fill-red-500" /><Star className="w-4 h-4 text-red-500 fill-red-500" /><Star className="w-4 h-4 text-red-500 fill-red-500" /><Star className="w-4 h-4 text-red-500 fill-red-500" /></div>
                  </a>
                )}
             </div>
          )}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-900 text-white py-12 md:py-8 border-t-4 border-dodger-red">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-700">
            <div className="flex flex-col items-center justify-center p-4">
                <Clock className="w-8 h-8 text-dodger-blue mb-3" />
                <h4 className="font-display font-bold tracking-widest uppercase text-lg">24/7 Response</h4>
                <p className="text-sm text-gray-400 mt-1">On-site in 60 minutes or less</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
                <Award className="w-8 h-8 text-dodger-blue mb-3" />
                <h4 className="font-display font-bold tracking-widest uppercase text-lg">Fully Certified</h4>
                <p className="text-sm text-gray-400 mt-1">Licensed, Bonded, and Insured</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
                <ShieldCheck className="w-8 h-8 text-dodger-blue mb-3" />
                <h4 className="font-display font-bold tracking-widest uppercase text-lg">Direct Insurance Billing</h4>
                <p className="text-sm text-gray-400 mt-1">We handle the adjusters for you</p>
            </div>
        </div>
      </section>

      {/* About Us */}
      {homeContent.about?.show !== false && (
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-dodger-blue/10 rounded-xl transform -rotate-3 z-0"></div>
                <img src={homeContent.about?.image || "/images/for-website/major league difference .jpg"} alt="Team at work" className="relative z-10 rounded-xl shadow-2xl w-full object-cover h-[500px]" />
                <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block border-t-4 border-dodger-red">
                    <img src="/assets/new-shield-logo.png" className="w-32" alt="Logo" />
                </div>
            </div>
            <div className="lg:w-1/2">
                <h2 className="text-sm font-bold text-dodger-red tracking-[0.2em] uppercase mb-2">Who We Are</h2>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-display uppercase">{homeContent.about?.header || "The Major League Difference"}</h3>
                <div className="h-1.5 w-24 bg-dodger-blue rounded-full mb-8"></div>
                <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6 whitespace-pre-wrap">
                    {homeContent.about?.text || "Professional robust water and mold restoration services."}
                </p>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-gray-800 font-bold"><CheckCircle className="text-dodger-blue w-6 h-6" /> Local Southern California Experts</li>
                    <li className="flex items-center gap-3 text-gray-800 font-bold"><CheckCircle className="text-dodger-blue w-6 h-6" /> Rapid Containment & Extraction</li>
                    <li className="flex items-center gap-3 text-gray-800 font-bold"><CheckCircle className="text-dodger-blue w-6 h-6" /> Transparent Pricing & Communication</li>
                </ul>
                <a href="#contact" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded font-display uppercase tracking-widest transition-colors">
                    Learn More <ChevronRight className="w-5 h-5" />
                </a>
            </div>
        </div>
      </section>
      )}

      {/* Services Section */}
      {homeContent.servicesSection?.show !== false && (
      <section id="services" className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-sm font-bold text-dodger-blue tracking-[0.2em] uppercase mb-2">Our Playbook</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 font-display uppercase">Championship Level Services</h3>
            <div className="h-1.5 w-32 bg-gradient-to-r from-dodger-blue to-dodger-red mx-auto rounded-full mb-16"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {homeContent.servicesSection?.items?.map((service, idx) => {
                    const icons = [Droplets, AlertTriangle, Flame, HomeIcon, Boxes];
                    const IconComponent = icons[idx % icons.length];
                    const colors = ["text-dodger-blue", "text-dodger-red", "text-dodger-blue", "text-gray-900", "text-dodger-blue"];
                    const colorClass = colors[idx % colors.length];
                    return (
                        <div key={idx} className={`bg-white p-8 border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group`}>
                            <IconComponent className={`w-12 h-12 ${colorClass} mb-6 group-hover:scale-110 transition-transform`} />
                            <h4 className="text-xl font-black text-gray-900 mb-3 uppercase font-display tracking-wide">{service.name}</h4>
                            <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>
      )}

      {/* 3 Steps Process */}
      {homeContent.processSection?.show !== false && (
      <section id="process" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold text-dodger-red tracking-[0.2em] uppercase mb-2">How It Works</h2>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 font-display uppercase">The Road to Recovery</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-1 bg-gray-200 z-0 border-t-2 border-dashed border-gray-300"></div>
                
                {homeContent.processSection?.steps?.map((step, idx) => {
                    const bgColors = ["bg-dodger-blue", "bg-dodger-red", "bg-gray-900"];
                    const borderColors = ["border-dodger-blue", "border-dodger-red", "border-gray-900"];
                    const cssBg = bgColors[idx % bgColors.length];
                    const cssBorder = borderColors[idx % borderColors.length];
                    return (
                        <div key={idx} className="relative z-10 flex flex-col text-left bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 pb-8 hover:-translate-y-2 transition-transform duration-300">
                            <img src={step.image} alt={step.title} className={`w-full h-64 object-cover border-b-4 ${cssBorder} mb-6`} />
                            <div className="flex items-center gap-4 mb-4 px-6">
                                <div className={`w-14 h-14 ${cssBg} text-white rounded-full flex items-center justify-center text-2xl font-black flex-shrink-0 shadow-lg font-display`}>{idx + 1}</div>
                                <h4 className="text-2xl font-black font-display uppercase">{step.title}</h4>
                            </div>
                            <p className="text-gray-600 px-6 font-medium leading-relaxed">{step.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>
      )}

      {/* Insurance Section */}
      {homeContent.insuranceSection?.show !== false && (
      <section id="insurance" className="py-24 bg-dodger-blue relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight font-display uppercase">{homeContent.insuranceSection?.header || "Insurance Claims"}</h2>
            <div className="h-1 w-24 bg-dodger-red rounded-full mb-8"></div>
            <p className="text-xl mb-6 text-blue-50 leading-relaxed font-light">
              {homeContent.insuranceSection?.text}
            </p>
            <ul className="space-y-5 mb-10">
              <li className="flex items-start gap-4 font-medium text-lg text-white">
                <ShieldCheck className="w-8 h-8 text-dodger-red flex-shrink-0 mt-1" /> 
                <p>Direct billing to all major insurance carriers including State Farm, Farmers, Allstate, and more.</p>
              </li>
              <li className="flex items-start gap-4 font-medium text-lg text-white">
                <ShieldCheck className="w-8 h-8 text-dodger-red flex-shrink-0 mt-1" /> 
                <p>We supply comprehensive documentation, moisture reading logs, and photo evidence to justify the claim.</p>
              </li>
            </ul>
            <a href="#contact" className="inline-block bg-white text-dodger-blue font-black px-10 py-5 rounded font-display uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-2xl">
              Start Your Claim Today
            </a>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute inset-0 bg-dodger-red transform translate-x-6 translate-y-6 rounded-2xl opacity-60"></div>
             <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Insurance" className="relative rounded-xl shadow-2xl w-full h-[500px] object-cover border-4 border-white" />
          </div>
        </div>
      </section>
      )}

      {/* Gallery Section - Recent Victories */}
      {homeContent.victoriesSection?.show !== false && (
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold text-dodger-blue tracking-[0.2em] uppercase mb-2">The Highlight Reel</h2>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 font-display uppercase">Recent Victories</h3>
                <div className="h-1.5 w-24 bg-dodger-blue rounded-full mx-auto mt-6 mb-12"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 text-left">
                {homeContent.victoriesSection?.items?.map((victory, idx) => {
                    const colors = [
                        "border-dodger-blue text-dodger-blue",
                        "border-dodger-red text-dodger-red",
                        "border-gray-800 text-gray-800"
                    ];
                    const colorClass = colors[idx % colors.length];
                    
                    return (
                        <div key={idx} className="group relative overflow-hidden rounded-xl shadow-2xl bg-gray-900">
                            <img src={victory.image} alt={victory.title || `Victory ${idx + 1}`} className="w-full h-80 object-cover transform group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" />
                            {(victory.badge || victory.title || victory.description) && (
                                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent">
                                    {victory.badge && <span className={`text-xs font-black uppercase tracking-widest mb-3 px-3 py-1.5 rounded border bg-white inline-block w-max ${colorClass}`}>{victory.badge}</span>}
                                    {victory.title && <h4 className="text-2xl font-black text-white mb-2 font-display uppercase tracking-wide">{victory.title}</h4>}
                                    {victory.description && <p className="text-gray-300 text-sm font-medium">{victory.description}</p>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center">
                 <Link to="/gallery" className="inline-flex items-center gap-3 bg-gray-900 text-white font-black px-10 py-5 rounded font-display uppercase tracking-widest hover:bg-dodger-blue transition-colors shadow-2xl">
                    <MapPin className="w-6 h-6" /> View All Prior Work
                </Link>
            </div>
        </div>
      </section>
      )}

      {/* Service Areas */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <h2 className="text-sm font-bold text-dodger-blue tracking-[0.2em] uppercase mb-2">Our Territory</h2>
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 font-display uppercase">Areas We Serve</h3>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {homeContent.footerSection?.serviceAreas?.map((area, idx) => area.city && (
                    <div key={idx} className="bg-white p-4 border border-gray-200 rounded text-center shadow-sm font-bold text-gray-700">
                        {area.city}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-100 z-0 border-b border-gray-200"></div>
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
             <div>
                <h2 className="text-sm font-bold text-dodger-red tracking-[0.2em] uppercase mb-2">Don't Wait</h2>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 font-display uppercase leading-tight drop-shadow-sm">Need Immediate <br/><span className="text-dodger-blue">Assistance?</span></h2>
                <div className="h-1.5 w-24 bg-dodger-blue rounded-full mb-8"></div>
                <p className="text-gray-600 text-xl mb-10 leading-relaxed max-w-lg">Don't let damage bench your property. Contact the Major League team for rapid deployment across Southern California.</p>
                
                <div className="flex items-center gap-6 p-6 mb-6 bg-white border-l-8 border-dodger-blue rounded shadow-xl">
                    <div className="bg-blue-50 p-4 rounded-full shadow-inner">
                        <Phone className="w-8 h-8 text-dodger-blue" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">24/7 Dispatch</h3>
                        <a href={`tel:${phone.replace(/\D/g,'')}`} className="text-3xl font-black text-dodger-blue font-display tracking-wider hover:text-dodger-blue-hover transition-colors">{phone}</a>
                    </div>
                </div>
             </div>
             
             <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl relative border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-dodger-blue to-dodger-red rounded-t-xl"></div>
                <h3 className="text-3xl font-black text-gray-900 uppercase mb-8 flex items-center gap-3 font-display mt-2">
                   Request Evaluation
                </h3>
                <form onSubmit={handleFormSubmit} name="contact" data-netlify="true" className="space-y-6">
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" name="firstName" placeholder="First Name" className="w-full bg-gray-50 border border-gray-200 p-4 rounded outline-none focus:border-dodger-blue focus:ring-2 focus:ring-dodger-blue/20 transition-all font-medium" required />
                        <input type="text" name="lastName" placeholder="Last Name" className="w-full bg-gray-50 border border-gray-200 p-4 rounded outline-none focus:border-dodger-blue focus:ring-2 focus:ring-dodger-blue/20 transition-all font-medium" required />
                    </div>
                    <input type="tel" name="phone" placeholder="Phone Number" className="w-full bg-gray-50 border border-gray-200 p-4 rounded outline-none focus:border-dodger-blue focus:ring-2 focus:ring-dodger-blue/20 transition-all font-medium" required />
                    <select name="service" className="w-full bg-gray-50 border border-gray-200 p-4 rounded outline-none focus:border-dodger-blue focus:ring-2 focus:ring-dodger-blue/20 transition-all font-medium text-gray-600">
                        <option value="Water Damage Mitigation">Water Damage Mitigation</option>
                        <option value="Mold Remediation">Mold Remediation</option>
                        <option value="Fire Damage">Fire Damage</option>
                        <option value="Build Back / Construction">Build Back / Construction</option>
                    </select>
                    <textarea name="eventDetails" placeholder="Additional Event Details (Optional)" rows={3} className="w-full bg-gray-50 border border-gray-200 p-4 rounded outline-none focus:border-dodger-blue focus:ring-2 focus:ring-dodger-blue/20 transition-all font-medium"></textarea>
                    <button type="submit" className="w-full bg-dodger-blue text-white font-black py-5 rounded uppercase tracking-widest hover:bg-dodger-blue-hover shadow-lg hover:shadow-xl transition-all flex justify-center cursor-pointer gap-3 font-display text-lg">
                        Submit Request <Send className="w-6 h-6"/>
                    </button>
                    <p className="text-xs text-center text-gray-400 font-medium">We respect your privacy. All information is kept confidential.</p>
                </form>
             </div>
        </div>
      </section>

      {/* Testimonials */}
      {homeContent.testimonialsSection?.show !== false && homeContent.testimonialsSection?.items?.length && (
        <section className="py-24 bg-gray-900 border-t-8 border-dodger-blue">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-sm font-bold text-dodger-blue tracking-[0.2em] uppercase mb-2">Client Success</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-12 font-display uppercase">What Our Clients Say</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {homeContent.testimonialsSection.items.map((t, idx) => (
                        <div key={idx} className="bg-gray-800 p-8 rounded-xl shadow-2xl text-left border border-gray-700">
                            <div className="flex mb-4">
                                {[...Array(t.rating || 5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
                            </div>
                            <p className="text-gray-300 text-lg italic mb-6 leading-relaxed">"{t.quote}"</p>
                            <h4 className="text-white font-black uppercase tracking-widest text-sm">— {t.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      )}

      {/* FAQ Section */}
      {homeContent.faqSection?.show !== false && homeContent.faqSection?.items?.length && (
        <section className="py-24 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-dodger-red tracking-[0.2em] uppercase mb-2">Got Questions?</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 font-display uppercase">Frequently Asked Questions</h3>
                </div>
                
                <div className="space-y-4">
                    {homeContent.faqSection.items.map((faq, idx) => (
                        <details key={idx} className="group bg-gray-50 border border-gray-200 rounded-lg outline-none custom-transition-all">
                            <summary className="font-bold flex cursor-pointer items-center justify-between p-6 text-gray-900 list-none text-lg">
                                {faq.question}
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-600 leading-relaxed font-medium">
                                <p>{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 border-t-4 border-dodger-blue pt-20 pb-10">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div>
                    <img src="/assets/new-shield-logo.png" alt="Major League Response Logo" className="h-24 mb-6 drop-shadow-md bg-white p-2 rounded" />
                    <p className="text-sm leading-relaxed mb-6 font-medium text-gray-400">
                        {homeContent.footerSection?.description || "Premium water mitigation and mold remediation services."}
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-black uppercase tracking-widest mb-6 font-display">Services</h4>
                    <ul className="space-y-3 font-medium text-gray-400">
                        {homeContent.servicesSection?.items?.slice(0,4).map((s,i) => (
                           <li key={i}><a href="#services" className="hover:text-dodger-blue transition-colors">{s.name}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                   <h4 className="text-white font-black uppercase tracking-widest mb-6 font-display">Service Areas</h4>
                  <ul className="space-y-3 font-medium text-gray-400">
                    {homeContent.footerSection?.serviceAreas?.slice(0, 4).map((area, idx) => area.city && (
                        <li key={idx}><Link to={`/service-areas/${area.city.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-dodger-blue transition-colors">{area.city}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                    <h4 className="text-white font-black uppercase tracking-widest mb-6 font-display">Contact</h4>
                    <ul className="space-y-4 font-medium text-gray-400">
                        <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-dodger-blue" /> {phone} </li>
                        <li className="flex items-center gap-3"><AlertTriangle className="w-5 h-5 text-dodger-red" /> 24/7 Emergency Service</li>
                        <li className="mt-6 p-4 rounded border border-gray-700 bg-gray-800 xl:inline-block">
                            <strong className="text-white block mb-1">{homeContent.footerSection?.licenseNumber || "Lic# 12345678"}</strong>
                            <span className="text-xs">Bonded & Fully Insured</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
                <p>&copy; {new Date().getFullYear()} Major League Response. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/service-areas/:city" element={<CitySeoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
