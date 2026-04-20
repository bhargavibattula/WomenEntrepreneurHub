import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { apiClient } from '../lib/api-clinet';
import { HOST } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, 
    MapPin, 
    DollarSign, 
    Clock, 
    Calendar, 
    User, 
    Mail, 
    Phone,
    FileText,
    Send,
    ArrowLeft,
    CheckCircle2,
    PlusCircle
} from 'lucide-react';
import { useStore } from '../store';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useStore();
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [job, setJob] = useState(null);
    const [showApplyModal, setShowApplyModal] = useState(false);

    const [formData, setFormData] = useState({
        education: '',
        experience: '',
        portfolioLinks: '',
    });
    const [resumeFile, setResumeFile] = useState(null);

    const getJob = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/api/job/get-job/${id}`, { withCredentials: true });
            setJob(response.data.job);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load job details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJob();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            toast.info("Please login to apply for this job.");
            navigate("/auth/login");
            return;
        }

        if (!resumeFile) {
            toast.error("Please upload your resume.");
            return;
        }

        try {
            setSubmitLoading(true);
            const data = new FormData();
            data.append('resume', resumeFile);
            data.append('education', formData.education);
            data.append('experience', formData.experience);
            data.append('portfolioLinks', JSON.stringify(formData.portfolioLinks.split(',').map(l => l.trim())));

            const response = await apiClient.post(`/api/job/${id}/apply`, data, { 
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                toast.success("Application submitted successfully!");
                setShowApplyModal(false);
            } else {
                toast.error(response.data.message || "Failed to submit application.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error submitting application.");
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Job not found</h2>
                <Link to="/job" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to job listings
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-20 md:pt-28 pb-20 p-4 md:p-6">
            <div className="max-w-5xl mx-auto">
                <Link to="/job" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors mb-8">
                    <ArrowLeft className="w-5 h-5" /> Back to Jobs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider">
                                    {job.category}
                                </span>
                                <span className="flex items-center gap-1.5 text-sm font-bold text-slate-400">
                                    <Clock className="w-4 h-4" /> {job.employmentType}
                                </span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                                {job.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-slate-500 font-medium mb-10 pb-10 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-slate-400" /> {job.location || job.city || "Remote"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-slate-400" /> {job.salary}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-slate-400" /> Posted on {new Date(job.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">Job Description</h3>
                                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                                    {job.description}
                                </p>
                            </div>

                            <button 
                                onClick={() => setShowApplyModal(true)}
                                className="mt-12 w-full md:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                Apply for this position <Send className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar: Employer Info */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 sticky top-32">
                            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-600" /> About the Founder
                            </h3>

                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-lg mb-4">
                                    <img 
                                        src={job.employer?.profileImage ? `${HOST}/${job.employer.profileImage}` : `https://ui-avatars.com/api/?name=${job.employer?.name}&background=eff6ff&color=2563eb`} 
                                        alt={job.employer?.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">{job.employer?.name}</h4>
                                <p className="text-slate-500 font-medium">Verified Entrepreneur</p>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Email</p>
                                        <p className="font-bold text-sm truncate">{job.employer?.email}</p>
                                    </div>
                                </div>

                                {job.employer?.contactInfo?.phone && (
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Phone</p>
                                            <p className="font-bold text-sm">{job.employer.contactInfo.phone}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link 
                                to={`/business/all-business?founder=${job.employer?._id}`}
                                className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all text-center block text-sm"
                            >
                                View Other Openings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {showApplyModal && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowApplyModal(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-[3rem] p-8 md:p-12 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <button 
                                onClick={() => setShowApplyModal(false)}
                                className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                            >
                                <AiOutlineClose className="text-2xl" />
                            </button>

                            <div className="mb-10">
                                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Apply for Position</h2>
                                <p className="text-slate-500 font-medium">Position: <span className="text-blue-600 font-bold">{job.title}</span></p>
                            </div>

                            <form onSubmit={handleApply} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Resume / CV (PDF)</label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl group-hover:bg-blue-100/50 transition-colors pointer-events-none flex flex-col items-center justify-center gap-2">
                                            {resumeFile ? (
                                                <>
                                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                                    <span className="text-green-600 font-bold text-sm">{resumeFile.name}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <PlusCircle className="w-8 h-8 text-blue-400" />
                                                    <span className="text-blue-600 font-bold text-sm">Upload PDF Resume</span>
                                                </>
                                            )}
                                        </div>
                                        <input 
                                            type="file" 
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="w-full h-32 opacity-0 cursor-pointer relative z-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Education Background</label>
                                    <textarea 
                                        name="education"
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        placeholder="Highest degree, University, Year..."
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium h-32 resize-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work Experience</label>
                                    <textarea 
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        placeholder="Previous roles, companies, and key achievements..."
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium h-32 resize-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Portfolio Links (Optional)</label>
                                    <input 
                                        type="text"
                                        name="portfolioLinks"
                                        value={formData.portfolioLinks}
                                        onChange={handleInputChange}
                                        placeholder="Link 1, Link 2 (comma separated)"
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={submitLoading}
                                    className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {submitLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Submit Application <Send className="w-5 h-5" /></>}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobDetail;
