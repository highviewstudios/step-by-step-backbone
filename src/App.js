import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./pages/partials/app.css";

import { useDispatch, useSelector } from 'react-redux';
import { userUpdateAuth, userUpdateName, userUpdateRole } from './store/actions';

import Nav from "./components/NavBar/Nav";

import SignIn from "./pages/signin";
import Home from "./pages/home";
import Register from "./pages/register";
import userTest from './pages/userTest';
import done from './pages/Administrator/done';

import AdminSignIn from "./pages/Administrator/signin"
import AdminHome from "./pages/Administrator/home";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    onOpen();
  },[])

  function onOpen() {
    Axios.get("/auth", {withCredentials: true })
  .then(res => {

      console.log(res.data);
      const isAuth = res.data.auth;
      dispatch(userUpdateAuth(isAuth));
      if(isAuth) {
        if(res.data.role == "superAdmin") {
          dispatch(userUpdateName("High-ViewStudios"));
        } else {
          dispatch(userUpdateName(res.data.user.displayName));
        }
        dispatch(userUpdateRole(res.data.role))
      }
      setLoaded(true);
  })
  .catch(err => {
      console.log("Auth " +err);
  })
  }

  return (
    <div>
      {isLoaded ? (
      <Router>
      <div className="App">
      <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/register" component={Register} />
          <Route path="/usertest" component={userTest} />
          <Route path="/administrator" exact component={AdminHome} />
          <Route path="/administrator/signin" component={AdminSignIn} />
          <Route path="/administrator/done" component={done} />
        </Switch>
        </div>
      </Router>) : <div></div>}
    </div>
  );
}

export default App;
