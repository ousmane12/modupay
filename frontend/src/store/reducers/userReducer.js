import {
    USER_CREATE_FAILED_ACTION,
    FETCH_USER_DATA_ACTION,
    USER_CREATED_ACTION,
    USER_EDIT_FAILED_ACTION,
} from '../actions/userActions';

const initialStateUser = {
    users: [],
    errorMessage: '',
    successMessage: '',
    showLoading: false,
};

export function UserReducer(state = initialStateUser, action) {
    if (action.type === USER_CREATED_ACTION) {
        return {
            ...state,
            users: [...state.users, action.payload],
            errorMessage: '',
            successMessage: 'Created Successfully a user',
            showLoading: false,
        };
    }
    if (action.type === FETCH_USER_DATA_ACTION) {
        return {
            ...state,
            users: action.payload,
            errorMessage: '',
            successMessage: 'Fetch users data Completed',
            showLoading: false,
        };
    }

    if (action.type === 'UPDATE_USER_LIST') {
        return {
            ...state,
            users: action.payload,
        };
    }

    if (
        action.type === USER_CREATE_FAILED_ACTION ||
        action.type === USER_EDIT_FAILED_ACTION
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

    
