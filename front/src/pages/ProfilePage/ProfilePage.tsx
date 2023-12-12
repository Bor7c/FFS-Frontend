import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const ProfilePage = () => {

    const navigate = useNavigate()

    const {logOut, user_name} = useAuth()


    const handleLogOut = async () => {
        await logOut()

        navigate("/fines")
    }


    

    
    return (
        // <div>
        //     <h3>Профиль</h3>

        //     <span>{user_name}</span>
        //     <button onClick={handleLogOut}>Выйти</button>
        // </div>
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