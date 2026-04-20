import { set } from "date-fns";
import {motion} from "framer-motion" 
import { useState } from "react";
import { countriesWithStates } from "../lib/utils";
import image from "../assets/BUSINESSIMAGE.webp"
import { apiClient } from "../lib/api-clinet";
import { AiOutlineDelete } from "react-icons/ai";
import { POST_A_BUSINESS } from "../utils/constants";
import { toast } from "react-toastify";


function CreateBusiness() {
  const [name , setName] = useState("");
  const [description , setDescription] = useState("");
  const [category, setCategory] = useState("Tech Innovation")
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Andhra Pradesh")
  const [loading , setLoading] = useState(false);
  const [logoImage , setLogoImage] = useState(null);
  const [selectedTags , setSelectedTags] = useState([]);
  const tags = [
    'retail', 'restaurant', 'tech', 'consulting', 'manufacturing', 'healthcare',
    'finance', 'education', 'real-estate', 'entertainment', 'automotive', 'hospitality',
    'ecommerce', 'clothing', 'food', 'software', 'startup', 'advisory', 'B2B',
    'logistics', 'medical', 'investment', 'training', 'property', 'media',
    'vehicles', 'hotel', 'travel', 'luxury', 'online-learning', 'services',
    'supply-chain', 'production', 'sales', 'development', 'AI', 'blockchain', 
    'SaaS', 'financial', 'insurance', 'mortgage', 'tourism', 'event', 'repair'
  ];
  const handleSelectTag = (i) => {
    if(selectedTags.indexOf(tags[i]) == -1) {
      setSelectedTags([...selectedTags , tags[i]])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logoImage" , logoImage);
    formData.append("name" , name);
    formData.append("category" , category);
    formData.append("country" , country );
    formData.append("state" , state );
    formData.append("description" , description);
    formData.append("tags" ,selectedTags);
    formData.append("website",website);
    try {
      setLoading(true)
       const response = await apiClient.post(POST_A_BUSINESS,formData , {withCredentials : true});

       if(!response.data.success) {
          toast.error(response.data.message)
          setLoading(false);
          return ;
       }

       setLoading(false);
       toast.success(response.data.message);
       setCategory("")
       setCountry("India")
       setDescription("");
       setLogoImage(null);
       setName("")
       setWebsite("")
       setSelectedTags([]);

    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }

  }
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogoImage(file);
    console.log(file)
  }




  console.log(logoImage)
  return (
    <div>
        <div className='h-[300px] flex items-center justify-center'>
            <div className='w-full p-5 flex items-center bg-white/20 backdrop-blur-sm justify-center'>
                <motion.span initial={{opacity : 0 , y : 50}} animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}} className='sm:mr-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider' >Showcase Your Business</motion.span>
            </div>
        </div>

        <div className="bg-white flex items-center justify-center flex-wrap p-5 gap-x-20 gap-10 ">

                <motion.div 
                    initial={{opacity : 0 , y : 50}}
                    animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
                    className=" bg-white p-3 items-center gap-2 justify-center basis-[600px] flex flex-col "
                >

                    <span className=" text-xl tracking-wider w-full  py-3 capitalize text-center"> CREATE AND SHOWCASE YOUR BUSINESS </span>
                    <form onSubmit={handleSubmit}  className="flex flex-col gap-4 w-full">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            required
                            placeholder="name of business"
                            className="w-full placeholder-shown tracking-wider p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                        />
                        <textarea
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                            type="text"
                            required
                            placeholder="description about your business"
                            className="w-full placeholder-shown tracking-wider p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                        />
                       <span className="text-xs text-gray-700 text-opacity-50">provide your website link (if exits) so that , other can visit</span>
                        <input
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            type="text"
                            required
                            placeholder="link of your website"
                            className="w-full placeholder-shown tracking-wider p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                        />
                        <select name="business-type"
                              className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                              value={category}
                              onChange={(e) => {setCategory(e.target.value)}}
                        >
                          <option value="Success Stories">Success Stories</option>
                          <option value="Leadership Development">Leadership Development</option>
                          <option value="Business Funding">Business Funding</option>
                          <option value="Marketing Strategies">Marketing Strategies</option>
                          <option value="Networking Tips">Networking Tips</option>
                          <option value="Work-Life Balance">Work-Life Balance</option>
                          <option value="Mentorship">Mentorship</option>
                          <option value="Personal Branding">Personal Branding</option>
                          <option value="Startup Guides">Startup Guides</option>
                          <option value="Social Impact">Social Impact</option>
                          <option value="Tech Innovation">Tech Innovation</option>
                          <option value="Financial Literacy">Financial Literacy</option>
                          <option value="Scaling Your Business">Scaling Your Business</option>
                          <option value="E-commerce Strategies">E-commerce Strategies</option>
                          <option value="Women in Leadership">Women in Leadership</option>
                          <option value="Self-Care for Entrepreneurs">Self-Care for Entrepreneurs</option>
                        </select>
                        <span className="text-xs text-gray-700 text-opacity-50">Upload  logo of your website <span className="text-red-500 text-xl"> <sup>*</sup></span>  </span>
                        {logoImage ? (
                          <div className="flex flex-col gap-5">
                            <img className="h-40 w-40" src={URL.createObjectURL(logoImage)} alt="logo" />
                            <button onClick={() => setLogoImage(null)} className=" shadow-lg w-fit  px-3 flex items-center justify-center bg-white py-2 text-red-600" > <AiOutlineDelete/> delete upload</button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-full  placeholder-shown tracking-wider p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"> 
                              <label htmlFor="logoImage" className="cursor-pointer"> 
                              <span className="text-center">upload logo image</span>
                                <input onChange={handleFileChange} id="logoImage" name="logoImage" type="file"  className="hidden"  />
                              </label>
                          </div>
                        )}


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

                        <button onClick={() => setShowSection(true)} type="submit" className="w-full flex items-center justify-center bg-blue-500 text-white py-2 hover:bg-blue-600">
                            { loading ? <div className="w-[25px] h-[25px] rounded-full border-[2px]  border-gray-200 border-t-black animate-spin transition-all duration-200" /> : "CREATE BUSINESS"}
                        </button>
                    </form>
                </motion.div>


                <motion.div
                    initial={{opacity : 0 , y : 50}}
                    animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
                className="bg-white flex flex-col gap-5  border-gray-200 p-6 basis-[450px]">
                    <div className=" flex items-center justify-center">
                        <img
                            src={image}
                            className="object-cover scale-150 bg-cover bg-center" 
                            alt="women empowerment"
                            />
                    </div>
                </motion.div>




            </div>

    
    </div>
  )
}

export default CreateBusiness