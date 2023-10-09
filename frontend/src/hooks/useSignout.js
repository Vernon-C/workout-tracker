import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
  const {dispatch} = useAuthContext();

  const signout = () => {
    // Remove user from local storage
    localStorage.removeItem('user');

    // Disptach sign out action
    dispatch({type: 'SIGNOUT'});
  }

  return {signout}
}
