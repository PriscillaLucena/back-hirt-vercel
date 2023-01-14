import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "../Pages/AdminPage";
import CollabPage from "../Pages/CollabPage";
import { ConcludedAp } from "../Pages/Home/ConcludedAp";
import HomePage from "../Pages/Home/HomePage"
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
                    <Route path={"/apartment/:id"} element={<ConcludedAp/>} />
                    <Route path={"/new"} element={<NewProject/>} />
                </Routes>
            </BrowserRouter>
    
    )
}

