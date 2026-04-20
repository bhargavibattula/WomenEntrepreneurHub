import React, { useEffect } from 'react'
import JitsiMeet from '../components/JSTLMeet'
import { useParams } from 'react-router-dom'
import { apiClient } from '../lib/api-clinet';
import { GET_EVENTS_BY_ID } from '../utils/constants';
import { toast } from 'react-toastify';
import { useState } from 'react';
function EventPage() {
    const {id} = useParams();
    const [event , setEvent] = useState();
    const getEventDetails = async () => {
        await apiClient.get(`${GET_EVENTS_BY_ID}/${id}`)
        .then((response) => setEvent(response.data.event) )
        .catch((err) => toast.error(err.message))
    }

    useEffect(() => {
        if(id) {
            getEventDetails();
        }
    } , [id])
  return (
    <div>
        <div className='flex w-full flex-col'>
            <div className='text-center text-blue-500'>{event?.title}</div>
            <div className='text-cente'>{event?.description}</div>
        </div>
        <JitsiMeet/>
    </div>
  )
}

export default EventPage