import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// https://redux.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
