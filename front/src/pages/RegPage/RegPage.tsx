import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import "./RegPage.css"

const RegPage = () => {


    const {register, auth} = useAuth()

    
    const navigate = useNavigate()


    const handleSubmit = async(e: any ) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const flag = await register(formData)
        
        if (flag) {
            navigate("/fines")
        }
    }

    const handleAuth  = async() => {
        console.log("handleAuth")
        const flag = await auth()
        if(flag){
            navigate("/fines")
        }
    }

    useEffect(() => {
        handleAuth()
    }, []);
    

    return (

          <section> 

          <div className="signin"> 
       
           <div className="content"> 
       
            <h2>Регистрация</h2> 
       
            <form className="form" onSubmit={handleSubmit}> 
       
                <div className="inputBox"> 
        
                <input type="text" name="username"/>
        
                </div> 
        
                <div className="inputBox"> 
        
                <input type="password" name="password"/>
        
                </div>
    
                <button className="EntButton" type="submit">Зарегестрироваться</button>
                <Link className="LinkR" to={`/login`}>
                    <button className="EntButton" type="submit">Войти</button>
                </Link>
            </form> 
       
           </div> 
       
          </div> 
       
         </section> 
    )
}

export default RegPage;
