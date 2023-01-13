import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../Routes/RouteFunctions";


const AdminPage = () =>{
    const navigate = useNavigate()
    return(
        <div>
            <p>Admin Page</p>
            <button onClick={()=>goToLoginPage(navigate, 1)}>Login</button>
        </div>
    )
}

export default AdminPage;