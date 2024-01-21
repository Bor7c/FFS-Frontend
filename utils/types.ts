export interface Breach {
    id: number;
    fines: Fine[];
    user: number;
    closed_date: Date | null;
    created_date: Date | null;
    formated_date: Date | null;
    status: string;
}

export interface Fine {
    id: number;
    title: string;
    price: string;
    status: number;
    image: string;
    text: string;
}