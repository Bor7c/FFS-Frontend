import {useDispatch, useSelector} from 'react-redux';
import {updateFine} from "../store/selectedFineSlice";
import axios from "axios";

export function useFine() {
    const fine = useSelector(state => state.selectedFine.fine);

    const dispatch = useDispatch()

    const setFine = (value) => {
        dispatch(updateFine(value))
    }

    const fetchFine = async (fine_id) => {
        const {data} = await axios(`http://127.0.0.1:8000/fines/${fine_id}`, {
            method: "GET"
        });

        setFine(data)
    }

    return {
        fine,
        setFine,
        fetchFine
    };
}