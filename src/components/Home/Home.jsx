
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [countries] = useState([
    "Canada", "America", "United Kingdom", "Germany", "France"
  ]);
  const [metals] = useState(["gold", "nickel", "silver"]);
  const [qualityOptions] = useState(["proof", "uncirculated"]);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    country: "",
    metal: "",
    quality: "",
    priceFrom: "",
    priceTo: "",
    yearFrom: "",
    yearTo: "",
  });
  const [isAdvancedFilterVisible, setIsAdvancedFilterVisible] = useState(false);

  useEffect(() => {
    const searchParams = {
      ...filters,
      name: searchText,
    };

    axios
      .get("http://localhost:3001/coins", { params: searchParams })
      .then(response => {
        setCoins(response.data);
      })
      .catch(error => {
        console.error("Axtarışda səhv baş verdi", error);
      });
  }, [filters, searchText]);

  const handleLoginClick = () => {
    navigate("/admin-login");
  };

  const handleSearch = () => {
    setSearchText(searchText.trim());
  };

  const handleCoinClick = (coinId) => {
    navigate(`/coin/${coinId}`); 
  };

  return (
    <div className="homepage">
      <h1>Homepage</h1>

      <div className="search-bar">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search coins..."
        />
        <button onClick={handleSearch}>Search</button>
        <button className="login-button" onClick={handleLoginClick}>
          Login
        </button>
      </div>

      <div>
        <span
          className="advanced-filter-text"
          onClick={() => setIsAdvancedFilterVisible(!isAdvancedFilterVisible)}
        >
          Advanced Filter
        </span>

        {isAdvancedFilterVisible && (
          <div className="advanced-filter-container">
            <div>
              <label htmlFor="country">Issuing Country</label>
              <select
                id="country"
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              >
                <option value="">Select Country</option>
                {countries.map((country, idx) => (
                  <option key={idx} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="metal">Metal</label>
              <select
                id="metal"
                value={filters.metal}
                onChange={(e) => setFilters({ ...filters, metal: e.target.value })}
              >
                <option value="">Select Metal</option>
                {metals.map((metal, idx) => (
                  <option key={idx} value={metal}>
                    {metal}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quality">Quality of the Coin</label>
              <select
                id="quality"
                value={filters.quality}
                onChange={(e) => setFilters({ ...filters, quality: e.target.value })}
              >
                <option value="">Select Quality</option>
                {qualityOptions.map((quality, idx) => (
                  <option key={idx} value={quality}>
                    {quality}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="From"
                value={filters.priceFrom}
                onChange={(e) => setFilters({ ...filters, priceFrom: e.target.value })}
              />
              <input
                type="number"
                placeholder="To"
                value={filters.priceTo}
                onChange={(e) => setFilters({ ...filters, priceTo: e.target.value })}
              />
            </div>

            <div>
              <label>Year of Issue</label>
              <input
                type="number"
                placeholder="From"
                value={filters.yearFrom}
                onChange={(e) => setFilters({ ...filters, yearFrom: e.target.value })}
              />
              <input
                type="number"
                placeholder="To"
                value={filters.yearTo}
                onChange={(e) => setFilters({ ...filters, yearTo: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      <div className="coins-section">
        {coins.slice(0, 3).map((coin) => ( 
          <div
            className="coin-card"
            key={coin.id}
            onClick={() => handleCoinClick(coin.id)} 
          >
            <h2>{coin.name}</h2>
            <p>{coin.value}</p>
            <img
              src={coin.image_url}
              alt={coin.name}
              style={{ width: "100px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
