import {
    createTransaction,
    formatTransactions,
    getTransactions,
    deleteTransaction,
    updateTransaction,
} from '../../services/transactionService';
import {
    CONFIRMED_CREATE_POST_ACTION,
    CONFIRMED_DELETE_POST_ACTION,
    CONFIRMED_EDIT_POST_ACTION,
    CONFIRMED_GET_POSTS,
} from './PostTypes';

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
        type: CONFIRMED_DELETE_POST_ACTION,
        payload: postId,
    };
}

export function createTransactionAction(postData, history) {
   
	return (dispatch, getState) => {
        createTransaction(postData).then((response) => {
            const singleTransaction = {
                ...postData,
                id: response.data.name,
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
        type: CONFIRMED_CREATE_POST_ACTION,
        payload: singleTransaction,
    };
}

export function confirmedGetTransactionsAction(posts) {
    return {
        type: CONFIRMED_GET_POSTS,
        payload: posts,
    };
}

export function confirmedUpdateTransactionAction(post) {

    return {
        type: CONFIRMED_EDIT_POST_ACTION,
        payload: post,
    };
}

export function updateTransactionAction(post, history) {
    return (dispatch, getState) => {
        updateTransaction(post, post.id).then((reponse) => {
            dispatch(confirmedUpdateTransactionAction(post));
            history.push('/postpage');
        });
			
    };
}
