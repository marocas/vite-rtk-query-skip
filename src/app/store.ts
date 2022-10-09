import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { api } from './services';

const store = () =>
  configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export type AppDispatch = ReturnType<typeof store>['dispatch'];

export default store;
