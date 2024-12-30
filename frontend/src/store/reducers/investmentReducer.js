import {
    INVESTMENT_CREATE_FAILED_ACTION,
    FETCH_INVESTMENT_DATA_ACTION,
    INVESTMENT_CREATED_ACTION,
    INVESTMENT_EDIT_FAILED_ACTION,
} from '../actions/investmentActions';

const initialStateInv = {
    investments: [],
    errorMessage: '',
    successMessage: '',
    showLoading: false,
};

export function InvestmentReducer(state = initialStateInv, action) {
    if (action.type === INVESTMENT_CREATED_ACTION) {
        return {
            ...state,
            users: [...state.users, action.payload],
            errorMessage: '',
            successMessage: 'Created Successfully an invesment',
            showLoading: false,
        };
    }
    if (action.type === FETCH_INVESTMENT_DATA_ACTION) {
        return {
            ...state,
            users: action.payload,
            errorMessage: '',
            successMessage: 'Fetch investments data Completed',
            showLoading: false,
        };
    }

    if (
        action.type === INVESTMENT_CREATE_FAILED_ACTION ||
        action.type === INVESTMENT_EDIT_FAILED_ACTION
    ) {
        return {
            ...state,
            errorMessage: action.payload,
            successMessage: '',
            showLoading: false,
        };
    }

    return state;
}