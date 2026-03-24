import { Link } from 'react-router-dom';
import { PhoneCall, Send } from 'lucide-react';

// Read all gallery JSON files created by Decap CMS at build time
const galleryFiles = import.meta.glob('/public/content/gallery/*.json', { eager: true });
const galleryItems = Object.values(galleryFiles).map((mod: any) => mod.default || mod);

// Read all highlight reel JSON files 
const highlightFiles = import.meta.glob('/public/content/highlights/*.json', { eager: true });
const highlightItems = Object.values(highlightFiles).map((mod: any) => mod.default || mod);

function GalleryPage() {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString()
        }).then(() => alert("Thank you! Your event details have been securely received. Our dispatch team will contact you shortly."))
          .catch(() => alert("There was an error submitting your request. Please try again."));
        e.currentTarget.reset();
    };

    return (
        <div className="bg-gray-50 text-gray-900 font-sans min-h-screen pt-24">
             {/* Navbar Component normally abstracted, hardcoded here for speed */}
            <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-100">
                <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
                <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                    <img src="/assets/new-shield-logo.png" alt="Major League Response Logo" className="h-16 drop-shadow-md" />
                </Link>
                <div className="hidden lg:flex items-center gap-8">
                    <Link to="/" className="text-gray-700 hover:text-dodger-blue font-display font-bold uppercase tracking-widest text-sm transition-colors">Home</Link>
                    <Link to="/gallery" className="text-dodger-blue font-display font-bold uppercase tracking-widest text-sm transition-colors">Our Gallery</Link>
                    <a href="tel:5555550199" className="flex items-center gap-2 bg-dodger-red text-white px-5 py-2.5 rounded shadow-lg shadow-dodger-red/30 font-display font-bold uppercase text-sm hover:bg-dodger-red-hover hover:scale-105 transition-all">
                        <PhoneCall className="w-4 h-4" /> (555) 555-0199
                    </a>
                </div>
                </div>
            </nav>

            <header className="bg-dodger-blue text-white py-20 relative overflow-hidden text-center">
                <h1 className="text-5xl md:text-6xl font-black uppercase font-display mb-4">Our Record</h1>
                <p className="text-xl text-blue-100 font-medium max-w-2xl mx-auto">See the before and after transformations of our major league restoration projects.</p>
            </header>

            <section className="py-16">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryItems.map((item: any, index: number) => (
                         <div key={index} className="bg-white rounded-md shadow-xl overflow-hidden border border-gray-100 flex flex-col">
                            <div className="relative h-64 overflow-hidden group">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-dodger-blue text-white text-xs font-black px-3 py-1 rounded uppercase tracking-widest">{item.serviceType}</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-black text-gray-900 uppercase font-display mb-2">{item.title}</h3>
                                <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                    {galleryItems.length === 0 && (
                        <div className="col-span-full text-center text-gray-500 py-12">
                            No gallery projects found. Add some via the CMS dashboard!
                        </div>
                    )}
                </div>
            </section>

            {/* Highlight Reels Section */}
            {highlightItems.length > 0 && (
                <section className="py-16 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-display uppercase tracking-tight">Highlight Reels</h2>
                            <div className="h-1.5 w-24 bg-dodger-red rounded-full mx-auto mt-6 mb-4"></div>
                            <p className="text-gray-600 font-medium">Quick glimpses into our daily restoration victories.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {highlightItems.map((item: any, index: number) => (
                                <div key={index} className="relative group overflow-hidden rounded-lg shadow-md aspect-square bg-gray-100">
                                    <img src={item.image} alt={item.title || "Highlight Reel"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    {item.title && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white font-black uppercase text-sm">{item.title}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Form Section */}
            <section className="py-24 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl relative border border-gray-100">
                        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-dodger-blue to-dodger-red rounded-t-xl"></div>
                        <div className="text-center mb-8 mt-2">
                            <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase font-display">
                            Need Immediate Assistance?
                            </h3>
                            <p className="text-gray-600 mt-3 font-medium">Request a rapid evaluation from our major league team.</p>
                        </div>
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
        </div>
    );
}

export default GalleryPage;
