import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./FinePage.scss"
import {useFine} from "../../hooks/useFine";

const FinePage = () => {
    const { id } = useParams(); // Получаем значение параметра :id из URL
    const FineId = id ? parseInt(id, 10) : null; // Преобразование в число или null

    const {fine, fetchFine} = useFine()

    useEffect(() => {
        if (FineId !== null) {
            fetchFine(FineId)
        }
    }, [FineId]);

    if (!fine) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-1">
            <span className='circle-image'>
                <img src={fine.image} alt=""/>
            </span>

            <h1 className="short_text">{fine.title}</h1>

            <hr className="line" />

            <div className="container">
                <p className="info">
                    {fine.text}
                </p>
            </div>
        </div>

    );
};

export default FinePage;