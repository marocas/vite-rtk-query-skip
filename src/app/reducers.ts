import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import { cardsApi } from "./services/cards";

export const rootReducer = combineReducers({
  counter: counterReducer,
  [cardsApi.reducerPath]: cardsApi.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
