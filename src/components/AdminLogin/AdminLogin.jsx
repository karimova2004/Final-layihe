
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (username === "" && password === "") {
      alert("Daxil olundu!");
      navigate("/admin-dashboard"); 
    } else {
      alert("Yanlış loqin və ya parol!");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
};

export default AdminLogin;
