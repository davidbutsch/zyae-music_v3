import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "@/types";

export const userSlice = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => action.payload,
    clearUser: () => {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
