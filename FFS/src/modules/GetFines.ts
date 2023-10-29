import defaultImage from '../assets/Default.png';
import { getMockFines } from '../assets/MockFines';

export interface Fine {
    fine_id: number;
    picture_url: string;
    title: string;
    text: string;
    price: string;
    fine_status: string;
    image: string;
}

export interface FinesResult {
    breach_id: number | null;
    fines: Fine[];
}

export const GetFilteredFines = async (titleData: string): Promise<FinesResult> => {
    const mockFines = getMockFines();

    try {
        const params = new URLSearchParams({
            title: titleData,
        });

        let url = '';
        if(titleData == null){
            url = `http://127.0.0.1:8000/fines/`;
        } else{
            url = `http://127.0.0.1:8000/fines/?${params}`;
        }
        const response = await fetch(url);

        if (!response.ok) {
            return {
                breach_id: null,
                // @ts-ignore
                fines: mockFines.fines
            }
        }

        const List: FinesResult = await response.json();
        const Fines = List.fines;

        if (Array.isArray(Fines)) {
            Fines.forEach(item => {
                if (!item.image) {
                    item.image = defaultImage;
                }
            });
        }

        return {
            breach_id: List.breach_id,   
            fines: Fines,
        };
    } catch (error) {
        return {
            breach_id: null,
            // @ts-ignore
            fines: mockFines.fines
        }
    }
};