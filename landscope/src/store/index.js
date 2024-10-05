import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import sceneReducer from "./SceneSlice.jsx";
import mapReducer from "./MapSlice.jsx";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    scene: sceneReducer,
    map: mapReducer
  },
});

export default store;
