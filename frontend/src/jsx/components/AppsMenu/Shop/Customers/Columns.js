import swal from "sweetalert";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { deleteCountry } from "../../../../../services/countryService";
import { deleteCountryAction } from "../../../../../store/actions/countryActions";
import { useAppDispatch } from "../../../../../store/store";
import { deleteAgency } from "../../../../../services/agencyService";
import { deleteAgencyAction } from "../../../../../store/actions/agencyActions";
import { deleteUser } from "../../../../../services/userService";
import { deleteUserAction } from "../../../../../store/actions/userActions";

export const COLUMNS = [
	{
		Header : 'Nom',
		Footer : 'Nom',
		accessor: 'name',
	},
	{
		Header : 'Email',
		Footer : 'Email',
		accessor: 'email',
	},
	{
		Header : 'Téléphone',
		Footer : 'Phone',
		accessor: 'phoneNumber',
	},
	{
		Header : 'Role',
		Footer : 'Role',
		accessor: 'role',
	},
	{
		Header : 'Actions',
		Footer : 'Actions',
		accessor: '_id',
		Cell: ({ row }) => (
			<div className="d-flex">
			  <Link to={{
					pathname: `/utilisateur/${row.original?._id}`,
					state: { user: row.original },
				}} className="btn btn-primary shadow btn-xs sharp me-2">
				<FaEye />
			  </Link>
			  <Link to={{
					pathname: `/editer-utilisateur/${row.original?._id}`,
					state: { user: row.original },
				}} className="btn btn-secondary	 shadow btn-xs sharp me-2">
				<FaEdit />
			  </Link>
			  <button className="btn btn-danger shadow btn-xs sharp"
			  onClick={() =>
				swal({
				  title: "Etes-vous sûr?",
				  text: "Une fois validée l'utilisateur sera supprimé'",
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,
				}).then((willDelete) => {
				  if (willDelete) {
					handleDeleteClick(row.original?._id);
				  } else {
					swal("Votre action est annulée!");
				  }
				})
			  }>
				<FaTrash />
			  </button>
			</div>
		),
	},
]

export const COUNTRY_COLUMNS = [
	{
		Header : 'Nom',
		Footer : 'Nom',
		accessor: 'name',
	},
	{
		Header : 'Frais Local',
		Footer : 'Frais Local',
		accessor: 'localFeePercentage',
	},
	{
		Header : 'Frais International',
		Footer : 'Frais Int',
		accessor: 'intFeePercentage',
	},
	{
		Header : 'Actions',
		Footer : 'Actions',
		accessor: '_id',
		Cell: ({ row }) => (
			<div className="d-flex">
			  <Link to={{
					pathname: `/country/${row.original?._id}`,
					state: { country: row.original },
				}} className="btn btn-primary shadow btn-xs sharp me-2">
				<FaEye />
			  </Link>
			  <Link to={{
					pathname: `/edit-country/${row.original?._id}`,
					state: { country: row.original },
				}} className="btn btn-secondary	 shadow btn-xs sharp me-2">
				<FaEdit />
			  </Link>
			  <button className="btn btn-danger shadow btn-xs sharp"
			  onClick={() =>
				swal({
				  title: "Etes-vous sûr?",
				  text: "Une fois validée le pays sera supprimée'",
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,
				}).then((willDelete) => {
				  if (willDelete) {
					handleDeleteCountryClick(row.original?._id);
				  } else {
					swal("Votre action est annulée!");
				  }
				})
			  }>
				<FaTrash />
			  </button>
			</div>
		),
	},
]

export const AGENCY_COLUMNS = [
    {
        Header: 'Nom Agence',
        Footer: 'Nom Agence',
        accessor: 'name',
    },
    {
        Header: 'Pays',
        Footer: 'Pays',
        accessor: row => row.country?.name || 'Utilisateur', // Accéder au nom du pays
    },
    {
        Header: 'Manager',
        Footer: 'Manager',
        accessor: row => `${row.manager?.name || 'Utilisateur'}`, // Accéder au nom du manager
    },
    {
        Header: 'Actions',
        Footer: 'Actions',
        accessor: '_id',
        Cell: ({ row }) => (
            <div className="d-flex">
                <Link to={{
                    pathname: `/agency/${row.original?._id}`,
                    state: { agency: row.original },
                }} className="btn btn-primary shadow btn-xs sharp me-2">
                    <i className="fas fa-eye"></i>
                </Link>
                <Link to={{
                    pathname: `/edit-agency/${row.original?._id}`,
                    state: { agency: row.original },
                }} className="btn btn-secondary shadow btn-xs sharp me-2">
                    <i className="fas fa-edit"></i>
                </Link>
                <button className="btn btn-danger shadow btn-xs sharp"
                    onClick={() =>
                        swal({
                            title: "Etes-vous sûr?",
                            text: "Une fois validée l'agence sera supprimée'",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        }).then((willDelete) => {
                            if (willDelete) {
                                handleDeleteAgencyClick(row.original?._id);
                            } else {
                                swal("Votre action est annulée!");
                            }
                        })
                    }>
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        ),
    },
];

export const GROUPED_COLUMNS = [
	{
		Header : 'Id',
		Footer : 'Id',
		accessor: '_id'
	},
	{
		Header : 'Name',
		Footer : 'Name',
		columns: [
			{
				Header : 'First Name',
				Footer : 'First Name',
				accessor: 'firstName'
			},
			{
				Header : 'Last Name',
				Footer : 'Last Name',
				accessor: 'lastName'
			},
		]
	},
	{
		Header: 'Info',
		Footer: 'Info',
		columns: [
			{
				Header : 'Date of  Birth',
				Footer : 'Date of  Birth',
				accessor: 'date_of_birth'
			},
			{
				Header : 'Country',
				Footer : 'Country',
				accessor: 'country',
			},
			{
				Header : 'Phone',
				Footer : 'Phone',
				accessor: 'phone'
			},
		]
	},
]

const handleDeleteClick = (userId) => {
	deleteUser(userId).then((response) => {
		if(response.status === 200){
			swal("L'utilisateur a bien été supprimé!", {
				icon: "success",
			}).then(() => {
				// Redirection vers /pays après le message de succès
				useAppDispatch(deleteUserAction(userId));
			  });
		}
	}).catch((error) => {
		console.log(error);
		swal("Erreur lors de la suppression de l'utilisateur", {
			icon: "error",
		  });
	});
};

const handleDeleteCountryClick = (userId) => {
	deleteCountry(userId).then((response) => {
		if(response.status === 200){
			swal("Le pays a bien été supprimé!", {
				icon: "success",
			}).then(() => {
				// Redirection vers /pays après le message de succès
				useAppDispatch(deleteCountryAction(userId));
			  });
		}
	}).catch((error) => {
		console.log(error);
		swal("Erreur lors de la suppression du pays", {
			icon: "error",
		  });
	});
};

const handleDeleteAgencyClick = (userId) => {
	deleteAgency(userId).then((response) => {
		if(response.status === 200){
			swal("L'agence a bien été supprimée!", {
				icon: "success",
			}).then(() => {
				// Redirection vers /pays après le message de succès
				useAppDispatch(deleteAgencyAction(userId));
			  });
		}
	}).catch((error) => {
		console.log(error);
		swal("Erreur lors de la suppression de l'agence", {
			icon: "error",
		  });
	});
};