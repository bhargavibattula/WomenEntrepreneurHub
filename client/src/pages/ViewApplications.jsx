import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../lib/api-clinet';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    Mail, 
    GraduationCap, 
    Briefcase, 
    Link as LinkIcon, 
    CheckCircle2, 
    XCircle, 
    FileText,
    ArrowLeft,
    Clock,
    ExternalLink
} from 'lucide-react';
import { HOST } from '../utils/constants';

function ViewApplications() {
    const { id } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/api/job/applications/${id}`, { withCredentials: true });
            if (response.data.success) {
                setApplications(response.data.applications);
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (applicationId, status) => {
        try {
            setActionLoading(applicationId);
            const response = await apiClient.put(`/api/job/applications/${applicationId}`, { status }, { withCredentials: true });
            if (response.data.success) {
                toast.success(`Application ${status} successfully`);
                fetchApplications(); // Refresh the list
            } else {
                toast.error(response.data.message || "Failed to update status");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating status");
        } finally {
            setActionLoading(null);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <Link to="/your-jobs" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors mb-4">
                            <ArrowLeft className="w-4 h-4" /> Back to My Jobs
                        </Link>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Job Applications</h1>
                        <p className="text-slate-500 font-medium mt-1">Review and manage candidates for this position</p>
                    </div>
                    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Total Applicants</p>
                            <p className="text-xl font-black text-slate-900">{applications.length}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {applications.length > 0 ? (
                        applications.map((app, index) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={app._id}
                                className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
                            >
                                <div className="flex flex-col lg:flex-row gap-8">
                                    {/* Applicant Identity */}
                                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 lg:w-48 lg:border-r lg:border-slate-50 lg:pr-8">
                                        <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-lg border-4 border-slate-50">
                                            <img 
                                                src={app.applicant?.profileImage ? `${HOST}/${app.applicant.profileImage}` : `https://ui-avatars.com/api/?name=${app.applicant?.name}&background=eff6ff&color=2563eb`} 
                                                alt={app.applicant?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg leading-tight">{app.applicant?.name}</h3>
                                            <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-wider">{app.applicant?.role}</p>
                                        </div>
                                        {app.status !== 'pending' && (
                                            <div className={`mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                app.status === 'accepted' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                                            }`}>
                                                {app.status}
                                            </div>
                                        )}
                                    </div>

                                    {/* Application Content */}
                                    <div className="flex-1 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                                        <GraduationCap className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Education</p>
                                                        <p className="text-slate-700 font-medium text-sm leading-relaxed">{app.education}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                                        <Briefcase className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Experience</p>
                                                        <p className="text-slate-700 font-medium text-sm leading-relaxed">{app.experience}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg bg-slate-50 text-slate-600">
                                                        <Mail className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Contact</p>
                                                        <p className="text-slate-700 font-bold text-sm">{app.applicant?.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg bg-slate-50 text-slate-600">
                                                        <LinkIcon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Portfolios</p>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {app.portfolioLinks?.map((link, i) => (
                                                                <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs font-bold flex items-center gap-1">
                                                                    Link {i+1} <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                                            <a 
                                                href={`${HOST}/${app.resume}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
                                            >
                                                <FileText className="w-4 h-4" /> View Resume
                                            </a>

                                            {app.status === 'pending' ? (
                                                <div className="flex gap-3 w-full sm:w-auto">
                                                    <button 
                                                        disabled={actionLoading === app._id}
                                                        onClick={() => handleUpdateStatus(app._id, 'rejected')}
                                                        className="flex-1 sm:flex-none px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <XCircle className="w-4 h-4" /> Reject
                                                    </button>
                                                    <button 
                                                        disabled={actionLoading === app._id}
                                                        onClick={() => handleUpdateStatus(app._id, 'accepted')}
                                                        className="flex-1 sm:flex-none px-6 py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" /> Accept
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                                                    <Clock className="w-4 h-4" /> Decision made on {new Date(app.updatedAt || Date.now()).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <User className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No applications yet</h3>
                            <p className="text-slate-400 font-medium max-w-xs mx-auto">We'll notify you as soon as someone applies for this position.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewApplications;
