import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const ProfilePage = () => {

    const navigate = useNavigate()

    const {logOut} = useAuth()

    const handleLogOut = async () => {
        await logOut()

        navigate("/fines")
    }


    

    
    return (
        <div>
            <h3>Профиль</h3>

            <span>asdfsaf</span>
            <button onClick={handleLogOut}>Выйти</button>
        </div>
    )
}

export default ProfilePage