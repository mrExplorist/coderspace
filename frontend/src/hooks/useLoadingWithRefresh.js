import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

//&setting up a custom hook that handles an initial loading state, makes a server request to refresh the authentication, and updates the loading state accordingly. It utilizes the useEffect hook to execute the request only once when the component mounts. The loading state can be used in the consuming component to conditionally render loading indicators or handle other logic related to the loading state.

export function useLoadingWithRefresh() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // server request

    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );

        dispatch(setAuth(data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
}

// ~------------->
// const { data } = await axios.get(
//   `${process.env.REACT_APP_API_URL}/api/refresh`,
//   {
//     withCredentials: true,
//   }
// );
// dispatch(setAuth(data));

// If the request is successful, the response data is extracted using destructuring and passed to the dispatch function, which likely updates the authentication state using the setAuth action creator.
