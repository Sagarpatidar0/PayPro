import axios from "axios";
import { useEffect, useState } from "react"

function Appbar() {
    const [firstName, setFirstName] = useState("User")
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
            }
            else navigate('/signin')
          })
        }
      } , [])
    return (
        <div className="shadow flex justify-between py-4">
            <div className="flex flex-col justify-center ml-4">
                <h1 className="font-bold text-xl">Payment App</h1>
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center mr-4">
                    <h1>Hello, {firstName}</h1>
                </div>

                <div class="relative inline-block text-left">
                    <div class="group">
                        <div className="group rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-2">
                            <div className="flex flex-col justify-center h-full text-xl">
                                {firstName[0]}
                            </div>
                            <div
                                class="absolute left-0 pr-5 w-40 mt-10 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                                <div class="py-1">
                                    <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                                    <a href="/logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Appbar