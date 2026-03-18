import React, {createContext, useState, useEffect} from 'react'

const authProvider = createContext()
const AuthProvider = ({children}) => {

    const defaultDataSesion = {
        name: "",
        email: "",
        password: "",
        password_verified: "",
        telefono: ""
    }

    const [user, setUser] = useState();
    const [sessionData, setSessionData] = useState(defaultDataSesion);
    const [session, setSession] = useState(false);
    const [error, setError] = useState("")

    const register = async() => {
        
    }
    const login = async() => {

    }
    const logout = async() => {

    }


    const returnValues = {defaultDataSesion, user, sessionData, session, error, register, login, logout}
    return (
        <authProvider.Provider value={returnValues}>{children}</authProvider.Provider>
    )
}

export default AuthProvider
export { authProvider }