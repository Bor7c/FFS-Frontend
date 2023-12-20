import {TableInstance, useTable, usePagination} from "react-table"
import React, {useMemo} from "react";
import "./BreachesTable.sass"
import axios from "axios";
import {STATUSES} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useSsid} from "../../../hooks/useSsid";

export const BreachesTable = () => {

    const { session_id } = useSsid()

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
        }
    ]


    const fetchBreachesData = async () => {

        const {data} = await axios(`http://localhost:8000/breaches/`, {
            method: "GET",
            headers: {
                'authorization': `${session_id}`
            }
        })

        return data

    }

    const { isLoading, error, data, isSuccess } = useQuery(
        ['breaches'],
        () => fetchBreachesData(),
        {
            keepPreviousData: true,
        }
    );

    const tableColumns = useMemo(() => COLUMNS, [])

    const tableInstance = useTable<TableInstance>({
        columns:tableColumns,
        data: isSuccess ? data : [],
        initialState: {
            pageIndex: 0,
            pageSize: 5
        },
        manualPagination: true,
        pageCount: 1,
    }, usePagination)

    


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


    return (
        <div className="table-wrapper">

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