import React, { useState } from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'

const RegistrationForm = () => {

    const [formState, setFormState] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        passwordConfirmation: ""
    })
    const [errors, setErrors] = useState(0);

    const onChangeHandler = e => {
        setFormState({
            ...formState,
            [e.target.name]:e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        let result = axios.post("http://localhost:8000/api/register", formState, {withCredentials:true})
            .then(res=> navigate('/authors/'))
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
                <label>First Name:</label> {" "}
                <input name="firstName" value={formState.firstName} onChange={onChangeHandler}/>
                <br/>
                <label>Last Name:</label> {" "}
                <input name="lastName" value={formState.lastName} onChange={onChangeHandler}/>
                <br/>
                <label>Email:</label> {" "}
                <input name="email" value={formState.email} onChange={onChangeHandler}/>
                <br/>
                <label>Password:</label> {" "}
                <input type="password" name="password" value={formState.password} onChange={onChangeHandler}/>
                <br/>
                <label>Confirm Password:</label> {" "}
                <input type="password" name="passwordConfirmation" value={formState.passwordConfirmation} onChange={onChangeHandler}/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </>


    )

}

export default RegistrationForm;