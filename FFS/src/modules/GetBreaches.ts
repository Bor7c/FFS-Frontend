export interface Breach {
    breach_id: number;
    user: number;
    closed_date: Date | null;
    created_date: Date | null;
    pformated_daterice: Date | null;
    breach_status: string;
    moder_id: number;
    User_login:string;
}


export interface BreachResult {
    BreachesList: Breach[];
}

// export const GetFilteredBreaches = async (BreachStatus: string, DownDate: string, UpDate: string): Promise<BreachResult> => {

export const GetFilteredBreaches = async (): Promise<BreachResult> => {

    try {
        // const params = new URLSearchParams({
        //     status: BreachStatus,
        //     update: UpDate,
        //     downdate: DownDate,
        // });

        let url = `http://127.0.0.1:8000/breaches/`;
        // if(BreachStatus == '' && DownDate == '' && UpDate == ''){
        //     url = `http://127.0.0.1:8000/breaches/`;
        // } else{
        //     url = `http://127.0.0.1:8000/breaches/?${params}`;
        // }
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Запрос незадался!');
        }

        const List: Breach[] = await response.json();

        return {
            BreachesList: List,
        };
    } catch (error) {
        console.error('Ошибка запроса штрафа:', error);
        return {
            BreachesList: [],
        };
    }
};