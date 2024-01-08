import "./BreachBasket.scss"
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDraftBreach} from "../../hooks/useDraftBreach";

const BreachBasket = ({ breach_id }: { breach_id: number | null }) => {
    const { breach, fetchDraftBreach } = useDraftBreach();

    useEffect(() => {
        if(breach_id !== null) {
            fetchDraftBreach(breach_id);
        }
    }, [breach_id]);

    return (
        <>
            <Link
                to={`/breaches/${breach_id}/`}
                onClick={(e) => { if (breach == null) e.preventDefault(); }}
                className={`lesson-constructor-container ${breach == null ? 'disabled-link' : ''}`} 
            >
                <span className="title">Нарушение</span>
                {breach?.fines?.length > 0 && <span className="badge">{breach?.fines?.length}</span>}
            </Link>
        </>
    );
};

export default BreachBasket;