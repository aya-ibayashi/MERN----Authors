import React, { useState } from 'react'
import axios from 'axios'

const Form = ({method, url, initialState, postSubmission}) => {

    const [formState, setFormState] = useState(initialState)

    const onChangeHandler = e => {
        setFormState({
            [e.target.name]:e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        axios({
            method,
            url,
            data: formState
        })
            .then(res=>postSubmission(res))
            .catch(err=>console.log(err))
    }

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <label>Name:</label> 
                <br/>
                <input name="name" value={formState.name} onChange={onChangeHandler}/>
                <button>Cancel</button>
                <input type="submit" value="Submit"/>
            </form>
        </>


    )

}

export default Form;