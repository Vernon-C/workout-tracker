import { createContext, useReducer, useEffect } from 'react';

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

  // Check for the json token on initial render to log users who are signed in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({type: 'SIGNIN', payload: user})
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>  {/* ...state = user: null */}
      {children}
    </AuthContext.Provider>
  );
}
