import types from "./types";

export const authReducer = (state, action) => {
    switch(action.type){
        case types.loggin: 
            return{
                ...state,
                user: action.payload
            };
        case types.logOut:
            return{
                user: null,
                token: null
            };
        case types.setToken:
            return{
                ...state,
                token: action.payload
            }
    }
}