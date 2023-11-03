// import Base from "./components/Base.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Fines from "./FinesPage.tsx";
import Fine from "./FinePage.tsx";
import ReactDOM from "react-dom/client";
// import GeographicalObject from "./components/GeographicalObject.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
        <BrowserRouter>
            <Routes>
                <Route path="fines/" element={<Fines/>}/>
                <Route path="fines/:id" element={<Fine/>}/>
            </Routes>
    </BrowserRouter>
);