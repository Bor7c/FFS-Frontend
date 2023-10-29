import {useState, useEffect} from 'react'
import {
    FinesResult,
    GetFilteredFines
} from '../modules/GetFines.js'
import FineCard from './FineCard.tsx';
// import "../styles/main_menu.css"
// import "../styles/search_button.css"
// import FiltrationGeographicalObject from "./Filtration.tsx";


function Fines() {
    
    const [Fine, setFine] = useState<FinesResult>({
        breach_id: null,
        fines:[],
    });

    const fetchData = async () => {
        const data = await GetFilteredFines();
        setFine(data);
    };

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <>
            <form className="form-s" action="{% url 'order_url' %}" method="get">
                <input className="input_text" name="text" type="search"/>
                <button className="fa fa-search" name="search">Поиск</button>
            </form>
            <div className="container">
                {Fine.fines.map((object) => (
                    <FineCard fineData={object}/>
                ))}
            </div>
        </>
    );
};

export default Fines;