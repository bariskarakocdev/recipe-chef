import React from 'react';
import RecipeCard from './Card';
import '../css/RecipeGrid.css';

/**
 * Ortak grid bileşeni — CSS Grid ile repeat(auto-fill, minmax) kullanır.
 * Tüm search sekmelerinde aynı grid'i tekrar tekrar yazmak yerine bu bileşen kullanılır.
 */
function RecipeGrid({ recipes, searchedIngredients }) {
    if (!recipes || recipes.length === 0) return null;

    return (
        <div className="recipe-grid">
            {recipes.map((recipe) => (
                <div className="recipe-grid__item" key={recipe.id}>
                    <RecipeCard props={recipe} searchedIngredients={searchedIngredients} />
                </div>
            ))}
        </div>
    );
}

export default RecipeGrid;
