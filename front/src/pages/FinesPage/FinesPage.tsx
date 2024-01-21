import {useState, useEffect} from 'react'


import SearchFines from '../../components/SearchBar/Search.js';
import "./FinesPage.scss"
import axios from "axios";
import {useSsid} from "../../hooks/useSsid.js";
import { mockFines } from '../../assets/Mock.js';

import { useFilters } from "../../hooks/UseFilters"


// import BreachBasket from '../../components/BreachBasket/BreachBasket.js';
import FineCard from '../../components/FineCard/FineCard.js';

const Fines = () => {
    // type MyType = number | null;
    // const [breach_id, setBreachId] = useState<MyType>(null);

    const [finesList, setFines] = useState({
        fines: [],
    });


    const { session_id } = useSsid()

    const { filters, updateTitle } = useFilters();


    const searchFines = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8000/fines/search/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    title: filters.title
                },
                maxRedirects: 0
            });
            console.log(data);
            // setBreachId(data.breach_id)
            setFines({
                fines: data.fines, // предполагая, что это массив штрафов
            });
        } catch (error) {
            console.error("Не удалось загрузить данные с сервера.", error);
            const filteredFines = filterFines(mockFines, filters.title);
            // setBreachId(null)
            setFines({
                fines: filteredFines,
            });
        }
    };

    const filterFines = (fines: any, searchText: any) => {
        return fines.filter((fine: any) => {
            const titleLowerCase = fine.title.toLowerCase();
            const searchTextLowerCase = searchText.toLowerCase();
            return titleLowerCase.includes(searchTextLowerCase);
        });
    };
    

    useEffect(() => {
        searchFines();
    }, [filters.title])

    return (
        <>
        <div className="fines-wrapper">       
            <div className="top-container">

                <div className='search_in_menu'>
                <SearchFines 
                 title={filters.title}
                 setTitle={(newTitle) => {
                   updateTitle(newTitle);
                   searchFines();
                 }}
                />
                </div>

                
            {/* <div>{breach_id}</div>
            <BreachBasket breach_id={breach_id}/> */}
            

            </div>

            <div className="bottom-container">
                {finesList.fines.map((fine: any) => {
                    return <FineCard fine={fine} key={fine.id}  onFineAction={searchFines}/>
                })}
            </div>
        </div>
    
    </>
    )

}

export default Fines;
