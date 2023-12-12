import React from 'react';
import { Link } from 'react-router-dom';
import "./FineCard.scss"
import CustomButton from "../CustomButton/CustomButton";
import {useDraftBreach} from "../../hooks/useDraftBreach";
import {Fine} from "../Interfaces";
import {useAuth} from "../../hooks/useAuth";


const FineCard = ({fine}:{fine:Fine}) => {

  const {is_authenticated, is_moderator} = useAuth()

  const {addFineToBreach, deleteBreachFromFine} = useDraftBreach()

  const handleAdd = async () => {
    await addFineToBreach(fine.id)
  }

  const handleDelete = async () => {
    await deleteBreachFromFine(fine.id)
  }

  return (
    <div className="card">
        <div className="background-img-white">
          <div className="background-img" style={{backgroundImage: `url(${fine.image})`}}>
            <div className="background-img-black">
              <div className="box">
                <div className="content">
                  <h2>{fine.price}₽</h2>
                  <h3>{fine.title}</h3>
                    <div className="buttons-container">
                      <Link to={`/fines/${fine.id}`}>
                        <CustomButton text="Подробнее"  />
                      </Link>
                      {is_authenticated && !is_moderator && location.pathname.includes("fines") && <CustomButton text="Добавить" onClick={handleAdd} /> }
                      {is_authenticated && !is_moderator && location.pathname.includes("draft") && <CustomButton text="Удалить" onClick={handleDelete} /> }
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