import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCoin.css";

const AddCoin = () => {
  const navigate = useNavigate();

  const [coinData, setCoinData] = useState({
    name: "",
    nominal: "",
    year: "",
    price: "",
    country: "",
    metal: "",
    sealQuality: "",
    weight: "",
    frontImage: "",
    backImage: "",
    shortDescription: "",
    longDescription: ""
  });

  const handleChange = (e) => {
    setCoinData({
      ...coinData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Yeni sikkə məlumatları saxlanıb.");
    navigate("/admin-dashboard");
  };

  const handleCancel = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="add-coin-container">
      <h3 className="admin-panel-title">Admin panel</h3>
      <form className="add-coin-form">
        <div className="left-side">
          <div className="form-group">
            <label>Coin name</label>
            <input
              type="text"
              name="name"
              value={coinData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Face value</label>
            <input
              type="text"
              name="nominal"
              value={coinData.nominal}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Year of issue</label>
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
        </div>

        <div className="right-side">
          <div className="form-group">
            <label>Short description</label>
            <textarea
              name="shortDescription"
              value={coinData.shortDescription}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Long description</label>
            <textarea
              name="longDescription"
              value={coinData.longDescription}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Quality of the coin</label>
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
        </div>

        <div className="bottom-side">
          <div className="form-group">
            <label>Link to obverse image</label>
            <input
              type="file"
              name="frontImage"
              value={coinData.frontImage}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Link to reverse image</label>
            <input
              type="file"
              name="backImage"
              value={coinData.backImage}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCoin;
