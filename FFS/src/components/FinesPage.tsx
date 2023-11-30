import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { ListFines } from './Interfaces.ts';
import { mockFines } from '../assets/Mock.ts';
import FineCard from './FineCard.tsx';
import SearchFines from './Search.tsx';
import '../styles/navbar.scss'
import { useSsid } from '../hooks/useSsid.ts';
import { useAuth } from '../hooks/useAuth.ts';



const Fines = () => {
    
    const [Fines, setFines] = useState<ListFines>({
        breach_id: null,
        fines:[],
    });

    const [titleData, setTltleData] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchFines = async () => {

        try {

            // Определяем параметры запроса, включая номер страницы и количество объектов на странице
            const params = new URLSearchParams({
                title: titleData,
            });

            const response = await fetch(`http://127.0.0.1:8000/fines/?${params}`, {
                method: "GET",
                signal: AbortSignal.timeout(1000)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const ListFines: ListFines = await response.json()
            setFines(ListFines)
            setIsMock(false)

        } catch (e) {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true);
        setFines(mockFines)
    }

    useEffect(() => {
        searchFines()
    }, [titleData])

    return (
        <div>
            
            <div className='search_in_menu'><SearchFines title={titleData} setTitle={setTltleData}/></div>

            <div className="container">
                {Fines.fines.map((object) => (
                    <FineCard fineData={object} isMock={isMock}/>
                ))}
            </div>

        </div>
    )
}

export default Fines;
