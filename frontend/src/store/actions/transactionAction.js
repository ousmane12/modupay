import {
    createTransaction,
    formatTransactions,
    getTransactions,
    deleteTransaction,
    updateTransaction,
} from '../../services/transactionService';
import {
    CONFIRMED_CREATE_TRANSACTION_ACTION,
    CONFIRMED_DELETE_TRANSACTION_ACTION,
    CONFIRMED_EDIT_TRANSACTION_ACTION,
    CONFIRMED_GET_TRANSACTIONS,
    FAILED_CREATE_TRANSACTION_ACTION,
} from './TransactionTypes';
import { failedFetchAction } from './userActions';
import swal from "sweetalert";

export function deleteTransactionAction(postId, history) {
    return (dispatch) => {
        deleteTransaction(postId).then((response) => {
            dispatch(confirmedDeleteTransactionAction(response.data));
            history.push('/postpage');
        });
    };
}

export function confirmedDeleteTransactionAction(postId) {
    return {
        type: CONFIRMED_DELETE_TRANSACTION_ACTION,
        successMessage: true,
        payload: postId,
    };
}

export function createTransactionAction(formData, history) {
   
	return (dispatch) => {
        createTransaction(formData).then((response) => {
            if (response.status === 201) {
                dispatch(confirmedCreateTransactionAction(response.data));
                swal("Transaction enregistré avec succès!", {
                    icon: "success",
                });
                history.push(`/detail-transaction/${response.data?._id}`);
            }else{
                dispatch(failedCreateAction(response.data.message));
                swal(response.data.message, {
                    icon: "warning",
                    dangerMode: true,
                });
            }
        }).catch((error) => {
            console.error(error);
            dispatch(failedCreateAction(error.message));
            swal(error.message, {
                icon: "warning",
                dangerMode: true,
            });
        });
    };
}

export function getTransactionsAction() {
    return (dispatch) => {
        getTransactions().then((response) => {
            let transactions = formatTransactions(response.data);
            dispatch(confirmedGetTransactionsAction(transactions));
        });
    };
}

export function getTransactionsInventaireAction(start, endDate, history) {
    return (dispatch) => {
        getTransactions().then((response) => {
            let transactions = formatTransactions(response.data);
            let newTransactions = filterTransactions(transactions, start, endDate);
            if(newTransactions.length > 0) {
                dispatch(confirmedGetTransactionsAction(newTransactions));
                const dataToPass = {
                    startDate: start,
                    endDate: endDate,
                };
                history.push({
                pathname: '/facture',
                state: { data: dataToPass },
                });
            } else {
                swal("Aucune transaction enregistée entre ces dates!", {
                    icon: "warning",
                });
            }
        });
    };
}

export function getTransactionsInventaireByCountryAction(start, endDate, country, history) {
    return (dispatch) => {
        getTransactions().then((response) => {
            let transactions = formatTransactions(response.data);
            let newTransactions = filterTransactionsP(transactions, start, endDate, null, country);
            if(newTransactions.length > 0) {
                dispatch(confirmedGetTransactionsAction(newTransactions));
                const dataToPass = {
                    startDate: start,
                    endDate: endDate,
                };
                history.push({
                pathname: '/facture',
                state: { data: dataToPass },
                });
            } else {
                swal("Aucune transaction enregistée entre ces dates!", {
                    icon: "warning",
                });
            }
        });
    };
}

export function getTransactionsInventaireByAgencyAction(start, endDate, country, history) {
    return (dispatch) => {
        getTransactions().then((response) => {
            let transactions = formatTransactions(response.data);
            let newTransactions = filterTransactionsS(transactions, start, endDate, country);
            if(newTransactions.length > 0) {
                dispatch(confirmedGetTransactionsAction(newTransactions));
                const dataToPass = {
                    startDate: start,
                    endDate: endDate,
                };
                history.push({
                pathname: '/facture',
                state: { data: dataToPass },
                });
            } else {
                swal("Aucune transaction enregistée entre ces dates!", {
                    icon: "warning",
                });
            }
        });
    };
}

export function confirmedCreateTransactionAction(singleTransaction) {
	
    return {
        type: CONFIRMED_CREATE_TRANSACTION_ACTION,
        payload: { successMessage: true, singleTransaction },
    };
}

export function confirmedGetTransactionsAction(transactions) {
    return {
        type: CONFIRMED_GET_TRANSACTIONS,
        payload: transactions,
    };
}

export function failedCreateAction(message) {
    return {
        type: FAILED_CREATE_TRANSACTION_ACTION,
        payload: { errorMessage: true, message },
    };
}

export function confirmedUpdateTransactionAction(transaction) {

    return {
        type: CONFIRMED_EDIT_TRANSACTION_ACTION,
        successMessage: true,
        payload: transaction,
    };
}

export function updateTransactionAction(transaction, transaction_id, history) {
    return (dispatch) => {
        updateTransaction(transaction, transaction_id).then((response) => {
            if(response.status === 200) {
                dispatch(confirmedUpdateTransactionAction(response.data));
                swal("Transaction modifiée avec succès!", {
                    icon: "success",
                });
                history.push(`/detail-transaction/${response.data?._id}`);
            }
            dispatch(failedFetchAction(response.message));
        }).catch((err) => {
            console.error(err);
            dispatch(failedFetchAction(err.message));
            swal(err.message, {
                icon: "warning",
                dangerMode: true,
            });
        });
			
    };
}


function filterTransactions(transactions, startDate, endDate, country = null, agency = null) {
    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        // Filtrer par date, statut, pays et agence si fournis
        const isDateInRange = transactionDate >= start && transactionDate <= end;
        const isStatusCompleted = transaction.status === "completed";
        const isCountryMatch = country ? transaction.country === country : true;
        const isAgencyMatch = agency ? transaction.agency === agency : true;
        
        return isDateInRange && isStatusCompleted && isCountryMatch && isAgencyMatch;
    });

    return filteredTransactions;
}

function filterTransactionsS(transactions, startDate, endDate, agency) {
    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        // Filtrer par date, statut, pays et agence si fournis
        const isDateInRange = transactionDate >= start && transactionDate <= end;
        const isStatusCompleted = transaction.status === "completed";
        
        return isDateInRange && isStatusCompleted && transaction.agency?.name === agency;
    });

    return filteredTransactions;
}
 
function filterTransactionsP(transactions, startDate, endDate, country) {
    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        // Filtrer par date, statut, pays et agence si fournis
        const isDateInRange = transactionDate >= start && transactionDate <= end;
        const isStatusCompleted = transaction.status === "completed";
        
        return isDateInRange && isStatusCompleted && transaction.country?.name === country;
    });

    return filteredTransactions;
}