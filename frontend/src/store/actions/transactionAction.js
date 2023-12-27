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
} from './TransactionTypes';

export function deleteTransactionAction(postId, history) {
    return (dispatch, getState) => {
        deleteTransaction(postId).then((response) => {
            dispatch(confirmedDeleteTransactionAction(postId));
            history.push('/postpage');
        });
    };
}

export function confirmedDeleteTransactionAction(postId) {
    return {
        type: CONFIRMED_DELETE_TRANSACTION_ACTION,
        payload: postId,
    };
}

export function createTransactionAction(postData, history) {
   
	return (dispatch, getState) => {
        createTransaction(postData).then((response) => {
            const singleTransaction = {
                ...postData,
                id: response.data.amount,
            };
            dispatch(confirmedCreateTransactionAction(singleTransaction));
            history.push('/postpage');
        });
    };
}

export function getTransactionsAction() {
    return (dispatch, getState) => {
        getTransactions().then((response) => {
            let transactions = formatTransactions(response.data);
            dispatch(confirmedGetTransactionsAction(transactions));
        });
    };
}

export function confirmedCreateTransactionAction(singleTransaction) {
	
    return {
        type: CONFIRMED_CREATE_TRANSACTION_ACTION,
        payload: singleTransaction,
    };
}

export function confirmedGetTransactionsAction(transactions) {
    return {
        type: CONFIRMED_GET_TRANSACTIONS,
        payload: transactions,
    };
}

export function confirmedUpdateTransactionAction(transaction) {

    return {
        type: CONFIRMED_EDIT_TRANSACTION_ACTION,
        payload: transaction,
    };
}

export function updateTransactionAction(transaction, history) {
    return (dispatch, getState) => {
        updateTransaction(transaction, transaction.id).then((reponse) => {
            dispatch(confirmedUpdateTransactionAction(transaction));
            history.push('/postpage');
        });
			
    };
}
