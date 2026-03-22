import { useParams, Link } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

function CitySeoPage() {
    const { city } = useParams();
    // Reformat "yorba-linda" -> "Yorba Linda"
    const formattedCity = city?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Southern California';

    return (
        <div className="bg-white text-gray-900 font-sans pt-24 min-h-screen">
             <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-100">
                <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
                <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                    <img src="/assets/new-shield-logo.png" alt="Major League Response Logo" className="h-16 drop-shadow-md" />
                </Link>
                <div className="hidden lg:flex items-center gap-8">
                    <Link to="/" className="text-gray-700 hover:text-dodger-blue font-display font-bold uppercase tracking-widest text-sm transition-colors">Home</Link>
                    <a href="tel:5555550199" className="flex items-center gap-2 bg-dodger-red text-white px-5 py-2.5 rounded shadow-lg font-display font-bold uppercase text-sm hover:bg-dodger-red-hover">
                        <PhoneCall className="w-4 h-4" /> (555) 555-0199
                    </a>
                </div>
                </div>
            </nav>

            <section className="relative w-full py-24 bg-blue-50 text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-display uppercase tracking-tight">
                        Top-Rated Water Damage Restoration in <span className="text-dodger-blue">{formattedCity}</span>
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 font-medium">
                        Serving {formattedCity} homeowners with rapid, 60-minute emergency water extraction and mold remediation.
                    </p>
                    <Link to="/#contact" className="inline-block bg-dodger-blue text-white font-black px-10 py-5 rounded font-display uppercase tracking-widest hover:bg-dodger-blue-hover shadow-xl hover:-translate-y-1 transition-transform">
                        Get {formattedCity} Service Now
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default CitySeoPage;
