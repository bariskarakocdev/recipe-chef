import React from 'react'
import Grid from "@mui/material/Grid";
import RecipeCard from '../Card';
function SearchByRandom({recipes}) {
    return (
        <Grid container spacing={4} sx={{ mt: 2, px: { xs: 2, md: 4 } }}>
            {recipes && recipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <RecipeCard props={recipe} />
                </Grid>
            ))}
        </Grid>
    )
}

export default SearchByRandom