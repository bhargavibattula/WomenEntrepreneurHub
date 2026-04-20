import {Link} from "react-router-dom"
import {motion} from "framer-motion"
import {FaAngleDown ,} from "react-icons/fa"
import {AiOutlineMenu , AiOutlineClose ,} from "react-icons/ai"
import { useEffect, useState , useRef } from "react"
import { navItems } from "../lib/utils.js"
import Logo from '../assets/TREELOGO.jpg'
import { useStore } from "../store/index.js"
import { apiClient } from "../lib/api-clinet.js"
import { HOST, LOGOUT_ROUTE } from "../utils/constants.js"
import { toast } from "react-toastify"
import ProfileSideNav from "./ProfileSideNav.jsx"


function Navbar() {
 const [openProfileSideNav , setOpenProfileSideNav] = useState(false);
  const [openSideNav , setOpenSideNav] = useState(false);
  const [section, setsection] = useState(-1);
  const boxRef = useRef(null);
  const sideNavRef = useRef(null);
  const {userInfo , setUserInfo} = useStore();
  useEffect(() => { 
    const handleClick = (event) => {
        if(boxRef.current && !boxRef.current.contains(event.target)) {
            setsection(-1);
        }
    }

    document.addEventListener("mousedown", handleClick)

    return (() => {
        document.removeEventListener("mousedown", handleClick)
    })

  }  , []);




  return (
    
    <div className='bg-white flex items-center justify-center '>

        <motion.div
            initial={{opacity : 0 , y : 10}}
            animate={{opacity : 1 , y : 0}}
            exit={{opacity : 0}}
            className="lg:max-w-[1300px]   w-full xl:w-fit  h-full p-3 lg:p-0  flex items-center  md:gap-x-16 lg:gap-x-36  justify-between">

            <motion.div onClick={() => setOpenSideNav((prev) => !prev)}  className="xl:hidden block p-2  cursor-pointer hover:bg-gray-200 text-xl border border-gray-400 rounded-lg">
                <AiOutlineMenu/>
            </motion.div>

            <div className="logo lg:p-2">
                <Link to="/" className="flex gap-3 items-center w-full">
                    <img src={Logo} height="50" width="50" alt="M"  />
                    <span className="whitespace-nowrap uppercase font-medium">Fempower  </span>
                </Link>
            </div>

            <nav ref={sideNavRef} className={`h-screen z-50  xl:space-y-0 space-y-3  xl:p-0  w-48 xl:w-auto xl:h-full  fixed top-0 bottom-0  transition-all  duration-300 ${openSideNav ? "left-0" : "left-[-100%]"} xl:block bg-white xl:static `}>
                <div className="flex xl:hidden  items-center justify-end"> <AiOutlineClose onClick={() => setOpenSideNav(false)} className="cursor-pointer m-1"/> </div>
                <div className="logo p-2 xl:hidden block">
                    <Link to="/" className="flex gap-3 items-center w-full">
                        <img src={Logo} height="40" width="40" alt="M"  />
                        <span className="whitespace-nowrap uppercase font-medium">Fempower  </span>
                    </Link>
                </div>

                <ul className="flex flex-col xl:h-[67px] xl:flex-row xl:gap-10 text-opacity-65 items-start xl:items-center xl:justify-center">
                    {Object.keys(navItems).map((key , index) => (
                        
                            <motion.li  key={index}
                                onClick={() =>{ setsection((prev) => prev = prev == index ? -1 : index)}} className="relative whitespace-nowrap w-full flex xl:px-2 xl:flex-row flex-col items-center gap-2 xl:justify-between px-2 p-1 py-3  xl:rounded-none  xl:py-5 xl:hover:bg-white  xl:hover:border-b-[4px] xl:hover:border-blue-500 hover cursor-pointer "> 
                                <div className="flex items-center justify-start w-full gap-2">
                                    <FaAngleDown/> <span className=" capitalize">{key}</span>  
                                </div>
                                {index == section && window.innerWidth >= 1280 && 
                                <motion.div
                                    ref={boxRef}
                                    className=" xl:absolute z-50 pointer-events-auto rounded-md xl:block border border-gray-300  xl:left-[-50%] xl:top-[115%] bg-white xl:shadow-2xl px-2 py-2 xl:w-[200%] ">
                                        <ul className="flex flex-col items-center w-full pt-2 ">
                                            {navItems[key].map((obj , index ) => {
                                                return (
                                                    <Link key={obj.path} to={`${obj.path}`} className="px-3 w-full pointer-events-auto hover:bg-gray-100 py-2 text-xs flex items-center justify-between">  <span>{obj.name}</span>  </Link>
                                                )
                                            })}
                                        </ul>
                                        <div className="w-5 h-5 z-40 bg-white rotate-45 border-t border-l top-[-10px] left-[50%] border-gray-400 absolute"/>
                                </motion.div>}
                                {window.innerWidth < 1280 && (
                                    <motion.div
                                        initial={{height : 0}}
                                        animate={{height : index === section ? "fit-content" : 0 }}
                                        exit={{height : 0}}
                                        transition={{ease : "easeInOut" , duration : 0.3}}
                                        className="overflow-hidden w-full"
                                    > 
                                        <ul className="overflow-hidde w-full flex flex-col items-start">
                                            {navItems[key].map((obj , index ) => {
                                                return (
                                                    <Link key={obj.path} to={`${obj.path}`} onClick={() => setOpenSideNav(false)} className="px-3 w-full hover:bg-gray-100 py-2 text-xs ">  <span>{obj.name}</span>  </Link>
                                                )
                                            })}
                                        </ul>
                                    </motion.div>
                                )}
                            </motion.li>
                        
                    ))}
                </ul>
            </nav>

            <div className="flex items-center   gap-2 justify-between lg:p-2">
                { !!userInfo ? (
                
                        <button onClick={() => setOpenProfileSideNav((prev) => !prev)} className="flex gap-3 px-4  ">
                            <div className="rounded-full h-12 w-12 overflow-hidden">
                                <img src={`${HOST}/${userInfo?.profileImage}`} className="object-cover" alt="" />
                            </div> 
                            <div className="col-span-2 flex flex-col items-center justify-center ">
                                <span className="text-xl italic tracking-wide">{userInfo.name}</span>
                                <span className="text-[.3em] uppercase italic tracking-wide">{userInfo.role}</span>
                            </div>
                        </button>
                    
                ) : (
                    <>
                        <Link to={"/auth/login"} className="border whitespace-nowrap text-blue-500 border-blue-500 py-2 px-3 lg:px-5  lg:text-xl hover:bg-blue-500 hover:text-white  tracking-wider flex items-center justify-center">sign in</Link>
                        <Link to={"/auth/register"} className="bg-blue-500 text-white py-2 px-5  lg:text-xl hover:bg-blue-400 shadow-lg tracking-wider flex items-center justify-center">Join</Link>
                    </>
                )}
            </div>   
        </motion.div>

        <ProfileSideNav userInfo={userInfo} setOpenProfileSideNav={setOpenProfileSideNav} openProfileSideNav={openProfileSideNav}/>

    </div>
  )
}

export default Navbar