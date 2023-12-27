import { createSelector } from 'reselect';

export const getTransactionById = (state, postId) =>
    state.transactions.transactions.find((transaction) => transaction.id === postId);

export const getTransaction = () => createSelector([getTransactionById], (transaction) => transaction);
