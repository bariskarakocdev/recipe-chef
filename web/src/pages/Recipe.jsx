import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetails } from '../store/slices/AppSlice';
import { CircularProgress, Box, Typography, Card, CardMedia, CardContent, Divider, Chip, List, ListItem, ListItemText, Checkbox, ListItemIcon } from '@mui/material';

// Kalp butonu icin
import { toggleFavorite } from '../store/slices/FavoriteSlice';
import { toast } from 'react-toastify';
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import Button from '@mui/material/Button';

function Recipe() {
  const { id } = useParams();
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
        <CircularProgress />
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
  let calories, protein, fat, carbs;
  if (currentRecipe?.nutrition?.nutrients) {
    const nutrients = currentRecipe.nutrition.nutrients;
    calories = nutrients.find(n => n.name === "Calories");
    protein = nutrients.find(n => n.name === "Protein");
    fat = nutrients.find(n => n.name === "Fat");
    carbs = nutrients.find(n => n.name === "Carbohydrates");
  }

  return (
    <Box sx={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>

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
            {currentRecipe.healthScore && <Chip label={`Sağlık Puanı: ${currentRecipe.healthScore}`} color="success" variant="outlined" />}
          </Box>

          {/* Besin Değerleri (Eğer varsa) */}
          {(calories || protein || fat || carbs) && (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ width: '100%', mb: 0.5, color: 'text.secondary' }}>Besin Değerleri (Porsiyon Başına)</Typography>
              {calories && <Typography variant="body2" fontWeight="bold">🔥 Kalori: {calories.amount} {calories.unit}</Typography>}
              {protein && <Typography variant="body2" fontWeight="bold">🥩 Protein: {protein.amount} {protein.unit}</Typography>}
              {carbs && <Typography variant="body2" fontWeight="bold">🍞 Karbonhidrat: {carbs.amount} {carbs.unit}</Typography>}
              {fat && <Typography variant="body2" fontWeight="bold">🥑 Yağ: {fat.amount} {fat.unit}</Typography>}
            </Box>
          )}

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