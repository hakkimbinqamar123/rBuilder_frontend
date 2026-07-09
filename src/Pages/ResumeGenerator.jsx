import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { MdDocumentScanner, MdFileDownload, MdArrowForward } from "react-icons/md";
import { Link } from 'react-router-dom';

function ResumeGenerator() {
    return (
        <Box sx={{ minHeight: '100vh', pt: 15, pb: 10, position: 'relative' }}>
            <Box sx={{ position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,242,254,0.08) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(50px)', zIndex: 0 }} />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <Typography variant="h2" fontWeight="800" gutterBottom className="animate-fade-in-up">
                    Create a Job-Winning <br />
                    <span className="text-gradient-primary">Resume in Minutes</span>
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }} className="animate-fade-in-up stagger-1">
                    Follow our simple two-step process to build and download your professional resume.
                </Typography>

                <Grid container spacing={4} justifyContent="center" className="animate-fade-in-up stagger-2">
                    <Grid item xs={12} sm={6}>
                        <Paper
                            sx={{
                                p: 5,
                                height: '100%',
                                borderRadius: '24px',
                                background: 'rgba(15, 23, 42, 0.6)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    borderColor: 'rgba(0, 242, 254, 0.3)',
                                    boxShadow: '0 15px 30px -10px rgba(0, 242, 254, 0.2)'
                                }
                            }}
                        >
                            <Box sx={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                                <MdDocumentScanner size={40} color="#00f2fe" />
                            </Box>
                            <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
                                Add Your Details
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                Fill in our easy-to-use form with your personal info, experience, and skills.
                            </Typography>
                            <Typography variant="overline" sx={{ color: '#00f2fe', letterSpacing: '2px', fontWeight: 'bold' }}>
                                STEP 1
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Paper
                            sx={{
                                p: 5,
                                height: '100%',
                                borderRadius: '24px',
                                background: 'rgba(15, 23, 42, 0.6)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    borderColor: 'rgba(16, 185, 129, 0.3)',
                                    boxShadow: '0 15px 30px -10px rgba(16, 185, 129, 0.2)'
                                }
                            }}
                        >
                            <Box sx={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                                <MdFileDownload size={40} color="#10b981" />
                            </Box>
                            <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
                                Download & Apply
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                Instantly export your resume to a professional PDF layout ready for ATS.
                            </Typography>
                            <Typography variant="overline" sx={{ color: '#10b981', letterSpacing: '2px', fontWeight: 'bold' }}>
                                STEP 2
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box mt={8} className="animate-fade-in-up stagger-3">
                    <Button 
                        component={Link} 
                        to="/form" 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        endIcon={<MdArrowForward />}
                        sx={{ px: 6, py: 2, fontSize: '1.2rem', borderRadius: '16px' }}
                    >
                        Let's Start Building
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default ResumeGenerator;
