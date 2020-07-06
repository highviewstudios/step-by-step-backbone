import React, { useContext } from 'react';
import { AdminContext } from '../../context/adminContext';

function SignIn() {

    const { user } = useContext(AdminContext);

    return (
        <div>
        <h1>Administrator Sign In</h1>
        {user.granted == "denied" ? (
            <div>
            <h1>Access Denied</h1>
            <a href="http://localhost:8080/administrator/logout">Log Out</a>
            </div>
        ):(
            <a href="http://localhost:8080/auth/github">Sign In With GitHub</a>
            )}
        </div>
    )
}

export default SignIn;