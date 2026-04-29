import React from 'react';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function RecipeCard(props) {
    // SearchRecipe.jsx'ten gönderilen prop yapısı: <RecipeCard props={recipe} />
    // O yüzden props.props ile recipe objesine ulaşıyoruz
    const { image, title, summary, id, extendedIngredients } = props.props;

    return (
        <div className='card'>
            <MuiCard sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image || 'https://via.placeholder.com/345x140'} // Resim yoksa placeholder
                    title={title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {/* API'den gelen HTML içeriğini temizleyip sadece metni gösterir */}
                        <span dangerouslySetInnerHTML={{ __html: summary?.substring(0, 150) + "..." }}></span>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Detayları Gör</Button>
                </CardActions>
            </MuiCard>
        </div>
    )
}

export default RecipeCard;