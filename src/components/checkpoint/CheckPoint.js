import React from 'react';

const CheckPoint = ({checkPoint}) => {

    console.log(checkPoint);
    return (
        
             <div >
                <p>Peso: <span>{checkPoint.peso}</span></p>
                <p>% Grasa: <span>{checkPoint.grasa}</span></p>
                <p>Cintura: <span>{checkPoint.cintura}</span></p>
                <button
                className="button eliminar u-full-width"
                >
                    Eliminar &times;
                </button>

            </div>

        
       
    );
};

export default CheckPoint;