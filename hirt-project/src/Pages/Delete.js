import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import CircularProgress from '@mui/material/CircularProgress';
import { useRequestData } from "../Hooks/UseRequestData";
import { Button } from "@mui/material";
import { goToAdminPage } from "../Routes/RouteFunctions";
import { useDeleteData } from "../Hooks/useDeleteData";


export const DeletePage = () => {
    
    const navigate = useNavigate();

    const { id } = useParams();

    const { loading, erro } = useDeleteData(`${BASE_URL}/obra/delete/${id}`);
    const [obra] = useRequestData(`${BASE_URL}/info/${id}`)

    const nomeObra = obra && obra.map((u)=> u.nome_obra);

    return (
        <div>
            <Button variant="contained" onClick={() => goToAdminPage(navigate)}>Voltar</Button>
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
            {!loading && erro && <p>Deu ruim!</p>}
            {!loading && !erro && <h3>{`Obra ${nomeObra} deletada!`}</h3>}
        </div>
    )
}