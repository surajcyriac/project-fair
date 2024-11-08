import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthContext = createContext()

const Authcontext = ({children}) => {
    const [isAuthorised,setisAuuthorised]=useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setisAuuthorised(true)
        }else{
            setisAuuthorised(false)
        }
    },[isAuthorised] )
  return (
<tokenAuthContext.Provider value={{isAuthorised,setisAuuthorised}}>
    {children}
</tokenAuthContext.Provider>
)
}

export default Authcontext