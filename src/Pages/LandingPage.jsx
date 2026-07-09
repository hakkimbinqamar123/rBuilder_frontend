import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Card, CardContent, useTheme } from '@mui/material';
import { MdSpeed, MdCheckCircleOutline, MdDashboard, MdDownload, MdArrowForward } from 'react-icons/md';

function LandingPage() {
    const theme = useTheme();

    const features = [
        {
            title: "Lightning Fast",
            desc: "Intuitive and beginner-friendly design — create your resume in minutes with guided steps.",
            icon: <MdSpeed size={48} color={theme.palette.primary.main} />,
            delay: 'stagger-1'
        },
        {
            title: "ATS Optimized",
            desc: "Our templates are optimized for Applicant Tracking Systems, ensuring your resume reaches employers.",
            icon: <MdCheckCircleOutline size={48} color={theme.palette.secondary.main} />,
            delay: 'stagger-2'
        },
        {
            title: "Premium Templates",
            desc: "Choose from professional templates tailored for every job field and career level.",
            icon: <MdDashboard size={48} color="#f59e0b" />,
            delay: 'stagger-3'
        },
        {
            title: "Instant Export",
            desc: "Download your resume instantly in PDF format and start applying for your dream job today.",
            icon: <MdDownload size={48} color="#10b981" />,
            delay: 'stagger-4'
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pt: 10,
                }}
            >
                {/* Abstract Background Elements */}
                <Box sx={{ position: 'absolute', top: '10%', left: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,242,254,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite' }} />
                <Box sx={{ position: 'absolute', bottom: '20%', right: '15%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,8,68,0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 10s ease-in-out infinite reverse' }} />
                
                <Container maxWidth="md" sx={{ zIndex: 2, position: 'relative', textAlign: 'center' }}>
                    <Box className="animate-fade-in-up">
                        <Typography 
                            variant="h1" 
                            sx={{ mb: 3 }}
                        >
                            Craft Your Future with <br/>
                            <span className="text-gradient-primary">Precision & Style</span>
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 6, color: 'text.secondary', fontWeight: 400, maxWidth: '800px', mx: 'auto', lineHeight: 1.8 }}>
                            Build a job-winning resume effortlessly. Our modern, ATS-friendly builder highlights your skills and experience to get you hired faster.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                component={Link}
                                to="/resume"
                                variant="contained"
                                color="primary"
                                size="large"
                                endIcon={<MdArrowForward />}
                                sx={{ px: 5, py: 1.8, fontSize: '1.1rem' }}
                            >
                                Start Building Now
                            </Button>
                            <Button
                                component={Link}
                                to="/history"
                                variant="outlined"
                                size="large"
                                sx={{ px: 5, py: 1.8, fontSize: '1.1rem', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                            >
                                View Examples
                            </Button>
                        </Box>
                    </Box>

                    {/* Preview Image / Dashboard Mockup */}
                    <Box 
                        className="animate-fade-in-up stagger-3"
                        sx={{ 
                            mt: 10, 
                            position: 'relative',
                            mx: 'auto',
                            maxWidth: 900,
                        }}
                    >
                        <Box 
                            sx={{
                                position: 'absolute',
                                inset: -2,
                                background: 'linear-gradient(135deg, #00f2fe, #ff0844)',
                                borderRadius: '24px',
                                opacity: 0.3,
                                filter: 'blur(15px)',
                            }}
                        />
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Resume Builder Interface"
                            sx={{ 
                                width: '100%', 
                                borderRadius: '20px', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                zIndex: 2,
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                        />
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 15, position: 'relative' }}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={10} className="animate-fade-in-up">
                        <Typography variant="h2" gutterBottom>
                            Why Choose <span className="text-gradient-secondary">rBuilder</span>?
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
                            Designed with cutting-edge technology to give you the unfair advantage in your job search.
                        </Typography>
                    </Box>
                    <Box 
                        sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, 
                            gap: 4 
                        }}
                    >
                        {features.map((feature, index) => (
                            <Box key={index}>
                                <Card 
                                    className={`animate-fade-in-up ${feature.delay}`}
                                    sx={{ 
                                        height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        p: 4, 
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:hover .icon-wrapper': {
                                            transform: 'scale(1.1) rotate(5deg)',
                                        }
                                    }}
                                >
                                    <Box 
                                        className="icon-wrapper"
                                        sx={{ 
                                            mb: 3, 
                                            display: 'inline-flex',
                                            p: 2,
                                            borderRadius: '16px',
                                            background: 'rgba(255,255,255,0.03)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1, p: 0 }}>
                                        <Typography gutterBottom variant="h5" component="h3" fontWeight="700" sx={{ mb: 2 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                            {feature.desc}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{ py: 15, position: 'relative' }}>
                <Container maxWidth="md">
                    <Box 
                        sx={{ 
                            p: 8, 
                            borderRadius: '32px', 
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(255, 8, 68, 0.1) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Box sx={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, background: '#00f2fe', filter: 'blur(100px)', opacity: 0.2 }} />
                        <Box sx={{ position: 'absolute', bottom: -50, right: -50, width: 200, height: 200, background: '#ff0844', filter: 'blur(100px)', opacity: 0.2 }} />
                        
                        <Typography variant="h2" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>
                            Ready to Land Your Dream Job?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 6, color: 'text.secondary', fontWeight: 400, position: 'relative', zIndex: 1 }}>
                            Join thousands of successful candidates who built their careers with rBuilder.
                        </Typography>
                        <Button
                            component={Link}
                            to="/resume"
                            variant="contained"
                            color="secondary"
                            size="large"
                            sx={{ px: 6, py: 2, fontSize: '1.2rem', position: 'relative', zIndex: 1 }}
                        >
                            Create Resume Now
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default LandingPage;
