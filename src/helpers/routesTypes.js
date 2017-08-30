import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// https://github.com/tylermcginnis/react-router-firebase-auth

export function PrivateRoute({ component: Component, authed, user,...rest }) {
  return (
    <Route 
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} user={user}/>
        : <Redirect to={{ pathname: '/login', state: { from: props.location }}} /> 
      }
    />
  );
}

export function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route 
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to="/profile" />}
    />
  );
}
