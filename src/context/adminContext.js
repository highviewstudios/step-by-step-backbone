import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

function AdminContextProvider(props) {

    const [user, setUser] = useState({
        name: '',
        granted: ''
    })

    function updateUser(field, value) {
        setUser((prevVal) => {
            return {...prevVal, [field]: value}
        })
    }

    return (
        <AdminContext.Provider value={{user, updateUser}}>
            {props.children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;