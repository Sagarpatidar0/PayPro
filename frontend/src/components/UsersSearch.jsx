import axios from "axios"
import { useEffect, useState } from "react"
import UsersList from "./UsersList"

function UserSearch() {
    const [filter , setFilter] = useState("")
    const [userlist , setUserlist] = useState([])
    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/user/bulk?filter=" + filter)
        .then((res) =>{
            setUserlist(res.data.user)
        })
    } , [filter])
    return(
        <>
        <div className="ml-4 py-2 shadow">
            <h1 className="text-xl font-bold">Users</h1>
            <input onChange={(e) => setFilter(e.target.value)} className="w-full border-2 border-slate-200 rounded-l h-10 p-2" type="text" placeholder="Search users..." />
        </div>
        {userlist.map(element => <UsersList name ={`${element.firstName} ${element.lastName}`} id={element._id}/>)}
        </>
    )
}
export default UserSearch