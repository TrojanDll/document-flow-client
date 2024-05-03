import { configureStore } from "@reduxjs/toolkit";
import groupsSlice from "./groupsSlice";

export default configureStore({
  reducer: {
    groups: groupsSlice,
  },
});
