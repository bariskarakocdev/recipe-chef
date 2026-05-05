import React from 'react'
import { useSelector } from 'react-redux'
import RecipeCard from '../components/Card'

function Favorites() {
  const favorites = useSelector((state) => state.favorite.favorites)
  const user = useSelector((state) => state.auth.user)

  return (
    <div className='favorites-page' style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Favori Yemeklerim ❤️</h2>
      
      {!user && (
        <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'gray' }}>
          Favorilerinizi görmek için lütfen giriş yapın.
        </p>
      )}

      {user && favorites.length === 0 && (
        <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'gray' }}>
          Henüz hiç favori yemeğiniz yok. Tarif Ara sayfasından beğendiğiniz yemekleri kaydedebilirsiniz!
        </p>
      )}

      {user && favorites.length > 0 && (
        <div className="recipes-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} props={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites