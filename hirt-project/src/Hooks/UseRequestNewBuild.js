// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../Constants/url";

// export const RequestNewBuild = (body) => {

//     const [loading, setLoading] = useState(false);
//     const [erro, setErro] = useState('');
//     console.log(body)
//     useEffect(()=>{
//     setLoading(true)

//     axios
//         .post(`${BASE_URL}/nova-obra`, body,
//             {
//                 headers: {
//                     contentType: "application/json"
//                 }
//             }
//         )
//         .then(() => {
//             setLoading(false)
//             alert({message: "Inclusão feita com sucesso!"})
//         })
//         .catch((error) => {
//             setLoading(false)
//             setErro(error.message)
//             alert({message: "Opa, deu erro! Tente novamente."} )
//         });
//     },[body])

//     return [loading, erro]
// };
