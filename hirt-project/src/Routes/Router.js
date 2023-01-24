import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "../Pages/AdminPage";
import CollabPage from "../Pages/CollabsPage";
import { ConcludedAp } from "../Pages/ConcludedAp";
import HomePage from "../Pages/Home/HomePage"
import { InfoApPage } from "../Pages/InfoApPage";
import LoginPage from "../Pages/Login/LoginPage";
import { NewProject } from "../Pages/NewProject";

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
                </Routes>
            </BrowserRouter>
    
    )
}

