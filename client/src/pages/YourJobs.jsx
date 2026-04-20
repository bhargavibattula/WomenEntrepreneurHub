import React, { useEffect, useState } from 'react'
import { 
    AiOutlineDelete, 
    AiOutlinePlus, 
    AiOutlineEdit, 
    AiOutlineClose, 
    AiOutlineBriefcase, 
    AiOutlineSearch,
    AiOutlineDollar,
    AiOutlineEnvironment,
    AiOutlineClockCircle
} from 'react-icons/ai'
import { apiClient } from '../lib/api-clinet'
import { GET_JOBS_BY_USER_ID, DELETE_JOB_BY_ID } from '../utils/constants'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function YourJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const getJobs = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(GET_JOBS_BY_USER_ID, { withCredentials: true });
            
            // Robust data handling
            if (response.data?.success && Array.isArray(response.data.jobs)) {
                setJobs(response.data.jobs);
            } else if (Array.isArray(response.data)) {
                setJobs(response.data);
            } else {
                setJobs([]);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedJobId) return;
        try {
            setActionLoading(true);
            const response = await apiClient.delete(`${DELETE_JOB_BY_ID}/${selectedJobId}`, { withCredentials: true });
            if (response.data.success || response.status === 200) {
                toast.success(response.data.message || "Job deleted successfully");
                setShowDeleteModal(false);
                setSelectedJobId(null);
                getJobs();
            } else {
                toast.error(response.data.message || "Failed to delete job");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setActionLoading(false);
        }
    }

    useEffect(() => {
        getJobs();
    }, [])

    const filteredJobs = (jobs || []).filter(job => 
        job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job?.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='min-h-screen bg-slate-50 p-6 pt-28 pb-20'>
            <div className='max-w-6xl mx-auto'>
                <div className='flex gap-8 flex-col'>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Job Posts</h1>
                            <p className="text-slate-500 font-medium mt-1">Manage and track your active hiring opportunities</p>
                        </div>
                        <Link to={"/job/create"} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex gap-2 items-center font-bold shadow-xl shadow-blue-600/20 transition-all active:scale-95 whitespace-nowrap">
                            <AiOutlinePlus className="text-xl" />
                            Post New Job
                        </Link>
                    </div>

                    <div className='relative w-full max-w-2xl mb-4'>
                        <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            placeholder="Search your job posts..." 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm" 
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : filteredJobs?.length > 0 ? (
                            filteredJobs.map((job, index) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={job._id || index} 
                                    className="group w-full p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                                >
                                    <div className='flex flex-col gap-3 flex-1'>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {job?.category || "General"}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                                                <AiOutlineClockCircle className="w-3 h-3" /> {job?.employmentType || "Full-time"}
                                            </span>
                                        </div>
                                        <h3 className='font-bold text-2xl text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors'>{job?.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-slate-500 font-medium text-sm">
                                            <div className="flex items-center gap-1.5">
                                                <AiOutlineEnvironment className="w-4 h-4 text-slate-400" /> {job?.location || "Remote"}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <AiOutlineDollar className="w-4 h-4 text-slate-400" /> {job?.salary || "Not mentioned"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 w-full md:w-auto">
                                        <Link 
                                            to={`/job/applications/${job._id}`}
                                            className="flex-1 md:flex-none p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                                            title="View Applications"
                                        >
                                            <AiOutlineBriefcase className="text-xl" />
                                            <span className="hidden lg:inline">Applicants</span>
                                        </Link>
                                        <Link 
                                            to="/job/create" 
                                            state={{ editMode: true, jobData: job }}
                                            className="flex-1 md:flex-none p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center"
                                        >
                                            <AiOutlineEdit className="text-2xl" />
                                        </Link>
                                        <button 
                                            onClick={() => { setSelectedJobId(job._id); setShowDeleteModal(true); }}
                                            className="flex-1 md:flex-none p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 hover:text-red-600 transition-all flex items-center justify-center"
                                        >
                                            <AiOutlineDelete className="text-2xl" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <AiOutlineBriefcase className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No job posts found</h3>
                                <p className="text-slate-400 font-medium max-w-xs mx-auto">Start building your team by posting your first job opportunity.</p>
                                <Link to="/job/create" className="inline-block mt-8 text-blue-600 font-bold hover:underline">Create a job post now →</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <button onClick={() => setShowDeleteModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                                    <AiOutlineClose className="text-xl" />
                                </button>
                            </div>

                            <div className="text-center mt-4">
                                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <AiOutlineDelete className="text-4xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Delete Job Post?</h3>
                                <p className="text-slate-500 mb-8">Are you sure you want to delete this job post? Applicants will no longer be able to see it.</p>
                                
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setShowDeleteModal(false)}
                                        className="flex-1 py-4 px-6 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleDelete}
                                        disabled={actionLoading}
                                        className="flex-1 py-4 px-6 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                                    >
                                        {actionLoading ? "Deleting..." : "Confirm Delete"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default YourJobs;