import { useState } from "react"
import AuthRedirect from "../components/AuthRedirect"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const ErrorMessage = ({ id, message }) => {
    return (
        <p
            id={id}
            className="text-[14px] font-semibold text-center text-red-700 pb-2"
        >
            <i>{message}</i>
        </p>
    );
};

function Signup() {
    const [error, setError] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    return (
        <div className="flex flex-col w-full h-full">
            <Heading label="Sign Up" />
            <SubHeading label="Enter your information to create an account" />
            <InputBox onChange={e => setFirstName(e.target.value)} label="First Name" placeholder="John" />
            <InputBox onChange={e => setLastName(e.target.value)} label="Last Name" placeholder="Doe" />
            <InputBox onChange={e => setEmail(e.target.value)} label="Email" placeholder="johndoe@example.com" type="email" />
            <InputBox onChange={e => setPassword(e.target.value)} label="Password" type="password" />
            {error && <ErrorMessage id="login-error" message={error} />}
            <Button onClick={async () => {
                try {


                    let res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/v1/user/signup', {
                        firstName,
                        lastName,
                        email,
                        password
                    })
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        navigate('/dashboard')
                    }
                } catch (error) {
                    console.error("Error during sign in:", error);
                    if (error.response.data.message) {
                        setError(error.response.data.message);
                    }
                    else {
                        setError("An error occurred during sign in. Please try again later.");
                    }
                }
            }} label="Sign Up" />
            <AuthRedirect label="Already have an account? " page="Sign In" link="/Signin" />
        </div>
    )
}
export default Signup