import { useEffect, useState } from "react";
import axios from "axios";


export function useRequestData(url) {

    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    // const token = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);

        axios.get(url, {
            // headers: {
            //     auth: token
            // }
        }).then((response) => {
            setData(response.data);
            // console.log(response)
            setLoading(false);
        }).catch((error) => {
            setErro(error.response);
            setLoading(false);
        });

    }, [])

        return [data, loading, erro]
    };


   