import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({workout}) => {
  const {dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();

  const handleClick = async () => {
    // Return if there isn't a user
    if (!user) {
      return;
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();  // json = item deleted

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json});
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <span class="material-symbols-outlined" onClick={handleClick}>Delete</span>
    </div>
  );
}
 
export default WorkoutDetails;
