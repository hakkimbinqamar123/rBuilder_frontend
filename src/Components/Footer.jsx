import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Divider } from '@mui/material';
import { FaWhatsapp, FaInstagramSquare, FaTelegram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Footer() {
    return (
        <Box 
            component="footer" 
            sx={{ 
                bgcolor: 'rgba(7, 11, 25, 0.95)',
                color: 'grey.300', 
                py: 6, 
                mt: 'auto',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box 
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: '20%',
                    width: '300px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, #00f2fe, transparent)',
                    opacity: 0.5
                }} 
            />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                    
                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h5" color="white" fontWeight={800} gutterBottom className="text-gradient-primary">
                            rBuilder
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Empowering job seekers to build professional, ATS-optimized resumes in minutes.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            {[FaWhatsapp, FaInstagramSquare, FaTelegram].map((Icon, index) => (
                                <IconButton 
                                    key={index}
                                    sx={{ 
                                        color: 'text.secondary', 
                                        transition: 'all 0.3s ease',
                                        '&:hover': { 
                                            color: '#00f2fe',
                                            transform: 'translateY(-3px)'
                                        } 
                                    }}
                                >
                                    <Icon size={20} />
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="white" fontWeight={600} gutterBottom>
                            Contact Us
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1, color: 'text.secondary' }}>
                            <FaPhoneAlt size={14} color="#00f2fe" />
                            <Typography variant="body2" sx={{ transition: 'color 0.3s', '&:hover': { color: 'white', cursor: 'pointer' } }}>+91 98765 43210</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: 'text.secondary' }}>
                            <FaEnvelope size={14} color="#00f2fe" />
                            <Typography variant="body2" sx={{ transition: 'color 0.3s', '&:hover': { color: 'white', cursor: 'pointer' } }}>info@rbuilder.com</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                        <Typography variant="body2" color="text.secondary">
                            © {new Date().getFullYear()} rBuilder. All Rights Reserved.
                        </Typography>
                        <Typography variant="caption" display="block" color="primary.dark" sx={{ mt: 1, letterSpacing: '1px' }}>
                            DESIGNED WITH PRECISION
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;
