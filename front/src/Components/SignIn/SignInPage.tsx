import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "../../img/storeadmin-high-resolution-logo-color-on-transparent-background.png"
import axios from 'axios';
import { API_URL } from '../../constants';
import { toast } from 'react-toastify';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import Copyright from '../Copyright/Copyright';

export default function SignIn() {
    const { saveToken, getToken, isAuthenticated } = useAuthToken();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const body = {
            Email: formData.get('Email'),
            Password: formData.get('Password'),
        }
        logIn(body);
    };

    const logIn = (body: Object) => {
        axios.post(`${API_URL}/Auth`, body).then(res => {
            saveToken(res.data.token)
        }).catch(err => {
            toast.error(err.response.data.Detail)
        })
    }

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <img alt='Logo' src={logo} style={{ maxWidth: '200px', width: '100%', paddingBottom: '20px' }} />
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }} >
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Email"
                            label="Email Address"
                            name="Email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Password"
                            label="Password"
                            type="password"
                            id="Password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
    );
}