import "./BreachPage.scss"
import {useNavigate, useParams} from "react-router-dom";
import {useDraftBreach} from "../../hooks/useDraftBreach";
import FineCard from "../../components/FineCard/FineCard";
import {useAuth} from "../../hooks/useAuth";
import {useEffect} from "react";


const BreachPage = () => {
    const { id } = useParams();
    const BreachID = id ? parseInt(id, 10) : null;

    const navigate = useNavigate()

    const {is_authenticated} = useAuth()

    const {breach, sendBreach, deleteBreach, fetchDraftBreach} = useDraftBreach()

    // useEffect(() => {
    //     if (!is_authenticated) {
    //         navigate("/fines")
    //     }
    // }, [])

    useEffect(() => {
        if(BreachID !== null) {
            fetchDraftBreach(BreachID);
        }
    }, [BreachID]);

    if (!is_authenticated){
        return
    }

    if (breach == undefined)
    {
        return (
            <div className="order-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const cards = breach.fines.map((fine) => (
        <FineCard fine={fine} key={fine.id} onFineAction={() => fetchDraftBreach(BreachID)}/>
      ));

    const handleAdd = async () => {
        await sendBreach()
        navigate("/breaches")
    }

    const handleDelete = async () => {
        await deleteBreach()
        navigate("/fines")
    }

    return (
        <div className="breach-page-wrapper">
        <div className="fines-wrapper">
            <div className="top">
                <h3>Нарушение {breach && breach.status !== 1 && (<h3>Нарушитель: {breach.name}</h3>)}</h3>
            </div>

            <div className="bottom">
                {cards}
            </div>
        </div>

        {breach && breach.status === 1 && (
            <div className="buttons-wrapper">
                <button className="order-button" onClick={handleAdd}>Отправить</button>
                <button className="delete-button" onClick={handleDelete}>Удалить</button>
            </div>
        )}

        </div>
    )
}

export default BreachPage