import React from 'react'
import axios from 'axios'


const Delete = ({id, onDeleteProp}) => {

    const onDelete = id => {
        axios.delete("http://localhost:8000/api/authors/delete/" + id)
            .then(()=> onDeleteProp(id))
            .catch(err=> err)
    }

    return (
        <button onClick = { e=> {onDelete(id)}}>Delete</button>
    )

}

export default Delete;