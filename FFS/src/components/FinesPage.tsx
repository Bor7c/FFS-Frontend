import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {
    FinesResult,
    GetFilteredFines
} from '../modules/GetFines.js'
import FineCard from './FineCard.tsx';
import SearchFines from './Search.tsx';
import '../styles/navbar.scss'



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
        <nav className="mask">
            <a href="#">FFS</a>
            <div className='search_in_menu'><SearchFines setFineData={setFineData} setTitleData={setTltleData}/></div>
            <ul className="list">
            <Link to={`/fines`}>
                <li><a href="#">Штрафы</a></li>
            </Link>
            <Link to={`/breaches`}>
                <li><a href="#">Нарушения</a></li>
            </Link>
            </ul>
        </nav>

        <div className="container">
            {Fine.fines.map((object) => (
                <FineCard fineData={object}/>
            ))}
        </div>

        </>
    );
};

export default Fines;