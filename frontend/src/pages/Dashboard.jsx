import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Button from "../components/Button"
import InputBox from "../components/InputBox"
import UsersList from "../components/UsersList"
import UserSearch from "../components/UsersSearch"
import axios from "axios"
import Auth from "./Auth"

function Dashboard(params) {
    return(
        <div className="my-2 mx-10">
            <Appbar />
            <Balance />
            <UserSearch/>
        </div>
    )
}
export default Dashboard