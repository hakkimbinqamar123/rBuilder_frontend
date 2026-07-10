import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../service/allAPI';
import { useAuth } from '../Context/AuthContext';
import Swal from 'sweetalert2';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            return Swal.fire({ icon: 'warning', title: 'Oops', text: 'Please fill all fields' });
        }

        try {
            const result = await registerAPI({ name, email, password });
            console.log(result);

            if (result.status === 201) {
                login(result.data.user, result.data.token, result.data.refreshToken);
                Swal.fire({ icon: 'success', title: 'Success', text: 'Registration successful' });
                navigate('/history');
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: result.response?.data?.error || 'Registration failed' });
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
                        Register
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
                        Create an account to save your resumes.
                    </Typography>

                    <form onSubmit={handleRegister}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
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
                            Create Account
                        </Button>
                    </form>

                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link href="/login" underline="hover">
                                Login here
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Register;
