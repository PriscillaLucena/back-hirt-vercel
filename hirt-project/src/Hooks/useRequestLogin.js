import axios from "axios";
import { BASE_URL } from "../Constants/url";
import { goToAdminPage, goToClientPage, goToCollabPage, goToLoginPage } from "../Routes/RouteFunctions";


export const Login = (body, navigate) => {
    let userData = {}
    // console.log(body)
    axios
        .post(`${BASE_URL}/user/login`, body

        )
        .then((response) => {
            
            userData = response.data
            localStorage.setItem('token', userData.sendKey.token)


            if (userData === false) {
                goToLoginPage(navigate)
            } else if (userData.sendKey.role === 'ADMIN') {
                goToAdminPage(navigate, userData.sendKey.role)
            } else if (response.data.sendKey.role === 'COLLAB') {
                goToCollabPage(navigate, userData.sendKey.role)
            }

        }).catch((error) => {
            console.log(error.message)
            
        });
};
