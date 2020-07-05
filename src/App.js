import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Auth from "./pages/auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Auth} />
      </Switch>
    </Router>
  );
}

export default App;
