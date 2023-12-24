import "./BreachBasket.scss"
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDraftBreach} from "../../hooks/useDraftBreach";

const BreachBasket = () => {
    const {breach, fetchDraftBreach} = useDraftBreach()

    useEffect(() => {
        fetchDraftBreach()
    }, [])

    return (
        <Link
            to={breach ? "/breaches/draft/" : "#"}
            onClick={(e) => { if (breach == null) e.preventDefault(); }}
            className={`lesson-constructor-container ${breach == null ? 'disabled-link' : ''}`} 
        >
            <span className="title">Нарушение</span>
            {breach?.fines?.length > 0 && <span className="badge">{breach?.fines?.length}</span>}
        </Link>
    )
}

export default BreachBasket