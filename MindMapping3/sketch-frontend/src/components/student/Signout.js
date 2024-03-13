import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";

function Signout() {
    const history = useHistory();
    useEffect(()=>{
        Cookies.remove('token')
        history.push("./../home");
    },[]);
    return (
        <div>
            Signing out.............
        </div>
    )
}

export default Signout