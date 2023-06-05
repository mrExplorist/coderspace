import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  avatar: "/images/monkey-avatar.png",
};

// Slices are a convenient way to combine the definition of a reducer function and its associated actions in a single unit, reducing the manual setup required. Redux Toolkit simplifies the process of creating slices and helps streamline the Redux development process.

export const ActivateSlice = createSlice({
  name: "activate", // name of slice
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName, setAvatar } = ActivateSlice.actions;

export default ActivateSlice.reducer;
