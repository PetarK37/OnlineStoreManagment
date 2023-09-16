import React, { ReactNode } from 'react';
import Nav from '../Navigation/Nav'
import Box from '@mui/material/Box';
import { Container, useMediaQuery } from '@mui/material';
import { isSmallerScreenSetting } from '../../constants';

interface LayoutProps {
    children: ReactNode; // The content to be rendered beside the navigation
}

const PageAndNavLayout: React.FC<LayoutProps> = ({ children }) => {
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);


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
                <Box sx={{ padding: isSmallerScreen ? 1.5 : 5, width: '100%' }} >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default PageAndNavLayout