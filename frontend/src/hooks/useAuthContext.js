import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  const context = useContext(AuthContext);  // (state, disptach) function from WorkoutContext.js

  // Don't return if there isn't a context
  if (!context) {
    throw Error("useAuthContext must be used inside a AuthContextProvider");
  }

  return context;
}
