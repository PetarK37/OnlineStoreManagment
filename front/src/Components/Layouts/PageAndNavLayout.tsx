import React, { ReactNode } from 'react';
import Nav from '../Navigation/Nav'
import Box from '@mui/material/Box';

interface LayoutProps {
    children: ReactNode; // The content to be rendered beside the navigation
}

const PageAndNavLayout: React.FC<LayoutProps> = ({ children }) => {
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
            >
                {children}
            </Box>
        </Box>
    )
}

export default PageAndNavLayout