import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../service/allAPI';
import { useAuth } from '../Context/AuthContext';
import Swal from 'sweetalert2';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return Swal.fire({ icon: 'warning', title: 'Oops', text: 'Please fill all fields' });
        }

        try {
            const result = await loginAPI({ email, password });
            if (result.status === 200) {
                login(result.data.user, result.data.token, result.data.refreshToken);
                Swal.fire({ icon: 'success', title: 'Success', text: 'Login successful' });
                navigate('/history');
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: result.response?.data?.error || 'Login failed' });
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Server error' });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={10} mb={10}>
                <Paper elevation={3} sx={{ padding: 5, borderRadius: 3 }}>
                    <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" gutterBottom>
                        Login
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
                        Welcome back! Please login to your account.
                    </Typography>
                    
                    <form onSubmit={handleLogin}>
                        <TextField 
                            fullWidth 
                            label="Email" 
                            variant="outlined" 
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField 
                            fullWidth 
                            label="Password" 
                            type="password" 
                            variant="outlined" 
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button 
                            type="submit" 
                            fullWidth 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            sx={{ mt: 3, mb: 2, padding: 1.5, fontSize: '1.1rem' }}
                        >
                            Sign In
                        </Button>
                    </form>
                    
                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link href="/register" underline="hover">
                                Register here
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;
