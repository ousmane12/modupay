import {
    CONFIRMED_CREATE_TRANSACTION_ACTION,
    CONFIRMED_DELETE_TRANSACTION_ACTION,
    CONFIRMED_EDIT_TRANSACTION_ACTION,
    CONFIRMED_GET_TRANSACTIONS,
    CREATE_TRANSACTION_ACTION,
} from '../actions/TransactionTypes';

const initialState = {
    transactions: [],
    successMessage: false,
    errorMessage: false
};

export default function TransactionsReducer(state = initialState, actions) {
    
    if (actions.type === CREATE_TRANSACTION_ACTION) {
        const transactions = [...state.transactions];
        return {
            ...state,
            transactions,
        };
    }

    if (actions.type === CONFIRMED_DELETE_TRANSACTION_ACTION) {
        const transactions = [...state.transactions];
        const postIndex = transactions.findIndex(
            (post) => post.id === actions.payload,
        );

        transactions.splice(postIndex, 1);

        return {
            ...state,
            transactions,
        };
    }

    if (actions.type === CONFIRMED_EDIT_TRANSACTION_ACTION) {
        const transactions = [...state.transactions];
        const postIndex = transactions.findIndex(
            (post) => post.id === actions.payload.id,
        );

        transactions[postIndex] = actions.payload;
        return {
            ...state,
            transactions,
        };
    }

    if (actions.type === CONFIRMED_CREATE_TRANSACTION_ACTION) {
        const transactions = [...state.transactions];
        transactions.push(actions.payload);

        return {
            ...state,
            transactions,
        };
    }

    if (actions.type === CONFIRMED_GET_TRANSACTIONS) {
        return {
            ...state,
            transactions: actions.payload,
        };
    }
    return state;
}
