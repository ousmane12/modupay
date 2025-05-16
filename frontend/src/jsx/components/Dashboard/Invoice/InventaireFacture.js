import React, { Fragment, useEffect, useState, useRef } from "react";
// images
import logo from "../../../../images/logo.png";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getExpenses } from "../../../../services/transactionService";


const InventaireFacture = () => {
  const location = useLocation();
  const passedData = location.state?.data || {};
  const [viewMode, setViewMode] = useState('custom'); // 'custom' or 'monthly'
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const printableContentRef = useRef(null);
  
  const { transactions } = useSelector(
    (state) => state.transactions
  );
  
  // Function to filter data by month
  const filterDataByMonth = () => {
    if (!transactions || !expenses) return;
    
    const filteredTrans = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.updatedAt);
      return transactionDate.getMonth() === parseInt(selectedMonth) && 
             transactionDate.getFullYear() === parseInt(selectedYear);
    });
    
    const filteredExp = expenses.filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate.getMonth() === parseInt(selectedMonth) && 
             expenseDate.getFullYear() === parseInt(selectedYear);
    });
    
    setFilteredTransactions(filteredTrans);
    setFilteredExpenses(filteredExp);
  };
  
  const calculateTransactionAmountSum = (transactions) => {
    if (!transactions || transactions.length === 0) return 0;
    
    // Use the reduce function to sum the amounts
    const sum = transactions.reduce((total, transaction) => {
      // Ensure transaction.amount is a valid number before adding to the total
      const transactionAmount = typeof transaction.amount === 'number' ? transaction.amount : 0;
      return total + transactionAmount;
    }, 0);
  
    return sum;
  }

  const calculateTransactionAmountSumFees = (transactions) => {
    if (!transactions || transactions.length === 0) return 0;
    
    // Use the reduce function to sum the amounts
    const sum = transactions.reduce((total, transaction) => {
      // Ensure transaction.amount is a valid number before adding to the total
      const transactionAmount = typeof transaction.fee === 'number' ? transaction.fee : 0;
      return total + transactionAmount;
    }, 0);
  
    return sum;
  }

  const calculateTransactionAmountSumConverted = (transactions) => {
    if (!transactions || transactions.length === 0) return 0;
    
    const sum = transactions.reduce((total, transaction) => {
      // Conversion du montant en nombre et addition au total
      return total + Number(transaction.amountTotal || 0);
    }, 0);
  
    return sum;
  } 
  
  const calculateTransactionAmountSumWithExpenses = (transactions, expenses) => {
    if (!transactions) transactions = [];
    if (!expenses) expenses = [];
    
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
  
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    
    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  useEffect(() => {
    getExpenses().then((response) => {
      setExpenses(response.data);
    });
  }, []);

  useEffect(() => {
    if (viewMode === 'monthly') {
      filterDataByMonth();
    } else {
      // Pour la période personnalisée, utilisez les données originales
      setFilteredTransactions(transactions);
      setFilteredExpenses(expenses);
    }
  }, [viewMode, selectedMonth, selectedYear, transactions, expenses]);

  const handlePrint = () => {
    // Créer un nouvel élément iframe
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.top = '-9999px';
    printFrame.style.left = '-9999px';
    document.body.appendChild(printFrame);
    
    // Obtenir le contenu du tableau
    const contentToPrint = printableContentRef.current;
    
    // Définir le contenu du iframe et imprimer
    const frameDoc = printFrame.contentWindow || printFrame.contentDocument.document || printFrame.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write(`
      <html>
        <head>
          <title>Inventaire</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
            .table th, .table td { padding: 0.75rem; border-top: 1px solid #dee2e6; text-align: left; }
            .table thead th { vertical-align: bottom; border-bottom: 2px solid #dee2e6; }
            .table tbody + tbody { border-top: 2px solid #dee2e6; }
            .table-striped tbody tr:nth-of-type(odd) { background-color: rgba(0, 0, 0, 0.05); }
            .row { display: flex; flex-wrap: wrap; }
            .col-lg-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
            .col-sm-5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
            .ms-auto { margin-left: auto; }
            .card { border: 1px solid rgba(0,0,0,.125); border-radius: .25rem; }
            .card-header { padding: .75rem 1.25rem; border-bottom: 1px solid rgba(0,0,0,.125); }
            .card-body { padding: 1.25rem; }
            .table-clear td { padding: 0.75rem; border-top: 1px solid #dee2e6; }
            .right { text-align: right; }
            .center { text-align: center; }
            .left { text-align: left; }
            .brand-logo { margin-bottom: 1rem; }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${contentToPrint.innerHTML}
        </body>
      </html>
    `);
    frameDoc.document.close();
    
    // Imprimer et supprimer le iframe
    setTimeout(() => {
      frameDoc.window.focus();
      frameDoc.window.print();
      document.body.removeChild(printFrame);
    }, 500);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };
  
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (mode === 'monthly') {
      filterDataByMonth();
    }
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  };
  
  // Déterminer quelles données utiliser en fonction du mode actuel
  const displayTransactions = viewMode === 'monthly' ? filteredTransactions : transactions;
  const displayExpenses = viewMode === 'monthly' ? filteredExpenses : expenses;

  return (
    <Fragment>
      <div className="d-flex mb-4">
        <div className="me-3">
          <button onClick={() => handleViewModeChange('custom')} className={`btn ${viewMode === 'custom' ? 'btn-primary' : 'btn-light'}`}>
            Période personnalisée
          </button>
        </div>
        <div className="me-3">
          <button onClick={() => handleViewModeChange('monthly')} className={`btn ${viewMode === 'monthly' ? 'btn-primary' : 'btn-light'}`}>
            Mensuel
          </button>
        </div>
        {viewMode === 'monthly' && (
          <div className="d-flex">
            <select 
              className="form-control me-2" 
              value={selectedMonth} 
              onChange={handleMonthChange}
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            <select 
              className="form-control me-2" 
              value={selectedYear} 
              onChange={handleYearChange}
            >
              {generateYearOptions().map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        )}
        <button onClick={handlePrint} className="btn btn-primary ms-auto">
          <i className="las la-print me-3 scale5"></i>Imprimer
        </button>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card" ref={printableContentRef}>
            <div className="card-header">
              {viewMode === 'custom' ? (
                <Fragment>
                  Inventaire du <strong>{passedData.startDate}</strong> au <strong>{passedData.endDate}</strong>
                </Fragment>
              ) : (
                <Fragment>
                  Inventaire du mois de <strong>{monthNames[selectedMonth]} {selectedYear}</strong>
                </Fragment>
              )}
              <span className="float-right">
                <strong>Status:</strong> Validé
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-5">
                <div className="mt-4 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div>
                    <div className="brand-logo mb-3">
                      <img className="logo-abbr me-2" src={logo} alt="" style={{width:'50px'}} />
                    </div>
                    <strong>Biba Express</strong>
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
                      <th>Traité</th>
                      <th className="right">Montant</th>
                      <th>Frais</th>
                      <th className="center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                  {displayTransactions && displayTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="center">{formatDate(transaction.updatedAt)}</td>
                      <td className="left strong">{transaction.sender? transaction.sender.name: 'Utilisateur'}</td>
                      <td>
                        <div className="d-flex align-items-center">
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
                        <td className="right">
                          {calculateTransactionAmountSum(displayTransactions)} FCFA
                        </td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Total TTC</strong>
                        </td>
                        <td className="right">
                          <strong>
                            {calculateTransactionAmountSumConverted(displayTransactions)} FCFA
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {displayExpenses && displayExpenses.length > 0 && (
                <>
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
                      {displayExpenses.map((transaction, index) => (
                        <tr key={index}>
                          <td className="center">{formatDate(transaction.createdAt)}</td>
                          <td className="left strong">{transaction.country?.name}/{transaction.agency?.name}</td>
                          <td>
                            <div className="d-flex align-items-center">
                            <img src={logo} alt="" className="rounded me-3" width="30" />
                            <div>
                              <h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">{transaction.spender?.name}</h6>
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
                              <strong>Total Dépenses</strong>
                            </td>
                            <td className="right">
                              <strong>
                                {calculateTransactionAmountSum(displayExpenses)} FCFA
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              
              <div className="row">
                <div className="col-lg-4 col-sm-5"> </div>
                <div className="col-lg-4 col-sm-5 ms-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Total Frais</strong>
                        </td>
                        <td className="right">
                          <strong>
                            {calculateTransactionAmountSumFees(displayTransactions)} FCFA
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-5"> </div>
                <div className="col-lg-4 col-sm-5 ms-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Bilan (Transactions + Dépenses)</strong>
                        </td>
                        <td className="right">
                          <strong>
                            {calculateTransactionAmountSumWithExpenses(displayTransactions, displayExpenses)} FCFA
                          </strong>
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