import { ChannelI } from './../models/Channel.model';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';
import { findFollowingChannels } from 'src/services/channelUser.service';

type StatusType = 'success' | 'loading' | 'failed';

const initialState = {
  channels: [] as ChannelI[],
  status: '' as StatusType,
};

export const getSubscriptions = createAsyncThunk(
  'subscriptions/get',
  async (authenticatedUser: AuthenticatedUser) => {
    let channels = [] as ChannelI[];

    if (authenticatedUser && authenticatedUser.token) {
      const serviceResponse = await findFollowingChannels(
        authenticatedUser.user.id,
        authenticatedUser.token,
      );

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        channels = serviceResponse.data.map((channelUser) => {
          return channelUser.channel!;
        });
      }
    }

    return channels;
  },
);

export const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    resetSubscriptions: (state) => {
      state.channels = [] as ChannelI[];
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
  extraReducers: (builder) => {
    builder.addCase(getSubscriptions.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(getSubscriptions.fulfilled, (state, { payload }) => {
      state.channels = payload;
      state.status = 'success';
    });

    builder.addCase(getSubscriptions.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { follow, unfollow, resetSubscriptions } =
  subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
