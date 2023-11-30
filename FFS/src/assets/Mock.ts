import { ListFines } from '../components/Interfaces';
import defaultImage from '../assets/Default.png';

export const mockFines: ListFines = {
    breach_id: null,
    fines:[
        {
            fine_id: 1,
            picture_url: "none",
            title: 'Пример штрафа за проезд на красный свет',
            text: 'Гибдд',
            price: '800',
            fine_status: 'действует',
            image: defaultImage,
        }
    ]
}
