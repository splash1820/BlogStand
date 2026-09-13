import React from 'react'
import {logout} from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'

function Logout({BtnText="Logout",callback,callbackArgs=[]}) {

    const sessionId = useSelector(state=>state.auth.userData.id)

    const dispatch = useDispatch();
    const handleLogout = (e)=>{
        e.preventDefault();
        dispatch(logout(sessionId))
        
        if (typeof callback==='function') callback(...callbackArgs);
    }

    

  return (
    <div>
        <button 
            onClick={handleLogout}
        >
            {BtnText}
        </button>
    </div>
  )
}

export default Logout
