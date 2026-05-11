import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Grid, CircularProgress, Typography, InputAdornment } from '@mui/material';
import { IoIosSearch } from "react-icons/io";
import { searchFoodsByContent } from '../../store/slices/AppSlice';
import RecipeCard from '../Card';

function SearchByContent() {
    const [ingredients, setIngredients] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const dispatch = useDispatch();
    const { searchedFoodsByContent, searchContentLoading } = useSelector((state) => state.app);

    const handleSearch = (e) => {
        e.preventDefault();
        if (ingredients.trim()) {
            setHasSearched(true);
            const formattedIngredients = ingredients.split(',').map(i => i.trim()).join(',');
            dispatch(searchFoodsByContent(formattedIngredients));
        }
    };

    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <Box 
                component="form" 
                onSubmit={handleSearch} 
                sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    mb: 4, 
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' }
                }}
            >
                <TextField 
                    label="Malzemeleri Girin (Örn: elma, un, şeker)" 
                    variant="outlined" 
                    value={ingredients} 
                    onChange={(e) => setIngredients(e.target.value)} 
                    sx={{ width: { xs: '100%', sm: '500px', fontSize: '1.4rem', label: {fontSize: '1.2rem'} } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <IoIosSearch /> 
                            </InputAdornment>
                        ),
                    }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    disabled={searchContentLoading}
                    sx={{ height: '56px', px: 4 }}
                >
                    Ara
                </Button>
            </Box>

            {searchContentLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={4} sx={{ mt: 2, px: { xs: 2, md: 4 } }}>
                    {hasSearched && searchedFoodsByContent && searchedFoodsByContent.length > 0 ? (
                        searchedFoodsByContent.map((recipe) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <RecipeCard props={recipe} />
                            </Grid>
                        ))
                    ) : (
                        hasSearched && searchedFoodsByContent && searchedFoodsByContent.length === 0 && (
                            <Typography sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'text.secondary', fontSize: '1.2rem' }}>
                                "{ingredients}" içeren bir tarif bulunamadı. Lütfen farklı malzemelerle tekrar deneyin.
                            </Typography>
                        )
                    )}
                    
                    {!hasSearched && (
                        <Typography sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'text.secondary', fontSize: '1.2rem' }}>
                            Arama yapmak için yukarıdaki alana elinizdeki malzemeleri virgülle ayırarak girin.
                        </Typography>
                    )}
                </Grid>
            )}
        </Box>
    );
}

export default SearchByContent;