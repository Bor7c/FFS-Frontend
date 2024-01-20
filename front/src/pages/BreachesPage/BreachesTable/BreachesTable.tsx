import {TableInstance, useTable, usePagination} from "react-table"

import "./BreachesTable.scss"
import axios from "axios";
import {STATUSES} from "/src/utils/consts.ts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";

import {useSsid} from "../../../hooks/useSsid";
import { useNavigate } from 'react-router-dom';



import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../../hooks/useAuth";

import { useFilters } from "../../../hooks/UseFilters";



const fetchBreachesData = async (filters: any, session_id: any, setBreachesData: any, setError: any, setLoadedOnce: any, setIsLoading: any) => {
    // Function to fetch data moved here and receives necessary state setters via parameters
    setIsLoading(true);
    setLoadedOnce(true);
    try {
      const { startDate, endDate, status } = filters;
      const { data } = await axios("http://localhost:8000/breaches/", {
        method: "GET",
        headers: { authorization: session_id },
        params: { start_date: startDate, end_date: endDate, status: status },
      });
      setBreachesData(data);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  };




  const staticColumns = [
    {
        Header: "№",
        accessor: "id"
    },
    {
        Header: "Статус",
        accessor: "status",
        Cell: ({ value }) => { 
            const statusObject = STATUSES.find(status => status.id === value);
            return statusObject ? statusObject.name : 'Неизвестный статус';
        }
        
    },
    {
        Header: "Штрафы",
        accessor: "fines",
        Cell: ({ value }) => 
        <div className="actions-cell">
            {value?.map((fine) => fine.title).join(", ") ?? ""}
        </div>


    },
    {
        Header: "Нарушитель",
        accessor: "name",
    },
    {
        Header: "Дата создания",
        accessor: "created_date",
        Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
    },
    {
        Header: "Дата формирования",
        accessor: "formated_date",
        Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
    },
    {
        Header: "Дата окончания",
        accessor: "closed_date",
        Cell: ({ value }) => {
            return value ? moment(value).locale(ru()).format("D MMMM HH:mm") : '';
        }
    }
]


export const BreachesTable = () => {

    const { session_id } = useSsid();
    const { is_moderator } = useAuth();
  
    const [breachesData, setBreachesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { filters, updateFilters } = useFilters();
    
    const [loadedOnce, setLoadedOnce] = useState(false);

    const navigate = useNavigate();




// ...в функции fetchBreachesData добавить setLoadedOnce(true); после успешного получения данных.

    const savedPage = localStorage.getItem('currentPage') || 0;
    const savedPageSize = localStorage.getItem('pageSize') || 5;

    const COLUMNS = useMemo(() => {
        // useMemo to create columns with new 'actions' column conditionally
        const cols = [...staticColumns];
        if (is_moderator) {
          // Append actions column conditionally
          cols.push({
            Header: "Пользователь",
            accessor: "user.username",
          });

          cols.push({
            Header: "Действия",
            accessor: "actions",
            Cell: ({ row }) => {
                if (row.original.status === 2) {
                    return (
                        <div>
                            <button
                                className="accept-button"
                                onClick={(e) => handleAccept(row, e)} // Передайте событие клика
                            >
                                Принять
                            </button>
                            <button
                                className="reject-button"
                                onClick={(e) => handleReject(row, e)} // Передайте событие клика
                            >
                                Отклонить
                            </button>
                        </div>
                    );
                }
                return null;
            },
          });


        }
        return cols;
      }, [is_moderator]); 


      useEffect(() => {
        // Function to fetch and set data at a regular interval ONLY if the user is a moderator
        const fetchDataInterval = async () => {
            await fetchBreachesData(filters, session_id, setBreachesData, setError, setLoadedOnce, setIsLoading);
        };
    
        let interval: any;
        if (is_moderator) {
            // Call the function for initial data load
            fetchDataInterval();
    
            // Set up the interval to fetch data every 3 seconds, only for moderators
            interval = setInterval(fetchDataInterval, 3000);
        }else{
            fetchBreachesData(filters, session_id, setBreachesData, setError, setLoadedOnce, setIsLoading);
        }
    
        // Clean up interval on component unmount, or when `is_moderator` changes
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [filters, session_id, is_moderator]); // Dependencies array: component will re-run effect if any of these values change
      

    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        const savedPageSize = localStorage.getItem('pageSize');
  
        if (savedPage) gotoPage(Number(savedPage));
        if (savedPageSize) setPageSize(Number(savedPageSize));
    }, []);


    const handleAccept = async (row: any, e: any) => {
        e.stopPropagation();
        try {
            const response = await axios(`http://localhost:8000/breaches/${row.original.id}/update_status_admin/`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': session_id
                },
                data: {"status": 3}
            });
    
            // Если запрос успешен, можно добавить логику для обновления таблицы или данных в UI.
            console.log('Accept response:', response);
    
            // Возможно, вам понадобится вызвать refetch для обновления таблицы:
            // queryClient.invalidateQueries('breaches');
    
            return response.data;
        } catch (error) {
            console.error('Error accepting breach:', error);
            // Обработайте ошибку, возможно показать сообщение пользователю
        }
    }

    const handleReject = async (row: any, e: any) => {
        e.stopPropagation();
        try {
            const response = await axios(`http://localhost:8000/breaches/${row.original.id}/update_status_admin/`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': session_id
                },
                data: {"status": 4}
            });
    
            // Если запрос успешен, можно добавить логику для обновления таблицы или данных в UI.
            console.log('Accept response:', response);
    
            // Возможно, вам понадобится вызвать refetch для обновления таблицы:
            // queryClient.invalidateQueries('breaches');
    
            return response.data;
        } catch (error) {
            console.error('Error accepting breach:', error);
            // Обработайте ошибку, возможно показать сообщение пользователю
        }

    }

    const getFilteredData = useCallback(() => {
        if (filters.userName !== "") {
            return breachesData.filter((item) => {
                // Предполагая, что у item есть вложенный объект user и свойство username. 
                // Если это не так, нужно будет адаптировать эту логику к вашей структуре данных.
                return item.user.username.toLowerCase().includes(filters.userName.toLowerCase());
            });
        }
        return breachesData;
    }, [breachesData, filters.userName]);

    const filteredBreachesData = useMemo(() => {
        return getFilteredData();
    }, [getFilteredData]);

    const tableInstance = useTable(
        {
            columns: COLUMNS,
            data: filteredBreachesData, // используйте отфильтрованные данные здесь
            initialState: { 
              pageIndex: parseInt(savedPage), 
              pageSize: parseInt(savedPageSize) 
            },
        },
        usePagination
    );

    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance

    // Сохраняем текущую страницу в localStorage
    React.useEffect(() => {
        localStorage.setItem('currentPage', pageIndex.toString());
    }, [pageIndex]);
    

    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        const savedPageSize = localStorage.getItem('pageSize');
    
        const parsedPage = savedPage ? Number(savedPage) : 0;
        const parsedPageSize = savedPageSize ? Number(savedPageSize) : 5;
    
        gotoPage(parsedPage);
        setPageSize(parsedPageSize);
    }, [gotoPage, setPageSize]);
    
  
  

    if (error) return <p>Error</p>;
    if (!loadedOnce && isLoading) return <p>Loading...</p>;


    const handleDateChange = (event: any) => {
        const { name, value } = event.target;
    
        let formattedValue = value;
        if (value) {
            formattedValue = moment(value).format("YYYY-MM-DDTHH:mm"); // Обратите внимание на изменение формата
        }
    
        updateFilters({
            ...filters,
            [name]: formattedValue
          });
    
    };

    const handleStatusChange = (event: any) => {
        const { name, value } = event.target;
 
        updateFilters({
            ...filters,
            [name]: value
          });
    
    };

    const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    updateFilters({
        ...filters,
        [name]: value
      });
};


    return (
        <div className="table-wrapper">

            <form> 

            <div className="date-wrapper">
                {/* <label className="date-label">От:</label> */}
                <input
                    className="date-input"
                    type="date" // измените на 'date'
                    name="startDate"
                    value={filters.startDate.substr(0, 10)} // обрезать время, если оно есть
                    onChange={handleDateChange}
                />
            </div>
            <div className="date-wrapper">
                {/* <label className="date-label">До:</label> */}
                <input
                    className="date-input"
                    type="date" // измените на 'date'
                    name="endDate"
                    value={filters.endDate.substr(0, 10)} // обрезать время, если оно есть
                    onChange={handleDateChange}
                />
            </div>

            {/* <input
                className="date-wrapper"
                type="date" // измените на 'date'
                name="startDate"
                value={filters.startDate.substr(0, 10)} // обрезать время, если оно есть
                onChange={handleDateChange}
            />
            <input
                className="date-wrapper"
                type="date" // измените на 'date'
                name="endDate"
                value={filters.endDate.substr(0, 10)} // обрезать время, если оно есть
                onChange={handleDateChange}
            /> */}

            {is_moderator && 
                <input
                    className="search-input"
                    type="text"
                    placeholder="Поиск по имени пользователя"
                    name="userName"
                    value={filters.userName}
                    onChange={handleInputChange} // Обновите значение фильтра при изменении поля ввода
                />
            }



            <select
                className="status-select"
                name="status"
                value={filters.status}
                onChange={handleStatusChange}
            >
                  <option value="">Все</option>
                  {STATUSES.map((status: any) => (
                      <option key={status.id} value={status.id}>
                          {status.name}
                      </option>
                  ))}
              </select>
            </form>




            <table {...getTableProps()} className="orders-table">
                <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map( (column: any) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))
                }
                </thead>
                <tbody {...getTableBodyProps()}>
                {
                    page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps({
                                onClick: () => navigate(`/breaches/${row.original.id}`),
                                style: { cursor: 'pointer' } // Опционально, чтобы курсор был в виде руки, показывая, что строка кликабельна.
                            })}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.column.id === 'id' ? i + 1 + pageIndex * pageSize : cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Страница{' '}
                    <strong>
                        {pageIndex + 1} из {pageOptions.length}
                    </strong>{' '}
                </span>
                <select
                    className="status-select"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Показать {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        
    )
}