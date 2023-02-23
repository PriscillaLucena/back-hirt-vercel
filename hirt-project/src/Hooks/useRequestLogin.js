import axios from "axios";
import { BASE_URL } from "../Constants/url";
import { goToAdminPage, goToClientPage, goToCollabPage, goToLoginPage } from "../Routes/RouteFunctions";


export const Login = (body, navigate) => {
    let userData = {}
    console.log(body)
    axios
        .post(`${BASE_URL}/user/login`, body

        )
        .then((response) => {
            
            userData = response.data
            localStorage.setItem('token', userData.sendKey.token)

            console.log(userData)


            if (userData === false) {
                goToLoginPage(navigate)
            } else if (userData.sendKey.role === 'admin') {
                goToAdminPage(navigate, userData.sendKey.role, userData.sendKey.id)
            } else if (response.data.sendKey.role === 'collab') {
                goToCollabPage(navigate, userData.sendKey.role, userData.sendKey.id)
            }

        }).catch((error) => {
            console.log(error.message)
            
        });
};
