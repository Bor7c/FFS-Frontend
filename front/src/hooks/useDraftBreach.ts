import {useDispatch, useSelector} from 'react-redux';
import {
    updateBreach
} from "../store/draftBreachSlice";
import axios from "axios";
import {useSsid} from "./useSsid";

export function useDraftBreach() {

    const { session_id } = useSsid()

    const breach = useSelector(state => state.draftBreach.breach);

    const dispatch = useDispatch()

    const setBreach = (value) => {
        dispatch(updateBreach(value))
    }

    const fetchDraftBreach = async () => {

        const response = await axios(`http://localhost:8000/breaches/draft/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': session_id
            },
        })

        if (response.status != 404)
        {
            setBreach(response.data)
        }
    }

    const addFineToBreach = async (fine_id) => {
        const response = await axios(`http://localhost:8000/fines/${fine_id}/add_to_breach/`, {
            method: "POST",
            headers: {
                'authorization': session_id
            },
        })

        if (response.status == 200)
        {
            setBreach(response.data)
        }
    }

    const saveBreach = async () => {
        try {

            await axios(`http://localhost:8000/breaches/${breach.id}/update/`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': session_id
                },
                data: breach
            })

        } catch (e) {
            console.log(e)
        }
    }

    const sendBreach = async () => {

        const response = await axios(`http://localhost:8000/breaches/update_status_user/`, {
            method: "PUT",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200)
        {
            setBreach(undefined)
        }
    }

    const deleteBreach = async () => {

        const response = await axios(`http://localhost:8000/breaches/${breach.id}/delete/`, {
            method: "DELETE",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200)
        {
            setBreach(undefined)
        }
    }

    const deleteFineFromBreach = async (fine_id) => {
        const response = await axios(`http://localhost:8000/breaches/${breach.id}/delete_fine/${fine_id}/`, {
            method: "DELETE",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200) {
            setBreach(response.data)
        }
    }

    return {
        breach,
        setBreach,
        addFineToBreach,
        saveBreach,
        sendBreach,
        deleteBreach,
        deleteFineFromBreach,
        fetchDraftBreach
    };
}