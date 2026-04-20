import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import womenbg from "../assets/woemnemp.jpeg";
import { toast } from "react-toastify";
import { useState } from "react";
import { apiClient } from "../lib/api-clinet"; // Fixed import
import { GoogleAuth, LOGIN_ROUTE } from "../utils/constants";
import { useStore } from "../store/index.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase.js";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUserInfo } = useStore();
    const [loginLoading, setLoginLoading] = useState(false);

    const handleSignIn = async () => {
        const provider = new GoogleAuthProvider();
    
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Extract user information
           
          console.log(user);
          
            setEmail(user.email)
            ;
            
            // Send user data to your backend for login
            const response = await apiClient.post(GoogleAuth,{email}, { withCredentials: true });
            console.log(">>>",email)
            if (!response.data.success) {
                toast.error(response.data.message);
                return;
            }
                console.log(response.data);
                
            toast.success(response.data.message);
            if (!response.data.user?.isProfileSetup) {
                navigate("/auth/profile-setup");
                return;
            }
            setUserInfo(response.data.user);
            navigate("/");
        } catch (error) {
            console.error('Error signing in:', error);
            toast.error("Failed to sign in with Google.");
        }
    };

    const validateForm = () => {
        if (!email || !email.endsWith("@gmail.com")) {
            toast.error("Invalid email");
            return false;
        }
        if (!password) {
            toast.error("Enter password");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setLoginLoading(true);
                const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });

                if (!response.data.success) {
                    if (response.data.message === "email not found") {
                        toast.error("Invalid email");
                    } else if (response.data.message === "Incorrect password") {
                        toast.error("Invalid password");
                    } else {
                        toast.error("Network issue");
                    }
                    setLoginLoading(false);
                    return;
                }
                
                toast.success(response.data.message);
                if (response.data.user?.isProfileSetup === false || response.data.user?.isProfileSetup === undefined) {
                    navigate("/auth/profile-setup");
                    setLoginLoading(false);
                    return;
                }
                setUserInfo(response.data.user);
                setLoginLoading(false);
                navigate("/");
            } catch (error) {
                toast.error("Network Issue");
                setLoginLoading(false);
            }
        }
    };

    return (
        <div className=''>
            <div className='h-[300px] flex items-center justify-center'>
                <div className='flex items-center justify-center w-full p-5 bg-white/20 backdrop-blur-sm'>
                    <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ ease: "easeInOut", duration: 0.3 }} className='text-xl font-bold tracking-wider sm:mr-20 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>Member Login</motion.span>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10 p-5 bg-white ">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ ease: "easeInOut", duration: 0.3 }}
                    className="login bg-white p-3 items-center gap-2 justify-center basis-[350px] flex flex-col "
                >
                    <button className="flex items-center justify-between w-full text-xl tracking-wider text-white transition duration-200 bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400" onClick={handleSignIn}>
                        <div className="h-full px-2 py-2 text-blue-700 bg-white border border-black">
                            <AiOutlineGoogle />
                        </div>
                        <div className="flex items-center justify-center flex-1 text-sm">
                            Sign in with Google
                        </div>
                    </button>
                    <span className="flex items-center w-full gap-1 text-sm capitalize"> <hr className="flex-1 text-black" /> or use email to login <hr className="flex-1" /> </span>
                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 transition duration-200 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 transition duration-200 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                        />
                        <button type="submit" className="flex items-center justify-center w-full py-2 text-white bg-blue-500 hover:bg-blue-600">
                            {loginLoading ? <div className="w-[25px] h-[25px] rounded-full border-[3px] border-gray-200 border-t-black animate-spin duration-500" /> : "Login"}
                        </button>
                    </form>
                    <Link to="/" className="text-blue-500 cursor-pointer hover:underline "> I don't know my password </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ ease: "easeInOut", duration: 0.3 }}
                    className="bg-white flex flex-col gap-5 border border-gray-200 shadow-lg p-6 basis-[450px]"
                >
                    <div className="flex items-center justify-center overflow-hidden h-52">
                        <img
                            src={womenbg}
                            className="object-cover w-full bg-center bg-cover"
                            alt="women empowerment"
                        />
                    </div>
                    <h1 className="text-2xl">Get the happiness you deserve</h1>
                    <p>No matter the challenge, you don't have to face it alone - but it’s up to you to take the first step.</p>
                    <Link to={"/auth/register"} className="flex items-center justify-center w-full py-2 text-xl tracking-wider text-white transition duration-200 bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400">
                        Join us
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

export default Login;
