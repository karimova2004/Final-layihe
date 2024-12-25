import React from "react";
import { Link } from "react-router-dom";

const CoinsList = ({ coins }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {coins.map((coin) => (
        <div key={coin.id} style={{ width: "200px", textAlign: "center" }}>
          <Link to={`/coin/${coin.id}`}>
            <img src={coin.image_url} alt={coin.name} style={{ width: "100%" }} />
            <h3>{coin.name}</h3>
            <p>{coin.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CoinsList;


