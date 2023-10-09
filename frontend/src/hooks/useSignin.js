import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);  // To disable buttons when loading
  const {dispatch} = useAuthContext();

  const signin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // Save the user to local storage for when they close the browser
      localStorage.setItem('user', JSON.stringify(json));

      // Update auth context
      dispatch({type: 'SIGNIN', payload: json});

      setIsLoading(false);
    }
  }

  return {signin, isLoading, error}
}
