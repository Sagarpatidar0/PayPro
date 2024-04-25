import { useEffect, useState } from "react"
import AuthRedirect from "../components/AuthRedirect"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Profile() {
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    useEffect(() => {
        let token = localStorage.getItem('token');
        if(!token) navigate('/signin')
        else{
          axios.get(import.meta.env.VITE_BACKEND_URL + '/api/v1/user/me' , {
            headers:{
              authorization: "Bearer " + token
            }
          }).then((res) => {
            if(res.status == 200){
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmail(res.data.email)
            }
            else navigate('/signin')
          })
        }
      } , [])
    return(
        <div className="flex flex-col w-full h-full">
            <Heading label="Profile"/>
            <SubHeading label="Enter your credentials to access your account"/>
            <InputBox onChange={e => setFirstName(e.target.value)} label="First Name" placeholder={firstName}/>
            <InputBox onChange={e => setLastName(e.target.value)} label="Last Name" placeholder={lastName}/>
            <InputBox onChange={e => setEmail(e.target.value)} label="Email" placeholder={email}/>
            <InputBox onChange={e => setPassword(e.target.value)} label="Password"/>
            <Button onClick={ async () => {
                await axios.put(import.meta.env.VITE_BACKEND_URL + '/api/v1/user/update' , {
                    firstName,
                    lastName,
                    email
                } , {
                    headers:{
                        authorization: "Bearer " + localStorage.getItem('token')
                    }
                }).then(()=>{
                    window.location.reload();
                })
            }} label="Update"/>
        </div>
    )
}
export default Profile