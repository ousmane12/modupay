import React, { Fragment } from "react";
// images
import logo from "../../../../images/logo.png";
//import logoText from "../../../../..//images/logo-text.png";
import { useLocation } from 'react-router-dom';


const TransactionsDetails = () => {
  const location = useLocation();
  const transaction = location.state?.data || {};
  
  const formatDate = (inputDate) =>{
    const date = new Date(inputDate);
    
    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
  const formatMoney = (amount, currencyCode) => {
    // Assuming amount is a number
    return amount.toLocaleString('fr-FR', {
      style: 'currency',
      currency: currencyCode, // Use XOF or any other desired currency code
      minimumFractionDigits: 2,
    });
  }

  const handlePrint = () => {
  };
  
  return (
    <Fragment>
      <button onClick={handlePrint} className="btn btn-primary light me-3 mb-4">
        <i className="las la-print me-3 scale5"></i>Imprimer
      </button>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-5">
                <div className="mt-4 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div>
                    <div className="brand-logo">
                        <img className="logo-abbr me-2" src={logo} alt="" style={{width:'150px'}}  />
                    </div>
                    <div className="">
                      Transaction du <strong>{formatDate(transaction.createdAt)}</strong> <br/> 
                      Initié par: <strong>{transaction.sender? transaction.sender.name: 'Utilisateur'}</strong> <br/>
                      <span className="float-right">
                      Validé par: <strong>{transaction.completedBy? transaction.completedBy.name : 'En cours'}</strong> 
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Recepteur</th>
                      <th>Telephone</th>
                      <th className="right">Type</th>
                      <th className="right">Agence</th>
                      <th className="right">Montant</th>
                      <th className="right">Frais</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="left">{transaction.receiverName}</td>
                      <td className="left strong">{transaction.receiverPhone}</td>
                      <td className="left strong">{transaction.transferType}</td>
                      <td className="left strong">{transaction.agency.name}</td>
                      <td className="right">{transaction.amount} FCFA</td>
                      <td className="right">{transaction.fee} FCFA</td>
                    </tr>
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
                        <td className="right">{transaction.amount} FCFA</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Frais</strong>
                        </td>
                        <td className="right">{transaction.fee} FCFA</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Total TTC</strong>
                        </td>
                        <td className="right">
                          <strong>{transaction.amountTotal} FCFA</strong>
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

export default TransactionsDetails;
