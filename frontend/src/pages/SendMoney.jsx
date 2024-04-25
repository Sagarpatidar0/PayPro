import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

function SendMoney() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState(true)
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const [amount, setAmount] = useState(0)
    const [warning, setWarning] = useState('')
    return (
        <div className="flex flex-col justify-center h-screen bg-gray-100">
            <div className="flex flex-row justify-center w-screen">
                <div className="flex justify-center w-96 px-10 py-8 bg-white rounded-xl drop-shadow-md">
                    <div className="flex flex-col justify-center w-screen">
                        <h1 className="font-bold text-3xl text-center mb-14">Send Money</h1>
                        <div className={`${warning ? `flex justify-center h-7 border-2 mb-2 ${status ? "border-green-300  bg-green-100" : "border-red-300 bg-red-100"} rounded-l` : "h-9"}`}>{warning}</div>
                        <div className="flex items-center">
                            <div className="flex rounded-full bg-green-500 h-12 w-12 justify-center">
                                <div className="flex flex-col text-xl justify-center text-white">
                                    {name[0]}
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold ml-4">{name}</h1>
                        </div>
                        <h1 className="text-l">Amount (in Rs)</h1>
                        <input onChange={(e) => { setAmount(e.target.value) }} className="w-full border-2 border-slate-200 rounded-l h-10 p-2 my-2" type="number" placeholder="Enter Amount" />
                        <button onClick={() => {
                            setWarning("")
                            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    authorization: "Bearer " + localStorage.getItem('token')
                                }
                            }).then((res) => {
                                setWarning(res.data.message +" Redirecting in 2 second")
                                setStatus(true)
                                setTimeout(() => {
                                    navigate('/dashboard')
                                }, 2000)
                            })
                            .catch((e) => {
                                console.log(e);
                                setWarning(e.response.data.message)
                                setStatus(false)
                                setTimeout(() => {
                                    navigate('/dashboard')
                                }, 2000)
                                })
                        }} type="button" class="w-full text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Initiate Transfer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SendMoney