import React from 'react';
import '../../styles/ServiceList.css'; // Importing the CSS file for styling
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Icon for services

const ServiceList = ({ services }) => {
  return (
    <div className="service-list">
      <h2>Our Services</h2>
      <ul className="services-items">
        {services.map((service, index) => (
          <li key={index} className="service-item">
            <MedicalServicesIcon className="service-icon" />
            <span>{service}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
