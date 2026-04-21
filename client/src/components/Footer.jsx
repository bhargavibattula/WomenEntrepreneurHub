import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-100 text-black pt-20 pb-10 z-0 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & About (Takes up more space) */}
          <div className="lg:col-span-4 flex flex-col pr-8">
            <h2 className="text-2xl font-extrabold text-black uppercase tracking-tight mb-6">
              Women Connect
            </h2>
            <p className="text-black/80 text-sm leading-relaxed mb-8 max-w-sm">
              The Women Entrepreneur Network is dedicated to empowering women through entrepreneurship, providing exclusive resources, global networking opportunities, and unwavering support.
            </p>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-2">Contact Us</h3>
              <a href="mailto:contact@wen.com" className="text-blue-800 hover:text-blue-700 text-sm font-medium transition-colors">
                contact@wen.com
              </a>
              <span className="text-blue-800 text-sm font-medium">
                (123) 456-7890
              </span>
            </div>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Home</Link></li>
              <li><Link to="/profile" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Profile</Link></li>
              <li><Link to="/settings" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Settings</Link></li>
              <li><Link to="/chat-community" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Community Chat</Link></li>
            </ul>
          </div>

          {/* Business & Events */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6">Business</h3>
            <ul className="space-y-4">
              <li><Link to="/business/all-business" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">All Businesses</Link></li>
              <li><Link to="/business/post-business" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Post Business</Link></li>
              <li><Link to="/your-businesses" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Your Businesses</Link></li>
              <li><Link to="/events/all-events" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">All Events</Link></li>
              <li><Link to="/events/host-event" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Host Event</Link></li>
            </ul>
          </div>

          {/* Resources & Careers */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link to="/resource/articles" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Articles</Link></li>
              <li><Link to="/resource/post-articles" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Post Article</Link></li>
              <li><Link to="/job" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Available Jobs</Link></li>
              <li><Link to="/job/create" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Create Job</Link></li>
            </ul>
          </div>

          {/* Management & Support */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6">Management</h3>
            <ul className="space-y-4">
              <li><Link to="/your-events" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Your Events</Link></li>
              <li><Link to="/your-resources" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Your Resources</Link></li>
              <li><Link to="/your-jobs" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Your Jobs</Link></li>
              <li><Link to="/" className="text-blue-700 hover:text-blue-900 hover:underline transition-all text-sm font-medium capitalize">Help Center</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Socials & Copyright */}
        <div className="border-t border-blue-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <p className="text-sm text-black/80 font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} Women Entrepreneur Network. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-blue-200/50 flex items-center justify-center text-blue-800 hover:bg-blue-800 hover:text-white transition-all duration-300">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-blue-200/50 flex items-center justify-center text-blue-800 hover:bg-blue-800 hover:text-white transition-all duration-300">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-blue-200/50 flex items-center justify-center text-blue-800 hover:bg-blue-800 hover:text-white transition-all duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-blue-200/50 flex items-center justify-center text-blue-800 hover:bg-blue-800 hover:text-white transition-all duration-300">
              <FaLinkedin size={18} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;