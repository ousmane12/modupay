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
		transferType: 'international',
		amount: 0,
		amountTotal: 0,
	});
	const [agencies, setAgencies] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('');
    const [filteredAgencies, setFilteredAgencies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
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

      const calculatedTotal = formData.amount * (1 - feePercentage / 100);
      setAmountTotal(calculatedTotal); // Mettre à jour amountTotal sans mettre à jour formData
    } else {
      setAmountTotal(0); // Réinitialiser si pas de montant ou de pays sélectionné
    }
  }, [formData.amount, selectedCountry, formData.transferType, uniqueCountries]);

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
	if (!formData.receiverName || !formData.receiverPhone || !formData.amount || !formData.agency) {
		swal("Veuillez remplir tous les champs requis", { icon: "error" });
		return;
	  }
	try {
		setIsLoading(true); // Activer le spinner
		const { receiverName, receiverPhone, country, agency, transferType, amount } = formData;
		dispatch(createTransactionAction({receiverName, receiverPhone, country, agency, transferType, amount}, props.history));
		setFormData({
		  receiverName: "",
		  receiverPhone: "",
		  country: "",
		  agency: "",
		  transferType: "international",
		  amount: 0,
		  amountTotal: 0,
		});
	  } catch (error) {
		swal("Erreur lors de l'initiation de la transaction", { icon: "error" });
	  } finally {
		setIsLoading(false); // Désactiver le spinner
	  }
  };

	return (
		<div className='authincation-content no-gutters auth-form'>
		<h3>Nouvelle Transaction</h3>
		<form onSubmit={onSubmitAlert} className="p-3 rounded">
			<div className="row mt-4 mb-4">
				<div className="form-group col-md-6">
				<label className="form-label"><strong>Nom Complet Bénéficiaire</strong></label>
				<input
					type="text"
					className="form-control"
					name="receiverName"
					value={formData.receiverName}
					onChange={onChange}
					placeholder="Nom du Bénéficiaire"
					required
				/>
				</div>
				<div className="form-group col-md-6">
				<label className="form-label"><strong>Téléphone Bénéficiaire</strong></label>
				<input
					type="text"
					className="form-control"
					name="receiverPhone"
					value={formData.receiverPhone}
					onChange={onChange}
					placeholder="Téléphone du Bénéficiaire"
					required
				/>
				</div>
			</div>

			<div className="row">
				{/* Afficher "Pays Destination" seulement si transferType == "international" */}
				<div className="form-group col-md-6">
					<label className="form-label"><strong>Pays Destination</strong></label>
					<CustomSelectCountry
					options={uniqueCountries}
					onSelect={handleCountrySelect}
					selectedValue={formData.country}
					/>
				</div>

				{/* Afficher "Agence" si transferType est défini */}
				
				<div className="form-group col-md-6 mt-0">
					<label className="form-label mt-0"><strong>Agence</strong></label>
					<AgencySelect
					options={filteredAgencies}
					onSelect={handleAgencySelect}
					selectedValue={formData.agency}
					/>
				</div>

			</div>

			<div className="row">
				<div className="form-group col-md-6">
				<label className="form-label"><strong>Montant</strong></label>
				<input
					type="number"
					className="form-control"
					name="amount"
					value={formData.amount}
					onChange={onChange}
					placeholder="Montant"
					required
				/>
				</div>
				<div className="form-group col-md-6">
				<label className="form-label"><strong>Montant Total à Recevoir</strong></label>
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

			<div className="d-flex justify-content-center mt-4">
				<button
				type="submit"
				className="btn btn-primary w-50"
				disabled={isLoading}
				>
				{isLoading ? (
					<span
					className="spinner-border spinner-border-sm"
					role="status"
					aria-hidden="true"
					></span>
				) : (
					"Initier la Transaction"
				)}
				</button>
			</div>
		</form>
	  </div>
	);
  }

export default CreateInvoices;