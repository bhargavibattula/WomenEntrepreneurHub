import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { apiClient } from '../lib/api-clinet';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    employmentType: "",
    location: "",
    category: "",
    country: "",
    state: "",
    city: ""
  });
  
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch countries from GeoNames API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://api.geonames.org/countryInfoJSON?username=deepak32'); 
        const data = await response.json();
        setCountries(data.geonames);
        console.log(data.geonames);
        
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    const fetchStates = async () => {
      console.log(">>>>>>>>",formData.country);
      
      if (formData.country) {
        try {
          const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${formData.country}&username=deepak32`);
          const data = await response.json();
          setStates(data.geonames);
          console.log(">>>>>>>>>>>",data.geonames);
          
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      }
    };

    fetchStates();
  }, [formData.country]);

  // Fetch cities when a state is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        try {
          const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${formData.state}&username=deepak32`);
          const data = await response.json();
          setCities(data.geonames);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };

    fetchCities();
  }, [formData.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('salary', formData.salary);
    formDataToSend.append('employmentType', formData.employmentType);
    formDataToSend.append('country', formData.country); 
    formDataToSend.append('state', formData.state); 
    formDataToSend.append('city', formData.city); 
    formDataToSend.append('category', formData.category);
    
    try {
      const response = await apiClient.post(`/api/job/create-job`, formData, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setFormData({
        title: "",
        description: "",
        salary: "",
        employmentType: "",
        location: "",
        category: "",
        country: "",
        state: "",
        city: ""
      });
      setStates([]);
      setCities([]); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className='h-[300px] flex items-center justify-center'>
        <div className='flex items-center justify-center w-full p-5 bg-white/20 backdrop-blur-sm'>
          <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ ease: "easeInOut", duration: 0.3 }} className='text-xl font-bold tracking-wider sm:mr-20 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>Create a Job</motion.span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-10 p-5 bg-white gap-x-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ ease: "easeInOut", duration: 0.3 }}
          className="bg-white p-3 items-center gap-2 justify-center basis-[600px] flex flex-col"
        >
          <span className="w-full text-xl tracking-wider text-center capitalize mr-52">Enter Job Detail</span>

          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <div className="mb-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="p-2 tracking-wider transition duration-200 border border-gray-300 w-96 placeholder-shown focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                placeholder="Your Job Title"
                required
              />
            </div>

            <div className="mb-4">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 tracking-wider transition duration-200 border border-gray-300 w-96 placeholder-shown focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                placeholder="Description"
                required
              />
            </div>

            <div className="mb-4">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="p-2 tracking-wider transition duration-200 border border-gray-300 w-96 placeholder-shown focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                required
              >
                <option value="">Select Country</option>
                {countries.map(country => (
        <option key={country.geonameId} value={country.geonameId}>
            {country.countryName}
        </option>
    ))}
              </select>
            </div>

            <div className="mb-4">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="p-2 tracking-wider transition duration-200 border border-gray-300 w-96 placeholder-shown focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                required
              >
                <option value="">Select State</option>
                {states?.map(state => (
                  <option key={state.geonameId} value={state.geonameId}>{state.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="p-2 tracking-wider transition duration-200 border border-gray-300 w-96 placeholder-shown focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                required
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city.geonameId} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <textarea
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="p-2 tracking-wider transition duration-200 border border-gray-300 w-96 placeholder-shown focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                placeholder="Salary"
                required
              />
            </div>

            <div className="mb-4">
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="p-2 tracking-wider transition duration-200 border border-gray-300 w-96 placeholder-shown focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                required
              >
                <option value="">Select Employment Type</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            <div className="mb-4">
              <textarea
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-2 tracking-wider transition duration-200 border border-gray-300 w-96 placeholder-shown focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400"
                placeholder="Category"
                required
              />
            </div>

            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg w-80">Create</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateJob;
