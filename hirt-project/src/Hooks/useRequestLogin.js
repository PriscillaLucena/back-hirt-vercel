import axios from "axios";
import { goToAdminPage, goToLoginPage } from "../Routes/RouteFunctions";

// export const useRequest = () =>{
    // const { restaurantList, setReastaurantList, restName, setRestName, cart, setCart } = useContext(GlobalContext)
    // const [data, setData] = useState([])
    // const [data2, setData2] = useState([])

// }
export const Login = (body, navigate) => {
    let userData = {}

    axios
        .post(`http://localhost:3003/login`, body,
            {
                headers: {
                    contentType: "application/json"
                }
            }
        )
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            userData = response.data.user.hasAddress
            console.log(response.data.token)
            
            if (userData === false) {
                goToLoginPage(navigate)
            } else {
                goToAdminPage(navigate)
            }

        })
        .catch((error) => {
            

        });
};
