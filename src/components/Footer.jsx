import { Link } from "react-router";
import { Facebook, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
   <section className="w-full flex justify-center items-center bg-linear-to-b from-[#667eea] to-[#422AD5] dark:bg-linear-to-b dark:from-slate-800 dark:to-slate-900">
     <footer className="py-8 px-4 container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Company Info */}
        <div>
          <div className="flex items-center space-x-2 text-white">
            <svg 
              className="w-8 h-8" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="text-xl font-bold text-white">BookCourier</span>
          </div>
          <ul className="space-y-2 mt-4">
            <li>
              <Link to="/books" className="text-white hover:text-blue-200 transition-colors">
                All Books
              </Link>
            </li>
            <li>
              <Link to="/dashboard/orders" className="text-white hover:text-blue-200 transition-colors">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile" className="text-white hover:text-blue-200 transition-colors">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-white hover:text-blue-200 transition-colors">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="text-white hover:text-blue-200 transition-colors">
                Browse Books
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-white hover:text-blue-200 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-blue-200 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-blue-200 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                Reading Blog
              </Link>
            </li>
            <li>
              <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                Book Guides
              </Link>
            </li>
            <li>
              <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Contact Details</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start">
              <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
              <a
                href="mailto:support@bookcourier.com"
                className="hover:text-blue-200 transition-colors"
              >
                support@bookcourier.com
              </a>
            </li>
            <li className="flex items-start">
              <svg className="w-[18px] h-[18px] mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-start">
              <svg className="w-[18px] h-[18px] mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>123 Book Street, Reading City, RC 12345</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors"
            >
              <Facebook size={30} />
            </a>
            <a
              href="https://x.comer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors"
            >
              <img
                className="w-[30px] bg-white rounded"
                src="https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=000000"
                alt="Twitter"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-300 transition-colors"
            >
              <Instagram size={30} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t lg:mb-0 md:mb-0 mb-20 border-white/30 mt-8 pt-4 text-center">
        <p className="text-sm text-white">
          © {currentYear} BookCourier. All Rights Reserved.
          <span className="ml-4">
            <Link to="/" className="hover:text-blue-200 transition-colors mr-3">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Terms of Service
            </Link>
          </span>
        </p>
      </div>
    </footer>
   </section>
  );
};

export default Footer;
