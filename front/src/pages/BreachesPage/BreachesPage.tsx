
import { useAuth } from "../../hooks/useAuth";
import {BreachesTable} from "./BreachesTable/BreachesTable";
import { BreachesTableAdmin } from "./BreachesTable/BreachesTableAdmin";

const Breaches = () => {


    const { is_moderator } = useAuth()
    return (
        <div>
            {!is_moderator && <BreachesTable />}
            {is_moderator && <BreachesTableAdmin />}
        </div>
    )
}

export default Breaches;

