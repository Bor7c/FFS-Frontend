import React from 'react';
import { Link } from 'react-router-dom';
import Podrobnee_button from './Podrobnee_button.js';
import "../styles/styles.css"
import "../styles/FineCard.css"

export interface Breach {
  breach_id: number;
  user: number;
  closed_date: Date | null;
  created_date: Date | null;
  pformated_daterice: Date | null;
  breach_status: string;
  moder_id: number;
  User_login:string;
}


const BreachCard: React.FC<{BreachData: Breach}> = ({BreachData}) => {
  return (
<div className="card">
    <div className="background-img-white">
      
        <div className="background-img-black">
          <div className="box">
            <div className="content">
              <h2>{BreachData.breach_status}</h2>
              <h3>{BreachData.User_login}</h3>
              <Link to={`/breaches/${BreachData.breach_id}`}>
                <Podrobnee_button Btext="Подробнее"/>
              </Link>
            </div>
          </div>
        </div>
      
    </div>
</div>

  )
}

export default BreachCard