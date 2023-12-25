import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import DropzoneBlog from './Invoices/DropzoneBlog';

const CreateInvoices = () =>{
  const [showEmetteurFields, setShowEmetteurFields] = useState(false);
  const [showDestinataireFields, setShowDestinataireFields] = useState(false);
  const [formData, setFormData] = useState({
	nomE: '',
	prenomE: '',
	telephoneE: '',
  });
  const [formDataD, setFormDataD] = useState({
	nomD: '',
	prenomD: '',
	telephoneD: '',
  });

  const {nomE, prenomE, telephoneE} = formData;
  const {nomD, prenomD, telephoneD} = formDataD;

  const onChange = (e) => {
	setFormData((prevState) => ({
		...prevState,
		[e.target.name]: e.target.value
	}));
  };

  const onChangeD = (e) => {
	setFormDataD((prevState) => ({
		...prevState,
		[e.target.name]: e.target.value
	}));
  };
  const onSubmit = (e) => {
	e.preventDefault();
  };

  const handleNouveauClick = (fieldType) => {
    if (fieldType === 'emetteur') {
      setShowEmetteurFields(true);
    } else if (fieldType === 'destinataire') {
      setShowDestinataireFields(true);
    }
  };
	return(
		<>
			<div className="row">
				<div className="col-xl-12">
					<div className="card">
						<div className="card-body">
							<div className="col-xl-12">
								<div className="card-header">
									<h4 className="card-title">Nouvelle Transaction</h4>
								</div>
								<div className="card-body">
									<div className="basic-form">
										<form onSubmit={onSubmit}>
										<div className="row">
										<div className="row">
											<div className="form-group mb-3 col-md-8">
											<label>Emetteur</label>
											<select
												defaultValue={"option"}
												id="inputState"
												className="form-control"
											>
												<option value="option" disabled>
												Choisir...
												</option>
												<option name="user">Option 1</option>
												<option>Option 2</option>
												<option>Option 3</option>
											</select>
											</div>
											<div className="form-group mb-0 col-md-4 mt-4">
												<button type="button" className="btn btn-primary" onClick={() => handleNouveauClick('emetteur')}>
													Nouveau
												</button>
											</div>
										</div>
										{showEmetteurFields && (
											// Render additional fields for Emetteur here
											<div className="row">
												<div className="form-group mb-3 col-md-4">
													<label>Nom Emetteur</label>
													<input
														type="text"
														className="form-control"
														placeholder="Veuillez saisir le nom"
														id='nomE'
														name='nomE'
														value={nomE}
														onChange={onChange}
													/>
												</div>
												<div className="form-group mb-3 col-md-4">
													<label>Prenom Emetteur</label>
													<input
														type="text"
														className="form-control"
														placeholder="Veuillez saisir le prenom"
														id='prenomE'
														name='prenomE'
														value={prenomE}
														onChange={onChange}
													/>
												</div>
												<div className="form-group mb-3 col-md-4">
													<label>Telephone Emetteur</label>
													<input
														type="text"
														className="form-control"
														placeholder="1234"
														id='telephoneE'
														name='telephoneE'
														value={telephoneE}
														onChange={onChange}
													/>
												</div>
											</div>
										)}
										<div className="row">
											<div className="form-group mb-3 col-md-8">
												<label>Destinataire</label>
												<select
													defaultValue={"option"}
													id="inputState"
													className="form-control"
												>
													<option value="option" disabled>
													Choisir...
													</option>
													<option>Option 1</option>
													<option>Option 2</option>
													<option>Option 3</option>
												</select>
											</div>
											<div className="form-group mb-0 col-md-4 mt-4">
												<button type="button" className="btn btn-primary" onClick={() => handleNouveauClick('destinataire')}>
													Nouveau
												</button>
											</div>
										</div>
										{showDestinataireFields && (
											// Render additional fields for Destinataire here
											<div className="row">
												<div className="form-group mb-3 col-md-4">
													<label>Nom Destinataire</label>
													<input
														type="text"
														className="form-control"
														placeholder="Veuillez saisir le nom"
														id='nomD'
														name='nomD'
														value={nomD}
														onChange={onChangeD}
													/>
												</div>
												<div className="form-group mb-3 col-md-4">
													<label>Prenom Destinataire</label>
													<input
														type="text"
														className="form-control"
														placeholder="Veuillez saisir le prenom"
														id='prenomD'
														name='prenomD'
														value={prenomD}
														onChange={onChangeD}
													/>
												</div>
												<div className="form-group mb-3 col-md-4">
													<label>Telephone Destinataire</label>
													<input
														type="text"
														className="form-control"
														placeholder="1234"
														id='telephoneD'
														name='telephoneD'
														value={telephoneD}
														onChange={onChange}
													/>
												</div>
											</div>
										)}
											<div className="form-group mb-3 col-md-6">
											<label>Montant</label>
											<input
												type="text"
												className="form-control"
												placeholder="1234"
											/>
											</div>
											<div className="form-group mb-3 col-md-6">
											<label>Montant Converti</label>
											<input
												type="text"
												className="form-control"
												placeholder="650"
											/>
											</div>
										</div>
										<button type="submit" className="btn btn-primary">
											Initier transaction
										</button>
										</form>
									</div>
								</div>
        					</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default CreateInvoices; 