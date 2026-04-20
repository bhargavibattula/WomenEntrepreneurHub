import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { apiClient } from '../lib/api-clinet';
import SkeletonCard from '../components/SkeletonCard';
import { GET_ALL_BUSINESSES, HOST } from '../utils/constants';

function Business() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch all businesses when the component mounts
  const getAllBusinesses = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${GET_ALL_BUSINESSES}`, { withCredentials: true });
      setBusiness(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

 
  const searchBusinesses = async () => {
    try {
      setLoading(true);

      
      let queryString = `/api/business/search?`;


      if (searchTerm) {
        queryString += `name=${searchTerm}&`;
      }

      if (category) {
        queryString += `category=${category}&`;
      }

      console.log(queryString); 

   
      const response = await apiClient.get(queryString, { withCredentials: true });
      setBusiness(response.data);
      console.log(">>>>>>>",business)
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

 
  useEffect(() => {
    getAllBusinesses();
  }, []);

  useEffect(() => {
    searchBusinesses();
  }, [searchTerm, category]);

  return (
    <div>
      <div className='h-[300px] flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-full p-5 bg-white/20 backdrop-blur-sm'>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            className='text-xl font-bold tracking-wider sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
            Business Showcase
          </motion.span>
        </div>
      </div>

      <div className="flex flex-col bg-white">
        <div className="flex flex-wrap items-center justify-between w-full gap-5 px-3 py-5 sm:px-9 md:px-32 lg:px-80">
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 w-full p-2 tracking-widest transition duration-200 border border-gray-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400"
            >
              <option value="">All Categories</option>
              <option value="">Select a Category</option>
              <option value="Success Stories">Success Stories</option>
              <option value="Leadership Development">Leadership Development</option>
              <option value="Business Funding">Business Funding</option>
              <option value="Marketing Strategies">Marketing Strategies</option>
              <option value="Networking Tips">Networking Tips</option>
              <option value="Work-Life Balance">Work-Life Balance</option>
              <option value="Mentorship">Mentorship</option>
              <option value="Personal Branding">Personal Branding</option>
              <option value="Startup Guides">Startup Guides</option>
              <option value=">Social Impact">Social Impact</option>
              <option value="Tech Innovation">Tech Innovation</option>
              <option value="Financial Literacy">Financial Literacy</option>
              <option value="Scaling Your Business">Scaling Your Business</option>
              <option value="E-commerce Strategies">E-commerce Strategies</option>
              <option value=">Women in Leadership">Women in Leadership</option>
              <option value="Self-Care for Entrepreneurs">Self-Care for Entrepreneurs</option>
            </select>
          </div>


          <div className="flex items-center justify-center">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              type="text"
              className="flex-1 w-full p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <button className="border text-2xl focus:ring-4 h-[100%] px-2 py-2 text-blue-700 bg-white">
              <AiOutlineSearch />
            </button>
          </div>
        </div>

        {loading ? (
          <SkeletonCard />
        ) : (
          <div className="flex flex-wrap w-full gap-5 px-3 py-5 sm:px-9 md:px-32 lg:px-80">
            {business.map((item) => (
              <div key={item._id} className="bg-white basis-[400px] shadow-md p-6 transition-transform transform hover:scale-[101%]">
                <img
                  src={`${HOST}/${item.logoImage}`}
                  alt={item.name}
                  className="object-contain mx-auto mb-4 h-52 w-52"
                />
                <p className="mb-2 text-2xl font-bold text-blue-800">{item.name}</p>
                <p className="mb-4 text-gray-700">{item.description}</p>
                <p className="text-sm font-semibold text-gray-500">Category: {item.category}</p>
                <p className="text-sm font-semibold text-gray-500">
                  Location: {item.location?.state}, {item.location?.country}
                </p>
                <p className="mt-4">
                  <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Visit Website
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Business;
