// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../Constants/url";


// export function EditConstruction(form, obra_id) {

//     const [loading, setLoading] = useState(false);
//     const [erro, setErro] = useState("");
//     const token = localStorage.getItem("token");

//     setLoading(true);

//     axios.put(`${BASE_URL}/construction/editConstruction/${obra_id}`, form, {
//         headers: {
//             authorization: token
//         }
//     }).then(() => {
//         alert("Obra Editada")
//         setLoading(false);
//     }).catch((error) => {
//         alert("Obra não pode ser Editada!")
//         setErro(error.response);
//         setLoading(false);
//     });

//     return [loading, erro]
// };
