import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.removeItem('token')
        navigate('/')
    } , [])
    return(
        <>
        </>
    )
}
export default Logout