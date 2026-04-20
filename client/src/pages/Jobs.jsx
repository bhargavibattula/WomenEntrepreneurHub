import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { apiClient } from '../lib/api-clinet';
import { Link } from "react-router-dom";
import axios from "axios";
import { GET_ALL_JOBS } from "../utils/constants";
import { Search, Briefcase, MapPin, DollarSign, Clock, ArrowRight, Sparkles, Filter, X } from 'lucide-react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchLocationAndJobs = async () => {
      setLoading(true);
      // Fetch all jobs first
      try {
        const response = await apiClient.get(GET_ALL_JOBS, { withCredentials: true });
        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }

      // Try to get location for local jobs
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e1380dc6169547da989fae606a5e1362`
              );
              const fetchedCity = response.data.results[0]?.components.state_district;
              if (fetchedCity) {
                setCity(fetchedCity);
                fetchJobsByLoc(fetchedCity);
              }
            } catch (error) {
              console.error("Geocoding error:", error);
            }
          }
        );
      }
    };

    fetchLocationAndJobs();
  }, []);

  const fetchJobsByLoc = async (cityName) => {
    try {
      const response = await apiClient.get(`/api/job/get-jobs/${cityName}`, { withCredentials: true });
      if (response.data && response.data.length > 0) {
        setJobs(response.data);
      }
    } catch (error) {
      console.error("Error fetching local jobs:", error);
    }
  };

  const filteredJobs = jobs?.filter((job) => {
    return (
      (!category || job.category.toLowerCase().includes(category.toLowerCase())) &&
      (!searchTerm || job.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Discover Your Next Big Career Move
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6"
          >
            Pathway to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Employment</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed"
          >
            Connect with top female-founded businesses and industry leaders. Find a role that empowers your growth and aligns with your values.
          </motion.p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 border border-slate-100 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search job titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none appearance-none transition-all font-medium cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="success-stories">Success Stories</option>
                <option value="leadership-development">Leadership Development</option>
                <option value="business-funding">Business Funding</option>
                <option value="technology">Technology</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-3xl font-bold transition-all active:scale-95 shadow-xl shadow-blue-600/20">
              Find Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Job List Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Urgently Hiring</h2>
            {city && <p className="text-slate-500 mt-1 flex items-center gap-1 font-medium"><MapPin className="w-4 h-4" /> Showing jobs near {city}</p>}
          </div>
          <div className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
            {filteredJobs?.length || 0} Openings
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {loading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="w-full h-32 bg-slate-50 rounded-3xl animate-pulse" />
              ))
            ) : filteredJobs?.length > 0 ? (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <Link
                    to={`/job/${job._id}`}
                    className="block p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                            {job.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                            <Clock className="w-3 h-3" /> {job.employmentType || "Full-time"}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-4 text-slate-500 font-medium text-sm">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400" /> {job.location || "Remote"}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4 text-slate-400" /> {job.salary || "Competitive"}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4 text-slate-400" /> {job.employer?.name || "Verified Founder"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No jobs found</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Try adjusting your filters or search terms to find more opportunities.</p>
                <button
                  onClick={() => { setSearchTerm(""); setCategory(""); }}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default JobList;
