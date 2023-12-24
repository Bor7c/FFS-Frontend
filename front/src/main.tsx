import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Fines from "./pages/FinesPage/FinesPage.tsx";
import FinePage from "./pages/FinePage/FinePage.tsx";

import Breaches from "./pages/BreachesPage/BreachesPage.tsx";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import "./styles/styles.scss"
import BreachPage from "./pages/BreachPage/BreachPage";
import {QueryClient, QueryClientProvider} from "react-query";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";




const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()

root.render(
    <QueryClientProvider client={queryClient}>

        <Provider store={store}>

            <BrowserRouter>

                <Navbar />

                <Breadcrumbs />

                <div className="content-wrapper">

                    <Routes>
                        <Route path="/" element={<Navigate to="/fines" replace />} />
                        <Route path="fines/" element={<Fines/>}/>
                        <Route path="fines/:id" element={<FinePage/>}/>

                        <Route path="breaches/" element={<Breaches/>}/>
                        <Route path="breaches/draft/" element={<BreachPage/>}/>

                        <Route path="login/" element={<LoginPage/>}/>
                        <Route path="profile/" element={<ProfilePage/>}/>
                    </Routes>

                </div>
                
        </BrowserRouter>

        </Provider>

    </QueryClientProvider>
);