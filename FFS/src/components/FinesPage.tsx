import {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import {
    FinesResult,
    GetFilteredFines
} from '../modules/GetFines.js'
import FineCard from './FineCard.tsx';
import SearchFines from './Search.tsx';
import '../styles/new.scss'
// import "../styles/main_menu.css"
// import "../styles/search_button.css"
// import FiltrationGeographicalObject from "./Filtration.tsx";


function Fines() {
    
    const [Fine, setFine] = useState<FinesResult>({
        breach_id: null,
        fines:[],
    });

    const fetchData = async (tltleData: any) => {
        const data = await GetFilteredFines(tltleData);
        setFine(data);
    };

    useEffect(() => {
        fetchData(tltleData);
    },[]);

    const setFineData = (data: any) => {
        console.log('After filtration: ', data)
        setFine(data);
    }

    const [tltleData, setTltleData] = useState('');


    return (
        <>
            <div className="header">  
            <div className="header__logo">
                <strong>FFS</strong>
                <SearchFines
                    setFineData={setFineData}
                    setTitleData={setTltleData}
                />
            </div>
            <nav className="navbar">
                <ul className="navbar__menu">
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><i data-feather="home"></i><span>ШТрафы</span> </a>
                </li>
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><i data-feather="message-square"></i><span>Нарушение</span></a>        
                </li>
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><i data-feather="users"></i><span>Поиск</span></a>        
                </li>
                </ul>
            </nav>
            </div>



            <div className="container">
                {Fine.fines.map((object) => (
                    <FineCard fineData={object}/>
                ))}
            </div>
        </>
    );
};

export default Fines;