import {useState, useEffect, useMemo} from 'react'
import { useTable } from 'react-table'
import { Link } from 'react-router-dom';

import SearchFines from '../../components/SearchBar/Search.js';
import "./FinesTable.scss"
import axios from "axios";
import {useSsid} from "../../hooks/useSsid.js";
import { mockFines } from '../../assets/Mock.js';
import { useAuth } from '../../hooks/useAuth.js';

import CustomButton from '../../components/CustomButton/CustomButton.js';


const FinesTable = () => {
    
    const [fines, setFines] = useState({
        breach_id: null,
        fines: [],
    });

    const [titleData, setTitlePage] = useState<string>("");

    const { session_id } = useSsid()

    const {is_moderator} = useAuth()

    const searchFines = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8000/fines/search`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    title: titleData
                }
            });
    
            setFines(data);
        } catch (error) {
            console.error("Не удалось загрузить данные с сервера.", error);
            const filteredFines = filterFines(mockFines, titleData);
            setFines({
                breach_id: null,
                fines: filteredFines,
            });
        }
    };

    const filterFines = (fines: any, searchText: any) => {
        return fines.filter((fine: any) => {
            const titleLowerCase = fine.title.toLowerCase();
            const searchTextLowerCase = searchText.toLowerCase();
            return titleLowerCase.includes(searchTextLowerCase);
        });
    };
    

   

    const data = useMemo(() => fines.fines, [fines.fines])

    const columns = useMemo(
        () => [
            // Define columns as per your data
            {
                Header: "Цена",
                accessor: "price",
                Cell: ({ value }) => `${value}₽` // предполагается, что value - это цена
            },
            {
                Header: "Заголовок",
                accessor: "title"
                // You can also add Cell property here to customize the rendering
            },
            {
                Header: "Действия",
                id: "actions",
                // Cell property может быть функцией, которая принимает объект с данными ячейки
                Cell: ({ row }) => (
                    <Link to={`/fines_edit/${row.original.id}`}>
                        <CustomButton text="Редактировать"  />
                    </Link>
                )
            },

            // Add other columns as needed
            
        ],
        []
    )

    // Use useTable hook to create table instance
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    useEffect(() => {
        searchFines()
    }, [titleData])

    return (
        <>
        {is_moderator &&
        <div className="fines-wrapper">
            <div className="top-container">
                <div className='search_in_menu'>
                <SearchFines title={titleData} setTitle={(newTitle) => {
                    setTitlePage(newTitle);
                    searchFines(); }}
                />
                </div>
                <Link to="/add-fine">
                    <CustomButton text="Добавить штраф" />
                </Link>
            </div>
            <div className="bottom-container">
                {/* Create table structure */}
                <table {...getTableProps()} className="fines-table">
                    <thead>
                        {/* Loop over header rows */}
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {/* Loop over headers in each row */}
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        }

</>
    )

}

export default FinesTable;
