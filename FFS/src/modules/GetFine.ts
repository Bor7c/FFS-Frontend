// Мы создаём интерфейс GeographicalObject, который описывает структуру данных географического объекта
export interface Fine {
    fine_id: number;
    picture_url: string | null;
    title: string;
    price: string | string;
    fine_status: string; 
}

// Мы также создаём интерфейс FineResult для описания структуры результата запроса
export interface FineResult {
    count: number; // Количество объектов в результате
    data: Fine[]; // Массив объектов
}

// Функция GET_Fine получает данные о географическом объекте по его id
export const GetFine = async (fine_id: number): Promise<FineResult> => {
    try {
        // Мы отправляем GET-запрос на сервер, указывая id объекта в URL
        const response = await fetch(`http://127.0.0.1:8000/fines/${fine_id}`);
        // Если сервер возвращает успешный ответ (status 200), то мы разбираем JSON-данные и возвращаем результат
        if (!response.ok) {
            throw new Error('Запрос успешен');
        }
        const data: Fine = await response.json();
        // Мы возвращаем объект GeographicalObjectResult, указывая, что в результате только один объект
        return {
            count: 1, // Только один объект, если запрос успешен
            data: [data],
        };
    } catch (error) {
        // Мы ловим ошибку, если запрос завершился неудачей, и выводим её в консоль
        console.error('Ошибка запроса штрафа:', error);
        // В случае ошибки возвращаем пустой результат с count = 0
        return {
            count: 0,
            data: [],
        };
    }
};