import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// https://github.com/tylermcginnis/react-router-firebase-auth

export function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route 
      {...rest}
      render={(props) => auth === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location }}} /> 
      }
    />
  );
}

export function PublicRoute({ component: Component, auth, ...rest }) {
  return (
    <Route 
      {...rest}
      render={(props) => auth === false
        ? <Component {...props} />
        : <Redirect to="/profil" />}
    />
  );
}
