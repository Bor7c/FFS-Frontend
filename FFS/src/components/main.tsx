// import Base from "./components/Base.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Fines from "./FinesPage.tsx";
import Fine from "./FinePage.tsx";
import Breaches from "./BreachesPage.tsx";
import ReactDOM from "react-dom/client";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import { Provider } from "react-redux";
import store from "../store/store.ts";
import ProfilePage from "../pages/ProfilePage/ProfilePage.tsx";
import Navbar from "./Navbar/Navbar.tsx";
// import GeographicalObject from "./components/GeographicalObject.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>

        <BrowserRouter>

                <Navbar />
                
                <Routes>
                    <Route path="fines/" element={<Fines/>}/>
                    <Route path="fines/:id" element={<Fine/>}/>
                    <Route path="breaches/" element={<Breaches/>}/>
                    <Route path="login/" element={<LoginPage/>}/>
                    <Route path="profile/" element={<ProfilePage/>}/>
                </Routes>
                
        </BrowserRouter>

    </Provider>

);