// redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";  // Ensure this import path is correct

// Configure the Redux store
export const store = configureStore({
  reducer: {
    cart: CartReducer,  // Add the CartReducer to the store
  },
});

// Export RootState for use in components to type the state
export type RootState = ReturnType<typeof store.getState>;

// Export AppDispatch for use in components to type the dispatch function
export type AppDispatch = typeof store.dispatch;
export default store;  // Default export
