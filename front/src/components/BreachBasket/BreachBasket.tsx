import "./BreachBasket.sass"
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDraftBreach} from "../../hooks/useDraftBreach";

const BreachBasket = () => {
    const {breach, fetchDraftBreach} = useDraftBreach()

    useEffect(() => {
        fetchDraftBreach()
    }, [])

    return (
        <Link to="/breaches/draft/" className="lesson-constructor-container" style={{ textDecoration: 'none' }}>
            <span className="title">Новое нарушение</span>
            {breach?.fines?.length > 0 && <span className="badge">{breach?.fines?.length}</span>}
        </Link>
    )
}

export default BreachBasket