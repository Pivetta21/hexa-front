import { configureStore } from '@reduxjs/toolkit';

import subscriptionsReducer from './subscriptionsSlice';
import channelReducer from './channelSlice';

export const store = configureStore({
  reducer: {
    subscriptions: subscriptionsReducer,
    channel: channelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
