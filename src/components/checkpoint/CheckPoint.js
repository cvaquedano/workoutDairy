import React, { useState, useContext } from 'react';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import checkpointContext from '../../context/checkPoint/checkPointContext';

const CheckPoint = ({checkPoint}) => {

    const checkPointsContext = useContext(checkpointContext);
    const { setCheckPoint, eliminarCheckPoint} = checkPointsContext;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const editarCheckPoint = id => {
        setCheckPoint(id);
    };
    const eliminar = id => {
        eliminarCheckPoint(id);

    };

    return (

             <div >
                <p>Peso: <span>{checkPoint.peso}</span></p>
                <p>% Grasa: <span>{checkPoint.grasa}</span></p>
                <p>Cintura: <span>{checkPoint.cintura}</span></p>

                <Button
                    variant="contained"
                    color="primary"
                    href="/checkpointForm"
                    onClick={() =>editarCheckPoint(checkPoint.id)}>
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
                    <DialogTitle id="alert-dialog-title">{"Delete checkpoint?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Si se borra el checkpoint, ya no podra ver este registro en el historico ni graficas.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={() => eliminar(checkPoint.id)} color="primary" autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>

            </div>

    );
};

export default CheckPoint;