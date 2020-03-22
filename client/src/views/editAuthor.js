import React, {useEffect, useState} from 'react';
import Form from "../components/form"
import axios from "axios";
import { navigate, Link } from '@reach/router'

const EditAuthor = ({id}) => {

    const [author, setAuthor] = useState({
        name:"",
        genre:"",
        status:""
    });
    const [error, setError] = useState(false);

    useEffect (()=>{
        axios.get("http://localhost:8000/api/authors/"+id)
            .then(res=> setAuthor({...res.data}))
            .catch(err=> {setError(true); console.log("author not found")})
    }, [])

    if(author.name == ""){

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

    const addToGroup = (e) => {
        const { value } = e.target;
        axios.post("http://localhost:8000/api/groups/add/" + value, {id:id})
            .then(()=> navigate('/status/groups/'+ value))
            .catch(err=>console.log("failed to add author to the group"))
    }


    return(
        <>  
            <h3>
                <Link to='/authors/'>List</Link>{"  "} | 
                {" "}<Link to='/authors/new'>Add Author</Link>
            </h3>
            <Form method="put" 
            url={"http://localhost:8000/api/authors/update/" + id}
            initialState = {author}
            postSubmission = {postSubmission}/>
            <Link to="/authors">Cancel</Link>
            <div style={{display:"flex", flexDirection:"column"}}>
                <h4>Add to a group</h4>
                <div>
                    <button value="1" onClick={addToGroup}>Group 1</button>
                    <button value="2" onClick={addToGroup}>Group 2</button>
                    <button value="3" onClick={addToGroup}>Group 3</button>
                </div>
            </div>
        </>
    )
}
export default EditAuthor;