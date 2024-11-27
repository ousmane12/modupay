import {
    formatError,
    fetchAgencies,
    createAgency,
    updateAgency,
    deleteAgency,
    getAgency,
} from '../../services/agencyService';
import swal from "sweetalert";


export const AGENCY_CREATE_FAILED_ACTION = '[add action] failed add';
export const AGENCY_DELETE_FAILED_ACTION = '[delete action] failed delete';
export const AGENCY_DELETE_SUCCESS_ACTION = '[delete action] delete action';
export const AGENCY_FETCH_FAILED_ACTION = '[add action] failed fetch';
export const AGENCY_EDIT_ACTION = '[Edit action] edit action';
export const AGENCY_EDIT_FAILED_ACTION = '[Edit action] edit failed';
export const AGENCY_CREATED_ACTION = '[Add action] add action';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const FETCH_AGENCY_DATA_ACTION = '[Fetch action] fetch action';

export function createAction(name, country, manager, history) {
    return (dispatch) => {
        createAgency(name, country, manager)
        .then((response) => {
            if (response.status === 201) {
                dispatch(confirmedCreateAction(response.data));
                swal("Agence enregistré avec succès!", {
                    icon: "success",
                  });
                history.push('/agences');
              } 
            const errorMessage = formatError(response.data);
            dispatch(failedCreateAction(errorMessage));
        })
        .catch((error) => {
            console.log(error);
            const errorMessage = formatError(error);
            dispatch(failedCreateAction(errorMessage));
            swal(errorMessage, {
                icon: "warning",
                dangerMode: true,
            });
        });
    };
}

export function getAgenciesAction() {
    return async (dispatch) => {
      try {
        dispatch(loadingToggleAction(true));
        const response = await fetchAgencies();
        
        const clients = response.data;
        dispatch(fetchDataAction(clients));
      } catch (error) {
        const errorMessage = formatError(error);
        dispatch(failedFetchAction(errorMessage));
      } finally {
        dispatch(loadingToggleAction(false));
      }
    };
  }

export function deleteAgencyAction(postId, history) {
    return (dispatch) => {
        deleteAgency(postId).then((response) => {
            dispatch(confirmedDeleteUserAction(response.data));
            swal("Agence supprimé avec succès!", {
                icon: "success",
              });
            history.push('/agences');
        }).catch((error) => {
            console.log(error);
            dispatch(failedFetchAction(error.message));
            swal(error.message, {
                icon: "warning",
                dangerMode: true,
            });
        });
    };
}

export function getAgencyByIdAction(postId, history) {
    return (dispatch) => {
        getAgency(postId).then((response) => {
            dispatch(fetchDataAction(response.data));
        }).catch((error) => {
            console.log(error);
            dispatch(failedFetchAction(error.message));
        });
    };
}
  
export function updateAgencyAction(user, userId, history) {
    return async (dispatch) => {
      try {
        dispatch(loadingToggleAction(true));
        const response = await updateAgency(user, userId);
        dispatch(updateAction(userId, response.data));
        swal("Agence mis à jour avec succès!", {
            icon: "success",
          });
        history.push('/agences');
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
        type: AGENCY_CREATED_ACTION,
        payload,
    };
}

export function fetchDataAction(payload) {
    return {
        type: FETCH_AGENCY_DATA_ACTION,
        payload,
    };
}

export function updateAction(userId, updatedData) {
    return {
        type: AGENCY_EDIT_ACTION,
        payload: { userId, updatedData },
    };
}

export function failedCreateAction(message) {
    return {
        type: AGENCY_CREATE_FAILED_ACTION,
        payload: message,
    };
}

export function failedFetchAction(message) {
    return {
        type: AGENCY_FETCH_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}

export function confirmedDeleteUserAction(postId) {
    return {
        type: AGENCY_DELETE_SUCCESS_ACTION,
        payload: postId,
    };
}
