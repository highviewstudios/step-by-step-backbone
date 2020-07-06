import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import ServerPath, { hostPath } from "../ServerPath";

function Home() {

    useEffect(() => {
        ServerPath();
    },[])
    
    const { user } = useContext(UserContext)

    return (
        <div>
            <h1>Home Page</h1>
            <h2>{user.name}</h2>
            <a href= {hostPath + "/logout"}>Sign Out</a>
        </div>
    )
}

export default Home;
