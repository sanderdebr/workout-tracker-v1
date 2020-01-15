import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Firebase, { FirebaseContext, withFirebase } from './components/Firebase';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme-config';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {

  const [state, setState] = React.useState({authUser: null});

  const setStateUser = user => {
    setState({ authUser: user });
  }

  return (
    <Router>
      <FirebaseContext.Provider value={new Firebase()}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/">
              <SignIn setStateUser={setStateUser} /> 
            </Route>
            <Route path="/sign-up">
                <SignUp />
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route> 
          </Switch>
        </ThemeProvider>
      </FirebaseContext.Provider>
    </Router>
  );
}

export default withFirebase(App);