import React, { useContext } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SignIn from '../src/components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CheckPoint from './components/checkpoint/CheckPointForm';
import CheckPointList from './components/checkpoint/CheckPointList';
import CheckPointState from './context/checkPoint/CheckPointState';
import tokenAuth from './config/tokenAuth';
import AlertaState from './context/alertas/AlertaState';
import AuthState from './context/autentificacion/AuthState';
import RutaPrivada from './components/rutas/RutaPrivada';
import Main from './components/layout/Main';
import Principal from './components/layout/Principal';

import AuthContext from './context/autentificacion/authContext'
import RutinaList from './components/rutina/RutinaList';
import RutinaForm from './components/rutina/RutinaForm';
import RutinaState from './context/rutina/RutinaState';

const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  return (
    <div >
      <AuthState>
      <AlertaState>
      <CheckPointState>
        <RutinaState>
          <Router>
            <Switch>
              <Route exact path='/' component={SignIn} />
              <Route exact path='/signUp' component={SignUp} />
              <RutaPrivada exact path='/principal' component={Principal} />
              <RutaPrivada exact path='/checkpointForm' component={CheckPoint} />
              <RutaPrivada exact path='/checkpointList' component={CheckPointList} />
              <RutaPrivada exact path='/rutinaForm' component={RutinaForm} />
              <RutaPrivada exact path='/rutinaList' component={RutinaList} />
            </Switch>
          </Router>
        </RutinaState>
      </CheckPointState>
</AlertaState>
      </AuthState>


    </div>

  );
}

export default App;
