import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SignIn from '../src/components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CheckPoint from './components/CheckPoint';
import CheckPointState from './context/checkPoint/CheckPointState';
function App() {
  return (
    <div className='form-usuario '>
      <CheckPointState>
        <Router>
          <Switch>
            <Route exact path='/' component={SignIn} />
            <Route exact path='/signUp' component={SignUp} />
            <Route exact path='/checkpoint' component={CheckPoint} />
          </Switch>
        </Router>

      </CheckPointState>

    </div>

  );
}

export default App;
