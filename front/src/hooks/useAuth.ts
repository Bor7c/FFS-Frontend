import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../store/authSlice";
import axios from "axios";
import { useSsid } from './useSsid';

export function useAuth() {
  const {is_authenticated, is_moderator, user_id, user_name} = useSelector(state => state.user)

  const { session_id, setSsid, resetSsid } = useSsid()

  const dispatch = useDispatch()

  const setUser = (value: any) => {
    // Сохраняем данные пользователя в localStorage
    localStorage.setItem('user', JSON.stringify(value));
    dispatch(updateUser(value));
  };

  const resetUser = () => {
    // Удаляем данные пользователя из localStorage
    localStorage.removeItem('user');
    dispatch(cleanUser());
  };

  const initializeUserFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(updateUser(JSON.parse(storedUser)));
    }
  };

  const logOut = async () => {

    try {

      const response = await axios(`http://localhost:8000/accounts/logout/`, {
        method: "POST",
        headers: {
          'authorization': session_id
        }
      })

      if (response.status == 200)
      {
        resetSsid()
        resetUser()
      }

    } catch (error) {
      console.log("Что-то пошло не так")
    }

  }

  const login = async (formData: any) => {

      const response = await axios(`http://127.0.0.1:8000/accounts/login/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        data: formData as FormData
      })

      if (response.status == 201) {

        console.log(response.data)
        console.log(response.data['session_id'])

        setSsid(response.data['session_id'])

        const data = {
          is_authenticated: true,
          is_moderator: response.data["is_moderator"],
          user_id: response.data["user_id"],
          user_name: response.data["username"],
        }
      
      console.log(`Добро пожаловать, ${response.data["username"]}!`)

      setUser(data)

        return true
      }

      return false

  }

  const register = async (formData: any) => {

    const response = await axios(`http://127.0.0.1:8000/accounts/register/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      data: formData as FormData
    })

    if (response.status == 201) {

      console.log(response.data)
      console.log(response.data['session_id'])

      setSsid(response.data['session_id'])

      const data = {
        is_authenticated: true,
        is_moderator: response.data["is_moderator"],
        user_id: response.data["user_id"],
        user_name: response.data["username"],
      }
    
      console.log(`Добро пожаловать, ${response.data["username"]}!`)

      setUser(data)

      return true
    }

    return false

  }


  const auth = async () => {

    if (is_authenticated)
    {
      return true
    }

    if (session_id === "undefined") {
      return false
    }

    const response = await axios(`http://localhost:8000/accounts/check/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'authorization': session_id
        },
    })

  if (response.status == 200) {

    const data = {
        is_authenticated: true,
        is_moderator: response.data["is_moderator"],
        user_id: response.data["user_id"],
        user_name: response.data["username"],
    }

    console.log(`Добро пожаловать, ${response.data["username"]}!`)

    setUser(data)

    return true
  }

  return false
}

  return {
    is_authenticated,
    is_moderator,
    user_id,
    user_name,
    setUser,
    logOut,
    login,
    auth,
    initializeUserFromStorage,
    register,
  };
}