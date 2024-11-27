import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import swal from "sweetalert";

import { Link, useLocation } from "react-router-dom";
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
	const [formData, setFormData] = useState({
		label: '',
		amount: 0,
	});
	const [state, dispatch] = useReducer(reducer, initialState);
 	const user = useSelector(state => state.auth.auth);
  	const location = useLocation();
	let path = location.pathname;
	path = path.split("/");
	path = path[path.length - 1];
  //var path = window.location?.pathname.split("/");
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const onSubmit = () => {
	const {label, amount} = formData;
	createExpense({label, amount}).then(() => {
		swal("Expense created successfully", "success");
	});
  };
  return ( 
    <div className="header border-bottom">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
            </div>
            <ul className="navbar-nav header-right">
				{user.role !== 'partner' && <>
				<li className="nav-item invoices-btn">
					<Link to="/nouvelle-transaction" className="btn btn-primary mb-1 ms-1"><i className="far fa-file-alt fs-20 me-2"></i>Nouvelle Transaction</Link>
				</li> {" "}
				<li className="nav-item">
					<Button style={{backgroundColor: "#FD5353"}} className="btn btn-danger mb-1 ms-1" onClick={() => dispatch({type:'sendMessageOpen'})}><i className="far fa-file-alt fs-20 me-2"></i>Nouvelle Dépense</Button>
				</li>
				</>}
            </ul>
          </div>
        </nav>
		<Modal className="modal fade" show={state.sendMessageOpen} onHide={()=> dispatch({type: 'sendMessageOpen'})}>
			<div className="modal-content">
				<div className="modal-header">
				<h5 className="modal-title">Enregistrer une dépense</h5>
				<Button variant="" type="button" className="close" data-dismiss="modal" onClick={() => dispatch({type:'sendMessageOpen'})}>
					<span>x</span>
				</Button>
				</div>
				<div className="modal-body">
				<form className="comment-form" onSubmit={(e) => { e.preventDefault(); onSubmit();  dispatch({type:'sendMessageOpen'}); }}>
					<div className="row">
					<div className="col-lg-12">
						<div className="form-group mb-3">
						<label htmlFor="author" className="text-black font-w600">Montant <span className="required">*</span> </label>
						<input type="number" value={formData.amount} onChange={onChange} className="form-control" name="amount" placeholder="Montant" />
						</div>
					</div>
					<div className="col-lg-12">
						<div className="form-group mb-3">
						<label htmlFor="comment" className="text-black font-w600">Commentaire <span className="required">*</span></label>
						<textarea rows={8} value={formData.label} onChange={onChange} className="form-control" name="label" placeholder="Motif dépense" defaultValue={""}/>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="form-group mb-3">
						<input type="submit" value="Enregistrer" className="submit btn btn-primary" name="submit"/>
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
