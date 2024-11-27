import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            !isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" /> // Redirige vers la page principale si l'utilisateur est connecté
            )
        }
    />
);

export default PublicRoute;