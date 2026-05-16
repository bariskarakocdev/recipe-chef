import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, CircularProgress, Typography, InputAdornment, Autocomplete } from '@mui/material';
import { IoIosSearch } from "react-icons/io";
import { searchFoodsByContent } from '../../store/slices/AppSlice';
import RecipeGrid from '../RecipeGrid';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

function SearchByContent() {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const dispatch = useDispatch();
    const { searchedFoodsByContent, searchContentLoading } = useSelector((state) => state.app);

    useEffect(() => {
        let active = true;

        if (inputValue.trim() === '') {
            setOptions([]);
            return undefined;
        }

        const fetchIngredients = async () => {
            try {
                const response = await axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${inputValue}&number=10&apiKey=${API_KEY}`);
                if (active) {
                    setOptions(response.data);
                }
            } catch (error) {
                console.error("Error fetching ingredient suggestions:", error);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchIngredients();
        }, 300);

        return () => {
            active = false;
            clearTimeout(timeoutId);
        };
    }, [inputValue]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedIngredients.length > 0) {
            setHasSearched(true);
            const formattedIngredients = selectedIngredients
                .map(i => typeof i === 'string' ? i.trim() : i.name)
                .join(',');
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
                <Autocomplete
                    multiple
                    freeSolo
                    options={options}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                    filterOptions={(x) => x}
                    value={selectedIngredients}
                    onChange={(event, newValue) => {
                        setSelectedIngredients(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    sx={{ width: { xs: '100%', sm: '500px' } }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Malzemeleri Girin (Örn: elma, un, şeker)"
                            variant="outlined"
                            sx={{ '& .MuiInputBase-root': { fontSize: '1.2rem' }, label: { fontSize: '1.2rem' } }}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <>
                                        <InputAdornment position="start" sx={{ pl: 1 }}>
                                            <IoIosSearch size={24} />
                                        </InputAdornment>
                                        {params.InputProps.startAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
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
                <>
                    {hasSearched && searchedFoodsByContent && searchedFoodsByContent.length > 0 ? (
                        <RecipeGrid recipes={searchedFoodsByContent} searchedIngredients={selectedIngredients.map(i => typeof i === 'string' ? i.trim().toLowerCase() : i.name.toLowerCase())} />
                    ) : (
                        hasSearched && searchedFoodsByContent && searchedFoodsByContent.length === 0 && (
                            <Typography sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'text.secondary', fontSize: '1.2rem' }}>
                                Girilen malzemeleri içeren bir tarif bulunamadı. Lütfen farklı malzemelerle tekrar deneyin.
                            </Typography>
                        )
                    )}

                    {!hasSearched && (
                        <Typography sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'text.secondary', fontSize: '1.2rem' }}>
                            Arama yapmak için yukarıdaki alana elinizdeki malzemeleri girin.
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
}

export default SearchByContent;