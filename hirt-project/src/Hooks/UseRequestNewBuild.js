import axios from "axios";
// import { useState } from "react";
import { BASE_URL } from "../Constants/url";

export const NewBuild = (body) => {
   
    // const [setData] = useState('');
    // const [setLoading] = useState(false);
    // const [setErro] = useState('');

    // setLoading(true)
    axios
        .post(`${BASE_URL}/nova-obra`, body,
            {
                headers: {
                    contentType: "application/json"
                }
            }
        )
        .then((response) => {
            // setData(response.data)

            alert({ message: "Obra incluída!" })
            // setLoading(false)
        })
        .catch((error) => {
            // setLoading(false)
            // setErro(error.message)
        });
};
