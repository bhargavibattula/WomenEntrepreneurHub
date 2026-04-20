import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Camera, Trash2, MapPin, Briefcase, User, Phone, Globe, Hash, Bell, Loader2, ArrowRight } from 'lucide-react';
import { countriesWithStates } from '../lib/utils';
import { apiClient } from '../lib/api-clinet';
import { SETUP_PROFILE } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cn } from '../utils/cn';

function ProfileSetup() {
    const [profileImage, setProfileImage] = useState(null);
    const [country, setCountry] = useState("India");
    const [state, setState] = useState("Andhra pradesh");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [notifications, setNotifications] = useState(false);
    const [role, setRole] = useState("visitor");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [category, setCategory] = useState("technology");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = { profileImage, role, bio, phone, country, state, facebook, instagram, twitter, notifications, category };
        const formData = new FormData();
        Object.keys(obj).forEach((key) => {
            formData.append(key, obj[key]);
        });

        try {
            setLoading(true);
            const response = await apiClient.post(SETUP_PROFILE, formData, { withCredentials: true });
            if (!response.data.success) {
                toast.error(response.data.message);
                setLoading(false);
                return;
            }
            toast.success("Profile updated successfully");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex justify-center pt-28">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative z-10 overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-[60px] -right-10 -top-10"></div>
                    <h1 className="text-3xl font-extrabold tracking-tight relative z-10 mb-2">Complete Your Profile</h1>
                    <p className="text-blue-100 text-lg relative z-10">Set up your identity to fully experience the FEMPOWER network.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 py-10 flex flex-col gap-10">
                    
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center">
                        <div className="relative group">
                            {profileImage ? (
                                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white ring-2 ring-blue-100">
                                    <img className="w-full h-full object-cover" src={URL.createObjectURL(profileImage)} alt="avatar" />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button type="button" onClick={() => setProfileImage(null)} className="text-white bg-red-500/80 p-2 rounded-full hover:bg-red-500 transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="w-32 h-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 text-slate-400 transition-all shadow-sm">
                                    <Camera className="w-8 h-8 mb-2" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-center">Upload<br/>Photo</span>
                                    <input onChange={handleFileChange} type="file" className="hidden" accept="image/*" />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Role */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-500" /> Who are you? <span className="text-red-500">*</span>
                            </label>
                            <select required value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 text-slate-700 font-medium">
                                <option value="visitor">Visitor</option>
                                <option value="entrepreneur">Entrepreneur</option>
                            </select>
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-blue-500" /> Industry Category <span className="text-red-500">*</span>
                            </label>
                            <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 text-slate-700 font-medium capitalize">
                                {["technology", "health", "sports", "arts", "music", "travel"].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-500" /> Contact Number <span className="text-red-500">*</span>
                            </label>
                            <input required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+1 (234) 567-8900" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 text-slate-700 font-medium" />
                        </div>

                        {/* Notifications */}
                        <div className="flex flex-col gap-2 justify-center pt-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Bell className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">Email Notifications</p>
                                        <p className="text-xs text-slate-500">Get updates and alerts</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input checked={notifications} onChange={() => setNotifications(!notifications)} type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-500" /> Location <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <select required value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 text-slate-700 font-medium">
                                    {Object.keys(countriesWithStates).map((c, i) => (
                                        <option value={c} key={i}>{c}</option>
                                    ))}
                                </select>
                                <select required value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 text-slate-700 font-medium">
                                    {countriesWithStates[country]?.map((s, i) => (
                                        <option value={s} key={i}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <Hash className="w-4 h-4 text-blue-500" /> Bio <span className="text-red-500">*</span>
                            </label>
                            <textarea required value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell the community about yourself, your business, and your goals..." className="w-full px-4 py-3 h-32 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 text-slate-700 font-medium resize-none"></textarea>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-col gap-4 md:col-span-2 pt-4 border-t border-slate-100">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <Globe className="w-4 h-4 text-blue-500" /> Social Links <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                <input required value={facebook} onChange={(e) => setFacebook(e.target.value)} type="url" placeholder="Facebook URL" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 text-slate-700 text-sm font-medium" />
                                <input required value={instagram} onChange={(e) => setInstagram(e.target.value)} type="url" placeholder="Instagram URL" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 text-slate-700 text-sm font-medium" />
                                <input required value={twitter} onChange={(e) => setTwitter(e.target.value)} type="url" placeholder="Twitter URL" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 text-slate-700 text-sm font-medium" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <button type="submit" disabled={loading} className="group w-full md:w-auto md:float-right flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Complete Setup
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    );
}

export default ProfileSetup;