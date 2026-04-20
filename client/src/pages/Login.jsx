import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import womenbg from "../assets/wen_logo.png";
import { toast } from "react-toastify";
import { useState } from "react";
import { apiClient } from "../lib/api-clinet";
import { LOGIN_ROUTE } from "../utils/constants";
import { useStore } from "../store/index.js";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUserInfo } = useStore();
    const [loginLoading, setLoginLoading] = useState(false);

    const validateForm = () => {
        if (!email || !email.includes("@")) {
            toast.error("Invalid email address");
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoginLoading(true);
            const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });

            if (!response.data.success) {
                toast.error(response.data.message || "Invalid credentials");
                setLoginLoading(false);
                return;
            }
            
            toast.success("Welcome back!");
            if (response.data.user?.isProfileSetup === false || response.data.user?.isProfileSetup === undefined) {
                navigate("/auth/profile-setup");
            } else {
                setUserInfo(response.data.user);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-32 pb-20">
            <div className="max-w-5xl w-full bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col md:flex-row border border-slate-100">
                
                {/* Left Side: Form */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 p-8 md:p-16"
                >
                    <div className="mb-10">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-500 font-medium">Log in to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <Link to="/" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loginLoading}
                            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loginLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Login <LogIn className="w-5 h-5" /></>}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-500 text-sm">
                            Don't have an account?{" "}
                            <Link to="/auth/register" className="text-blue-600 font-bold hover:underline">
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Right Side: Image/Branding */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 bg-slate-900 relative hidden lg:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent z-10"></div>
                    <img
                        src={womenbg}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        alt="Women Empowerment"
                    />
                    <div className="absolute inset-0 p-16 flex flex-col justify-end z-20">
                        <div className="w-12 h-1 w-12 bg-blue-500 mb-6 rounded-full"></div>
                        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Empowering Women, <br />Building Futures.</h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Join a global community of visionary entrepreneurs and industry leaders.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Login;
