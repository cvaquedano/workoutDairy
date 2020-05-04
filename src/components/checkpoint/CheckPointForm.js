import React, { useState, useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import checkpointContext from '../../context/checkPoint/checkPointContext';

import Error from '../Error';

const CheckPointForm = () => {

    const checkPointsContext = useContext(checkpointContext);
    const { checkPoint, errorCheckPoint, obtenerCheckPoints,agregarCheckPoints,validarCheckPoint} = checkPointsContext;

    const [checkpoint, setCheckpoint] = useState({
        peso: 0,
        grasa: 0,
        cintura:0
    });

    const {peso,grasa,cintura} = checkpoint

    useEffect(() => {
        obtenerCheckPoints();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(checkPoint !== null){
            setCheckpoint({...checkPoint});
        } else {
            setCheckpoint({
                peso: 0,
                grasa: 0,
                cintura:0
            })
        }
    },[checkPoint]);

    const onChange = e =>{
        setCheckpoint({
            ...checkpoint,
            [e.target.name] :  parseInt(e.target.value,10)
        });
    }

    const onSubmit = e =>{
        e.preventDefault();

        if(peso < 1 || grasa < 1 || cintura < 1 || isNaN(peso)|| isNaN(grasa)||isNaN(cintura) ){
            validarCheckPoint();
            return;
        }

        agregarCheckPoints(checkpoint);

        setCheckpoint({
            peso: 0,
            cintura: 0,
            grasa : 0
        });
      };
    return (

        <Container component="main" maxWidth="xs">
             {errorCheckPoint ?
                <Error
                    mensaje={'Los valores deben ser mayores que 0'}
                />
                :
                null}
                    <div>
                        <Typography component="h1" variant="h5">
                        Check point
                        </Typography>
                        <form
                            onSubmit={onSubmit}
                        >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="peso"
                            label="Peso"
                            type="number"
                            name="peso"
                            autoComplete="peso"
                            autoFocus
                            onChange={onChange}
                            value={peso}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="grasa"
                            label="% Grasa Corporal"
                            type="number"
                            name="grasa"
                            autoComplete="grasa"
                            onChange={onChange}
                            value={grasa}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="cinura"
                            label="Medida de Cintura"
                            type="number"
                            name="cintura"
                            autoComplete="cintura"
                            onChange={onChange}
                            value={cintura}
                        />

                        <div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"

                            >
                                Save CheckPoint
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

export default CheckPointForm;