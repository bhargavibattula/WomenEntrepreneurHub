import {motion , AnimatePresence} from "framer-motion"
import womenbg from "../assets/ARTICLE.jpg"
import {Link} from "react-router-dom"
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { apiClient } from "../lib/api-clinet";
import { toast } from "react-toastify";
const tags = [
    "Entrepreneurship",
    "Leadership",
    "Business Strategy",
    "Startups",
    "Funding",
    "Networking",
    "Marketing",
    "Women in Tech",
    "Personal Branding",
    "Work-Life Balance",
    "Mentorship",
    "Investment",
    "Finance",
    "Innovation",
    "Social Impact",
    "Diversity and Inclusion",
    "Sustainability",
    "Scaling Business",
    "Legal Advice"
];

function PostArticle() {
    const [selectedTags , setSelectedTags] = useState([]);
    const [showSection , setShowSection ] = useState(false);
    const [loading , setLoading] = useState(false);
    const [title , setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")
    const handleSelectTag = (i) => {
        if(selectedTags.indexOf(tags[i]) === -1) {
            setSelectedTags([...selectedTags , tags[i]])
        }
    }

    const handleSubmit  = async (e) => {
        e.preventDefault();
        console.log({title , content , selectedTags , category})
        try {
            setLoading(true);
            const response = await apiClient.post("api/resource/create-resource",{title , content , tags : selectedTags , category} , {withCredentials : true})

            if(!response.data.success) {
                toast.error(response.data.message);
                setLoading(false);
                return;
            }

            toast.success("Successfully posted article")
            setCategory("select category")
            setContent('');
            setTitle("")
            setLoading(false);
            setSelectedTags([]);
            setShowSection(false);
        } catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <div>
        <div className='h-[300px] flex items-center justify-center'>
            <div className='w-full p-5 flex items-center bg-white/20 backdrop-blur-sm justify-center'>
                <motion.span initial={{opacity : 0 , y : 50}} animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}} className='sm:mr-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider' >Share Your knowledge</motion.span>
            </div>
        </div>

            <div className="bg-white flex items-center justify-center flex-wrap p-5 gap-10 ">
                <motion.div
                    initial={{opacity : 0 , y : 50}}
                    animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
                className="bg-white flex flex-col gap-5  border-gray-200 p-6 basis-[450px]">
                    <div className="overflow-hidden flex items-center justify-center">
                        <img
                            src={womenbg}
                            className="object-cover w-full bg-cover bg-center" 
                            alt="women empowerment"
                            />
                    </div>
                </motion.div>

                <motion.div 
                    initial={{opacity : 0 , y : 50}}
                    animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
                    className="login bg-white p-3 items-center gap-2 justify-center basis-[350px] flex flex-col "
                >

                    <span className=" text-xl tracking-wider w-full  capitalize text-center"> CREATE AN ARTICLE </span>
                    <div  className="flex flex-col gap-4 w-full">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            required
                            placeholder="title"
                            className="w-full placeholder-shown tracking-wider p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="search"
                            className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                        >
                            <option value="">select category</option>
                            <option value="success-stories">Success Stories</option>
                            <option value="leadership-development">Leadership Development</option>
                            <option value="business-funding">Business Funding</option>
                            <option value="marketing-strategies">Marketing Strategies</option>
                            <option value="networking-tips">Networking Tips</option>
                            <option value="work-life-balance">Work-Life Balance</option>
                            <option value="mentorship">Mentorship</option>
                            <option value="personal-branding">Personal Branding</option>
                            <option value="startup-guides">Startup Guides</option>
                            <option value="social-impact">Social Impact</option>
                            <option value="tech-innovation">Tech Innovation</option>
                            <option value="financial-literacy">Financial Literacy</option>
                            <option value="scaling-business">Scaling Your Business</option>
                            <option value="ecommerce">E-commerce Strategies</option>
                            <option value="women-in-leadership">Women in Leadership</option>
                            <option value="self-care">Self-Care for Entrepreneurs</option>
                        </select>
                        <span className="text-xs text-gray-700 text-opacity-50">select tags related to your article that all users can easly search your article </span>
                        <div className="flex flex-wrap gap-2 p-2 ">
                            {tags.map((tag , index) => (
                                <div key={index} onClick={() => handleSelectTag(index)} className={`rounded-lg ${selectedTags.indexOf(tag) !== -1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"} border px-2 py-1 cursor-pointer  hover:bg-blue-500 hover:text-white border-blue-400 text-[0.5em]`}>{tag}</div>
                            ))}
                        </div>

                        <button onClick={() => setShowSection(true)} type="submit" className="w-full flex items-center justify-center bg-blue-500 text-white py-2 hover:bg-blue-600">
                            {"NEXT"}
                        </button>
                    </div>
                </motion.div>

               {showSection && (
                    <div className="fixed  z-30 top-0 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm flex lg:p-24 lg:px-28 xl:p-28 xl:pb-16 xl:px-80">
                        <>
                            <motion.div
                                initial={{opacity : 0 , scale : 0}}
                                animate={{opacity : 1 , scale : 1}}
                                exit={{opacity : 0 , scale : 0}}
                                transition={{duration : 0.5 , ease : "backInOut"} }
                                className="flex-1 relative overflow-scroll  bg-gradient-to-t from-white via-white to-blue-100  flex flex-col flex-wrap items-center rounded-xl bg-white "
                            >
                                <div className="flex flex-row w-full  items-center justify-end">
                                    <button onClick={() => setShowSection(false)}><AiOutlineClose/></button>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col p-10 w-full items-center  gap-10">
                                    <textarea 
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Provide content here..." 
                                        value={content}
                                        className="outline-none w-full h-96 p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-800 placeholder-gray-500 resize-none"
                                        cols="30" 
                                        rows="10">
                                    </textarea>
                                    <button  type="submit" className="w-full flex items-center  justify-center bg-blue-500 text-white py-2 hover:bg-blue-600">
                                         { loading ? <div className="w-[25px] h-[25px] rounded-full border-[2px] border-dotted border-gray-200 border-t-black animate-spin transition-all duration-200" /> : "POST ARTICLE"}
                                    </button>
                                </form>
                                
                            </motion.div>
                            
                        </>
                    </div>
               )}

            </div>

    </div>
  )
}

export default PostArticle