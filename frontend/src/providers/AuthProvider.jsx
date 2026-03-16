import React, {createContext, useState, useEffect} from 'react'

const contextAuth = createContext()
const AuthProvider = ({children}) => {

    const [user, setUser] = useState()



    const returnValues = {user}
    return (
        <contextAuth.Provider value={returnValues}>{children}</contextAuth.Provider>
    )
}

export default AuthProvider
export { contextAuth }