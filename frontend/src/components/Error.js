import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

const Error = ({alerta}) => {

    return (
        <div>
            <Alert severity={alerta.severity}>
        <AlertTitle>{alerta.title}</AlertTitle>
        {alerta.msg}
      </Alert>
        </div>
    );
};

export default Error;