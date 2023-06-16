import { useCallback, useEffect, useRef, useState } from "react";

// creating a custom hook called useStateWithCallback that extends the functionality of the useState hook in React by adding support for a callback function whenever the state is updated or new client is added

export const useStateWithCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(); //will store the reference to the callback function passed to updateState.

  ////useCallback is used to memoize and optimize the creation of callback functions in React, preventing unnecessary re-renders and optimizing performance by maintaining stable references.

  //// In this code, `useCallback` is used to create a memoized version of the `updateState` function. By wrapping it with `useCallback`, the function will only be recreated when the dependencies change (in this case, an empty dependency array is passed, meaning it will only be created once). This ensures that the `updateState` function maintains a stable reference, optimizing performance and preventing unnecessary re-renders in components that use this function.

  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb;

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

  return [state, updateState];
};

//! Using useEffect for this purpose introduces some complexities and potential pitfalls. The main issue is that the callback function is not guaranteed to be the latest one when the effect runs. It may reference a stale version of the callback if the state updates rapidly. The custom hook useStateWithCallback using useRef avoids this problem by ensuring that the callback reference is always up to date .
