import React, { useContext } from 'react'
import { context } from '../auth/AuthContex';
import { Navigate } from 'react-router-native';

const ProtectedRoute = ({children}) => {

 const {user} = useContext(context);

  return (!!user) 
        ? children
        : <Navigate to={"/login"} />
}

export default ProtectedRoute;