import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AddCoin from "./components/Addcoin/AddCoin";
import UploadImage from "./components/UploadImage";
import CoinDetail from "./components/CoinDetail"; 
import EditCoin from "./components/EditCoin"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-coin" element={<AddCoin />} />
        <Route path="/upload-image" element={<UploadImage />} />
        <Route path="/coin/:coinId" element={<CoinDetail />} /> 
        <Route path="/edit-coin" element={<EditCoin />} />
      </Routes>
    </Router>
  );
};

export default App;
