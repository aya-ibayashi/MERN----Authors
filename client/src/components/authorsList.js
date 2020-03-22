import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Delete from '../components/delete'
import EditAuthor from '../views/editAuthor';
import { Link } from '@reach/router'

function AuthorsList({list, removeFromDom}){

    return (
    <table>
        <thead>
            <tr>
                <th>
                    Author
                </th>
                <th>
                    Preferred Genre
                </th>
                <th>
                    Actions available
                </th>
            </tr>
        </thead>

        <tbody>
            {list.map(author=>  
                <tr key={author._id}>
                    <td>
                        {author.name}
                    </td>
                    <td>
                        {author.genre}
                    </td>
                    <td>
                        <Link to={`/authors/edit/${author._id}`}>Edit</Link>
                        <Delete id={author._id} onDeleteProp={removeFromDom}/>
                    </td>
                </tr>
            )}
        </tbody>
    </table>
    

    )
}

export default AuthorsList;