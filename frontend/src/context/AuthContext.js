import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return {user: action.payload}
    case 'SIGNOUT':
      return {user: null}
    default:
      return state;
  }
}

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>  {/* ...state = user: null */}
      {children}
    </AuthContext.Provider>
  );
}
