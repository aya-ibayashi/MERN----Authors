import React, { useState } from 'react'
import axios from 'axios'

const Form = ({method, url, initialState, postSubmission}) => {

    const [formState, setFormState] = useState(initialState)
    const [errors, setErrors] = useState(0);

    const onChangeHandler = e => {
        setFormState({
            ...formState,
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
            .catch(err=>{
            const errorResponse = err.response.data.errors;
            const errorArr=[];
            for (const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })   
    }

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                {errors!== 0 && errors.map((error, index)=>
                    <p style={{color:'red'}}key={index}>{error}</p>
                )}
                <label>Name:</label> {" "}
                <input name="name" value={formState.name} onChange={onChangeHandler}/>
                <br/>
                <label>Genre:</label> {" "}
                <input name="genre" value={formState.genre} onChange={onChangeHandler}/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </>


    )

}

export default Form;