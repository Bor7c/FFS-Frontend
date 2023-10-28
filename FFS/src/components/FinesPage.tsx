import {useState, useEffect} from 'react'
import {
    FinesResult,
    GetFilteredFines
} from '../modules/GetFines.js'
import FinesCard from './FineCard.tsx';
// import "../styles/main_menu.css"
// import "../styles/search_button.css"
// import FiltrationGeographicalObject from "./Filtration.tsx";


function Fines() {
    // Мы создаём состояние geographical_object и функцию для его обновления с начальным значением
    // {count: 0, data: []}, представляющим пустой список географических объектов.
    const [Fine, setFine] = useState<FinesResult>({
        breach_id: null,
        fines: []
    });

    // // Для пагинации
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 5;

    // Мы определяем функцию fetchData, которая асинхронно загружает данные географических объектов
    // с использованием GET_GeographicalObjectsPaginations и обновляет состояние geographical_object.
    const fetchData = async (title: string) => {
        const data = await GetFilteredFines(title);
        setFine(data);
    };

    // Мы используем useEffect, чтобы выполнить загрузку данных при монтировании компонента
    // и при изменении текущей страницы.
    useEffect(() => {
        fetchData(title);
    });


    const [title, titleData] = useState('');

    return (
        <>
            <form className="form-s" action="{% url 'order_url' %}" method="get">
                <input className="input_text" name="text" type="search"/>
                <button className="fa fa-search" name="search">Поиск</button>
            </form>
            <div className="container">
                {Fine.fines.map((object) => (
                    <FinesCard fine_id={object.fine_id} fineData={object}/>
                ))}
            </div>
        </>
    );
};

export default Fines;