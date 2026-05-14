import React from 'react'
import RecipeGrid from '../RecipeGrid';

function SearchByRandom({recipes}) {
    return (
        <RecipeGrid recipes={recipes} />
    )
}

export default SearchByRandom