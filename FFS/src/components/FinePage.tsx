import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import "../styles/card_item.css"
import { GetFine } from "../modules/GetFine.ts";

interface Fineint {
    fine_id: number;
    picture_url: string;
    title: string;
    text: string;
    price: string;
    fine_status: string;
    image: string;
}

const Fine = () => {
    const { id } = useParams(); // Получаем значение параметра :id из URL
    const FineId = id ? parseInt(id, 10) : null; // Преобразование в число или null

    const [Fineobj, setFine] = useState<Fineint | null>(null);

    useEffect(() => {
        if (FineId !== null) {
            GetFine(FineId)
                .then((result) => {
                    if (result.data !== null) {
                        setFine(result.data[0]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching geographical object:', error);
                });
        }
    }, [FineId]);

    if (!Fineobj) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-1">
            <span className="circle-image">
                <img style={{ width: '30%', height: 'auto' }} src={Fineobj.image} alt="" />
            </span>

            <h1 className="short_text">{Fineobj.title}</h1>

            <hr className="line" />

            <div className="container">
                <p className="info">
                {Fineobj.text}
                </p>
            </div>
        </div>
    );
};

export default Fine;