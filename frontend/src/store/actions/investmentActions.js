import {
    formatError,
    fetchInvestments,
    createInvestment,
    updateInvestment,
    deleteInvestment,
} from '../../services/investmentService';
import swal from "sweetalert";


export const INVESTMENT_CREATE_FAILED_ACTION = '[add action] failed add';
export const INVESTMENT_DELETE_FAILED_ACTION = '[delete action] failed delete';
export const INVESTMENT_DELETE_SUCCESS_ACTION = '[delete action] delete action';
export const INVESTMENT_FETCH_FAILED_ACTION = '[add action] failed fetch';
export const INVESTMENT_EDIT_ACTION = '[Edit action] edit action';
export const INVESTMENT_EDIT_FAILED_ACTION = '[Edit action] edit failed';
export const INVESTMENT_CREATED_ACTION = '[Add action] add action';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const FETCH_INVESTMENT_DATA_ACTION = '[Fetch action] fetch action';

export function createAction(name, phoneNumber, email, selectedCountries, amountInvested, interestPercentage, history) {
    return (dispatch) => {
        createInvestment(name, phoneNumber, email, selectedCountries, amountInvested, interestPercentage)
        .then((response) => {
            if (response.status === 201) {
                dispatch(confirmedCreateAction(response.data));
                swal(response.data.message, {
                    icon: "success",
                });
                history.push('/partners');
              } 
            // Treat other status codes as errors
            const errorMessage = formatError(response.data);
            swal(errorMessage, {
                icon: "success",
            });
            dispatch(failedCreateAction(errorMessage));
        })
        .catch((error) => {
            console.log(error);
            swal(error.message, {
                icon: "warning",
                dangerMode: true,
            });
            const errorMessage = formatError(error);
            dispatch(failedCreateAction(errorMessage));
        });
    };
}

export function getInvestmentsAction() {
    return async (dispatch) => {
      try {
        dispatch(loadingToggleAction(true));
        const response = await fetchInvestments();
        const clients = response.data;
        dispatch(fetchDataAction(clients));
      } catch (error) {
        console.log(error);
        const errorMessage = formatError(error);
        dispatch(failedFetchAction(errorMessage));
      } finally {
        dispatch(loadingToggleAction(false));
      }
    };
  }

export function deleteInvestmentAction(postId, history) {
    return (dispatch) => {
        deleteInvestment(postId).then((response) => {
            dispatch(confirmedDeleteInvestmentAction(response.data));
            swal("Utilisateur supprimé avec succès!", {
                icon: "success",
            });
            history.push('/liste-utilisateurs');
        }).catch((error) => {
            console.log(error);
            swal("Erreur d'ajout de l'utilisateur!", {
                icon: "warning",
                dangerMode: true,
            });
            dispatch(failedFetchAction(error.message));
        });
    };
}
  
export function updateInvestmentAction(user, userId, history) {
    return async (dispatch) => {
      try {
        dispatch(loadingToggleAction(true));
        const response = await updateInvestment(user, userId);
        dispatch(updateAction(userId, response.data));
        swal(response.data.message, {
            icon: "success",
        });
        history.push('/partners');
      } catch (error) {
        console.log(error);
        const errorMessage = formatError(error);
        dispatch(failedFetchAction(errorMessage));
        swal(errorMessage, {
            icon: "warning",
            dangerMode: true,
        });
      } finally {
        dispatch(loadingToggleAction(false));
      }
    };
}

export function confirmedCreateAction(payload) {
    return {
        type: INVESTMENT_CREATED_ACTION,
        payload,
    };
}

export function fetchDataAction(payload) {
    return {
        type: FETCH_INVESTMENT_DATA_ACTION,
        payload,
    };
}

export function updateAction(userId, updatedData) {
    return {
        type: INVESTMENT_EDIT_ACTION,
        payload: { userId, updatedData },
    };
}

export function failedCreateAction(message) {
    return {
        type: INVESTMENT_CREATE_FAILED_ACTION,
        payload: message,
    };
}

export function failedFetchAction(message) {
    return {
        type: INVESTMENT_FETCH_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}

export function confirmedDeleteInvestmentAction(postId) {
    return {
        type: INVESTMENT_DELETE_SUCCESS_ACTION,
        payload: postId,
    };
}
