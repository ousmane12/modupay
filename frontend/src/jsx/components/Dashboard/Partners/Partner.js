import React, { Fragment } from "react";
import { Tab, Nav } from "react-bootstrap";
// images
import { useLocation } from 'react-router-dom';


const Partner = () => {
  const location = useLocation();
  const country = location.state?.investment || {};

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
								<Nav.Link to="" eventKey='Setting'>Détails de l'investissement</Nav.Link>
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
													<input type="email" readOnly value={country.partner? country.partner.name: 'Utilisateur'} className="form-control"/>
												</div>
											</div>
                                            )}
                                            {country && (
											<div className="form-group mb-3">
												<label className="form-label">Montant Investi</label>
												<input type="text" readOnly value={country.amountInvested} className="form-control"/>
											</div>
                                            )}

											<div className="form-group mb-3">
												<label className="form-label">Interet en pourcentage</label>
												<input type="text" readOnly value={country.interestPercentage} className="form-control"/>
											</div>
                                            <div className="form-group mb-3">
												<label className="form-label">Date</label>
												<input type="text" readOnly value={formatDate(country.createdAt)} className="form-control"/>
											</div>
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
							<h4 className="card-title mb-2">Pays</h4>
						</div>
					</div>
					<Tab.Content className="card-body p-0" key={"prevv-tabus"}>
						<Tab.Pane className="tab-pane" eventKey="Today">
							<div className="table-responsive">
								{country.country?.length === 0 ? (
								<div className="">
								<p className="btn btn-outline-primary m-3">Aucune transaction disponible pour cette agence.</p>
								</div>
								) : (
								<table className="table table-responsive-md card-table" key={"sub-tabs"}>
									<tr>
										<td>
											<h6 className="fs-16 font-w600 mb-0">{country.country.name}</h6>
										</td>
									</tr>
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

export default Partner;
