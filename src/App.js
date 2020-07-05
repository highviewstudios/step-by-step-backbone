import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Auth from "./pages/auth";
import SignIn from "./pages/signin";

import AdminAuth from "./pages/Administrator/auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/signin" component={SignIn} />
        <Route path="/administrator" component={AdminAuth} />
      </Switch>
    </Router>
  );
}

export default App;
