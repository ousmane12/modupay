import {
    COUNTRY_CREATE_FAILED_ACTION,
    FETCH_COUNTRY_DATA_ACTION,
    COUNTRY_CREATED_ACTION,
    COUNTRY_EDIT_FAILED_ACTION,
    COUNTRY_DELETED_ACTION,
} from '../actions/countryActions';

const initialStateCountry = {
    countries: [],
    errorMessage: '',
    successMessage: '',
    showLoading: false,
};

export function CountryReducer(state = initialStateCountry, action) {
    if (action.type === COUNTRY_CREATED_ACTION) {
      return {
        ...state,
        countries: action.payload,
        errorMessage: '',
        successMessage: 'Created Successfully a country',
        showLoading: false,
      };
    }
    if (action.type === FETCH_COUNTRY_DATA_ACTION) {
      return {
        ...state,
        countries: action.payload,
        errorMessage: '',
        successMessage: 'Fetch data Completed',
        showLoading: false,
      };
    }
    if (action.type === COUNTRY_DELETED_ACTION) {
      return {
        ...state,
        countries: state.countries.filter(
          (country) => country.id !== action.payload
        ),
        errorMessage: '',
        successMessage: 'Country deleted successfully',
        showLoading: false,
      };
    }
    if (
      action.type === COUNTRY_CREATE_FAILED_ACTION ||
      action.type === COUNTRY_EDIT_FAILED_ACTION
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

    
