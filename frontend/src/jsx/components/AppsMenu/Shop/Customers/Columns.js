import swal from "sweetalert";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";

export const COLUMNS = [
	{
		Header : 'Nom',
		Footer : 'Nom',
		accessor: 'firstName',
	},
	{
		Header : 'Prenom',
		Footer : 'Prenom',
		accessor: 'lastName',
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
	//const dispatch = useDispatch();
  
	// Dispatch an action to delete the user
	/* dispatch(deleteUserAction(userId)).then((response) => {
	  // Handle success or failure
	  if (response.success) {
		swal("L'utilisateur a bien été supprimé!", {
		  icon: "success",
		});
	  } else {
		swal("Erreur lors de la suppression de l'utilisateur", {
		  icon: "error",
		});
	  }
	}); */
};