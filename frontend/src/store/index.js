import auth from "./authSlice";
import activate from "./activateSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth,
    activate,
  },
});
