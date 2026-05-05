import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';
import { ToastContainer } from 'react-toastify';

// Redux ve Firebase bağlantıları
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { setLogin, setUser } from './store/slices/AuthSlice';
import { fetchFavorites } from './store/slices/FavoriteSlice';

function App() {
  const dispatch = useDispatch();

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
          metadata: currentUser.metadata // Bilgilerim sayfası için
        })); // Sadece gereken verileri yollamak Redux uyarısını engeller
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
    <>
      <ToastContainer/>
      <Header />
      <RouterConfig />
      <div style={{ textAlign: 'center', padding: '2rem', position: 'fixed', bottom: 0, width: '100%' }}>
        <p>RecipeChef © 2026 - Tüm hakları saklıdır</p>
      </div>
    </>
  )
}

export default App
