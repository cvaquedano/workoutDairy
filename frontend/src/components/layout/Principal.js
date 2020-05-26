import React from 'react';
import ButtonAppBar from './Bar';
import Main from './Main';

const Principal = (props) => {

   
    return (
        <div>
            <ButtonAppBar props={props}/>
            <Main props={props}/>
        </div>
    );
};

export default Principal;