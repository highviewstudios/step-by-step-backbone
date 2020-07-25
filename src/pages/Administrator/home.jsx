import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import { Col } from 'react-bootstrap';
import Axios from 'axios';

function Home() {

    const history = useHistory();
    const user = useSelector(state => state.user);
    const [message, setMessage] = useState('');

    if(!user.auth || user.role != "superAdmin") {
            history.push('/administrator/signin');
    }

    function handleClickNew(event) {
        event.preventDefault();

        const orgName = document.getElementById("txtOrgName").value;
        const allocatRooms = document.getElementById("txtAlRooms").value;
        const authLocal = document.getElementById("ckbLocal").checked;
        const authGoggle = document.getElementById("ckbGoggle").checked;
        const pName = document.getElementById("txtName").value;
        const pEmail = document.getElementById("txtEmail").value;
        
        const data = { orgName: orgName, orgRooms: allocatRooms, authLocal: authLocal.toString(), authGoogle: authGoggle.toString(), pName: pName, pEmail: pEmail}
        Axios.post('/registerPost', data)
        .then(res => {
            const data = res.data;
          console.log(res.data);
    
          if(data.error != "null") {
            console.log(data.message);
          } else if(data.userError == "Yes") {
              setMessage(data.message);
          } else if (data.message == "Successfully added") {
            history.push("/administrator/done");
          }
        })
        .catch(err => {
            console.log(err);
        })

    }

    function handleClick(event) {
        event.preventDefault();
    
        const orgName = document.getElementById("txtOrgName").value;
        const AllocatRooms = document.getElementById("txtAlRooms").value;
        const authLocal = document.getElementById("ckbLocal").checked;
        const authGoggle = document.getElementById("ckbGoggle").checked;
        const pName = document.getElementById("txtName").value;
        const pEmail = document.getElementById("txtEmail").value;
    
        const url = "/administrator/addOrganisation/"+orgName+"/"+AllocatRooms+"/"+authLocal+"/"+authGoggle+"/"+pName+"/"+pEmail;
    
        Axios.get(url)
        .then(res => {
          const data = res.data;
          console.log(res.data);
    
          if(data.error != "null") {
            console.log(data.message);
          } else if(data.userError == "Yes") {
              setMessage(data.message);
          } else if (data.message == "Successfully added") {
            history.push("/administrator/done");
          }
        })
        .catch(err => {
          console.log(err);
        })
    
      }

    return (
        <div>
            <Container className="p-3">
            <Jumbotron className="back-color">
                <h1>Organisation Register</h1>

                <Form className="A-AddOrganisationText" name='form'>
                <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label id="lblOrgName">Organisation Name:</Form.Label><br />
                  <Form.Control id="txtOrgName" type="text" required></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label id="lblAlRooms">Allocated Rooms:</Form.Label><br />
                  <Form.Control id="txtAlRooms" type="text" required></Form.Control>
                </Form.Group>
                  </Form.Row>
                  <Form.Label id="lblAuthTypes">Types of Authencation:</Form.Label><br />
                  <Form.Row>
                <Form.Group as={Col}>
                  <Form.Check id="ckbLocal" type="checkbox" label="Local Login" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Check id="ckbGoggle" type="checkbox" label="Google Login" />
                </Form.Group>
                  </Form.Row>
                  <Form.Label className="A-AddOrganisationTextColor" id="lblPOC">Point of Contact (Senior Admin):</Form.Label><br />
                  <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label id="lblName">Name:</Form.Label><br />
                  <Form.Control id="txtName" type="text" required />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label id="lblEmail">Email:</Form.Label><br />
                  <Form.Control id="txtEmail" type="text" required></Form.Control>
                </Form.Group>
                  </Form.Row>
                  <p>{message}</p>
                  <Button type="submit" onClick={handleClick} variant="warning">Register</Button>
                  <Button type="submit" onClick={handleClickNew} variant="warning">Register New</Button>
                </Form>
                </Jumbotron>
                </Container>
        </div>
    )
}

export default Home;