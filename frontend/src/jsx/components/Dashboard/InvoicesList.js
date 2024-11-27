import React,{ useEffect, useState, useRef } from 'react';
import { FaEye } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getTransactionsAction,
} from '../../../store/actions/transactionAction';

import avt1 from './../../../images/avatar/1.png';

const formatDate = (inputDate) =>{
	const date = new Date(inputDate);
	
	// Extract year, month, and day
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}`;
  
	return formattedDate;
}

const InvoicesList = () =>{
	const { transactions } = useSelector(
		(state) => state.transactions
	  )

	const dispatch = useDispatch();
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
		dispatch(getTransactionsAction())
		setData(document.querySelectorAll('#invoices-data tbody tr'))
		//chackboxFun()
	}, [dispatch])
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
	const pendingTransactions = transactions.filter(transaction => transaction.status === 'completed');
	return(
		<>
			<div className="d-flex mb-3">
				<div className="mb-3 align-items-center me-auto">
					<h4 className="fs-24 font-w800">Historique des transactions</h4>
					{/* <span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span> */}
				</div>
				<Link to={"#"} className="btn btn-outline-primary mb-3"><i className="fa fa-calendar me-3 scale3"></i>Filtrer Date<i className="fas fa-caret-down ms-2"></i></Link>
			</div>
			<div className="row">
				<div className="col-xl-12">
				{pendingTransactions.length === 0 ? (
							<div className="row">
							<p className="btn btn-outline-primary mb-3">Aucune transaction disponible.</p>
							</div>
							) : (
					<div className="table-responsive table-hover fs-14 dataTables_wrapper" id="invoices-data">
					
						<table	className='table display mb-4 dataTablesCard  dataTable no-footer' id='example5'>
							<thead>
								<tr role='row'>
									<th className="sorting_asc">Date</th>
									<th className="sorting_asc">Type</th>
									<th className="sorting_asc">Recepteur</th>
									<th className="sorting_asc">Montant</th>
									<th className="sorting_asc">Montant Total</th>
									<th className="sorting_asc">Status</th>
									<th className="sorting_asc"></th>
								</tr>
							</thead>					
							<tbody>
								{pendingTransactions.map((transaction, index) => (
									<tr key={index} role='row'>
									{/* Assuming 'id', 'date', 'receiver', 'amount', 'status' are properties of each transaction */}
									<td><span className="text-black text-nowrap">{formatDate(transaction.initiatedAt)}</span></td>
									<td>
										<div className="d-flex align-items-center">
										<div>
											<h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">{transaction.transferType}</h6>
											<span className="fs-14">{transaction.sender?.name}</span>
										</div>
										</div>
									</td>
									<td>
										<div className="d-flex align-items-center">
										{/* Update this part based on your transaction structure */}
										<img src={avt1} alt="" className="rounded me-3" width="50" />
										<div>
											<h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">{transaction.receiverName}</h6>
											<span className="fs-14">{transaction.receiverPhone}</span>
										</div>
										</div>
									</td>
									<td><span className="text-black">{transaction.amount} FCFA</span></td>
									<td><span className="text-black">{transaction.amountTotal} FCFA</span></td>
									<td className="py-2 text-right">
										<span className={`badge badge-${transaction.status === 'completed' ? 'success' : 'warning'}`}>
										{transaction.status}
										<span className="ms-1 fas fa-stream" />
										</span>
									</td>
									<td>
									<Link to={{
											pathname: `/detail-transaction/${transaction?._id}`,
											state: { data: transaction },
										}} className="btn btn-primary shadow btn-xs sharp me-2">
										<FaEye />
									</Link>
									</td>                                       
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
export default InvoicesList;