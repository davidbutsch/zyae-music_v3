import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerReducer";
import { userReducer } from "./userReducer";

// reducers
export * from "./userReducer";
export * from "./playerReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
