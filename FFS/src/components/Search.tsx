import {useEffect, useState} from 'react'
import {GetFilteredFines, FinesResult} from '../modules/GetFines.ts'
// import "../styles/search_button.css"
// import {setGeographicalObjectData} from "../components/Main.tsx"


function SearchFines({
    setFineData,
    setTitleData,
}: {
setFineData: (data: FinesResult) => void;
setTitleData: (data: any) => void;
}) {
// Для фильтрации услуг
const [titleData, settitleData] = useState<string>('');

const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    settitleData(event.target.value);
};

const handleFilterSubmit = async (event: React.FormEvent) => {
event.preventDefault();
};

useEffect(() => {
// Функция, которая будет выполнять фильтрацию данных
const fetchTitledData = async () => {
try {
const response = await GetFilteredFines(titleData);
setFineData(response);
setTitleData(titleData);
} catch (error) {
console.error('Error filtering fines:', error);
}
};
// Вызываем фильтрацию данных при изменении filterKeyword
fetchTitledData();
// Этот useEffect будет выполнен при изменении filterKeyword или currentPage
}, [titleData]);


return (
<>
    <form className="form-s" action="{% url 'order_url' %}" method="get" onSubmit={handleFilterSubmit}>
        <input className="input_text" name="text" type="search"
            value={titleData}
            onChange={handleFilterChange}
            placeholder="Заголовок..."
        />
    </form>
</>
);
};

export default SearchFines;