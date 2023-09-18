import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText, } from '@mui/material';
import { Link } from 'react-router-dom';
import { SidebarListItemProps } from '../../constants';
import { useLocation } from 'react-router-dom';

const NavItem: React.FC<SidebarListItemProps> = ({ text, icon: Icon, url }) => {

    const location = useLocation();
    const isActive = location.pathname === url;

    return (
        <ListItemButton component={Link} to={url} selected={isActive}>
            <ListItemIcon >
                {Icon && <Icon />}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    );
};


export default NavItem