import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import access from '../../config/access';
import { getRouteName } from '../../config/helper';
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const ROUTE_NAME = getRouteName(rest.path);
    console.log("component ", rest.action, " ", ROUTE_NAME, " ", access(rest.action||'read', ROUTE_NAME))
 
    // return (<Route {...rest} render={(props) => 
    return  access(rest.action||'read', ROUTE_NAME) ?  <Component /> : <Navigate   to="/" replace /> 
    // }/>
        // )
}
export default ProtectedRoute;