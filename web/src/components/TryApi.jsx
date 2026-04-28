import React, { useEffect } from 'react'
import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;
function TryApi() {
    useEffect(() => {
        getRecipes();
    }, [])

    
    const getRecipes = async () => {
       try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=chicken&number=10&apiKey=${API_KEY}`
        );
        console.log(response.data)
       } catch (error) {
        console.log(error);
       }

    }
    return (
        <div>a</div>
    )
}

export default TryApi