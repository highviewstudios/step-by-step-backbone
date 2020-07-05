import React, { useEffect } from "react";
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function Auth() {

    const history = useHistory();

    useEffect(() => {
        onOpen();
    },[])

    function onOpen() {
        Axios.get("/auth", {withCredentials: true })
        .then(res => {
            console.log(res.data);
            const isAuth = res.data.auth;

            if(isAuth) {
                console.log("To home page");
                //updateUser("name", res.data.user.displayName);
                //history.push('/home');
            } else {
                history.push('/signin');
            }
        })
        .catch(err => {
            console.log("E " +err);
        })
    }

    return (
        <div>
            <h1>Auth</h1>
        </div>
    )
}

export default Auth;