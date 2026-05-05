import React from 'react'
import { Routes, Route, Navigate} from "react-router-dom"
import Home from '../pages/Home'
import SearchRecipe from '../pages/SearchRecipe'
import AskRecipe from '../pages/AskRecipe'
import Information from '../pages/Information'
import Favorites from '../pages/Favorites'
import Auth from '../pages/Auth'
import Recipe from '../pages/Recipe'




function RouterConfig() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tarif-ara" element={<SearchRecipe />} />
            <Route path="/tarif-sor" element={<AskRecipe />} />
            <Route path="/favorilerim" element={<Favorites />} />
            <Route path="/bilgilerim" element={<Information />} />
            <Route path="/giris-yap" element={<Auth />} />
            <Route path="/tarif/:id" element={<Recipe />} />
        
            {/* Tanımsız bir link girilirse Anasayfaya yönlendir (Catch-all) */}
            <Route path="*" element={<Navigate to="/" />} />

        </Routes>
    
    </>
  )
}

export default RouterConfig