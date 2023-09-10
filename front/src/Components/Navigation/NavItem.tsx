import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText, } from '@mui/material';
import { Link } from 'react-router-dom';
import { SidebarListItemProps } from '../../constants';

const NavItem: React.FC<SidebarListItemProps> = ({ text, icon: Icon, url }) => {
    return (
        <ListItemButton component={Link} to={url}>
            <ListItemIcon >
                {Icon && <Icon />}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    );
};


export default NavItem