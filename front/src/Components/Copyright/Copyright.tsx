import React from 'react'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/">
                StoreAdmin
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright