import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./pages/partials/app.css";

import Auth from "./pages/auth";
import SignIn from "./pages/signin";
import Home from "./pages/home";
import Register from "./pages/register";

import AdminAuth from "./pages/Administrator/auth";
import AdminSignIn from "./pages/Administrator/signin"
import AdminHome from "./pages/Administrator/home";

import UserContextProvider from './context/userContext';
import AdminContextProvider from './context/adminContext';


function App() {
  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/signin" component={SignIn} />
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          <AdminContextProvider>
          <Route path="/administrator" exact component={AdminAuth} />
          <Route path="/administrator/signin" component={AdminSignIn} />
          <Route path="/administrator/home" component={AdminHome} />
          </AdminContextProvider>
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
