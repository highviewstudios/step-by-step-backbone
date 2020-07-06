import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserContextProvider from './context/userContext';

import Auth from "./pages/auth";
import SignIn from "./pages/signin";
import Home from "./pages/home"

import AdminAuth from "./pages/Administrator/auth";


function App() {
  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/signin" component={SignIn} />
          <Route path="/home" component={Home} />
          
          <Route path="/administrator" component={AdminAuth} />
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
