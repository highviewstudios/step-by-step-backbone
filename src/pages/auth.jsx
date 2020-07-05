import React, { useEffect } from "react";
import Axios from 'axios';

function Auth() {

    useEffect(() => {
        onOpen();
    },[])

    function onOpen() {
        Axios.get("/auth", {withCredentials: true })
        .then(res => {
            console.log(res.data);
            // const isAuth = res.data.auth;

            // if(isAuth) {
            //     updateUser("name", res.data.user.displayName);
            //     history.push('/home');
            // } else {
            //     history.push('/signin');
            // }
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