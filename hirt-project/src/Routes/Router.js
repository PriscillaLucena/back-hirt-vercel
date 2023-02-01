import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "../Pages/fluxo admin/AdminPage";
import CollabPage from "../Pages/fluxo collab/CollabsPage";
import { ConcludedAp } from "../Pages/fluxo collab/ConcludedAp";
import HomePage from "../Pages/Home/HomePage"
import { InfoApPage } from "../Pages/fluxo collab/InfoApPage";
import LoginPage from "../Pages/Login/LoginPage";
import { NewProject } from "../Pages/fluxo admin/NewProject";
import { InfoAdmPage } from "../Pages/fluxo admin/infoAdmPage";
import { SignUpPage } from "../Pages/SignUpPage";
import { EditBuild } from "../Pages/fluxo admin/EditBuild";
import { DeleteBuildPage } from "../Pages/fluxo admin/DeleteBuild";
import { DeleteApPage } from "../Pages/fluxo admin/DeleteAp";

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
                    <Route path={"/obra/delete/:id"} element={<DeleteBuildPage/>} />
                    <Route path={"/apartamento/delete/:id"} element={<DeleteApPage/>} />
                    <Route path={"/info_ap/adm/:id"} element={<InfoAdmPage/>} />
                    <Route path={"/sign_up/:type"} element={<SignUpPage/>} />
                    <Route path={"/edit/:id"} element={<EditBuild/>} />
                </Routes>
            </BrowserRouter>
    
    )
}

