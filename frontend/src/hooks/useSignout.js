import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useSignout = () => {
  const {dispatch} = useAuthContext();
  const {dispatch: workoutsDispatch} = useWorkoutsContext();  // To set SET_WORKOUTS in workoutContext.js

  const signout = () => {
    // Remove user from local storage
    localStorage.removeItem('user');

    // Disptach sign out action
    dispatch({type: 'SIGNOUT'});
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null});
  }

  return {signout}
}
