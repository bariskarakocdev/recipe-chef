import './App.css';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';

function App() {
  return (
    <>
      <Header />
      <RouterConfig />
      <div style={{ textAlign: 'center', padding: '2rem', position: 'fixed', bottom: 0, width: '100%' }}>
        <p>RecipeChef © 2026 - Tüm hakları saklıdır</p>
      </div>


    </>
  )
}

export default App
