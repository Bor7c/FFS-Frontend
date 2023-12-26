import React from 'react';
import { Link } from 'react-router-dom';
import "./FineCard.scss"
import CustomButton from "../CustomButton/CustomButton";
import {useDraftBreach} from "../../hooks/useDraftBreach";
import {useAuth} from "../../hooks/useAuth";
import defaultImage from '../../assets/Default.png';


const FineCard = ({fine}:{fine: any}) => {

  const { is_authenticated } = useAuth()

  const {addFineToBreach, deleteFineFromBreach} = useDraftBreach()

  const handleAdd = async () => {
    await addFineToBreach(fine.id)
  }

  const handleDelete = async () => {
    await deleteFineFromBreach(fine.id)
  }

  const backgroundImageUrl = fine.image || defaultImage;


  return (
    <div className="card">
        <div className="background-img-white">
          <div className="background-img" style={{backgroundImage: `url(${backgroundImageUrl})`}}>
            <div className="background-img-black">
              <div className="box">
                <div className="content">
                  <h2>{fine.price}₽</h2>
                  <h3>{fine.title}</h3>
                    <div className="buttons-container">
                      <Link to={`/fines/${fine.id}`}>
                        <CustomButton text="Подробнее"  />
                      </Link>
                      {is_authenticated && !location.pathname.includes("draft") && <CustomButton text="Добавить" onClick={handleAdd} /> }
                      {is_authenticated && location.pathname.includes("draft") && <CustomButton text="Удалить" onClick={handleDelete} /> }
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FineCard