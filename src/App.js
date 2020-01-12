import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Firebase, { FirebaseContext } from './components/Firebase';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme-config';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <FirebaseContext.Provider value={new Firebase()}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/sign-up">
              <FirebaseContext.Consumer>
                {firebase => <SignUp firebase={firebase} />}
              </FirebaseContext.Consumer>
            </Route>
            <Route exact path="/">
              <SignIn />
            </Route>
          </Switch>
        </ThemeProvider>
      </FirebaseContext.Provider>
    </Router>
  );
}

export default App;
