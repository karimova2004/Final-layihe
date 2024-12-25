import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EditCoin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [coinData, setCoinData] = useState({
    id: "",
    name: "",
    nominal: "",
    year: "",
    price: "",
    country: "",
    metal: "",
    sealQuality: "",
    weight: "",
    frontImage: null,  
    backImage: null,  
    shortDescription: "",
    longDescription: ""
  });

  useEffect(() => {
    if (location.state) {
      setCoinData(location.state);  
    }
  }, [location.state]);

  const handleChange = (e) => {
    setCoinData({
      ...coinData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setCoinData({
      ...coinData,
      [name]: files[0], 
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
  
      Object.keys(coinData).forEach((key) => {
        formData.append(key, coinData[key]);
      });

      const response = await axios.put(
        `http://localhost:3001/coins/${coinData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        alert("Sikkə məlumatları uğurla yeniləndi.");
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Error updating coin:", error);
      alert("Sikkə məlumatlarını yeniləyərkən xəta baş verdi.");
    }
  };

  const handleCancel = () => {
    navigate("/admin-dashboard"); 
  };

  return (
    <div className="edit-coin-container">
      <h3>Edit {coinData.name}</h3>
      <form className="edit-coin-form">
        <div className="form-group">
          <label>Coin Name</label>
          <input
            type="text"
            name="name"
            value={coinData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Face Value</label>
          <input
            type="text"
            name="nominal"
            value={coinData.nominal}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Year of Issue</label>
          <input
            type="number"
            name="year"
            value={coinData.year}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={coinData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={coinData.country}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Metal</label>
          <input
            type="text"
            name="metal"
            value={coinData.metal}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Seal Quality</label>
          <input
            type="text"
            name="sealQuality"
            value={coinData.sealQuality}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Weight</label>
          <input
            type="text"
            name="weight"
            value={coinData.weight}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Link to Obverse Image</label>
          <input
            type="file"
            name="frontImage"
            onChange={handleImageChange}
          />
        </div>

        <div className="form-group">
          <label>Link to Reverse Image</label>
          <input
            type="file"
            name="backImage"
            onChange={handleImageChange}
          />
        </div>

        <div className="form-group">
          <label>Short Description</label>
          <textarea
            name="shortDescription"
            value={coinData.shortDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Long Description</label>
          <textarea
            name="longDescription"
            value={coinData.longDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditCoin;
