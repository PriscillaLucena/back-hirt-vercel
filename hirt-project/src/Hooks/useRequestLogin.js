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
            localStorage.setItem('token', response.data.sendKey.token)
            userData = response.data
            console.log("response", response.data)

            if (userData === false) {
                goToLoginPage(navigate)
            } else if (response.data.sendKey.role === 'admin') {
                goToAdminPage(navigate)
            } else if (response.data.sendKey.role === 'COLLAB') {
                goToCollabPage(navigate)
            }

        }).catch((error) => {
            console.log(error.message)
            // if (error.status === 401) {
            //     alert('Não autorizado')
            // } else {
            //     alert('Usuário não encontrado!')
            // }
        });
};
