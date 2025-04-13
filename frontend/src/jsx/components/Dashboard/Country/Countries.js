import React, { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { COUNTRY_COLUMNS } from '../../AppsMenu/Shop/Customers/Columns';
import { GlobalFilter } from '../../AppsMenu/Shop/Customers/GlobalFilter'; 
import { useDispatch, useSelector } from 'react-redux';
import {
    getCountriesAction,
	loadingToggleAction
} from '../../../../store/actions/countryActions';
import './filtering.css';


const Countries = () => {
	const { countries, successMessage, showLoading } = useSelector(
		(state) => state.countries
	  )
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCountriesAction())
		return () => {
		  dispatch(loadingToggleAction(showLoading))
		};
	  }, [successMessage, showLoading, dispatch]);
    const columns = useMemo( () => COUNTRY_COLUMNS, [] )
	const tableInstance = useTable({
		columns ,
		data: countries || [],	
		initialState : {pageIndex : 0}
	}, useFilters, useGlobalFilter, usePagination)
	
	const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups, 
		prepareRow,
		state,
		page,
		gotoPage,
		pageCount,
		pageOptions,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setGlobalFilter,
	} = tableInstance	
	
	const {globalFilter, pageIndex} = state	
	
	return(
		<>
		<div className="card">
  <div className="card-header d-md-flex justify-content-between align-items-center">
    <h4 className="card-title mb-3 mb-md-0">Tous les pays</h4>
    <div className="nav-item invoices-btn">
      <Link to="/nouveau-pays" className="btn btn-primary">
        <i className="fas fa-plus-circle fs-10 me-2"></i>
        <span>Ajouter</span>
      </Link>
    </div>
  </div>
  <div className="card-body">
    <div className="table-responsive">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} className="table dataTable display w-100">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead> 
        <tbody {...getTableBodyProps()} className="">
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.column.id === 'localFeePercentage' || cell.column.id === 'intFeePercentage' ? (
                      `${cell.value}%`
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
        <span className="mb-2 mb-md-0">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <span className="me-2">Aller à la page : </span>
          <input 
            type="number" 
            className="form-control form-control-sm"
            style={{ width: '70px' }}
            defaultValue={pageIndex + 1} 
            onChange={e => { 
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0 
              gotoPage(pageNumber)
            }} 
          />
        </div>
      </div>
      
      <div className="d-flex justify-content-center mt-3">	
        <div className="filter-pagination d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
          <button className="btn btn-sm btn-outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
            Précedant
          </button>
          <button className="btn btn-sm btn-outline-primary" onClick={() => nextPage()} disabled={!canNextPage}>
            Suivant
          </button>
          <button className="btn btn-sm btn-outline-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
        </div>
      </div>
    </div>
  </div>
</div>
		</>
		)
}

export default Countries;
