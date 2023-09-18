import React from 'react'
import logo from "../../img/storeadmin-high-resolution-logo-color-on-transparent-background.png"
import { Container, Typography} from '@mui/material';
import Box from '@mui/material/Box';

function NotFound() {
    return (
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap:5
                }}>
                <img src={logo} style={{ maxWidth: '30%' }}></img>
            <Typography variant="h1" align="center" gutterBottom>
                Page Not Found
            </Typography>
            </Box>
            <Typography variant="h5" align="center" paragraph>
                The page you are looking for does not exist or you can not access it.
            </Typography>
        </Container>
    )
}

export default NotFound