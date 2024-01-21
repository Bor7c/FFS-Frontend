import "./BreachBasket.scss"
import {Link} from "react-router-dom";


const BreachBasket = ({ breach_id }: { breach_id: number | null }) => {

    // useEffect(() => {
    //     if(breach_id !== null) {
    //         fetchDraftBreach(breach_id);
    //     }
    // }, [breach_id]);

    return (
        <>
            <Link
                to={`/breaches/${breach_id}/`}
                onClick={(e) => { if (breach_id == null) e.preventDefault(); }}
                className={`lesson-constructor-container ${breach_id == null ? 'disabled-link' : ''}`} 
            >
                <span className="title">Нарушение</span>
                {/* {breach?.fines?.length > 0 && <span className="badge">{breach?.fines?.length}</span>} */}
            </Link>
        </>
    );
};

export default BreachBasket;