import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from '@reach/router'
import LogoutButton from '../components/logoutButton'

const GroupList = ({num}) => {

    const [list, setList] = useState(null);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/groups/"+ num, {
            withCredentials:true
        })
            .then(res=>{setList(res.data.authors);
                        console.log(res.data)})
            .catch(err=>console.log(err))
    }, [num])

    if (list == null){
        return "Loading..."
    }

    const clickHandler = (e,status) =>{
        axios.put("http://localhost:8000/api/authors/update/status/"+ e.target.value,
        {"status": status})
            .then(res=>
                axios.get("http://localhost:8000/api/groups/"+ num, {withCredentials:true})
                            .then(res=>setList(res.data.authors))
                            .catch(err=>console.log(err)))
            .catch(err=>console.log(err))
    }

    const removeAuthor = e => {
        const { value } = e.target;
        axios.put("http://localhost:8000/api/groups/"+ num + "/remove/" + value)
            .then((res)=>axios.get("http://localhost:8000/api/groups/"+ num, {withCredentials: true}))
                        .then(res=>{setList(res.data.authors);
                                    console.log(res.data)})
                        .catch(err=>console.log(err))
    }

    return (
        <div>
            <LogoutButton/>
            <h2>Author Status - Group {num}</h2>
            <p>
                <Link to="/status/groups/1">Group 1</Link>  |  
                {" "}  <Link to="/status/groups/2">Group 2</Link>  |  
                {" "}  <Link to="/status/groups/3">Group 3</Link>
                </p>

            { list[0] === null || list.length === 0 ? <p>This group does not have any authors.</p> :
            <div style={{display:"flex", justifyContent:"center"}}>
                <table style={{borderStyle:"solid", backgroundColor:"lightGray"}}>
                    <thead>
                        <tr>
                            <th>
                                Author Name
                            </th>
                            <th>
                                Actions
                            </th>
                            <th>
                                Remove From Group
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
                                    <button style={{ backgroundColor: author.status === "writing" && "green"}}
                                    value={author._id} onClick={(e)=>clickHandler(e,"writing")}>Writing</button>
                                    <button style={{ backgroundColor: author.status === "not writing" && "red"}}
                                    value={author._id} onClick={(e)=>clickHandler(e,"not writing")}>Not Writing</button>
                                    <button style={{ backgroundColor: author.status === "on break" && "yellow"}} 
                                    value={author._id} onClick={(e)=>clickHandler(e,"on break")}>on break</button>
                                </td>
                                <td>
                                    <button value={author._id} onClick={removeAuthor}>Remove</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
    </table>



            </div>
            }
        </div>
    )
}

export default GroupList;