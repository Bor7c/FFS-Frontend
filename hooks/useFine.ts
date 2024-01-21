import {useDispatch, useSelector} from 'react-redux';
import {updateFine} from "../store/selectedFineSlice";
import axios from "axios";
import { useSsid } from './useSsid';

export function useFine() {
    const fine = useSelector((state: any) => state.selectedFine.fine);

    const dispatch = useDispatch()

    const { session_id } = useSsid()

    const setFine = (value: any) => {
        dispatch(updateFine(value))
    }


    const fetchFine = async (fine_id: any) => {
        const {data} = await axios(`http://127.0.0.1:8000/fines/${fine_id}`, {
            method: "GET"
        });

        setFine(data)
    }

    const sendFine = async (fine_id: any, FineData: any) => {
        try {
            const response = await axios({
                method: 'PUT',
                headers: {
                    'authorization': session_id
                },
                url: `http://127.0.0.1:8000/fines/${fine_id}/edit/`,
                data: FineData,  // Передаем данные, которые хотим изменить, в теле запроса
                
            });
    
            setFine(response.data); // Обновляем состояние или что-то в этом роде
        } catch (error) {
            console.error("Error sending fine data: ", error);
            // Обработка ошибки, если получение ответа или запрос в принципе не удался
        }
    }

    const createFine = async (FineData: any) => {
        try {
            const response = await axios({
                method: 'POST',
                headers: {
                    'authorization': session_id
                },
                url: `http://127.0.0.1:8000/fines/add/`,
                data: FineData,  // Передаем данные, которые хотим изменить, в теле запроса
                
            });
    
            setFine(response.data); // Обновляем состояние или что-то в этом роде
        } catch (error) {
            console.error("Error sending fine data: ", error);
            // Обработка ошибки, если получение ответа или запрос в принципе не удался
        }
    }
    

    return {
        fine,
        setFine,
        fetchFine,
        sendFine,
        createFine
    };
}