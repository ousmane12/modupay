import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Tab} from 'react-bootstrap';

const PreviousTransactions = (transactions) => {
	
	const formatDate = (inputDate) =>{
		const date = new Date(inputDate);
		
		// Extract year, month, and day
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const day = String(date.getDate()).padStart(2, '0');
		const formattedDate = `${year}-${month}-${day}`;
	  
		return formattedDate;
	}

	return(
		<Tab.Container defaultActiveKey="Today">
			<div className="card">
				<div className="card-header d-block d-sm-flex border-0 flex-wrap transactions-tab">
					<div className="me-3 mb-3">
						<h4 className="card-title mb-2">Transactions précédentes</h4>
					</div>
					<div className="card-tabs mt-3 mt-sm-0 mb-3 ">
						<Nav as="ul" className="nav nav-tabs" >
							<Nav.Item as="li" className="nav-item">
								<Nav.Link  eventKey="Today" ></Nav.Link>
							</Nav.Item>
						</Nav>
					</div>
				</div>
				<Tab.Content className="card-body p-0" key={"prevv-tabu"}>
					<Tab.Pane className="tab-pane" eventKey="Today">
						<div className="table-responsive">
						{transactions.transactions.length === 0 ? (
							<div className="row">
							<p className="btn btn-outline-primary mb-3">Aucune transaction disponible.</p>
							</div>
							) : (
							<table className="table table-responsive-md card-table transactions-table" key={"sub-tabr"}>
								<tbody>
								{transactions.transactions.map((transaction) => (
									<tr>
										<td>
											<svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect x="1" y="1" width="61" height="61" rx="29" stroke="#FF2E2E" strokeWidth="2"/>
												<g clipPath="">
												<path d="M35.2219 19.0125C34.8937 19.6906 35.1836 20.5109 35.8617 20.8391C37.7484 21.7469 39.3453 23.1578 40.4828 24.9242C41.6476 26.7344 42.2656 28.8344 42.2656 31C42.2656 37.2125 37.2125 42.2656 31 42.2656C24.7875 42.2656 19.7344 37.2125 19.7344 31C19.7344 28.8344 20.3523 26.7344 21.5117 24.9187C22.6437 23.1523 24.2461 21.7414 26.1328 20.8336C26.8109 20.5055 27.1008 19.6906 26.7726 19.007C26.4445 18.3289 25.6297 18.0391 24.9461 18.3672C22.6 19.4937 20.6148 21.2437 19.2094 23.4422C17.7656 25.6953 17 28.3094 17 31C17 34.7406 18.4547 38.257 21.1015 40.8984C23.743 43.5453 27.2594 45 31 45C34.7406 45 38.257 43.5453 40.8984 40.8984C43.5453 38.2516 45 34.7406 45 31C45 28.3094 44.2344 25.6953 42.7851 23.4422C41.3742 21.2492 39.389 19.4937 37.0484 18.3672C36.3648 18.0445 35.55 18.3289 35.2219 19.0125Z" fill="#FF2E2E"/>
												<path d="M36.3211 30.2726C36.589 30.0047 36.7203 29.6547 36.7203 29.3047C36.7203 28.9547 36.589 28.6047 36.3211 28.3367L32.8812 24.8969C32.3781 24.3937 31.7109 24.1203 31.0055 24.1203C30.3 24.1203 29.6273 24.3992 29.1297 24.8969L25.6898 28.3367C25.1539 28.8726 25.1539 29.7367 25.6898 30.2726C26.2258 30.8086 27.0898 30.8086 27.6258 30.2726L29.6437 28.2547L29.6437 36.0258C29.6437 36.7804 30.2562 37.3929 31.0109 37.3929C31.7656 37.3929 32.3781 36.7804 32.3781 36.0258L32.3781 28.2492L34.3961 30.2672C34.9211 30.8031 35.7851 30.8031 36.3211 30.2726Z" fill="#FF2E2E"/>
												</g>
												<defs>
												</defs>
											</svg>
										</td>
										<td>
											<h6 className="fs-16 font-w600 mb-0"><Link to={"#"} className="text-black">Montant: {transaction.amount}</Link></h6>
											<span className="fs-14">Montant Total: {transaction.amountTotal} FCFA</span>
										</td>
										<td>
											<h6 className="fs-16 text-black font-w600 mb-0">{formatDate(transaction.createdAt)}</h6>
											<span className="fs-14">{formatDate(transaction.updatedAt)}</span>
										</td>
										<td><span className="fs-16 text-black font-w600">Initié par: {transaction.sender? transaction.sender.name: 'Utilisateur'}</span></td>
										<td>
												<span
												className={`fs-16 font-w500 text-end d-block ${
													transaction.status === 'completed'
													? 'text-success' // Vert pour "completed"
													: transaction.status === 'initiated'
													? 'text-warning' // Orange pour "initiated"
													: transaction.status === 'canceled'
													? 'text-danger' // Rouge pour "canceled"
													: 'text-light' // Par défaut, une couleur neutre
												}`}
												>
												{transaction.status}
												</span>

											</td>
									</tr>
									))}
								</tbody>
							</table>
							)}
						</div>
					</Tab.Pane>
				</Tab.Content>	
			</div>	
		</Tab.Container>
	)
}
export default PreviousTransactions;