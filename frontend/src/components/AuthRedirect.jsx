import { Link } from "react-router-dom"

function AuthRedirect({label , page , link}) {
    return(
        <div>
            {label}
            <Link to={link}>{page}</Link>
        </div>
    )
}
export default AuthRedirect