import React,{ useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom';

import avt1 from './../../../images/avatar/1.png';
import { getExpenses } from '../../../services/transactionService';

const formatDate = (inputDate) =>{
	const date = new Date(inputDate);
	
	// Extract year, month, and day
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}`;
  
	return formattedDate;
}

const ExpensesList = () =>{
	const [transactions, setTransactions] = useState([]);
	const [data, setData] = useState(
		document.querySelectorAll('#invoices-data tbody tr')
	)
	const sort = 8
	const activePag = useRef(0)

	  // Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove('d-none')
			} else {
				data[i].classList.add('d-none')
			}
		}
	}
	// use effect
	useEffect(() => {
		getExpenses().then((response) => {
			setTransactions(response.data);
		});
	}, [])
	// Active pagginarion
		activePag.current === 0 && chageData(0, sort)
	// paggination
		let paggination = Array(Math.ceil(data.length / sort))
			.fill()
			.map((_, i) => i + 1)
	 // Active paggination & chage data
	 const onClick = (i) => {

		chageData(i * sort, (i + 1) * sort);
	  };

	return(
		<>
			<div className="d-flex mb-3">
				<div className="mb-3 align-items-center me-auto">
					<h4 className="fs-24 font-w800">Historique des dépenses</h4>
					{/* <span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span> */}
				</div>
				<Link to={"#"} className="btn btn-outline-primary mb-3"><i className="fa fa-calendar me-3 scale3"></i>Filtrer Date<i className="fas fa-caret-down ms-2"></i></Link>
			</div>
			<div className="row">
				<div className="col-xl-12">
				{transactions.length === 0 ? (
							<div className="row">
							<p className="btn btn-outline-primary mb-3">Aucune dépense enregistrée.</p>
							</div>
							) : (
					<div className="table-responsive table-hover fs-14 dataTables_wrapper" id="invoices-data">
					
						<table	className='table display mb-4 dataTablesCard  dataTable no-footer' id='example5'>
							<thead>
								<tr role='row'>
									<th className="sorting_asc">Date</th>
									<th className="sorting_asc">Agence/Pays</th>
									<th className="sorting_asc">Commentaire</th>
									<th className="sorting_asc">Montant</th>
								</tr>
							</thead>					
							<tbody>
								{transactions.map((transaction, index) => (
									<tr key={index} role='row'>
									{/* Assuming 'id', 'date', 'receiver', 'amount', 'status' are properties of each transaction */}
									<td><span className="text-black text-nowrap">{formatDate(transaction.createdAt)}</span></td>
									<td>
										<div className="d-flex align-items-center">
										<div>
											<h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">{transaction.agency.name} / {transaction.country.name}</h6>
										</div>
										</div>
									</td>
									<td>
										<div className="d-flex align-items-center">
										{/* Update this part based on your transaction structure */}
										<img src={avt1} alt="" className="rounded me-3" width="50" />
										<div>
											<h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">{transaction.spender.name}</h6>
											<span className="fs-14">{transaction.label}</span>
										</div>
										</div>
									</td>
									<td><span className="text-black">{transaction.amount} FCFA</span></td>                                    
									</tr>
								))}
							</tbody>
						</table>						
						<div className='d-sm-flex text-center justify-content-between align-items-center  mb-3'>
							<div className='dataTables_info' id='example5_info'>
								  Affichage de {activePag.current * sort + 1} à{' '}
								  {data.length > (activePag.current + 1) * sort
									? (activePag.current + 1) * sort
									: data.length}{' '}
								  de {data.length} entrées
							</div>

							<div className='dataTables_paginate paging_simple_numbers mb-0' id='example5_paginate'>
								<Link to='/liste-transactions' className='paginate_button previous disabled' onClick={() => activePag.current > 0 && onClick(activePag.current - 1)}>
									<i className="fa fa-angle-double-left" ></i>
								</Link>
								<span>
									{paggination.map((number, i) => (
										<Link key={i} to='/liste-transactions' className={`paginate_button  ${ activePag.current === i ? 'current' : '' } `} onClick={() => onClick(i)}>
											{number}
										</Link>
									))}
								</span>
								<Link to='/liste-transactions' className='paginate_button next' onClick={() => activePag.current + 1 < paggination.length && onClick(activePag.current + 1)}>
									<i className="fa fa-angle-double-right" ></i>
								</Link>
							</div>
						</div>
					</div>
					)}
				</div>
			</div>		
		</>
	)
}
export default ExpensesList;