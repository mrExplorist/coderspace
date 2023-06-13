import { useCallback, useEffect, useRef, useState } from "react";

export const useStateWithCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(); //will store the reference to the callback function passed to updateState.

  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb; // storing reference in the function

    // It updates the local state using the setState function, and if newState is a function, it is called with the previous state (prev).

    setState((prev) => {
      return typeof newState === "function" ? newState(prev) : newState;
    });
  }, []);

  // checks if cbRef.current exists. If it does, it means a callback function was provided during the updateState call.
  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state); // the callback function is called with the current state value, and cbRef.current is set to null to clear the stored callback.
      cbRef.current = null;
    }
  }, [state]);

  //returning an array [state, updateState],where state represents the current state value and updateState is a reference to the updateState function. This allows components to access and update the state using array destructuring.

  return [state, updateState];
};
