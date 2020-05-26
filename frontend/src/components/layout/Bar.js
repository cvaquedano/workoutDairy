import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import AuthContext from "../../context/autentificacion/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function ButtonAppBar(props) {

  const classes = useStyles();

    // Extraer la info del autenticacion
    const authContext = useContext(AuthContext);
    const {usuario,cerrarSesion,usuarioAutenticado} = authContext;

    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[]);


    const [state, setState] = useState({
      isOpen: false,
    });
    const {isOpen} = state;

    const toggleDrawer = (open, source) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, isOpen: open });
     
      if(!open){
       
      }
    };

   

    const list = () => (
      <div
        role="presentation"
        onClick={toggleDrawer(false,'onclick')}
        onKeyDown={toggleDrawer(false, 'onkeydown')}
      >
        <List>
          {[{ text:'Registras CheckPoint', componente : "/checkpointForm"},
          {text :'Listar CheckPoint' , componente:"/checkpointList"}].map((c, index) => (
          
          <ListItemLink href={c.componente}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={c.text} />
          </ListItemLink>


            // <ListItem button key={text}>
            //   <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            //   <ListItemText primary={text} />
            // </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Registrar Rutina', 'Listar Rutina'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

  return (
    <div className={classes.root}>

          <SwipeableDrawer
            anchor= 'left'
            open={isOpen}
            onClose={toggleDrawer(false, 'onClose')}
            onOpen={toggleDrawer(true, 'onopen')}
          >
            {list()}
          </SwipeableDrawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
          onClick={toggleDrawer(true, 'onclickbar')}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {usuario ? usuario.nombre : null}
          </Typography>
          <Button
            color="inherit"
            onClick={() => cerrarSesion()}
          >Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
