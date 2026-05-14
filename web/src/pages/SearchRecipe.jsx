import { useState, useEffect } from 'react'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import SearchRecipeTabs from '../components/SearchRecipeTabs';
import '../css/SearchRecipe.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFoods } from '../store/slices/AppSlice';

import SearchByRandom from '../components/SearchComponents/SearchByRandom';
import SearchByCategory from '../components/SearchComponents/SearchByCategory';
import SearchByContent from '../components/SearchComponents/SearchByContent';
import SearchByName from '../components/SearchComponents/SearchByName';

// Tab tanımları — yeni bir sekme eklemek için sadece bu diziye ekleme yap
const TAB_CONFIG = [
  { label: 'Rastgele',        Component: SearchByRandom, needsRecipes: true },
  { label: 'İçeriğe Göre',    Component: SearchByContent },
  { label: 'Kategoriye Göre', Component: SearchByCategory },
  { label: 'İsme Göre',       Component: SearchByName },
];

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
            aria-label="recipe search tabs"
          >
            {TAB_CONFIG.map((tab, index) => (
              <Tab label={tab.label} className='tab' key={index} />
            ))}
          </Tabs>
        </Box>

        {TAB_CONFIG.map((tab, index) => {
          const { Component, needsRecipes } = tab;
          return (
            <SearchRecipeTabs value={value} index={index} key={index}>
              <Component {...(needsRecipes ? { recipes } : {})} />
            </SearchRecipeTabs>
          );
        })}
      </Box>
    </div>
  )
}

export default SearchRecipe