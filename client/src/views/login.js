import React, { useState } from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    function handleSubmit(event){
        event.preventDefault();

        setErr("");
        axios.post("http://localhost:8000/api/login", {
            email,
            password
        }, { withCredentials: true })
        //****withCredentials sets cookie in browser and server***/
            .then(()=> navigate('/authors/'))
            .catch(()=>setErr('Please check your credentials!'))

    }
    return (
        <>
            <h3>Login</h3>
            {err && (
                <p style={{color:'red'}}>{err}</p>
            )}
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Email</label>
                    <input name="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                </p>
                <p>
                    <label>Password</label>
                    <input name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                </p>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}