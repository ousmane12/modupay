import {
    formatError,
    fetchCountries,
    createCountry,
    updateCountry,
    deleteCountry,
    getCountry,
} from '../../services/countryService';
import swal from "sweetalert";


export const COUNTRY_CREATE_FAILED_ACTION = '[add action] failed add';
export const COUNTRY_DELETE_FAILED_ACTION = '[delete action] failed delete';
export const COUNTRY_DELETE_SUCCESS_ACTION = '[delete action] delete action';
export const COUNTRY_FETCH_FAILED_ACTION = '[add action] failed fetch';
export const COUNTRY_EDIT_ACTION = '[Edit action] edit action';
export const COUNTRY_EDIT_FAILED_ACTION = '[Edit action] edit failed';
export const COUNTRY_CREATED_ACTION = '[Add action] add action';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const FETCH_COUNTRY_DATA_ACTION = '[Fetch action] fetch action';
export const COUNTRY_DELETED_ACTION = 'COUNTRY_DELETED_ACTION';

export function createAction(name, manager, localFeePercentage, intFeePercentage, history) {
    return (dispatch) => {
        createCountry(name, manager, localFeePercentage, intFeePercentage)
        .then((response) => {
            if (response.status === 201) {
                dispatch(confirmedCreateAction(response.data));
                swal("Pays enregistré avec succès!", {
                  icon: "success",
                });
                history.push("/pays");
              } 
            const errorMessage = formatError(response.data);
            dispatch(failedCreateAction(errorMessage));
        })
        .catch((error) => {
            const errorMessage = formatError(error);
            dispatch(failedCreateAction(errorMessage));
            swal(errorMessage, {
              icon: "warning",
              dangerMode: true,
            });
        });
    };
}

export function getCountriesAction() {
    return async (dispatch) => {
      try {
        dispatch(loadingToggleAction(true));
        const response = await fetchCountries();
        dispatch(fetchDataAction(response.data));
      } catch (error) {
        console.log(error);
        const errorMessage = formatError(error);
        dispatch(failedFetchAction(errorMessage));
      } finally {
        dispatch(loadingToggleAction(false));
      }
    };
  }

  export function getCountryByIdAction(countryId) {
    return async (dispatch) => {
      try {
        dispatch(loadingToggleAction(true));
        const response = await getCountry(countryId); 
        dispatch(fetchDataAction(response.data));
      } catch (error) {
        const errorMessage = formatError(error);  // Formate l'erreur
        dispatch(failedFetchAction(errorMessage));
        swal(errorMessage, {
          icon: "warning",
          dangerMode: true,
        });
        dispatch(loadingToggleAction(false));  // Désactive le chargement
      }
    };
  }

export function deleteCountryAction(postId, history) {
    return (dispatch) => {
        deleteCountry(postId).then((response) => {
            dispatch(confirmedDeleteUserAction(response.data));
            swal("Pays supprimé avec succès!", {
              icon: "success",
            });
            history.push('/pays');
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
  
export function updateCountryAction(user, userId, history) {
    return async (dispatch) => {
      try {
        dispatch(loadingToggleAction(true));
        const response = await updateCountry(user, userId);
        dispatch(updateAction(userId, response.data));
        swal("Pays mis à jour avec succès!", {
          icon: "success",
        });
        history.push('/pays');
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
        type: COUNTRY_CREATED_ACTION,
        payload,
    };
}

export function fetchDataAction(payload) {
    return {
        type: FETCH_COUNTRY_DATA_ACTION,
        payload,
    };
}

export function updateAction(userId, updatedData) {
    return {
        type: COUNTRY_EDIT_ACTION,
        payload: { userId, updatedData },
    };
}

export function failedCreateAction(message) {
    return {
        type: COUNTRY_CREATE_FAILED_ACTION,
        payload: message,
    };
}


export function failedFetchAction(message) {
    return {
        type: COUNTRY_FETCH_FAILED_ACTION,
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
        type: COUNTRY_DELETE_SUCCESS_ACTION,
        payload: postId,
    };
}
