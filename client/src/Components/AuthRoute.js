import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { loggedIn } from '../AuthService';

const AuthRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    loggedIn() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{pathname: '/login'}} />
    )
  )} />
);

export default AuthRoute;
