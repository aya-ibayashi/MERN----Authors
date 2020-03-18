import React, {useEffect, useState} from 'react';
import Form from "../components/form"
import axios from "axios";
import { navigate, Link } from '@reach/router'

const EditAuthor = ({id}) => {

    const [author, setAuthor] = useState(null);

    useEffect (()=>{
        axios.get("http://localhost:8000/api/authors/"+id)
            .then(res=>setAuthor(res.data))
            .catch(err=>err)
    }, [])

    if(author == null){
        return "Loading..."
    }

    const postSubmission = (res) => {
        navigate('/authors')
    }


    return(
        <>
            <Form method="put" 
            url={"http://localhost:8000/api/authors/update/" + id}
            initialState = {author}
            postSubmission = {postSubmission}/>
            <Link to="/authors">Cancel</Link>
        </>
    )
}
export default EditAuthor;