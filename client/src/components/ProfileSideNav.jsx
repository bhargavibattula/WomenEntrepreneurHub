import { AiFillMobile, AiFillSetting, AiOutlineAccountBook, AiOutlineBackward, AiOutlineBook, AiOutlineClose , AiOutlineFundProjectionScreen, AiOutlineMoneyCollect, AiOutlineMonitor, AiOutlineProfile } from "react-icons/ai"
import {GrLogout} from "react-icons/gr"
import { HOST, LOGOUT_ROUTE } from "../utils/constants"
import { Link } from "react-router-dom"
import { apiClient } from "../lib/api-clinet"
import { useStore } from "../store"
import {toast} from "react-toastify"

function ProfileSideNav({openProfileSideNav , setOpenProfileSideNav}) {
    const {userInfo , setUserInfo} = useStore();
    const handleLogout = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials : true}) ;
    
            if(response.statusText !== "OK") {
                toast.error("Network error");
            }
    
            toast.success(response.data.message);
            setUserInfo(null);
            setOpenProfileSideNav(false)
        } catch (error) {
            toast.error(error.message)
        }
      }
  return (
    <div className={`h-screen z-50 shadow-md border-l border-gray-500 flex flex-col gap-3 bg-white  overflow-scroll scrollbar-hide w-[303px] p-2 fixed top-0 ${openProfileSideNav ? "right-0" : "right-[-100%]"} transition-all duration-300`}>
        <div className="w-full flex items-center justify-between gap-2 p-2">
            <button onClick={() => setOpenProfileSideNav((prev) => !prev)} className="flex gap-3 px-4  ">
                <div className="rounded-full h-12 w-12 overflow-hidden">
                    <img src={`${HOST}/${userInfo?.profileImage}`} className="object-cover" alt="" />
                </div> 
                <div className="col-span-2 flex flex-col items-center justify-center ">
                    <span className="text-xl italic tracking-wide">{userInfo?.name}</span>
                    <span className="text-[.3em] uppercase italic tracking-wide">{userInfo?.role}</span>
                </div>
            </button>

            <button onClick={() => setOpenProfileSideNav(false)}  className="w-full flex flex-row-reverse p-1"><AiOutlineClose/></button>
        </div>
        <hr />
        <div className="w-full flex flex-col gap-1">
            <Link onClick={() => setOpenProfileSideNav(false)} to={"/profile"} className="w-full px-2 py-1 flex gap-2 items-center text-xl  rounded-lg hover:bg-gray-200 transition-all duration-150 "> <AiOutlineProfile/> your profile </Link>

        </div>
        <hr />
        {userInfo?.role === "admin" || userInfo?.role === "entrepreneur" && (
            <div className="w-full flex flex-col gap-1">
                <Link onClick={() => setOpenProfileSideNav(false)} to={"/your-businesses"} className="w-full px-2 py-1 flex gap-2 items-center text-xl  rounded-lg hover:bg-gray-200 transition-all duration-150 "> <AiOutlineMoneyCollect/> your businesses </Link>
                <Link  onClick={() => setOpenProfileSideNav(false)} to={"/your-events"}className="w-full px-2 py-1 flex gap-2 items-center text-xl  rounded-lg hover:bg-gray-200 transition-all duration-150 "> <AiOutlineFundProjectionScreen/> your events </Link>
                <Link onClick={() => setOpenProfileSideNav(false)} to={"/your-resources"} className="w-full px-2 py-1 flex gap-2 items-center text-xl  rounded-lg hover:bg-gray-200 transition-all duration-150 "> <AiOutlineBook/> your resources </Link>
                <Link onClick={() => setOpenProfileSideNav(false)} to={"/your-jobs"} className="w-full px-2 py-1 flex gap-2 items-center text-xl  rounded-lg hover:bg-gray-200 transition-all duration-150 "> <AiOutlineAccountBook/> your job posts </Link>
            </div>
        )}
        <hr />
        <div className="w-full flex flex-col gap-1">
            <Link className="w-full px-2 py-1 flex gap-2 items-center text-xl  rounded-lg hover:bg-gray-200 transition-all duration-150 "> <AiFillSetting/> settings </Link>
        </div>
        <hr />
        <div className="w-full flex flex-col gap-1">
            <Link onClick={handleLogout} className="w-full px-2 py-1 flex gap-2 items-center text-xl  rounded-lg hover:bg-gray-200 transition-all duration-150 "> <GrLogout/> sign out </Link>
        </div>


    </div>
  )
}

export default ProfileSideNav