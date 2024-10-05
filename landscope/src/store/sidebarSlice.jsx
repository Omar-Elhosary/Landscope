import { createSlice } from "@reduxjs/toolkit";

const initialState = { active_section: "map" };
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    activateSec(state, action) {
      state.active_section = action.payload;
    },
  },
});

export const {activateSec} = sidebarSlice.actions;
export default sidebarSlice.reducer;