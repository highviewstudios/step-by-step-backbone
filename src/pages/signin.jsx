import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

function SignIn() {

    const history = useHistory();
    const [message, setmessage] = useState('');

    useEffect(() => {
    },[]);

    function handleClick(event) {
        event.preventDefault();
        const email = document.getElementById("txtEmail").value;
        const password = document.getElementById("txtPassword").value;

        axios.get("/login?email=" + email + "&password=" + password)
        .then(res => {
            const message = res.data.message;
            if(message === "Logged in successful") {
                history.push('/');
            } else {
                setmessage(res.data.info);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
        <h1>Sign In</h1> <br /> <br />
        <form>
            <label id="lblEmail">Email:</label>
            <input id="txtEmail" name="email" type="text"></input><br />
            <label id="lblPassword">Password</label>
            <input id="txtPassword" name="password" type="password"></input>
            <button onClick={handleClick}>LogIn</button>
            <p>{message}</p>
        </form>
        <a href="http://localhost:8080/auth/google">Sign In With Google</a>
        <Link to="/register">
          <p><a>Register</a></p>
        </Link>
        </div>
    )
}

export default SignIn;