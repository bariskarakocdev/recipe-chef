import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';
import { ToastContainer } from 'react-toastify';

// Redux ve Firebase bağlantıları
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { setLogin, setUser } from './store/slices/AuthSlice';
import { fetchFavorites } from './store/slices/FavoriteSlice';
import Footer from './components/Footer';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  const recipeLoading = useSelector((state) => state.app.recipeLoading);


  useEffect(() => {
    // Firebase dinleyicisi: Sayfa yenilendiğinde kullanıcının oturumu varsa burası otomatik çalışır
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Oturum açıksa Redux'ı güncelle
        dispatch(setLogin(true));
        dispatch(setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          metadata: {
            creationTime: currentUser.metadata.creationTime,
            lastSignInTime: currentUser.metadata.lastSignInTime
          } // Sadece gereken verileri yollamak Redux uyarısını engeller
        })); 
        dispatch(fetchFavorites(currentUser.uid)); // Favorileri getir
      } else {
        // Oturum kapalıysa temizle
        dispatch(setLogin(false));
        dispatch(setUser(null));
      }
    });

    // Uygulama kapandığında veya değiştiğinde dinleyiciyi durdur
    return () => unsubscribe();
  }, [dispatch]);

 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ToastContainer/>
      <Header />
      
      <div style={{ flexGrow: 1 }}>
        <RouterConfig />
      </div>
       
       {/* Yükleme durumu varsa (sayfanın neresinde olursa olsun) ortada bir spinner göster */}
       {(loading || recipeLoading) && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
          <CircularProgress color='success' size={60} />
        </div>
       )}
      
      <div style={{ backgroundColor: "gray", marginTop: "auto" }}>
        <Footer/>
      </div>
    </div>
  )
}

export default App
