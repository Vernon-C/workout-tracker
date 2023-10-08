import { createContext, useReducer } from 'react';

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]  // ..."" are the previous workouts, add new and old together
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
      }
    default:
      return state;
  }
}

export const WorkoutsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  });  // Initial state

  return (
    <WorkoutContext.Provider value={{...state, dispatch}}>  {/* ...state works like 'workouts', spread out values */}
      {children}  {/* children here is the <App> in index.js */}
    </WorkoutContext.Provider>
  );
}
