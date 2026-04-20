import React, { useState } from 'react'
import {motion} from "framer-motion"
import { AiOutlineClose , AiOutlineDelete , AiOutlinePlus } from 'react-icons/ai'
import image1 from "../assets/WOMEN-2.webp"
import image2 from "../assets/WOMEN-3.jpg"
import image3 from "../assets/WOMENENTRPRENERU-12.jpg"
import { countriesWithStates } from '../lib/utils'
import { apiClient } from '../lib/api-clinet'
import { SETUP_PROFILE } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
function ProfileSetup() {
    const [profileImage, setProfileImage] = useState(null)
    const [country , setCountry] = useState("India")
    const [state , setState ] = useState("Andhra pradesh")
    const [bio, setBio] = useState("")
    const [phone, setPhone] = useState("")
    const [notifications, setNotifications] = useState(false)
    const [role, setRole] = useState("visitor")
    const [facebook, setFacebook] = useState("")
    const [instagram, setIntagram] = useState("")
    const [twitter, setTwitter] = useState("")
    const [category , setCategory] = useState("Technology")
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {profileImage , role , bio , phone , country , state , facebook , instagram , twitter , notifications , category }
        const formData = new FormData();
        Object.keys(obj).map((key , index) => {
            formData.append(key , obj[key])
        })

        try {
            setLoading(true);
            const response = await apiClient.post(SETUP_PROFILE,formData,{withCredentials : true});
            if(!response.data.success) {
                toast.error(response.data.message);
                setLoading(false);
                return;
            }
            toast.success("Profile updated successfully");
            navigate("/")
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div className='min-h-screen'>
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm lg:py-24'>
            <motion.div 
                    initial={{opacity : 0 , scale : 0}}
                    animate={{opacity : 1 , scale : 1}}
                    exit={{opacity : 0 , scale : 0}}
                    transition={{duration : 0.5 , ease : "backInOut"} }
                    className="container flex flex-col flex-wrap items-center justify-center w-full h-full mx-auto rounded-lg shadow-md bg-gradient-to-b from-white via-white to-blue-100 reative xl:p-20 ">
                    
                    <img draggable="false" className="absolute z-40 object-cover pointer-events-none select-none right-5 top-9 h-96" src={image3} alt="" />
                    <img draggable="false" className="z-40 object-cover  select-none pointer-events-none absolute left-[-10%] top-[-5%] h-96" src={image1} alt="" />
                    <Link to={"/"} className='absolute top-0 right-0 '><AiOutlineClose/></Link>
                <form onSubmit={handleSubmit} className='flex overflow-scroll scrollbar-hide flex-col w-[400px] p-5 gap-5'>
                    {/* role , profile-image , bio , contact-info : {phone,address,social-links:{facebook,twitter,instagram}} ,preferences : {categories , notifications}    */}
                    {/* profile */}
                    <div className="flex items-center justify-center group ">
                        {profileImage ? (
                            <div className="flex flex-col gap-5">
                                <img className="w-40 h-40" src={URL.createObjectURL(profileImage)} alt="logo" />
                                <button onClick={() => setProfileImage(null)} className="flex items-center justify-center px-3 py-2 text-red-600 bg-white shadow-lg w-fit" > <AiOutlineDelete/> delete upload</button>
                            </div>
                            ) : (
                            <div className="flex relative hover:bg-gray-200 cursor-pointer bg-gray-300 items-center rounded-full h-[100px] w-[100px] justify-center  placeholder-shown tracking-wider p-2 border border-dashed border-black  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"> 
                                <label htmlFor="logoImage" className="cursor-pointer"> 
                                <span className="font-semibold  text-[0.7em] whitespace-nowrap ">upload profile </span>
                                    <input onChange={handleFileChange} id="logoImage" name="logoImage" type="file"  className="hidden"  />
                                </label>
                                <AiOutlinePlus className='w-[50%] group-hover:block hidden  cursor-pointer pointer-events-none h-[50%] absolute'/>
                            </div>
                            )}
                    </div>
                    {/* role */}
                    <span className="text-xs text-gray-700 text-opacity-50">YOU ARE <span className="text-xl text-red-500"> <sup>*</sup></span></span>
                    <div className="flex w-full gap-3">
                        <select value={role} onChange={(e) => setRole(e.target.value)}   className="flex-1 w-full p-2 tracking-widest transition duration-200 border border-gray-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400" name="" id="">
                          <option value="visitor">visitor</option>
                          <option value="entrepreneur">entrepreneur</option>
                        </select>
                    </div>

                    <span className="text-xs text-gray-700 text-opacity-50">PROVIDE YOUR BIO <span className="text-xl text-red-500"> <sup>*</sup></span></span>
                    <input
                        required
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        type="text"
                        placeholder="Provide your bio"
                        className="w-full h-56 p-2 transition duration-200 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                    />
                    <span className="text-xs text-gray-700 text-opacity-50">CONTACT INFORMATION <span className="text-xl text-red-500"> <sup>*</sup></span></span>
                    <input
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        placeholder="phone number"
                        className="w-full p-2 transition duration-200 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                    />
                    <span className="text-xs text-gray-700 text-opacity-50">ADD YOUR SOCIAL LINKS <span className="text-xl text-red-500"> <sup>*</sup></span></span>
                    <input
                        required
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        type="text"
                        placeholder="facebook profile link"
                        className="w-full p-2 transition duration-200 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                    />
                    <input
                        required
                        value={instagram}
                        onChange={(e) => setIntagram(e.target.value)}
                        type="text"
                        placeholder="instagram profile link"
                        className="w-full p-2 transition duration-200 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                    />
                    <input
                        required
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        type="text"
                        placeholder="twitter profile link"
                        className="w-full p-2 transition duration-200 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                    />



                    <span className="text-xs text-gray-700 text-opacity-50">choose your prefered category <span className="text-xl text-red-500"> <sup>*</sup></span></span>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex-1 w-full p-2 tracking-widest transition duration-200 border border-gray-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400"  >
                        <option value="technology">Technology</option>
                        <option value="health">Health</option>
                        <option value="sports">Sports</option>
                        <option value="arts">Arts</option>
                        <option value="music">Music</option>
                        <option value="travel">Travel</option>
                    </select>
                    <span className="text-xs text-gray-700 text-opacity-50">ADD YOUR LOCATION <span className="text-xl text-red-500"> <sup>*</sup></span></span>
                    <div className="flex w-full gap-3">
                        <select value={country} onChange={(e) => setCountry(e.target.value)}  className="flex-1 w-full p-2 tracking-widest transition duration-200 border border-gray-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400" name="" id="">
                          {Object.keys(countriesWithStates).map((country , index) => (
                            <option value={country} key={index}>{country}</option>
                          ))}
                        </select>
                        <select value={state} onChange={(e) => setState(e.target.value)}  className="flex-1 w-full p-2 tracking-widest transition duration-200 border border-gray-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400" name="" id="">
                          {countriesWithStates[country]?.map((state , index) => (
                            <option value={state} key={index}>{state}</option>
                          ))}
                        </select>
                    </div>

                    <div className="flex items-center justify-between w-full ">
                        <span className="text-gray-900 "> NOTIFICATIONS TO EMAIL</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input isChecked={notifications} onChange={() => setNotifications((prev) => !prev)} type="checkbox" class="sr-only peer" />
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-focus:ring-blue-300  dark:peer-focus:ring-blue-800"></div>
                            <div class="absolute w-5 h-5 bg-white border border-gray-300 rounded-full transition-all peer-checked:translate-x-5 peer-checked:border-white"></div>
                        </label>
                    </div>

                    <button  type="submit" className="flex items-center justify-center w-full py-2 text-white bg-blue-500 hover:bg-blue-600">
                        { loading ? <div className="w-[25px] h-[25px] rounded-full border-[2px]  border-gray-200 border-t-black animate-spin transition-all duration-200" /> : "SET UP PROFILE"}
                    </button>

                    
                </form>

            </motion.div>
        </div>

    </div>
  )
}

export default ProfileSetup