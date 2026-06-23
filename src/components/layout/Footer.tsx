import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

// Inline social media icon components (lucide-react removed brand icons)
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-stone-600">
                <Image 
                  src="/school/ps_logo.png" 
                  alt="Pathseekers Logo" 
                  fill 
                  sizes="40px"
                  loading="lazy"
                  className="object-contain p-0.5" 
                />
              </div>
              <div>
                <span className="block font-serif text-lg font-bold tracking-tight text-white group-hover:text-primary-300 transition-colors">
                  Pathseekers
                </span>
                <span className="block text-[9px] text-stone-500 uppercase tracking-widest -mt-1">
                  Find your path, Create your future
                </span>
              </div>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed mb-6">
              A premium co-educational institution situated in Beas, Punjab. Guided by holistic learning, academic excellence, and moral integrity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-primary-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-primary-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-primary-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors" aria-label="Youtube">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About History & Values</Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-white transition-colors">Curriculum & Subjects</Link>
              </li>
              <li>
                <Link href="/students-corner" className="hover:text-white transition-colors">Student Notices & Gallery</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">Educational Articles (Blog)</Link>
              </li>
              <li>
                <Link href="/alumni" className="hover:text-white transition-colors">Alumni Success Stories</Link>
              </li>
            </ul>
          </div>

          {/* CBSE Disclosure Details */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">CBSE Mandates</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-stone-500">
                Affiliation Number: <strong className="text-stone-300">1630982</strong>
              </li>
              <li>
                <a href="https://www.pathseekers.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  Official CBSE Mandates Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/legal#cbse-docs" className="hover:text-white transition-colors">
                  Transfer Certificates (TC)
                </Link>
              </li>
              <li>
                <Link href="/legal#privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/legal#terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* School Location */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span>
                  Pathseekers School,<br />
                  Dera Baba Jaimal Singh, Beas,<br />
                  Amritsar, Punjab - 143204
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-primary-500 shrink-0" />
                <span>+91-XXXXX-XXXXX</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-primary-500 shrink-0" />
                <a href="mailto:xxx@pathseekers.edu.in" className="hover:text-white transition-colors">xxx@pathseekers.edu.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {currentYear} Pathseekers Beas. All Rights Reserved. Reference official site: <a href="https://www.pathseekers.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-stone-300 underline">Pathseekers School Beas Official Website</a>.</p>
          <div className="flex gap-6">
            <span>Punjab, India Focus</span>
            <span>CBSE Affiliated No. 1630982</span>
            <Link href="/admin" className="hover:underline text-primary-500">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
