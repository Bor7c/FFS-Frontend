import defaultImage from '../assets/Default.png';

const mockFines = [
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


export const getMockFines = () => {
    return {
        fines: mockFines,
    };
};