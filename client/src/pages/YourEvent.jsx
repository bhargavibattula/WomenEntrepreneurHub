import React, { useEffect, useState } from 'react'
import ProfileViewAndEdit from '../components/ProfileViewAndEdit'
import { AiOutlineDelete , AiOutlineMoneyCollect, AiOutlineDown, AiOutlineEdit, AiOutlineUpload, AiOutlineLink, AiOutlineClose } from 'react-icons/ai'
import { apiClient } from '../lib/api-clinet'
import { DELETE_EVENT_BY_ID, GET_EVENTS_BY_USERID, GET_EVENTS_BY_USERID_COMPLETED, UPDATE_VIRTUAL_LINK } from '../utils/constants'
import { toast } from 'react-toastify'
import {motion} from "framer-motion"


import { Link } from 'react-router-dom'
import { deleteEventById } from '../../../server/controllers/event_controllers'
function YourEvent() {
    const [link , setLink] = useState("");
    const [selectedEventId , setSelectedEventId] = useState(null);
    const [events,setEvents] = useState([])
    const [section, setsection] = useState(0)
    const [completedEvents , setCompletedEvent] = useState([])
    const [showCard , setShowCard] = useState(false)
    const [loading , setLoading] = useState(false);
    const [showDeleteCard , setShowDeleteCard] = useState(false)
    const getEvents = async () => {
        try{
            const response = await apiClient.get(GET_EVENTS_BY_USERID, {withCredentials : true})
            setEvents(response.data)
        }catch(err){
            toast.error(err.message)
        }
    };
    const getEventsCompleted = async () => {
        try{
            const response = await apiClient.get(GET_EVENTS_BY_USERID_COMPLETED, {withCredentials : true})
            setCompletedEvent(response.data)
          console.log(response.data)
        }catch(err){
            toast.error(err.message)
        }
    };

    const handleDelete = async () => {
      try{
        setLoading(true);
        const response = await apiClient.delete(`${DELETE_EVENT_BY_ID}/${selectedEventId}`, {withCredentials : true})
          if(!response.data.success) {
            toast.error(response.data.message);
            setLoading(false)
            return;
          }
          
          toast.success(response.data.message);
          setSelectedEventId(null);
          setShowDeleteCard(false);
          setLoading(false)
          getEvents()
      }catch(err){
          toast.error(err.message)
      }
    }


    const handleSubmit = async (e) => {
      e.preventDefault();
      if(link.startsWith("http") && link.endsWith(".com")) {
          try{
            setLoading(true)
            const response = await apiClient.post(`${UPDATE_VIRTUAL_LINK}/${selectedEventId}`, {virtualLink : link}, {withCredentials : true})
            if(!response.data.success) {
              toast.error(response.data.message);
              setLoading(false);
              return;
            }
            toast.success(response.data.message)
            setShowCard(false);
            setLoading(false)
            setSelectedEventId(null)
        }catch(err){
            toast.error(err.message)
        }
      }else {
        toast.error("provide valid virtual link")
      }
    }


    useEffect(() => {
        getEvents()
        getEventsCompleted();
    }, [])


  return (
    <div className='min-h-screen bg-white p-6'>
      <div className='max-w-7xl mx-auto'> 
        <div className='flex gap-5 flex-col'>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4 uppercase">Your Events</h1>
          <span className='uppercase text-xl tracking-wider'>your created events</span>
          <div className='flex w-full gap-4 items-center'> 
              <input  placeholder="search" type="text"  className="w-full flex-1 p-2 border border-gray-300   focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200" />
              <Link to={"/events/host-event"} className="bg-blue-500 h-full rounded-lg hover:bg-blue-600 flex gap-2 items-center justify-center text-xl basis-[100px] text-white"> <AiOutlineMoneyCollect/>new</Link>
          </div>
          <div className="w-full p-1 flex gap-2">
            <button onClick={() => setsection(0)} type="button" className={`py-3 uppercase px-2 hover:bg-gray-100 ${section == 0 ? "border-b border-blue-400 text-blue-400" : ""}`}>NEED TO HOST</button>
            <button onClick={() => setsection(1)} type="button"  className={`'py-3 uppercase px-2 hover:bg-gray-100 ${section == 1 ? "border-b border-blue-400 text-blue-400" : ""}'`} >completed</button>
          </div>

          {section == 0 &&  events?.map((event,index) => (
            <div key={index} className="w-full p-5 items-center relative rounded-e-md shadow-sm   hover:bg-gray-100 cursor-pointer flex  border ">
                <div className='flex-1 flex gap-3 flex-col'>
                <span className='uppercase font-semibold text-3xl text-blue-500'>{event?.title}</span>
                <span className='uppercase text-xs'>{event?.description}</span>
              </div>
              <div className='flex gap-3'>
                  <Link to={`/event/${event._id}`} className='uppercase px-3 py-1 '>HOST</Link>
                  <button className='text-2xl'><AiOutlineEdit/></button>
                  <button onClick={() => {setShowDeleteCard(true) ,  setSelectedEventId(event._id)}} className='text-2xl'><AiOutlineDelete/></button>
              </div>
            </div>
          ))}

          {section == 1 && 
          completedEvents.map((event,index) => {
              console.log(event)
            return(

              <div key={index} className="w-full p-5 items-center relative rounded-e-md shadow-sm   hover:bg-gray-100 cursor-pointer flex  border ">
                  <div className='flex-1 flex gap-3 flex-col'>
                  <span className='uppercase font-semibold text-3xl text-blue-500'>{event?.title}</span>
                  <span className='uppercase text-xs'>{event?.description}</span>
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
            )
          })}
        </div>
      </div>
      {showCard && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <motion.div
                              initial={{opacity : 0 , scale : 0}}
                              animate={{opacity : 1 , scale : 1}}
                              exit={{opacity : 0 , scale : 0}}
                              transition={{duration : 0.5 , ease : "backInOut"} }
          className='bg-white rounded-lg p-5 flex flex-col'
          >
            <button onClick={() => setShowCard(false)} className="w-full flex mb-3 justify-end">
              <AiOutlineClose/>
            </button>
            <div className='text-xl uppercase text-center'>upload virtual link SO THAT </div>
            <div className='text-xs uppercase text-center'>registered members can join </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 my-4'>
                <div className='flex gap-3 items-center justify-center'>
                    <input
                      value={link}
                      onChange={(e) => setLink(e.target.value)} 
                      type="name"
                      placeholder="ex : http://google-meet.com"
                      className="w-full rounded-lg p-1 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                  />
                      <div>
                          <div   className="border rounded-full text-2xl focus:ring-1 h-[100%] px-2 py-2 text-blue-700 bg-white ">
                              <AiOutlineLink  />
                          </div>
                      </div>
                </div>
                <div className="w-full flex justify-end">
                  <button type="submit" className=" px-4 float- rounded-lg w-fit flex items-center justify-center bg-blue-500 text-white py-2 hover:bg-blue-600">
                                    {loading ? <div className="w-[25px] h-[25px] rounded-full border-[2px] border-dotted border-gray-200 border-t-black animate-spin transition-all duration-200" /> : "send link"}
                  </button>

                </div>
            </form>
          </motion.div>
        </div>
      )}
      {showDeleteCard && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <motion.div
                              initial={{opacity : 0 , scale : 0}}
                              animate={{opacity : 1 , scale : 1}}
                              exit={{opacity : 0 , scale : 0}}
                              transition={{duration : 0.5 , ease : "backInOut"} }
          className='bg-white rounded-lg p-5 flex flex-col'
          >
            <div className='text-xl uppercase text-center'>ARE YOU SURE  </div>
            <div className='text-xs uppercase text-center'>you want to delete this resource ? </div>
            <div onSubmit={handleSubmit} className='flex justify-between gap-2 mt-4'>
              <button onClick={() => {setShowDeleteCard(false) , setSelectedEventId(null)}} className='rounded-lg border border-gray-200 uppercase   px-3 py-2'>cancel </button>
              <button onClick={() => handleDelete()} type="submit" className=" px-4 float- rounded-lg w-fit flex items-center justify-center bg-red-500 text-white py-2 hover:bg-red-600">
                                    {loading ? <div className="w-[25px] h-[25px] rounded-full border-[2px] border-dotted border-gray-200 border-t-black animate-spin transition-all duration-200" /> : "delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  )
}

export default YourEvent