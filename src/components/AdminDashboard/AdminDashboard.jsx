
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; 

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [coins, setCoins] = useState([]);
  const [isAddCoinOpen, setIsAddCoinOpen] = useState(false);
  const [newCoin, setNewCoin] = useState({ name: "", value: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3001/coins")
      .then((response) => {
        const fetchedCoins = response.data.slice(0, 2);
        setCoins(fetchedCoins);
      })
      .catch((error) => {
        console.error("Error fetching coins:", error);
      });
  }, []);

  const addCoin = () => {
    setCoins([...coins, { id: coins.length + 1, ...newCoin }]);
    setNewCoin({ name: "", value: "" });
    setIsAddCoinOpen(false);
  };

  const deleteCoin = (id) => {
    setCoins(coins.filter((coin) => coin.id !== id));
  };

  const handleEditCoin = (coin) => {
    navigate("/edit-coin", { state: coin });
  };

  const navigateToAddCoin = () => {
    navigate("/add-coin");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Admin Dashboard</h2>

      <div className="coin-list">
        {coins.map((coin) => (
          <div key={coin.id} className="coin-item">
            <div className="coin-info">
              <img
                src={`https://www.coingecko.com/en/coins/${coin.id}/image`} 
                alt={coin.name}
              />
              <span>{coin.name} - {coin.value}</span>
            </div>
            <div>
              <button
                onClick={() => handleEditCoin(coin)}  
              >
                Edit
              </button>
              <button onClick={() => deleteCoin(coin.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-coin-section">
        <button
          onClick={navigateToAddCoin}
          className="add-coin-btn"
        >
          +
        </button>
        <span className="add-coin-text">Add New Coin</span>
      </div>

      {isAddCoinOpen && (
        <div className="add-coin-form">
          <h3>Add New Coin</h3>
          <div>
            <input
              type="text"
              placeholder="Coin Name"
              value={newCoin.name}
              onChange={(e) => setNewCoin({ ...newCoin, name: e.target.value })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Coin Value"
              value={newCoin.value}
              onChange={(e) => setNewCoin({ ...newCoin, value: e.target.value })}
            />
          </div>
          <button onClick={addCoin}>Add Coin</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
