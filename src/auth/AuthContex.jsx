import React, { createContext, useState } from 'react'
import { useReducer } from "react";
import { authReducer } from './AuthReducer';
import types from './types';
import axios from 'axios';
import { useNavigate } from 'react-router-native';

export const context = createContext();

const intialState = {
    user: null,
    token: null,
};

const AuthContex = ({children}) => {

  const [state, dispatch] = useReducer(authReducer, intialState); 
  const [isloggin, setIsLoggin] = useState(false)

  const loggin = async({userName, password}) => {
      try {
        setIsLoggin(true);
        const response = await axios.post(`${process.env.API_SERVER}/api/auth/local`, 
            {
                identifier: userName,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }    
            }
       );
       dispatch({
            type: types.loggin,
            payload: {
                user: response.data.user.username,
                category: response.data.user.category
            }
       }); 
       dispatch({
            type: types.setToken,
            payload: response.data.jwt
       });
       setIsLoggin(false);
       return 200;
    } catch(error) {
        setIsLoggin(false);
        if(error.response.status === 400) return 400;
        if(error.response.status === 502) return 502;
    }
  };

  const logOut = () => {
    dispatch({
        type: types.logOut
    })
  };

  const getToken = () => {
     return state.token;
  };    

  return (
    <context.Provider value={{
        loggin,
        logOut,
        getToken, 
        loading: isloggin,
        user: state.user,
    }}>
        {children}
    </context.Provider>
  )
}

export default AuthContex