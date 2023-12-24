import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {useFine} from "../../hooks/useFine";
import { useAuth } from "../../hooks/useAuth";

const Breadcrumbs = () => {

    const location = useLocation()

    let currentLink = ''

    const { fine, setFine } = useFine()
    const {is_moderator} = useAuth()

    const resetSelectedSpare = () => setFine(undefined)

    const fines = is_moderator ? "Редактировать Штрафы" : "Штрафы";

    const topics = {
        "fines": fines,
        "draft": "Новое нарушение",
        "breaches": "Нарушения",
        "login": "Вход",
        "profile": "Профиль",
        "add-fine": "Добавить Штраф"
    }


    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedSpare}>
                        { topics[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('fines/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {fine?.title}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        // if (currentLink.match(new RegExp('fines_change/(\d*)')))
        // {
        //     return (
        //         <div className={"crumb"} key={crumb}>

        //             <Link to={currentLink}>
        //                {fine?.title}
        //             </Link>

        //             <FaChevronRight className={"chevron-icon"}/>

        //         </div>
        //     )
        // }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/fines"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;