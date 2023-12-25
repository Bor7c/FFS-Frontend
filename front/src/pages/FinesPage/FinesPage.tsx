import {useState, useEffect} from 'react'


import SearchFines from '../../components/SearchBar/Search.js';
import "./FinesPage.scss"
import axios from "axios";
import {useSsid} from "../../hooks/useSsid.js";
import { mockFines } from '../../assets/Mock.js';



import BreachBasket from '../../components/BreachBasket/BreachBasket.js';
import FineCard from '../../components/FineCard/FineCard.js';

const Fines = () => {
    
    const [fines, setFines] = useState({
        breach_id: null,
        fines: [],
    });

    const [titleData, setTitlePage] = useState<string>("");

    const { session_id } = useSsid()


    const searchFines = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8000/fines/search`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    title: titleData
                }
            });
    
            setFines(data);
        } catch (error) {
            console.error("Не удалось загрузить данные с сервера.", error);
            const filteredFines = filterFines(mockFines, titleData);
            setFines({
                breach_id: null,
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
        searchFines()
    }, [titleData])

    return (
        <>
        <div className="fines-wrapper">       
            <div className="top-container">

                <div className='search_in_menu'>
                <SearchFines title={titleData} setTitle={(newTitle) => {
                    setTitlePage(newTitle);
                    searchFines(); }}
                />
                </div>

            <BreachBasket />

            </div>

            <div className="bottom-container">
                {fines.fines.map((fine) => {
                    return <FineCard fine={fine} key={fine.id}/>
                })}
            </div>
        </div>
    
    </>
    )

}

export default Fines;
