import {useDispatch, useSelector} from 'react-redux';
import {updateFine} from "../store/selectedFineSlice";
import axios from "axios";

export function useFine() {
    const fine = useSelector(state => state.selectedFine.fine);

    const dispatch = useDispatch()

    const setFine = (value: any) => {
        dispatch(updateFine(value))
    }


    const fetchFine = async (fine_id: any) => {
        const {data} = await axios(`http://127.0.0.1:8000/fines/${fine_id}`, {
            method: "GET"
        });

        setFine(data)
    }

    const sentFine = async (fine_id: any, FineData: any) => {
        const {data} = await axios(`http://127.0.0.1:8000/fines/${fine_id}/edit/`, {
            method: "PUT"
        });

        setFine(data)
    }

    return {
        fine,
        setFine,
        fetchFine,
        sentFine,
    };
}