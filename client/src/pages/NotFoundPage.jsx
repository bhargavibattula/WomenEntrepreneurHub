import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import sadface from '../assets/sadface.gif'

const NotFoundPage = () => {
  
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-blue-50">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        
        <motion.img
          src={sadface}
          alt="404 Not Found"
          className="w-1/3 mb-5 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }}
        />
        
        
        <h1 className="text-6xl font-normal text-blue-600">404</h1>
        <p className="text-2xl mt-4">Oops! Page not found.</p>
        <p className="text-gray-500 mb-6">The page you are looking for does not exist.</p>

       
        <Link to="/">
          <motion.button
            className="mt-6 bg-blue-600 text-white font-normal py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Go Back Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
