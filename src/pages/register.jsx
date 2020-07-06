import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

//Styles
import Button  from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";

function Register() {

    const history = useHistory();

    const [message, setMessage] = useState('');
    const [registed, setRegister] = useState(false)


    useEffect(() => {
        document.title = "Register"
    },[]); 

    function handleClick(event) {
        event.preventDefault();
        setMessage('');
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmpassword = document.getElementById("confirmpassword").value;
        
        const url = "/register/"+ name +"/"+ email +"/"+ password +"/"+ confirmpassword;
        axios.get(url)
        .then(res => {
            if(res.data.message === "User registered successfully") {
                setRegister(true);
            } else {
                if(res.data.userError === "Yes") {
                    setMessage(res.data.message);
                }
        }
        })
        .catch(err => {
            console.log(err);
        })
    }

    function handleLogin() {
        setRegister(false);
        history.push('/signin')
    }

    
    return (
        <div className="body">
        <Container className="p-3">
            <Jumbotron className="back-color">
            <div className="header">
                <h1>Register</h1>
                {registed ? (
                    <div>
                    <h2> You have successfully been registered</h2><br />
                    <p>Please log in</p>
                    <Button type="submit" onClick={handleLogin} variant="primary">Login</Button>
                    </div>
                ) : (
                    <Form action="/form" method="POST">
                    <Form.Control id="name" size="sm" type="text" placeholder="Name" required/>
                    <br />
                    <Form.Control id="email" size="sm" type="email" placeholder="Email" required/>
                    <br />
                    <Form.Control id="password" size="sm" type="password" placeholder="Password" required/>
                    <br />
                    <Form.Control id="confirmpassword" size="sm" type="password" placeholder="Confirm Password" required />
                    <br />
                    <p>{message}</p>
                    <Button type="submit" onClick={handleClick} variant="primary">Register</Button>
                </Form> 
                )}
            </div>
            </Jumbotron>
        </Container>
        </div>
    )
}

export default Register;