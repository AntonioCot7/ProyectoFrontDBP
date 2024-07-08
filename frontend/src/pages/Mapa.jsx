import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


const Mapa = () => {
  const navigate = useNavigate();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  const mapContainerStyle = {
    height: "610px",
    width: "100%",
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPosition({ lat, lng });
    setCenter({ lat, lng });
  };

  const handleConfirm = () => {
    if (selectedPosition) {
      localStorage.setItem('selectedPosition', JSON.stringify(selectedPosition));
      navigate(-1); // Navega a la página anterior
    }
  };

  return (
    <div>
      <Header bgColor="bg-customBlue" />
      <div className="flex">
        <Sidebar role="Medico" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customBlue" />
        <div className="flex-grow p-6 bg-white">
          <LoadScript googleMapsApiKey="AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={10}
              onClick={handleMapClick}
            >
              {selectedPosition && (
                <Marker position={selectedPosition} />
              )}
            </GoogleMap>
          </LoadScript>
          <button
            onClick={handleConfirm}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-blue-700 transition duration-200 mx-auto block"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
