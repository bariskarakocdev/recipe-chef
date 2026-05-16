import React, { useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetails } from '../store/slices/AppSlice';
import { Box, Typography, Card, CardMedia, CardContent, Divider, Chip, List, ListItem, ListItemText, Checkbox, ListItemIcon, Tooltip } from '@mui/material';

// Kalp butonu icin
import { toggleFavorite } from '../store/slices/FavoriteSlice';
import { toast } from 'react-toastify';
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import Button from '@mui/material/Button';

function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { currentRecipe, recipeLoading } = useSelector((state) => state.app);
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorite.favorites);

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  // Eğer veri yükleniyorsa veya tarif henüz gelmediyse yükleniyor animasyonu göster
  if (recipeLoading || !currentRecipe) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      </Box>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === currentRecipe.id);

  const handleToggleFavorite = () => {
    if (!user) {
      toast.warning("Favorilere eklemek veya çıkarmak için giriş yapmalısınız!");
      return;
    }
    dispatch(toggleFavorite({
      recipe: currentRecipe,
      userId: user.uid,
      isAdding: !isFavorite
    }));
  };

  // Besin değerlerini ayıklama
  let calories, protein, fat, carbs, sugar;
  if (currentRecipe?.nutrition?.nutrients) {
    const nutrients = currentRecipe.nutrition.nutrients;
    calories = nutrients.find(n => n.name === "Calories");
    protein = nutrients.find(n => n.name === "Protein");
    fat = nutrients.find(n => n.name === "Fat");
    carbs = nutrients.find(n => n.name === "Carbohydrates");
    sugar = nutrients.find(n => n.name === "Sugar");
  }
console.log(currentRecipe.healthScore)
  // Günlük önerilen değerler (gram cinsinden) — yüzde hesaplama için
  const dailyValues = {
    protein: 50,
    carbs: 300,
    fat: 65,
    sugar: 50,
  };

  // Bar verileri
  const nutrientBars = [
    { key: 'protein', label: 'Protein',      emoji: '🥩', data: protein, color: '#4caf50', gradient: 'linear-gradient(90deg, #43a047, #66bb6a)' },
    { key: 'carbs',   label: 'Karbonhidrat',  emoji: '🍞', data: carbs,   color: '#ff9800', gradient: 'linear-gradient(90deg, #fb8c00, #ffa726)' },
    { key: 'fat',     label: 'Yağ',           emoji: '🥑', data: fat,     color: '#2196f3', gradient: 'linear-gradient(90deg, #1e88e5, #42a5f5)' },
    { key: 'sugar',   label: 'Şeker',         emoji: '🍬', data: sugar,   color: '#e91e63', gradient: 'linear-gradient(90deg, #d81b60, #ec407a)' },
  ].filter(n => n.data); // Sadece verisi olanları göster

  return (
    <Box sx={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <button onClick={() => navigate(-1)} style={{padding:"5px 10px", marginBottom:"10px",backgroundColor:'orange',color:'white',border:'none',borderRadius:'5px', display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:"3px"}}>
      <FaArrowLeft />Geri Dön
    </button>
      {/* ÜST KISIM: KAHRAMAN ALANI (Hero Section) */}
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 4, boxShadow: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', md: '50%' }, objectFit: 'cover' }}
          image={currentRecipe.image || 'https://via.placeholder.com/500x300'}
          alt={currentRecipe.title}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, padding: '2rem' }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            {currentRecipe.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip label={`${currentRecipe.readyInMinutes} Dakika`} color="primary" variant="outlined" />
            <Chip label={`${currentRecipe.servings} Porsiyon`} color="secondary" variant="outlined" />
            {currentRecipe.healthScore ? (<Chip label={`Sağlık Puanı: ${currentRecipe.healthScore}`} color="success" variant="outlined" />) : (<Chip label={`Sağlık Puanı: Belirtilmemiş`} color="success" variant="outlined" />)}
          </Box>

          {/* Besin Değerleri — Tek Kalın Stacked Bar */}
          {(calories || nutrientBars.length > 0) && (() => {
            const totalGrams = nutrientBars.reduce((sum, n) => sum + n.data.amount, 0);
            return (
              <Box sx={{ mb: 3, p: 2.5, bgcolor: '#fafafa', borderRadius: 3, border: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                    Besin Değerleri (Porsiyon Başına)
                  </Typography>
                  {calories && (
                    <Chip
                      label={`🔥 ${Math.round(calories.amount)} kcal`}
                      sx={{ fontWeight: 'bold', fontSize: '0.95rem', bgcolor: '#fff3e0', color: '#e65100' }}
                    />
                  )}
                </Box>

                {/* Tek kalın stacked bar */}
                <Box sx={{
                  width: '100%',
                  height: 32,
                  bgcolor: '#e0e0e0',
                  borderRadius: 4,
                  overflow: 'hidden',
                  display: 'flex',
                }}>
                  {nutrientBars.map(({ key, label, emoji, data, color }, idx) => {
                    const pct = totalGrams > 0 ? (data.amount / totalGrams) * 100 : 0;
                    return (
                      <Tooltip
                        key={key}
                        title={`${emoji} ${label}: ${Math.round(data.amount)}${data.unit} (%${Math.round(pct)})`}
                        arrow
                        placement="top"
                      >
                        <Box key={key}
                          sx={{
                            width: `${pct}%`,
                            height: '100%',
                            bgcolor: color,
                            transition: 'width 1s ease-in-out',
                            borderRight: idx < nutrientBars.length - 1 ? '2px solid #fafafa' : 'none',
                            cursor: 'pointer',
                          }}
                        />
                      </Tooltip>
                    );
                  })}
                </Box>

                {/* Legend */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mt: 2, justifyContent: 'center' }}>
                  {nutrientBars.map(({ key, label, emoji, data, color }) => {
                    const pct = totalGrams > 0 ? Math.round((data.amount / totalGrams) * 100) : 0;
                    return (
                      <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                        <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
                        <Typography variant="body2" fontWeight="600">
                          {emoji} {label}: {Math.round(data.amount)}{data.unit} (%{pct})
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })()}

          <Typography variant="body1" color="text.secondary">
            <span dangerouslySetInnerHTML={{ __html: currentRecipe.summary?.substring(0, 300) + "..." }}></span>
          </Typography>

          <Box sx={{ mt: '10px' }}>
            <Button
              variant="contained"
              color="error"
              startIcon={isFavorite ? <FaBookmark /> : <CiBookmark />}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
            </Button>

          </Box>
        </CardContent>
      </Card>

      {/* ALT KISIM: DETAYLAR (İçindekiler ve Yapılışı) */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

        {/* Sol Sütun: Malzemeler */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
            İçindekiler
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {currentRecipe.extendedIngredients?.map((ingredient, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon>
                  <Checkbox edge="start" />
                </ListItemIcon>
                <ListItemText primary={ingredient.original} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Sağ Sütun: Yapılışı */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
            Nasıl Yapılır?
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {currentRecipe.instructions ? (
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              {/* API HTML formatında gönderdiği için direkt renderlıyoruz */}
              <span dangerouslySetInnerHTML={{ __html: currentRecipe.instructions }}></span>
            </Typography>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Bu tarif için adım adım yapılış bilgisi bulunamadı.
            </Typography>
          )}
        </Box>

      </Box>
    </Box>
  );
}

export default Recipe;