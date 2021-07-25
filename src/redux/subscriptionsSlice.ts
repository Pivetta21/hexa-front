import { ChannelI } from './../models/Channel.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  channels: [] as ChannelI[],
};

export const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    addChannels: (state, action: PayloadAction<ChannelI[]>) => {
      state.channels = action.payload;
    },
    follow: (state, action: PayloadAction<ChannelI>) => {
      state.channels.push(action.payload);
    },
    unfollow: (state, action: PayloadAction<ChannelI>) => {
      state.channels = state.channels.filter(
        (channel) => channel.id !== action.payload.id,
      );
    },
  },
});

export const { addChannels, follow, unfollow } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
