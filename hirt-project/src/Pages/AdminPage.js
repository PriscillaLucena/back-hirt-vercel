import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestData } from "../Hooks/UseRequestData";
import { goToLoginPage } from "../Routes/RouteFunctions";


const AdminPage = () =>{
    const [obras, loading, erro] = useRequestData(`${BASE_URL}/obra`);
    const navigate = useNavigate()

    // let obra = !!obras ? obras : "carregando";

    const listaObras = obras && obras.map((ap) => {
        
        return <div>
            <h3>Obra: {ap.nome_obra}</h3>
            <h4>Andares: {ap.qty_andares}</h4>
            <h4>Total de Apartamentos por andar: {ap.qty_ap_andar}</h4>
            <h4>Andares: {ap.qty_andares * ap.qty_ap_andar }</h4>
            <h4>Responsável: {ap.responsavel }</h4>
           
    
        </div>
        
    });

    console.log(obras)

    return(
        <div>
            <h3>ADMIN PAGE</h3>
            <p>{listaObras}</p>
            
        </div>
    )
}

export default AdminPage;