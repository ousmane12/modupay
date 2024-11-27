import { lazy, Suspense, useEffect } from 'react';

/// Components
import Index from "./jsx";
import { connect, useDispatch } from 'react-redux';
import {  Route, Switch, withRouter } from 'react-router-dom';
// action
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import { checkAutoLogin } from './services/AuthService';
import PublicRoute from './PublicRoute';
import Error404 from './jsx/pages/Error404';


const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const Login = lazy(() => {
    return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
  });
});

function App(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        checkAutoLogin(dispatch, props.history);
    }, [dispatch, props.history]);

    return (
        <div className="vh-100">
            <Suspense
                fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
            >
                <Switch>
                    {!props.isAuthenticated ? (
                        <>
                            <Route path="/reset-password/:token" component={SignUp} />
                            <PublicRoute
                                path="/forgot-password"
                                component={ForgotPassword}
                                isAuthenticated={props.isAuthenticated}
                            />
                            <PublicRoute
                                path="/reset-password/:token"
                                component={SignUp}
                                isAuthenticated={props.isAuthenticated}
                            />
                            <Route path="/login" component={Login} />
                        </>
                    ) : (
                        <Index />
                    )}
                    {/* Route par défaut pour les URLs inconnues */}
                    <Route component={Error404} />
                </Switch>
            </Suspense>
        </div>
    );
}



const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default withRouter(connect(mapStateToProps)(App)); 

