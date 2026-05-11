import React from 'react';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

// Yeni importlar
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/slices/FavoriteSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RecipeCard(props) {
    // SearchRecipe.jsx'ten gönderilen prop yapısı: <RecipeCard props={recipe} />
    const { image, title, summary, id, extendedIngredients, pricePerServing } = props.props;

    // Redux bağlantıları
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const favorites = useSelector((state) => state.favorite.favorites);

    // Bu yemeğin favorilerde olup olmadığını Redux'tan (hafızadan) kontrol et
    // Eğer listemizde bu id'ye sahip bir yemek varsa true, yoksa false döner.
    const isFavorite = favorites.some((fav) => fav.id === id);

    // Kalbe tıklandığında çalışacak fonksiyon
    const handleToggleFavorite = () => {
        // Eğer kullanıcı giriş yapmamışsa uyar ve işlemi durdur
        if (!user) {
            toast.warning("Favorilere eklemek veya çıkarmak için giriş yapmalısınız!");
            return;
        }

        // Giriş yapmışsa Redux üzerinden Firebase'e gönder
        dispatch(toggleFavorite({
            recipe: props.props,
            userId: user.uid,
            isAdding: !isFavorite // Eğer zaten favoriyse false (çıkar) yolla, değilse true (ekle) yolla
        }));
    };

    return (
        <div className='card'>
            <MuiCard sx={{ maxWidth: 500, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    sx={{ height: 250 }} // Increased image height a bit too for better proportion
                    image={image || 'https://via.placeholder.com/345x140'} // Resim yoksa placeholder
                    title={title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" noWrap title={title} sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    
                    {/* İçindekiler Etiketleri (Chips) */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 0.8, 
                        mt: 1.5, 
                        maxHeight: '72px', // Adjusted for slightly larger chips
                        overflow: 'hidden' 
                    }}>
                        {extendedIngredients && extendedIngredients.length > 0 ? (
                            extendedIngredients.map((ingredient, index) => (
                                <Chip 
                                    key={index} 
                                    label={ingredient.name} 
                                    size="medium" 
                                    variant="outlined" 
                                    sx={{ borderRadius: '6px', fontSize: '1.2rem', padding: '10px 4px' }} 
                                />
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.2rem' }}>
                                İçindekiler bilgisi yok.
                            </Typography>
                        )}
                    </Box>
                </CardContent>
                <CardActions sx={{ padding: '16px' }}>
                    <Button size="large" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} onClick={() => navigate('/tarif/' + id)}>
                        Detayları Gör
                    </Button>
                    <Button size="large" color="error" sx={{ ml: 'auto' }} onClick={handleToggleFavorite}>
                        {isFavorite ?
                            <FaBookmark fontSize={28} /> : <CiBookmark fontSize={28} />}
                    </Button>
                </CardActions>
            </MuiCard>
        </div>
    )
}

export default RecipeCard;