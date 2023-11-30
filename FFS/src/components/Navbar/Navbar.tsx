import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const Navbar = () => {

    const {is_authenticated, user_name, auth} = useAuth()

    useEffect(() => {
        auth()
    }, []);


    return (
        <div>
            <nav className="mask">

            <Link to={`/fines`}>
                    <a href="#">FFS</a>
            </Link>

            <ul className="list">

                <Link to={`/fines`}>
                    <li><a href="#">Штрафы</a></li>
                </Link>

                <Link to={`/breaches`}>
                    <li><a href="#">Нарушения</a></li>
                </Link>

                {!is_authenticated && 
                    <Link to={`/login`}>
                        <li><a href="#">Вход</a></li>
                    </Link>
                }      

                {is_authenticated && 
                    <Link to={`/profile`}>
                        <li><a href="#">{user_name}</a></li>
                    </Link>
                }      


            </ul>
        </nav>
        </div>
    )
}

export default Navbar
