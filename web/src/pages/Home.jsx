import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import Footer from '../components/Footer';

const slideImages = [
    {
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
        title: 'Harika Lezzetler',
    },
    {
        url: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop',
        title: 'Sağlıklı Seçenekler',
    },
    {
        url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070&auto=format&fit=crop',
        title: 'Geleneksel Tatlar',
    },
    {
        url: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=2070&auto=format&fit=crop',
        title: 'Hızlı ve Pratik Öğünler',
    }
];

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Box sx={{ width: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: { xs: 4, md: 8 }, pb: 8 }}>
            {/* Welcome Text Section */}
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 }, px: 2 }}>
                <Typography 
                    variant="h2" 
                    component="h1" 
                    sx={{ 
                        fontWeight: '800', 
                        mb: 3, 
                        color: 'primary.main', 
                        fontFamily: "'Inter', sans-serif",
                        fontSize: { xs: '2.5rem', md: '4rem' },
                        letterSpacing: '-1px'
                    }}
                >
                    RecipeChef'e Hoşgeldiniz
                </Typography>
                <Typography 
                    variant="h4" 
                    color="text.secondary" 
                    sx={{ 
                        maxWidth: '800px', 
                        margin: '0 auto', 
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1.6,
                        fontWeight: 400
                    }}
                >
                    Dünyanın dört bir yanından en lezzetli tarifleri keşfedin. Ne pişireceğinizi bilemiyorsanız, rastgele bir tarif bulabilir veya elinizdeki malzemelerle harikalar yaratabilirsiniz.
                </Typography>
            </Box>

            {/* Slider Section */}
            <Box sx={{ 
                position: 'relative', 
                width: { xs: '95%', md: '80%' }, 
                height: { xs: '400px', sm: '400px', md: '500px' }, 
                borderRadius: '30px', 
                objectPosition: "center",
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
                {slideImages.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === currentIndex ? 1 : 0,
                            transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            backgroundImage: `url(${slide.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            pb: { xs: 4, md: 8 }
                        }}
                    >
                        <Box sx={{ 
                            background: 'rgba(0, 0, 0, 0.4)', 
                            backdropFilter: 'blur(8px)',
                            padding: '12px 40px', 
                            borderRadius: '50px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', fontFamily: "'Inter', sans-serif", fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                                {slide.title}
                            </Typography>
                        </Box>
                    </Box>
                ))}

                {/* Slider Controls */}
                <IconButton 
                    onClick={prevSlide}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: { xs: '10px', md: '30px' },
                        transform: 'translateY(-50%)',
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)', transform: 'translateY(-50%) scale(1.1)' },
                        transition: 'all 0.2s',
                        width: { xs: 40, md: 60 },
                        height: { xs: 40, md: 60 }
                    }}
                >
                    <MdArrowBackIosNew size={24} />
                </IconButton>

                <IconButton 
                    onClick={nextSlide}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: { xs: '10px', md: '30px' },
                        transform: 'translateY(-50%)',
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)', transform: 'translateY(-50%) scale(1.1)' },
                        transition: 'all 0.2s',
                        width: { xs: 40, md: 60 },
                        height: { xs: 40, md: 60 }
                    }}
                >
                    <MdArrowForwardIos size={24} />
                </IconButton>

                {/* Dots indicator */}
                <Box sx={{
                    position: 'absolute',
                    bottom: '30px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1.5
                }}>
                    {slideImages.map((_, index) => (
                        <Box 
                            key={index} 
                            onClick={() => setCurrentIndex(index)}
                            sx={{
                                width: index === currentIndex ? '40px' : '12px',
                                height: '12px',
                                borderRadius: '6px',
                                backgroundColor: index === currentIndex ? 'primary.main' : 'rgba(255,255,255,0.6)',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default Home;