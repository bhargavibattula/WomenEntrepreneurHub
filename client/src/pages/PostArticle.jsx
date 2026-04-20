import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../lib/api-clinet";
import { toast } from "react-toastify";
import { PenTool, Tag, Layers, ArrowRight, X, ChevronRight, FileText, Sparkles, BookOpen } from 'lucide-react';
import womenbg from "../assets/ARTICLE.jpg";

const tags = [
    "Entrepreneurship", "Leadership", "Business Strategy", "Startups", "Funding",
    "Networking", "Marketing", "Women in Tech", "Personal Branding", "Work-Life Balance",
    "Mentorship", "Investment", "Finance", "Innovation", "Social Impact",
    "Diversity and Inclusion", "Sustainability", "Scaling Business", "Legal Advice"
];

const categories = [
    { id: "success-stories", name: "Success Stories" },
    { id: "leadership-development", name: "Leadership Development" },
    { id: "business-funding", name: "Business Funding" },
    { id: "marketing-strategies", name: "Marketing Strategies" },
    { id: "networking-tips", name: "Networking Tips" },
    { id: "work-life-balance", name: "Work-Life Balance" },
    { id: "mentorship", name: "Mentorship" },
    { id: "personal-branding", name: "Personal Branding" },
    { id: "tech-innovation", name: "Tech Innovation" },
    { id: "scaling-business", name: "Scaling Your Business" }
];

function PostArticle() {
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState([]);
    const [showSection, setShowSection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    const handleSelectTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            toast.error("Article content cannot be empty!");
            return;
        }
        
        try {
            setLoading(true);
            const response = await apiClient.post("api/resource/create-resource", {
                title,
                content,
                tags: selectedTags,
                category
            }, { withCredentials: true });

            if (response.data.success) {
                toast.success("Successfully posted article!");
                navigate("/resource/articles");
            } else {
                toast.error(response.data.message || "Failed to post article");
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
                    
                    {/* Left Column: Form Part 1 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 p-8 md:p-12"
                    >
                        <div className="mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                                <PenTool className="w-3 h-3" /> Resource Creator
                            </div>
                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                                Share Your <span className="text-blue-600">Knowledge</span>
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Empower other women entrepreneurs by sharing your experiences, guides, and stories.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                    <FileText className="w-4 h-4 text-blue-500" /> Article Title
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    required
                                    placeholder="e.g. 5 Strategies for Scaling Your Startup"
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                    <Layers className="w-4 h-4 text-blue-500" /> Category
                                </label>
                                <select 
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer" 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                    <Tag className="w-4 h-4 text-blue-500" /> Industry Tags
                                </label>
                                <div className="flex flex-wrap gap-2 p-1 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                    {tags.map((tag, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleSelectTag(tag)}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                                selectedTags.includes(tag)
                                                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20"
                                                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-400"
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6">
                                <button 
                                    onClick={() => {
                                        if(!title || !category) {
                                            toast.error("Please fill in title and category first!");
                                            return;
                                        }
                                        setShowSection(true);
                                    }}
                                    className="w-full py-5 bg-slate-900 text-white rounded-3xl font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                >
                                    Write Content <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual Preview */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:block w-full max-w-sm"
                    >
                        <div className="sticky top-32">
                            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
                                <div className="mb-6 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                                    <img src={womenbg} className="w-full h-auto object-cover" alt="Article Visual" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                                        <Sparkles className="w-4 h-4" /> Why Write?
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight">Build your personal brand & influence</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        Articles on WEN are read by thousands of aspiring entrepreneurs and mentors. It's the perfect way to establish yourself as a thought leader.
                                    </p>
                                    <div className="flex items-center gap-4 pt-4">
                                        <div className="flex -space-x-2">
                                            {[1,2,3].map(n => (
                                                <div key={n} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?img=${n+10}`} alt="User" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-slate-400">Join 500+ authors</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Editor Modal */}
            <AnimatePresence>
                {showSection && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSection(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-5xl h-[90vh] md:h-[80vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
                        >
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">Write Your Story</h3>
                                        <p className="text-xs text-slate-500 font-medium">{title || "Untitled Article"}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowSection(false)}
                                    className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-8">
                                <textarea 
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Share your wisdom here... (Markdown supported)" 
                                    className="flex-1 w-full p-6 text-lg text-slate-700 placeholder-slate-300 bg-white focus:outline-none resize-none leading-relaxed"
                                    required
                                />
                                
                                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <p className="text-sm text-slate-400 font-medium">
                                        {content.split(/\s+/).filter(w => w.length > 0).length} words
                                    </p>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {loading ? "Publishing..." : "Publish Article"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default PostArticle;