import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import { Col } from 'react-bootstrap';
import Axios from 'axios';

function Done() {

    const history = useHistory();
    const user = useSelector(state => state.user);
    const [message, setMessage] = useState('');

    if(!user.auth || user.role != "superAdmin") {
            history.push('/administrator/signin');
    }

    function handleClickNew(event) {
        event.preventDefault();
        
        const data = { name: document.getElementById('txtOrgName').value}
        Axios.post('/registerPost', data)
        .then(res => {
            console.log(res.data);
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
            history.push("/");
            console.log("DONE!");
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

                <h2>Done!</h2>
                </Jumbotron>
                </Container>
        </div>
    )
}

export default Done;