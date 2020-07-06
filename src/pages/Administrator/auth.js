import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminContext } from '../../context/adminContext';
import Axios from 'axios';

function Auth() {
    
    const history = useHistory();

    const { updateUser } = useContext(AdminContext);

    useEffect(() => {
        onOpen();
    }, []);

    function onOpen() {
        
        Axios.get("/administrator/auth")
        .then(res => {
            const data = res.data;
            if(data.auth) {
                updateUser("granted", data.access);
                if(data.access == "granted") {
                    history.push('/administrator/home');
                } else {
                    history.push('/administrator/signin');
                }
            } else {
                history.push('/administrator/signin');
            }
        })  
        .catch(err => {
            console.log(err);
        })
    }
    
    
    return (
        <div>
            <h1> Admin Auth</h1>
        </div>
    )
}

export default Auth;