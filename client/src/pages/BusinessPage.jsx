// src/BusinessPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../lib/api-clinet';
import { GET_ALL_BUSINESS, HOST } from '../utils/constants';
import { toast } from 'react-toastify';

const BusinessPage = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [submittedRatings, setSubmittedRatings] = useState([]);
  const {id} = useParams();
  const [business ,setBusiness] = useState(null);

  const handleReviewChange = (e) => setReview(e.target.value);
  const handleRatingChange = (value) => setRating(value);

  const handleSubmitReview = () => {
    if (review && rating > 0) {
      const newReview = { text: review, rating };
      setReviews([...reviews, newReview]);
      setReview('');
      setRating(0);
    } else {
      alert("Please provide a review and a rating.");
    }
  };

  const handleSubmitRating = () => {
    if (rating > 0) {
      setSubmittedRatings([...submittedRatings, rating]);
      setRating(0);
    } else {
      alert("Please select a rating before submitting.");
    }
  };

  const getBusiness = async () => [
    await apiClient.get(`${GET_ALL_BUSINESS}/${id}`,{withCredentials : true})
    .then((response ) => {setBusiness(response.data) , console.log(response.data)})
    .catch((error) => toast.error(error.message))
  ]

  useEffect(() => {
    getBusiness();
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-r from-BLUE-500 to-indigo-600 p-6 text-black">
      <div className="max-w-2xl mx-auto bg-white  rounded-lg p-10 mt-10">
        {/* Business Name and Image */}
        <div className="mb-6 text-center">
          <h1 className="text-5xl font-semibold">{business?.name}</h1>
          <img 
            src={`${HOST}/${business?.logoImage}`}
            alt="Business"
            className="rounded-lg mt-4 mb-4"
          />
          <p>
            {business?.description}
          </p>
        </div>

        {/* Rating Card */}
        <div className="bg-gray-100  rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold">Rate Us</h2>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`cursor-pointer text-2xl ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => handleRatingChange(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
          <button
            className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={handleSubmitRating}
          >
            Submit Rating
          </button>
        </div>

        {/* Comments Card with Light Blue Gradient */}
        <div className="bg-gradient-to-r from-light-blue-300 to-light-blue-500 p-4 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold">Leave a Review</h2>
          <textarea
            className="border rounded-lg p-2 w-full h-24"
            value={review}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
          />
          <button
            className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={handleSubmitReview}
          >
            Submit Review
          </button>
        </div>

        {/* Display Submitted Reviews */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">User Reviews</h2>
          {reviews.length > 0 ? (
            <ul className="list-disc pl-5">
              {reviews.map((rev, index) => (
                <li key={index} className="mb-4 bg-gray-100 p-3 rounded-lg shadow-sm">
                  <p>{rev.text}</p>
                  <p className="text-yellow-500">Rating: {"★".repeat(rev.rating)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* Contact Us Card */}
        <div className="bg-gray-100 shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p>Email: {business?.owner?.email}</p>
          <p>Phone: {business?.owner?.contactInfo?.phone}</p>
          <p>Address: {business?.owner?.contactInfo?.address?.country + " ,  " + business?.owner?.contactInfo?.address?.state}</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;