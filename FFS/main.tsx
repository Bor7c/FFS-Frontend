import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Fines from "./FinesPage/FinesPage";
import Fine from "./src/pages/FinePage/FinePage";
import Breaches from "./src/pages/BreachesPage/BreachesPage";
import ReactDOM from "react-dom/client";
import LoginPage from "./src/pages/LoginPage/LoginPage";
import { Provider } from "react-redux";
import store from "./src/store/store";
import ProfilePage from "./src/pages/ProfilePage/ProfilePage";
import Navbar from "./src/components/Navbar/Navbar";
import "./styles/styles.scss"
import BreachPage from "./src/pages/BreachPage/BreachPage";
import {QueryClient, QueryClientProvider} from "react-query";
import Breadcrumbs from "./src/components/Breadcrumbs/Breadcrumbs";

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
                        <Route path="fines/:id" element={<Fine/>}/>
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