import React, { useContext } from 'react';
import { AdminContext } from '../../context/adminContext';
import ServerPath, { hostPath } from "../ServerPath";

function SignIn() {

    const { user } = useContext(AdminContext);

    useEffect(() => {
        ServerPath();
    },[])

    return (
        <div>
        <h1>Administrator Sign In</h1>
        {user.granted == "denied" ? (
            <div>
            <h1>Access Denied</h1>
            <a href= {hostPath + "/administrator/logout"}>Log Out</a>
            </div>
        ):(
            <a href="/auth/github">Sign In With GitHub</a>
            )}
        </div>
    )
}

export default SignIn;