import {AxiosResponse} from "axios";

export interface FineInterface {
    fine_id: number;
    picture_url: string;
    title: string;
    text: string;
    price: string;
    fine_status: string;
    image: string;
}

export interface ListFines {
    breach_id: number | null;
    fines: FineInterface[];
}

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



export type Response = Promise<AxiosResponse> | any