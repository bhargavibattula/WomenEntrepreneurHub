import {motion} from "framer-motion"
import { useState } from "react"
import { VERIFY_EMAIL } from "../utils/constants";
import { toast } from "react-toastify";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../lib/api-clinet";
import OTP from "../assets/OTP.jpeg"
function VerifyEmail() {
    const navigate = useNavigate();
    const [isLoading , setIsLoading] = useState(false);
    const {setUserInfo , userInfo} = useStore();
    const [otp , setOtp ] = useState("")
    console.log(userInfo)

    useState(() => {
        if(userInfo) {
            console.log(userInfo)
            if(userInfo.isVerified) {
                navigate("/")
            }
        }
    } , [userInfo]);


    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                setIsLoading(true)
                const response = await apiClient.post(VERIFY_EMAIL,{ code : otp} , {withCredentials : true}) ;

                if(!response.data.success) {
                    toast.error(response.data.message);
                    setIsLoading(false);
                    return;
                }
                // 8985003051  
                setUserInfo(response.data.user);
                toast.success("email verified successfully");
                navigate("/auth/profile-setup");
            } catch (error) {   
                console.log(error.message)
                toast.error(error.message)
                setIsLoading(false);
            }

    }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
        <motion.div
            initial={{opacity : 0 , scale : 0}}
            animate={{opacity : 1 , scale : 1}}
            exit={{opacity : 0 , scale : 0}}
            transition={{duration : 0.5 , ease : "backInOut"} }
            className="  p-5 z-30 gap-4 relative overflow-hidden flex flex-col  justify-center flex-wrap items-center rounded-xl bg-white "
        >   
            
            <div className="grid  grid-cols-1 lg:grid-cols-2 gap-x-10 w-full place-items-center p-5 lg:p-10">
                <img c src={OTP} height="400" width={"400"} className="h-full hidden lg:block w-full " alt="OTP" />
                <form onSubmit={handleSubmit} className="flex justify-center w-[400px] flex-col gap-4 ">
                    <div className="text-center w-[400px]">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Fempower</h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Please enter the OTP sent to your registered email or phone number to verify your account.
                        </p>
                    </div>
                    <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            placeholder="enter otp"
                            className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                            />
                    <button type="submit" className="w-full flex items-center justify-center bg-blue-500 text-white py-2 hover:bg-blue-600">
                        {isLoading ? <div className="w-[25px] h-[25px] rounded-full border-[3px] border-gray-200 border-t-black animate-spin duration-500" /> : "send"}
                    </button>
                </form>
            </div>
        </motion.div>
    </div>
  )
}

export default VerifyEmail