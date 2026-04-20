import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../lib/api-clinet";
import { POST_A_BUSINESS, UPDATE_BUSINESS_BY_ID, HOST } from "../utils/constants";
import { toast } from "react-toastify";
import { countriesWithStates } from "../lib/utils";
import image from "../assets/BUSINESSIMAGE.webp";
import { Briefcase, Globe, MapPin, Tag, Info, Upload, X, ChevronRight } from "lucide-react";

function CreateBusiness() {
  const location = useLocation();
  const navigate = useNavigate();
  const editMode = location.state?.editMode || false;
  const initialData = location.state?.businessData || null;

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "Tech Innovation");
  const [website, setWebsite] = useState(initialData?.website || "");
  const [country, setCountry] = useState(initialData?.country || "India");
  const [state, setState] = useState(initialData?.state || "Andhra Pradesh");
  const [selectedTags, setSelectedTags] = useState(initialData?.tags ? (Array.isArray(initialData.tags) ? initialData.tags : initialData.tags.split(',')) : []);
  const [logoImage, setLogoImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(initialData?.logoImage ? `${HOST}/${initialData.logoImage}` : null);
  const [loading, setLoading] = useState(false);

  const tags = [
    'retail', 'restaurant', 'tech', 'consulting', 'manufacturing', 'healthcare',
    'finance', 'education', 'real-estate', 'entertainment', 'automotive', 'hospitality',
    'ecommerce', 'clothing', 'food', 'software', 'startup', 'advisory', 'B2B',
    'logistics', 'medical', 'investment', 'training', 'property', 'media',
    'vehicles', 'hotel', 'travel', 'luxury', 'online-learning', 'services',
    'supply-chain', 'production', 'sales', 'development', 'AI', 'blockchain', 
    'SaaS', 'financial', 'insurance', 'mortgage', 'tourism', 'event', 'repair'
  ];

  const handleSelectTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    if (logoImage) formData.append("logoImage", logoImage);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("description", description);
    formData.append("tags", selectedTags.join(','));
    formData.append("website", website);

    try {
      if (editMode && initialData?._id) {
        const response = await apiClient.patch(`${UPDATE_BUSINESS_BY_ID}/${initialData._id}`, formData, { withCredentials: true });
        if (response.data.success || response.status === 200) {
          toast.success("Business updated successfully!");
          navigate("/your-businesses");
        }
      } else {
        const response = await apiClient.post(POST_A_BUSINESS, formData, { withCredentials: true });
        if (response.data.success || response.status === 200) {
          toast.success("Business created successfully!");
          navigate("/your-businesses");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
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
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                {editMode ? "Edit Your Business" : "Register Your Business"}
              </h1>
              <p className="text-slate-500 font-medium">
                {editMode ? "Keep your business profile up to date for potential partners." : "Join our network and showcase your venture to the world."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Logo Upload */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Business Logo</label>
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
                      {previewImage ? (
                        <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <Upload className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <input 
                      type="file" 
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600">Click to upload your business logo</p>
                    <p className="text-xs text-slate-400 mt-1">Recommended: Square image, max 2MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                    <Briefcase className="w-4 h-4 text-blue-500" /> Business Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    required
                    placeholder="e.g. Acme Innovations"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                    <Globe className="w-4 h-4 text-blue-500" /> Website URL
                  </label>
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    type="url"
                    placeholder="https://example.com"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                  <Info className="w-4 h-4 text-blue-500" /> Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                  placeholder="What does your business do?"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                    <Tag className="w-4 h-4 text-blue-500" /> Category
                  </label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Tech Innovation</option>
                    <option>Retail & Consumer</option>
                    <option>Creative Services</option>
                    <option>Health & Wellness</option>
                    <option>Education & Training</option>
                    <option>Food & Beverage</option>
                    <option>Sustainable Ventures</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                    <MapPin className="w-4 h-4 text-blue-500" /> Location
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select 
                      value={country} 
                      onChange={(e) => setCountry(e.target.value)} 
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                    >
                      {Object.keys(countriesWithStates).map((c, i) => (
                        <option value={c} key={i}>{c}</option>
                      ))}
                    </select>
                    <select 
                      value={state} 
                      onChange={(e) => setState(e.target.value)} 
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                    >
                      {countriesWithStates[country]?.map((s, i) => (
                        <option value={s} key={i}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Industry Tags</label>
                <div className="flex flex-wrap gap-2 p-1 max-h-40 overflow-y-auto pr-2 scrollbar-hide">
                  {tags.map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        selectedTags.includes(tag)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-600 border-slate-200 hover:border-blue-400"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Processing..." : (editMode ? "Update Business Details" : "Register Business")}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Column: Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-full max-w-sm"
          >
            <div className="sticky top-32">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 leading-tight">Grow Your Business with WEN</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    By registering your business, you gain access to exclusive networking events, potential investors, and a community of supportive founders.
                  </p>
                  <img src={image} className="w-full rounded-2xl shadow-2xl opacity-80" alt="Business Growth" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CreateBusiness;