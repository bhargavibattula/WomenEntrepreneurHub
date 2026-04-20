import { set } from "date-fns";
import {motion} from "framer-motion" 
import { useState } from "react";
import { countriesWithStates } from "../lib/utils";
import { apiClient } from "../lib/api-clinet";
import { AiOutlineDelete } from "react-icons/ai";
import { CREATE_A_EVENT, POST_A_BUSINESS } from "../utils/constants";
import { toast } from "react-toastify";
import image from "../assets/EVENTIMAGE.avif"
import { eventTags as tags } from "../lib/utils";
function HostEvent() {
  const [selectedTags , setSelectedTags] = useState([]);
  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [category, setCategory] = useState("networking")
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Andhra Pradesh")
  const [loading , setLoading] = useState(false);
  const [date , setDate] = useState(null);

  const handleSelectTag = (i) => {
    if(selectedTags.indexOf(tags[i]) == -1) {
      setSelectedTags([...selectedTags , tags[i]])
    }
  }
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault() ;
    try {
      setLoading(true)
      const response = await apiClient.post(CREATE_A_EVENT,{title , description , date , tag : selectedTags , category ,country , state  } ,{withCredentials : true});
      if(!response.data.success) {
        toast.error(response.data.message);
        setLoading(false)
        return ;
      }

      toast.success(response.data.message);
      setTitle("")
      setDescription("")
      setCountry("India")
      setState("Andhra Pradesh")
      setDate(null);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div>
        <div className='h-[300px] z-0 flex items-center justify-center'>
            <div className='w-full p-5 flex items-center bg-white/20 backdrop-blur-sm justify-center'>
                <mspan initial={{opacity : 0 , y : 50}} animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}} className='sm:mr-20 text-xl z-0 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider' >Share knowledge</mspan>
            </div>
        </div>

        <div className="bg-white flex items-center justify-center flex-wrap p-5 gap-x-20 gap-10">



                <motion.div 
                    initial={{opacity : 0 , y : 50}}
                    animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
                    className=" bg-white p-3 items-center gap-2 justify-center basis-[500px] flex flex-col "
                >

                    <span className=" text-xl tracking-wider w-full  py-3 capitalize text-center"> FILL THIS FORM AND HOST THE EVENT </span>
                    <form onSubmit={handleSubmit}  className="flex flex-col gap-4 w-full">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            required
                            placeholder="Title of the event"
                            className="w-full placeholder-shown tracking-wider p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            required
                            placeholder="description about your event"
                            className="w-full placeholder-shown tracking-wider p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                        />
                       <span className="text-xl text-gray-900 text-opacity-50">date of hosting......</span>
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                            min={today}
                            required
                            className="w-full placeholder-shown tracking-wider p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                        />
                        <span className="text-xl text-gray-900 text-opacity-50">select category of your event</span>
                          <select className="w-full cursor-pointer placeholder-shown tracking-wider p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200" value={category} onChange={(e) => setCategory(e.target.value)} id="eventCategory" name="eventCategory">
                            <option value="networking">Networking</option>
                            <option value="workshop">Workshop</option>
                            <option value="panel_discussion">Panel Discussion</option>
                            <option value="mentorship">Mentorship Program</option>
                            <option value="conference">Conference</option>
                            <option value="pitch_event">Pitch Event</option>
                            <option value="seminar">Seminar</option>
                            <option value="webinar">Webinar</option>
                            <option value="retreat">Retreat</option>
                            <option value="social_event">Social Event</option>
                          </select>
                        <span className="text-xs text-gray-700 text-opacity-50">select tags related to your business that all users can easly search your business </span>
                        <div className="flex flex-wrap gap-2 p-2 ">
                            {tags.map((tag , index) => (
                                <div key={index} onClick={() => handleSelectTag(index)} className={`rounded-lg ${selectedTags.indexOf(tag) !== -1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"} border px-2 py-1 cursor-pointer  hover:bg-blue-500 hover:text-white border-blue-400 text-[0.9em]`}>{tag}</div>
                            ))}
                        </div>
                        <span className="text-xs text-gray-700 text-opacity-50">ADD YOUR LOCATION <span className="text-red-500 text-xl"> <sup>*</sup></span></span>
                        <div className="w-full flex gap-3">
                            <select value={country} onChange={(e) => setCountry(e.target.value)}  className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200" name="" id="">
                              {Object.keys(countriesWithStates).map((country , index) => (
                                <option value={country} key={index}>{country}</option>
                              ))}
                            </select>
                            <select value={state} onChange={(e) => setState(e.target.value)}  className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200" name="" id="">
                              {countriesWithStates[country]?.map((state , index) => (
                                <option value={state} key={index}>{state}</option>
                              ))}
                            </select>
                        </div>

                        <button  type="submit" className="w-full flex items-center justify-center bg-blue-500 text-white py-2 hover:bg-blue-600">
                            { loading ? <div className="w-[25px] h-[25px] rounded-full border-[2px]  border-gray-200 border-t-black animate-spin transition-all duration-200" /> : "CREATE EVENT"}
                        </button>
                    </form>
                </motion.div>


                <motion.div
                    initial={{opacity : 0 , y : 50}}
                    animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
                className="bg-white flex flex-col gap-5  border-gray-200 p-6 basis-[450px]">
                    <div className="overflow-hidden flex items-center justify-center">
                        <img
                            src={image}
                            className="object-cover  bg-cover bg-center" 
                            alt="women empowerment"
                            />
                    </div>
                </motion.div>


        </div>

    </div>
  )
}

export default HostEvent