import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Auth from "./pages/auth";
import SignIn from "./pages/signin";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
