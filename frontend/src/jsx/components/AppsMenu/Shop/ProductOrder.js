import React, { useEffect, } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    getTransactionsAction, updateTransactionAction,
} from '../../../../store/actions/transactionAction';
import avt1 from './../../../../images/avatar/1.png';
import swal from "sweetalert";


const ProductOrder = (props) => {
  const { transactions } = useSelector(
		(state) => state.transactions
	  )
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const userId = userDetails?._id;
    const formatMoney = (amount, currencyCode) => {
      // Assuming amount is a number
      return amount.toLocaleString('fr-FR', {
        style: 'currency',
        currency: currencyCode, // Use XOF or any other desired currency code
        minimumFractionDigits: 2,
      });
    }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionsAction())
  }, [dispatch])
  const pendingTransactions = transactions.filter(transaction => transaction.status === 'initiated');
  const handleDeleteClick = (transactionId) => {
    swal({
      title: "Etes-vous sûr?",
      text: "Une fois validée la transaction sera annulée",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willInitiate) => {
      if (willInitiate) {
        const formData = {"status": "canceled", "completedBy": userId};
        dispatch(updateTransactionAction(formData, transactionId, props.history));
      } else {
        swal("Votre action est annulée!");
      }});
  };

  const formatDate = (inputDate) =>{
	const date = new Date(inputDate);
	
	// Extract year, month, and day
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}`;
  
	return formattedDate;
}
  
  const handleValidateClick = (transactionId) => {
    swal({
      title: "Etes-vous sûr?",
      text: "Une fois validée la transaction sera completée",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willInitiate) => {
      if (willInitiate) {
      const formData = {"status": "completed", "completedBy": userId};
      dispatch(updateTransactionAction(formData, transactionId, props.history));
    } else {
      swal("Votre action est annulée!");
    }
});
  };

  return (
    <div className="h-80">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body " style={{ padding: "1.25rem" }}>
            {pendingTransactions.length === 0 ? (
                      <div className="row">
                      <p className="btn btn-outline-primary mb-3">Aucune transaction en attente disponible.</p>
                      </div>
              ) : (
              <div className="table-responsive">
                <table className="table table-sm mb-0 table-responsive-lg" key={"prevT"}>
                  <thead>
                    <tr key={"hola"}>
                      <th className="align-middle">Date</th>
                      <th className="align-middle pr-7">Type</th>
                      <th className="align-middle pr-7">Recepteur</th>
                      <th className="align-middle pr-7">Agence</th>
                      <th className="align-middle minw200">Telephone</th>
                      <th className="align-middle text-right">Montant</th>
                      <th className="align-middle text-right">Frais</th>
                      <th className="align-middle text-right">Actions</th>
                      <th className="no-sort" />
                    </tr>
                  </thead>
                  <tbody id="orders">
                  {pendingTransactions.map((transaction) => (
                  <tr>
                    <td>
                      <strong>{formatDate(transaction.initiatedAt)}</strong>
                    </td>
                    <td>
                      <strong>{transaction.transferType}</strong>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={avt1}
                          className="rounded-lg me-2"
                          width="24"
                          alt=""
                        />{" "}
                        <span className="w-space-no">{transaction.receiverName}</span>
                      </div>
                    </td>
                    <td>{transaction.agency?.name}</td>
                    <td>{transaction.receiverPhone}</td>
                    <td>{transaction.amount}</td>
                    <td className="py-2 text-right">
                            {transaction.fee}
                      </td>
                    <td>
                      <div className="d-flex">
                        <button
                          onClick={() => {
                            handleValidateClick(transaction._id)}}
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button
                          
                           onClick={() => {
                            handleDeleteClick(transaction._id)}}
                          className="btn btn-danger shadow btn-xs sharp"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                   ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrder;
