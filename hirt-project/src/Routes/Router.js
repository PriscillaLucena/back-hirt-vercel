import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "../Pages/fluxo admin/AdminPage";
import CollabPage from "../Pages/fluxo collab/CollabsPage";
import { ConcludedAp } from "../Pages/fluxo collab/ConcludedAp";
import { DeletePage } from "../Pages/fluxo admin/Delete";
import HomePage from "../Pages/Home/HomePage"
import { InfoApPage } from "../Pages/fluxo collab/InfoApPage";
import LoginPage from "../Pages/Login/LoginPage";
import { NewProject } from "../Pages/fluxo admin/NewProject";
import { InfoAdmPage } from "../Pages/fluxo admin/infoAdmPage";

export default function Router(){
    return(
        
            <BrowserRouter>
                <Routes>
                    <Route exact path={"/"} element={<HomePage/>} />
                    <Route path={"/login/:type"} element={<LoginPage/>} />
                    <Route path={"/admin"} element={<AdminPage/>} />
                    <Route path={"/collaborator"} element={<CollabPage/>} />
                    <Route path={"/apartment/:obra_id"} element={<ConcludedAp/>} />
                    <Route path={"/new_build"} element={<NewProject/>} />
                    <Route path={"/info_ap/:id"} element={<InfoApPage/>} />
                    <Route path={"/obra/delete/:id"} element={<DeletePage/>} />
                    <Route path={"/info_ap/adm/:id"} element={<InfoAdmPage/>} />
                </Routes>
            </BrowserRouter>
    
    )
}

