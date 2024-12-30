import {
    AGENCY_CREATE_FAILED_ACTION,
    FETCH_AGENCY_DATA_ACTION,
    AGENCY_CREATED_ACTION,
    AGENCY_EDIT_FAILED_ACTION,
} from '../actions/agencyActions';

const initialStateAgency = {
    agencies: [],
    errorMessage: '',
    successMessage: '',
    showLoading: false,
  };
  
  export function AgencyReducer(state = initialStateAgency, action) {
    switch (action.type) {
      case AGENCY_CREATED_ACTION:
        return {
          ...state,
          agencies: [...state.agencies, action.payload],
          errorMessage: '',
          successMessage: 'Created Successfully an agency',
          showLoading: false,
        };
  
      case FETCH_AGENCY_DATA_ACTION:
        return {
          ...state,
          agencies: action.payload,
          errorMessage: '',
          successMessage: 'Fetch agency data Completed',
          showLoading: false,
        };
  
      case AGENCY_CREATE_FAILED_ACTION:
      case AGENCY_EDIT_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload,
          successMessage: '',
          showLoading: false,
        };
  
      default:
        return state;
    }
  }
  