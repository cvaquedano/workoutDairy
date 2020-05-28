import React, { useContext, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlertaContext from '../../context/alertas/alertaContext';
import rutinaContext from '../../context/rutina/rutinaContext';
import Error from '../Error';

const RutinaForm = () => {

    const rutinasContext = useContext(rutinaContext);
    const { rutinaActual,agregarRutinas,salvarRutina,validarRutina, mensaje} = rutinasContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;


    const [rutina, setRutina] = useState({
        nombre: '',
        series: 0,
        repeticiones: 0
    });



    useEffect(() => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.severity, mensaje.title);
        }
        // eslint-disable-next-line
    }, [mensaje]);

    useEffect(() => {
        if(rutinaActual !== null){

            setRutina({...rutinaActual});

        } else {
            setRutina({
                nombre: '',
                series: 0,
                repeticiones: 0
            })
        }
    },[rutinaActual]);

    const {nombre,series,repeticiones} = rutina;

    const onChange = e =>{
        setRutina({
            ...rutina,
            [e.target.name] :  e.target.value
        });
    }

    const onSubmit = e =>{
        e.preventDefault();

        if(nombre.trim() === '' || series < 1 || repeticiones < 1 ||  isNaN(series)||isNaN(repeticiones) ){

            validarRutina('Los valores deben ser mayor a 0');
            return;
        }

        if(rutinaActual !== null){
            salvarRutina(rutina);
        }else{
            agregarRutinas(rutina);
        }

        setRutina({
            nombre: '',
            series: 0,
            repeticiones: 0
        });
      };
    return (
        <Container component="main" maxWidth="xs">
        {alerta ? (<Error alerta={alerta}/>)  : null}
               <div>
                   <Typography component="h1" variant="h5">
                   Rutina
                   </Typography>
                   <form
                       onSubmit={onSubmit}
                   >
                   <TextField
                       variant="outlined"
                       margin="normal"
                       fullWidth
                       id="nombre"
                       label="Ejercicio o Maquina"
                       type="test"
                       name="nombre"
                       autoComplete="nombre"
                       autoFocus
                       onChange={onChange}
                       value={nombre}
                   />
                   <TextField
                       variant="outlined"
                       margin="normal"
                       fullWidth
                       id="series"
                       label="Series"
                       type="number"
                       name="series"
                       autoComplete="series"
                       onChange={onChange}
                       value={series}
                   />
                   <TextField
                       variant="outlined"
                       margin="normal"
                       fullWidth
                       id="repeticiones"
                       label="Repeticiones o Tiempo"
                       type="number"
                       name="repeticiones"
                       autoComplete="repeticiones"
                       onChange={onChange}
                       value={repeticiones}
                   />

                   <div>
                       <Button
                           type="submit"
                           fullWidth
                           variant="contained"
                           color="primary"

                       >
                           Save Rutina
                       </Button>

                   </div>
                   <div>
                       <Button
                               type="button"
                               fullWidth
                               variant="contained"
                               color="secondary"
                               className='btn'
                           >
                               Cancel
                           </Button>
                   </div>
                   </form>
               </div>

   </Container>
    );
};

export default RutinaForm;