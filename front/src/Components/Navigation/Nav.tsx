import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NAV_ITEMS } from '../../constants';
import NavItem from './NavItem';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Typography } from '@mui/material';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { useNavigate } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, } from '@mui/material';
import AuthorizationDisplayWrapper from '../Authorization/AuthorizationDisplayWrapper';



const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
export default function Nav() {

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { logOut } = useAuthToken();
  const navigate = useNavigate();

  const logOutAction = () => {
    logOut();
    navigate("/Login")
  }

  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" open={open} sx={{ height: "100%" }}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          {open && <Typography paragraph marginRight={'auto'} paddingLeft={2} fontSize={'larger'} fontWeight={700} marginBottom={0}> StoreAdmin </Typography>}
          {open && <IconButton onClick={toggleDrawer} >
            <ChevronLeftIcon fontSize='large' />
          </IconButton>}
          {!open && <IconButton onClick={toggleDrawer}>
            <ChevronRightIcon fontSize='large' />
          </IconButton>}
        </Toolbar>
        <Divider />
        <List component="nav">
          {NAV_ITEMS.map(i => (
            <AuthorizationDisplayWrapper key={i.url} requiredObjectName={i.requiredObjectName} requiredPermission={i.requiredPermission} requiredRole={i.requiredRole}>
              <NavItem  icon={i.icon} text={i.text} url={i.url}></NavItem>
            </AuthorizationDisplayWrapper>
          ))}
        </List>
        <div style={{ marginTop: 'auto', paddingBottom: '10px' }}>
          <ListItemButton LinkComponent={'button'} onClick={logOutAction}>
            <ListItemIcon >
              <ExitToAppRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Log Out"} />
          </ListItemButton>
        </div>
      </Drawer>
    </>
  );
}
