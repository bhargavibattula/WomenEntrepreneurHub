import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlinePlus, AiOutlineEdit, AiOutlineClose, AiOutlineBook } from 'react-icons/ai'
import { apiClient } from '../lib/api-clinet'
import { GET_RESOURCE_BY_USERID, DELETE_RESOURCE_BY_ID } from '../utils/constants'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function YourResource() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedResourceId, setSelectedResourceId] = useState(null)

  const getResources = async () => {
    try {
      const response = await apiClient.get(GET_RESOURCE_BY_USERID, { withCredentials: true });
      setResources(response.data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDelete = async () => {
    if (!selectedResourceId) return;
    try {
      setLoading(true);
      const response = await apiClient.delete(`${DELETE_RESOURCE_BY_ID}/${selectedResourceId}`, { withCredentials: true });
      if (response.data.success || response.status === 200) {
        toast.success(response.data.message || "Resource deleted successfully");
        setShowDeleteModal(false);
        setSelectedResourceId(null);
        getResources();
      } else {
        toast.error(response.data.message || "Failed to delete resource");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getResources();
  }, [])

  return (
    <div className='min-h-screen bg-white p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex gap-5 flex-col'>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">Your Resources</h1>
            <Link to={"/resource/post-articles"} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex gap-2 items-center font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95">
              <AiOutlinePlus className="text-xl" />
              Post New Article
            </Link>
          </div>

          <div className='flex w-full gap-4 items-center mb-8'>
            <input placeholder="Search your articles..." type="text" className="w-full flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {resources?.length > 0 ? (
              resources.map((resource, index) => (
                <div key={index} className="group w-full p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center justify-between">
                  <div className='flex flex-col gap-2'>
                    <span className='uppercase font-bold text-2xl text-blue-600 tracking-tight'>{resource?.title}</span>
                    <span className='text-slate-500 text-sm max-w-2xl line-clamp-2'>{resource?.content}</span>
                    <div className="flex gap-2 mt-2">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">{resource?.category}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => toast.info("Edit feature coming soon!")}
                      className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                    >
                      <AiOutlineEdit className="text-2xl" />
                    </button>
                    <button 
                      onClick={() => { setSelectedResourceId(resource._id); setShowDeleteModal(true); }}
                      className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all"
                    >
                      <AiOutlineDelete className="text-2xl" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium text-lg">No resources found. Share your knowledge!</p>
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
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Delete Resource?</h3>
                <p className="text-slate-500 mb-8">Are you sure you want to delete this resource? This action cannot be undone.</p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-4 px-6 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex-1 py-4 px-6 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                  >
                    {loading ? "Deleting..." : "Confirm Delete"}
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

export default YourResource;