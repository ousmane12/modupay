import React, { Fragment } from "react";
// images
import logo from "../../../../images/logo.png";
//import logoText from "../../../../..//images/logo-text.png";
import PageTitle from "../../../layouts/PageTitle";
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
  
  return (
    <Fragment>
      <PageTitle activeMenu="Bordereau" motherMenu="Transactions" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              {" "}
              Transaction du <strong>{formatDate(transaction.createdAt)}</strong> initié par: <strong>{transaction.initiatedBy.firstName} {transaction.initiatedBy.lastName}</strong>{" "}
              <span className="float-right">
                <strong>Status:</strong> {transaction.status}
              </span>{" "}
            </div>
            <div className="card-body">
              <div className="row mb-5">
                <div className="mt-4 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div>
                    <div className="brand-logo mb-3">
                        <img className="logo-abbr me-2" src={logo} alt="" style={{width:'50px'}}  />
                      </div>
                      <strong>ModuPay</strong>{" "}
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="center">Date</th>
                      <th>Emetteur</th>
                      <th>Recepteur</th>
                      <th className="right">Montant</th>
                      <th className="center">Montant Converti</th>
                      <th className="center">Validation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="center">{formatDate(transaction.updatedAt)}</td>
                      <td className="left strong">{transaction.sender.firstName} {transaction.sender.lastName}</td>
                      <td className="left">{transaction.receiver.firstName} {transaction.receiver.firstName}</td>
                      <td className="right">{formatMoney(transaction.amount, "USD")}</td>
                      <td className="center">{formatMoney(transaction.amountConverted, "XOF")}</td>
                      <td className="center">{transaction.completedBy?.firstName} {transaction.completedBy?.lastName}</td>
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
                        <td className="right">{formatMoney(transaction.amount, "USD")}</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Total Converti</strong>
                        </td>
                        <td className="right">
                          <strong>{formatMoney(transaction.amountConverted, "XOF")}</strong>
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
