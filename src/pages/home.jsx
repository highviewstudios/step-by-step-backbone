import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdateName } from '../store/actions';
import { useHistory } from 'react-router-dom';

//Styles
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";


function Home() {

  const user = useSelector(state => state.user);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "STAFF";
    onOpen();
  },[])

  function onOpen() {
    if(user.auth == false) {
      history.push("/signin");
    } else if(user.role == "superAdmin") {
      history.push("/administrator");
    }
  }

  function test() {
      dispatch(userUpdateName());
  }

  return (
    <div className="body">
        <Container fluid className="p-3">
            <Jumbotron className="back-color">
              <h1>Home</h1>
              <Button variant="warning" onClick={test}>Test</Button>
              <Button variant="warning" onClick={() => history.push('/administrator/home')}>Home</Button>
            </Jumbotron>
        </Container>
    </div>
  );
}

export default Home;