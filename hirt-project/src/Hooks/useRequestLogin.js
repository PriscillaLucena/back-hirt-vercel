import axios from "axios";
import { goToAdminPage, goToCollabPage, goToLoginPage } from "../Routes/RouteFunctions";


// export const useRequest = () =>{
// const { restaurantList, setReastaurantList, restName, setRestName, cart, setCart } = useContext(GlobalContext)
// const [data, setData] = useState([])
// const [data2, setData2] = useState([])

// }
export const Login = (body, navigate) => {
    let userData = {}
    console.log(body)
    // ${body.role === 1? 'ADMIN' : 'COLAB'}`
    axios
        .post(`${BASE_URL}/login`, body,
            {
                headers: {
                    contentType: "application/json"
                }
            }
        )
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            userData = response.data
            console.log(response)

            if (userData === false) {
                goToLoginPage(navigate)
            } else {
                if (response.data.userRole === 'admin') {
                    goToAdminPage(navigate)
                } else {
                    goToCollabPage(navigate)
                }

            }

        })
        .catch((error) => {


        });
};
