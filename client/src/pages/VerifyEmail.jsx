import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { VERIFY_EMAIL } from "../utils/constants";
import { toast } from "react-toastify";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../lib/api-clinet";
import OTP from "../assets/OTP.jpeg";
import { ShieldCheck, Mail, ArrowRight, Loader2 } from "lucide-react";

function VerifyEmail() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { setUserInfo, userInfo } = useStore();
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if (userInfo && userInfo.isVerified) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otp || otp.length < 4) {
            toast.error("Please enter a valid OTP");
            return;
        }
        
        try {
            setIsLoading(true);
            const response = await apiClient.post(VERIFY_EMAIL, { code: otp }, { withCredentials: true });

            if (!response.data.success) {
                toast.error(response.data.message);
                setIsLoading(false);
                return;
            }
            
            setUserInfo(response.data.user);
            toast.success("Email verified successfully");
            navigate("/auth/profile-setup");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row relative z-10"
            >
                {/* Left Side Visual */}
                <div className="w-full lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center p-12 overflow-hidden text-center min-h-[300px] lg:min-h-[600px]">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-[80px] -top-10 -left-10"></div>
                    
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="relative z-10 w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl mb-8 border border-white/20"
                    >
                        <ShieldCheck className="w-16 h-16 text-white" />
                    </motion.div>
                    
                    <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Secure Your Account</h2>
                    <p className="text-blue-100 text-lg relative z-10 max-w-md">
                        You're just one step away from joining an exclusive network of ambitious women entrepreneurs.
                    </p>
                </div>

                {/* Right Side Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                    <div className="mb-10 text-center lg:text-left">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                            <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Verify your email</h1>
                        <p className="text-slate-500 text-base leading-relaxed">
                            We've sent a one-time verification code to your email. Please enter it below to confirm your identity.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="otp" className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                                Verification Code
                            </label>
                            <input
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                type="text"
                                placeholder="e.g. 123456"
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-300 text-lg tracking-widest font-medium text-slate-900 placeholder:text-slate-400 placeholder:tracking-normal placeholder:font-normal"
                                autoComplete="off"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="group mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Verify Account
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                    
                    <p className="mt-8 text-center text-sm text-slate-500">
                        Didn't receive the code? <button className="text-blue-600 font-bold hover:underline focus:outline-none">Click to resend</button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default VerifyEmail;