import React, { useState } from 'react';
import { useStore } from '../store';
import { HOST, SETUP_PROFILE } from '../utils/constants';
import { Edit2, X, Camera, Trash2, MapPin, Briefcase, User, Phone, Globe, Hash, Bell, Loader2, Save } from 'lucide-react';
import { apiClient } from '../lib/api-clinet.js';
import { countriesWithStates } from '../lib/utils';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

function ProfileViewAndEdit() {
    const { userInfo, setUserInfo } = useStore();
    
    // Form States
    const [profileImage, setProfileImage] = useState(null);
    const [country, setCountry] = useState(userInfo?.country || "India");
    const [state, setState] = useState(userInfo?.state || "Andhra pradesh");
    const [bio, setBio] = useState(userInfo?.bio || "");
    const [phone, setPhone] = useState(userInfo?.phone || "");
    const [notifications, setNotifications] = useState(userInfo?.notifications || false);
    const [role, setRole] = useState(userInfo?.role || "visitor");
    const [facebook, setFacebook] = useState(userInfo?.facebook || "");
    const [instagram, setInstagram] = useState(userInfo?.instagram || "");
    const [twitter, setTwitter] = useState(userInfo?.twitter || "");
    const [category, setCategory] = useState(userInfo?.category || "technology");
    
    const [loading, setLoading] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = { profileImage, role, bio, phone, country, state, facebook, instagram, twitter, notifications, category };
        const formData = new FormData();
        Object.keys(obj).forEach((key) => {
            if (obj[key] !== undefined && obj[key] !== null) {
                formData.append(key, obj[key]);
            }
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
            setUserInfo(response.data.user);
            setShowEditForm(false);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative"
            >
                {/* Header Banner */}
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-[60px] -right-10 -top-10"></div>
                </div>

                <div className="px-8 pb-10">
                    {/* Profile Info Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between -mt-20 mb-8 gap-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
                            <div className="relative">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white ring-4 ring-blue-50">
                                    <img 
                                        src={profileImage ? URL.createObjectURL(profileImage) : (userInfo?.profileImage ? `${HOST}/${userInfo.profileImage}` : `https://ui-avatars.com/api/?name=${userInfo?.name}&background=eff6ff&color=2563eb`)} 
                                        className="w-full h-full object-cover" 
                                        alt="profile" 
                                    />
                                </div>
                            </div>
                            <div className="pb-2">
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{userInfo?.name || "User Name"}</h1>
                                <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm mt-1">{userInfo?.role || "Member"}</p>
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowEditForm(!showEditForm)} 
                            className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all shadow-lg shadow-slate-900/20"
                        >
                            {showEditForm ? <><X className="w-4 h-4"/> Cancel</> : <><Edit2 className="w-4 h-4"/> Edit Profile</>}
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {!showEditForm ? (
                            <motion.div 
                                key="view"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Hash className="w-4 h-4"/> About</h3>
                                        <p className="text-slate-700 leading-relaxed">{userInfo?.bio || "No bio provided."}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-700">
                                        <MapPin className="w-5 h-5 text-blue-500"/>
                                        <span className="font-medium">{userInfo?.state ? `${userInfo.state}, ${userInfo.country}` : "Location not set"}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-700">
                                        <Briefcase className="w-5 h-5 text-blue-500"/>
                                        <span className="font-medium capitalize">{userInfo?.category || "Category not set"}</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-6 md:border-l md:border-slate-100 md:pl-8">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Phone className="w-4 h-4"/> Contact</h3>
                                        <p className="font-medium text-slate-700">{userInfo?.phone || "No phone number"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Globe className="w-4 h-4"/> Social Links</h3>
                                        <div className="flex flex-col gap-3">
                                            {userInfo?.facebook ? <a href={userInfo.facebook} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">Facebook</a> : <span className="text-slate-400">No Facebook added</span>}
                                            {userInfo?.twitter ? <a href={userInfo.twitter} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-medium">Twitter</a> : <span className="text-slate-400">No Twitter added</span>}
                                            {userInfo?.instagram ? <a href={userInfo.instagram} target="_blank" rel="noreferrer" className="text-pink-600 hover:underline font-medium">Instagram</a> : <span className="text-slate-400">No Instagram added</span>}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.form 
                                key="edit"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                onSubmit={handleSubmit} 
                                className="pt-6 border-t border-slate-100 flex flex-col gap-8"
                            >
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <Camera className="w-4 h-4 text-blue-500" /> Update Avatar
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <label className="px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold cursor-pointer hover:bg-blue-100 transition-colors border border-blue-200">
                                            Choose File
                                            <input onChange={handleFileChange} type="file" className="hidden" accept="image/*" />
                                        </label>
                                        {profileImage && (
                                            <button type="button" onClick={() => setProfileImage(null)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                                <Trash2 className="w-5 h-5"/>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <User className="w-4 h-4 text-blue-500" /> Role
                                        </label>
                                        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300">
                                            <option value="visitor">Visitor</option>
                                            <option value="entrepreneur">Entrepreneur</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-blue-500" /> Category
                                        </label>
                                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 capitalize">
                                            {["technology", "health", "sports", "arts", "music", "travel"].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Hash className="w-4 h-4 text-blue-500" /> Bio
                                        </label>
                                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write something about yourself..." className="w-full px-4 py-3 h-32 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 resize-none"></textarea>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-blue-500" /> Phone
                                        </label>
                                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300" />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-blue-500" /> Location
                                        </label>
                                        <div className="flex gap-4">
                                            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300">
                                                {Object.keys(countriesWithStates).map(c => <option value={c} key={c}>{c}</option>)}
                                            </select>
                                            <select value={state} onChange={(e) => setState(e.target.value)} className="w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300">
                                                {countriesWithStates[country]?.map(s => <option value={s} key={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 md:col-span-2 pt-4 border-t border-slate-100">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-blue-500" /> Social Links
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <input value={facebook} onChange={(e) => setFacebook(e.target.value)} type="url" placeholder="Facebook URL" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300" />
                                            <input value={instagram} onChange={(e) => setInstagram(e.target.value)} type="url" placeholder="Instagram URL" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300" />
                                            <input value={twitter} onChange={(e) => setTwitter(e.target.value)} type="url" placeholder="Twitter URL" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300" />
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <Bell className="w-5 h-5 text-blue-500" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-700">Email Notifications</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input checked={notifications} onChange={() => setNotifications(!notifications)} type="checkbox" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 flex justify-end">
                                    <button type="submit" disabled={loading} className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                        Save Changes
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

export default ProfileViewAndEdit;