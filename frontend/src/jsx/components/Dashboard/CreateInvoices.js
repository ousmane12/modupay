import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomeSelect';
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	getClientsAction,
  loadingToggleAction
} from '../../../store/actions/userActions';
import {
  createTransactionAction,
} from '../../../store/actions/transactionAction';

const CreateInvoices = (props) => {
  const [formData, setFormData] = useState({
    sender: '',
    receiver: '',
    amount: 0,
    amountConverted: 0,
  });
  const { users } = useSelector(
    (state) => state.users
  )
  const errorMessage = useSelector((state) => state.transactions.errorMessage);
  //const successMessage = useSelector((state) => state.transactions.successMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientsAction());
    return () => {
      dispatch(loadingToggleAction(false))
    };
  }, [dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const { sender, receiver, amount, amountConverted } = formData

  const onSubmitAlert = (e) => {
    e.preventDefault();
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
    dispatch(createTransactionAction(sender, receiver, amount, amountConverted, props.history));
    if (errorMessage) {
      swal("Erreur lors de l'initiation de la transaction", {
        icon: "error",
      });
    } else {
		notifyTopCenter();
		props.history.push('/valider-transaction');
	}
  };

  const notifyTopCenter = () => {
    toast.warn("✔️ Top Center !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleReceiverSelect = (receiverId) => {
    setFormData((prevState) => ({
      ...prevState,
      receiver: receiverId
    }));
  };

  const handleSenderSelect = (senderId) => {
    setFormData((prevState) => ({
      ...prevState,
      sender: senderId
    }));
  };

  return (
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
                    <form onSubmit={onSubmitAlert}>
                      <div className="row">
                        <div className="form-group col-md-12">
                          <label>Emetteur</label>
                          <CustomSelect options={users} onSelect={handleSenderSelect} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group mt-0 col-md-12">
                          <label>Destinataire</label>
                          <CustomSelect options={users} onSelect={handleReceiverSelect} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group mb-5 col-md-6">
                          <label>Montant</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="0"
                            value={amount}
                            onChange={onChange}
                            name="amount"
                            required
                          />
                        </div>
                        <div className="form-group mb-3 col-md-5">
                          <label>Montant Converti</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="650"
                            value={amountConverted}
                            onChange={onChange}
                            name="amountConverted"
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary ">
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
	  <ToastContainer/>
    </>
  )
}
export default CreateInvoices;