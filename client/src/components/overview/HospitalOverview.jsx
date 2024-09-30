import React from 'react';
import '../../styles/HospitalOverview.css'; // Importing the CSS file for styling

const HospitalOverview = ({ capacity }) => {
  // Calculate percentage of bed occupancy
  const totalBedsOccupiedPercentage = (capacity.occupied_beds / capacity.total_beds) * 100;
  const icuBedsOccupiedPercentage = (capacity.occupied_icu_beds / capacity.icu_beds) * 100;
  const availableBeds = capacity.total_beds - capacity.occupied_beds;
  const availableICUBeds = capacity.icu_beds - capacity.occupied_icu_beds;

  return (
    <div className="bed-capacity-overview">
      <h2>Hospital Bed Capacity Overview</h2>
      <div className="capacity-item">
        <h3>Total Beds</h3>
        <p>{capacity.total_beds} beds available</p>
        <p>{availableBeds} beds available ({Math.round(100 - totalBedsOccupiedPercentage)}% free)</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${totalBedsOccupiedPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="capacity-item">
        <h3>ICU Beds</h3>
        <p>{capacity.icu_beds} ICU beds available</p>
        <p>{availableICUBeds} ICU beds available ({Math.round(100 - icuBedsOccupiedPercentage)}% free)</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${icuBedsOccupiedPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HospitalOverview;
