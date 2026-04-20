import { useEffect, useRef, useState } from "react";
import image from "../assets/COMMUNIT-removebg-preview.png"
import { useStore } from "../store"
import { AiOutlineSend } from "react-icons/ai";
import { useSocket } from "../context/SocketContext";
import { GET_ALL_COMMUNITY_MESSAGES, HOST } from "../utils/constants";
import {format} from "date-fns"
import { apiClient } from "../lib/api-clinet.js"
import {toast} from "react-toastify"
function ComunityChat() {
    const [message , setMessage] = useState("")
    const {selectedChatMessages , setSelectedChatMessages , selectedChatType , userInfo , setSelectedChatType } = useStore();
    const scrollRef = useRef()
    const socket = useSocket();

    useEffect(() => {
        setSelectedChatType("community")
        getAllCommunityMesages();
    } , [])
    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior : "smooth"})
        }
    } , [setSelectedChatMessages , selectedChatMessages]);

    const getAllCommunityMesages = async () => {
        try {
            const response = await apiClient.get(GET_ALL_COMMUNITY_MESSAGES, {withCredentials : true});
            setSelectedChatMessages(response.data.messages)
        } catch (error) {
            toast.error(error.message)
        }
    }
     const handleSendMessage  = async (e) => {
        e.preventDefault();
        if(!socket) {
            console.log("Socket not provided")
            return;
        }

        if(selectedChatType === "community" && message) {
            socket.emit("send-message" , {
                sender : userInfo?._id ,
                message ,
                isCommunity : true
            })
        }


        setMessage("");
    }


  return (
    <div className='h-[110vh]  xl:p-10 gap-2'>
        <div className="container  scrollbar-hide h-full flex flex-col items-center mx-auto gap-3">
            <div className='wifull flex gap-10 items-center justify-center py-3 '>
                <div className='text-2xl uppercase italic text-center font-thin font'>Welcome to <br /> <span className="text-blue-500 font-semibold text-6xl">community</span> <br /> <span className="text-xs">share your knowhere and also ask for help </span></div>
                <img src={image} alt="logo" className="h-64 w-64" />
            </div>



            {/* messages */}
            <div className="flex min-w-[800px]  flex-1 overflow-scroll scrollbar-hide  flex-col gap-3">

                {selectedChatMessages.map((message,index) => {
                    return(
                        <>
                                <div key={index} className={`w-full flex p-1 ${message.sender._id === userInfo._id ? "justify-end" : "justify-start"}`}>
                                    <div className={` w-[250px] relative ${message.sender._id === userInfo._id ? "bg-blue-500 text-white" : "bg-white border border-gray-300 text-black"} p-2 rounded-lg `}>
                                        <div className="flex gap-3">
                                            <div className="rounded-full h-8 w-8 overflow-hidden">
                                                <img src={`${HOST}/${message.sender?.profileImage}`} className="object-cover" alt="" />
                                            </div> 
                                            <div className="col-span-2 flex flex-col  justify-center ">
                                                <span className="text-xs italic tracking-wide">{message.sender?.name}</span>
                                                <span className="text-[.5em] uppercase  tracking-wide">{message.sender?.role}</span>
                                            </div>

                                        </div>
                                        <div className="px-1 mb-4 text-xl ">
                                            {message?.message}
                                        </div>
                                        <div className="absolute bottom-1 right-1">
                                            {format(message.timestamp , "HH:mm")
                                            }
                                        </div>
                                    </div>
                                </div>
                        </>
                    )

                })}
                <div ref={scrollRef}></div>

            </div>

            <form onSubmit={handleSendMessage} className="message-bar items-center justify-center  w-full gap-5 flex p-2">
                <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Message..."  className="min-w-[400px] p-2 border rounded-lg border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2  focus:border-none transition duration-200"/>
                <button type="submit" className="border rounded-full text-2xl focus:ring-4 h-[100%] px-2 py-2 text-blue-700 bg-white "><AiOutlineSend/></button>
            </form>


        </div>


    </div>
  )
}

export default ComunityChat