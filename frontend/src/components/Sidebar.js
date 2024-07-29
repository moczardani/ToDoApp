import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TodayIcon from '@mui/icons-material/Today';
import StarIcon from '@mui/icons-material/Star';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CategoryIcon from '@mui/icons-material/Category';
import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 300;

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
}
  
function stringAvatar(name) {
    return {
        sx: {
        bgcolor: stringToColor(name),
        width: 56,
        height: 56,
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function getIcon(text) {
  switch(text) {
    case 'Today':
      return <TodayIcon />;
    case 'Important':
      return <StarIcon />;
    case 'All Tasks':
      return <AllInboxIcon />;
      case 'Home':
        return <HomeIcon />;
      case 'Work':
        return <WorkIcon />;
      case 'Groceries':
        return <LocalGroceryStoreIcon />;
      case 'Sport':
        return <FitnessCenterIcon />;
      default:
        return <CategoryIcon />;
  }
}

export default function Sidebar({user, category, selectCategory}) {
    const navigate = useNavigate();

    const logoutHandle = () => {    
        fetch("http://localhost:8080/logout", {
        method: "GET",      
        })
        .catch((error) => console.log(error));
        navigate('/signin');
    }
    
  return (
    <Box>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,                 
          '& .MuiDrawer-paper': {
            bgcolor: 'lightgrey',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '25px',
            gap: '15px'
        }}>
            <Avatar {...stringAvatar(user.firstName + ' ' + user.lastName)} />
            <Typography variant='h6' >
                WELCOME {user.firstName}
            </Typography>
        </Box>
        <Divider />
        <List>
          {['Today', 'Important'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => selectCategory(text)} selected={text === category}>                                
                <ListItemIcon>                                                        
                  {getIcon(text)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All Tasks', 'Home', 'Work', 'Groceries', 'Sport'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => selectCategory(text)} selected={text === category}>
                <ListItemIcon>                                                        
                  {getIcon(text)}          
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />    
        <Button sx={{
            marginTop: 'auto'
        }}
            onClick={logoutHandle}
        >
            Sign Out     
            <ExitToAppIcon sx={{marginLeft: '5px'}}/>
        </Button>    
      </Drawer>
    </Box>
  );
}
