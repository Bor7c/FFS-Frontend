import {TableInstance, useTable, usePagination} from "react-table"

import "./BreachesTable.sass"
import axios from "axios";
import {STATUSES} from "/src/utils/consts.ts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useSsid} from "../../../hooks/useSsid";


import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../../hooks/useAuth";


const fetchBreachesData = async (filters: any, session_id: any, setBreachesData: any, setError: any, setLoadedOnce: any, setIsLoading: any) => {
    // Function to fetch data moved here and receives necessary state setters via parameters
    setIsLoading(true);
    setLoadedOnce(true);
    try {
      const { startDate, endDate, Status } = filters;
      const { data } = await axios("http://localhost:8000/breaches/", {
        method: "GET",
        headers: { authorization: session_id },
        params: { start_date: startDate, end_date: endDate, status: Status },
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
        Cell: ({ value }) => value?.map(fine => fine.title).join(', ') ?? ''


    },

    {
        Header: "Нарушитель",
        accessor: "name",
    },
    {
        Header: "Дата формирования",
        accessor: "formated_date",
        Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
    }
]


export const BreachesTable = () => {

    const { session_id } = useSsid();
    const { is_moderator } = useAuth();
  
    const [breachesData, setBreachesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
      startDate: "",
      endDate: "",
      Status: "",
    });
    const [loadedOnce, setLoadedOnce] = useState(false);

// ...в функции fetchBreachesData добавить setLoadedOnce(true); после успешного получения данных.

    const savedPage = localStorage.getItem('currentPage') || 0;
    const savedPageSize = localStorage.getItem('pageSize') || 5;

    const COLUMNS = useMemo(() => {
        // useMemo to create columns with new 'actions' column conditionally
        const cols = [...staticColumns];
        if (is_moderator) {
          // Append actions column conditionally
          cols.push({
            Header: "Действия",
            accessor: "actions",
            Cell: ({ row }) => {
                if (row.original.status === 2) {
                    return (
                        <div>
                            <button onClick={() => handleAccept(row)}>Принять</button>
                            <button onClick={() => handleReject(row)}>Отклонить</button>
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
        // Function to fetch and set data at a regular interval
        const fetchDataInterval = async () => {
          await fetchBreachesData(filters, session_id, setBreachesData, setError, setLoadedOnce, setIsLoading);
        };
      
        // Call the function for initial data load
        fetchDataInterval();
      
        // Set up the interval to fetch data every 3 seconds
        const interval = setInterval(fetchDataInterval, 3000);
      
        // Clean up interval on component unmount
        return () => clearInterval(interval);
      }, [filters, session_id]); // Dependencies array: component will re-run effect if any of these values change
      

    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        const savedPageSize = localStorage.getItem('pageSize');
  
        if (savedPage) gotoPage(Number(savedPage));
        if (savedPageSize) setPageSize(Number(savedPageSize));
    }, []);



    
    const handleAccept = async (row: any) => {
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

    const handleReject = async (row: any) => {
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

    const tableInstance = useTable(
        {
            columns: COLUMNS,
            data: breachesData, // Use the fetched data here
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
    
        setFilters({
            ...filters,
            [name]: formattedValue
        });
    
    };

    const handleStatusChange = (event: any) => {
        const { name, value } = event.target;
 
        setFilters({
            ...filters,
            [name]: value
        });
    
    };


    return (
        <div className="table-wrapper">

            <form>
            <input
                type="datetime-local"
                name="startDate"
                value={filters.startDate}
                onChange={handleDateChange}
            />
            <input
                type="datetime-local"
                name="endDate"
                value={filters.endDate}
                onChange={handleDateChange}
            />
               <select
                  name="Status"
                  value={filters.Status}
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
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.column.id === 'id' ? i + 1 : cell.render('Cell')}
                                        </td>
                                    )
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