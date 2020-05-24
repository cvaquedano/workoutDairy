import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';
import Error from '../Error';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const  SignUp = (props) =>{

    
    const authContext = useContext(AuthContext);
    const {autenticado, mensaje, registarUsuario} = authContext;
    const alertaContext = useContext(AlertaContext);
    
    const {alerta, mostrarAlerta} = alertaContext;


    useEffect(()=>{

        if(autenticado){
            props.history.push('/main');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje,autenticado,props.history]);

    const [usuario, setUsuario]=useState({
      email:'',
      nombre:'',
      password:'',
      confirmar:''
  });

  const {email, nombre, password, confirmar} = usuario;

  const onChange = e => {
      setUsuario(
         {
             ...usuario,
             [e.target.name] : e.target.value

         }
      );

  }


    const onSubmit =  e => {
      e.preventDefault();

      if( nombre.trim()=== '' ||
          email.trim()=== '' ||
          password.trim()=== '' ||
          confirmar.trim()=== '' ){
          mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
          return;
      }

      if(password.length < 6){
          mostrarAlerta('El password debe ser al menos de 6 caracteres', 'alerta-error');
          return;
      }

      if(password !== confirmar) {
          mostrarAlerta('El password y la confirmacion debe ser igual', 'alerta-error');
          return;
      };

      registarUsuario({
          nombre,
          email,
          password
      })
    }


  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {alerta ? (<Error mensaje={alerta.msg}/>)  : null}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}
        noValidate
        onSubmit={onSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="nombre"
                variant="outlined"
                required
                fullWidth
                id="nombre"
                label="First Name"
                autoFocus
                value={nombre}
                onChange={onChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="nombre"
                autoComplete="lname"
                value={nombre}
                onChange={onChange}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmar"
                label="Password"
                type="password"
                id="confirmar"
                autoComplete="current-password"
                onChange={onChange}
                value={confirmar}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;