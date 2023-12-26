import {Dispatch} from "react";
import "./Search.scss"


const SearchFines = ({ title, setTitle }: {title:string, setTitle: Dispatch<string>}) => {

    const handleChange = (value: string) => {
        setTitle(value)
    }

    return (
<>
    <form className="PolyeDlyaVvoda">
        <input className="polePoiska__pole" name="text" type="search"
            placeholder="Заголовок..."
            autoComplete="off"
            value={title}
            onChange={(e) => handleChange(e.target.value)}
        />
    </form>
</>
    )
}

export default SearchFines;
