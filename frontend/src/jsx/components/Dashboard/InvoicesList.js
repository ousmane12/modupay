import React,{ useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

import avt1 from './../../../images/avatar/1.jpg';
import avt2 from './../../../images/avatar/2.jpg';
import avt3 from './../../../images/avatar/3.jpg';
import avt4 from './../../../images/avatar/4.jpg';
import avt5 from './../../../images/avatar/5.jpg';
import avt6 from './../../../images/avatar/6.jpg';
import avt7 from './../../../images/avatar/7.jpg';
import avt8 from './../../../images/avatar/8.jpg';

const DropdownBlog = () =>{
	return(
		<>
			<Dropdown className="dropdown">
				<Dropdown.Toggle as="div" className="btn-link i-false">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
						<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
						<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
					</svg>
				</Dropdown.Toggle>
				<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
					<Dropdown.Item>Delete</Dropdown.Item>
					<Dropdown.Item>Edit</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}

const InvoicesList = () =>{
	const [data, setData] = useState(
		document.querySelectorAll('#invoices-data tbody tr')
	)
	const sort = 8
	const activePag = useRef(0)
	const [test, settest] = useState(0)

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
		setData(document.querySelectorAll('#invoices-data tbody tr'))
		//chackboxFun()
	}, [test])
	// Active pagginarion
		activePag.current === 0 && chageData(0, sort)
	// paggination
		let paggination = Array(Math.ceil(data.length / sort))
			.fill()
			.map((_, i) => i + 1)
	 // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i
		chageData(activePag.current * sort, (activePag.current + 1) * sort)
		settest(i)
	}
	const chackbox = document.querySelectorAll('.application_sorting_1 input')
	const motherChackBox = document.querySelector('.sorting_asc input')
	const chackboxFun = (type) => {
		for (let i = 0; i < chackbox.length; i++) {
		const element = chackbox[i]
			if (type === 'all') {
				if (motherChackBox.checked) {
					element.checked = true
				} else {
					element.checked = false
				}
			} else {
				if (!element.checked) {
					motherChackBox.checked = false
					break
				} else {
					motherChackBox.checked = true
				}
			}
		}
	}
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
					<div className="table-responsive table-hover fs-14 dataTables_wrapper" id="invoices-data">
						<table	className='table display mb-4 dataTablesCard  dataTable no-footer' id='example5'>
							<thead>
								<tr role='row'>
									<th className="sorting_asc">
										<div className='form-check'>
											<input type='checkbox' className='form-check-input' id='checkAll' required onClick={() => chackboxFun('all')}/>
											<label className='form-check-label' htmlFor='checkAll'/>
										</div>										
									</th>
									<th className="sorting_asc">ID transaction</th>
									<th className="sorting_asc">Date</th>
									<th className="sorting_asc">Recepteur</th>
									<th className="sorting_asc">Montant</th>
									<th className="sorting_asc">Status</th>
									<th className="sorting_asc"></th>
								</tr>
							</thead>
							<tbody>
								<tr role='row' className='odd'>
									<td className='application_sorting_1'>
										<div className='form-check'>											
											<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check1' required/>
											<label className='form-check-label' htmlFor='check1'/>
										</div>
									</td>
									<td><span className="text-black font-w500">#123412451</span></td>
									<td><span className="text-black text-nowrap">#June 1, 2020, 08:22 AM</span></td>
									<td>
										<div className="d-flex align-items-center">
											<img src={avt1} alt="" className="rounded me-3" width="50" />
											<div>
												<h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">XYZ Store ID</h6>
												<span className="fs-14">Online Shop</span>
											</div>
										</div>
									</td>
									<td><span className="text-black">xyzstore@mail.com</span></td>
									<td><Link to={"#"} className="btn btn-success light">Completed</Link></td>										
									<td><DropdownBlog /></td>
								</tr>
							</tbody>	
						</table>	
						<div className='d-sm-flex text-center justify-content-between align-items-center  mb-3'>
							<div className='dataTables_info' id='example5_info'>
								  Showing {activePag.current * sort + 1} to{' '}
								  {data.length > (activePag.current + 1) * sort
									? (activePag.current + 1) * sort
									: data.length}{' '}
								  of {data.length} entries
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
				</div>
			</div>		
		</>
	)
}
export default InvoicesList;