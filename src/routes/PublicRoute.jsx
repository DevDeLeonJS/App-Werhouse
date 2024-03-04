import React, { useContext } from 'react'
import { context } from '../auth/AuthContex'
import { Navigate } from 'react-router-native';

const PublicRoute = ({children}) => {

  const {user} = useContext(context);

  return (!!user) 
         ? <Navigate to={"/login"} />
         : children 
}

export default PublicRoute;