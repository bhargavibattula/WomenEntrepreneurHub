import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="bg-blue-100 z-0 text-black py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm">
              The Women Entrepreneur Network is dedicated to empowering women through entrepreneurship, providing resources, networking opportunities, and support.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">Email: <a href="mailto:contact@wen.com" className="text-blue-700 hover:text-blue-300">contact@wen.com</a></p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-800 hover:text-blue-300">
                <FaFacebook size={30} /> <p className='text-blue-800 hover:text-blue-300 mr-3 pr-3'>Facebook</p>
              </a>
              <a href="#" className="text-blue-800 hover:text-blue-300">
                <FaTwitter size={30} /> <p className='text-blue-800 hover:text-blue-300 mr-3 pr-3'>Twitter</p>
              </a>
              <a href="#" className="text-blue-800 hover:text-blue-300">
                <FaInstagram size={30} /> <p className='text-blue-800 hover:text-blue-300 mr-3 pr-3'>Instagram</p>
              </a>
              <a href="#" className="text-blue-800 hover:text-blue-300">
                <FaLinkedin size={30} /> <p className='text-blue-800 hover:text-blue-300 mr-3 pr-3'>Linkedin</p>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Home</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Events</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Blog</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Gallery</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Resources</h3>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Articles</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Webinars</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Mentorship</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Workshops</a></li>
            </ul>
          </div>
          <div className="text">
          <h3 className="text-lg font-semibold mb-2">Community</h3>
          <ul className="text-sm space-y-1">
          <li><a href="#" className="text-blue-700 hover:text-blue-300">Discussion Boards</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Event Calendar</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Mentorship Programs</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-300">Resource Library</a></li>
          </ul>
        </div>
        </div>
    

        <div className="mt-6 border-t border-blue-700 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Women Entrepreneur Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;