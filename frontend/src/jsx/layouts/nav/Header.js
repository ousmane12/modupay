import React, { useReducer, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import swal from "sweetalert";
import AgencySelect from '../../components/Dashboard/AgencySelect';
import { fetchAgencies } from '../../../services/agencyService';
import CustomSelectCountry from "../../components/Dashboard/Agencies/CustomSelectCountry";

import { Link } from "react-router-dom";
import { createExpense } from "../../../services/transactionService";

const initialState = false;
const reducer = (state, action) =>{
	switch (action.type){
		case 'sendMessageOpen':
			return { ...state, sendMessageOpen: !state.sendMessageOpen }					
		default:
            return state;	
	}	
}

const Header = (props) => {
	const [agencies, setAgencies] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('');
	const [filteredAgencies, setFilteredAgencies] = useState([]);
	const [formData, setFormData] = useState({
		label: '',
		amount: 0,
		country: '',
		agency: '',
	});
	const [state, dispatch] = useReducer(reducer, initialState);
	const user = useSelector(state => state.auth.auth);

	// Mémoization des pays uniques pour éviter un recalcul inutile
	const uniqueCountries = useMemo(() => {
		return [
			...new Map(
				agencies
					.filter((agency) => agency.country) // Exclure les agences sans pays
					.map((agency) => [agency.country._id, agency.country]) // Utiliser l'ID du pays comme clé
			).values(),
		];
	}, [agencies]);

	// Filtrer les agences en fonction du pays sélectionné
	useEffect(() => {
		const fetchAgenciesData = async () => {
			try {
				if (user.role === 'admin') {
					const response = await fetchAgencies();
					setAgencies(response.data);
				}
			} catch (error) {
				console.error('Erreur lors du chargement des agences', error);
			}
		};

		fetchAgenciesData();
	}, [user.role]);

	useEffect(() => {
		// Mise à jour des agences filtrées en fonction du pays sélectionné
		if (selectedCountry) {
			const agenciesForCountry = agencies.filter(
				(agency) => agency.country && agency.country._id === selectedCountry
			);
			setFilteredAgencies(agenciesForCountry);
		} else {
			setFilteredAgencies([]);
		}
	}, [selectedCountry, agencies]);

	const handleCountrySelect = (value) => {
		setSelectedCountry(value);
		setFormData((prevData) => ({ ...prevData, country: value, agency: '', amountTotal: 0 }));
	};

	const handleAgencySelect = (value) => {
		setFormData((prevData) => ({ ...prevData, agency: value }));
	};

	const onChange = (e) => {
		setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
	};

	const onSubmit = () => {
		const { label, amount, country, agency } = formData;
		createExpense({ label, amount, country, agency }).then(() => {
			swal('La dépense a été enregistrée avec succès', {
                icon: "success",
              });
			setFormData({ label: '', amount: 0, country: '', agency: '' });
		});
	};

	return (
		<div className="header border-bottom">
			<div className="header-content">
				<nav className="navbar navbar-expand">
					<div className="collapse navbar-collapse justify-content-between">
						<div className="header-left"></div>
						<ul className="navbar-nav header-right">
							{user.role !== 'partner' && (
								<>
									<li className="nav-item invoices-btn">
										<Link to="/nouvelle-transaction" className="btn btn-primary mb-1 ms-1">
											<i className="far fa-file-alt fs-20 me-2"></i>Nouvelle Transaction
										</Link>
									</li>{" "}
									<li className="nav-item">
										<Button
											style={{ backgroundColor: "#FD5353" }}
											className="btn btn-danger mb-1 ms-1"
											onClick={() => dispatch({ type: "sendMessageOpen" })}
										>
											<i className="far fa-file-alt fs-20 me-2"></i>Nouvelle Dépense
										</Button>
									</li>
								</>
							)}
						</ul>
					</div>
				</nav>
				<Modal className="modal fade" show={state.sendMessageOpen} onHide={() => dispatch({ type: "sendMessageOpen" })}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Enregistrer une dépense</h5>
							<Button
								variant=""
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={() => dispatch({ type: "sendMessageOpen" })}
							>
								<span>x</span>
							</Button>
						</div>
						<div className="modal-body">
							<form
								className="comment-form"
								onSubmit={(e) => {
									e.preventDefault();
									onSubmit();
									dispatch({ type: "sendMessageOpen" });
								}}
							>
								<div className="row">
									{/* Afficher les champs country et agency uniquement si l'utilisateur est admin */}
									{user.role === "admin" && (
										<>
											<div className="col-lg-12">
												<div className="form-group mb-3">
													<label htmlFor="country" className="text-black font-w600">
														Pays
													</label>
													<CustomSelectCountry
														options={uniqueCountries}
														onSelect={handleCountrySelect}
														selectedValue={formData.country}
													/>
												</div>
											</div>
											<div className="col-lg-12">
												<div className="form-group mb-3">
													<label htmlFor="agency" className="text-black font-w600">
														Agence
													</label>
													<AgencySelect
														options={filteredAgencies}
														onSelect={handleAgencySelect}
														selectedValue={formData.agency}
													/>
												</div>
											</div>
										</>
									)}
									<div className="col-lg-12">
										<div className="form-group mb-3">
											<label htmlFor="author" className="text-black font-w600">
												Montant <span className="required">*</span>
											</label>
											<input
												type="number"
												value={formData.amount}
												onChange={onChange}
												className="form-control"
												name="amount"
												placeholder="Montant"
											/>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group mb-3">
											<label htmlFor="comment" className="text-black font-w600">
												Commentaire <span className="required">*</span>
											</label>
											<textarea
												rows={8}
												value={formData.label}
												onChange={onChange}
												className="form-control"
												name="label"
												placeholder="Motif dépense"
											/>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group mb-3">
											<input type="submit" value="Enregistrer" className="submit btn btn-primary" name="submit" />
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default Header;
