import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, CircularProgress, Typography, InputAdornment } from '@mui/material';
import { IoIosSearch } from "react-icons/io";
import { searchFoodsByName } from '../../store/slices/AppSlice';
import RecipeGrid from '../RecipeGrid';

function SearchByName() {
    const [query, setQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const dispatch = useDispatch();
    const { searchedFoodsByName, searchNameLoading } = useSelector((state) => state.app);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setHasSearched(true);
            dispatch(searchFoodsByName(query));
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
                    label="Tarif Adı Girin" 
                    variant="outlined" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    sx={{ width: { xs: '100%', sm: '400px', fontSize: '1.2rem' } }}
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
                    disabled={searchNameLoading}
                    sx={{ height: '56px', px: 4 }}
                >
                    Ara
                </Button>
            </Box>

            {searchNameLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {hasSearched && searchedFoodsByName && searchedFoodsByName.length > 0 ? (
                        <RecipeGrid recipes={searchedFoodsByName} />
                    ) : (
                        hasSearched && searchedFoodsByName && searchedFoodsByName.length === 0 && (
                            <Typography sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'text.secondary', fontSize: '1.2rem' }}>
                                "{query}" ile eşleşen bir tarif bulunamadı. Lütfen farklı bir arama yapın.
                            </Typography>
                        )
                    )}
                    
                    {!hasSearched && (
                        <Typography sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'text.secondary', fontSize: '1.2rem' }}>
                            Arama yapmak için yukarıdaki alana bir tarif ismi girin.
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
}

export default SearchByName;