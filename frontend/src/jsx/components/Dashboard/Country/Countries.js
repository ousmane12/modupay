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
			<div className="card-header">
				<h4 className="card-title">Tous les pays</h4>
				<div className="text-center">
					<div className="nav-item invoices-btn">
						<Link to="/nouveau-pays" className="btn btn-primary">
							<i className="fas fa-plus-circle fs-10 me-2"></i>
							<span>Ajouter</span>
						</Link>
					</div>
				</div>
			</div>
			<div className="card-body">
				<div className="table-responsive">
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
					<table {...getTableProps()} className="table dataTable display">
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
					<div className="d-flex justify-content-between">
						<span>
							Page{' '}
							<strong>
								{pageIndex + 1} of {pageOptions.length}
							</strong>{''}
						</span>
						<span className="table-index">
							Aller à la page : {' '}
							<input 
								type="number" 
								className="ml-2"
								defaultValue={pageIndex + 1} 
								onChange={e => { 
									const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0 
									gotoPage(pageNumber)
								}} 
							/>
						</span>
					</div>
					<div className="text-center mb-3">	
						<div className="filter-pagination  mt-3">
							<button className="previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
							<button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
								Précedant
							</button>
							<button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>
								Suivant
							</button>
							<button className="next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
	)
	
}

export default Countries;
