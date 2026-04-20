import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlinePlus, AiOutlineEdit, AiOutlineClose, AiOutlineCalendar, AiOutlineExternalLink } from 'react-icons/ai'
import { apiClient } from '../lib/api-clinet'
import { DELETE_EVENT_BY_ID, GET_EVENTS_BY_USERID, GET_EVENTS_BY_USERID_COMPLETED } from '../utils/constants'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from "framer-motion"
import { Link } from 'react-router-dom'

function YourEvent() {
    const [events, setEvents] = useState([])
    const [completedEvents, setCompletedEvents] = useState([])
    const [section, setSection] = useState(0)
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedEventId, setSelectedEventId] = useState(null);

    const getEvents = async () => {
        try {
            const response = await apiClient.get(GET_EVENTS_BY_USERID, { withCredentials: true })
            if (Array.isArray(response.data)) {
                setEvents(response.data)
            } else if (response.data?.events) {
                setEvents(response.data.events)
            }
        } catch (err) {
            console.error("Error fetching upcoming events:", err);
            toast.error("Failed to load upcoming events");
        }
    };

    const getEventsCompleted = async () => {
        try {
            const response = await apiClient.get(GET_EVENTS_BY_USERID_COMPLETED, { withCredentials: true })
            if (Array.isArray(response.data)) {
                setCompletedEvents(response.data)
            } else if (response.data?.events) {
                setCompletedEvents(response.data.events)
            }
        } catch (err) {
            console.error("Error fetching completed events:", err);
            toast.error("Failed to load completed events");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedEventId) return;
        try {
            setActionLoading(true);
            const response = await apiClient.delete(`${DELETE_EVENT_BY_ID}/${selectedEventId}`, { withCredentials: true })
            if (response.data.success || response.status === 200) {
                toast.success(response.data.message || "Event deleted successfully");
                setShowDeleteModal(false);
                setSelectedEventId(null);
                getEvents();
                getEventsCompleted();
            } else {
                toast.error(response.data.message || "Failed to delete event");
            }
        } catch (err) {
            toast.error(err.message)
        } finally {
            setActionLoading(false);
        }
    }

    useEffect(() => {
        const loadAllEvents = async () => {
            setLoading(true);
            await Promise.all([getEvents(), getEventsCompleted()]);
            setLoading(false);
        };
        loadAllEvents();
    }, [])

    const activeList = section === 0 ? events : completedEvents;

    return (
        <div className='min-h-screen bg-white p-6'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex gap-5 flex-col'>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">Your Events</h1>
                        <Link to={"/events/host-event"} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex gap-2 items-center font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                            <AiOutlinePlus className="text-xl" />
                            Host New Event
                        </Link>
                    </div>

                    <div className="flex gap-2 p-1 bg-slate-100 w-fit rounded-2xl mb-8">
                        <button 
                            onClick={() => setSection(0)} 
                            className={`py-3 px-6 rounded-xl font-bold uppercase tracking-wider transition-all ${section === 0 ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            Upcoming
                        </button>
                        <button 
                            onClick={() => setSection(1)} 
                            className={`py-3 px-6 rounded-xl font-bold uppercase tracking-wider transition-all ${section === 1 ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            Completed
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : activeList?.length > 0 ? (
                            activeList.map((event, index) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={event?._id || index} 
                                    className="group w-full p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center justify-between"
                                >
                                    <div className='flex flex-col gap-2'>
                                        <span className='uppercase font-bold text-2xl text-blue-600 tracking-tight'>{event?.title}</span>
                                        <span className='text-slate-500 text-sm max-w-2xl line-clamp-2'>{event?.description}</span>
                                        <div className="flex gap-2 mt-2">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">{event?.category}</span>
                                            {event?.date && (
                                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold flex items-center gap-1">
                                                    <AiOutlineCalendar />
                                                    {new Date(event.date).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        {section === 0 && (
                                            <Link to={`/event/${event._id}`} className='p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20'>
                                                <AiOutlineExternalLink className="text-2xl" />
                                            </Link>
                                        )}
                                        <Link 
                                            to="/events/host-event" 
                                            state={{ editMode: true, eventData: event }}
                                            className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                                        >
                                            <AiOutlineEdit className="text-2xl" />
                                        </Link>
                                        <button 
                                            onClick={() => { setSelectedEventId(event._id); setShowDeleteModal(true); }}
                                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all"
                                        >
                                            <AiOutlineDelete className="text-2xl" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-slate-400 font-medium text-lg">No events found in this section.</p>
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
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Delete Event?</h3>
                                <p className="text-slate-500 mb-8">Are you sure you want to delete this event? This action cannot be undone.</p>
                                
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

export default YourEvent;