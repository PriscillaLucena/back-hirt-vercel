import { useEffect, useState } from "react";
import axios from "axios";


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

export function useRequestDataCollab(url) {

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


    export function useRequestObra(url) {

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
    