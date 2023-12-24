import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import "./navbar.scss"

const Navbar = () => {

    const {is_authenticated, is_moderator, user_name, auth} = useAuth()

    useEffect(() => {
        auth()
    }, []);


    return (
        <div>
            <nav className="mask">

            <Link to={`/fines`}>
                FFS
            </Link>

            <ul className="list">

                <Link to={`/fines`}>
                    <li>Штрафы</li>
                </Link>


                {is_authenticated && is_moderator &&
                <Link to={`/fines_change`}>
                    <li>Редактировать Штрафы</li>
                </Link>
                }

                {is_authenticated && 
                <Link to={`/breaches`}>
                    <li>Нарушения</li>
                </Link>
                }


                {!is_authenticated && 
                    <Link to={`/login`}>
                        <li>Вход</li>
                    </Link>
                }      

                {is_authenticated && 
                    <Link to={`/profile`}>
                        <li>{user_name}</li>
                    </Link>
                }      


            </ul>
        </nav>
        </div>
    )
}

export default Navbar
