import React from 'react';
import { navigate, Link } from '@reach/router';
import Form from '../components/form'

function NewAuthor() {
  const initialState = {
    name: "",
    genre:""
  }
  const postSubmission = res => {
    navigate("/authors")
  }
  return (
    <>
      <h3>
          <Link to='/authors/'>List</Link>{"  "} | 
          {" "}<Link to='/authors/new'>Add Author</Link>
      </h3>
      <Form 
      method="post" 
      url="http://localhost:8000/api/authors/create" 
      initialState = {initialState}
      postSubmission = {postSubmission}/>
      <Link to="/authors">Cancel</Link>
    </>

  );
}

export default NewAuthor;
