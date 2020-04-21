import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SignIn from '../src/components/auth/SignIn';
import SignUp from './components/auth/SignUp';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route exact path='/signUp' component={SignUp} />
        <Route exact path='/algo' component={SignIn} />
      </Switch>

    </Router>
  );
}

export default App;
