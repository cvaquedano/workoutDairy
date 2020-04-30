import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CheckPoint = () => {

    const [checkpoint, setCheckpoint] = useState({
        peso:'',
        grasa:'',
        cintura:''
    });

    const {peso,grasa,cintura} = checkpoint

    const onChange = e =>{
        setCheckpoint({
            ...checkpoint,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
      };
    return (
        <Container component="main" maxWidth="xs">
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

export default CheckPoint;