import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active_scene: null,
  bbox: [
    29.8910655438917, 31.17324254938339, 29.92179624500659, 31.19480212802587,
  ],
  coords: [30.0, 30.0],
};

const sceneSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {
    setScene(state, action) {
      state.active_scene = action.payload;
    },
    setBbox(state, action) {
      state.bbox = action.payload;
    }
  },
});

export const { setScene, setBbox } = sceneSlice.actions;
export default sceneSlice.reducer;
