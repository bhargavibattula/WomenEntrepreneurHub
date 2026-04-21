import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { apiClient } from "../lib/api-clinet";
import { GET_ALL_RESOURCE } from "../utils/constants";
import { toast } from "react-toastify";
import {format} from"date-fns"
import { AiFillInstagram, AiFillLinkedin, AiOutlineFacebook } from "react-icons/ai";
import image from "../assets/woemnemp.jpeg"


function ResourceArticlePage() {
    const {id} = useParams();
    const [resource , setResource] = useState({});
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        const getResource = async () => {
            try {
                setLoading(true)
                const response = await apiClient.get(`${GET_ALL_RESOURCE}/${id}`);
                console.log(response)
                setResource(response.data)
                setLoading(false)
            } catch (error) {
                toast.error("Error")
            }
        }
        getResource();
    } , [])
    
  return (
    <div className="min-h-screen bg-white flex flex-wrap justify-center pt-20 md:pt-28">
        <div className='bg-white p-5 max-w-[700px] min-w-[350px] flex flex-col items-center gap-5'>
            <div className="flex gap-5">
                <div className="flex flex-col gap-3">
                    {true && ( 
                        <a className="cursor-pointer">
                            <div className="border  text-2xl focus:ring-4  px-2 py-2 text-blue-700 bg-white ">
                                <AiOutlineFacebook  />
                            </div>
                        </a> 
                    )}
                    {true && ( 
                        <a className="cursor-pointer">
                            <div className="border  text-2xl focus:ring-4 px-2 py-2 text-blue-700 bg-white ">
                                <AiFillLinkedin  />
                            </div>
                        </a> 
                    )}
                    {true && ( 
                        <a className="cursor-pointer">
                            <div className="border  text-2xl focus:ring-4  px-2 py-2 text-pink-500 bg-white ">
                                <AiFillInstagram  />
                            </div>
                        </a> 
                    )}
                </div>
                <div className="lg:h-[400px] lg:w-[600px] overflow-hidden">
                    <img 
                        src={image}
                        alt="article" 
                        className="object-cover w-full h-full" 
                    />
                </div>
            </div>
            <div className="italic text-sm text-gray-600 text-opacity-80 ">
                {resource.content}
            </div>
        </div>
        <div className=" basis-[300px] flex flex-col gap-10">
            <div className="flex flex-col h-fit  p-5 bg-white">
                <span className="whitespace-nowrap">Article posted by <Link className="text-blue-400 hover:text-blue-500 hover:underline">{resource?.author?.name}</Link> </span> 
                {/* Last updated @ {format(resource?.updatedAt , "d-M")} */}
            </div>

            <div className="p-5 flex flex-col" >
                <span className="whitespace-nowrap text-gray-700 text-opacity-45 uppercase">refer these article too</span>
                <Link className="text-blue-400 hover:text-blue-500 hover:underline">article 1</Link>
                <Link className="text-blue-400 hover:text-blue-500 hover:underline">article 21</Link>
                <Link className="text-blue-400 hover:text-blue-500 hover:underline">article 3</Link>
            </div>
            
        </div>
    </div>
  )
}

export default ResourceArticlePage