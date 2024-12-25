import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CoinDetail = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [newName, setNewName] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/coins/${coinId}`)
      .then((response) => {
        setCoin(response.data);
        setNewName(response.data.name);
        setNewValue(response.data.value);
      })
      .catch((error) => {
        console.error("Sikkə məlumatları alınarkən xəta:", error);
      });
  }, [coinId]);

  const handleSave = () => {
    setIsSaving(true);

    axios.put(`http://localhost:3001/coins/${coinId}`, { name: newName, value: newValue })
      .then((response) => {
        setIsSaving(false);
        navigate(`/coin/${coinId}`);  
      })
      .catch((error) => {
        console.error("Xəta baş verdi:", error);
        setIsSaving(false);
      });
  };

  return (
    <div>
      {coin ? (
        <div>
          <h2>Edit Coin</h2>
          <form>
            <div>
              <label>Coin Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <label>Coin Value</label>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CoinDetail;
