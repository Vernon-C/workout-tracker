import { WorkoutContext } from '../context/WorkoutContext';
import { useContext } from 'react';

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);  // (state, disptach) function from WorkoutContext.js

  // Don't return if there isn't a context
  if (!context) {
    throw Error("useWorkoutContext must be used inside a WorkoutsContextProvider");
  }

  return context;
}
