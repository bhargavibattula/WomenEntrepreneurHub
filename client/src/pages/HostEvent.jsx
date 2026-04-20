import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../lib/api-clinet";
import { CREATE_A_EVENT, UPDATE_EVENT_BY_ID } from "../utils/constants";
import { toast } from "react-toastify";
import { countriesWithStates, eventTags as tags } from "../lib/utils";
import image from "../assets/EVENTIMAGE.avif";
import { Calendar, MapPin, Tag, Type, Info, ChevronRight } from "lucide-react";

function HostEvent() {
  const location = useLocation();
  const navigate = useNavigate();
  const editMode = location.state?.editMode || false;
  const initialEventData = location.state?.eventData || null;

  const [selectedTags, setSelectedTags] = useState(initialEventData?.tag || []);
  const [title, setTitle] = useState(initialEventData?.title || "");
  const [description, setDescription] = useState(initialEventData?.description || "");
  const [category, setCategory] = useState(initialEventData?.category || "networking");
  const [country, setCountry] = useState(initialEventData?.country || "India");
  const [state, setState] = useState(initialEventData?.state || "Andhra Pradesh");
  const [date, setDate] = useState(initialEventData?.date ? new Date(initialEventData.date).toISOString().split('T')[0] : "");
  const [loading, setLoading] = useState(false);

  const handleSelectTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      title,
      description,
      date,
      tag: selectedTags,
      category,
      country,
      state
    };

    try {
      if (editMode && initialEventData?._id) {
        const response = await apiClient.put(`${UPDATE_EVENT_BY_ID}/${initialEventData._id}`, payload, { withCredentials: true });
        if (response.data.success) {
          toast.success("Event updated successfully!");
          navigate("/your-events");
        } else {
          toast.error(response.data.message || "Failed to update event");
        }
      } else {
        const response = await apiClient.post(CREATE_A_EVENT, payload, { withCredentials: true });
        if (response.data.success) {
          toast.success("Event created successfully!");
          navigate("/your-events");
        } else {
          toast.error(response.data.message || "Failed to create event");
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
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                {editMode ? "Edit Event" : "Host an Event"}
              </h1>
              <p className="text-slate-500 font-medium">
                {editMode ? "Update your event details to keep your audience informed." : "Share your knowledge and connect with the community."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                  <Type className="w-4 h-4 text-blue-500" /> Event Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  required
                  placeholder="What is your event called?"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                />
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
                  placeholder="Tell us more about the event..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                    <Calendar className="w-4 h-4 text-blue-500" /> Event Date
                  </label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    min={today}
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                    <Tag className="w-4 h-4 text-blue-500" /> Category
                  </label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="networking">Networking</option>
                    <option value="workshop">Workshop</option>
                    <option value="panel_discussion">Panel Discussion</option>
                    <option value="mentorship">Mentorship Program</option>
                    <option value="conference">Conference</option>
                    <option value="pitch_event">Pitch Event</option>
                    <option value="seminar">Seminar</option>
                    <option value="webinar">Webinar</option>
                    <option value="retreat">Retreat</option>
                    <option value="social_event">Social Event</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                  <Tag className="w-4 h-4 text-blue-500" /> Popular Tags
                </label>
                <div className="flex flex-wrap gap-2 p-1">
                  {tags.map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectTag(tag)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                        selectedTags.includes(tag)
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                          : "bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                  <MapPin className="w-4 h-4 text-blue-500" /> Location
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                  >
                    {Object.keys(countriesWithStates).map((c, i) => (
                      <option value={c} key={i}>{c}</option>
                    ))}
                  </select>
                  <select 
                    value={state} 
                    onChange={(e) => setState(e.target.value)} 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                  >
                    {countriesWithStates[country]?.map((s, i) => (
                      <option value={s} key={i}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 bg-blue-600 text-white rounded-3xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Processing..." : (editMode ? "Update Event Details" : "Publish Event")}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Column: Preview/Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-full max-w-sm"
          >
            <div className="sticky top-32">
              <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4">
                   <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <ChevronRight className="w-6 h-6" />
                   </div>
                </div>
                <div className="mb-6 rounded-3xl overflow-hidden shadow-md">
                  <img src={image} className="w-full h-auto object-cover" alt="Event" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Event Host Preview</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Your event will be showcased to thousands of entrepreneurs. Make sure your title and description are catchy!
                </p>
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-400 text-sm font-bold uppercase tracking-widest">
                    <Sparkles className="w-4 h-4 text-blue-500" /> Pro Tip
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Events with clear agendas and specific tags get 40% more registrations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.143-7.714L1 12l6.857-2.143L11 3z" />
  </svg>
);

export default HostEvent;