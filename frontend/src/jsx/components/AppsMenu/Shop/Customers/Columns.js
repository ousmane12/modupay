import {format} from 'date-fns';
import { ColumnFilter } from './ColumnFilter';
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
			  <Link to={`/utilisateur/${row.original?._id}`} className="btn btn-primary shadow btn-xs sharp me-2">
				<FaEye />
			  </Link>
			  <Link to={`/editer-utilisateur/${row.original?._id}`} className="btn btn-secondary	 shadow btn-xs sharp me-2">
				<FaEdit />
			  </Link>
			  <button className="btn btn-danger shadow btn-xs sharp" onClick={() => {}}>
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