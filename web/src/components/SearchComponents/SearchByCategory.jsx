import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { searchFoodsByCategory } from '../../store/slices/AppSlice';
import RecipeGrid from '../RecipeGrid';

const categories = [
    { value: 'main course', label: 'Ana Yemek' },
    { value: 'side dish', label: 'Garnitür' },
    { value: 'dessert', label: 'Tatlı' },
    { value: 'appetizer', label: 'Başlangıç' },
    { value: 'salad', label: 'Salata' },
    { value: 'bread', label: 'Ekmek' },
    { value: 'breakfast', label: 'Kahvaltılık' },
    { value: 'soup', label: 'Çorba' },
    { value: 'beverage', label: 'İçecek' },
    { value: 'sauce', label: 'Sos' },
    { value: 'snack', label: 'Atıştırmalık' },
];

function SearchByCategory() {
    const [category, setCategory] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const dispatch = useDispatch();
    const { searchedFoodsByCategory, searchCategoryLoading } = useSelector((state) => state.app);

    const handleSearch = (e) => {
        e.preventDefault();
        if (category) {
            setHasSearched(true);
            dispatch(searchFoodsByCategory(category));
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
                <FormControl sx={{ width: { xs: '100%', sm: '500px' } }}>
                    <InputLabel id="category-select-label" sx={{fontSize: '1.2rem'}}>Kategori Seçin</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        label="Kategori Seçin"
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{ fontSize: '1.4rem' }}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.value} value={cat.value} sx={{ fontSize: '1.2rem' }}>
                                {cat.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    disabled={searchCategoryLoading || !category}
                    sx={{ height: '56px', px: 4 }}
                >
                    Ara
                </Button>
            </Box>

            {searchCategoryLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {hasSearched && searchedFoodsByCategory && searchedFoodsByCategory.length > 0 ? (
                        <RecipeGrid recipes={searchedFoodsByCategory} />
                    ) : (
                        hasSearched && searchedFoodsByCategory && searchedFoodsByCategory.length === 0 && (
                            <Typography sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'text.secondary', fontSize: '1.2rem' }}>
                                Seçili kategoride bir tarif bulunamadı. Lütfen farklı bir kategori seçin.
                            </Typography>
                        )
                    )}
                    
                    {!hasSearched && (
                        <Typography sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'text.secondary', fontSize: '1.2rem' }}>
                            Arama yapmak için yukarıdaki menüden bir kategori seçin.
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
}

export default SearchByCategory;