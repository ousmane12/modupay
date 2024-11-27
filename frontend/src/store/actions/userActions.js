import {
    formatError,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
} from '../../services/userService';
import swal from "sweetalert";


export const USER_CREATE_FAILED_ACTION = '[add action] failed add';
export const USER_DELETE_FAILED_ACTION = '[delete action] failed delete';
export const USER_DELETE_SUCCESS_ACTION = '[delete action] delete action';
export const USER_FETCH_FAILED_ACTION = '[add action] failed fetch';
export const USER_EDIT_ACTION = '[Edit action] edit action';
export const USER_EDIT_FAILED_ACTION = '[Edit action] edit failed';
export const USER_CREATED_ACTION = '[Add action] add action';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const FETCH_USER_DATA_ACTION = '[Fetch action] fetch action';

export function createAction(name, role, phoneNumber, email, history) {
    return (dispatch) => {
        createUser(name, role, phoneNumber, email)
        .then((response) => {
            if (response.status === 201) {
                history.push('/utilisateurs');
                dispatch(confirmedCreateAction(response.data));
                swal(response.data?.message, {
                    icon: "success",
                });
              } 
            // Treat other status codes as errors
            const errorMessage = formatError(response.data);
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

export function getUsersAction() {
    return async (dispatch) => {
      try {
        dispatch(loadingToggleAction(true));
        const response = await fetchUsers();
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
    return (dispatch, getState) => {
        deleteUser(postId)
            .then((response) => {
                // Dispatch l'action pour indiquer que la suppression a réussi
                dispatch(confirmedDeleteUserAction(response.data));

                // Récupérer la liste actuelle des utilisateurs dans le state
                const currentState = getState();
                const updatedUserList = currentState.users.filter(user => user.id !== postId);

                // Mettre à jour le state avec la liste mise à jour
                dispatch(updateUserListAction(updatedUserList));

                // Notifier l'utilisateur
                swal("Utilisateur supprimé avec succès!", {
                    icon: "success",
                });
                // Rediriger après suppression
                history.push('/utilisateurs');
            })
            .catch((error) => {
                console.error(error);

                // Notification d'erreur
                swal("Erreur lors de la suppression de l'utilisateur!", {
                    icon: "warning",
                    dangerMode: true,
                });

                // Dispatch l'action d'échec
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
        swal("Utilisateur modifié avec succès!", {
            icon: "success",
        });
        history.push('/utilisateurs');
      } catch (error) {
        console.log(error);
        const errorMessage = formatError(error);
        dispatch(failedFetchAction(errorMessage));
        swal("Erreur de modification de l'utilisateur!", {
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
        type: USER_CREATED_ACTION,
        payload,
    };
}

export function fetchDataAction(payload) {
    return {
        type: FETCH_USER_DATA_ACTION,
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

export function updateUserListAction(updatedUserList) {
    return {
        type: 'UPDATE_USER_LIST',
        payload: updatedUserList,
    };
}