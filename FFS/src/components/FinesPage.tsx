import {useState, useEffect} from 'react'
import {
    FinesResult,
    GetFilteredFines
} from '../modules/GetFines.js'
import FineCard from './FineCard.tsx';
import SearchFines from './Search.tsx';
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
            <SearchFines
                setFineData={setFineData}
                setTitleData={setTltleData}
            />
            <div className="container">
                {Fine.fines.map((object) => (
                    <FineCard fineData={object}/>
                ))}
            </div>
        </>
    );
};

export default Fines;