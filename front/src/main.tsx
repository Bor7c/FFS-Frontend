import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Fines from "./pages/FinesPage/FinesPage.js";
import FinePage from "./pages/FinePage/FinePage.js";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";

import Navbar from "./components/Navbar/Navbar.js";
import "./styles/styles.scss"

import {QueryClient, QueryClientProvider} from "react-query";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs.js";






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
                    </Routes>

                </div>
                
        </BrowserRouter>

        </Provider>

    </QueryClientProvider>
);