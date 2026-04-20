import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ShieldAlert } from "lucide-react";
import { navItems } from "../lib/utils.js";
import Logo from '../assets/TREELOGO.jpg';
import { useStore } from "../store/index.js";
import { HOST } from "../utils/constants.js";
import ProfileSideNav from "./ProfileSideNav.jsx";
import { cn } from "../utils/cn.js";
import { toast } from "react-toastify";

function Navbar() {
  const [openProfileSideNav, setOpenProfileSideNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  
  const navRef = useRef(null);
  const { userInfo } = useStore();
  const location = useLocation();

  // Handle scroll to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Helper to filter nav items based on role
  const getFilteredNavItems = (key) => {
    const items = navItems[key];
    const isVisitor = userInfo?.role === "visitor";
    
    if (!isVisitor) return items;

    // For visitors, filter out "create", "post", and "your" items
    return items.filter(item => {
      const name = item.name.toLowerCase();
      const path = item.path.toLowerCase();
      return !name.includes("create") && !name.includes("post") && !name.includes("your") && !path.includes("your");
    });
  };

  const handleProtectedAction = (e) => {
    if (userInfo?.role === "visitor") {
      e.preventDefault();
      toast.warning("This feature is exclusive to Entrepreneurs and Admins.");
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 pointer-events-auto",
          scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 z-50">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm flex items-center justify-center">
                <img src={Logo} alt="FEMPOWER" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">
                FEMPOWER
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {Object.keys(navItems).map((key) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors font-medium capitalize">
                    {key}
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      activeDropdown === key ? "rotate-180" : ""
                    )} />
                  </button>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {activeDropdown === key && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56"
                      >
                        <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden py-2 relative">
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 rotate-45"></div>
                          
                          <div className="relative z-10 flex flex-col">
                            {getFilteredNavItems(key).map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="px-4 py-2.5 mx-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors capitalize"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Auth / Profile & Mobile Toggle */}
            <div className="flex items-center gap-4 z-50">
              {userInfo ? (
                <button 
                  onClick={() => setOpenProfileSideNav(!openProfileSideNav)}
                  className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900 leading-none">{userInfo.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{userInfo.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src={`${HOST}/${userInfo.profileImage}`} className="w-full h-full object-cover" alt="Profile" />
                  </div>
                </button>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link 
                    to="/auth/login" 
                    className="px-5 py-2.5 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/auth/register" 
                    className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
                  >
                    Join Us
                  </Link>
                </div>
              )}

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 overflow-y-auto xl:hidden shadow-2xl h-screen pb-32"
            >
              <div className="px-4 py-6 flex flex-col gap-2">
                {Object.keys(navItems).map((key) => (
                  <div key={key} className="border-b border-slate-100 last:border-0 pb-2">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                      className="flex items-center justify-between w-full py-4 text-lg font-bold text-slate-900 capitalize"
                    >
                      {key}
                      <ChevronDown className={cn(
                        "w-5 h-5 transition-transform text-slate-400",
                        activeDropdown === key ? "rotate-180 text-blue-600" : ""
                      )} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-2 pb-4 pl-4 border-l-2 border-blue-100 ml-2">
                            {getFilteredNavItems(key).map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="py-2 text-slate-600 hover:text-blue-600 font-medium capitalize"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                {!userInfo && (
                  <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-slate-100 sm:hidden">
                    <Link 
                      to="/auth/login" 
                      className="w-full text-center py-3 rounded-xl text-slate-700 font-bold bg-slate-100"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/auth/register" 
                      className="w-full text-center py-3 rounded-xl text-white font-bold bg-blue-600 shadow-lg shadow-blue-600/20"
                    >
                      Join FEMPOWER
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ProfileSideNav 
        userInfo={userInfo} 
        setOpenProfileSideNav={setOpenProfileSideNav} 
        openProfileSideNav={openProfileSideNav}
      />
    </>
  );
}

export default Navbar;