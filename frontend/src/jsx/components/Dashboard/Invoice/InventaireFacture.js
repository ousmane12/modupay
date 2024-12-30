import React, { Fragment, useEffect, useState } from "react";
// images
import logo from "../../../../images/logo.png";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getExpenses } from "../../../../services/transactionService";


const InventaireFacture = () => {
  const location = useLocation();
  const passedData = location.state?.data || {};
  const calculateTransactionAmountSum = (transactions) =>{
    // Use the reduce function to sum the amounts
    const sum = transactions.reduce((total, transaction) => {
      // Ensure transaction.amount is a valid number before adding to the total
      const transactionAmount = typeof transaction.amount === 'number' ? transaction.amount : 0;
      return total + transactionAmount;
    }, 0);
  
    return sum;
  }

  const calculateTransactionAmountSumConverted = (transactions) => {
    const sum = transactions.reduce((total, transaction) => {
      // Conversion du montant en nombre et addition au total
      return total + Number(transaction.amountTotal || 0);
    }, 0);
  
    return sum;
  } 
  
  const calculateTransactionAmountSumWithExpenses = (transactions, expenses) => {
    // Calcul de la somme des transactions
    const totalTransactions = transactions.reduce((total, transaction) => {
      return total + Number(transaction.amountTotal || 0);
    }, 0);
    
    // Calcul de la somme des dépenses (si la liste des expenses est vide, la somme sera 0)
    const totalExpenses = expenses.reduce((total, expense) => {
      return total + Number(expense.amount || 0);
    }, 0);
    
    // Calcul final : somme des transactions - somme des dépenses
    return totalTransactions - totalExpenses;
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
  const [expenses, setExpenses] = useState([]);
  
  const { transactions } = useSelector(
		(state) => state.transactions
	)
  useEffect(() => {
		getExpenses().then((response) => {
			setExpenses(response.data);
		});
	}, []);
  const handlePrint = () => {
    window.print();
  };  
  return (
    <Fragment>
      <button onClick={handlePrint} className="btn btn-primary me-3 mb-4">
        <i className="las la-print me-3 scale5"></i>Imprimer
      </button>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              {" "}
              Inventaire du <strong>{passedData.startDate}</strong> au <strong>{passedData.endDate}</strong>{" "}
              <span className="float-right">
                <strong>Status:</strong> Validé
              </span>{" "}
            </div>
            <div className="card-body">
              <div className="row mb-5">
                <div className="mt-4 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div>
                    <div className="brand-logo mb-3">
                        <img className="logo-abbr me-2" src={logo} alt="" style={{width:'50px'}}  />
                      </div>
                      <strong>Biba Express</strong>{" "}
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="center">Date</th>
                      <th className="center">Type</th>
                      <th>Emetteur</th>
                      <th>Recepteur</th>
                      <th>Traité</th>
                      <th className="right">Montant</th>
                      <th>Frais</th>
                      <th className="center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                  {transactions.map((transaction, index) => (
                    <tr>
                      <td className="center">{formatDate(transaction.updatedAt)}</td>
                      <td className="left strong">{transaction.transferType}</td>
                      <td className="left strong">{transaction.sender? transaction.sender.name: 'Utilisateur'}</td>
                      <td>
                        <div className="d-flex align-items-center">
                        {/* Update this part based on your transaction structure */}
                        <img src={logo} alt="" className="rounded me-3" width="30" />
                        <div>
                          <h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">{transaction.receiverName}</h6>
                          <span className="fs-14">{transaction.receiverPhone}</span>
                        </div>
                        </div>
									    </td>
                      <td className="right">{transaction.completedBy?.name}</td>
                      <td className="right">{transaction.amount} FCFA</td>
                      <td className="right">{transaction.fee.toFixed(2)} FCFA</td>
                      <td className="center">{transaction.amountTotal} FCFA</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-5"> </div>
                <div className="col-lg-4 col-sm-5 ms-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Total</strong>
                        </td>
                        <td className="right">{calculateTransactionAmountSum(transactions)} FCFA</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Total TTC</strong>
                        </td>
                        <td className="right">
                          <strong>{calculateTransactionAmountSumConverted(transactions)} FCFA</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {expenses.length > 0 && <>
              <div className="table-responsive">
                <h6 className=""><strong>Dépenses</strong></h6>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="center">Date</th>
                      <th className="center">Pays/Agence</th>
                      <th>Commentaire</th>
                      <th>Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                  {expenses.map((transaction, index) => (
                    <tr>
                      <td className="center">{formatDate(transaction.createdAt)}</td>
                      <td className="left strong">{transaction.country.name}/{transaction.agency.name}</td>
                      <td>
                        <div className="d-flex align-items-center">
                        {/* Update this part based on your transaction structure */}
                        <img src={logo} alt="" className="rounded me-3" width="30" />
                        <div>
                          <h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">{transaction.spender.name}</h6>
                          <span className="fs-14">{transaction.label}</span>
                        </div>
                        </div>
									    </td>
                      <td className="right">{transaction.amount} FCFA</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-5"> </div>
                <div className="col-lg-4 col-sm-5 ms-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Total   </strong>
                        </td>
                        <td className="right">
                          <strong>{calculateTransactionAmountSum(expenses)} FCFA</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div></>}
              <div className="row">
                <div className="col-lg-4 col-sm-5"> </div>
                <div className="col-lg-4 col-sm-5 ms-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Bilan</strong>
                        </td>
                        <td className="right">
                          <strong>{calculateTransactionAmountSumWithExpenses(transactions, expenses)} FCFA</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InventaireFacture;
