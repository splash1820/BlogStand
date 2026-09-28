import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protected({children,authentication}) {

    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector(state=>state.auth.status);

    useEffect(()=>{
        if(authentication && !authStatus){
            navigate("/login");
        }else{
            navigate("/");
        }
        setLoading(false);
    },[authStatus,navigate]) //called when authStatus changes or user navigates from one page to another.

  return loading ? <h1>Loading...</h1>: <>{children}</>;
}

export default Protected
