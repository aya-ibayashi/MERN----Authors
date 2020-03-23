import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AuthorsList from '../components/authorsList'
import {Link} from '@reach/router'
import LogoutButton from '../components/logoutButton'

function Main(){

    const [list, setList] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        axios.get("http://localhost:8000/api/authors",{
            withCredentials:true
        })
            .then(res=>{
                setList(res.data);
                setLoaded(true);
            })
            .catch(err=>console.log(err))
    }, [])

    const removeFromDom = id => {
        setList(list.filter( author =>
            id !== author._id
        ));
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <LogoutButton/>
            <h3>
                <Link to='/authors/'>List</Link>{"  "} | 
                {" "}<Link to='/authors/new'>Add Author</Link>
            </h3>
            {loaded && <AuthorsList list={list} removeFromDom={removeFromDom}/>}
        </div>
    )
}

export default Main;