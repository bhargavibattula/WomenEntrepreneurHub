import { useEffect, useRef, useState } from "react";
import image from "../assets/COMMUNIT-removebg-preview.png";
import { useStore } from "../store";
import { 
    Send, 
    Users, 
    MessageSquare, 
    Sparkles, 
    Info, 
    ShieldCheck, 
    ArrowRight,
    Smile,
    Image as ImageIcon,
    Paperclip
} from "lucide-react";
import { useSocket } from "../context/SocketContext";
import { GET_ALL_COMMUNITY_MESSAGES, HOST } from "../utils/constants";
import { format } from "date-fns";
import { apiClient } from "../lib/api-clinet.js";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

function ComunityChat() {
    const [message, setMessage] = useState("");
    const { selectedChatMessages, setSelectedChatMessages, selectedChatType, userInfo, setSelectedChatType } = useStore();
    const scrollRef = useRef();
    const socket = useSocket();

    useEffect(() => {
        setSelectedChatType("community");
        getAllCommunityMesages();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedChatMessages]);

    const getAllCommunityMesages = async () => {
        try {
            const response = await apiClient.get(GET_ALL_COMMUNITY_MESSAGES, { withCredentials: true });
            setSelectedChatMessages(response.data.messages);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!socket) {
            toast.error("Connecting to community...");
            return;
        }

        if (selectedChatType === "community" && message.trim()) {
            socket.emit("send-message", {
                sender: userInfo?._id,
                message: message.trim(),
                isCommunity: true
            });
            setMessage("");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-10 px-4 md:px-10">
            <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex gap-6">
                
                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden relative">
                    
                    {/* Chat Header */}
                    <div className="p-6 border-b border-slate-50 bg-white/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-slate-900 tracking-tight">Community Hub</h1>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Community</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Share & Support</span>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-hide">
                        <AnimatePresence>
                            {selectedChatMessages.map((msg, index) => {
                                const isSelf = msg.sender?._id === userInfo?._id;
                                return (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        key={msg._id || index} 
                                        className={`flex w-full ${isSelf ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex gap-3 max-w-[80%] md:max-w-[70%] ${isSelf ? "flex-row-reverse" : "flex-row"}`}>
                                            {/* Avatar */}
                                            {!isSelf && (
                                                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-md flex-shrink-0 mt-1">
                                                    <img 
                                                        src={msg.sender?.profileImage ? `${HOST}/${msg.sender.profileImage}` : `https://ui-avatars.com/api/?name=${msg.sender?.name}&background=eff6ff&color=2563eb`} 
                                                        className="w-full h-full object-cover" 
                                                        alt="" 
                                                    />
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-1">
                                                {!isSelf && (
                                                    <div className="flex items-center gap-2 ml-1">
                                                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">{msg.sender?.name}</span>
                                                        <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-widest">{msg.sender?.role}</span>
                                                    </div>
                                                )}
                                                
                                                <div className={`relative px-5 py-4 rounded-3xl shadow-sm ${
                                                    isSelf 
                                                    ? "bg-blue-600 text-white rounded-tr-none shadow-blue-600/10" 
                                                    : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                                                }`}>
                                                    <p className="text-base font-medium leading-relaxed">{msg.message}</p>
                                                    <div className={`mt-2 text-[10px] font-bold opacity-60 flex ${isSelf ? "justify-end" : "justify-start"}`}>
                                                        {format(new Date(msg.timestamp || Date.now()), "HH:mm")}
                                                    </div>
                                                </div>
                                            </div>

                                            {isSelf && (
                                                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-md flex-shrink-0 mt-1">
                                                    <img 
                                                        src={userInfo?.profileImage ? `${HOST}/${userInfo.profileImage}` : `https://ui-avatars.com/api/?name=${userInfo?.name}&background=eff6ff&color=2563eb`} 
                                                        className="w-full h-full object-cover" 
                                                        alt="" 
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                        <div ref={scrollRef}></div>
                    </div>

                    {/* Message Input */}
                    <div className="p-6 bg-white border-t border-slate-50">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-4 bg-slate-50 p-2 pl-6 rounded-[2rem] border border-slate-100 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                            <input 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                type="text" 
                                placeholder="Share your thoughts with the community..."  
                                className="flex-1 bg-transparent border-none outline-none text-slate-700 font-medium placeholder:text-slate-400 py-3"
                            />
                            <div className="flex items-center gap-1 pr-1">
                                <button type="button" className="p-3 text-slate-400 hover:text-blue-600 transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button type="submit" className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Sidebar - Community Info */}
                <div className="hidden lg:flex w-80 flex-col gap-6">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col items-center text-center">
                        <img src={image} alt="logo" className="w-40 h-40 object-contain mb-6 drop-shadow-2xl" />
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Welcome!</h2>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                            This is your safe space to share knowledge, ask for help, and grow together with fellow entrepreneurs.
                        </p>
                        <div className="w-full h-px bg-slate-100 mb-6"></div>
                        <div className="space-y-4 w-full">
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900 uppercase">Be Inspiring</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Share your wins & success</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900 uppercase">Be Respectful</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Maintain community decorum</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group">
                        <div className="relative z-10">
                            <Info className="w-8 h-8 opacity-50 mb-4" />
                            <h3 className="text-lg font-bold mb-2">Need private help?</h3>
                            <p className="text-blue-100 text-xs font-medium leading-relaxed mb-6">Connect with our dedicated mentors for 1-on-1 sessions.</p>
                            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                Find Mentors <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ComunityChat;