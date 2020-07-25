import React, { useState, useEffect } from 'react';
import ServerPath, { hostPath } from "../../ServerPath";
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function SignIn() {

    const [granted, setGranted] = useState(true);
    const user = useSelector(state => state.user);
    const history = useHistory();

    useEffect(() => {
        ServerPath();
        onOpen();
    },[])

    function onOpen() {
        if(user.auth) {
            if(user.role == "superAdmin") {
                history.push('/');
            } else {
                setGranted(false);
            }
        }
    }

    return (
        <div>
        <h1>Administrator Sign In</h1>
        {!granted ? (
            <div>
            <h1>Access Denied</h1>
            </div>
        ):(
            <a href={hostPath + "/auth/github"}>Sign In With GitHub</a>
            )}
        </div>
    )
}

export default SignIn;