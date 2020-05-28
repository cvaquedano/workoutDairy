import React, { useState, useContext } from 'react';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import rutinaContext from '../../context/rutina/rutinaContext';


import Moment from 'react-moment';

const Rutina = ({rutina, props}) => {

    const rutinasContext = useContext(rutinaContext);
    const { setRutina, eliminarRutina} = rutinasContext;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const editarRutina = (id, props) => {
        setRutina(id);
        props.history.push('/rutinaForm');
    };
    const eliminar = id => {
        eliminarRutina(id);
        handleClose();

    };

    return (

             <div >
                <p>Ejercicio o Maquina: <span>{rutina.nombre}</span></p>
                <p>Series: <span>{rutina.series}</span></p>
                <p>Repeticiones o Tiempo: <span>{rutina.repeticiones}</span></p>
                <p>Fecha: <span> <Moment format="YYYY/MM/DD">
                {rutina.registro}
            </Moment></span></p>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>editarRutina(rutina._id, props)}>
                    Edit
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={handleClickOpen}>
                    Delete
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete rutina?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Si se borra el rutina, ya no podra ver este registro en el historico ni graficas.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={() => eliminar(rutina._id)} color="primary" autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>

            </div>

    );
};

export default Rutina;