import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import swal from "sweetalert";

const handleValidateClick = (transactionId) => {
	swal({
		title: "Etes-vous sûr?",
		text:
		  "Une fois validée le client sera supprimé'",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  }).then((willDelete) => {
		if (willDelete) {
		  //handleDeleteClick(row.original?._id)
		  swal("Le client a bien été supprimé!", {
			icon: "success",
		  });
		} else {
		  swal("Votre action est annulée!");
		}
	  })
  };
export const COLUMNS = [
	{
		Header : 'Nom',
		Footer : 'Nom',
		accessor: 'name',
	},
	{
		Header : 'Téléphone',
		Footer : 'Phone',
		accessor: 'phoneNumber',
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
			  onClick={() => handleValidateClick(row.original._id)
			  }>
				<FaTrash />
			  </button>
			</div>
		),
	},
]

export const PARTNERS_COLUMNS = [
	{
		Header : 'Nom Partenaire',
		Footer : 'Nom',
		accessor: row => row.partner?.name || 'Utilisateur',
	},
	{
		Header : 'Montant Investi',
		Footer : 'Montant Investi',
		accessor: 'amountInvested',
	},
	{
		Header : 'Interet',
		Footer : 'Interet',
		accessor: 'interestPercentage',
	},
	{
		Header : 'Gain',
		Footer : 'Gain',
		accessor: 'totalInterestEarned',
	},
	{
		Header : 'Actions',
		Footer : 'Actions',
		accessor: '_id',
		Cell: ({ row }) => (
			<div className="d-flex">
			  <Link to={{
					pathname: `/partner/${row.original?._id}`,
					state: { investment: row.original },
				}} className="btn btn-primary shadow btn-xs sharp me-2">
				<FaEye />
			  </Link>
			  <Link to={{
					pathname: `/editer-partner/${row.original?._id}`,
					state: { investment: row.original },
				}} className="btn btn-secondary	 shadow btn-xs sharp me-2">
				<FaEdit />
			  </Link>
			  <button className="btn btn-danger shadow btn-xs sharp"
			  onClick={() => handleValidateClick(row.original._id)
			  }>
				<FaTrash />
			  </button>
			</div>
		),
	},
]

export const INVESTMENTS_COLUMNS = [
	{
		Header : 'Pays',
		Footer : 'Pays',
		accessor: 'country.name' || 'Utilisateur',
	},
	{
		Header : 'Montant Investi',
		Footer : 'Montant Investi',
		accessor: 'amountInvested',
	},
	{
		Header : 'Interet',
		Footer : 'Interet',
		accessor: 'interestPercentage',
	},
	{
		Header : 'Gain',
		Footer : 'Gain',
		accessor: 'totalInterestEarned',
	},
	{
		Header : 'Date',
		Footer : 'Date',
		accessor: 'createdAt',
	},
]

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