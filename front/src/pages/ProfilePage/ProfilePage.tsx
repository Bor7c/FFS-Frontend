import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useDraftBreach } from "../../hooks/useDraftBreach"

const ProfilePage = () => {

    const navigate = useNavigate()

    const {logOut, user_name} = useAuth()
    const { resetBreach } = useDraftBreach()


    const handleLogOut = async () => {
        await logOut()
        resetBreach()

        navigate("/fines")
    }


    

    
    return (
        <section> 

          <div className="signin"> 
       
           <div className="content"> 
       
            <h2>Профиль</h2> 

            <h2>{user_name}</h2>

            <button className="EntButton" onClick={handleLogOut}>Выйти</button>
            
       
           </div> 
       
          </div> 
       
         </section> 
    )
}

export default ProfilePage