import { Link } from 'react-router-dom';
import "./FineCard.scss"
import CustomButton from "../CustomButton/CustomButton";
import {useDraftBreach} from "../../hooks/useDraftBreach";
import {useAuth} from "../../hooks/useAuth";
import defaultImage from '../../assets/Default.png';


const FineCard = ({fine, onFineAction}:{fine: any, onFineAction: (id?: number) => Promise<void>}) => {

  const { is_authenticated } = useAuth()

  const {breach, addFineToBreach, deleteFineFromBreach} = useDraftBreach()

  const handleAdd = async () => {
    await addFineToBreach(fine.id)
    if(onFineAction) {
      onFineAction();
    }

  }

  const handleDelete = async () => {
    await deleteFineFromBreach(fine.id)
    if (onFineAction) {
      onFineAction(fine.id); // `onFineAction` is called with `fine.id`
    }
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
                        <CustomButton text="Подробнее" onClick={""} />
                      </Link>
                      {is_authenticated && location.pathname.includes("fines") && <CustomButton text="Добавить" onClick={handleAdd} /> }
                      {breach && breach.status === 1 && is_authenticated && location.pathname.includes("breaches") && <CustomButton text="Удалить" onClick={handleDelete} /> }
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


