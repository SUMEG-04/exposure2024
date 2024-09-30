import React from 'react';
import '../../styles/FeatureList.css'; // Importing the CSS file for styling
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Icon for ambulance services
import FastfoodIcon from '@mui/icons-material/Fastfood'; // Icon for cafeteria
import EmergencyIcon from '@mui/icons-material/FlashOn'; // Icon for emergency room
import LocalParkingIcon from '@mui/icons-material/LocalParking'; // Icon for parking
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'; // Icon for pharmacy
import WifiIcon from '@mui/icons-material/Wifi'; // Icon for wifi

const FeatureList = ({ features }) => {
  return (
    <div className="feature-list">
      <h2>Hospital Features</h2>
      <ul className="feature-items">
        {features.ambulance_services && (
          <li className="feature-item">
            <LocalHospitalIcon className="feature-icon" />
            <span>Ambulance Services</span>
          </li>
        )}
        {features.cafeteria && (
          <li className="feature-item">
            <FastfoodIcon className="feature-icon" />
            <span>Cafeteria</span>
          </li>
        )}
        {features.emergency_room && (
          <li className="feature-item">
            <EmergencyIcon className="feature-icon" />
            <span>Emergency Room</span>
          </li>
        )}
        {features.parking.available && (
          <li className="feature-item">
            <LocalParkingIcon className="feature-icon" />
            <span>Parking (Capacity: {features.parking.capacity} cars)</span>
          </li>
        )}
        {features.pharmacy && (
          <li className="feature-item">
            <LocalPharmacyIcon className="feature-icon" />
            <span>Pharmacy</span>
          </li>
        )}
        {features.wifi && (
          <li className="feature-item">
            <WifiIcon className="feature-icon" />
            <span>Wi-Fi ({features.wifi})</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeatureList;
