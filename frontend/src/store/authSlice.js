import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,

  //Any data coming from server will be stored in the otp object

  otp: {
    phone: "",
    hash: "",
  },

  //   const isAuth = false;

  // const user = {
  //   isActivated: false,
  // };
};

// Slices are a convenient way to combine the definition of a reducer function and its associated actions in a single unit, reducing the manual setup required. Redux Toolkit simplifies the process of creating slices and helps streamline the Redux development process.

export const authSlice = createSlice({
  name: "auth", // name of slice
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;

      if (user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    setOtp: (state, action) => {
      const { phone, hash } = action.payload;
      // setting payload {phone and hash} in the state
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;
