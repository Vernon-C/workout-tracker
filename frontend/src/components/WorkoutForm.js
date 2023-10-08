import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const {dispatch} = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();  // Don't refresh the page on submit
    
    const workout = {title, reps, load};

    const response = await fetch('/api/workouts', {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if response is ok, communicates with workoutController.js in the backend
    const json = await response.json();  // The workout just created

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle('');
      setReps('');
      setLoad('');
      setError(null);
      setEmptyFields([]);
      console.log("New workout added", json);

      dispatch({type: 'CREATE_WORKOUT', payload: json});
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error": ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error": ""}
      />

      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error": ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
 
export default WorkoutForm;