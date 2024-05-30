import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import documentsToSendReducer from "../features/email/documentsToSendSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    documentsToSend: documentsToSendReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Определяем RootState на основе store
export type RootState = ReturnType<typeof store.getState>;

// Экспортируем store как по умолчанию, так и тип RootState
export default store;
