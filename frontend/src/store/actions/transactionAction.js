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

export function createTransactionAction(sender, receiver, amount, amountConverted, history) {
   
	return (dispatch) => {
        createTransaction(sender, receiver, amount, amountConverted).then((response) => {
            if (response.status === 200) {
                dispatch(confirmedCreateTransactionAction(response.data));
            }else{
                dispatch(failedCreateAction(response.data.message));
            }
        }).catch((error) => {
            console.error(error);
            dispatch(failedCreateAction(error.message));
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
            let newTransactions = filterTransactionsByDate(transactions, start, endDate);
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
            dispatch(confirmedUpdateTransactionAction(response.data));
            history.push('/liste-transactions');
        }).catch((err) => {
            console.error(err);
            dispatch(failedFetchAction(err.message));
        });
			
    };
}


function filterTransactionsByDate(transactions, startDate, endDate) {
    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
    
        return (
          transactionDate >= start &&
          transactionDate <= end &&
          transaction.status === "completed"
        );
      });
  
    return filteredTransactions;
  }  