import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { apiClient } from '../lib/api-clinet';
import { useLocation, useNavigate } from 'react-router-dom';
import { UPDATE_JOB_BY_ID } from '../utils/constants';
import { countriesWithStates } from '../lib/utils';
import { Briefcase, MapPin, DollarSign, Type, Info, Layers, ChevronRight, Sparkles, Building, Globe } from 'lucide-react';

const CreateJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editMode = location.state?.editMode || false;
  const initialJobData = location.state?.jobData || null;

  const [formData, setFormData] = useState({
    title: initialJobData?.title || "",
    description: initialJobData?.description || "",
    salary: initialJobData?.salary || "",
    employmentType: initialJobData?.employmentType || "full-time",
    location: initialJobData?.location || "",
    category: initialJobData?.category || "",
    country: initialJobData?.country || "India",
    state: initialJobData?.state || "Andhra Pradesh",
    city: initialJobData?.city || ""
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editMode && initialJobData?._id) {
        const response = await apiClient.patch(`${UPDATE_JOB_BY_ID}/${initialJobData._id}`, formData, { withCredentials: true });
        if (response.data.success) {
            toast.success("Job updated successfully!");
            navigate("/your-jobs");
        } else {
            toast.error(response.data.message || "Failed to update job");
        }
      } else {
        const response = await apiClient.post(`/api/job/create-job`, formData, { withCredentials: true });
        if (response.data.success) {
            toast.success("Job posted successfully!");
            navigate("/your-jobs");
        } else {
            toast.error(response.data.message || "Failed to post job");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Column: Form */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 p-8 md:p-12"
            >
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                        <Briefcase className="w-3 h-3" /> Job Management
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                        {editMode ? "Edit Job" : "Post a New"} <span className="text-blue-600">Opportunity</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Fill in the details below to reach thousands of talented professionals in our network.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                            <Type className="w-4 h-4 text-blue-500" /> Job Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                            placeholder="e.g. Senior Product Designer"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                            <Info className="w-4 h-4 text-blue-500" /> Job Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
                            placeholder="Describe the role, responsibilities, and requirements..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                <DollarSign className="w-4 h-4 text-blue-500" /> Salary Range
                            </label>
                            <input
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                placeholder="e.g. $100k - $150k"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                <Layers className="w-4 h-4 text-blue-500" /> Employment Type
                            </label>
                            <select
                                name="employmentType"
                                value={formData.employmentType}
                                onChange={handleChange}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                                required
                            >
                                <option value="full-time">Full-Time</option>
                                <option value="part-time">Part-Time</option>
                                <option value="freelance">Freelance</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                <Globe className="w-4 h-4 text-blue-500" /> Country
                            </label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                                required
                            >
                                {Object.keys(countriesWithStates).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                <MapPin className="w-4 h-4 text-blue-500" /> State
                            </label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                                required
                            >
                                <option value="">Select State</option>
                                {countriesWithStates[formData.country]?.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                <Building className="w-4 h-4 text-blue-500" /> City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                placeholder="e.g. Mumbai"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                            <Layers className="w-4 h-4 text-blue-500" /> Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                            placeholder="e.g. Design, Engineering, Marketing"
                            required
                        />
                    </div>

                    <div className="pt-8">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-5 bg-blue-600 text-white rounded-3xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Processing..." : (editMode ? "Update Job Posting" : "Publish Job Opportunity")}
                        </button>
                    </div>
                </form>
            </motion.div>

            {/* Right Column: Tips/Preview */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block w-full max-w-sm"
            >
                <div className="sticky top-32 space-y-6">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4 leading-tight">Hire the Best Talent</h2>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                Jobs with clear descriptions and visible salary ranges get up to 3x more quality applications.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm text-slate-300">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <ChevronRight className="w-3 h-3 text-blue-400" />
                                    </div>
                                    Be specific about the role and impact.
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-300">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <ChevronRight className="w-3 h-3 text-blue-400" />
                                    </div>
                                    Include perks and company culture.
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-300">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <ChevronRight className="w-3 h-3 text-blue-400" />
                                    </div>
                                    Set clear expectations for the first 90 days.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-blue-900/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                                <Building className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Need Help?</h4>
                                <p className="text-xs text-slate-400">Contact support for premium plans</p>
                            </div>
                        </div>
                        <button className="w-full py-3 px-4 bg-slate-50 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-colors">
                            Talk to an Expert
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
