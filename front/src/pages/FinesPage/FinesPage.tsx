import {useState, useEffect} from 'react'
import { ListFines } from '../../components/Interfaces.ts';
import SearchFines from './SearchBar/Search.tsx';
import FineCard from "../../components/FineCard/FineCard";
import BreachBasket from "../../components/BreachBasket/BreachBasket";
import "./FinesPage.sass"
import axios from "axios";
import {useSsid} from "../../hooks/useSsid";
import { mockFines } from '../../assets/Mock.ts';

const Fines = () => {
    
    const [fines, setFines] = useState<ListFines>({
        breach_id: null,
        fines: [],
    });

    const [titleData, setTitlePage] = useState<string>("");

    const { session_id } = useSsid()

    const searchFines = async () => {

        const {data} = await axios(`http://127.0.0.1:8000/fines/search`, {
            method: "GET",
            headers: {
                'authorization': session_id
            },
            params: {
                title: titleData
            }
        })

        setFines(data)

    }

    useEffect(() => {
        searchFines()
    }, [titleData])

    return (
        <div className="fines-wrapper">

            <div className="top-container">

                <div className='search_in_menu'>
                    <SearchFines title={titleData} setTitle={setTitlePage}/>
                </div>

                <BreachBasket />

            </div>

            <div className="bottom-container">
                {fines.fines.map((fine) => {
                    return <FineCard fine={fine} key={fine.id}/>
                })}
            </div>

        </div>
    )
}

export default Fines;
