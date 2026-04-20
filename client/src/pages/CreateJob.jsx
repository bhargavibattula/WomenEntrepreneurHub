import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { apiClient } from '../lib/api-clinet';
import { useLocation, useNavigate } from 'react-router-dom';
import { UPDATE_JOB_BY_ID } from '../utils/constants';

const CreateJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editMode = location.state?.editMode || false;
  const initialJobData = location.state?.jobData || null;

  const [formData, setFormData] = useState({
    title: initialJobData?.title || "",
    description: initialJobData?.description || "",
    salary: initialJobData?.salary || "",
    employmentType: initialJobData?.employmentType || "",
    location: initialJobData?.location || "",
    category: initialJobData?.category || "",
    country: initialJobData?.country || "",
    state: initialJobData?.state || "",
    city: initialJobData?.city || ""
  });
  
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch countries from GeoNames API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://api.geonames.org/countryInfoJSON?username=deepak32'); 
        const data = await response.json();
        setCountries(data.geonames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    const fetchStates = async () => {
      if (formData.country) {
        try {
          const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${formData.country}&username=deepak32`);
          const data = await response.json();
          setStates(data.geonames);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      }
    };

    fetchStates();
  }, [formData.country]);

  // Fetch cities when a state is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        try {
          const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${formData.state}&username=deepak32`);
          const data = await response.json();
          setCities(data.geonames);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };

    fetchCities();
  }, [formData.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editMode && initialJobData?._id) {
        // Update existing job
        const response = await apiClient.patch(`${UPDATE_JOB_BY_ID}/${initialJobData._id}`, formData, {
          withCredentials: true,
        });
        if (response.data.success) {
            toast.success("Job updated successfully!");
            navigate("/your-jobs");
        } else {
            toast.error(response.data.message || "Failed to update job");
        }
      } else {
        // Create new job
        const response = await apiClient.post(`/api/job/create-job`, formData, {
          withCredentials: true,
        });
        toast.success(response.data.message || "Job created successfully!");
        navigate("/your-jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save job. Please try again later.");
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-3xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 p-8 md:p-12"
        >
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              {editMode ? "Edit Job Post" : "Create a New Job"}
            </h1>
            <p className="text-slate-500 font-medium">
              {editMode ? "Update the details of your existing job posting." : "Fill in the details below to post a new career opportunity."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  placeholder="e.g. Senior Software Engineer"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
                  placeholder="Detailed job description and requirements..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                        <option key={country.geonameId} value={country.geonameId}>
                            {country.countryName}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none"
                    required
                  >
                    <option value="">Select State</option>
                    {states?.map(state => (
                      <option key={state.geonameId} value={state.geonameId}>{state.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none"
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city.geonameId} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Salary Range</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                    placeholder="e.g. $80k - $120k"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Employment Type</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  placeholder="e.g. Technology, Finance, Marketing"
                  required
                />
              </div>
            </div>

            <div className="pt-6">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                >
                    {loading ? "Processing..." : (editMode ? "Update Job Post" : "Post Job Opportunity")}
                </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateJob;
