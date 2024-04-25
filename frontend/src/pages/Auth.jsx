import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Auth(element) {
    const [auth , setAuth] = useState(false);
    const navigate = useNavigate()
    useEffect(()=> {
        if(localStorage.getItem('token')){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/user/auth" , {
                headers:{
                    authorization: "Bearer "+ localStorage.getItem('token')
                }
            }).then((res) =>{
                if(res.status == 200){
                    navigate('/dashboard')
                }
            })
            .catch(() =>{
                navigate('/signin')
            })
        }
        else{
            navigate('/signup')
        }
    } , [])
    return(
        <>
        {element.children}
        </>
    )
}
export default Auth