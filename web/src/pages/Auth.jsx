import React, { useState } from 'react'
import '../css/Auth.css'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa6";
function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  return (
    <div className="auth">
      <h3 className="auth-title">Giriş Yap / Kaydol</h3>
      <div className="inputs-div">
        <input
          type="text"
          placeholder="Email Adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button className="google-button">
          <FaGoogle />
          Google ile giriş yap
        </button>
        <button className="login-button">
          Giriş Yap
        </button>

        <button className="register-button">
          Kayıt Ol
        </button>
      </div>
    </div>
  )
}

export default Auth