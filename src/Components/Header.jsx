import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Container, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Header() {
    const theme = useTheme();
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Builder', path: '/resume' },
        { label: 'LaTeX', path: '/latex-editor' },
        { label: 'History', path: '/history' }
    ];

    return (
        <AppBar 
            position="fixed" 
            elevation={scrolled ? 4 : 0}
            sx={{
                bgcolor: scrolled ? 'rgba(7, 11, 25, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : '1px solid transparent',
                transition: 'all 0.3s ease-in-out',
                zIndex: theme.zIndex.drawer + 1,
                py: scrolled ? 0 : 1,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 70 }}>
                    <Box display="flex" alignItems="center" component={Link} to="/" sx={{ textDecoration: 'none' }}>
                        <Box
                            component="img"
                            src="/src/assets/Images/resume.png"
                            alt="Logo"
                            sx={{ 
                                width: 40, 
                                mr: 1.5,
                                filter: 'drop-shadow(0 0 8px rgba(0,242,254,0.6))',
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'rotate(-10deg) scale(1.1)' }
                            }}
                            onError={(e) => { e.target.style.display = 'none' }}
                        />
                        <Typography 
                            variant="h5" 
                            component="div" 
                            className="text-gradient-primary"
                            sx={{ 
                                fontWeight: 800, 
                                letterSpacing: '-0.5px',
                            }}
                        >
                            rBuilder
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path || (item.path === '/resume' && location.pathname === '/form');
                            return (
                                <Button 
                                    key={item.label}
                                    component={Link} 
                                    to={item.path}
                                    sx={{
                                        color: isActive ? 'primary.main' : 'text.secondary',
                                        fontWeight: isActive ? 700 : 500,
                                        px: 2.5,
                                        py: 1,
                                        borderRadius: '12px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: isActive ? '60%' : '0%',
                                            height: '3px',
                                            background: isActive ? 'linear-gradient(90deg, #00f2fe, #4facfe)' : 'transparent',
                                            borderRadius: '2px',
                                            transition: 'width 0.3s ease',
                                        },
                                        '&:hover': {
                                            color: 'primary.light',
                                            bgcolor: 'rgba(0, 242, 254, 0.05)',
                                            '&::before': {
                                                width: '60%',
                                                background: 'rgba(0, 242, 254, 0.5)'
                                            }
                                        }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                        {isAuthenticated ? (
                            <Button 
                                onClick={logout}
                                variant="outlined"
                                color="primary"
                                sx={{ borderRadius: '12px', ml: 2 }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button 
                                component={Link}
                                to="/login"
                                variant="contained"
                                color="primary"
                                sx={{ borderRadius: '12px', ml: 2, background: 'linear-gradient(90deg, #00f2fe, #4facfe)' }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
