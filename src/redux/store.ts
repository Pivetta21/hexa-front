import { configureStore } from '@reduxjs/toolkit';

import subscriptionsReducer from './subscriptionsSlice';

export const store = configureStore({
  reducer: {
    subscriptions: subscriptionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
