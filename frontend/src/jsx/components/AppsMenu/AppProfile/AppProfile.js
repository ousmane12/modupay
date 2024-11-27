import React, { Fragment, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
//** Import Image */
import profile from "../../../../images/avatar/1.png";
import { updateUserAction } from "../../../../store/actions/userActions";


const AppProfile = (props) => {
	const user = useSelector(state => state.auth.auth);
	const dispatch = useDispatch();
  
	// Initialiser l'état avec les détails utilisateur
	const [formData, setFormData] = useState({
	  name: user?.name || '',
	  phoneNumber: user?.phoneNumber || '',
	});
  
	const [errorMessage, setErrorMessage] = useState('');
  
	const handleChange = (e) => {
	  setFormData({ ...formData, [e.target.name]: e.target.value });
	};
  
	const handleSubmit = (e) => {
	  e.preventDefault();
  
	  if (!formData.name || !formData.phoneNumber) {
		setErrorMessage('Veuillez remplir tous les champs.');
		return;
	  }
  
	  // Action pour mettre à jour les détails de l'utilisateur
	  dispatch(updateUserAction(formData, user._id, props.history))
		.then(() => {
		  setErrorMessage('');
		  alert('Profil mis à jour avec succès.');
		})
		.catch((err) => {
		  console.error(err);
		  setErrorMessage('Une erreur est survenue lors de la mise à jour.');
		});
	};
  
	return (
	  <Fragment>
		<div className="row">
		  <div className="col-lg-12">
			<div className="profile card card-body px-3 pt-3 pb-0">
			  <div className="profile-head mt-4">
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
						<p>{user.role}</p>
					  </div>
					)}
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<div className="row">
		  <div className="col-xl-12">
			<div className="card">
			  <div className="card-body">
				<div className="profile-tab">
				  <div className="custom-tab-1">
					<Tab.Container defaultActiveKey="Setting">
					  <Nav as="ul" className="nav nav-tabs">
						<Nav.Item as="li" className="nav-item">
						  <Nav.Link to="#profile-settings" eventKey="Setting">Détails</Nav.Link>
						</Nav.Item>
					  </Nav>
					  <Tab.Content>
						<Tab.Pane id="profile-settings" eventKey="Setting">
						  <div className="pt-3">
							<div className="settings-form">
							  <form onSubmit={handleSubmit}>
								{errorMessage && (
								  <div className="text-danger mb-3">
									{errorMessage}
								  </div>
								)}
								<div className="form-group mb-3">
								  <label className="form-label">Nom Complet</label>
								  <input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className="form-control"
								  />
								</div>
								<div className="form-group mb-3">
								  <label className="form-label">Téléphone</label>
								  <input
									type="text"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									className="form-control"
								  />
								</div>
								<button type="submit" className="btn btn-primary btn-block">
								  Mettre à jour
								</button>
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
		</div>
	  </Fragment>
	);
  };

export default AppProfile;
