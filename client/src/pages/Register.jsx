import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_ROUTE } from "../utils/constants";
import { toast } from "react-toastify";
import { apiClient } from "../lib/api-clinet";
import { User, Mail, Lock, UserPlus, ArrowRight, ShieldCheck } from "lucide-react";
import image1 from "../assets/register_pro.png";

function Register() {
    const navigate = useNavigate();
    const [registerLoading, setRegisterLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setConformPassword] = useState("");

    const validateForm = () => {
        if (!name || name.length < 2) {
            toast.error("Name is too short");
            return false;
        }
        if (!email || !email.includes("@")) {
            toast.error("Invalid email address");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        if (password !== conformPassword) {
            toast.error("Passwords do not match");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setRegisterLoading(true);
            const response = await apiClient.post(REGISTER_ROUTE, { name, email, password }, { withCredentials: true });
            if (!response.data.success) {
                toast.error(response.data.message || "Registration failed");
                setRegisterLoading(false);
                return;
            }
            toast.success("Account created successfully!");
            navigate("/auth/profile-setup");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setRegisterLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-32 pb-20">
            <div className="max-w-5xl w-full bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col md:flex-row-reverse border border-slate-100">
                
                {/* Left Side: Form */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 p-8 md:p-16"
                >
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Create Account</h1>
                        <p className="text-slate-500 font-medium">Join our global network of female founders</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Jane Doe"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="jane@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        value={conformPassword}
                                        onChange={(e) => setConformPassword(e.target.value)}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={registerLoading}
                                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                {registerLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Create Account <UserPlus className="w-5 h-5" /></>}
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-500 text-sm">
                            Already have an account?{" "}
                            <Link to="/auth/login" className="text-blue-600 font-bold hover:underline">
                                Log in instead
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Right Side: Image/Branding */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 bg-blue-600 relative hidden lg:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-transparent z-10"></div>
                    <img
                        src={image1}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
                        alt="Join WEN"
                    />
                    <div className="absolute inset-0 p-16 flex flex-col justify-center z-20">
                        <div className="w-12 h-1 w-12 bg-white mb-6 rounded-full"></div>
                        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Your Journey Starts Here.</h2>
                        <p className="text-blue-50 leading-relaxed text-lg">
                            Gain access to resources, mentorship, and a community that believes in your potential.
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(n => (
                                    <img key={n} src={`https://i.pravatar.cc/100?img=${n+20}`} className="w-10 h-10 rounded-full border-2 border-blue-600" alt="user" />
                                ))}
                            </div>
                            <span className="text-blue-50 text-sm font-medium">Join 2,000+ members</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Register;
