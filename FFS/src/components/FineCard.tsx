import React from 'react';
import { Link } from 'react-router-dom';
import Podrobnee_button from './Podrobnee_button.tsx';
import defaultImage from '../assets/Default.png';
import "../styles/styles.css"
import "../styles/FineCard.css"

interface Fine {
    fine_id: number;
    picture_url: string;
    title: string;
    price: string;
    fine_status: string;
    image: string;
}


const FineCard: React.FC<{fineData: Fine, isMock: boolean}> = ({fineData, isMock}) => {
  const img = fineData.image
  return (
    <div className="card">
        <div className="background-img-white">
          <div className="background-img" style={{backgroundImage: `url(${isMock ? defaultImage : img})`}}>
            <div className="background-img-black">
              <div className="box">
                <div className="content">
                  <h2>{fineData.price}₽</h2>
                  <h3>{fineData.title}</h3>
                  <Link to={`/fines/${fineData.fine_id}`}>
                    <Podrobnee_button Btext="Подробнее"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FineCard