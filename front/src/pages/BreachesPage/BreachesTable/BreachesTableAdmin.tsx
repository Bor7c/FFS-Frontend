import {TableInstance, useTable, usePagination} from "react-table"

import "./BreachesTable.sass"
import axios from "axios";
import {STATUSES} from "/src/utils/consts.ts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useSsid} from "../../../hooks/useSsid";


import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

export const BreachesTableAdmin = () => {

    const { session_id } = useSsid()
    

    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        Status: ''
    });

    const COLUMNS = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Штрафы",
            accessor: "fines",
            Cell: ({ value }) => { return value.map(fine => fine.title).join(', ') }
        },

        {
            Header: "Нарушитель",
            accessor: "name",
        },
        {
            Header: "Дата формирования",
            accessor: "formated_date",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Действия",
            accessor: "actions",
            Cell: ({ row }) => {
                if (row.original.status == 2) {
                    return (
                        <div>
                            <button onClick={() => handleAccept(row)}>Принять</button>
                            <button onClick={() => handleReject(row)}>Отклонить</button>
                        </div>
                    );
                } else {
                    return null;
                }
            },
        }
    ]





    let pollingInterval: any;

    // Function to start short polling
    const startPolling = () => {
        // Here we're setting up an interval to fetch breaches data every 5 seconds
        // You can change the interval as you wish.
        pollingInterval = setInterval(() => {
            console.log('Polling breaches data...');
            fetchBreachesData();
        }, 3000); // polling interval set to 5 seconds
    };

    // Function to stop short polling
    const stopPolling = () => {
        clearInterval(pollingInterval);
    };

    // useEffect hook to manage the polling lifecycle
    useEffect(() => {
        startPolling();
 
        
        // Return cleanup function to stop polling when the component unmounts or the moderator status changes
        return () => {
            stopPolling();
        };
    }, []); // Dependencies array, polling will restart when is_moderator changes

    // ...(rest of your component code remains unchanged)


    



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


    const fetchBreachesData = async () => {
        const { startDate, endDate, Status } = filters;

        const {data} = await axios(`http://localhost:8000/breaches/`, {
            method: "GET",
            headers: {
                'authorization': `${session_id}`
            },
            params: {
                start_date: startDate,
                end_date: endDate,
                status: Status,
            }
        })

        return data

    }

    const { isLoading, error, data, isSuccess } = useQuery(
        ['breaches', filters], // Include filters in the query key
        () => fetchBreachesData(),
        {
            keepPreviousData: true,
        }
    );

    const tableColumns = useMemo(() => COLUMNS, [])

    // const tableInstance = useTable<TableInstance>({
    //     columns:tableColumns,
    //     data: isSuccess ? data : [],
    //     initialState: {
    //         pageIndex: 0,
    //         pageSize: 5
    //     },
    //     manualPagination: true,
    //     pageCount: 1,
    // }, usePagination)

    
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
    } = useTable(
        {
            columns: tableColumns,
            data: isSuccess ? data : [],
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination
    )

    // Сохраняем текущую страницу в localStorage
    React.useEffect(() => {
        localStorage.setItem('currentPage', pageIndex);
    }, [pageIndex]);
  
  // Обработчик для установки текущей страницы на основе сохраненного значения
    React.useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        const savedPageSize = localStorage.getItem('pageSize');
    
        if (savedPage) gotoPage(Number(savedPage));
        if (savedPageSize) setPageSize(Number(savedPageSize));
    }, []);
  

    if (error) return <p>Error</p>;
    if (isLoading) return <p>Loading...</p>;


     // Form submit handler to update the filters
    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Trigger the filter update
        // Since the useQuery 'breaches' depends on the filters, it will automatically refetch
    };

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

            <form onSubmit={handleSubmit}>
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
                <button type="submit">Фильтр</button>
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