import React from 'react';
import { Link } from 'react-router-dom';
// import "../styles/card_item.css"

interface Fine {
    fine_id: number;
    picture_url: string;
    title: string;
    price: string;
    fine_status: string;
    image: string;
}

const FinesCard: React.FC<{fine_id: number; fineData: Fine;}> = ({fineData}) => {
    return (
        <div className="container-item" key={fineData.fine_id} style={{width: '10%', height: 'auto'}}>
            <div className="wrapper">
                <img src={fineData.price} style={{width: 'auto', height: '50%'}}/>
            </div>
            <div className="button-wrapper">
                <input type="text" name="id" value={fineData.fine_id} style={{display: 'none'}}/>
                <Link to={`/geographical_object/${fineData.fine_id}`}>
                    <button className="btn fill">Посмотреть</button>
                </Link>
            </div>
        </div>
        
    );
};

export default FinesCard;