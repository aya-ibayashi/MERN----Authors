import React, {useEffect, useState} from 'react';
import Form from "../components/form"
import axios from "axios";
import { navigate, Link } from '@reach/router'

const EditAuthor = ({id}) => {

    const [author, setAuthor] = useState(null);
    const [error, setError] = useState(false);

    useEffect (()=>{
        axios.get("http://localhost:8000/api/authors/"+id)
            .then(res=>{setAuthor(res.data)
                        console.log(res.data)})
            .catch(err=> {setError(true); console.log("author not found")})
    }, [])

    if(author == null){

        return (
            error? 
            <>
                <p>We cannot find the author you are looking for. Wouuld you like to add this author to our database?</p> 
                <Link to="/authors/new">Add Author</Link> 
            </> :
            <p>Loading...</p>
        )
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