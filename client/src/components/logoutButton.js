import React from 'react'
import { navigate } from '@reach/router'
import axios from 'axios'

export default function LogoutButton(){

    function handleClick (){
        axios.delete("http://localhost:8000/api/logout", { withCredentials:true })
            .then(()=>navigate('/login'))
            .catch(console.log)
    }

    return(
        <button onClick= {handleClick}>Log Out</button>
    )

}
