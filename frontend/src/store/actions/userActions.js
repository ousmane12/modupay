import {
    formatError,
    fetchUsers,
    createUser,
    updateUser,
    createClient,
    deleteUser,
} from '../../services/userService';


export const USER_CREATE_FAILED_ACTION = '[add action] failed add';
export const USER_DELETE_FAILED_ACTION = '[delete action] failed delete';
export const USER_DELETE_SUCCESS_ACTION = '[delete action] delete action';
export const USER_FETCH_FAILED_ACTION = '[add action] failed fetch';
export const USER_EDIT_ACTION = '[Edit action] edit action';
export const USER_EDIT_FAILED_ACTION = '[Edit action] edit failed';
export const USER_CREATED_ACTION = '[Add action] add action';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const FETCH_DATA_ACTION = '[Fetch action] fetch action';

export function createAction(firstName, lastName, login, role, phoneNumber, email, password, history) {
    return (dispatch) => {
        createUser(firstName, lastName, login, role, phoneNumber, email, password)
        .then((response) => {
            if (response.status === 201) {
                dispatch(confirmedCreateAction(response.data));
                history.push('/utilisateurs');
              } else {
                // Treat other status codes as errors
                const errorMessage = formatError(response.data);
                dispatch(failedCreateAction(errorMessage));
              } 
        })
        .catch((error) => {
            console.log(error);
            const errorMessage = formatError(error);
            dispatch(failedCreateAction(errorMessage));
        });
    };
}

export function createClientAction(firstName, lastName, role, phoneNumber, history) {
    return (dispatch) => {
        createClient(firstName, lastName, role, phoneNumber)
        .then((response) => {
            if (response.status === 201) {
                dispatch(confirmedCreateAction(response.data));
                history.push('/clients');
              } else {
                // Treat other status codes as errors
                const errorMessage = formatError(response.data);
                dispatch(failedCreateAction(errorMessage));
              } 
        })
        .catch((error) => {
            console.log(error);
            const errorMessage = formatError(error);
            dispatch(failedCreateAction(errorMessage));
        });
    };
}

export function getUsersAction() {
    return async (dispatch) => {
      try {
        dispatch(loadingToggleAction(true));
        const response = await fetchUsers();
        const clients = response.data.filter(user => user.role !== 'user');
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

export function getClientsAction() {
return async (dispatch) => {
    try {
    dispatch(loadingToggleAction(true));
    const response = await fetchUsers();
    const clients = response.data.filter(user => user.role === 'user');
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

export function deleteUserAction(postId, history) {
    return (dispatch) => {
        deleteUser(postId).then((response) => {
            dispatch(confirmedDeleteUserAction(response.data));
            history.push('/liste-utilisateurs');
        }).catch((error) => {
            console.log(error);
            dispatch(failedFetchAction(error.message));
        });
    };
}
  
export function updateUserAction(user, userId, history) {
    return async (dispatch) => {
      try {
        dispatch(loadingToggleAction(true));
        const response = await updateUser(user, userId);
        dispatch(updateAction(userId, response.data));
        history.push('/utilisateurs');
      } catch (error) {
        console.log(error);
        const errorMessage = formatError(error);
        dispatch(failedFetchAction(errorMessage));
      } finally {
        dispatch(loadingToggleAction(false));
      }
    };
}

export function confirmedCreateAction(payload) {
    return {
        type: USER_CREATED_ACTION,
        payload,
    };
}

export function fetchDataAction(payload) {
    return {
        type: FETCH_DATA_ACTION,
        payload,
    };
}

export function updateAction(userId, updatedData) {
    return {
        type: USER_EDIT_ACTION,
        payload: { userId, updatedData },
    };
}

export function failedCreateAction(message) {
    return {
        type: USER_CREATE_FAILED_ACTION,
        payload: message,
    };
}

export function failedFetchAction(message) {
    return {
        type: USER_FETCH_FAILED_ACTION,
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
        type: USER_DELETE_SUCCESS_ACTION,
        payload: postId,
    };
}
