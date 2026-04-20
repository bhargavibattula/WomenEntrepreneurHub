import React from "react";
import { 
    User, 
    Briefcase, 
    Calendar, 
    BookOpen, 
    FileText, 
    Settings, 
    LogOut, 
    X,
    ChevronRight
} from "lucide-react";
import { HOST, LOGOUT_ROUTE } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../lib/api-clinet";
import { useStore } from "../store";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";

function ProfileSideNav({ openProfileSideNav, setOpenProfileSideNav }) {
    const { userInfo, setUserInfo } = useStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
            
            if (response.data.success) {
                toast.success(response.data.message || "Logged out successfully");
                setUserInfo(null);
                setOpenProfileSideNav(false);
                navigate("/");
            } else {
                toast.error(response.data.message || "Logout failed");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const navLinks = [
        { name: "Your Profile", path: "/profile", icon: User },
        ...((userInfo?.role === "admin" || userInfo?.role === "entrepreneur") ? [
            { name: "Your Businesses", path: "/your-businesses", icon: Briefcase },
            { name: "Your Events", path: "/your-events", icon: Calendar },
            { name: "Your Resources", path: "/your-resources", icon: BookOpen },
            { name: "Your Job Posts", path: "/your-jobs", icon: FileText },
        ] : []),
        { name: "Settings", path: "/settings", icon: Settings },
    ];

    return (
        <AnimatePresence>
            {openProfileSideNav && (
                <>
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenProfileSideNav(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150]"
                    />

                    {/* Sidebar Container */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-screen w-full max-w-[320px] bg-white z-[200] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</span>
                                <button 
                                    onClick={() => setOpenProfileSideNav(false)}
                                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg ring-4 ring-blue-50">
                                        <img 
                                            src={userInfo?.profileImage ? `${HOST}/${userInfo.profileImage}` : `https://ui-avatars.com/api/?name=${userInfo?.name}&background=eff6ff&color=2563eb`} 
                                            className="w-full h-full object-cover" 
                                            alt="Avatar" 
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{userInfo?.name}</h3>
                                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-1">{userInfo?.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setOpenProfileSideNav(false)}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 group transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-blue-600 shadow-sm transition-colors">
                                            <link.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-slate-700 group-hover:text-blue-700">{link.name}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-100">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold hover:bg-rose-100 transition-all duration-200 border border-rose-100"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                            <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest font-medium">
                                FEMPOWER &bull; v1.0.0
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default ProfileSideNav;