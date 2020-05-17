import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

const Error = ({mensaje}) => {
    return (
        <div>
            <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {mensaje}
      </Alert>
        </div>
    );
};

export default Error;