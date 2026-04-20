import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobBoard = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });

            // Call the OpenCage Geocoding API
            try {
              const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e1380dc6169547da989fae606a5e1362`
              );
                console.log(response.data);
                
              const cityComponent = response.data.results[0]?.components.city ||
                                    response.data.results[0]?.components.town ||
                                    response.data.results[0]?.components.village;

              setCity(cityComponent || "City not found");
            } catch (error) {
              setError("Unable to retrieve city data.");
            }
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {location ? (
        <p>Your location: Latitude: {location.lat}, Longitude: {location.lng}</p>
      ) : (
        <p>Fetching location...</p>
      )}
      {city && <p>Your city: {city}</p>}
    </div>
  );
};

export default JobBoard;
