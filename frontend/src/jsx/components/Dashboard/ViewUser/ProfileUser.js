import React, { Fragment } from "react";
import { Tab, Nav, Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import swal from "sweetalert";
import { useDispatch } from 'react-redux';
//** Import Image */
import profile from "../../../../images/avatar/1.png";
import { forgotPasswordAction } from "../../../../store/actions/AuthActions";


const ProfileUser = (props) => {
	const dispatch = useDispatch();
	const showModal = (transactionId) => {
		swal({
		  title: "Etes-vous sûr?",
		  text: "Une fois validée le mot de passe sera reinitialisé",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		}).then((willInitiate) => {
		  if (willInitiate) {
		  dispatch(forgotPasswordAction(transactionId, props.history));
		} else {
		  swal("Votre action est annulée!");
		}
	  });
    };

    const location = useLocation();
    const user = location.state?.user;

	
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head mt-2">
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={profile}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                {user && (
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">{user.name}</h4>
                  </div>
                  )}
                </div>
				<div>
				<Button className="me-2" variant="danger" onClick={() => showModal(user.email)}>
                  Réinitialiser
                </Button>
				</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">	
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
					<Tab.Container defaultActiveKey='Setting'>					
						<Nav as='ul' className="nav nav-tabs">
							<Nav.Item as='li' className="nav-item">
								<Nav.Link to="#profile-settings" eventKey='Setting'>Détails</Nav.Link>
							</Nav.Item>
						</Nav>
						<Tab.Content>
							<Tab.Pane id="profile-settings" eventKey='Setting'>
								<div className="pt-3">
									<div className="settings-form">
										<form onSubmit={(e) => e.preventDefault()}>
                                        {user && (
											<div className="row">
												<div className="form-group mb-3">
													<label className="form-label" >Nom Complet</label>
													<input type="text" readOnly value={user.name} className="form-control"/>
												</div>
											</div>
                                            )}
                                            {user && (
											<div className="form-group mb-3">
												<label className="form-label">Telephone</label>
												<input type="text" readOnly value={user.phoneNumber} className="form-control"/>
											</div>
                                            )}
											<div className="form-group mb-3">
												<label className="form-label">Email</label>
												<input type="text" readOnly value={user.email} className="form-control"/>
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
        </div>
		{user.role === 'partner' ? (<div className="col-xl-6">
			<div className="row">
				<div className="col-lg-12">
					<div className="card">
						<div className="card-body">
							<div className="profile-statistics">
								<div className="text-center">
									<div className="row">
										<div className="col">
											<span>Pays Investis</span>
										</div>
										<table	className='table display mb-4 dataTablesCard  dataTable no-footer' id='example5'>
											<thead>
												<tr role='row'>
													<th className="sorting_asc">Pays</th>
													<th className="sorting_asc">Montant Investi</th>
													<th className="sorting_asc">Interet</th>
													<th className="sorting_asc">Gain</th>
												</tr>
											</thead>					
											<tbody>
												{user.investments.map((transaction, index) => (
													<tr key={index} role='row'>
													{/* Assuming 'id', 'date', 'receiver', 'amount', 'status' are properties of each transaction */}
													<td><span className="text-black text-nowrap">{transaction.amountInvested}</span></td>
													<td>
														<div className="d-flex align-items-center">
														<div>
															<h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">ok</h6>
															<span className="fs-14">ok</span>
														</div>
														</div>
													</td>
													<td><span className="text-black">ok</span></td>
													<td><span className="text-black">ok</span></td>                               
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>
		) : (<div className="col-xl-6"></div>)}
      </div>
    </Fragment>
  );
};

export default ProfileUser;
