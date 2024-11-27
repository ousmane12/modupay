import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import TransactionsReducer from './reducers/transactionReducer';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
import { UserReducer } from './reducers/userReducer';
import { AgencyReducer } from './reducers/agencyReducer';
import { CountryReducer } from './reducers/countryReducer';
import { InvestmentReducer } from './reducers/investmentReducer';
//import { reducer as reduxFormReducer } from 'redux-form';
const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    auth: AuthReducer,
    users: UserReducer,
    agencies: AgencyReducer,
    countries: CountryReducer,
    transactions: TransactionsReducer,
    investments: InvestmentReducer,
	//form: reduxFormReducer,	
});

//const store = createStore(rootReducers);
export const useAppDispatch = () => store.dispatch; 
export const store = createStore(reducers,  composeEnhancers(middleware));
