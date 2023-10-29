import defaultImage from '../assets/Default.png';


// Мы определяем интерфейс GeographicalObject, который описывает структуру данных географического объекта
export interface Fine {
    fine_id: number;
    picture_url: string;
    title: string;
    text: string;
    price: string;
    fine_status: string;
    image: string;
}

// Мы также создаём интерфейс GeographicalObjectResult для описания структуры результата запроса
export interface FinesResult {
    breach_id: number | null;
    fines: Fine[];
}

export const GetFilteredFines = async (titleData: string): Promise<FinesResult> => {
    try {
        // Определяем параметры запроса, включая номер страницы и количество объектов на странице
        const params = new URLSearchParams({
            title: titleData,
        });

        // Формируем URL запроса с параметрами
        let url = '';
        if(titleData == null){
            url = `http://127.0.0.1:8000/fines/`;
        } else{
            url = `http://127.0.0.1:8000/fines/?${params}`;
        }
        // Отправляем GET-запрос на сервер
        const response = await fetch(url);

        // if (!response.ok) {
        //     return {
        //         // @ts-ignore
        //         data: mockGeographicalObjects.data
        //     }
        // }

        const List: FinesResult = await response.json();
        const Fines = List.fines;
        // Парсим ответ в формат JSON и сохраняем в переменной 'data'

        // Если url_photo пустой, и заменить его на изображение по умолчанию
        if (Array.isArray(Fines)) {
            Fines.forEach(item => {
                if (!item.image) {
                    item.image = defaultImage;
                }
            });
        }
        // const count = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        return {
            breach_id: List.breach_id,   
            fines: Fines,
        };
    } catch (error) {
        // console.error('Error fetching geographical objects:', error);
        return {
            breach_id: null,  
            fines: [],
        }
    }
};