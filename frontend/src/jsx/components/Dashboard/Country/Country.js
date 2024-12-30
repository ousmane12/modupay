import React, { Fragment } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useLocation } from 'react-router-dom';


const Country = () => {
  const location = useLocation();
  const country = location.state?.country || {};

  const formatDate = (inputDate) =>{
	const date = new Date(inputDate);
	
	// Extract year, month, and day
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}`;
  
	return formattedDate;
  }
  
  return (
    <Fragment>
      <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
					<Tab.Container defaultActiveKey='Setting'>					
						<Nav as='ul' className="nav nav-tabs">
							<Nav.Item as='li' className="nav-item">
								<Nav.Link to="#profile-settings" eventKey='Setting'>Détails du pays</Nav.Link>
							</Nav.Item>
						</Nav>
						<Tab.Content>
							<Tab.Pane id="profile-settings" eventKey='Setting'>
								<div className="pt-3">
									<div className="settings-form">
										<form onSubmit={(e) => e.preventDefault()}>
                                        {country && (
											<div className="row">
												<div className="form-group mb-3">
													<label className="form-label" >Nom</label>
													<input type="email" readOnly value={country.name} className="form-control"/>
												</div>
											</div>
                                            )}
                                            {country && (
											<div className="form-group mb-3">
												<label className="form-label">Frais Local</label>
												<input type="text" readOnly value={country.localFeePercentage} className="form-control"/>
											</div>
                                            )}
											<div className="form-group mb-3">
												<label className="form-label">Frais International</label>
												<input type="text" readOnly value={country.intFeePercentage} className="form-control"/>
											</div>

											<div className="form-group mb-3">
												<label className="form-label">Manageur</label>
												<input type="text" readOnly value={country.manager?.name} className="form-control"/>
											</div>

											<Tab.Container defaultActiveKey="Today">
												<div className="">
													<div className="">
														<div className="me-3 mb-3">
															<h4 className="card-title mb-2">Agences</h4>
														</div>
													</div>
													<Tab.Content className="card-body p-0" key={"prevv-tabus"}>
														<Tab.Pane className="tab-pane" eventKey="Today">
															<div className="table-responsive">
															  {country.agencies.length === 0 ? (
																<div className="">
																<p className="btn btn-outline-primary m-4">Aucune agence disponible pour ce pays.</p>
																</div>
																) : (
																<table className="table table-responsive-md card-table" key={"sub-tabs"}>
																	<tbody>
																	{country.agencies.map((transaction) => (
																		<tr>
																			<td>- <span className="fs-16 text-black font-w600">{transaction.name}</span></td>
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
										</form>
									</div>
								</div>
							</Tab.Pane>
						</Tab.Content>	
					</Tab.Container>		
                </div>
              </div>
            </div>
          </div>
		  <div className="card">
		  	<Tab.Container defaultActiveKey="Today">
				<div className="">
					<div className="">
						<div className="me-3 mb-3 m-4">
							<h4 className="card-title mb-2">Transactions</h4>
						</div>
					</div>
					<Tab.Content className="card-body p-0" key={"prevv-tabus"}>
						<Tab.Pane className="tab-pane" eventKey="Today">
							<div className="table-responsive">
								{country.transactions?.length === 0 ? (
								<div className="">
								<p className="btn btn-outline-primary m-4">Aucune transaction disponible pour ce pays.</p>
								</div>
								) : (
								<table className="table table-responsive-md card-table" key={"sub-tabs"}>
									<tbody>
									{country.transactions?.map((transaction) => (
									<tr>
										<td>
											<h6 className="fs-16 font-w600 mb-0">Opérateur: {transaction.sender? transaction.sender.name: 'Utilisateur'}</h6>
											<span className="fs-14">Date: {formatDate(transaction.initiatedAt)}</span>
										</td>
										<td>
											<h6 className="fs-16 font-w600 mb-0">Recepteur: {transaction.receiverName}</h6>
											<span className="fs-14">Montant: {transaction.amount} FCFA</span>
										</td>
										<td>
											<h6 className="fs-16 text-black font-w600 mb-0">Frais: {transaction.fee} FCFA</h6>
											<span className="fs-14">Montant Total: {transaction.amountTotal}</span>
										</td>
										<td>
											<h6 className="fs-16 text-black font-w600 mb-0">Validation: {transaction.completedBy.name}</h6>
											<span className="fs-14">Date: {formatDate(transaction.completedAt)}</span>
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
		  </div>
        </div>
    </Fragment>
  );
};

export default Country;
