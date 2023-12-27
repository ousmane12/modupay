import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import PostsReducer from './reducers/PostsReducer';
import TransactionsReducer from './reducers/transactionReducer';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
import { UserReducer } from './reducers/userReducer';
import todoReducers from './reducers/Reducers';
//import { reducer as reduxFormReducer } from 'redux-form';
const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    posts: PostsReducer,
    auth: AuthReducer,
    users: UserReducer, 
	//form: reduxFormReducer,	
	
});

//const store = createStore(rootReducers);

export const store = createStore(reducers,  composeEnhancers(middleware));
