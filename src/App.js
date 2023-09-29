import React, { useState } from "react";
import axios from "axios";
import "./PincodeReverseLookup.css"; // Import your CSS file

const PincodeReverseLookup = () => {
  const [pincode, setPincode] = useState("");
  const [details, setDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];

      if (data && data.PostOffice && data.PostOffice.length > 0) {
        const firstPostOffice = data.PostOffice[0];

        setDetails({
          city: firstPostOffice.Block,
          district: firstPostOffice.District,
          state: firstPostOffice.State,
          postal: firstPostOffice.Pincode,
        });
      } else {
        console.error("No data found for the given pincode");
        setDetails(null);
      }
    } catch (error) {
      console.error(error);
      setDetails(null);
    }
  };

  return (
    <div className="pincode-reverse-lookup">
      <h1>Pincode Reverse Lookup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pincode">Enter Pincode:</label>
        <input
          type="text"
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="input-text" // Add a class for styling
          placeholder="Enter pincode"
        />
        <button type="submit" className="submit-button">
          Get Details
        </button>
      </form>
      {details && (
        <div className="result-box">
          <p>City: {details.city}</p>
          <p>District: {details.district}</p>
          <p>State: {details.state}</p>
          <p>Postal: {details.postal}</p>
        </div>
      )}
    </div>
  );
};

export default PincodeReverseLookup;
