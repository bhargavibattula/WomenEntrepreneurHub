import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { apiClient } from '../lib/api-clinet';
import { HOST } from '../utils/constants';

const JobApplicationPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    salary: '',
    location: '',
    employmentType: '' 
  });

  const getJob = async () => {
    try {
      const response = await apiClient.get(`/api/job/get-job/${id}`, { withCredentials: true });
      setJob(response.data.job);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load job details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form data:", formData);
  };

  if (loading) {
    return <div>Fetching job details...</div>;
  }

  return (
    <div className="container max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
  {/* Job Details Section */}
  
  {/* Job Details Section */}
  <div className="container max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-lg">
  {/* Job Title and Category */}
  <div className="flex flex-col items-start space-y-2">
    <h1 className="text-4xl font-semibold text-gray-800">{job?.title}</h1>
    <p className="text-xl font-medium text-blue-500">{job?.category}</p>
  </div>

  {/* Job Description */}
  <div className="mt-4">
    <p className="text-lg text-gray-700">{job?.description}</p>
  </div>

  {/* Employer Section */}
  <div className="mt-6">
    <h2 className="text-2xl font-semibold text-gray-800">About the Employer:</h2>
    <div className="flex items-center mt-4">
      <img
        src={`${HOST}/${job?.employer?.profileImage}`}
        alt="Employer"
        className="w-24 h-24 rounded-full shadow-lg"
      />
      <ul className="ml-6 space-y-1">
        <li className="font-medium text-gray-800">Name: {job?.employer?.name}</li>
        <li className="font-medium text-gray-800">Email: {job?.employer?.email}</li>
        <li className="font-medium text-gray-800">Mobile: {job?.employer?.contactInfo?.phone}</li>
      </ul>
    </div>
  </div>

  {/* Salary Section */}
  <div className="mt-6">
    <h2 className="text-2xl font-semibold text-gray-800">Salary: {job?.salary}</h2>
  </div>

  {/* Location Section */}
  <div className="mt-6">
    <h2 className="text-2xl font-normal text-black">Location: {job?.city}</h2>
</div>

</div>


  {/* Apply Section */}
  <div className="mt-10">
    <h2 className="ml-32 text-3xl text-normal blue-600 font-">Apply for this Job</h2>
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-6 space-y-6">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block font-medium text-left text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Job Title"
          required
        />
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block font-medium text-left text-gray-700">
          Job Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Job Description"
          required
        />
      </div>

      {/* Category Input */}
      <div>
        <label htmlFor="category" className="block font-medium text-left text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Job Category"
          required
        />
      </div>

      {/* Salary Input */}
      <div>
        <label htmlFor="salary" className="block font-medium text-left text-gray-700">
          Salary
        </label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Salary"
          required
        />
      </div>

      {/* Location Input */}
      <div>
        <label htmlFor="location" className="block font-medium text-left text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Job Location"
          required
        />
      </div>

      {/* Employment Type Dropdown */}
      <div>
        <label htmlFor="employmentType" className="block font-medium text-left text-gray-700">
          Employment Type
        </label>
        <select
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select Employment Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  </div>
</div>

  );
};

export default JobApplicationPage;
