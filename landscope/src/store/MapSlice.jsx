import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coords: [-75, 45],
  center: [-75, 45],
  zoom: 10.12,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    updateCoords(state, action) {
      state.coords = action.payload;
    },
    updateZoom(state, action) {
        state.zoom = action.payload;
    },
    updateCenter(state, action) {
        state.center = action.payload;
    }
  },
});

export const { updateCoords, updateZoom, updateCenter } = mapSlice.actions;
export default mapSlice.reducer;
