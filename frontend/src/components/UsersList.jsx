import { useNavigate } from "react-router-dom"
import Button from "./Button"

function UsersList({name , id}) {
    const navigate = useNavigate()
    return(
        <div className="flex justify-between ml-4 py-4 px-2 shadow">
            <div className="flex">
                <div className="flex flex-col justify-center h-12 w-12 rounded-full bg-slate-200">
                    <div className="flex justify-center">{name[0]}</div>
                </div>
                <div className="flex flex-col justify-center ml-2">
                    <h1>{name}</h1>
                </div>
            </div>
            <div>
                <Button onClick={() => {
                    navigate(`/send?id=${id}&name=${name}`)
                }}label="Send Money"/>
            </div>
        </div>
    )
}
export default UsersList