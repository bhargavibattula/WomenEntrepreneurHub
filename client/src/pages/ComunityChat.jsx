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
    Paperclip,
    X
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
        <div className="min-h-screen bg-slate-50 pt-20 md:pt-28 pb-4 md:pb-6 px-2 md:px-8">
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-120px)] md:h-[calc(100vh-150px)] flex flex-col lg:flex-row gap-4 md:gap-6">
                
                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden relative">
                    
                    {/* Chat Header */}
                    <div className="p-4 md:p-6 border-b border-slate-50 bg-white/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight leading-none">Community Hub</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Public Channel</span>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 scrollbar-hide">
                        <AnimatePresence initial={false}>
                            {selectedChatMessages.map((msg, index) => {
                                const isSelf = msg.sender?._id === userInfo?._id;
                                return (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        key={msg._id || index} 
                                        className={`flex w-full ${isSelf ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex gap-2 md:gap-3 max-w-[85%] md:max-w-[70%] ${isSelf ? "flex-row-reverse" : "flex-row"}`}>
                                            {/* Avatar */}
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl overflow-hidden border border-slate-100 shadow-sm flex-shrink-0 mt-1">
                                                <img 
                                                    src={msg.sender?.profileImage ? `${HOST}/${msg.sender.profileImage}` : `https://ui-avatars.com/api/?name=${msg.sender?.name || 'User'}&background=eff6ff&color=2563eb`} 
                                                    className="w-full h-full object-cover" 
                                                    alt="" 
                                                />
                                            </div>

                                            <div className={`flex flex-col gap-1 ${isSelf ? "items-end" : "items-start"}`}>
                                                {!isSelf && (
                                                    <div className="flex items-center gap-2 ml-1">
                                                        <span className="text-[9px] font-black text-slate-900 uppercase tracking-wider">{msg.sender?.name}</span>
                                                        <span className="text-[7px] font-bold text-blue-600 bg-blue-50 px-1 py-0.5 rounded uppercase tracking-widest">{msg.sender?.role}</span>
                                                    </div>
                                                )}
                                                
                                                <div className={`relative px-4 py-3 md:px-5 md:py-4 rounded-2xl md:rounded-3xl shadow-sm ${
                                                    isSelf 
                                                    ? "bg-blue-600 text-white rounded-tr-none shadow-blue-600/10" 
                                                    : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                                                }`}>
                                                    <p className="text-sm md:text-base font-medium leading-relaxed break-words">{msg.message}</p>
                                                    <div className={`mt-1.5 text-[8px] md:text-[10px] font-bold opacity-60 flex ${isSelf ? "justify-end" : "justify-start"}`}>
                                                        {format(new Date(msg.timestamp || Date.now()), "HH:mm")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                        <div ref={scrollRef}></div>
                    </div>

                    {/* Message Input */}
                    <div className="p-3 md:p-6 bg-white border-t border-slate-50">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2 md:gap-4 bg-slate-50 p-1.5 md:p-2 pl-4 md:pl-6 rounded-full md:rounded-[2rem] border border-slate-100 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                            <input 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                type="text" 
                                placeholder="Write a message..."  
                                className="flex-1 bg-transparent border-none outline-none text-slate-700 text-sm md:text-base font-medium placeholder:text-slate-400 py-2 md:py-3"
                            />
                            <div className="flex items-center gap-1">
                                <button type="button" className="p-2 text-slate-400 hover:text-blue-600 transition-colors hidden sm:block">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button type="submit" className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full md:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">
                                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Sidebar - Community Info (Hidden on mobile/tablet) */}
                <div className="hidden lg:flex w-72 flex-col gap-6 shrink-0">
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col items-center text-center">
                        <img src={image} alt="logo" className="w-32 h-32 object-contain mb-4 drop-shadow-xl" />
                        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">Welcome!</h2>
                        <p className="text-slate-500 font-medium text-[10px] leading-relaxed mb-4 uppercase tracking-wider">
                            Empowering Women Entrepreneurs
                        </p>
                        <div className="w-full h-px bg-slate-100 mb-6"></div>
                        <div className="space-y-4 w-full">
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-900 uppercase">Be Inspiring</p>
                                    <p className="text-[9px] text-slate-400 font-medium">Share your wins</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-900 uppercase">Be Respectful</p>
                                    <p className="text-[9px] text-slate-400 font-medium">Support each other</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group flex-1">
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                                <Info className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Community Stats</h3>
                            <p className="text-slate-400 text-xs font-medium mb-auto">Join thousands of women already scaling their businesses.</p>
                            <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500">Members</span>
                                    <span className="text-sm font-bold">12,402</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500">Online</span>
                                    <span className="text-sm font-bold text-green-400">842</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ComunityChat;