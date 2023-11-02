import React from 'react';
import { Link } from 'react-router-dom';
import Podrobnee_button from './Podrobnee_button';
import "../styles/styles.css"

interface Fine {
    fine_id: number;
    picture_url: string;
    title: string;
    price: string;
    fine_status: string;
    image: string;
}


const FineCard: React.FC<{fineData: Fine}> = ({fineData}) => {
  return (
<div className="card">
    <div className="background-img-white">
      <div className="background-img" style={{backgroundImage: `url(${fineData.image})`}}>
        <div className="background-img-black">
          <div className="box">
            <div className="content">
              <h2>{fineData.price}₽</h2>
              <h3>{fineData.title}</h3>
              <Link to={`/fines/${fineData.fine_id}`}>
                <Podrobnee_button/>
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