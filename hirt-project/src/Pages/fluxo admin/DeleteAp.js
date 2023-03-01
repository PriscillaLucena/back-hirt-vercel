// import { useNavigate, useParams } from "react-router-dom";
// import { BASE_URL } from "../../Constants/url";
// import CircularProgress from '@mui/material/CircularProgress';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import { Button } from "@mui/material";
// import { goToAdminPage } from "../../Routes/RouteFunctions"
// import { useDeleteData } from "../../Hooks/useDeleteData";
// import { Header } from "../../Constants/Header";
// import { ContainerGeral } from "../../Styled/StyledAdm/StyledDeleteAp";
// import {useProtectedPage} from "../../Hooks/useProtetedPage";

// export const DeleteApPage = () => {
    
//     useProtectedPage();
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const { loading, erro } = useDeleteData(`${BASE_URL}/apartamento/delete/${id}`);
   
//     return (
//         <ContainerGeral>
//             <h4>Delete ap page</h4>
//             <Header />
//             <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToAdminPage(navigate)}>Voltar</Button>
//             {loading && loading &&
//                 <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
//             {!loading && erro && <p>Deu ruim!</p>}
//             {!loading && !erro && <h3>{`Apartamento deletado!`}</h3>}
//         </ContainerGeral>
//     )
// };