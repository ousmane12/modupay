import axios from 'axios';
import swal from "sweetalert";

import {
    loginConfirmedAction,
    logout,
} from '../store/actions/AuthActions';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function signUp(name, role, phoneNumber, email, password) {
    //axios call
    const postData = {
        name, 
        role, 
        phoneNumber,
        email,
        password,
    };
    
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `${API_BASE_URL}/users`,
        postData,
        { headers }
    );
}

export function login(email, password) {
    const postData = {
        "email": email,
        "password": password,
    };
    return axios.post(
        `${API_BASE_URL}/users/login`,
        postData,
    );
}

export function forgotPassword(email) {
    const postData = {
        "email": email
    };
    return axios.post(
        `${API_BASE_URL}/users/forgot-password`,
        postData,
    );
}

export function setPassword(token, email) {
    const postData = {
        "password": email
    };
    return axios.post(
        `${API_BASE_URL}/users/reset-password/${token}`,
        postData,
    );
}

export function formatError(errorResponse) {
    switch (errorResponse) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
           swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            break;
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return errorResponse?.message;
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    /* tokenDetails.expireDate = new Date(
        new Date().getTime() + tokenDetails.expiresIn * 1000,
    ); */
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
    setTimeout(() => {
        dispatch(logout(history));
    }, timer);
}

export function checkAutoLogin(dispatch, history) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    const isResetTokenRoute = /^\/reset-password\/[^/]+$/.test(history.location.pathname);
    if (!tokenDetailsString) {
        if (!isResetTokenRoute) {
            dispatch(logout(history));
        }
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        if (!isResetTokenRoute) {
            dispatch(logout(history));
        }
        return;
    }
    dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, history);
}
