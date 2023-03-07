import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Constants/url";


export function useRequestDataCollab(url) {

    const [data7, setData7] = useState(undefined);
    let array = []
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const token = localStorage.getItem("token");
   
    useEffect(() => {
        axios.get(url, {
            headers: {
                authorization: token
            }
        }).then((response) => {
            array = response.data.apartments
            console.log(array)

            setData7(array)
            setLoading(false);
        }).catch((error) => {
            setErro(error.response);
            setLoading(false);
        });
    },[url, token])
    

    return [data7, loading, erro]

};


export function useRequestObra(url) {

    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);

        axios.get(url, {
            headers: {
                authorization: token
            }
        }).then((response) => {
            console.log(response.data.allConstructions)
            setData(response.data.allConstructions);
            setLoading(false);
        }).catch((error) => {
            setErro(error.response);
            setLoading(false);
        });

    }, [url, token])

    return [data, loading, erro]
};

export function useRequestData(url) {

    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);

        console.log(url)

        axios.get(url, {
            headers: {
                authorization: token
            }
        }).then((response) => {
            console.log(response.data.apartments)
            setData(response.data.apartments);
            setLoading(false);
        }).catch((error) => {
            setErro(error.response);
            setLoading(false);
        });

    }, [url, token])

    return [data, loading, erro]
};

export function EditConstruc(obra_id, body) {

    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);

        // console.log(url)

        axios.get(`${BASE_URL}/construction/editConstruction/${obra_id}`, body, {
            headers: {
                authorization: token
            }
        }).then((response) => {
            console.log(response.data.apartments)
            setData(response.data.apartments);
            setLoading(false);
        }).catch((error) => {
            setErro(error.response);
            setLoading(false);
        });

    }, [])

    return [data, loading, erro]
};

