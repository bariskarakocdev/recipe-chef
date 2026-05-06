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
            <MuiCard sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image || 'https://via.placeholder.com/345x140'} // Resim yoksa placeholder
                    title={title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" noWrap title={title}>
                        {title}
                    </Typography>
                    
                    {/* İçindekiler Etiketleri (Chips) - En fazla 2 satır görünecek şekilde sınırlandırıldı */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 0.5, 
                        mt: 1, 
                        maxHeight: '52px', // 2 satır chip yüksekliği (24px chip + 4px boşluk + 24px chip)
                        overflow: 'hidden' 
                    }}>
                        {extendedIngredients && extendedIngredients.length > 0 ? (
                            extendedIngredients.map((ingredient, index) => (
                                <Chip 
                                    key={index} 
                                    label={ingredient.name} 
                                    size="small" 
                                    variant="outlined" 
                                    sx={{ borderRadius: '4px' }} // Dikdörtgen görünüm için
                                />
                            ))
                        ) : (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                İçindekiler bilgisi yok.
                            </Typography>
                        )}
                    </Box>
                    
                    {/* Fiyat bilgisi istenirse buraya eklenebilir */}
                    {pricePerServing && (
                        <Typography variant="subtitle1" sx={{ display: 'block', mt: 3, color: 'success.main', fontWeight: 'bold' }}>
                            Porsiyon Başına: ${(pricePerServing / 100).toFixed(2)}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => navigate('/tarif/' + id)}>Detayları Gör</Button>
                    <Button size="small" color="error" onClick={handleToggleFavorite}>
                        {isFavorite ?
                            <FaBookmark fontSize={20} /> : <CiBookmark fontSize={20} />}
                    </Button>
                </CardActions>
            </MuiCard>
        </div>
    )
}

export default RecipeCard;