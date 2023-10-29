export interface Fine {
    fine_id: number;
    picture_url: string;
    title: string;
    text: string;
    price: string;
    fine_status: string;
    image: string;
}

export interface FineResult {
    data: Fine[] | null;
}

export const GetFine = async (fine_id: number): Promise<FineResult> => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/fines/${fine_id}/`);
        if (!response.ok) {
            throw new Error('Запрос незадался!');
        }
        const data: Fine = await response.json();
        return {
           data: [data],
        };
    } catch (error) {
        console.error('Ошибка запроса штрафа:', error);
        return {
            data: null,
        };
    }
};