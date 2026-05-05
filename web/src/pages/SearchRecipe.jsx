import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SearchRecipeTabs from '../components/SearchRecipeTabs';
import '../css/SearchRecipe.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFoods } from '../store/slices/AppSlice';
import RecipeCard from '../components/Card';


function SearchRecipe() {
  const [value, setValue] = useState(0);
  const recipes = useSelector((state) => state.app.foods);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods())
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs className='tabs'
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="İsme Göre" className='tab' />
            <Tab label="İçeriğe Göre" className='tab' />
            <Tab label="Kategoriye Göre" className='tab' />
          </Tabs>
        </Box>
        <SearchRecipeTabs value={value} index={0}>
          <div className="recipes-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
            {recipes && recipes.map((recipe) => (
              <RecipeCard key={recipe.id} props={recipe} />
            ))}
          </div>
        </SearchRecipeTabs>
        <SearchRecipeTabs value={value} index={1}>
          İçeriğe Göre İçerik
        </SearchRecipeTabs>
        <SearchRecipeTabs value={value} index={2}>
          Kategoriye Göre İçerik
        </SearchRecipeTabs>
      </Box>
    </div>
  )
}

export default SearchRecipe