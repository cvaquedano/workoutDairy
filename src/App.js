import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SignIn from '../src/components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CheckPoint from './components/checkpoint/CheckPointForm';
import CheckPointList from './components/checkpoint/CheckPointList';
import CheckPointState from './context/checkPoint/CheckPointState';
function App() {
  return (
    <div className='form-usuario '>
      <CheckPointState>
        <Router>
          <Switch>
            <Route exact path='/' component={SignIn} />
            <Route exact path='/signUp' component={SignUp} />
            <Route exact path='/checkpointForm' component={CheckPoint} />
            <Route exact path='/checkpointList' component={CheckPointList} />
          </Switch>
        </Router>

      </CheckPointState>

    </div>

  );
}

export default App;
