import "./BreachPage.sass"
import {useNavigate} from "react-router-dom";
import {useDraftBreach} from "../../hooks/useDraftBreach";
import FineCard from "../../components/FineCard/FineCard";
import {useAuth} from "../../hooks/useAuth";
import {useEffect} from "react";

const BreachPage = () => {
    const navigate = useNavigate()

    const {is_authenticated, is_moderator} = useAuth()

    const {breach, sendBreach, deleteBreach} = useDraftBreach()

    useEffect(() => {
        if (!is_authenticated || is_moderator) {
            navigate("/fines")
        }
    }, [])

    if (!is_authenticated || is_moderator){
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

    const cards = breach.fines.map(fine  => (
        <FineCard fine={fine} key={fine.id}/>
    ))

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
                    <h3>Штрафы в нарушении</h3>
                </div>

                <div className="bottom">
                    {cards}
                </div>
            </div>

            <div className="buttons-wrapper">

                <button className="order-button" onClick={handleAdd}>Отправить</button>

                <button className="delete-button" onClick={handleDelete}>Удалить</button>

            </div>


        </div>
    )
}

export default BreachPage