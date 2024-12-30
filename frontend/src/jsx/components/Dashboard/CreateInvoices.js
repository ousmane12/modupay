import React, { useState, useEffect } from 'react';
import swal from "sweetalert";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	createTransactionAction,
} from '../../../store/actions/transactionAction';
import CustomSelectCountry from './Agencies/CustomSelectCountry';
import AgencySelect from './AgencySelect';
import { fetchAgencies } from '../../../services/agencyService';

const CreateInvoices = (props) => {
	const [formData, setFormData] = useState({
		receiverName: '',
		receiverPhone: '',
		country: '',
		agency: '',
		transferType: '',
		amount: 0,
		amountTotal: 0,
	});
	const [agencies, setAgencies] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('');
    const [filteredAgencies, setFilteredAgencies] = useState([]);
	
	const { user, errorMessage} = useSelector(state => state.auth.auth);
	const [amountTotal, setAmountTotal] = useState(0);
	const dispatch = useDispatch();
	let errorsObj = { receiverName: '', receiverPhone: '', agency: '', amount: ''};
    const [errors, setErrors] = useState(errorsObj);

	useEffect(() => {
		fetchAgencies().then((response) => {
			setAgencies(response.data);
		});
	}, [])

  const uniqueCountries = [
    ...new Map(
      agencies
        .filter((agency) => agency.country) // Exclure les agences sans pays
        .map((agency) => [agency.country._id, agency.country]) // Utiliser l'ID du pays comme clé
    ).values(),
  ];

  useEffect(() => {
    // Filtrer les agences en fonction du pays sélectionné
    if (selectedCountry) {
      const agenciesForCountry = agencies.filter(
        (agency) => agency.country && agency.country._id === selectedCountry
      );
      setFilteredAgencies(agenciesForCountry);
    } else {
      setFilteredAgencies([]);
    }
  }, [selectedCountry, agencies]);

  // Calculer automatiquement le montant total uniquement lorsque le montant ou le type de transfert change
  useEffect(() => {
    const selectedCountryData = uniqueCountries.find(
      (country) => country._id === selectedCountry
    );

    if (selectedCountryData && formData.amount > 0) {
      const feePercentage =
        formData.transferType === 'national'
          ? selectedCountryData.localFeePercentage
          : selectedCountryData.intFeePercentage;

      const calculatedTotal = formData.amount * (1 + feePercentage / 100);
      setAmountTotal(calculatedTotal); // Mettre à jour amountTotal sans mettre à jour formData
    } else {
      setAmountTotal(0); // Réinitialiser si pas de montant ou de pays sélectionné
    }
  }, [formData.amount, formData.transferType, selectedCountry, uniqueCountries]);

  // Gérer la sélection des pays et des agences
  const handleCountrySelect = (value) => {
    setSelectedCountry(value);
    setFormData({ ...formData, country: value, agency: '', amountTotal: 0 });
  };

  const handleAgencySelect = (value) => {
    setFormData({ ...formData, agency: value });
  };

  const handleTransferTypeChange = (value) => {
    setFormData({ ...formData, transferType: value, amountTotal: 0 });

    if (value === "national") {
      // Sélectionner automatiquement le pays de l'utilisateur
      const userCountryId = user.country?._id;
      setSelectedCountry(userCountryId);
      setFormData((prev) => ({
        ...prev,
        country: userCountryId,
        agency: '',
      }));
    } else {
      // Réinitialiser le pays et l'agence si le transfert n'est pas national
      setSelectedCountry('');
      setFormData((prev) => ({ ...prev, country: '', agency: '' }));
    }
  };


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitAlert = (e) => {
    e.preventDefault();
	let error = false;
    const errorObj = { ...errorsObj };
	if (formData.receiverName === '') {
		errorObj.receiverName = 'Le recepteur est requis';
		error = true;
	}
	if (formData.receiverPhone === '') {
		errorObj.receiverPhone = 'Le recepteur est requis';
		error = true;
	}
	if (formData.amount === '') {
		errorObj.amount = 'Le montant est requis';
		error = true;
	}
	if (formData.agency === '') {
		errorObj.agency = 'Agence est requise';
		error = true;
	}
	setErrors(errorObj);
        if (error) {
          return ;
    }
    swal({
      title: "Etes-vous sûr?",
      text: "Une fois validée la transaction sera initiée",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willInitiate) => {
      if (willInitiate) {
        onSubmit(e);
      } else {
        swal("Votre action est annulée!");
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
	const {receiverName, receiverPhone, country, agency, transferType, amount} = formData;
	dispatch(createTransactionAction({receiverName, receiverPhone, country, agency, transferType, amount}, props.history));
    if (errorMessage) {
      swal("Erreur lors de l'initiation de la transaction", {
        icon: "error",
      });
    } else {
		setFormData({
			receiverName: '',
			receiverPhone: '',
			country: '',
			agency: '',
			transferType: '',
			amount: 0,
			amountTotal: 0,
		});
	}
  };

	return (
		<div className='authincation-content no-gutters auth-form'>
		<h3>Nouvelle Transaction</h3>
		<form onSubmit={onSubmitAlert}>
		  <div className="row">
			<div className="form-group col-md-4">
			  <label>Nom Complet Bénéficiaire</label>
			  <input
				type="text"
				className="form-control"
				name="receiverName"
				value={formData.receiverName}
				onChange={onChange}
				placeholder="Nom du Bénéficiaire"
			  />
			</div>
			<div className="form-group col-md-4">
			  <label>Téléphone Bénéficiaire</label>
			  <input
				type="text"
				className="form-control"
				name="receiverPhone"
				value={formData.receiverPhone}
				onChange={onChange}
				placeholder="Téléphone du Bénéficiaire"
			  />
			</div>
			<div className="form-group col-md-4">
			  <label>Type de Transfert</label>
			  <select
				className="form-control"
				name="transferType"
				value={formData.transferType}
				onChange={(e) => handleTransferTypeChange(e.target.value)}
			  >
				<option value="">Sélectionner...</option>
				<option value="international">International</option>
			  </select>
			</div>
		  </div>
		  <div className="row">
			{/* Afficher le champ "Pays Destination" seulement si transferType == "international" */}
			{formData.transferType === "international" && (
			  <div className="form-group col-md-6 mt-4">
				<label>Pays Destination</label>
				<CustomSelectCountry
				  options={uniqueCountries}
				  onSelect={handleCountrySelect}
				  selectedValue={formData.country}
				/>
			  </div>
			)}
			{(formData.transferType === "national" || formData.transferType === "international") && (
			<div className="form-group col-md-6 mt-4">
			<label>Agence</label>
			<AgencySelect
				options={filteredAgencies}
				onSelect={handleAgencySelect}
				selectedValue={formData.agency}
			/>
			</div>)}
		  </div>
		  <div className="row mb-4 mt-2">
			<div className="form-group col-6">
			  <label>Montant</label>
			  <input
				type="number"
				className="form-control"
				name="amount"
				value={formData.amount}
				onChange={onChange}
				placeholder="Montant"
			  />
			</div>
			<div className="form-group col-6">
			  <label>Montant Total à Recevoir</label>
			  <input
				type="number"
				className="form-control"
				name="amountTotal"
				value={amountTotal}
				onChange={onChange}
				placeholder="Montant Total"
				disabled
			  />
			</div>
		  </div>
		  <button type="submit" className="btn btn-primary">
			Initier la Transaction
		  </button>
		</form>
	  </div>
	);
  }

export default CreateInvoices;