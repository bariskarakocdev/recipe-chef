import React, { useState } from 'react'
import '../css/Auth.css'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa6";
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import App from '../App';
import { setLogin, setUser } from '../store/slices/AuthSlice';
import { fetchFavorites } from '../store/slices/FavoriteSlice';


function Auth() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = useSelector((state) => state.auth.isLogin)
  const user = useSelector((state) => state.auth.user)

  const removeInput = () => {
    setEmail("");
    setPassword("");

  }
  const createUserWithEmail = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      console.log(user);
      console.log("kullanıcı oluştu.")
      toast.success("Başarıyla kayıt edildi");
      removeInput();

    } catch (error) {
      toast.error(error.message);
      removeInput()
    }


  }
  const signInWithEmail = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      toast.success("Başarıyla giriş yapıldı");
      removeInput();
      navigate("/");
      dispatch(setLogin(true));
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        metadata: {
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime
        }
      }));
      dispatch(fetchFavorites(user.uid));
    } catch (error) {
      toast.error(error.message);
      removeInput();
    }
  }
  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const user = response.user;
      const token = credential.accessToken;
      navigate("/");
      toast.success("Başarıyla Giriş Yapıldı");
      dispatch(setLogin(true));
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        metadata: {
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime
        }
      }));
      dispatch(fetchFavorites(user.uid));


    } catch (error) {
      toast.error(error.message)
    }
  }
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
        <button className="google-button" onClick={signInWithGoogle}>
          <FaGoogle />
          Google ile giriş yap
        </button>
        <button className="login-button" onClick={signInWithEmail}>
          Giriş Yap
        </button>

        <button className="register-button" onClick={createUserWithEmail}>
          Kayıt Ol
        </button>
      </div>
    </div>
  )
}

export default Auth