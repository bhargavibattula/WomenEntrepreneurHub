import React, { useEffect, useState } from 'react'
import ProfileViewAndEdit from '../components/ProfileViewAndEdit'
import { AiOutlineDelete , AiOutlineMoneyCollect, AiOutlineDown, AiOutlineEdit } from 'react-icons/ai'
import { apiClient } from '../lib/api-clinet'
import { GET_JOBS_BY_USER_ID } from '../utils/constants'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function YourJobs() {

    const [jobs,setJobs] = useState([]);

    const getJobs = async () => {
        try {
          const response  = await apiClient.get(GET_JOBS_BY_USER_ID , {withCredentials : true});
          setJobs(response.data)

        } catch (error) {
          toast.error(error.message)
        }
      };

      useEffect(() => {
        getJobs()
      
        return () => {

        }
      }, [])
      

  return (
    <div className='min-h-screen bg-white p-6'>
      <div className='max-w-7xl mx-auto'> 
        <div className='flex gap-5 flex-col'>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4 uppercase">Your Jobs</h1>
          <div className='flex w-full gap-4 items-center'> 
              <input  placeholder="search" type="text"  className="w-full flex-1 p-2 border border-gray-300   focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200" />
              <Link to={"/"} className="bg-blue-500 h-full rounded-lg hover:bg-blue-600 flex gap-2 items-center justify-center text-xl basis-[100px] text-white"> <AiOutlineMoneyCollect/>new</Link>
          </div>
          {jobs.map((job,index) => (
            <div className="text">
                 <div className='flex-1 flex gap-3 flex-col'>
                <span className='uppercase font-semibold text-3xl text-blue-500'>{job?.title}</span>
                <span className='uppercase text-xs'>{job?.description}</span>
              </div>
              <div className=''>
                <AiOutlineDown/>
              </div>
              <div className="absolute top-[-10%] right-10">
                <div className="flex gap-3">
                  <button className='text-2xl'><AiOutlineDelete/></button>
                  <button className='text-2xl'><AiOutlineEdit/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default YourJobs