import React from 'react'
import Nav from '../Navigation/Nav'
import Box from '@mui/material/Box';

function PageAndNavLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <nav>
                <Nav />
            </nav>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            />
        </Box>
    )
}

export default PageAndNavLayout